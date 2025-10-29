"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface LessonBlockData {
  blockType: string
  blockCategory: string
  content: any
  orderIndex: number
  cognitiveLoadWeight?: number
  estimatedTimeSeconds?: number
}

export async function saveLesson(lessonId: string, data: { title: string; blocks: LessonBlockData[] }) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { error: lessonError } = await supabase
    .from("authoring_lessons")
    .update({ title: data.title })
    .eq("id", lessonId)

  if (lessonError) {
    console.error("[v0] Error updating lesson:", lessonError)
    return { error: lessonError.message }
  }

  const { error: deleteError } = await supabase.from("authoring_blocks").delete().eq("lesson_id", lessonId)

  if (deleteError) {
    console.error("[v0] Error deleting old blocks:", deleteError)
    return { error: deleteError.message }
  }

  if (data.blocks.length > 0) {
    const blocksToInsert = data.blocks.map((block) => ({
      lesson_id: lessonId,
      block_type: block.blockType,
      block_category: block.blockCategory,
      content: block.content,
      order_index: block.orderIndex,
      cognitive_load_weight: block.cognitiveLoadWeight || 5,
      estimated_time_seconds: block.estimatedTimeSeconds || 60,
      completion_status: "incomplete",
    }))

    const { error: insertError } = await supabase.from("authoring_blocks").insert(blocksToInsert)

    if (insertError) {
      console.error("[v0] Error inserting blocks:", insertError)
      return { error: insertError.message }
    }
  }

  const totalCognitiveLoad = data.blocks.reduce((sum, block) => sum + (block.cognitiveLoadWeight || 5), 0)
  const totalDuration = Math.ceil(data.blocks.reduce((sum, block) => sum + (block.estimatedTimeSeconds || 60), 0) / 60)

  await supabase
    .from("authoring_lessons")
    .update({
      cognitive_load_score: totalCognitiveLoad,
      estimated_duration_minutes: totalDuration,
    })
    .eq("id", lessonId)

  revalidatePath("/lesson")
  revalidatePath("/course-creation")
  return { success: true }
}

export async function getLesson(lessonId: string) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: lesson, error } = await supabase
    .from("authoring_lessons")
    .select(
      `
      *,
      blocks:authoring_blocks(*)
    `,
    )
    .eq("id", lessonId)
    .single()

  if (error) {
    console.error("[v0] Error fetching lesson:", error)
    return { error: error.message }
  }

  return { data: lesson }
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
    .order("category")
    .order("name")

  if (error) {
    console.error("[v0] Error fetching block library:", error)
    return { error: error.message, data: [] }
  }

  return { data: templates || [] }
}

export async function updateLesson(lessonId: string, data: { title?: string }) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { error } = await supabase.from("authoring_lessons").update(data).eq("id", lessonId)

  if (error) {
    console.error("[v0] Error updating lesson:", error)
    return { error: error.message }
  }

  revalidatePath("/lesson")
  revalidatePath("/course-creation")
  return { success: true }
}

export async function addBlockToLesson(
  lessonId: string,
  blockData: {
    block_type: string
    content: any
    order_index: number
    cognitive_load_weight?: number
    estimated_time_seconds?: number
  },
) {
  const supabase = await createClient()

  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from("authoring_blocks")
    .insert({
      lesson_id: lessonId,
      block_type: blockData.block_type,
      block_category: "general",
      content: blockData.content,
      order_index: blockData.order_index,
      cognitive_load_weight: blockData.cognitive_load_weight || 5,
      estimated_time_seconds: blockData.estimated_time_seconds || 60,
      completion_status: "incomplete",
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error adding block:", error)
    return null
  }

  revalidatePath("/lesson")
  return data
}

export async function updateBlock(blockId: string, data: any) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { error } = await supabase.from("authoring_blocks").update(data).eq("id", blockId)

  if (error) {
    console.error("[v0] Error updating block:", error)
    return { error: error.message }
  }

  revalidatePath("/lesson")
  return { success: true }
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
