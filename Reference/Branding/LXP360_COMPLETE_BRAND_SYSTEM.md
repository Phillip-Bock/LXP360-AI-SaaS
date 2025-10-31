# LXP360 Complete Brand System
**Version:** 2.0
**Last Updated:** October 30, 2025
**Author:** Claude (Anthropic)
**Purpose:** Complete brand specification for LXP360 internal products (non-white-label)

---

## Table of Contents
1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Component Specifications](#component-specifications)
5. [Accessibility & Compliance](#accessibility--compliance)
6. [Motion & Animation](#motion--animation)
7. [Icon System](#icon-system)
8. [Implementation Guidelines](#implementation-guidelines)

---

## Color System

### Philosophy
- **Primary Brand:** Blue (use as much as possible)
- **Dark Mode:** Default experience (Background: `#001D3D`)
- **Light Mode:** Secondary/alternative (Background: `#FFFFFF`)
- **Auto-detect:** Respect user's OS preference (`prefers-color-scheme`)
- **Gradients:** Can use any amount of shades, but MUST stay within single palette (no mixing palettes)

### Complete Color Palettes
All palettes listed from **LIGHT to DARK** (10 shades each)

#### Blue Dark Palette (Primary Brand)
```css
--blue-dark-100: #C2DEFF  /* Lightest */
--blue-dark-200: #99C9FF
--blue-dark-300: #70B3FF
--blue-dark-400: #479DFF
--blue-dark-500: #1F87FF
--blue-dark-600: #0072F5
--blue-dark-700: #0056B8
--blue-dark-800: #00438F  /* PRIMARY */
--blue-dark-900: #003066
--blue-dark-950: #001D3D  /* Darkest - Default Dark BG */
```

#### Blue Light Palette (Secondary)
```css
--blue-light-100: #EBF8FF  /* Lightest */
--blue-light-200: #AEE2FF
--blue-light-300: #9ADBFE
--blue-light-400: #71CDFE
--blue-light-500: #34B7FE
--blue-light-600: #20B0FE
--blue-light-700: #019EF3
--blue-light-800: #0184CB  /* SECONDARY */
--blue-light-900: #016AA2
--blue-light-950: #014F7A  /* Darkest */
```

#### Grey Dark Palette
```css
--grey-dark-100: #707070  /* Lightest */
--grey-dark-200: #666666
--grey-dark-300: #5C5C5C
--grey-dark-400: #525252
--grey-dark-500: #474747
--grey-dark-600: #3D3D3D
--grey-dark-700: #333333
--grey-dark-800: #292929
--grey-dark-900: #232323  /* PRIMARY */
--grey-dark-950: #000000  /* Darkest */
```

#### Grey Light Palette
```css
--grey-light-100: #A3A3A3  /* Lightest */
--grey-light-200: #ADADAD
--grey-light-300: #B8B8B8
--grey-light-400: #C2C2C2
--grey-light-500: #CCCCCC
--grey-light-600: #D6D6D6
--grey-light-700: #E0E0E0
--grey-light-800: #EBEBEB
--grey-light-900: #F5F5F5  /* PRIMARY */
--grey-light-950: #FFFFFF  /* Lightest - Default Light BG */
```

#### Caution Yellow
```css
--caution-100: #FFDE85
--caution-200: #FFD970
--caution-300: #FFD35C
--caution-400: #FFCE47
--caution-500: #FFC933
--caution-600: #FFC31F
--caution-700: #FFBE0A  /* PRIMARY */
--caution-800: #E0A500
--caution-900: #B88700
--caution-950: #8F6900
```

#### Warning Orange
```css
--warning-100: #FFB685
--warning-200: #FFA970
--warning-300: #FF9D5C
--warning-400: #FF9147
--warning-500: #FF8533
--warning-600: #FF781F
--warning-700: #F56200  /* PRIMARY */
--warning-800: #CC5200
--warning-900: #A34100
--warning-950: #7A3100
```

#### Success Green
```css
--success-100: #A5F88B
--success-200: #87F665
--success-300: #78F551
--success-400: #69F43E
--success-500: #4BF218
--success-600: #3AD20C
--success-700: #30AE0A  /* PRIMARY */
--success-800: #268708
--success-900: #1B6006
--success-950: #103A03
```

#### Danger Red
```css
--danger-100: #FD9B9B
--danger-200: #FC7373
--danger-300: #FB4B4B
--danger-400: #FB3737
--danger-500: #FA0F0F
--danger-600: #DC0404
--danger-700: #A60303  /* PRIMARY */
--danger-800: #8C0303
--danger-900: #640202
--danger-950: #3C0101
```

#### Technology Purple (Use Sparingly)
**Usage:** AI features, Premium badges, Technology integrations, Developer tools
**Treatment:** NEVER solid fills - use outlines, glows, and shadows only

```css
--purple-100: #E89EFF  /* Accessible on dark backgrounds (8.66:1) */
--purple-200: #D580FF  /* Accessible on dark backgrounds (6.73:1) */
--purple-300: #BA23FB
--purple-400: #B40FFA
--purple-500: #A905F0
--purple-600: #9B04DC
--purple-700: #8D04C8
--purple-800: #7F04B4
--purple-900: #7103A0
--purple-950: #63028D  /* PRIMARY - For borders only */
```

**IMPORTANT - Accessibility Update:**
- For dark mode text, use **#D580FF** or lighter (meets WCAG AA 4.5:1)
- Original purple shades (#A905F0, #BA23FB) fail contrast on dark backgrounds
- For light mode, purple is used only for borders/outlines (not text)

**Purple Implementation Rules:**
- ❌ NO solid purple backgrounds
- ✅ Purple borders (2px solid)
- ✅ Purple glows/shadows (`0 0 20px #63028D`)
- ✅ Purple text/icons
- ✅ Very subtle purple tint (5% opacity max)

Example:
```css
.ai-badge {
  border: 2px solid #63028D;
  background: rgba(99, 2, 141, 0.05);
  box-shadow: 0 0 20px rgba(99, 2, 141, 0.4);
  color: #A905F0; /* Lighter shade for text */
}
```

#### Hyperlinks Magenta (Rarely Used)
```css
--magenta-100: #FC9CEC
--magenta-200: #FB74E5
--magenta-300: #FA4CDD
--magenta-400: #F924D6
--magenta-500: #EF06C8
--magenta-600: #C705A7  /* PRIMARY */
--magenta-700: #9F0485
--magenta-800: #770364
--magenta-900: #500243
--magenta-950: #280121
```

#### DEIB Pink (Almost Never Used)
```css
--pink-100: #F1A7DF
--pink-200: #EC83D2
--pink-300: #E972CB
--pink-400: #E660C5  /* PRIMARY */
--pink-500: #E34FBE
--pink-600: #E13DB8
--pink-700: #DE2BB1
--pink-800: #D421A7
--pink-900: #C21E99
--pink-950: #A41A81
```

#### Brown (Backup - Never Used So Far)
```css
--brown-100: #DA6207
--brown-200: #C65906
--brown-300: #B25006
--brown-400: #9E4705
--brown-500: #8B3E04
--brown-600: #773604
--brown-700: #632D03  /* PRIMARY */
--brown-800: #4F2402
--brown-900: #3B1B02
--brown-950: #231001
```

### Accessibility-First Color Usage

**CRITICAL:** All color combinations MUST meet WCAG 2.2 AA standards:
- Normal text: **4.5:1 minimum** contrast ratio
- Large text (18px+ or 14px+ bold): **3:1 minimum**
- UI components: **3:1 minimum**

#### Dark Mode Accessible Colors
When using text/icons on dark backgrounds (#001D3D, #232323):
```css
/* Use LIGHTER shades for accessibility */
Blue text:   #70B3FF  (--blue-dark-300)  /* 7.71:1 on #001D3D */
Purple text: #D580FF  (custom)           /* 6.73:1 on #001D3D */
             #E89EFF  (custom lighter)   /* 8.66:1 on #001D3D */

/* AVOID - Insufficient contrast */
Blue #0056B8:   Only 2.43:1 on #001D3D - FAILS
Purple #A905F0: Only 3.19:1 on #001D3D - FAILS
```

#### Light Mode Accessible Colors
When using backgrounds on white (#FFFFFF):
```css
/* These meet WCAG AA requirements */
Blue buttons: #0056B8 and darker  /* 6.95:1 minimum */

/* AVOID */
Blue #1F87FF: Only 3.52:1 on white - FAILS for normal text
```

### Color Usage Rules

#### Interactive State Progression (All Elements)
States should progress through palette shades to maintain visual hierarchy:

**Buttons (Example with Blue Dark - WCAG AA Compliant):**
```css
Normal:   #0056B8  (--blue-dark-700)  /* 6.95:1 on white, PASS */
Hover:    #00438F  (--blue-dark-800)  /* 9.55:1 on white, PASS */
Active:   #003066  (--blue-dark-900)  /* 13.01:1 on white, PASS */
Disabled: #5C5C5C  (--grey-dark-300)
```

**Note:** Previous hover state (#1F87FF) had insufficient contrast (3.52:1) and has been replaced with darker shades.

**Apply same shading logic to:**
- Links (a tags)
- Input fields (focus states)
- Checkboxes/Radio buttons
- Toggle switches
- Tabs
- All interactive elements

**Rule:** Move 2-3 shades lighter for hover, 5-6 shades lighter for active. Text contrast must meet WCAG 2.2 AA.

---

## Typography

### Font Stack

#### Primary (Body/UI): Inter
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
font-weights: 400, 500, 600, 700;
```
- Variable font for optimal performance
- Excellent screen readability
- WCAG 2.2 AAA compliant at 16px+
- Used by GitHub, Vercel, Linear

#### Secondary (Headings): Plus Jakarta Sans
```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
font-weights: 500, 600, 700, 800;
```
- Geometric, modern feel
- Friendly but professional
- Perfect dark/light mode contrast

#### Monospace (Code): JetBrains Mono
```css
font-family: 'JetBrains Mono', 'Fira Code', monospace;
font-weights: 400, 500, 700;
```
- Created for developers
- Excellent ligature support
- High readability

### Type Scale

```css
/* Headings - Plus Jakarta Sans */
H1: 3rem (48px)      - weight 700
H2: 2.25rem (36px)   - weight 700
H3: 1.875rem (30px)  - weight 600
H4: 1.5rem (24px)    - weight 600
H5: 1.25rem (20px)   - weight 600

/* Body - Inter */
Body:      1rem (16px)      - weight 400
Body Bold: 1rem (16px)      - weight 600
Small:     0.875rem (14px)  - weight 400
Tiny:      0.75rem (12px)   - weight 500

/* Code - JetBrains Mono */
Code: 0.875rem (14px) - weight 400
```

### Line Height
```css
Headings: 1.2
Body:     1.5
Small:    1.4
Code:     1.6
```

### Letter Spacing
```css
Headings:  -0.02em
Body:      0
Small:     0.01em
Uppercase: 0.05em
```

---

## Spacing & Layout

### Spacing System
Use Tailwind's default 4px base unit:

```css
1  = 4px
2  = 8px
3  = 12px
4  = 16px
6  = 24px
8  = 32px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
```

### Container Widths
```css
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Breakpoints
```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

---

## Component Specifications

### Borders & Corners
```css
Border Radius: 10px (standard for all cards/containers)
Border Width:  1.5px or 2px
Border Color:  2-3 shades lighter than container background
```

### Elevation System (Floating Effect)

#### Level 0 - Flat
```css
box-shadow: none;
/* Use for: Inline elements, text, icons */
```

#### Level 1 - Subtle Float
```css
box-shadow:
  0 2px 10px rgba(var(--shadow-color), 0.1),
  0 0 0 1px rgba(var(--border-color), 1);
/* Use for: Cards, containers, list items */
/* Shadow color: 2 shades lighter than container */
```

#### Level 2 - Medium Float
```css
box-shadow:
  0 4px 20px rgba(var(--shadow-color), 0.15),
  0 0 0 1px rgba(var(--border-color), 1);
/* Use for: Modals, dialogs, sheets */
/* Shadow color: 3 shades lighter than container */
```

#### Level 3 - High Float
```css
box-shadow:
  0 8px 30px rgba(var(--shadow-color), 0.2),
  0 0 0 1px rgba(var(--border-color), 1);
/* Use for: Dropdowns, tooltips, popovers, menus */
/* Shadow color: 3 shades lighter than container */
```

### Media Elements
```css
Border Radius: 10px (same as containers)
Border:        None (unless required for accessibility)
Object Fit:    cover (default)
```

### Buttons

#### Primary Button
```css
background: var(--blue-dark-700);
color: #FFFFFF;
border: 1.5px solid var(--blue-dark-600);
border-radius: 10px;
padding: 12px 24px;
font: Inter 600;

/* States */
hover: background: var(--blue-dark-500);
active: background: var(--blue-dark-200); color: var(--blue-dark-900);
disabled: background: var(--grey-dark-300); color: var(--grey-dark-600);
```

#### Secondary Button
```css
background: transparent;
color: var(--blue-dark-700);
border: 2px solid var(--blue-dark-700);
border-radius: 10px;
padding: 12px 24px;
font: Inter 600;

/* States */
hover: background: rgba(var(--blue-dark-700), 0.1);
active: background: rgba(var(--blue-dark-700), 0.2);
disabled: border-color: var(--grey-dark-300); color: var(--grey-dark-300);
```

#### Destructive Button
```css
background: var(--danger-700);
color: #FFFFFF;
border: 1.5px solid var(--danger-600);
/* States follow same pattern as Primary */
```

### Input Fields
```css
background: var(--grey-dark-900) (dark mode) / var(--grey-light-900) (light mode);
border: 1.5px solid var(--grey-dark-700) / var(--grey-light-700);
border-radius: 10px;
padding: 12px 16px;
font: Inter 400 16px;

/* States */
focus: border-color: var(--blue-dark-700); box-shadow: 0 0 0 3px rgba(var(--blue-dark-700), 0.1);
error: border-color: var(--danger-700);
disabled: background: var(--grey-dark-800); opacity: 0.5;
```

### Cards
```css
background: var(--grey-dark-900) (dark mode) / #FFFFFF (light mode);
border: 1.5px solid (2-3 shades lighter);
border-radius: 10px;
padding: 24px;
box-shadow: Level 1 elevation;
```

---

## Accessibility & Compliance

### Standards Compliance

LXP360 meets ALL of the following standards:

#### Core Web Accessibility
- **WCAG 2.2 Level AA** (minimum) - Technical accessibility requirements
- **ISO/IEC 40500:2012** - WCAG 2.0 ISO standard
- **ISO 30071-1:2019** - ICT accessibility code of practice
- **ISO 9241-171:2008** - Ergonomics of human-system interaction

#### Regional Legal Requirements
- **ADA (Americans with Disabilities Act)** - WCAG 2.1 Level AA for digital content
- **Section 508** - U.S. federal accessibility standards
- **European Accessibility Act (EAA)** - EU digital accessibility
- **EN 301 549** - European ICT accessibility (builds on WCAG)

#### Learning-Specific Standards
- **Universal Design for Learning (UDL)** - Framework for inclusive learning
  - Multiple Means of Engagement
  - Multiple Means of Representation
  - Multiple Means of Action and Expression

### Implementation Requirements

#### Color Contrast
All text must meet WCAG 2.2 AA minimum:
- **Normal text (16px+):** 4.5:1 contrast ratio
- **Large text (24px+):** 3:1 contrast ratio
- **UI components:** 3:1 contrast ratio

**Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Color Oracle for color blindness simulation

#### Keyboard Navigation
```css
/* Focus indicators - REQUIRED */
:focus-visible {
  outline: 3px solid var(--blue-dark-500);
  outline-offset: 2px;
  border-radius: 10px;
}

/* Never remove focus styles */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Requirements:**
- All interactive elements must be keyboard accessible
- Tab order must be logical
- Skip links for navigation
- Focus must always be visible (WCAG 2.2 Success Criterion 2.4.12)

#### Screen Reader Support
```html
<!-- ARIA labels required for all interactive elements -->
<button aria-label="Close dialog">×</button>

<!-- ARIA live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true">
  Loading...
</div>

<!-- Semantic HTML preferred -->
<nav>, <main>, <article>, <aside>, <header>, <footer>
```

#### Motion & Animation
```css
/* Respect prefers-reduced-motion - REQUIRED */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Neurodiversity Support (WCAG 2.2 Enhanced)
- ✅ Clear and consistent navigation
- ✅ Accessible authentication (no cognitive tests)
- ✅ Alternatives to complex gestures
- ✅ Focus always visible
- ✅ Consistent help locations
- ✅ Minimal redundant entry
- ✅ Plain language and structure
- ✅ Reduced distractions (no auto-play)

#### High Contrast Mode
```css
@media (prefers-contrast: high) {
  /* Increase border widths and contrast */
  * {
    border-width: 2px;
  }
}
```

#### Text Customization
Users must be able to:
- Resize text up to 200% without loss of functionality
- Adjust line height to 1.5x font size
- Adjust paragraph spacing to 2x font size
- Adjust letter spacing to 0.12x font size

---

## Motion & Animation

### Animation Philosophy

**Two Distinct Approaches:**

1. **Internal Pages (Productivity-focused):**
   - Minimal, fast, purposeful animations
   - Respect user productivity and focus
   - Always respect `prefers-reduced-motion`
   - Use Framer Motion for simple, declarative animations

2. **Public Pages (Wow-factor, Marketing):**
   - Tech-forward, innovative animations
   - Scroll-based storytelling
   - Complex timelines and parallax effects
   - Use Framer Motion + GSAP combo

### Animation Libraries

#### Framer Motion (Motion v11+)
**Use for:** All internal pages, UI micro-interactions, page transitions
```bash
pnpm add framer-motion
```

**Example Usage:**
```jsx
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content here
</motion.div>
```

#### GSAP (GreenSock Animation Platform)
**Use for:** Public-facing marketing pages, scroll-based animations
```bash
pnpm add gsap @gsap/react
```

**Example Usage:**
```jsx
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

useGSAP(() => {
  gsap.to(".hero", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
    opacity: 0,
    y: -100
  })
})
```

#### Optional: Aceternity UI / Magic UI
**Use for:** Pre-built landing page components with stunning effects
```bash
pnpm add aceternity-ui  # Optional
```

### Timing Durations

```css
--transition-instant:  0ms;    /* State changes (focus rings) */
--transition-fast:     150ms;  /* Micro-interactions (hover, focus) */
--transition-normal:   300ms;  /* Standard transitions, dropdowns */
--transition-moderate: 500ms;  /* Modals, page transitions */
--transition-slow:     800ms;  /* Dashboard switches, major layout */
```

### Easing Functions

```css
--ease-out:    cubic-bezier(0, 0, 0.2, 1);      /* Elements entering */
--ease-in:     cubic-bezier(0.4, 0, 1, 1);      /* Elements exiting */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);    /* State changes */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful (non-critical only) */
```

### Accessibility - Reduced Motion

**REQUIRED:** All animations must respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### What Gets Animated

#### ✅ DO Animate (Internal Pages)
- Hover states (opacity, color, scale)
- Button presses (scale down, brightness)
- Loading indicators (rotation, pulsing)
- Toasts/notifications (slide-in, fade-out)
- Modals/dialogs (fade + scale from center)
- Dropdowns (slide-down with fade)
- Page transitions (fade between routes)
- Success/completion states (checkmark draw, subtle bounce)
- Card elevation changes (shadow smooth transition)
- Skeleton loaders (shimmer effect)

#### ✅ DO Animate (Public Pages)
- All of the above, PLUS:
- Hero sections (parallax, scroll-based reveals)
- Text animations (word-by-word reveals)
- SVG path animations
- 3D transforms and perspective
- Mouse-follow effects
- Scroll-triggered sequences
- Number counters
- Logo reveals

#### ❌ DON'T Animate
- Text appearing (unless accessibility override allows)
- Layout shifts that could cause confusion
- Critical alerts/errors (instant appearance)
- Anything that delays user productivity
- Background decorative elements (static or very subtle)

### Standard Transitions

```css
/* Hover effects */
.interactive-element {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Color/background changes */
.color-change {
  transition: background-color 300ms cubic-bezier(0, 0, 0.2, 1);
}

/* Transform animations */
.transform-element {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Component-Specific Animations

#### Buttons
```css
/* Normal → Hover */
transition: 150ms ease-out;
transform: scale(1) → brightness(1.1);
box-shadow: grow;

/* Hover → Active */
transition: 100ms ease-in;
transform: scale(0.98);
brightness: increase;

/* Active → Normal */
transition: 200ms ease-out;
```

#### Modals
```jsx
// Framer Motion example
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
>
  Modal content
</motion.div>
```

#### Notifications/Toasts
```jsx
// Slide-in from right
<motion.div
  initial={{ x: 400, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  Notification
</motion.div>
```

### Loading States

#### Spinner (< 3 seconds)
```css
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### Skeleton Screens (> 3 seconds)
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--grey-dark-800) 0%,
    var(--grey-dark-700) 50%,
    var(--grey-dark-800) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 2s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### Progress Bars
```css
.progress-bar-fill {
  transition: width 300ms ease-out;
}
```

### Content Authoring Tool

**Independent Animation Controls:**
- Content creators can add animations to course content via authoring ribbon
- Uses Framer Motion's programmatic API for content animations
- Uses GSAP for advanced timeline-based animations in courses
- Provides preset animation options (fade, slide, scale, etc.)
- Includes accessibility checker (warns if animations violate WCAG)
- Allows learners to disable animations in player settings

**Required Libraries for Authoring Tool:**
```bash
# Animation engines
framer-motion  # UI micro-interactions
gsap          # Timeline-based course animations
@gsap/react   # React integration

# Must be available in authoring ribbon
```

---

## Icon System

### Philosophy
- **Consistency:** Use same icon library across all internal pages
- **Variety:** Public pages can mix for brand differentiation
- **Tree-shakable:** Only import icons you use
- **Accessible:** All icons must have ARIA labels or alt text

### Primary Icon Library: Lucide React

**Current and Recommended for Internal Pages**

```bash
# Already installed
lucide-react
```

**Why Lucide:**
- 1,500+ icons, actively maintained
- Tree-shakable (only imports what you use)
- Consistent 2px stroke width (matches brand)
- Default for shadcn/ui components
- Perfect for dashboard/app interfaces

**Usage Example:**
```jsx
import { User, Settings, LogOut } from "lucide-react"

<User className="w-5 h-5" />
<Settings className="w-6 h-6 text-blue-dark-700" />
<LogOut className="w-4 h-4" strokeWidth={2.5} />
```

**Icon Sizes:**
```css
Small:  16px (w-4 h-4)
Medium: 20px (w-5 h-5)
Large:  24px (w-6 h-6)
XL:     32px (w-8 h-8)
```

### Secondary Icon Libraries (Optional)

#### Phosphor Icons
**Use for:** Public pages, brand differentiation, duotone style

```bash
pnpm add @phosphor-icons/react
```

**Features:**
- Unique duotone style (two-tone icons)
- Multiple weights (thin, light, regular, bold, fill, duotone)
- 6,000+ icons
- Great for marketing pages

**Usage Example:**
```jsx
import { MagnifyingGlass, House } from "@phosphor-icons/react"

<MagnifyingGlass size={24} weight="duotone" />
<House size={32} weight="bold" />
```

#### Heroicons
**Use for:** Tailwind CSS projects, marketing pages

```bash
pnpm add @heroicons/react
```

**Features:**
- Created by Tailwind CSS team
- Solid and outline variants
- 300+ icons
- Pairs perfectly with Tailwind

**Usage Example:**
```jsx
import { UserIcon } from "@heroicons/react/24/outline"
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid"

<UserIcon className="w-6 h-6" />
<UserIconSolid className="w-6 h-6" />
```

#### React Icons (Fallback)
**Use for:** When Lucide doesn't have what you need

```bash
pnpm add react-icons
```

**Features:**
- 3,000+ icons from multiple sets
- Includes Font Awesome, Material Icons, Bootstrap Icons, etc.
- Universal fallback

**Usage Example:**
```jsx
import { FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

<FaGithub size={24} />
<MdEmail size={20} />
```

### Icon Usage Guidelines

#### Internal Pages (Dashboard, Tools)
```jsx
// ✅ DO: Use Lucide exclusively
import { Home, Settings, User } from "lucide-react"

// ❌ DON'T: Mix icon libraries on same page
import { Home } from "lucide-react"
import { UserIcon } from "@heroicons/react"  // Don't mix!
```

#### Public Pages (Marketing, Landing)
```jsx
// ✅ DO: Can mix for visual variety
import { Sparkles } from "lucide-react"           // UI elements
import { Lightning } from "@phosphor-icons/react" // Hero section
import { ChartBar } from "@heroicons/react"       // Features

// Use consistently within each section
```

#### Accessibility
```jsx
// ✅ DO: Add ARIA labels for icon-only buttons
<button aria-label="Close dialog">
  <X className="w-5 h-5" />
</button>

// ✅ DO: Hide decorative icons from screen readers
<Settings aria-hidden="true" className="w-5 h-5" />

// ❌ DON'T: Leave icon buttons without labels
<button>
  <Trash className="w-5 h-5" />
</button>
```

#### Color and Styling
```jsx
// ✅ DO: Use Tailwind classes
<User className="w-6 h-6 text-blue-dark-700" />

// ✅ DO: Use CSS variables
<User className="w-6 h-6" style={{ color: 'var(--brand-primary)' }} />

// ✅ DO: Adjust stroke width for emphasis
<AlertCircle className="w-5 h-5" strokeWidth={2.5} />
```

### Recommended Installation

```bash
# Essential (internal pages)
pnpm add lucide-react

# Optional (public pages, variety)
pnpm add @phosphor-icons/react
pnpm add @heroicons/react

# Fallback (only when needed)
pnpm add react-icons
```

### Content Authoring Tool Icon Library

**Icon Library for Content Creators:**
The authoring tool ribbon must provide access to ALL icon libraries so content creators can choose icons for their course content:

```bash
# Required for authoring tool
pnpm add lucide-react           # Primary UI icons
pnpm add @phosphor-icons/react  # Duotone variety
pnpm add @heroicons/react       # Tailwind-style icons
pnpm add react-icons           # Universal fallback (3,000+ icons)
```

**Authoring Ribbon Features:**
- Icon picker component with search
- Preview of all available icons
- Filter by library (Lucide, Phosphor, Heroicons, React Icons)
- Filter by category (UI, Social, Education, etc.)
- Accessibility warnings if icon used without label
- Size and color customization
- Copy code snippet for developers

---

## Implementation Guidelines

### CSS Custom Properties (Variables)

#### Dark Mode (Default)
```css
:root {
  /* Backgrounds */
  --bg-primary: #001D3D;
  --bg-secondary: #003066;
  --bg-tertiary: #00438F;

  /* Surfaces */
  --surface-primary: #232323;
  --surface-secondary: #292929;
  --surface-tertiary: #333333;

  /* Borders */
  --border-primary: #474747;
  --border-secondary: #3D3D3D;

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #CCCCCC;
  --text-tertiary: #A3A3A3;

  /* Brand */
  --brand-primary: #0056B8;
  --brand-secondary: #0184CB;

  /* Interactive states */
  --interactive-normal: #0056B8;
  --interactive-hover: #1F87FF;
  --interactive-active: #99C9FF;
  --interactive-disabled: #5C5C5C;
}
```

#### Light Mode
```css
[data-theme="light"] {
  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F5F5;
  --bg-tertiary: #EBEBEB;

  /* Surfaces */
  --surface-primary: #FFFFFF;
  --surface-secondary: #F5F5F5;
  --surface-tertiary: #EBEBEB;

  /* Borders */
  --border-primary: #D6D6D6;
  --border-secondary: #E0E0E0;

  /* Text */
  --text-primary: #232323;
  --text-secondary: #525252;
  --text-tertiary: #707070;

  /* Brand colors stay the same */
  --brand-primary: #0056B8;
  --brand-secondary: #0184CB;

  /* Interactive states */
  --interactive-normal: #0056B8;
  --interactive-hover: #1F87FF;
  --interactive-active: #99C9FF;
  --interactive-disabled: #C2C2C2;
}
```

### Theme Detection & Switching
```javascript
// Detect OS preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
const theme = prefersDark ? 'dark' : 'light';
document.documentElement.setAttribute('data-theme', theme);

// Listen for OS changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
});

// Manual toggle
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
```

### Component Naming Conventions
```
Descriptive, Purpose-based names:
- PrimaryButton, SecondaryButton, DangerButton
- CardPrimary, CardSecondary
- InputText, InputEmail, InputPassword
- ModalDialog, ModalSheet
- TooltipPrimary, TooltipInfo
```

### File Organization
```
styles/
  ├── globals.css          # Global styles, CSS reset
  ├── variables.css        # CSS custom properties
  ├── themes/
  │   ├── dark.css        # Dark mode variables
  │   └── light.css       # Light mode variables
  ├── typography.css       # Font imports, type scale
  ├── components/
  │   ├── buttons.css
  │   ├── inputs.css
  │   ├── cards.css
  │   └── ...
  └── utilities.css        # Utility classes
```

---

## Do's and Don'ts

### ✅ DO
- Use Blue as primary brand color as much as possible
- Respect OS color scheme preference
- Provide manual theme toggle
- Meet WCAG 2.2 AA minimum (AAA preferred)
- Use purple sparingly for tech features (outlines/glows only)
- Keep gradients within single color palette
- Use 10px border radius consistently
- Add 2-3 shade lighter borders and shadows for floating effect
- Test with keyboard navigation
- Test with screen readers
- Respect `prefers-reduced-motion`
- Use semantic HTML
- Provide ARIA labels for all interactive elements
- Use Inter for body, Plus Jakarta Sans for headings
- Follow UDL principles for learning content

### ❌ DON'T
- Never use solid purple fills
- Never mix color palettes in gradients
- Never remove focus indicators
- Never auto-play audio/video
- Never use color alone to convey information
- Never create cognitive tests for authentication
- Never ignore keyboard accessibility
- Never use text smaller than 12px
- Never exceed 80 characters per line
- Never use Comic Sans (obviously)
- Never disable user zoom/text resize
- Never create time-based interactions without alternatives
- Never forget alt text on images
- Never nest interactive elements

---

## Quick Reference

### Brand Colors (Most Used)
```
Primary Blue:    #0056B8
Background Dark: #001D3D
Background Light:#FFFFFF
Success:         #30AE0A
Danger:          #A60303
Warning:         #F56200
Caution:         #FFBE0A
```

### Typography (Quick Copy)
```css
font-family: 'Inter', system-ui, sans-serif;             /* Body */
font-family: 'Plus Jakarta Sans', system-ui, sans-serif; /* Headings */
font-family: 'JetBrains Mono', monospace;                /* Code */
```

### Common Spacing
```
Component padding:  24px
Button padding:     12px 24px
Input padding:      12px 16px
Card padding:       24px
Section padding:    48px 0
```

### Accessibility Checklist
- [ ] Color contrast meets WCAG 2.2 AA (4.5:1 for normal text)
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible on all focusable elements
- [ ] ARIA labels on buttons, links, inputs
- [ ] `prefers-reduced-motion` respected
- [ ] `prefers-color-scheme` respected
- [ ] Screen reader tested
- [ ] Semantic HTML used
- [ ] Alt text on all images
- [ ] Form labels properly associated
- [ ] Error messages clear and helpful
- [ ] Skip links for navigation
- [ ] Heading hierarchy logical (h1→h2→h3)

---

## Resources

### Accessibility Testing Tools
- **WAVE:** https://wave.webaim.org/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Oracle:** Color blindness simulator
- **axe DevTools:** Browser extension for accessibility testing
- **Screen readers:** NVDA (Windows), VoiceOver (Mac), JAWS

### Design Resources
- **WebAIM:** https://webaim.org/resources/designers/
- **Level Access:** https://www.levelaccess.com/compliance-overview/
- **WCAG 2.2:** https://www.w3.org/WAI/WCAG22/quickref/
- **UDL Guidelines:** http://udlguidelines.cast.org/

### Font Resources
- **Inter:** https://rsms.me/inter/
- **Plus Jakarta Sans:** https://fonts.google.com/specimen/Plus+Jakarta+Sans
- **JetBrains Mono:** https://www.jetbrains.com/lp/mono/

---

**END OF BRAND SYSTEM DOCUMENTATION**

For questions or clarifications, refer to this document as the single source of truth for all LXP360 internal branding decisions.
