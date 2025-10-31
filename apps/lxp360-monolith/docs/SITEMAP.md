# LXP360 SaaS - Complete Sitemap & Navigation Structure

**Last Updated:** January 22, 2025  
**Project:** LXP360-SaaS  
**Purpose:** Comprehensive map of all pages, navigation links, and missing connections

---

## Table of Contents
1. [Public External Pages](#public-external-pages)
2. [Authentication Pages](#authentication-pages)
3. [Internal Dashboard & Tools](#internal-dashboard--tools)
4. [Admin Pages](#admin-pages)
5. [INSPIRE Framework Tools](#inspire-framework-tools)
6. [Navigation Components](#navigation-components)
7. [Missing Links & Issues](#missing-links--issues)
8. [Recommendations](#recommendations)

---

## Public External Pages

### Home & Marketing
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Home Page** | `/` | ✅ Active | Public Header, Footer Logo | None |
| **About** | `/about` | ✅ Active | Public Header, Scroll Header, Footer | None |
| **Services** | `/services` | ✅ Active | Public Header, Scroll Header | None |
| **Subscriptions** | `/subscriptions` | ✅ Active | Public Header, Scroll Header | Contact link works |
| **Advertised Courses** | `/advertised-courses` | ✅ Active | Public Header (as "Courses") | Links to auth pages work |
| **Blog** | `/blog` | ✅ Active | Public Header, Scroll Header, Footer | None |
| **Blog Post** | `/blog/[slug]` | ✅ Active | Blog listing page | Back to blog link works |

### Service Category Pages
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Corporate Training** | `/corporate-training` | ✅ Active | Services page | Contact link → ⚠️ `/contact` (page doesn't exist) |
| **Team Development** | `/team-development` | ✅ Active | Services page | Contact link → ⚠️ `/contact` (page doesn't exist) |
| **Personal Mastery** | `/personal-mastery` | ✅ Active | Services page | Contact link → ⚠️ `/contact` (page doesn't exist) |

---

## Authentication Pages

| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Login** | `/auth/login` | ✅ Active | Public Header, Scroll Header, Sign Up page | Redirects to `/` after login |
| **Sign Up** | `/auth/sign-up` | ✅ Active | Public Header, Scroll Header, Login page | Redirects to confirm email |
| **Sign Up (Alt)** | `/auth/signup` | ✅ Active | Advertised courses page | Redirects to verify email |
| **Forgot Password** | `/auth/forgot-password` | ✅ Active | Login page | Back to login works |
| **Confirm Email** | `/auth/confirm-email` | ✅ Active | Sign up redirect | Back to sign up works |
| **Verify Email** | `/auth/verify-email` | ✅ Active | Signup redirect | Return to login works |

---

## Internal Dashboard & Tools

### Main Dashboard
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Dashboard** | `/dashboard` | ✅ Active | Login redirect, multiple internal pages | Multiple links to tools |
| **Workspace** | `/workspace` | ✅ Active | Dashboard | Back to dashboard works |
| **Analytics** | `/analytics` | ✅ Active | Dashboard, Lesson page | Back to dashboard works |

### Content Creation & Management
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Course Creation** | `/course-creation` | ✅ Active | Dashboard, Admin, Lesson page | Multiple internal links work |
| **Lesson Editor** | `/lesson` | ✅ Active | Course creation, Admin lessons | ⚠️ `/resources` link (page doesn't exist) |
| **Media Uploads** | `/media-uploads` | ✅ Active | Dashboard | Back to dashboard works |

### Project Management
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Project Management** | `/project-management` | ✅ Active | Dashboard | Links to project initiation |
| **Project Initiation** | `/project-initiation` | ✅ Active | Project management | Back to dashboard works |

### Storage
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Personal Storage** | `/storage/personal` | ⚠️ Exists | None found | ⚠️ Not linked from anywhere |
| **Team Storage** | `/storage/team` | ⚠️ Exists | None found | ⚠️ Not linked from anywhere |
| **Archive Storage** | `/storage/archive` | ⚠️ Exists | None found | ⚠️ Not linked from anywhere |

---

## Admin Pages

### Main Admin
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Admin Dashboard** | `/admin` | ✅ Active | Dashboard | Links to all admin sections |
| **RBAC Overview** | `/admin/rbac` | ✅ Active | Admin dashboard | ⚠️ Links to non-existent pages:<br>- `/admin/rbac/roles`<br>- `/admin/rbac/permissions`<br>- `/admin/rbac/audit`<br>- `/admin/rbac/categories` |
| **Roles Management** | `/admin/roles` | ✅ Active | Admin dashboard, RBAC | ⚠️ `/admin/roles/[id]` (detail page doesn't exist) |

### User Management
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Users List** | `/admin/users` | ✅ Active | Admin dashboard, RBAC | Links to bulk import and user details |
| **User Roles** | `/admin/users/[id]/roles` | ✅ Active | Users list | Back to users works |
| **Bulk Import** | `/admin/users/bulk-import` | ✅ Active | Users list | Back to users works |
| **Create User** | `/admin/users/create` | ⚠️ Linked | Users list | ⚠️ Page doesn't exist |

### Course Management
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Course Details** | `/admin/courses/[id]` | ✅ Active | Admin dashboard | Links to edit and lessons |
| **Course Edit** | `/admin/courses/[id]/edit` | ✅ Active | Course details | Back to course works |
| **Lesson Details** | `/admin/lessons/[id]` | ✅ Active | Course details | Links to lesson editor |

---

## INSPIRE Framework Tools

### Encoding Phase (ITLA)
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Encoding Hub** | `/encoding` | ✅ Active | Dashboard | Links to all encoding tools |
| **ITLA Tools** | `/ITLA-tools` | ✅ Active | Encoding hub | Links to NPPM tools |
| **NPPM Tools** | `/NPPM-tools` | ✅ Active | Encoding hub, ITLA | Back to encoding works |
| **ILMI Tools** | `/ILMI-tools` | ✅ Active | Encoding hub | Back to encoding works |
| **ICES Tools** | `/ICES-tools` | ✅ Active | Encoding hub | Back to encoding works |

### Synthesization Phase
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Synthesization Hub** | `/synthesization` | ✅ Active | Dashboard | Links to synthesis tools |
| **ICL Tools** | `/synthesization/ICL-tools` | ✅ Active | Synthesis hub | ⚠️ Links to `/synthesization/IPMG-tools` (doesn't exist) |
| **IPMG Tools** | `/synthesization/IPMG-tools` | ⚠️ Linked | Synthesis hub, ICL | ⚠️ Page doesn't exist |
| **ICDT Tools** | `/synthesization/ICDT-tools` | ⚠️ Linked | Synthesis hub | ⚠️ Page doesn't exist |
| **ICPF Tools** | `/synthesization/ICPF-tools` | ⚠️ Linked | Synthesis hub | ⚠️ Page doesn't exist |

### Assimilation Phase
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Assimilation Hub** | `/assimilation` | ✅ Active | Dashboard | None found |

### Developer Tools
| Page | Route | Status | Navigation From | Missing Links |
|------|-------|--------|----------------|---------------|
| **Developer Tools Hub** | `/developer-tools` | ✅ Active | Dashboard | Links to alt-text generator |
| **Alt Text Generator** | `/developer-tools/alt-text-generator` | ✅ Active | Developer tools | Back to tools works |

---

## Navigation Components

### Headers
| Component | Used On | Links Provided |
|-----------|---------|----------------|
| **PublicHeader** | Home, About, Services, etc. | About, Services, Subscriptions, Courses, Blog, Sign In, Sign Up |
| **ScrollHeader** | Landing page | About, Services, Subscriptions, #courses, Blog, #demo, Sign In, Sign Up |

### Footer
| Component | Used On | Links Provided |
|-----------|---------|----------------|
| **PublicFooter** | All public pages | Support (Help, Contact, Careers), Policies (7 links), Social Media (9 platforms) |

### Dashboard Navigation
| Location | Links Provided |
|----------|----------------|
| Dashboard sidebar | Workspace, Media Uploads, Analytics, Project Management, Encoding, Synthesization, Course Creation, Assimilation, Admin |

---

## Missing Links & Issues

### Critical Issues (Pages Don't Exist)
1. **Contact Page** (`/contact`)
   - Linked from: Corporate Training, Team Development, Personal Mastery, Not Found page, Footer
   - **Action Required:** Create contact page or update links to use contact form popup

2. **Resources Page** (`/resources`)
   - Linked from: Lesson editor
   - **Action Required:** Create resources page or remove link

3. **User Create Page** (`/admin/users/create`)
   - Linked from: Admin users list
   - **Action Required:** Create user creation page

4. **Role Detail Page** (`/admin/roles/[id]`)
   - Linked from: Admin roles list
   - **Action Required:** Create role detail page

5. **RBAC Sub-pages**
   - `/admin/rbac/roles` - Linked from RBAC overview
   - `/admin/rbac/permissions` - Linked from RBAC overview
   - `/admin/rbac/audit` - Linked from RBAC overview
   - `/admin/rbac/categories` - Linked from RBAC overview
   - **Action Required:** Create these pages or remove links

6. **Synthesization Tools**
   - `/synthesization/IPMG-tools` - Linked from synthesis hub and ICL tools
   - `/synthesization/ICDT-tools` - Linked from synthesis hub
   - `/synthesization/ICPF-tools` - Linked from synthesis hub
   - **Action Required:** Create these tool pages

### Orphaned Pages (Not Linked From Anywhere)
1. **Storage Pages**
   - `/storage/personal` - No navigation to this page
   - `/storage/team` - No navigation to this page
   - `/storage/archive` - No navigation to this page
   - **Action Required:** Add links from dashboard or remove pages

2. **Sanity Studio** (`/studio/[[...tool]]`)
   - No navigation to this page
   - **Action Required:** Add admin link or keep as direct URL access only

### Placeholder Links (Link to #)
1. **Landing Page Footer** - Multiple links point to `#` (placeholders)
2. **Dashboard** - Some sidebar items link to `#`
3. **Lesson Editor** - Some navigation items link to `#`

### Inconsistent Navigation
1. **Courses Link**
   - Public Header → `/advertised-courses`
   - Scroll Header → `#courses` (anchor link)
   - **Action Required:** Standardize to one approach

2. **Contact/Let's Connect**
   - Public Header → "Let's Connect" button (triggers popup)
   - Scroll Header → "Contact" button (triggers popup)
   - Service pages → Link to `/contact` (doesn't exist)
   - **Action Required:** Standardize contact approach

---

## Recommendations

### High Priority
1. **Create Contact Page** - Most critical, linked from multiple places
2. **Fix RBAC Navigation** - Either create sub-pages or consolidate into single RBAC page
3. **Complete Synthesization Tools** - Create missing IPMG, ICDT, ICPF tool pages
4. **Add Storage Navigation** - Link storage pages from dashboard or remove them

### Medium Priority
1. **Create User Management Pages** - User create and role detail pages
2. **Create Resources Page** - Or remove link from lesson editor
3. **Replace Placeholder Links** - Update all `#` links with actual destinations
4. **Standardize Navigation** - Make courses and contact links consistent

### Low Priority
1. **Add Breadcrumbs** - Help users understand their location in deep pages
2. **Add Search Functionality** - Help users find pages quickly
3. **Mobile Navigation** - Ensure all pages have mobile-friendly navigation
4. **Add Page Titles** - Ensure all pages have proper meta titles and descriptions

---

## Page Count Summary

- **Total Pages:** 56 pages
- **Active & Working:** 42 pages (75%)
- **Linked But Missing:** 10 pages (18%)
- **Orphaned (Exist But Not Linked):** 4 pages (7%)

---

## Next Steps

1. Review this sitemap with the team
2. Prioritize which missing pages to create
3. Decide which orphaned pages to link or remove
4. Update navigation components to be consistent
5. Create a maintenance schedule to keep sitemap updated

---

**Note:** This sitemap is based on the current codebase as of January 22, 2025. It should be updated whenever new pages are added or navigation changes are made.
