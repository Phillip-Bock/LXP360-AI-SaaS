# LXP360-AI-SaaS

> AI-Powered Learning Experience Platform - Next-generation instructional design and content authoring

**Status**: Active Development | **Version**: 1.0.0-beta | **Last Updated**: October 30, 2025

## What is LXP360?

LXP360 is a comprehensive AI-powered learning experience platform that revolutionizes how instructional designers create, manage, and deliver engaging educational content. Built as a modern monorepo, it combines cutting-edge AI tools with intuitive authoring interfaces to streamline the entire course creation lifecycle.

### Key Features

- **AI-Powered Authoring Tools**: ICES, ILMI, ITLA, and NPPM for intelligent content creation
- **Rich Content Blocks**: 50+ interactive components for engaging learning experiences
- **Role-Based Access Control**: Admin, Author, Learner, and Guest roles with granular permissions
- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Flexible Architecture**: Monorepo structure ready for independent deployments
- **Integrated CMS**: Sanity for content management
- **Supabase Backend**: Authentication, database, and real-time features

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Supabase account (for backend)
- Sanity account (for CMS)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd LXP360-AI-SaaS

# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase and Sanity credentials

# Run database migrations
pnpm db:setup

# Start development server
pnpm dev
```

The application will be available at:
- Monolith: http://localhost:3000
- Platform: http://localhost:3001
- Marketing: http://localhost:3002

### Common Commands

```bash
pnpm dev              # Start all apps in development mode
pnpm build            # Build all apps for production
pnpm lint             # Lint all packages
pnpm type-check       # TypeScript type checking
pnpm clean            # Clean build artifacts and caches
pnpm test             # Run tests (when implemented)
```

## Project Structure

```
LXP360-AI-SaaS/
├── apps/                          # Applications
│   ├── lxp360-monolith/          # Main application (Next.js)
│   ├── lxp360-platform/          # Learning platform
│   ├── lxp360-authoring/         # Authoring tools
│   ├── lxp360-lms/               # LMS features
│   └── lxp360-marketing/         # Marketing site
│
├── packages/                      # Shared packages
│   ├── ui/                       # UI component library
│   ├── config/                   # Shared configuration
│   ├── utils/                    # Utility functions
│   └── types/                    # TypeScript types
│
├── Reference/                     # 📚 IMPORTANT: Continuity docs
│   ├── Page-Maps/                # Route and page structure
│   ├── Branding/                 # Brand guidelines
│   ├── Structure/                # Architecture docs
│   ├── RBAC-Dashboards/          # Role/permission docs
│   ├── Architecture/             # High-level vision docs
│   └── Migration-Logs/           # Development history
│
├── supabase/                      # Supabase backend
│   ├── migrations/               # Database migrations
│   └── functions/                # Edge functions
│
├── scripts/                       # Build and utility scripts
└── [config files]                # Root-level configuration
```

**IMPORTANT**: Check the `Reference/` folder for comprehensive documentation on branding, RBAC, page maps, and architecture before making changes.

## Applications

### lxp360-monolith
Main application containing the core LXP360 features including:
- Course authoring interface with 50+ content blocks
- AI-powered tools (ICES, ILMI, ITLA, NPPM)
- Admin dashboard and user management
- Learner dashboard and course viewer
- Media management and asset library
- RBAC system with 11 Supabase roles

### lxp360-platform
Lightweight learning delivery platform focused on the learner experience.

### lxp360-authoring
Advanced authoring tools for instructional designers.

### lxp360-lms
Traditional LMS features (gradebook, reporting, attendance).

### lxp360-marketing
Public-facing marketing website, blog, and documentation.

## AI-Powered Tools

### ICES - Instructional Content Enhancement System
Analyzes and improves existing educational content for clarity and engagement.

### ILMI - Intelligent Learning Material Integrator
Seamlessly integrates content from various sources into cohesive learning materials.

### ITLA - Interactive Training & Learning Architect
Designs and creates interactive learning activities and assessments.

### NPPM - Neural Pedagogical Planning Model
Plans course structure and learning paths using AI-driven pedagogical best practices.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI, custom component library
- **State Management**: React Context, React Query (planned)
- **Forms**: React Hook Form with Zod validation

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **CMS**: Sanity
- **API**: Next.js API Routes
- **Real-time**: Supabase Realtime (planned)

### Build & Deploy
- **Monorepo**: Turborepo
- **Package Manager**: PNPM
- **CI/CD**: GitHub Actions (planned)
- **Hosting**: Vercel (planned)

## Development

### Adding Dependencies

```bash
# Add to root workspace
pnpm add -D <package> -w

# Add to specific app
pnpm add <package> --filter lxp360-monolith

# Add to shared package
pnpm add <package> --filter @lxp360/ui
```

### Creating New Components

Place components in the appropriate location:
- **Shared UI**: `packages/ui/src/`
- **App-specific**: `apps/<app-name>/components/`
- **Feature-specific**: Group by feature within app

### Database Migrations

```bash
# Create new migration
supabase migration new <name>

# Run migrations locally
supabase db push

# Reset database
supabase db reset
```

## RBAC System

LXP360 implements a comprehensive role-based access control system with **11 Supabase roles**:

- **Admin**: Full system access
- **Author**: Content creation and course management
- **Learner**: Course consumption and learning activities
- **Guest**: Public content viewing
- *Plus 7 additional specialized roles in Supabase*

See `Reference/RBAC-Dashboards/RBAC_SYSTEM.md` for complete role definitions and permission matrices.

## Documentation

All project documentation is centralized in the `Reference/` folder:

- **[Page Maps](./Reference/Page-Maps/)**: Complete route and page structure
- **[Branding](./Reference/Branding/)**: Brand guidelines and design system
- **[Structure](./Reference/Structure/)**: Monorepo architecture
- **[RBAC](./Reference/RBAC-Dashboards/)**: Role and permission system
- **[Architecture](./Reference/Architecture/)**: Vision and technical architecture
- **[Migration Logs](./Reference/Migration-Logs/)**: Development history

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure tests pass (when implemented)
4. Submit a pull request

## License

Proprietary - All rights reserved

## Support

For questions or issues, please contact the development team.

---

**Built with**: Next.js, React, TypeScript, Tailwind CSS, Supabase, and Turborepo
**Powered by**: AI-driven instructional design tools
