"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface CourseData {
  title: string
  description: string
  instructor: string
  courseType: "e_learning" | "micro_learning"
  estimatedDurationMinutes?: number
}

export interface ModuleData {
  title: string
  description?: string
  orderIndex: number
}

export interface LessonData {
  title: string
  description?: string
  orderIndex: number
  moduleId?: string
}

export async function createCourse(data: CourseData) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Not authenticated" }
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("organization_id")
    .eq("user_id", user.id)
    .single()

  if (!profile?.organization_id) {
    return { error: "No organization found" }
  }

  const { data: course, error } = await supabase
    .from("authoring_courses")
    .insert({
      organization_id: profile.organization_id,
      course_type: data.courseType,
      title: data.title,
      description: data.description,
      estimated_duration_minutes: data.estimatedDurationMinutes || 0,
      status: "draft",
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating course:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  return { data: course }
}

export async function updateCourse(courseId: string, data: Partial<CourseData>) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: course, error } = await supabase
    .from("authoring_courses")
    .update({
      title: data.title,
      description: data.description,
      estimated_duration_minutes: data.estimatedDurationMinutes,
    })
    .eq("id", courseId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating course:", error)
    return { error: error.message }
  }

  revalidatePath("/course-creation")
  return { data: course }
}

export async function createModule(courseId: string, data: ModuleData) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: module, error } = await supabase
    .from("authoring_modules")
    .insert({
      course_id: courseId,
      title: data.title,
      description: data.description,
      order_index: data.orderIndex,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating module:", error)
    return { error: error.message }
  }

  revalidatePath("/course-creation")
  return { data: module }
}

export async function updateModule(moduleId: string, data: Partial<ModuleData>) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: module, error } = await supabase
    .from("authoring_modules")
    .update({
      title: data.title,
      description: data.description,
      order_index: data.orderIndex,
    })
    .eq("id", moduleId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating module:", error)
    return { error: error.message }
  }

  revalidatePath("/course-creation")
  return { data: module }
}

export async function createLesson(courseId: string, data: LessonData) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: lesson, error } = await supabase
    .from("authoring_lessons")
    .insert({
      course_id: courseId,
      module_id: data.moduleId || null,
      title: data.title,
      description: data.description,
      order_index: data.orderIndex,
      estimated_duration_minutes: 0,
      cognitive_load_score: 0,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating lesson:", error)
    return { error: error.message }
  }

  revalidatePath("/course-creation")
  return { data: lesson }
}

export async function updateLesson(lessonId: string, data: Partial<LessonData>) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: lesson, error } = await supabase
    .from("authoring_lessons")
    .update({
      title: data.title,
      description: data.description,
      order_index: data.orderIndex,
    })
    .eq("id", lessonId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating lesson:", error)
    return { error: error.message }
  }

  revalidatePath("/course-creation")
  return { data: lesson }
}

export async function getCourse(courseId: string) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: course, error } = await supabase
    .from("authoring_courses")
    .select(`
      *,
      modules:authoring_modules(
        *,
        lessons:authoring_lessons(*)
      )
    `)
    .eq("id", courseId)
    .single()

  if (error) {
    console.error("[v0] Error fetching course:", error)
    return { error: error.message }
  }

  return { data: course }
}

export async function getUserCourses() {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured", data: [] }
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: "Not authenticated", data: [] }
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("organization_id")
    .eq("user_id", user.id)
    .single()

  if (!profile?.organization_id) {
    return { error: "No organization found", data: [] }
  }

  const { data: courses, error } = await supabase
    .from("authoring_courses")
    .select("*")
    .eq("organization_id", profile.organization_id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching courses:", error)
    return { error: error.message, data: [] }
  }

  return { data: courses || [] }
}

export async function publishCourse(courseId: string) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  const { data: course, error } = await supabase
    .from("authoring_courses")
    .update({ status: "published" })
    .eq("id", courseId)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error publishing course:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard")
  revalidatePath("/course-creation")
  return { data: course }
}

export async function deleteCourse(courseId: string) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  // Delete all blocks in lessons first
  const { data: lessons } = await supabase.from("authoring_lessons").select("id").eq("course_id", courseId)

  if (lessons && lessons.length > 0) {
    const lessonIds = lessons.map((l) => l.id)
    await supabase.from("authoring_blocks").delete().in("lesson_id", lessonIds)
  }

  // Delete all lessons
  await supabase.from("authoring_lessons").delete().eq("course_id", courseId)

  // Delete all modules
  await supabase.from("authoring_modules").delete().eq("course_id", courseId)

  // Delete the course
  const { error } = await supabase.from("authoring_courses").delete().eq("id", courseId)

  if (error) {
    console.error("[v0] Error deleting course:", error)
    return { error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteModule(moduleId: string) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  // Delete all lessons in this module
  const { data: lessons } = await supabase.from("authoring_lessons").select("id").eq("module_id", moduleId)

  if (lessons && lessons.length > 0) {
    const lessonIds = lessons.map((l) => l.id)
    await supabase.from("authoring_blocks").delete().in("lesson_id", lessonIds)
    await supabase.from("authoring_lessons").delete().in("id", lessonIds)
  }

  const { error } = await supabase.from("authoring_modules").delete().eq("id", moduleId)

  if (error) {
    console.error("[v0] Error deleting module:", error)
    return { error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/course-creation")
  return { success: true }
}

export async function deleteLesson(lessonId: string) {
  const supabase = await createClient()

  if (!supabase) {
    return { error: "Database not configured" }
  }

  // Delete all blocks in this lesson
  await supabase.from("authoring_blocks").delete().eq("lesson_id", lessonId)

  // Delete the lesson
  const { error } = await supabase.from("authoring_lessons").delete().eq("id", lessonId)

  if (error) {
    console.error("[v0] Error deleting lesson:", error)
    return { error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/course-creation")
  return { success: true }
}
