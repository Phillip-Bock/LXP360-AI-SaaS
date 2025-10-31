# LXP360 Page & Route Map

## Overview

Complete map of all routes, pages, and their access requirements across the LXP360 platform.

## Route Structure

### Public Routes (No Authentication Required)

| Route | Page | Description | Components |
|-------|------|-------------|------------|
| `/` | Landing Page | Homepage with hero, features, pricing | `landing-page.tsx` |
| `/about` | About | Company information | - |
| `/services` | Services | Service offerings | - |
| `/blog` | Blog Index | Blog post listing | - |
| `/blog/[slug]` | Blog Post | Individual blog article | - |
| `/auth/login` | Login | User login form | - |
| `/auth/register` | Register | User registration | - |
| `/subscriptions` | Pricing | Subscription plans | - |

---

### Learner Routes (Role: learner, author, admin)

| Route | Page | Description | Key Features |
|-------|------|-------------|--------------|
| `/dashboard` | Learner Dashboard | Personal learning hub | Course cards, progress, recommendations |
| `/lesson` | Lesson Viewer | Course content viewer | Content blocks, navigation, progress tracking |
| `/lesson/[id]` | Specific Lesson | Individual lesson page | Multimedia content, assessments, notes |
| `/analytics` | Personal Analytics | Learning progress data | Charts, completion rates, time spent |
| `/storage/personal` | Personal Storage | User file management | Upload, organize, delete files |

---

### Author Routes (Role: author, admin)

| Route | Page | Description | Key Features |
|-------|------|-------------|--------------|
| `/course-creation` | Course Creator | Main authoring interface | Drag-drop editor, rich content blocks |
| `/encoding` | Content Encoding | Media processing | Video encoding, optimization |
| `/assimilation` | Content Assimilation | Import external content | Parse, convert, structure content |
| `/synthesization` | AI Synthesis | AI content generation | Text-to-speech, content enhancement |
| `/synthesization/ICL-tools` | ICL Tools | Instructional Content Lab | Advanced content tools |
| `/ICES-tools` | ICES | Instructional Content Enhancement System | AI-powered content improvement |
| `/ILMI-tools` | ILMI | Intelligent Learning Material Integrator | Content integration assistance |
| `/ITLA-tools` | ITLA | Interactive Training & Learning Architect | Interactive element creation |
| `/NPPM-tools` | NPPM | Neural Pedagogical Planning Model | Course structure planning |
| `/media-uploads` | Media Upload | Bulk media upload | Drag-drop, batch processing |
| `/media-assets` | Asset Library | Media management | Browse, search, tag assets |
| `/storage/team` | Team Storage | Shared file storage | Collaborative file management |
| `/storage/archive` | Archive Storage | Archived content | Long-term storage |

---

### Admin Routes (Role: admin only)

| Route | Page | Description | Key Features |
|-------|------|-------------|--------------|
| `/admin` | Admin Dashboard | System overview | User stats, system health, quick actions |
| `/admin/users` | User Management | User list and management | Search, filter, edit users |
| `/admin/users/[id]/roles` | Role Assignment | Assign/remove user roles | Role selector, permission preview |
| `/admin/rbac` | RBAC Config | Role permissions config | Permission matrix, role editor |
| `/admin/courses` | Course Management | All courses overview | Approve, delete, feature courses |
| `/admin/courses/[id]` | Course Details | Single course admin view | Metadata, enrollments, analytics |
| `/admin/courses/[id]/edit` | Course Editor | Edit any course | Full editing capabilities |
| `/admin/lessons/[id]` | Lesson Management | Lesson admin interface | Edit, delete, reorder |
| `/developer-tools` | Dev Tools | Developer utilities | Database tools, API testing |
| `/developer-tools/alt-text-generator` | Alt Text Gen | Generate image alt text | AI-powered accessibility |

---

### API Routes

| Route | Method | Description | Auth Required |
|-------|--------|-------------|---------------|
| `/api/setup-database` | POST | Initialize database | Admin |
| `/api/synthesize` | POST | AI synthesis endpoint | Author, Admin |
| `/api/admin/*` | Various | Admin API endpoints | Admin |
| `/api/media/*` | Various | Media handling | Author, Admin |

---

## Page Component Map

