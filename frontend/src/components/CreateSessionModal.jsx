import {
  Code2Icon,
  LoaderIcon,
  PlusIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react";

import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {

  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      {/* MODAL */}

      <div className="relative w-full max-w-xl bg-white rounded-[30px] border border-blue-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* BG BLUR */}

        <div className="absolute top-0 right-0 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-60" />

        {/* CONTENT */}

        <div className="relative z-10 p-5 sm:p-7">

          {/* HEADER */}

          <div className="flex items-start justify-between mb-7">

            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-4">

                <SparklesIcon className="size-4" />

                New Session

              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] leading-tight">

                Create Interview Room

              </h2>

              <p className="text-gray-500 mt-3 text-sm sm:text-base leading-7 max-w-md">

                Start a real-time collaborative coding interview.

              </p>

            </div>

            {/* CLOSE BUTTON */}

            <button
              onClick={onClose}
              className="size-10 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center shrink-0"
            >

              <XIcon className="size-5 text-gray-600" />

            </button>

          </div>

          {/* FORM */}

          <div className="space-y-6">

            {/* SELECT */}

            <div>

              <label className="block text-sm font-bold text-[#0F172A] mb-3">

                Select Problem

              </label>

              <select
                className="w-full h-14 px-5 rounded-2xl border border-blue-100 bg-[#F8FAFC] focus:outline-none focus:ring-4 focus:ring-blue-100 text-gray-700 font-medium transition-all"
                value={roomConfig.problem}
                onChange={(e) => {

                  const selectedProblem =
                    problems.find(
                      (p) =>
                        p.title === e.target.value
                    );

                  setRoomConfig({
                    difficulty:
                      selectedProblem.difficulty,
                    problem: e.target.value,
                  });

                }}
              >

                <option value="" disabled>
                  Choose a coding problem...
                </option>

                {problems.map((problem) => (

                  <option
                    key={problem.id}
                    value={problem.title}
                  >

                    {problem.title} (
                    {problem.difficulty}
                    )

                  </option>

                ))}

              </select>

            </div>

            {/* SUMMARY */}

            {roomConfig.problem && (

              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-5 shadow-sm">

                <div className="flex items-start gap-4">

                  <div className="size-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">

                    <Code2Icon className="size-6 text-blue-700" />

                  </div>

                  <div>

                    <h3 className="text-lg font-black text-[#0F172A] mb-3">

                      Session Summary

                    </h3>

                    <div className="space-y-2 text-sm text-gray-600">

                      <p className="leading-6">

                        <span className="font-bold text-[#0F172A]">

                          Problem:

                        </span>

                        {" "}
                        {roomConfig.problem}

                      </p>

                      <p className="leading-6">

                        <span className="font-bold text-[#0F172A]">

                          Participants:

                        </span>

                        {" "}
                        2 Developers

                      </p>

                      <p className="leading-6">

                        <span className="font-bold text-[#0F172A]">

                          Difficulty:

                        </span>

                        {" "}
                        {roomConfig.difficulty}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* ACTIONS */}

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-8">

            {/* CANCEL */}

            <button
              onClick={onClose}
              className="h-12 px-6 rounded-2xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 transition-all duration-300"
            >

              Cancel

            </button>

            {/* CREATE */}

            <button
              onClick={onCreateRoom}
              disabled={
                isCreating ||
                !roomConfig.problem
              }
              className="h-12 px-6 rounded-2xl bg-blue-700 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold shadow-xl shadow-blue-100 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
            >

              {isCreating ? (

                <>

                  <LoaderIcon className="size-5 animate-spin" />

                  Creating...

                </>

              ) : (

                <>

                  <PlusIcon className="size-5" />

                  Create Session

                </>

              )}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CreateSessionModal;