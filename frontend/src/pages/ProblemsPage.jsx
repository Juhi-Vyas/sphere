import { Link } from "react-router";

import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";

import { getDifficultyBadgeClass  } from "../lib/utils";

import {
  ChevronRightIcon,
  Code2Icon,
  SparklesIcon,
} from "lucide-react";

function ProblemsPage() {

  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter(
    (p) => p.difficulty === "Easy"
  ).length;

  const mediumProblemsCount = problems.filter(
    (p) => p.difficulty === "Medium"
  ).length;

  const hardProblemsCount = problems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* HEADER */}
        <div className="mb-14">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">

            <SparklesIcon className="size-4 text-blue-400" />

            <span className="text-sm text-blue-300">
              Real-time Coding Practice
            </span>

          </div>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight">

            Solve

            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Coding{" "}
            </span>

            Challenges

          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl leading-relaxed">

            Practice technical interview questions with an
            interactive coding environment and improve your
            problem-solving skills.

          </p>

        </div>

        {/* PROBLEMS */}
        <div className="space-y-5">

          {problems.map((problem) => (

            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block"
            >

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-blue-500/30 hover:scale-[1.01] transition-all duration-300 shadow-xl">

                <div className="flex items-center justify-between gap-5">

                  {/* LEFT */}
                  <div className="flex items-start gap-5 flex-1">

                    {/* ICON */}
                    <div className="size-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center">

                      <Code2Icon className="size-7 text-blue-400" />

                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3 mb-2">

                        <h2 className="text-2xl font-bold">
                          {problem.title}
                        </h2>

                        <span
                          className={`badge ${getDifficultyBadgeClass (
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>

                      </div>

                      <p className="text-blue-400 text-sm mb-3">
                        {problem.category}
                      </p>

                      <p className="text-gray-400 leading-relaxed">
                        {problem.description.text}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="hidden md:flex items-center gap-2 text-blue-400 font-semibold">

                    <span>Solve</span>

                    <ChevronRightIcon className="size-5" />

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* STATS */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center">

            <h2 className="text-5xl font-black text-blue-400">
              {problems.length}
            </h2>

            <p className="text-gray-400 mt-3">
              Total Problems
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center">

            <h2 className="text-5xl font-black text-green-400">
              {easyProblemsCount}
            </h2>

            <p className="text-gray-400 mt-3">
              Easy
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center">

            <h2 className="text-5xl font-black text-yellow-400">
              {mediumProblemsCount}
            </h2>

            <p className="text-gray-400 mt-3">
              Medium
            </p>

          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center">

            <h2 className="text-5xl font-black text-red-400">
              {hardProblemsCount}
            </h2>

            <p className="text-gray-400 mt-3">
              Hard
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ProblemsPage;