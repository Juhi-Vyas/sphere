import { Link } from "react-router-dom";

import {
  Code2Icon,
  VideoIcon,
  MonitorIcon,
  Layers3Icon,
  SparklesIcon,
} from "lucide-react";

import { SignInButton } from "@clerk/clerk-react";

function HomePage() {

  return (

    <div className="min-h-screen bg-[#FFFDF9] text-[#1A1A1A] overflow-hidden">

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-orange-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="size-10 sm:size-11 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg">

              <SparklesIcon className="size-5 sm:size-6 text-white" />

            </div>

            <div>

              <h1 className="text-2xl sm:text-3xl font-black text-orange-500">
                Sphere
              </h1>

              <p className="text-[10px] sm:text-xs text-gray-500 -mt-1">
                Interview Platform
              </p>

            </div>

          </Link>

          {/* BUTTON */}

          <SignInButton mode="modal">

            <button className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105">

              Sign In

            </button>

          </SignInButton>

        </div>

      </nav>

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT */}

          <div className="text-center lg:text-left">

            {/* BADGE */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-500 font-medium mb-6 text-sm sm:text-base">

              <SparklesIcon className="size-4" />

              Real-time Coding Interviews

            </div>

            {/* HEADING */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-[-2px] lg:tracking-[-3px] mb-6 sm:mb-8">

              We Create

              <br />

              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">

                Solutions

              </span>

              <br />

              For Developers

            </h1>

            {/* DESCRIPTION */}

            <p className="text-base sm:text-lg lg:text-xl text-gray-500 leading-[1.9] max-w-2xl mb-10 sm:mb-12 mx-auto lg:mx-0">

              Practice coding interviews with live collaboration,
              video communication, screen sharing, and
              multi-language coding environments.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-5">

              <SignInButton mode="modal">

                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-bold shadow-xl shadow-orange-100 transition-all duration-300 hover:scale-105">

                  Get Started

                </button>

              </SignInButton>

              <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-orange-200 bg-white hover:bg-orange-50 transition-all duration-300 font-semibold text-orange-500">

                Learn More

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center mt-10 lg:mt-0">

            {/* BG CIRCLE */}

            <div className="absolute w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full bg-orange-100 blur-3xl opacity-70" />

            {/* IMAGE */}

            <img
              src="/hero.png"
              alt="hero"
              className="relative w-full max-w-[280px] sm:max-w-md lg:max-w-lg object-contain lg:-translate-y-6 drop-shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">

        {/* SECTION HEADER */}

        <div className="text-center mb-14 sm:mb-16">

          <p className="text-orange-500 font-semibold mb-3 tracking-wide text-sm sm:text-base">

            FEATURES

          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 leading-tight">

            We Provide The Best Services

          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto text-base sm:text-lg leading-8">

            Everything needed for seamless coding interviews
            and collaborative programming sessions.

          </p>

        </div>

        {/* CARDS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* CARD 1 */}

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

            <div className="size-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">

              <Code2Icon className="size-7 text-orange-500" />

            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-3">

              Live Coding

            </h3>

            <p className="text-gray-500 leading-relaxed">

              Real-time collaborative code editor
              with multi-language support.

            </p>

          </div>

          {/* CARD 2 */}

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

            <div className="size-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">

              <VideoIcon className="size-7 text-green-500" />

            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-3">

              Video Calls

            </h3>

            <p className="text-gray-500 leading-relaxed">

              HD quality interviews with
              real-time communication.

            </p>

          </div>

          {/* CARD 3 */}

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

            <div className="size-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">

              <MonitorIcon className="size-7 text-blue-500" />

            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-3">

              Screen Share

            </h3>

            <p className="text-gray-500 leading-relaxed">

              Share coding screens instantly
              during interviews.

            </p>

          </div>

          {/* CARD 4 */}

          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-orange-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">

            <div className="size-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">

              <Layers3Icon className="size-7 text-purple-500" />

            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-3">

              Multi Language

            </h3>

            <p className="text-gray-500 leading-relaxed">

              Supports JavaScript, Python,
              Java, and more.

            </p>

          </div>

        </div>

      </section>

    </div>

  );

}

export default HomePage;