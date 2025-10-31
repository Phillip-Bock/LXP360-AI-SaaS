import { updateSessionWithRBAC } from "@/lib/rbac/middleware"
import type { NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  return await updateSessionWithRBAC(request)
}
