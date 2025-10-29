import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BookOpen, Certificate, TrendUp, Calendar } from "@phosphor-icons/react/dist/ssr"

export function LearnerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#F5F5F5] mb-2 font-montserrat">My Learning Dashboard</h1>
        <p className="text-[#F5F5F5]/70 font-lato">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <Link href="/advertised-courses">
          <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px] hover:shadow-[0_4px_20px_0_rgba(113,3,160,0.5)] transition-all cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0056B8] rounded-[10px] group-hover:bg-[#019EF3] transition-colors">
                  <BookOpen className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
                </div>
                <div>
                  <CardTitle className="text-[#F5F5F5] font-montserrat">Browse Courses</CardTitle>
                  <CardDescription className="text-[#F5F5F5]/70 font-lato">Explore available courses</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        {/* My Progress */}
        <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0056B8] rounded-[10px]">
                <TrendUp className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
              </div>
              <div>
                <CardTitle className="text-[#F5F5F5] font-montserrat">My Progress</CardTitle>
                <CardDescription className="text-[#F5F5F5]/70 font-lato">Track your learning</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Certificates */}
        <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0056B8] rounded-[10px]">
                <Certificate className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
              </div>
              <div>
                <CardTitle className="text-[#F5F5F5] font-montserrat">Certificates</CardTitle>
                <CardDescription className="text-[#F5F5F5]/70 font-lato">View your achievements</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Schedule */}
        <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0056B8] rounded-[10px]">
                <Calendar className="w-6 h-6 text-[#F5F5F5]" weight="duotone" />
              </div>
              <div>
                <CardTitle className="text-[#F5F5F5] font-montserrat">Schedule</CardTitle>
                <CardDescription className="text-[#F5F5F5]/70 font-lato">Upcoming sessions</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Continue Learning Section */}
      <div>
        <h2 className="text-2xl font-bold text-[#F5F5F5] mb-4 font-montserrat">Continue Learning</h2>
        <Card className="bg-[#001D3D] border-[1.5px] border-[#7103A0] rounded-[10px]">
          <CardHeader>
            <CardDescription className="text-[#F5F5F5]/70 font-lato text-center py-8">
              No courses in progress. Browse the course catalog to get started!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
