"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateCourse } from "@/lib/actions/courses"
import { toast } from "sonner"

export function CourseEditForm({ course }: { course: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      estimatedDurationMinutes: Number.parseInt(formData.get("duration") as string) || 0,
    }

    const result = await updateCourse(course.id, data)

    if (result.error) {
      toast.error("Failed to update course", {
        description: result.error,
      })
      setIsSubmitting(false)
    } else {
      toast.success("Course updated successfully")
      router.push(`/admin/courses/${course.id}`)
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Course Title</Label>
        <Input id="title" name="title" defaultValue={course.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={course.description} rows={4} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Estimated Duration (minutes)</Label>
        <Input id="duration" name="duration" type="number" min="0" defaultValue={course.estimated_duration_minutes} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
