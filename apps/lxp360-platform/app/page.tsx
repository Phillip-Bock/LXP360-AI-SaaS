"use client";

export default function HomePage() {
  const isGodMode = process.env.NEXT_PUBLIC_GOD_MODE === "true";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">LXP360 Platform</h1>
      <p className="text-lg mb-8">Development Mode</p>

      <div className="bg-gray-800 p-6 rounded-lg">
        <p>God Mode Status: {isGodMode ? "✅ ENABLED" : "❌ DISABLED"}</p>
        <p>Environment: {process.env.NEXT_PUBLIC_GOD_MODE}</p>
      </div>

      {/* God Mode Panel */}
      {isGodMode && (
        <div
          className="fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-2xl border-4 border-black w-72"
          style={{ zIndex: 9999 }}
        >
          <div className="font-bold text-lg mb-2">⚡ GOD MODE ACTIVE</div>
          <div className="text-sm">Role: SUPER_ADMIN</div>
          <div className="text-sm">User: dev@lxd360.com</div>
          <div className="text-xs mt-2 opacity-70">No login required</div>
        </div>
      )}
    </div>
  );
}
