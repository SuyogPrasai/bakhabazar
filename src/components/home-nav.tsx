"use client";

import React from "react";
import { Home, Search, Bell } from "lucide-react";
import { NotificationsBell } from "./notification-bell";
import Link from "next/link";

function HomeNav() {
  return (
    <div className="flex items-center justify-between bg-[#1a1a1a] px-4 py-3 rounded-t-xl">
      <div></div>
      {/* Middle section with Home + Search */}
      <div className="flex items-center gap-3 w-1/2 max-w-lg justify-center">
        {/* Home Icon */}
        <Link href="/" passHref>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#2a2a2a] transition cursor-pointer">
            <Home className="h-5 w-5 text-highlight-light" />
          </button>
        </Link>

        {/* Search Input */}
        <div className="flex items-center bg-[#2a2a2a] px-4 py-3 rounded-full w-full">
          <Search className="h-5 w-5 text-highlight-light mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-white w-full placeholder-highlight-light"
          />
        </div>
      </div>
      <div className="flex items-center mr-10 gap-5">
        {/* Left - Signup Button */}
        <div className="flex items-center">
          <Link href="/register" passHref>
            <button
              className="px-4 py-2 rounded-full bg-highlight-light text-black font-medium 
               hover:opacity-90 hover:scale-105 hover:shadow-lg 
               transition transform duration-200 cursor-pointer"
            >
              Sign up
            </button>
          </Link>

        </div>
        {/* Right - Notifications */}

        <NotificationsBell />
      </div>

    </div>
  );
}

export default HomeNav;
