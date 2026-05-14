import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

import {
  PlusIcon,
  SparklesIcon,
  UsersIcon,
  Clock3Icon,
  ArrowRightIcon,
} from "lucide-react";

import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {

  const navigate = useNavigate();

  const { user } = useUser();

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [roomConfig, setRoomConfig] =
    useState({
      problem: "",
      difficulty: "",
    });

  const createSessionMutation =
    useCreateSession();

  const {
    data: activeSessionsData,
  } = useActiveSessions();

  const {
    data: recentSessionsData,
  } = useMyRecentSessions();

  const handleCreateRoom = () => {

    if (
      !roomConfig.problem ||
      !roomConfig.difficulty
    ) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty:
          roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {

          setShowCreateModal(false);

          navigate(
            `/session/${data.session._id}`
          );

        },
      }
    );

  };

  const activeSessions =
    activeSessionsData?.sessions || [];

  const recentSessions =
    recentSessionsData?.sessions || [];

  return (

    <>
      <div className="min-h-screen bg-[#FFFDF9]">

        {/* NAVBAR */}

        <Navbar />

        {/* HERO */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-14">

          <div className="bg-white border border-orange-100 rounded-[40px] p-8 sm:p-12 shadow-sm relative overflow-hidden">

            {/* BG BLUR */}

            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-60" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

              {/* LEFT */}

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-500 font-medium mb-6 text-sm">

                  <SparklesIcon className="size-4" />

                  Welcome Back

                </div>

                <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4 text-blue-400">

                  Hello,

                  <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">

                    {" "}
                    {user?.firstName || "Developer"}

                  </span>

                </h1>

                <p className="text-gray-500 text-lg leading-8 max-w-2xl">

                  Continue your coding interview preparation
                  with live collaboration and real-time sessions.

                </p>

              </div>

              {/* BUTTON */}

              <button
                onClick={() =>
                  setShowCreateModal(true)
                }
                className="group px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold shadow-xl shadow-orange-100 transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >

                <PlusIcon className="size-5" />

                Create Session

                <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />

              </button>

            </div>

          </div>

        </section>

        {/* STATS */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* CARD */}

            <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">

              <div className="size-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">

                <UsersIcon className="size-7 text-orange-500" />

              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-2">

                {activeSessions.length}

              </h2>

              <p className="text-gray-500 text-lg">

                Active Sessions

              </p>

            </div>

            {/* CARD */}

            <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">

              <div className="size-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">

                <Clock3Icon className="size-7 text-green-500" />

              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-2">

                {recentSessions.length}

              </h2>

              <p className="text-gray-500 text-lg">

                Total Sessions

              </p>

            </div>

            {/* CARD */}

            <div className="bg-white rounded-3xl border border-orange-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">

              <div className="size-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">

                <SparklesIcon className="size-7 text-purple-500" />

              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-2">

                99%

              </h2>

              <p className="text-gray-500 text-lg">

                Interview Success

              </p>

            </div>

          </div>

        </section>

        {/* ACTIVE SESSIONS */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">

          <div className="flex items-center justify-between mb-10">

            <div>

              <p className="text-orange-500 font-semibold mb-2">

                LIVE SESSIONS

              </p>

              <h2 className="text-4xl font-black text-blue-400">

                Active Interview Rooms

              </h2>

            </div>

          </div>

          {/* SESSION LIST */}

          <div className="grid gap-6">

            {activeSessions.length > 0 ? (

              activeSessions.map((session) => (

                <div
                  key={session._id}
                  className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                    {/* LEFT */}

                    <div>

                      <div className="flex flex-wrap items-center gap-3 mb-4">

                        <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-500 text-sm font-semibold">

                          {session.difficulty}

                        </span>

                        <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-500 text-sm font-semibold">

                          Live

                        </span>

                      </div>

                      <h3 className="text-3xl font-black mb-3 text-blue-400">

                        {session.problem}

                      </h3>

                      <p className="text-gray-500 text-lg">

                        Hosted by{" "}
                        <span className="font-semibold text-gray-700">

                          {session.host?.name}

                        </span>

                      </p>

                    </div>

                    {/* BUTTON */}

                    <button
                      onClick={() =>
                        navigate(
                          `/session/${session._id}`
                        )
                      }
                      className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold shadow-lg shadow-orange-100 transition-all duration-300 hover:scale-105"
                    >

                      Join Session

                    </button>

                  </div>

                </div>

              ))

            ) : (

              <div className="bg-white rounded-3xl border border-orange-100 p-16 text-center shadow-sm">

                <div className="size-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">

                  <SparklesIcon className="size-10 text-orange-500" />

                </div>

                <h3 className="text-3xl font-black mb-4 text-blue-400">

                  No Active Sessions

                </h3>

                <p className="text-gray-500 text-lg">

                  Create a new coding interview session to start collaborating.

                </p>

              </div>

            )}

          </div>

        </section>

      </div>

      {/* MODAL */}

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={
          createSessionMutation.isPending
        }
      />

    </>
  );

}

export default DashboardPage;