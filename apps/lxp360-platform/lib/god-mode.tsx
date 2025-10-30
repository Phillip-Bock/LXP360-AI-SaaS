"use client";

import React from "react";

export const GOD_MODE_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_GOD_MODE === "true",
  mockUser: {
    id: "dev-user-001",
    email: "dev@lxd360.com",
    name: "Dev Mode User",
    role: "SUPER_ADMIN",
  },
};

export function DevRoleSwitcher() {
  if (!GOD_MODE_CONFIG.enabled) return null;

  return React.createElement(
    "div",
    {
      className:
        "fixed bottom-4 right-4 z-[9999] bg-yellow-500 text-black p-4 rounded-lg shadow-2xl border-4 border-black w-72",
    },
    React.createElement(
      "div",
      { className: "font-bold text-lg" },
      "⚡ GOD MODE ACTIVE",
    ),
    React.createElement(
      "div",
      { className: "text-sm mt-2" },
      "Role: " + GOD_MODE_CONFIG.mockUser.role,
    ),
    React.createElement(
      "div",
      { className: "text-xs mt-2 opacity-70" },
      "No login required in dev mode",
    ),
  );
}

export function hasPermission() {
  return GOD_MODE_CONFIG.enabled;
}

export function getCurrentUser() {
  return GOD_MODE_CONFIG.enabled ? GOD_MODE_CONFIG.mockUser : null;
}
