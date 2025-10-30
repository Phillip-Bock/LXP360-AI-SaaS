# Code Migration Script - C Drive to G Drive Monorepo

## Overview
This document outlines the steps to migrate working code from the monolith to the monorepo structure.

**Source**: `C:\Users\bockp\OneDrive\Documents\GitHub\LXP360-SaaS`
**Target**: `G:\GitHub\LXP360-SaaS\LXP360-AI-SaaS\apps\lxp360-platform`

## Phase 1: Critical Files (DO NOW)

### 1. Copy Core Library Files
```powershell
$SOURCE = "C:\Users\bockp\OneDrive\Documents\GitHub\LXP360-SaaS"
$TARGET = "G:\GitHub\LXP360-SaaS\LXP360-AI-SaaS\apps\lxp360-platform"

# Create lib directory if it doesn't exist
New-Item -Path "$TARGET\lib" -ItemType Directory -Force

# Copy RBAC and auth
Copy-Item -Path "$SOURCE\lib\rbac" -Destination "$TARGET\lib\" -Recurse -Force
Copy-Item -Path "$SOURCE\lib\types" -Destination "$TARGET\lib\" -Recurse -Force
Copy-Item -Path "$SOURCE\lib\supabase" -Destination "$TARGET\lib\" -Recurse -Force
Copy-Item -Path "$SOURCE\lib\actions" -Destination "$TARGET\lib\" -Recurse -Force
```

### 2. Copy Dashboard Components
```powershell
# Create components/dashboards directory
New-Item -Path "$TARGET\components\dashboards" -ItemType Directory -Force

# Copy existing dashboards
Copy-Item -Path "$SOURCE\components\dashboards\*" -Destination "$TARGET\components\dashboards\" -Force
```

### 3. Copy UI Components
```powershell
# Copy shadcn/ui components
Copy-Item -Path "$SOURCE\components\ui" -Destination "$TARGET\components\" -Recurse -Force
```

### 4. Copy Database Scripts
```powershell
# Copy to root of monorepo
Copy-Item -Path "$SOURCE\scripts" -Destination "G:\GitHub\LXP360-SaaS\LXP360-AI-SaaS\" -Recurse -Force
Copy-Item -Path "$SOURCE\supabase" -Destination "G:\GitHub\LXP360-SaaS\LXP360-AI-SaaS\" -Recurse -Force
```

## Phase 2: Dashboard Pages (DO AFTER)

### Copy Dashboard Routes
```powershell
# Copy dashboard page
Copy-Item -Path "$SOURCE\app\dashboard" -Destination "$TARGET\app\" -Recurse -Force

# Copy admin routes
Copy-Item -Path "$SOURCE\app\admin" -Destination "$TARGET\app\" -Recurse -Force
```

## Phase 3: Additional Components (DO LATER)

```powershell
# Copy other components as needed
Copy-Item -Path "$SOURCE\components\public-header.tsx" -Destination "$TARGET\components\" -Force
Copy-Item -Path "$SOURCE\components\public-footer.tsx" -Destination "$TARGET\components\" -Force
```

## Verification Checklist

After copying, verify these exist in the target:

- [ ] `lib/rbac/` - RBAC system
- [ ] `lib/supabase/` - Database client
- [ ] `lib/types/user-roles.ts` - Role definitions
- [ ] `components/dashboards/` - Dashboard components
- [ ] `components/ui/` - Shadcn components
- [ ] `app/dashboard/page.tsx` - Dashboard route
- [ ] Root `scripts/` - SQL migrations
- [ ] Root `supabase/` - Supabase config

## Post-Migration Steps

1. Run `pnpm install` at root
2. Test platform app: `pnpm --filter lxp360-platform dev`
3. Verify dashboards load
4. Create missing dashboards
5. Add dev role selector

## Notes

- Keep C drive repo as backup
- Test after each major copy
- Don't delete source until verified working
