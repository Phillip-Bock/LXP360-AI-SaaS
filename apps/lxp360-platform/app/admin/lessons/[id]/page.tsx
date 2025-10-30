import { getLesson } from "@/lib/actions/lessons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function LessonAdminPage({ params }: { params: { id: string } }) {
  const { data: lesson, error } = await getLesson(params.id)

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading lesson: {error || "Lesson not found"}</p>
            <Button asChild className="mt-4">
              <Link href="/admin">Back to Admin</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/admin/courses/${lesson.course_id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">{lesson.title}</h1>
          {lesson.description && <p className="text-muted-foreground">{lesson.description}</p>}
        </div>

        <div className="flex gap-4 mb-8">
          <Button asChild>
            <Link href={`/lesson?lessonId=${lesson.id}`}>Edit Lesson Content</Link>
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Lesson Blocks ({lesson.blocks?.length || 0})</h3>
            {lesson.blocks && lesson.blocks.length > 0 ? (
              <div className="space-y-3">
                {lesson.blocks.map((block: any, index: number) => (
                  <div key={block.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Block {index + 1}: {block.block_type}
                      </span>
                      <span className="text-xs text-muted-foreground">{block.block_category}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Load: {block.cognitive_load_weight} | Time: {block.estimated_time_seconds}s
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No blocks in this lesson yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
