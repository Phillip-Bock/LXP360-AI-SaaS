"use client";

import Link from "next/link";

export default function HomePage() {
  const isMasterLXD = process.env.NEXT_PUBLIC_GOD_MODE === "true";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">LXP360 Platform</h1>
      <p className="text-lg mb-8">Development Mode</p>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <p>Master LXD Status: {isMasterLXD ? "✅ ENABLED" : "❌ DISABLED"}</p>
        <p>Environment: {process.env.NEXT_PUBLIC_GOD_MODE}</p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-4 w-72">
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center transition-all shadow-lg"
        >
          📊 Role Dashboards (11 Roles)
        </Link>
        <Link
          href="/admin"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg text-center transition-all shadow-lg"
        >
          ⚙️ Admin Panel
        </Link>
        <div className="text-center text-gray-400 text-sm mt-2">
          {isMasterLXD && "🔓 Authentication bypassed in Master LXD"}
        </div>
      </div>

      {/* Master LXD Panel */}
      {isMasterLXD && (
        <div
          className="fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-2xl border-4 border-black w-72"
          style={{ zIndex: 9999 }}
        >
          <div className="font-bold text-lg mb-2">⚡ MASTER LXD ACTIVE</div>
          <div className="text-sm">Role: SUPER_ADMIN</div>
          <div className="text-sm">User: dev@lxp360.com</div>
          <div className="text-xs mt-2 opacity-70">No login required</div>
        </div>
      )}
    </div>
  );
}
