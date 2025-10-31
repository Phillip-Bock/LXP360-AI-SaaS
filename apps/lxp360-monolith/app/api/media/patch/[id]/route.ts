import { type NextRequest, NextResponse } from "next/server"
import { sanityServerClient } from "@/lib/sanity/server-client"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { id } = params

    // Handle unlock operation
    if (body.unlock) {
      await sanityServerClient.patch(id).unset(["lockedBy", "lockedAt", "lockExpires"]).commit()
      return NextResponse.json({ ok: true })
    }

    // Handle regular patch operations
    const patch = sanityServerClient.patch(id)

    // Apply all fields from body
    Object.entries(body).forEach(([key, value]) => {
      if (key !== "unlock") {
        patch.set({ [key]: value })
      }
    })

    await patch.commit()

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Patch error:", error)
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Patch failed" },
      { status: 500 },
    )
  }
}
