import { Link } from "react-router-dom-dom";

import {
  Code2Icon,
  LayoutDashboardIcon,
  LogOutIcon,
  SparklesIcon,
} from "lucide-react";

import {
  UserButton,
  useUser,
} from "@clerk/clerk-react";

function Navbar() {

  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            <div className="size-11 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

              <SparklesIcon className="size-6 text-white" />

            </div>

            <div>

              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Sphere
              </h1>

              <p className="text-xs text-gray-400 -mt-1">
                Interview Platform
              </p>

            </div>

          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-4">

            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-5 py-2 rounded-xl hover:bg-white/10 transition text-gray-300 hover:text-white"
            >

              <LayoutDashboardIcon className="size-5" />

              <span>Dashboard</span>

            </Link>

            <Link
              to="/problems"
              className="flex items-center gap-2 px-5 py-2 rounded-xl hover:bg-white/10 transition text-gray-300 hover:text-white"
            >

              <Code2Icon className="size-5" />

              <span>Problems</span>

            </Link>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {!isSignedIn ? (

              <>
                <Link
                  to="/sign-in"
                  className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition"
                >
                  Login
                </Link>

                <Link
                  to="/sign-up"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition font-semibold"
                >
                  Get Started
                </Link>
              </>

            ) : (

              <div className="flex items-center gap-4">

                <div className="hidden sm:block text-right">

                  <p className="text-sm font-semibold">
                    Welcome Back
                  </p>

                  <p className="text-xs text-gray-400">
                    Ready to code?
                  </p>

                </div>

                <div className="border border-white/10 rounded-full p-1 bg-white/5">
                  <UserButton afterSignOutUrl="/" />
                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;