"use client"

import { useState, useEffect, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  ChevronDown,
  GripVertical,
  MoreHorizontal,
  ChevronRight,
  LayoutGrid,
  HelpCircle,
  AlertCircle,
  Save,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { courseSchema, type ValidationErrors } from "@/lib/validation"
import { useToast } from "@/hooks/use-toast"
import { createCourse, updateCourse, createModule, getCourse, publishCourse } from "@/lib/actions/courses"

interface Lesson {
  id: string
  title: string
  type: "lesson" | "placeholder"
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
  isExpanded: boolean
}

export function CourseEditor() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("id")
  const { toast } = useToast()

  const [courseTitle, setCourseTitle] = useState("Course Title")
  const [courseDescription, setCourseDescription] = useState("")
  const [instructor, setInstructor] = useState("Phillip Bock")
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isValidating, setIsValidating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [dbCourseId, setDbCourseId] = useState<string | null>(courseId)

  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      title: "MODULE TITLE",
      isExpanded: true,
      lessons: [
        { id: "1", title: "Lesson Title", type: "lesson" },
        { id: "2", title: "", type: "placeholder" },
      ],
    },
  ])

  useEffect(() => {
    if (courseId) {
      loadCourse(courseId)
    }
  }, [courseId])

  const loadCourse = async (id: string) => {
    setIsLoading(true)
    const result = await getCourse(id)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (result.data) {
      setCourseTitle(result.data.title)
      setCourseDescription(result.data.description || "")
      setDbCourseId(result.data.id)

      if (result.data.modules && result.data.modules.length > 0) {
        const mappedModules = result.data.modules.map((mod: any) => ({
          id: mod.id,
          title: mod.title,
          isExpanded: true,
          lessons: [
            ...mod.lessons.map((lesson: any) => ({
              id: lesson.id,
              title: lesson.title,
              type: "lesson" as const,
            })),
            { id: `placeholder-${mod.id}`, title: "", type: "placeholder" as const },
          ],
        }))
        setModules(mappedModules)
      }
    }

    setIsLoading(false)
  }

  const saveCourse = async () => {
    if (isSaving) return

    setIsSaving(true)

    try {
      if (!dbCourseId) {
        // Create new course
        const result = await createCourse({
          title: courseTitle,
          description: courseDescription,
          instructor,
          courseType: "e_learning",
        })

        if (result.error) {
          toast({
            title: "Error saving course",
            description: result.error,
            variant: "destructive",
          })
        } else if (result.data) {
          setDbCourseId(result.data.id)
          toast({
            title: "Course created",
            description: "Your course has been saved.",
          })
        }
      } else {
        // Update existing course
        const result = await updateCourse(dbCourseId, {
          title: courseTitle,
          description: courseDescription,
          instructor,
        })

        if (result.error) {
          toast({
            title: "Error updating course",
            description: result.error,
            variant: "destructive",
          })
        }
      }
    } finally {
      setIsSaving(false)
    }
  }

  const validateForm = (): boolean => {
    setIsValidating(true)
    const formData = {
      title: courseTitle,
      description: courseDescription,
      instructor,
      modules: modules.map((m) => ({
        ...m,
        lessons: m.lessons.filter((l) => l.type === "lesson" || l.title.trim() !== ""),
      })),
    }

    const result = courseSchema.safeParse(formData)

    if (!result.success) {
      const newErrors: ValidationErrors = {}
      result.error.errors.forEach((error) => {
        const path = error.path.join(".")
        newErrors[path] = error.message
      })
      setErrors(newErrors)

      toast({
        title: "Validation Error",
        description: "Please fix the errors before publishing.",
        variant: "destructive",
      })

      return false
    }

    setErrors({})
    return true
  }

  const handlePublish = async () => {
    if (!validateForm()) return

    if (!dbCourseId) {
      toast({
        title: "Save Required",
        description: "Please save your course before publishing.",
        variant: "destructive",
      })
      return
    }

    const result = await publishCourse(dbCourseId)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success!",
        description: "Course has been published.",
      })
    }
  }

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const addModule = async () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: "NEW MODULE",
      isExpanded: true,
      lessons: [{ id: Date.now().toString(), title: "", type: "placeholder" }],
    }
    setModules([...modules, newModule])
    clearError("modules")

    if (dbCourseId) {
      const result = await createModule(dbCourseId, {
        title: newModule.title,
        orderIndex: modules.length,
      })

      if (result.data) {
        // Update local state with database ID
        setModules((prev) => prev.map((m) => (m.id === newModule.id ? { ...m, id: result.data.id } : m)))
      }
    }
  }

  const addLesson = (moduleId: string) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          const newLesson: Lesson = {
            id: Date.now().toString(),
            title: "",
            type: "placeholder",
          }
          return {
            ...module,
            lessons: [...module.lessons, newLesson],
          }
        }
        return module
      }),
    )
  }

  const toggleModule = (moduleId: string) => {
    setModules(
      modules.map((module) => (module.id === moduleId ? { ...module, isExpanded: !module.isExpanded } : module)),
    )
  }

  const handleLessonKeyDown = (e: KeyboardEvent<HTMLInputElement>, moduleId: string, lessonId: string) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const target = e.target as HTMLInputElement
      const title = target.value.trim()

      if (title) {
        if (e.shiftKey) {
          // Shift+Enter: Convert to module
          const newModule: Module = {
            id: Date.now().toString(),
            title: title.toUpperCase(),
            isExpanded: true,
            lessons: [{ id: Date.now().toString(), title: "", type: "placeholder" }],
          }
          setModules([...modules, newModule])

          // Clear the current input
          setModules(
            modules.map((module) =>
              module.id === moduleId
                ? {
                    ...module,
                    lessons: module.lessons.map((lesson) =>
                      lesson.id === lessonId ? { ...lesson, title: "" } : lesson,
                    ),
                  }
                : module,
            ),
          )
        } else {
          // Enter: Convert to lesson
          setModules(
            modules.map((module) =>
              module.id === moduleId
                ? {
                    ...module,
                    lessons: module.lessons.map((lesson) =>
                      lesson.id === lessonId ? { ...lesson, title, type: "lesson" as const } : lesson,
                    ),
                  }
                : module,
            ),
          )

          // Add new placeholder lesson
          addLesson(moduleId)
        }
      }
    }
  }

  const handleCreateLesson = () => {
    router.push("/lesson")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium">Loading course...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)]">
      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {isSaving ? "Saving..." : dbCourseId ? "Saved" : "Not saved"}
            </div>
            <Button
              onClick={saveCourse}
              disabled={isSaving}
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Course"}
            </Button>
          </div>

          {/* Course Header */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  value={courseTitle}
                  onChange={(e) => {
                    setCourseTitle(e.target.value)
                    clearError("title")
                  }}
                  className={`text-4xl font-bold border-none bg-transparent p-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 ${
                    errors.title ? "text-destructive" : ""
                  }`}
                  placeholder="Enter course title..."
                />
                {errors.title && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.title}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>PB</AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2 p-0 h-auto font-medium text-foreground">
                      {instructor} <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setInstructor("Phillip Bock")}>Phillip Bock</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInstructor("Jane Smith")}>Jane Smith</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setInstructor("John Doe")}>John Doe</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="h-1 w-24 bg-primary rounded-full" />
            </div>

            <div className="space-y-2">
              <Textarea
                value={courseDescription}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    setCourseDescription(e.target.value)
                    clearError("description")
                  }
                }}
                placeholder="Describe your course..."
                className={`min-h-[120px] resize-none border-none bg-transparent p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0 ${
                  errors.description ? "text-destructive" : ""
                }`}
                maxLength={1000}
              />
              <div className="flex items-center justify-between">
                <div>
                  {errors.description && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.description}</span>
                    </div>
                  )}
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  {courseDescription.length}/1000 characters
                </div>
              </div>
            </div>
          </div>

          {/* Course Structure */}
          <div className="space-y-6">
            {errors.modules && (
              <div className="flex items-center gap-2 text-destructive text-sm p-4 bg-destructive/10 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.modules}</span>
              </div>
            )}

            {modules.map((module) => (
              <Card key={module.id} className="border border-border">
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {/* Module Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleModule(module.id)}
                          className="p-0 h-auto"
                        >
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${module.isExpanded ? "rotate-90" : ""}`}
                          />
                        </Button>
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <Input
                          value={module.title}
                          onChange={(e) => {
                            setModules(modules.map((m) => (m.id === module.id ? { ...m, title: e.target.value } : m)))
                            clearError("modules")
                          }}
                          className="border-none bg-transparent p-0 font-semibold text-sm tracking-wide uppercase text-muted-foreground focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    {/* Module Content */}
                    {module.isExpanded && (
                      <div className="p-4 space-y-3">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center gap-3 group">
                            <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                            {lesson.type === "placeholder" ? (
                              <Input
                                value={lesson.title}
                                onChange={(e) => {
                                  setModules(
                                    modules.map((m) =>
                                      m.id === module.id
                                        ? {
                                            ...m,
                                            lessons: m.lessons.map((l) =>
                                              l.id === lesson.id ? { ...l, title: e.target.value } : l,
                                            ),
                                          }
                                        : m,
                                    ),
                                  )
                                }}
                                onKeyDown={(e) => handleLessonKeyDown(e, module.id, lesson.id)}
                                placeholder="Add a lesson title..."
                                className="border-none bg-transparent p-0 text-muted-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                              />
                            ) : (
                              <Input
                                value={lesson.title}
                                onChange={(e) => {
                                  setModules(
                                    modules.map((m) =>
                                      m.id === module.id
                                        ? {
                                            ...m,
                                            lessons: m.lessons.map((l) =>
                                              l.id === lesson.id ? { ...l, title: e.target.value } : l,
                                            ),
                                          }
                                        : m,
                                    ),
                                  )
                                }}
                                className="border-none bg-transparent p-0 text-foreground focus-visible:ring-0"
                              />
                            )}
                            {lesson.type === "lesson" && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80">
                                  <DropdownMenuItem
                                    className="flex items-start gap-3 p-4 cursor-pointer"
                                    onClick={handleCreateLesson}
                                  >
                                    <LayoutGrid className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <div className="font-medium">Create Lesson</div>
                                      <div className="text-sm text-muted-foreground">
                                        Create a new lesson from a wide range of learning blocks.
                                      </div>
                                    </div>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-start gap-3 p-4 cursor-pointer">
                                    <HelpCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <div className="font-medium">Create Quiz</div>
                                      <div className="text-sm text-muted-foreground">
                                        Test the learner's knowledge with a quiz.
                                      </div>
                                    </div>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="p-4 cursor-pointer">
                                    <div className="text-sm text-muted-foreground underline">Lesson templates</div>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        ))}

                        <div className="pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addLesson(module.id)}
                            className="gap-2 text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-4 w-4" />
                            Add Lesson
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" onClick={addModule} className="gap-2 w-full border-dashed bg-transparent">
              <Plus className="h-4 w-4" />
              Add Module
            </Button>
          </div>

          <div className="flex items-center justify-between p-6 bg-card rounded-lg border border-border">
            <div className="space-y-1">
              <h3 className="font-semibold">Ready to publish?</h3>
              <p className="text-sm text-muted-foreground">Make sure all required fields are filled out correctly.</p>
            </div>
            <Button
              onClick={handlePublish}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Validate & Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
