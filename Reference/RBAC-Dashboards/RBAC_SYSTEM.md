# LXP360 Role-Based Access Control (RBAC) System

## Overview

LXP360 implements a comprehensive RBAC system with four primary roles, each with distinct permissions and dashboard experiences.

## Role Hierarchy

```
Admin (Level 4)
  └─ Full system access, user management, system configuration

Author (Level 3)
  └─ Content creation, course management, learner analytics

Learner (Level 2)
  └─ Course enrollment, learning activities, personal progress

Guest (Level 1)
  └─ Public content viewing, registration
```

## Role Definitions

### 1. Admin Role

**Purpose**: System administration and platform management

**Permissions**:
- ✓ Full access to all features
- ✓ User management (create, update, delete, assign roles)
- ✓ System configuration and settings
- ✓ Access to all dashboards and tools
- ✓ Database management tools
- ✓ Analytics and reporting for entire platform
- ✓ Content moderation and approval
- ✓ Subscription and billing management

**Dashboard Features**:
- User management panel
- System health monitoring
- Platform-wide analytics
- Role assignment interface
- Content approval queue
- Database tools
- System configuration

**Routes**:
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/users/[id]/roles` - Role assignment
- `/admin/rbac` - RBAC configuration
- `/admin/courses` - Course management
- `/admin/courses/[id]/edit` - Course editor
- `/admin/lessons/[id]` - Lesson management
- `/developer-tools` - Developer utilities

---

### 2. Author Role

**Purpose**: Content creation and course management

**Permissions**:
- ✓ Create, edit, and publish courses
- ✓ Create and manage lessons and modules
- ✓ Upload and manage media assets
- ✓ Use AI-powered authoring tools
- ✓ View learner analytics for their courses
- ✓ Manage course enrollments
- ✓ Access media library
- ✗ Cannot manage users or roles
- ✗ Cannot access system settings

**Dashboard Features**:
- Course creation wizard
- Rich content editor
- Media asset manager
- AI-powered tools (ICES, ILMI, ITLA, NPPM)
- Course analytics
- Learner progress tracking
- Publishing workflow

**Routes**:
- `/course-creation` - Course creation interface
- `/encoding` - Content encoding tools
- `/assimilation` - Content assimilation
- `/synthesization` - AI synthesis tools
- `/ICES-tools` - Instructional Content Enhancement System
- `/ILMI-tools` - Intelligent Learning Material Integrator
- `/ITLA-tools` - Interactive Training & Learning Architect
- `/NPPM-tools` - Neural Pedagogical Planning Model
- `/media-uploads` - Media upload interface
- `/media-assets` - Media asset library
- `/analytics` - Course analytics (own courses)
- `/storage/personal` - Personal file storage
- `/storage/team` - Team shared storage

---

### 3. Learner Role

**Purpose**: Course consumption and learning activities

**Permissions**:
- ✓ Browse course catalog
- ✓ Enroll in courses
- ✓ Access enrolled course content
- ✓ Complete lessons and assessments
- ✓ Track personal progress
- ✓ View certificates and achievements
- ✓ Participate in discussions (future)
- ✗ Cannot create or edit courses
- ✗ Cannot access authoring tools
- ✗ Cannot view other learners' data

**Dashboard Features**:
- Course catalog with search/filter
- My Learning dashboard
- Progress tracking
- Assessment interface
- Certificate display
- Personal analytics
- Learning path visualization

**Routes**:
- `/dashboard` - Learner dashboard
- `/lesson` - Lesson viewer
- `/lesson/[id]` - Specific lesson
- `/analytics` - Personal learning analytics
- `/storage/personal` - Personal files
- Course-specific pages

---

### 4. Guest Role

**Purpose**: Unauthenticated public access

**Permissions**:
- ✓ View landing page
- ✓ View public course previews
- ✓ Access marketing content
- ✓ View blog/articles
- ✓ Access registration/login
- ✗ Cannot access any authenticated features
- ✗ Cannot view course content
- ✗ Cannot access dashboards

**Dashboard Features**:
- Landing page
- Course previews
- Pricing information
- About/Services pages
- Blog articles

**Routes**:
- `/` - Landing page
- `/about` - About page
- `/services` - Services page
- `/blog` - Blog listing
- `/blog/[slug]` - Blog article
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/subscriptions` - Subscription plans

---

## Permission Matrix

| Feature | Admin | Author | Learner | Guest |
|---------|-------|--------|---------|-------|
| View public content | ✓ | ✓ | ✓ | ✓ |
| User authentication | ✓ | ✓ | ✓ | - |
| Browse courses | ✓ | ✓ | ✓ | Preview |
| Enroll in courses | ✓ | ✓ | ✓ | - |
| Take lessons | ✓ | ✓ | ✓ | - |
| Create courses | ✓ | ✓ | - | - |
| Edit courses | ✓ | ✓ (own) | - | - |
| Delete courses | ✓ | ✓ (own) | - | - |
| Manage users | ✓ | - | - | - |
| Assign roles | ✓ | - | - | - |
| System settings | ✓ | - | - | - |
| Upload media | ✓ | ✓ | - | - |
| AI authoring tools | ✓ | ✓ | - | - |
| View all analytics | ✓ | Own courses | Own data | - |
| Database tools | ✓ | - | - | - |

## Role Assignment

### Database Schema
```sql
-- Users table (Supabase Auth)
auth.users (
  id uuid PRIMARY KEY,
  email text,
  created_at timestamp
)

-- User roles table
public.user_roles (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  role text CHECK (role IN ('admin', 'author', 'learner', 'guest')),
  hierarchy_level integer,
  created_at timestamp,
  assigned_by uuid REFERENCES auth.users(id)
)
```

### Default Role
- New users default to `learner` role upon registration
- Upgrade to `author` via subscription or admin assignment
- `admin` role assigned manually by existing admins

## Route Protection

### Middleware Implementation
Located in `middleware.ts`:
- Checks authentication status
- Verifies role permissions for route
- Redirects unauthorized users
- Logs access attempts

### Protected Route Patterns
```typescript
{
  '/admin/*': ['admin'],
  '/course-creation': ['admin', 'author'],
  '/encoding': ['admin', 'author'],
  '/synthesization': ['admin', 'author'],
  '/dashboard': ['admin', 'author', 'learner'],
  '/lesson/*': ['admin', 'author', 'learner']
}
```

## Dashboard Components by Role

### Shared Components
- Navigation/Header (role-adaptive)
- User profile dropdown
- Theme toggle
- Notification center

### Admin-Only Components
- User management table
- Role assignment form
- System health widgets
- Platform analytics charts

### Author-Only Components
- Course creation wizard
- Rich text editor
- Media upload interface
- AI tool access
- Course analytics

### Learner-Only Components
- Course catalog
- Enrollment cards
- Progress indicators
- Assessment interface
- Certificate display

## Implementation Guidelines

1. **Route Protection**: Always check role permissions in middleware
2. **UI Conditional Rendering**: Hide features based on role
3. **API Authorization**: Verify role on backend for all mutations
4. **Graceful Degradation**: Show appropriate messaging for unauthorized access
5. **Audit Logging**: Track role changes and sensitive actions

## Future Enhancements

- [ ] Sub-roles (e.g., Senior Author, Course Reviewer)
- [ ] Organization-level roles
- [ ] Custom role creation
- [ ] Fine-grained permissions
- [ ] Time-based role assignments
- [ ] Role inheritance

---

**Last Updated**: October 30, 2025
**Version**: 1.0
