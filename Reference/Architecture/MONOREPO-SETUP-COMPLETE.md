# LXP360 Monorepo - Setup Complete ✅

## What We Built

**Date:** October 29, 2025
**Location:** `G:\GitHub\LXP360-AI-SaaS`

### Project Structure

```
LXP360-AI-SaaS/
├── apps/
│   ├── lxp360-monolith/      ✅ Reference copy (old v0 project)
│   ├── lxp360-marketing/     ✅ Public website (Next.js 16 + React 19)
│   ├── lxp360-platform/      ✅ Main app shell (Next.js 16 + React 19)
│   ├── lxp360-authoring/     ✅ Course creation (Next.js 16 + React 19)
│   └── lxp360-lms/           ✅ Learning management (Next.js 16 + React 19)
├── packages/
│   ├── ui/                   📦 Shared components (to configure)
│   ├── auth/                 📦 Shared auth (to configure)
│   ├── database/             📦 Shared DB logic (to configure)
│   └── config/               📦 Shared config (to configure)
├── pnpm-workspace.yaml       ✅ Workspace config
├── turbo.json                ✅ Build orchestration
└── package.json              ✅ Root package file
```

### Tech Stack (All Apps)

- **Next.js:** 16.0.1 (latest!)
- **React:** 19.2.0 (latest!)
- **TypeScript:** 5.9.3
- **Tailwind CSS:** 4.1.16 (latest!)
- **Turbopack:** Enabled (10x faster bundling)
- **React Compiler:** Enabled (auto-optimization)
- **Biome:** 2.2.0 (linting + formatting)
- **pnpm:** 8.15.0 (workspace manager)
- **Turborepo:** 2.5.8 (monorepo orchestrator)

---

## Quick Start Commands

### Development

```powershell
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm --filter lxp360-marketing dev
pnpm --filter lxp360-platform dev
pnpm --filter lxp360-authoring dev
pnpm --filter lxp360-lms dev
```

### Building

```powershell
# Build all apps
pnpm build

# Build specific app
pnpm --filter lxp360-marketing build
```

### Linting

```powershell
# Lint all apps
pnpm lint

# Lint specific app
pnpm --filter lxp360-marketing lint
```

---

## Next Steps (Priority Order)

### 1. Configure Shared Packages (HIGH PRIORITY)

Create `package.json` in each package folder:

**packages/ui/package.json:**

```json
{
  "name": "@lxp360/ui",
  "version": "0.0.1",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts"
}
```

**packages/auth/package.json:**

```json
{
  "name": "@lxp360/auth",
  "version": "0.0.1",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts"
}
```

**packages/database/package.json:**

```json
{
  "name": "@lxp360/database",
  "version": "0.0.1",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts"
}
```

**packages/config/package.json:**

```json
{
  "name": "@lxp360/config",
  "version": "0.0.1",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts"
}
```

### 2. Start Migrating Code from Monolith

**From `apps/lxp360-monolith`, extract:**

| Source Folder     | Move To              | Purpose              |
| ----------------- | -------------------- | -------------------- |
| `components/ui/*` | `packages/ui/`       | Shared UI components |
| `lib/auth/*`      | `packages/auth/`     | Authentication logic |
| `lib/supabase/*`  | `packages/database/` | Database client      |
| Config files      | `packages/config/`   | Shared configs       |

### 3. Set Up Environment Variables

Each app needs its own `.env.local`:

```bash
# Copy from monolith
cp apps/lxp360-monolith/.env.local apps/lxp360-marketing/.env.local
cp apps/lxp360-monolith/.env.local apps/lxp360-platform/.env.local
cp apps/lxp360-monolith/.env.local apps/lxp360-authoring/.env.local
cp apps/lxp360-monolith/.env.local apps/lxp360-lms/.env.local
```

### 4. Configure Port Numbers

Edit each app's `package.json` to use different ports:

- **lxp360-marketing:** `PORT=3000` (default)
- **lxp360-platform:** `PORT=3001`
- **lxp360-authoring:** `PORT=3002`
- **lxp360-lms:** `PORT=3003`

### 5. Set Up Git Repository

```powershell
# Initialize git (if not already)
git init

# Add all files
git add .

# First commit
git commit -m "Initial monorepo setup with 4 micro-frontends"

# Push to GitHub
git remote add origin https://github.com/yourusername/LXP360-AI-SaaS.git
git push -u origin main
```

### 6. Configure Vercel Deployment

Each app needs separate Vercel project:

1. Go to https://vercel.com
2. Import `LXP360-AI-SaaS` repo
3. Create 4 projects:
   - `lxp360-marketing` → Root: `apps/lxp360-marketing`
   - `lxp360-platform` → Root: `apps/lxp360-platform`
   - `lxp360-authoring` → Root: `apps/lxp360-authoring`
   - `lxp360-lms` → Root: `apps/lxp360-lms`

---

## Troubleshooting

### Peer Dependency Warnings

The warnings about `apps/lxp360-monolith` are EXPECTED. That's your old v0 project and we're not touching it. It's just a reference copy.

### Port Conflicts

If you see `Port 3000 is already in use`:

- Use different ports for each app (see step 4 above)
- Or run apps individually, not all at once

### Module Not Found

If you see "Cannot find module '@lxp360/ui'":

- Make sure you created the package.json files in packages/\*
- Run `pnpm install` at the root

---

## Key Files Reference

### Root Files

- **pnpm-workspace.yaml** - Defines workspace structure
- **turbo.json** - Build pipeline configuration
- **package.json** - Root dependencies and scripts

### App Files (Each App Has These)

- **next.config.ts** - Next.js configuration
- **biome.json** - Linting/formatting rules
- **tailwind.config.ts** - Tailwind CSS setup
- **tsconfig.json** - TypeScript configuration

---

## Support & Resources

- **Turborepo Docs:** https://turbo.build/repo/docs
- **Next.js 16 Docs:** https://nextjs.org/docs
- **pnpm Workspace:** https://pnpm.io/workspaces
- **React Compiler:** https://react.dev/learn/react-compiler

---

## Notes

- **Monolith is READ-ONLY:** Don't modify `apps/lxp360-monolith` - it's your reference
- **Gradual Migration:** Move code piece by piece, test as you go
- **Shared Packages:** Extract common code into `packages/*` for reuse
- **Independent Deploys:** Each app can be deployed separately to Vercel

---

**Status:** ✅ Foundation Complete
**Next:** Configure shared packages and start migrating code
