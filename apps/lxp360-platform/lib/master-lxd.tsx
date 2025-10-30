"use client";

import React from "react";

export const MASTER_LXD_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_GOD_MODE === "true",
  mockUser: {
    id: "dev-user-001",
    email: "dev@lxp360.com",
    name: "Master LXD User",
    role: "SUPER_ADMIN",
  },
};

export function DevRoleSwitcher() {
  if (!MASTER_LXD_CONFIG.enabled) return null;

  return React.createElement(
    "div",
    {
      className:
        "fixed bottom-4 right-4 z-[9999] bg-yellow-500 text-black p-4 rounded-lg shadow-2xl border-4 border-black w-72",
    },
    React.createElement(
      "div",
      { className: "font-bold text-lg" },
      "⚡ MASTER LXD ACTIVE",
    ),
    React.createElement(
      "div",
      { className: "text-sm mt-2" },
      "Role: " + MASTER_LXD_CONFIG.mockUser.role,
    ),
    React.createElement(
      "div",
      { className: "text-xs mt-2 opacity-70" },
      "No login required in dev mode",
    ),
  );
}

export function hasPermission() {
  return MASTER_LXD_CONFIG.enabled;
}

export function getCurrentUser() {
  return MASTER_LXD_CONFIG.enabled ? MASTER_LXD_CONFIG.mockUser : null;
}
