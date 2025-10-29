import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Check if a user has a specific role
 * Updated to work with simple role-based system (no permissions table yet)
 */
async function checkRole(supabase: any, userId: string, requiredRoles: string[]): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .select(`
        role:roles!inner(name)
      `)
      .eq("user_id", userId)

    if (error) {
      console.error("[v0] Error checking role in middleware:", error.message)
      return false
    }

    // Check if user has any of the required roles
    const userRoles = data?.map((ur: any) => ur.role?.name).filter(Boolean) || []
    const hasAccess = requiredRoles.some((role) => userRoles.includes(role))

    return hasAccess
  } catch (error: any) {
    console.error("[v0] Exception checking role in middleware:", error.message)
    return false
  }
}

/**
 * Route role requirements
 * Maps routes to required roles (simplified from permission-based system)
 */
const routeRoles: Record<string, string[]> = {
  "/admin": ["admin", "super_admin"],
  "/admin/courses": ["admin", "instructor", "manager"],
  "/admin/users": ["admin", "manager"],
  "/course-creation": ["admin", "instructor"],
  "/authoring": ["admin", "instructor"],
}

/**
 * Check if user has required roles for a route
 */
export async function checkRoutePermissions(supabase: any, userId: string, pathname: string): Promise<boolean> {
  // Find matching route role requirement
  for (const [route, roles] of Object.entries(routeRoles)) {
    if (pathname.startsWith(route)) {
      // User needs at least one of the required roles
      const hasAccess = await checkRole(supabase, userId, roles)
      return hasAccess
    }
  }

  // No specific role required for this route
  return true
}

export async function updateSessionWithRBAC(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) ||
    supabaseUrl.includes("undefined") ||
    supabaseUrl.includes("null")
  ) {
    console.warn("[v0] ⚠️  Supabase not configured - authentication disabled")
    console.warn("[v0] Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to Vercel environment variables")
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    let user = null
    let supabaseReachable = true

    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        // "Auth session missing!" is expected when no user is logged in - don't log it
        if (error.message !== "Auth session missing!") {
          console.warn("[v0] ⚠️  Supabase auth error:", error.message)
        }
      } else {
        user = data.user
      }
    } catch (fetchError: any) {
      if (fetchError?.message?.includes("Failed to fetch") || fetchError?.message?.includes("fetch")) {
        console.warn("[v0] ⚠️  Supabase unreachable - authentication disabled")
        console.warn("[v0] Check your Supabase environment variables in Vercel")
        supabaseReachable = false
      } else {
        console.error("[v0] Unexpected error in middleware:", fetchError)
      }
    }

    if (!supabaseReachable) {
      return NextResponse.next({ request })
    }

    // Protected routes - redirect to login if not authenticated
    const protectedPaths = [
      "/dashboard",
      "/course-creation",
      "/authoring",
      "/lms",
      "/lrs",
      "/lxp",
      "/pm",
      "/ecommerce",
      "/admin",
    ]

    const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

    if (isProtectedPath && !user) {
      const url = request.nextUrl.clone()
      url.pathname = "/"
      return NextResponse.redirect(url)
    }

    // Check RBAC permissions for authenticated users on protected routes
    if (user && isProtectedPath) {
      const hasAccess = await checkRoutePermissions(supabase, user.id, request.nextUrl.pathname)

      if (!hasAccess) {
        // Redirect to dashboard with error message
        const url = request.nextUrl.clone()
        url.pathname = "/dashboard"
        url.searchParams.set("error", "insufficient_permissions")
        return NextResponse.redirect(url)
      }
    }

    // Redirect to dashboard if already logged in and trying to access login
    // This allows logged-in users to view the landing page
    if (request.nextUrl.pathname === "/" && user) {
      const url = request.nextUrl.clone()
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (error) {
    console.warn("[v0] ⚠️  Error in auth middleware:", error)
    console.warn("[v0] Allowing request to continue without authentication")
    return NextResponse.next({ request })
  }
}
