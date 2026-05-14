import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";

import { getDifficultyBadgeClass } from "../lib/utils";

import {
  ChevronRightIcon,
  Code2Icon,
  SparklesIcon,
  SearchIcon,
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

    <div className="min-h-screen bg-[#FFF7ED]">

      <Navbar />

      {/* PAGE */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20">

        {/* HERO */}

        <div className="relative overflow-hidden bg-white border border-orange-100 rounded-[40px] p-6 sm:p-10 lg:p-14 shadow-[0_10px_40px_rgba(251,146,60,0.08)] mb-14">

          {/* BG EFFECT */}

          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40" />

          <div className="absolute bottom-0 left-0 w-60 h-60 bg-orange-50 rounded-full blur-3xl opacity-60" />

          <div className="relative z-10">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold mb-6 text-sm">

              <SparklesIcon className="size-4" />

              Real-time Coding Practice

            </div>

            {/* TITLE */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-[#111827] max-w-4xl">

              Solve

              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">

                {" "}Coding{" "}

              </span>

              Challenges

            </h1>

            {/* DESC */}

            <p className="mt-6 text-base sm:text-lg text-gray-500 leading-8 max-w-3xl">

              Practice technical interview questions with
              collaborative coding environments and improve
              your problem-solving skills.

            </p>

            {/* SEARCH */}

            <div className="mt-8 relative max-w-xl">

              <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-orange-400" />

              <input
                type="text"
                placeholder="Search coding problems..."
                className="w-full h-14 pl-14 pr-5 rounded-2xl border border-orange-100 bg-[#FFF7ED] focus:outline-none focus:ring-4 focus:ring-orange-100 text-gray-700 shadow-sm"
              />

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">

          {/* CARD */}

          <div className="bg-white rounded-[28px] border border-orange-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">

            <h2 className="text-4xl font-black text-orange-500 mb-2">

              {problems.length}

            </h2>

            <p className="text-gray-500 font-medium">

              Total Problems

            </p>

          </div>

          {/* CARD */}

          <div className="bg-white rounded-[28px] border border-orange-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">

            <h2 className="text-4xl font-black text-green-500 mb-2">

              {easyProblemsCount}

            </h2>

            <p className="text-gray-500 font-medium">

              Easy

            </p>

          </div>

          {/* CARD */}

          <div className="bg-white rounded-[28px] border border-orange-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">

            <h2 className="text-4xl font-black text-yellow-500 mb-2">

              {mediumProblemsCount}

            </h2>

            <p className="text-gray-500 font-medium">

              Medium

            </p>

          </div>

          {/* CARD */}

          <div className="bg-white rounded-[28px] border border-orange-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">

            <h2 className="text-4xl font-black text-red-500 mb-2">

              {hardProblemsCount}

            </h2>

            <p className="text-gray-500 font-medium">

              Hard

            </p>

          </div>

        </div>

        {/* PROBLEMS */}

        <div className="space-y-5">

          {problems.map((problem) => (

            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block"
            >

              <div className="group bg-white rounded-[32px] border border-orange-100 p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                  {/* LEFT */}

                  <div className="flex items-start gap-5 flex-1">

                    {/* ICON */}

                    <div className="size-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">

                      <Code2Icon className="size-7 text-orange-500" />

                    </div>

                    {/* CONTENT */}

                    <div className="flex-1">

                      {/* TOP */}

                      <div className="flex flex-wrap items-center gap-3 mb-3">

                        <h2 className="text-2xl font-black text-[#111827]">

                          {problem.title}

                        </h2>

                        <span
                          className={`badge border-0 px-4 py-3 font-semibold ${getDifficultyBadgeClass(
                            problem.difficulty
                          )}`}
                        >

                          {problem.difficulty}

                        </span>

                      </div>

                      {/* CATEGORY */}

                      <p className="text-orange-500 text-sm font-bold mb-3 uppercase tracking-wide">

                        {problem.category}

                      </p>

                      {/* DESC */}

                      <p className="text-gray-500 leading-8">

                        {problem.description.text}

                      </p>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="hidden md:flex items-center gap-2 text-orange-500 font-bold group-hover:translate-x-1 transition-transform">

                    <span>

                      Solve

                    </span>

                    <ChevronRightIcon className="size-5" />

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );

}

export default ProblemsPage;