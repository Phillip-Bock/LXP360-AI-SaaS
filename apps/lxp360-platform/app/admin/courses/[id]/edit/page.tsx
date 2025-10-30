import { getCourse } from "@/lib/actions/courses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CourseEditForm } from "@/components/admin/course-edit-form"

export default async function EditCoursePage({ params }: { params: { id: string } }) {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/admin/courses/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Course Details</CardTitle>
            <CardDescription>Update the course information and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <CourseEditForm course={course} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
