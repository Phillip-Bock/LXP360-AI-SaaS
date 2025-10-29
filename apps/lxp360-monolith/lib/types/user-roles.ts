export type UserRoleType =
  | "super_admin"
  | "admin"
  | "designer"
  | "lms_admin"
  | "program_admin"
  | "course_admin"
  | "sales"
  | "manager"
  | "instructor"
  | "individual_learner"
  | "team_learner"
  | null

export const ROLE_HIERARCHY: Record<Exclude<UserRoleType, null>, number> = {
  super_admin: 11,
  admin: 10,
  designer: 9,
  lms_admin: 8,
  program_admin: 7,
  course_admin: 6,
  sales: 5,
  manager: 4,
  instructor: 3,
  team_learner: 2,
  individual_learner: 1,
}

export const ROLE_DISPLAY_NAMES: Record<Exclude<UserRoleType, null>, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  designer: "Designer",
  lms_admin: "LMS Admin",
  program_admin: "Program Admin",
  course_admin: "Course Admin",
  sales: "Sales",
  manager: "Manager",
  instructor: "Instructor",
  individual_learner: "Individual Learner",
  team_learner: "Team Learner",
}
