import { useUser } from "@clerk/clerk-react";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSessions";

import { PROBLEMS } from "../data/problems";

import { executeCode } from "../lib/piston";

import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { getDifficultyBadgeClass } from "../lib/utils";

import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";

import CodeEditorPanel from "../components/CodeEditorPanel";

import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";

import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";

import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useUser();

  const [output, setOutput] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id);

  const joinSessionMutation = useJoinSession();

  const endSessionMutation = useEndSession();

  const session = sessionData?.session;

  const isHost = session?.host?.clerkId === user?.id;

  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const [code, setCode] = useState(
    problemData?.starterCode?.[selectedLanguage] || "",
  );

  useEffect(() => {
    if (!session || !user || loadingSession) return;

    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, {
      onSuccess: refetch,
    });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") {
      navigate("/dashboard");
    }
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;

    setSelectedLanguage(newLang);

    const starterCode = problemData?.starterCode?.[newLang] || "";

    setCode(starterCode);

    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);

    setOutput(null);

    const result = await executeCode(selectedLanguage, code);

    setOutput(result);

    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (
      confirm(
        "Are you sure you want to end this session? All participants will be notified.",
      )
    ) {
      endSessionMutation.mutate(id, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen w-full bg-[#FFF7ED] flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 pt-[72px] overflow-hidden">
        <PanelGroup direction={
    window.innerWidth < 1024
      ? "vertical"
      : "horizontal"
  }>
          {/* LEFT PANEL */}

          <Panel defaultSize={
    window.innerWidth < 1024
      ? 55
      : 58
  } minSize={30}>
            <PanelGroup direction="vertical">
              {/* PROBLEM SECTION */}

              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-white border-r border-orange-100">
                  {/* HEADER */}

                  <div className="sticky top-0 z-10 bg-white border-b border-orange-100 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                      {/* LEFT */}

                      <div>
                        <h1 className="text-4xl font-black text-[#111827] leading-tight">
                          {session?.problem || "Loading..."}
                        </h1>

                        {problemData?.category && (
                          <p className="text-orange-500 font-semibold mt-2">
                            {problemData.category}
                          </p>
                        )}

                        <p className="text-gray-500 mt-3">
                          Host:{" "}
                          <span className="font-semibold text-[#111827]">
                            {session?.host?.name || "Loading..."}
                          </span>
                          {" • "}
                          {session?.participant ? 2 : 1}
                          /2 participants
                        </p>
                      </div>

                      {/* RIGHT */}

                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`badge border-0 px-4 py-3 font-semibold ${getDifficultyBadgeClass(
                            session?.difficulty,
                          )}`}
                        >
                          {session?.difficulty?.slice(0, 1).toUpperCase() +
                            session?.difficulty?.slice(1)}
                        </span>

                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg shadow-red-100"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            End Session
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-6 space-y-6">
                    {/* DESCRIPTION */}

                    {problemData?.description && (
                      <div className="bg-[#FFF7ED] border border-orange-100 rounded-3xl p-6 shadow-sm">
                        <h2 className="text-2xl font-black text-[#111827] mb-5">
                          Description
                        </h2>

                        <div className="space-y-4 text-gray-600 leading-8">
                          <p>{problemData.description.text}</p>

                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx}>{note}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EXAMPLES */}

                    {problemData?.examples &&
                      problemData.examples.length > 0 && (
                        <div className="bg-[#FFF7ED] border border-orange-100 rounded-3xl p-6 shadow-sm">
                          <h2 className="text-2xl font-black text-[#111827] mb-5">
                            Examples
                          </h2>

                          <div className="space-y-5">
                            {problemData.examples.map((example, idx) => (
                              <div
                                key={idx}
                                className="bg-white border border-orange-100 rounded-2xl p-5"
                              >
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="size-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-sm font-bold">
                                    {idx + 1}
                                  </div>

                                  <p className="font-bold text-[#111827]">
                                    Example {idx + 1}
                                  </p>
                                </div>

                                <div className="space-y-3 text-sm font-mono">
                                  <div>
                                    <span className="text-orange-500 font-bold">
                                      Input:
                                    </span>

                                    <p className="mt-1 text-gray-700">
                                      {example.input}
                                    </p>
                                  </div>

                                  <div>
                                    <span className="text-green-500 font-bold">
                                      Output:
                                    </span>

                                    <p className="mt-1 text-gray-700">
                                      {example.output}
                                    </p>
                                  </div>

                                  {example.explanation && (
                                    <div className="pt-3 border-t border-orange-100">
                                      <span className="text-xs text-gray-500 leading-6">
                                        <span className="font-bold text-[#111827]">
                                          Explanation:
                                        </span>{" "}
                                        {example.explanation}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* CONSTRAINTS */}

                    {problemData?.constraints &&
                      problemData.constraints.length > 0 && (
                        <div className="bg-[#FFF7ED] border border-orange-100 rounded-3xl p-6 shadow-sm">
                          <h2 className="text-2xl font-black text-[#111827] mb-5">
                            Constraints
                          </h2>

                          <ul className="space-y-3">
                            {problemData.constraints.map((constraint, idx) => (
                              <li
                                key={idx}
                                className="flex gap-3 text-gray-700"
                              >
                                <span className="text-orange-500 font-bold">
                                  •
                                </span>

                                <code>{constraint}</code>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </Panel>

              {/* RESIZE HANDLE */}

              <PanelResizeHandle className="h-[3px] bg-orange-100 hover:bg-orange-300 transition-all duration-300" />

              {/* EDITOR SECTION */}

              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  {/* CODE */}

                  <Panel defaultSize={70} minSize={30}>
                    <div className="h-full bg-[#FFF7ED] p-2">
                      <div className="h-full bg-white border border-orange-100 rounded-3xl overflow-hidden shadow-sm">
                        <CodeEditorPanel
                          selectedLanguage={selectedLanguage}
                          code={code}
                          isRunning={isRunning}
                          onLanguageChange={handleLanguageChange}
                          onCodeChange={(value) => setCode(value)}
                          onRunCode={handleRunCode}
                        />
                      </div>
                    </div>
                  </Panel>

                  {/* HANDLE */}

                  <PanelResizeHandle className="h-[3px] bg-orange-100 hover:bg-orange-300 transition-all duration-300" />

                  {/* OUTPUT */}

                  <Panel defaultSize={30} minSize={15}>
                    <div className="h-full bg-[#FFF7ED] px-2 pb-2">
                      <div className="h-full bg-white border border-orange-100 rounded-3xl overflow-hidden shadow-sm">
                        <OutputPanel output={output} />
                      </div>
                    </div>
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          {/* CENTER HANDLE */}

          <PanelResizeHandle className="w-[3px] bg-orange-100 hover:bg-orange-300 transition-all duration-300" />

          {/* RIGHT VIDEO PANEL */}

          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-[#FFF7ED] p-3 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="bg-white border border-orange-100 rounded-3xl p-10 text-center shadow-sm">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-orange-500 mb-5" />

                    <p className="text-lg font-semibold text-[#111827]">
                      Connecting to video call...
                    </p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="bg-white border border-orange-100 rounded-3xl p-10 text-center shadow-sm max-w-md w-full">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <PhoneOffIcon className="w-12 h-12 text-red-500" />
                    </div>

                    <h2 className="text-3xl font-black text-[#111827] mb-3">
                      Connection Failed
                    </h2>

                    <p className="text-gray-500">
                      Unable to connect to the video call
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full bg-white border border-orange-100 rounded-[32px] p-2 shadow-sm">
                  <div className="stream-wrapper h-full w-full rounded-[26px] overflow-hidden bg-[#0F172A]">
                    <StreamVideo client={streamClient}>
                      <StreamCall call={call}>
                        <VideoCallUI
                          chatClient={chatClient}
                          channel={channel}
                        />
                      </StreamCall>
                    </StreamVideo>
                  </div>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;
