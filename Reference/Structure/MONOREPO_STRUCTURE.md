# LXP360-AI-SaaS Monorepo Structure

## Overview

LXP360-AI-SaaS is organized as a Turborepo monorepo containing multiple applications and shared packages. This structure enables code sharing, independent deployments, and efficient development workflows.

## Directory Structure

```
LXP360-AI-SaaS/
├── .git/                      # Git repository
├── .github/                   # GitHub workflows and actions
├── .nx/                       # Nx cache (if used)
├── .turbo/                    # Turborepo cache
├── .vscode/                   # VS Code workspace settings
│
├── apps/                      # Application packages
│   ├── lxp360-monolith/      # Main LXP360 application (Next.js)
│   ├── lxp360-platform/      # Platform app (Next.js)
│   ├── lxp360-authoring/     # Authoring tools app
│   ├── lxp360-lms/           # Learning Management System
│   └── lxp360-marketing/     # Marketing site
│
├── packages/                  # Shared packages
│   ├── ui/                   # Shared UI components
│   ├── config/               # Shared configuration (TypeScript, ESLint, etc.)
│   ├── utils/                # Shared utility functions
│   └── types/                # Shared TypeScript types
│
├── supabase/                  # Supabase configuration
│   ├── migrations/           # Database migrations
│   ├── functions/            # Edge functions
│   └── seed.sql              # Seed data
│
├── scripts/                   # Build and utility scripts
│   ├── setup-database.js     # Database setup
│   └── migration-helpers/    # Migration utilities
│
├── Reference/                 # **CONTINUITY DOCUMENTATION**
│   ├── Page-Maps/            # Route and page structure docs
│   ├── Branding/             # Brand guidelines
│   ├── Structure/            # Architecture docs (this file!)
│   ├── RBAC-Dashboards/      # Role-based access docs
│   ├── Architecture/         # High-level architecture
│   └── Migration-Logs/       # Development logs
│
├── node_modules/              # Dependencies
├── .editorconfig             # Editor configuration
├── .gitignore                # Git ignore rules
├── nx.json                   # Nx configuration
├── turbo.json                # Turborepo configuration
├── pnpm-workspace.yaml       # PNPM workspace definition
├── package.json              # Root package.json
├── pnpm-lock.yaml            # Lock file
└── README.md                 # Project README

```

## Application Details

### 1. lxp360-monolith

The main LXP360 application containing most features.

**Location**: `apps/lxp360-monolith/`

**Tech Stack**:
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Supabase (Auth & Database)
- Sanity CMS

**Key Features**:
- Course authoring interface
- AI-powered tools (ICES, ILMI, ITLA, NPPM)
- Admin dashboard
- Learner dashboard
- Content management
- Media handling
- RBAC system

**Structure**:
```
lxp360-monolith/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin routes
│   ├── dashboard/           # Learner dashboard
│   ├── course-creation/     # Course authoring
│   ├── lesson/              # Lesson viewer
│   ├── api/                 # API routes
│   ├── auth/                # Authentication pages
│   ├── *-tools/             # AI tool interfaces
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
├── lib/                     # Utilities and helpers
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
├── styles/                  # Global styles
├── middleware.ts            # Route protection
├── next.config.mjs          # Next.js config
├── tailwind.config.ts       # Tailwind config
└── package.json             # Dependencies
```

### 2. lxp360-platform

Platform application for core learning delivery.

**Location**: `apps/lxp360-platform/`

**Purpose**: Lightweight learning platform focused on course delivery and learner experience.

### 3. lxp360-authoring

Dedicated authoring tools application.

**Location**: `apps/lxp360-authoring/`

**Purpose**: Advanced content creation tools for instructional designers.

### 4. lxp360-lms

Learning Management System features.

**Location**: `apps/lxp360-lms/`

**Purpose**: Traditional LMS features like gradebook, attendance, reporting.

### 5. lxp360-marketing

Public marketing website.

**Location**: `apps/lxp360-marketing/`

**Purpose**: Landing pages, pricing, blog, documentation.

