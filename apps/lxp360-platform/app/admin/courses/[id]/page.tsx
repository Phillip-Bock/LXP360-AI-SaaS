import { getCourse } from "@/lib/actions/courses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Edit, Plus } from "lucide-react"
import { DeleteCourseButton } from "@/components/admin/delete-course-button"
import { DeleteLessonButton } from "@/components/admin/delete-lesson-button"
import { DeleteModuleButton } from "@/components/admin/delete-module-button"

export default async function CourseAdminPage({ params }: { params: { id: string } }) {
  const { data: course, error } = await getCourse(params.id)

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-destructive">Error loading course: {error || "Course not found"}</p>
            <Button asChild className="mt-4">
              <Link href="/admin">Back to Admin</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const allLessons = course.modules?.flatMap((m: any) => m.lessons || []) || []

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Link>
        </Button>

        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-foreground">{course.title}</h1>
                <Badge variant={course.status === "published" ? "default" : "secondary"}>{course.status}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.estimated_duration_minutes} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{allLessons.length} lessons</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/admin/courses/${course.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Course
                </Link>
              </Button>
              <DeleteCourseButton courseId={course.id} courseName={course.title} />
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Course Structure</h2>
            <Button asChild>
              <Link href={`/course-creation?courseId=${course.id}`}>
                <Plus className="mr-2 h-4 w-4" />
                Add Module/Lesson
              </Link>
            </Button>
          </div>

          {course.modules && course.modules.length > 0 ? (
            <div className="space-y-6">
              {course.modules.map((module: any) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{module.title}</CardTitle>
                        {module.description && <CardDescription className="mt-2">{module.description}</CardDescription>}
                      </div>
                      <DeleteModuleButton moduleId={module.id} moduleName={module.title} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {module.lessons && module.lessons.length > 0 ? (
                      <div className="space-y-3">
                        {module.lessons.map((lesson: any) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                          >
                            <div className="flex-1">
                              <h4 className="font-medium">{lesson.title}</h4>
                              {lesson.description && (
                                <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                              )}
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span>{lesson.estimated_duration_minutes} min</span>
                                <span>Load: {lesson.cognitive_load_score}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/admin/lessons/${lesson.id}`}>
                                  <Edit className="mr-2 h-3 w-3" />
                                  Edit
                                </Link>
                              </Button>
                              <DeleteLessonButton lessonId={lesson.id} lessonName={lesson.title} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No lessons in this module yet.</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  No modules or lessons yet. Start building your course structure.
                </p>
                <Button asChild>
                  <Link href={`/course-creation?courseId=${course.id}`}>Add Content</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
