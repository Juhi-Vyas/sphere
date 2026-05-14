import { Link, useLocation } from "react-router-dom";

import {
  Code2Icon,
  LayoutDashboardIcon,
  SparklesIcon,
} from "lucide-react";

import {
  UserButton,
  useUser,
} from "@clerk/clerk-react";

function Navbar() {

  const { isSignedIn } = useUser();

  const location = useLocation();

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Problems",
      path: "/problems",
      icon: Code2Icon,
    },
  ];

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-orange-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        <div className="flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            {/* ICON */}

            <div className="size-10 sm:size-11 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-100 transition-all duration-300 group-hover:scale-105">

              <SparklesIcon className="size-5 sm:size-6 text-white" />

            </div>

            {/* TEXT */}

            <div>

              <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">

                Sphere

              </h1>

              <p className="text-[10px] sm:text-xs text-gray-500 -mt-1">

                Interview Platform

              </p>

            </div>

          </Link>

          {/* NAV LINKS */}

          <div className="hidden md:flex items-center gap-3">

            {navLinks.map((link) => {

              const Icon = link.icon;

              const isActive =
                location.pathname === link.path;

              return (

                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 font-semibold ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-100"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >

                  <Icon className="size-5" />

                  <span>
                    {link.name}
                  </span>

                </Link>

              );

            })}

          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-4">

            {!isSignedIn ? (

              <div className="flex items-center gap-3">

                {/* LOGIN */}

                <Link
                  to="/sign-in"
                  className="px-5 py-2.5 rounded-2xl border border-orange-100 bg-white text-gray-600 font-semibold hover:bg-orange-50 hover:text-orange-500 transition-all duration-300"
                >

                  Login

                </Link>

                {/* SIGNUP */}

                <Link
                  to="/sign-up"
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-semibold shadow-lg shadow-orange-100 hover:scale-105 transition-all duration-300"
                >

                  Get Started

                </Link>

              </div>

            ) : (

              <div className="flex items-center gap-4">

                {/* TEXT */}

                <div className="hidden sm:block text-right">

                  <p className="text-sm font-bold text-[#111827]">

                    Welcome Back

                  </p>

                  <p className="text-xs text-gray-500">

                    Ready to code?

                  </p>

                </div>

                {/* USER */}

                <div className="rounded-full border border-orange-100 p-1 bg-white shadow-sm">

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