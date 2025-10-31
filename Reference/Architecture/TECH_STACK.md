# LXP360 Technology Stack

## Overview

LXP360 is built on a modern, AI-first technology stack optimized for rapid development and enterprise scalability.

## Core Platform

### Frontend
- **v0 by Vercel** - AI-powered UI generation
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication (11 role system)
  - Real-time subscriptions
  - Storage for media assets
  - Row Level Security (RLS)
  - Edge Functions

### Content Management
- **Sanity CMS** - Headless CMS
  - Structured content
  - Real-time collaboration
  - Image optimization
  - Portable Text
  - Content versioning
  - Studio customization

### Hosting & Deployment
- **Vercel** - Edge deployment platform
  - Edge runtime
  - Serverless functions
  - Automatic deployments
  - Preview deployments
  - Analytics
  - Edge caching

## AI & ML Infrastructure

### Google Cloud AI Services

LXP360 has access to **all Google Cloud AI APIs**:

#### Language AI
- **Gemini API** - Google's most capable multimodal AI
- **PaLM API** - Large language models
- **Natural Language API** - Text analysis and sentiment
- **Translation API** - Multi-language support
- **Speech-to-Text API** - Audio transcription
- **Text-to-Speech API** - Voice synthesis

#### Vision AI
- **Vision API** - Image analysis and OCR
- **Video Intelligence API** - Video content analysis
- **Cloud AutoML Vision** - Custom image models

#### Document AI
- **Document AI** - Form parsing and extraction
- **Vertex AI Document OCR** - Advanced document processing

#### Vertex AI Platform
- **Vertex AI** - End-to-end ML platform
- **AutoML** - Custom model training
- **Model Garden** - Pre-trained models
- **Workbench** - Jupyter notebooks
- **Pipelines** - ML workflows
- **Predictions** - Model serving
- **Training** - Custom model training
- **Feature Store** - ML feature management

#### Conversational AI
- **Dialogflow CX** - Advanced conversational agents
- **Dialogflow ES** - Standard bot framework
- **Contact Center AI** - Customer service AI

#### Discovery & Recommendations
- **Discovery AI** - Search and recommendations
- **Recommendations AI** - Personalization engine
- **Retail API** - E-commerce AI

### AI-Powered Features in LXP360

#### ICES - Instructional Content Enhancement System
**Uses**:
- Gemini API for content analysis
- Natural Language API for readability scoring
- Translation API for multi-language support

**Capabilities**:
- Analyzes educational content quality
- Suggests improvements for clarity
- Checks reading level appropriateness
- Enhances engagement factors

#### ILMI - Intelligent Learning Material Integrator
**Uses**:
- Document AI for content extraction
- Vision API for image analysis
- Gemini API for content understanding

**Capabilities**:
- Imports content from PDFs, Word docs, presentations
- Extracts images and generates alt text
- Structures unstructured content
- Maps to LXP360 content blocks

#### ITLA - Interactive Training & Learning Architect
**Uses**:
- Gemini API for question generation
- Vertex AI for assessment creation
- Natural Language API for answer validation

**Capabilities**:
- Generates interactive assessments
- Creates scenario-based questions
- Designs branching simulations
- Validates learning outcomes

#### NPPM - Neural Pedagogical Planning Model
**Uses**:
- Vertex AI for course structure optimization
- Recommendations AI for personalized paths
- Gemini API for learning design

**Capabilities**:
- Plans optimal course structure
- Sequences learning activities
- Identifies prerequisite dependencies
- Suggests learning paths

## Development Stack

### Package Management
- **PNPM** - Fast, efficient package manager
- **Turborepo** - Monorepo build system

### Code Quality
- **TypeScript** - Static typing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Trunk** - Code quality automation

### Testing (Planned)
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **Playwright** - E2E testing
- **Vitest** - Vite-powered testing

### CI/CD
- **GitHub Actions** - Automation workflows
- **Vercel** - Automatic deployments
- **Supabase CLI** - Database migrations

## Data & Storage

### Database (Supabase/PostgreSQL)
- User authentication and profiles
- 11-role RBAC system
- Course and lesson data
- Learning progress tracking
- Media asset metadata
- Organization multi-tenancy
- Audit logs

### File Storage (Supabase Storage)
- User-uploaded media
- Course assets (images, videos, documents)
- Profile images
- Generated content
- Backup archives

