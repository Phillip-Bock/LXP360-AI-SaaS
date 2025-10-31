'use client';

import React from 'react';

export const GOD_MODE_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_GOD_MODE === 'true',
  mockUser: {
    id: 'dev-user-001',
    email: 'dev@lxd360.com',
    name: 'Dev Mode User',
    role: 'SUPER_ADMIN',
  }
};

export function DevRoleSwitcher() {
  if (!GOD_MODE_CONFIG.enabled) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-2xl border-4 border-black w-72"
      style={{ zIndex: 9999 }}
    >
      <div className="font-bold text-lg mb-2">⚡ GOD MODE ACTIVE</div>
      <div className="text-sm">Role: {GOD_MODE_CONFIG.mockUser.role}</div>
      <div className="text-sm">User: {GOD_MODE_CONFIG.mockUser.email}</div>
      <div className="text-xs mt-2 opacity-70">No login required in dev mode</div>
    </div>
  );
}

export function hasPermission() {
  return GOD_MODE_CONFIG.enabled;
}

export function getCurrentUser() {
  return GOD_MODE_CONFIG.enabled ? GOD_MODE_CONFIG.mockUser : null;
}