### Course Creation Components
- `course-editor.tsx` - Main WYSIWYG editor
- `course-creation-header.tsx` - Toolbar and actions
- `rich-text-editor.tsx` - Text editing component
- `rich-text-editor-toolbar.tsx` - Text formatting tools

### Assessment Block Components
Located in `components/assessment-blocks/`:
- `essay-response.tsx`
- `fill-in-blank.tsx`
- `hotspot-question.tsx`
- `likert-scale.tsx`
- `matching.tsx`
- `multiple-choice.tsx`
- `multiple-select.tsx`
- `ranking.tsx`
- `short-answer.tsx`
- `true-false.tsx`

### Interactive Block Components
Located in `components/interactive-blocks/`:
- `accordion-collapsible.tsx`
- `drag-drop-categorize.tsx`
- `flip-cards.tsx`
- `hotspot-image.tsx`
- `modal-trigger.tsx`
- `progressive-disclosure.tsx`
- `reveal-spoiler.tsx`
- `sortable-sequence.tsx`
- `tab-groups.tsx`
- `tooltip-text.tsx`

### Learning Structure Components
Located in `components/learning-structure/`:
- `activity-instructions.tsx`
- `badge-achievement-display.tsx`
- `key-takeaways.tsx`
- `learning-objectives.tsx`
- `milestone-marker.tsx`
- `prerequisites.tsx`
- `progress-indicator.tsx`
- `reflection-prompts.tsx`
- `summary-box.tsx`

### Media Block Components
Located in `components/media-blocks/`:
- `audio-player.tsx`
- `image-gallery.tsx`
- `interactive-image.tsx`
- `video-player.tsx`

### Text Block Components
Located in `components/text-blocks/`:
- `alert-block.tsx`
- `blockquote-*` (multiple variants)
- `bulleted-list.tsx`
- `caution-block.tsx`
- `checkbox-list.tsx`
- `comparison-table.tsx`
- `custom-callout-block.tsx`
- `danger-block.tsx`
- `definition-list.tsx`
- `expert-insight-block.tsx`
- `faq-accordion.tsx`
- `multi-column-layout.tsx`
- `note-block.tsx`
- `numbered-list.tsx`
- `paragraph-with-image.tsx`
- `pull-quote.tsx`
- And many more...

### Admin Components
Located in `components/admin/`:
- `assign-role-form.tsx`
- `course-edit-form.tsx`
- `delete-course-button.tsx`
- `delete-lesson-button.tsx`
- `delete-module-button.tsx`
- `remove-role-button.tsx`

### Chart Components
Located in `components/chart-blocks/`:
- `bar-chart.tsx`
- Additional chart types (to be added)

### Shared UI Components
- `page-navigation.tsx` - Course navigation
- `synthesization-form.tsx` - AI synthesis form
- `ribbon/ribbon.tsx` - Feature ribbon
- `landing-page.tsx` - Marketing landing page

---

## Navigation Patterns

### Main Navigation (Authenticated Users)
Structure varies by role. See RBAC_SYSTEM.md for details.

### Course Navigation
- Previous/Next lesson buttons
- Sidebar with module/lesson tree
- Breadcrumb trail
- Progress indicator

### Admin Navigation
- User management
- Content management
- System tools
- Analytics
- Settings

---

## Loading States

Pages with loading components:
- `/lesson` - `lesson/loading.tsx`
- `/media-uploads` - `media-uploads/loading.tsx`

---

## Error Pages

- `not-found.tsx` - 404 page (themed)
- `error.tsx` - Global error boundary (to be implemented)

---

## Future Routes (Planned)

- `/discussions` - Course discussions
- `/certificates` - Certificate display
- `/learning-paths` - Learning path builder
- `/reports` - Advanced reporting
- `/integrations` - Third-party integrations
- `/notifications` - Notification center
- `/profile` - User profile editor
- `/settings` - User settings

---

## Route Protection Strategy

All route protection is handled in `middleware.ts`:

1. Check if route requires authentication
2. Verify user session
3. Check user role permissions
4. Redirect if unauthorized
5. Log access attempt

---

## SEO & Meta Tags

Each page should include:
- Unique `<title>`
- Meta description
- Open Graph tags
- Canonical URL
- Structured data (where applicable)

Implement in each page's metadata export.

---

**Last Updated**: October 30, 2025
**Version**: 1.0
**Note**: Route structure is current as of migration to monorepo
