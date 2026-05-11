import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* NAVBAR */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-500">
            Sphere
          </h1>

          <div className="flex gap-4">
            <button className="px-5 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
              Login
            </button>

            <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-blue-400 font-semibold mb-4">
            Real-time Coding Interviews
          </p>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Crack Your
            <span className="text-blue-500"> Technical </span>
            Interviews
          </h1>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            A modern interview platform with live coding,
            video calling, screen sharing, and collaborative
            coding experience for developers.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4">
            <button className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold">
              Start Interview
            </button>

            <button className="px-7 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
              Explore Features
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-lg">
                Live Coding
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Real-time collaborative code editor.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-lg">
                Video Calls
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                HD quality interview communication.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-lg">
                Screen Share
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Share your coding screen instantly.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-lg">
                Multi Language
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Supports multiple programming languages.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-lg">
            {/* TOP BAR */}
            <div className="flex gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* CODE BOX */}
            <div className="bg-black rounded-2xl p-6 font-mono text-sm text-green-400">
              <p>function solveProblem() {"{"}</p>

              <p className="ml-4 text-blue-400">
                return "Interview Selected";
              </p>

              <p>{"}"}</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <h2 className="text-2xl font-bold text-blue-400">
                  10K+
                </h2>

                <p className="text-sm text-gray-400">
                  Users
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 text-center">
                <h2 className="text-2xl font-bold text-blue-400">
                  50K+
                </h2>

                <p className="text-sm text-gray-400">
                  Interviews
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 text-center">
                <h2 className="text-2xl font-bold text-blue-400">
                  99%
                </h2>

                <p className="text-sm text-gray-400">
                  Success
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;