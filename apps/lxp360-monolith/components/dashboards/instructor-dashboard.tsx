import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, Users, ChartBar, Upload, PencilLine } from "@phosphor-icons/react/dist/ssr"

export function InstructorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#F5F5F5] mb-2 font-montserrat">Instructor Dashboard</h1>
        <p className="text-[#F5F5F5]/70 font-lato">Create and manage your courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <Link href="/admin/courses">
          <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px] hover:shadow-[0_4px_20px_0_rgba(113,3,160,0.5)] transition-all cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0056B8] rounded-[10px] group-hover:bg-[#019EF3] transition-colors">
                  <BookOpen className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5] font-montserrat">My Courses</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70 font-lato">View and edit your courses</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        {/* Create Course */}
        <Link href="/course-creation">
          <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px] hover:shadow-[0_4px_20px_0_rgba(113,3,160,0.5)] transition-all cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0056B8] rounded-[10px] group-hover:bg-[#019EF3] transition-colors">
                  <PencilLine className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5] font-montserrat">Create Course</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70 font-lato">Start a new course</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        {/* Students */}
        <Link href="/admin/users">
          <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px] hover:shadow-[0_4px_20px_0_rgba(113,3,160,0.5)] transition-all cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0056B8] rounded-[10px] group-hover:bg-[#019EF3] transition-colors">
                  <Users className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5] font-montserrat">Students</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70 font-lato">View student progress</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        {/* Analytics */}
        <Link href="/analytics">
          <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px] hover:shadow-[0_4px_20px_0_rgba(113,3,160,0.5)] transition-all cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0056B8] rounded-[10px] group-hover:bg-[#019EF3] transition-colors">
                  <ChartBar className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5] font-montserrat">Course Analytics</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70 font-lato">Track course performance</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        {/* Media Library */}
        <Link href="/media-assets">
          <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px] hover:shadow-[0_4px_20px_0_rgba(113,3,160,0.5)] transition-all cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0056B8] rounded-[10px] group-hover:bg-[#019EF3] transition-colors">
                  <Upload className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5] font-montserrat">Media Library</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70 font-lato">Manage course media</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
