"use client";

import { LoginForm } from "@/components/login-form";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center p-6 md:p-10 overflow-hidden bg-[#0e0e0e]">
      {/* Subtle dark grey illustration/texture */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%23666' stroke-width='1'%3E%3Ccircle cx='30' cy='30' r='29'/%3E%3Cpath d='M0 30h60M30 0v60'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Login card (sits above everything) */}
      <div className="w-full max-w-sm md:max-w-3xl z-20">
        <LoginForm />
      </div>
    </div>
  );
}
