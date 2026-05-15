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

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import { getDifficultyBadgeClass } from "../lib/utils";

import {
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
} from "lucide-react";

import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";

import SessionTimer from "../components/SessionTimer";

import {
  StreamCall,
  StreamVideo,
} from "@stream-io/video-react-sdk";

import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {

  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useUser();

  const isMobile =
    window.innerWidth < 1024;

  const [output, setOutput] =
    useState(null);

  const [isRunning, setIsRunning] =
    useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id);

  const joinSessionMutation =
    useJoinSession();

  const endSessionMutation =
    useEndSession();

  const session =
    sessionData?.session;
    console.log("sessionData", sessionData)

  const isHost =
    session?.host?.clerkId ===
    user?.id;

  const isParticipant =
    session?.participant?.clerkId ===
    user?.id;

  const {
    call,
    channel,
    chatClient,
    isInitializingCall,
    streamClient,
  } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find(
        (p) =>
          p.title ===
          session.problem
      )
    : null;

  const [selectedLanguage,
    setSelectedLanguage] =
    useState("javascript");

  const [code, setCode] =
    useState(
      problemData?.starterCode?.[
        selectedLanguage
      ] || ""
    );

  useEffect(() => {

    if (
      !session ||
      !user ||
      loadingSession
    )
      return;

    if (isHost || isParticipant)
      return;

    joinSessionMutation.mutate(id, {
      onSuccess: refetch,
    });

  }, [
    session,
    user,
    loadingSession,
    isHost,
    isParticipant,
    id,
  ]);

  useEffect(() => {

    if (!session || loadingSession)
      return;

    if (
      session.status ===
      "completed"
    ) {

      navigate("/dashboard");

    }

  }, [
    session,
    loadingSession,
    navigate,
  ]);

  useEffect(() => {

    if (
      problemData?.starterCode?.[
        selectedLanguage
      ]
    ) {

      setCode(
        problemData.starterCode[
          selectedLanguage
        ]
      );

    }

  }, [
    problemData,
    selectedLanguage,
  ]);

  const handleLanguageChange = (
    e
  ) => {

    const newLang =
      e.target.value;

    setSelectedLanguage(newLang);

    const starterCode =
      problemData?.starterCode?.[
        newLang
      ] || "";

    setCode(starterCode);

    setOutput(null);

  };

  const handleRunCode =
    async () => {

      setIsRunning(true);

      setOutput(null);

      const result =
        await executeCode(
          selectedLanguage,
          code
        );

      setOutput(result);

      setIsRunning(false);

    };

  const handleEndSession = () => {

    if (
      confirm(
        "Are you sure you want to end this session?"
      )
    ) {

      endSessionMutation.mutate(
        id,
        {
          onSuccess: () =>
            navigate(
              "/dashboard"
            ),
        }
      );

    }

  };

  return (

    <div className="h-screen w-full bg-[#FFF7ED] flex flex-col overflow-hidden">

      <Navbar />

      <div className="flex-1 pt-[72px] overflow-hidden p-3">

        <PanelGroup
          direction={
            isMobile
              ? "vertical"
              : "horizontal"
          }
        >

          {/* LEFT PANEL */}

          <Panel
            defaultSize={
              isMobile
                ? 55
                : 48
            }
            minSize={30}
          >

            <PanelGroup direction="vertical">

              {/* PROBLEM */}

              <Panel
                defaultSize={38}
                minSize={18}
              >

                <div className="h-full overflow-y-auto bg-white border border-orange-100 rounded-[28px]">

                  {/* HEADER */}

                  <div className="sticky top-0 z-10 bg-white border-b border-orange-100 p-4">

                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                      {/* LEFT */}

                      <div>

                        <h1 className="text-3xl lg:text-4xl font-black text-[#111827] leading-tight">

                          {session?.problem ||
                            "Loading..."}

                        </h1>

                        {problemData?.category && (

                          <p className="text-orange-500 font-semibold mt-2">

                            {
                              problemData.category
                            }

                          </p>

                        )}

                        <p className="text-gray-500 mt-3">

                          Host:{" "}

                          <span className="font-semibold text-[#111827]">

                            {session?.host
                              ?.name ||
                              "Loading..."}

                          </span>

                          {" • "}

                          {session?.participant
                            ? 2
                            : 1}
                          /2 participants

                        </p>

                      </div>

                      {/* RIGHT */}

<div className="flex items-center gap-3 flex-wrap">

  {/* TIMER */}

  <SessionTimer
    startedAt={session?.startedAt}
    endedAt={session?.endedAt}
  />

  {/* DIFFICULTY */}

  <span
    className={`badge border-0 px-4 py-3 font-semibold ${getDifficultyBadgeClass(
      session?.difficulty
    )}`}
  >

    {session?.difficulty
      ?.slice(0, 1)
      .toUpperCase() +
      session?.difficulty?.slice(1)}

  </span>

  {/* END SESSION */}

  {isHost &&
    session?.status === "active" && (

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

                  <div className="p-4 space-y-4">

                    {/* DESCRIPTION */}

                    {problemData?.description && (

                      <div className="bg-[#FFF7ED] border border-orange-100 rounded-[24px] p-4 shadow-sm">

                        <h2 className="text-2xl font-black text-[#111827] mb-4">

                          Description

                        </h2>

                        <div className="space-y-3 text-gray-600 leading-7">

                          <p>
                            {
                              problemData
                                .description.text
                            }
                          </p>

                          {problemData.description.notes?.map(
                            (
                              note,
                              idx
                            ) => (

                              <p key={idx}>
                                {note}
                              </p>

                            )
                          )}

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              </Panel>

              {/* HANDLE */}

              <PanelResizeHandle className="h-[3px] bg-orange-200 hover:bg-orange-400 transition-all duration-300 rounded-full my-1" />

              {/* EDITOR */}

              <Panel
                defaultSize={62}
                minSize={35}
              >

                <PanelGroup direction="vertical">

                  {/* CODE */}

                  <Panel
                    defaultSize={78}
                    minSize={40}
                  >

                    <div className="h-full bg-[#FFF7ED] pt-1 px-1 pb-1">

                      <div className="h-full bg-white border border-orange-100 rounded-[24px] overflow-hidden shadow-sm">

                        <CodeEditorPanel
                          selectedLanguage={
                            selectedLanguage
                          }
                          code={code}
                          isRunning={
                            isRunning
                          }
                          onLanguageChange={
                            handleLanguageChange
                          }
                          onCodeChange={(
                            value
                          ) =>
                            setCode(
                              value
                            )
                          }
                          onRunCode={
                            handleRunCode
                          }
                        />

                      </div>

                    </div>

                  </Panel>

                  {/* HANDLE */}

                  <PanelResizeHandle className="h-[3px] bg-orange-200 hover:bg-orange-400 transition-all duration-300 rounded-full my-1" />

                  {/* OUTPUT */}

                  <Panel
                    defaultSize={22}
                    minSize={12}
                  >

                    <div className="h-full bg-[#FFF7ED] px-1 pb-1 pt-0">

                      <div className="h-full bg-white border border-orange-100 rounded-[20px] overflow-hidden shadow-sm">

                        <OutputPanel
                          output={output}
                        />

                      </div>

                    </div>

                  </Panel>

                </PanelGroup>

              </Panel>

            </PanelGroup>

          </Panel>

          {/* CENTER HANDLE */}

          <PanelResizeHandle className="w-[3px] bg-orange-200 hover:bg-orange-400 transition-all duration-300 rounded-full mx-1" />

          {/* RIGHT VIDEO PANEL */}

          <Panel
            defaultSize={52}
            minSize={30}
          >

            <div className="h-full bg-[#FFF7ED] pl-2">

  {isInitializingCall ? (

    <div className="h-full flex items-center justify-center">

      <div className="bg-white border border-orange-100 rounded-[28px] p-10 text-center shadow-sm">

        <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-orange-500 mb-5" />

        <p className="text-lg font-semibold text-[#111827]">
          Connecting to video call...
        </p>

      </div>

    </div>

  ) : !streamClient || !call ? (

    <div className="h-full flex items-center justify-center">

      <div className="bg-white border border-orange-100 rounded-[28px] p-10 text-center shadow-sm max-w-md w-full">

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

    <div className="h-full bg-white border border-orange-100 rounded-[28px] p-2 shadow-sm">

      <div className="h-full w-full rounded-[22px] overflow-hidden bg-black">

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