### CMS Storage (Sanity)
- Marketing content
- Blog posts
- Static pages
- Media library
- Structured content

## APIs & Integrations

### Internal APIs (Next.js API Routes)
- `/api/setup-database` - Database initialization
- `/api/synthesize` - AI content generation
- `/api/media/*` - Media handling
- `/api/admin/*` - Admin operations

### External APIs
- **Supabase API** - All backend operations
- **Sanity API** - Content fetching
- **Google Cloud AI** - All AI services
- **Vercel Analytics** - Usage tracking

### Webhooks
- Supabase webhooks for real-time events
- Sanity webhooks for content updates
- Payment webhooks (when implemented)

## Security

### Authentication
- Supabase Auth with magic links
- Email/password authentication
- OAuth providers (future)
- Session management
- JWT tokens

### Authorization
- 11-role RBAC system
- Row Level Security (RLS) in Supabase
- Middleware route protection
- API route guards
- Client-side permission checks

### Data Protection
- HTTPS everywhere
- Environment variable secrets
- Encrypted database
- Secure file storage
- API key rotation

## Performance Optimization

### Edge Computing
- Vercel Edge Functions
- CDN caching
- Image optimization
- Asset compression

### Database
- Connection pooling
- Query optimization
- Indexed columns
- Materialized views (future)

### Frontend
- Code splitting
- Lazy loading
- Image lazy loading
- Dynamic imports
- Optimized bundles

## Monitoring & Analytics

### Application Monitoring
- **Vercel Analytics** - Performance metrics
- **Supabase Logs** - Backend monitoring
- Error tracking (to be added)

### User Analytics
- Page views
- User journeys
- Feature usage
- Conversion tracking

## Development Environment

### Required Tools
- Node.js 18+
- PNPM 8+
- Git
- VS Code (recommended)
- Supabase CLI
- Vercel CLI

### Optional Tools
- **Loupedeck** - Stream deck control
- **Trunk** - Code quality automation
- **GitHub Copilot** - AI pair programming

## Infrastructure Costs

### Current Stack
- ✅ **Vercel**: Pro plan
- ✅ **Supabase**: Pro/Team plan
- ✅ **Sanity**: Growth plan
- ✅ **Google Cloud AI**: Pay-per-use with full API access

### Estimated Monthly Costs
- Hosting: $20-50 (Vercel)
- Database: $25-100 (Supabase)
- CMS: $20-40 (Sanity)
- AI APIs: Variable based on usage
- **Total**: ~$100-200/month base + AI usage

## Scalability

### Current Limits
- Vercel: Unlimited deployments, 100GB bandwidth/month
- Supabase: 8GB database, 100GB bandwidth
- Sanity: 500k API requests/month

### Growth Path
All services scale linearly with pricing tiers:
- **Stage 1** (Current): Development/Beta
- **Stage 2** (0-1000 users): Current plans sufficient
- **Stage 3** (1000-10k users): Upgrade Supabase to Team
- **Stage 4** (10k+ users): Enterprise plans

## Advantages of This Stack

### Speed
- ✅ v0 for rapid UI generation
- ✅ Vercel for instant deployments
- ✅ Supabase for instant backend
- ✅ No DevOps overhead

### AI-First
- ✅ Full Google Cloud AI access
- ✅ Gemini API integration
- ✅ Ready for AI-powered features
- ✅ Easy to expand AI capabilities

### Developer Experience
- ✅ Type-safe with TypeScript
- ✅ Modern React patterns
- ✅ Fast local development
- ✅ Excellent documentation

### Production Ready
- ✅ Enterprise-grade security
- ✅ Proven scalability
- ✅ Global edge network
- ✅ 99.9% uptime SLA

## Future Enhancements

### Planned Additions
- [ ] Redis caching layer
- [ ] Elasticsearch for search
- [ ] Websockets for real-time features
- [ ] Payment processing (Stripe)
- [ ] Email service (SendGrid/Resend)
- [ ] Video streaming (Mux)
- [ ] CDN (Cloudflare)

### AI Expansion
- [ ] Custom Vertex AI models
- [ ] Speech-to-text for lessons
- [ ] Real-time translation
- [ ] Conversational AI tutors
- [ ] Automated accessibility (alt text, captions)

---

**Last Updated**: October 30, 2025
**Version**: 1.0
**Tech Lead**: Founder/Architect
