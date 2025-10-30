"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface BlockData {
  lessonId: string
  blockType: string
  blockCategory: string
  content: Record<string, any>
  orderIndex: number
  cognitiveLoadWeight?: number
  estimatedTimeSeconds?: number
}

export async function createBlock(data: BlockData) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: block, error } = await supabase
    .from("authoring_blocks")
    .insert({
      lesson_id: data.lessonId,
      block_type: data.blockType,
      block_category: data.blockCategory,
      content: data.content,
      order_index: data.orderIndex,
      cognitive_load_weight: data.cognitiveLoadWeight || 0.1,
      estimated_time_seconds: data.estimatedTimeSeconds || 30,
      completion_status: "incomplete",
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating block:", error)
    return { error: error.message }
  }

  revalidatePath("/lesson")
  return { data: block }
}

export async function updateBlock(blockId: string, data: Partial<BlockData>) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: block, error } = await supabase
    .from("authoring_blocks")
    .update({
      block_type: data.blockType,
      block_category: data.blockCategory,
      content: data.content,
      order_index: data.orderIndex,
      cognitive_load_weight: data.cognitiveLoadWeight,
      estimated_time_seconds: data.estimatedTimeSeconds,
    })
    .eq("id", blockId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating block:", error)
    return { error: error.message }
  }

  revalidatePath("/lesson")
  return { data: block }
}

export async function deleteBlock(blockId: string) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { error } = await supabase.from("authoring_blocks").delete().eq("id", blockId)

  if (error) {
    console.error("[v0] Error deleting block:", error)
    return { error: error.message }
  }

  revalidatePath("/lesson")
  return { success: true }
}

export async function getLessonBlocks(lessonId: string) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured", data: [] }
  }

  const { data: blocks, error } = await supabase
    .from("authoring_blocks")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("order_index", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching blocks:", error)
    return { error: error.message, data: [] }
  }

  return { data: blocks || [] }
}

export async function updateBlockStatus(
  blockId: string,
  status: "incomplete" | "in_progress" | "complete" | "qa_approved",
) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: block, error } = await supabase
    .from("authoring_blocks")
    .update({ completion_status: status })
    .eq("id", blockId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating block status:", error)
    return { error: error.message }
  }

  revalidatePath("/lesson")
  return { data: block }
}

export async function getBlockLibrary() {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured", data: [] }
  }

  const { data: templates, error } = await supabase
    .from("block_library_templates")
    .select("*")
    .eq("is_active", true)
    .order("category", { ascending: true })
    .order("name", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching block library:", error)
    return { error: error.message, data: [] }
  }

  return { data: templates || [] }
}