## Shared Packages

### packages/ui

Shared UI component library using Radix UI and Tailwind CSS.

**Components**:
- Buttons, Cards, Dialogs
- Form elements
- Navigation components
- Data display components
- Assessment blocks
- Interactive blocks
- Learning structure blocks
- Media blocks
- Text blocks

### packages/config

Shared configuration files:
- TypeScript config (`tsconfig.json`)
- ESLint config
- Prettier config
- Tailwind preset

### packages/utils

Shared utility functions:
- Date formatting
- String manipulation
- API helpers
- Validation functions

### packages/types

Shared TypeScript type definitions:
- User types
- Course types
- Lesson types
- API response types

## Build System

### Turborepo

Turborepo orchestrates builds and caching across the monorepo.

**Configuration**: `turbo.json`

**Key Features**:
- Parallel builds
- Remote caching
- Task dependencies
- Incremental builds

**Common Commands**:
```bash
pnpm dev          # Start all apps in development mode
pnpm build        # Build all apps for production
pnpm lint         # Lint all packages
pnpm type-check   # TypeScript type checking
pnpm clean        # Clean build artifacts
```

### Package Manager: PNPM

**Workspace Configuration**: `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**Benefits**:
- Efficient disk space usage
- Fast installs
- Strict dependency management
- Monorepo support

## Development Workflow

### 1. Local Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Work on specific app
cd apps/lxp360-monolith
pnpm dev
```

### 2. Adding Dependencies

```bash
# Add to root (shared dev dependency)
pnpm add -D <package> -w

# Add to specific app
pnpm add <package> --filter lxp360-monolith

# Add to shared package
pnpm add <package> --filter @lxp360/ui
```

### 3. Creating New Package

```bash
# Use Turbo generator (if configured)
pnpm turbo gen

# Or manually create in packages/
mkdir packages/new-package
cd packages/new-package
pnpm init
```

### 4. Building for Production

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build --filter lxp360-monolith
```

## Environment Variables

### Root Level
- `.env.local` - Shared environment variables
- Each app can override with its own `.env.local`

### Supabase Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Sanity Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
```

## Database (Supabase)

### Location
`supabase/` directory contains all database-related files.

### Migrations
```bash
# Create new migration
supabase migration new <name>

# Run migrations
supabase db push

# Reset database
supabase db reset
```

### Edge Functions
Located in `supabase/functions/` for serverless API endpoints.

## CI/CD Pipeline

### GitHub Actions
Located in `.github/workflows/`

**Workflows**:
1. **Build & Test**: Runs on every PR
2. **Deploy Preview**: Deploys preview for PRs
3. **Deploy Production**: Deploys to production on merge to main

## Code Organization Best Practices

### 1. Component Placement
- **Shared components**: `packages/ui/`
- **App-specific components**: `apps/<app-name>/components/`
- **Feature-specific**: Group by feature within app

### 2. Utilities
- **Shared utilities**: `packages/utils/`
- **App-specific**: `apps/<app-name>/lib/`

### 3. Types
- **Shared types**: `packages/types/`
- **App-specific**: `apps/<app-name>/types/` or inline

### 4. Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase with `Type` suffix (e.g., `UserType`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)

## Migration Path

Current migration strategy from monolith to specialized apps:

1. **Phase 1** (Current): Everything in `lxp360-monolith`
2. **Phase 2**: Extract authoring tools to `lxp360-authoring`
3. **Phase 3**: Extract learner experience to `lxp360-platform`
4. **Phase 4**: Extract LMS features to `lxp360-lms`
5. **Phase 5**: Extract marketing to `lxp360-marketing`

## Troubleshooting

### Build Issues
```bash
# Clear Turbo cache
pnpm clean

# Clear node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### Type Errors
```bash
# Run type check
pnpm type-check

# Check specific app
pnpm type-check --filter lxp360-monolith
```

### Hot Reload Not Working
- Check if ports are available (3000, 3001, etc.)
- Restart dev server
- Clear `.next` directory

---

**Last Updated**: October 30, 2025
**Version**: 1.0
