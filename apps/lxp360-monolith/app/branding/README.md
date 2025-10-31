# LXP360 Branding Examples

**Live Examples:** Interactive demonstrations of the LXP360 brand system
**Last Updated:** October 31, 2025
**Status:** LOCKED IN - This is the official LXP360 brand system

---

## Quick Access

- **Light Mode Example:** [/branding/light-example](./light-example)
- **Dark Mode Example:** [/branding/dark-example](./dark-example)
- **Complete Brand System Documentation:** [../../Reference/Branding/LXP360_COMPLETE_BRAND_SYSTEM.md](../../Reference/Branding/LXP360_COMPLETE_BRAND_SYSTEM.md)

---

## What's Inside

These pages showcase the complete LXP360 brand system with live, interactive examples:

### 🎨 Color System
- **12 complete color palettes** (10 shades each)
- Primary Blue (#0056B8) brand color
- Purple technology accents (outline-only treatment)
- Dark mode default (#001D3D) + Light mode alternative (#FFFFFF)
- WCAG 2.2 AA compliant contrast ratios

### 📝 Typography
- **Headings:** Plus Jakarta Sans (Bold/Semibold)
- **Body:** Inter (Regular)
- **Code:** JetBrains Mono
- Accessible type scale with proper line heights

### ✨ Animations
- **Framer Motion:** Internal UI micro-interactions
- **GSAP:** Public-facing scroll effects
- Respects `prefers-reduced-motion` for accessibility
- 150ms-500ms optimal durations

### 🎯 Icon Libraries
- **Lucide React:** Primary for internal pages
- **Phosphor Icons:** Duotone variety for visual interest
- **Heroicons:** Tailwind CSS style

### 🧩 Components
- **3 Elevation Levels:** Subtle, medium, and high floating effects
- **Interactive States:** Normal → Hover → Active → Disabled
- **Loading Patterns:** Spinners (<3s) and Skeleton screens (>3s)
- **Buttons:** Primary, secondary, and destructive variants
- **Cards:** Consistent border radius (10px) and shadows

---

## Running the Examples Locally

### Development Server

```bash
# From the monorepo root
pnpm dev

# Or from the monolith app directory
cd apps/lxp360-monolith
pnpm dev
```

Then visit:
- Light Mode: `http://localhost:3000/branding/light-example`
- Dark Mode: `http://localhost:3000/branding/dark-example`

---

## File Structure

```
apps/lxp360-monolith/app/branding/
├── README.md                    # This file
├── light-example/
│   └── page.tsx                 # Light mode branding showcase
└── dark-example/
    └── page.tsx                 # Dark mode branding showcase
```

---

## Key Branding Principles

### ✅ Always Do

1. **Use Blue Everywhere** - Primary brand color (#0056B8)
2. **Purple = Outlines Only** - Never solid fills, only borders/glows/shadows
3. **WCAG 2.2 AA Minimum** - All text must meet 4.5:1 contrast ratio
4. **Respect User Preferences** - Honor `prefers-color-scheme` and `prefers-reduced-motion`
5. **10px Border Radius** - Consistent across all cards/containers
6. **Floating Effect** - Border 2-3 shades lighter + subtle shadow
7. **Semantic HTML** - Use proper tags for accessibility

### ❌ Never Do

1. **No Solid Purple Fills** - Only outlines, glows, and shadows
2. **No Mixed Gradients** - Keep gradients within single color palette
3. **No Removed Focus Indicators** - Keyboard accessibility is required
4. **No Auto-play Media** - Respect user control
5. **No Color-Only Information** - Always provide text alternatives
6. **No Text Below 12px** - Readability minimum

---

## Accessibility Compliance

These examples demonstrate compliance with:

- **WCAG 2.2 Level AA** (minimum standard)
- **Section 508** (U.S. federal accessibility)
- **European Accessibility Act (EAA)**
- **Universal Design for Learning (UDL)** principles

### Testing Checklist

- [x] Color contrast meets WCAG AA (4.5:1 for normal text)
- [x] Keyboard navigation works on all interactive elements
- [x] Focus indicators visible and consistent
- [x] ARIA labels on all buttons and icons
- [x] `prefers-reduced-motion` respected
- [x] `prefers-color-scheme` respected
- [x] Screen reader compatible
- [x] Semantic HTML structure

---

## Implementation Notes

### Dependencies Required

Both example pages use these libraries:

```json
{
  "framer-motion": "^12.23.24",
  "gsap": "^3.13.0",
  "@gsap/react": "^2.1.2",
  "lucide-react": "^0.454.0",
  "@phosphor-icons/react": "^2.1.10",
  "@heroicons/react": "^2.2.0"
}
```

All dependencies are already installed in the monolith app.

### Animation Examples

**Framer Motion (Hover/Tap):**
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
  className="px-6 py-3 bg-[#0056B8]"
>
  Button Text
</motion.button>
```

**GSAP (Scroll Trigger):**
```tsx
useGSAP(() => {
  gsap.to(heroRef.current, {
    scrollTrigger: {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    opacity: 0.5,
    y: -50,
  })
})
```

### Purple Usage Example

```tsx
<div
  className="inline-block px-6 py-3 border-2 border-[#63028D] rounded-lg"
  style={{
    background: "rgba(99, 2, 141, 0.05)",
    boxShadow: "0 0 20px rgba(99, 2, 141, 0.4)",
  }}
>
  <span className="text-[#D580FF] font-semibold">AI-Powered</span>
</div>
```

### Elevation Levels

```tsx
// Level 1 - Cards
box-shadow: 0 2px 10px rgba(214, 214, 214, 0.1), 0 0 0 1px rgba(214, 214, 214, 1)

// Level 2 - Modals
box-shadow: 0 4px 20px rgba(214, 214, 214, 0.15), 0 0 0 1px rgba(214, 214, 214, 1)

// Level 3 - Dropdowns
box-shadow: 0 8px 30px rgba(214, 214, 214, 0.2), 0 0 0 1px rgba(214, 214, 214, 1)
```

---

## Color Reference (Quick Copy)

### Primary Brand Colors

```css
--blue-dark-700: #0056B8;    /* Primary Blue */
--blue-dark-950: #001D3D;    /* Dark Mode Background */
--grey-light-950: #FFFFFF;   /* Light Mode Background */
--purple-950: #63028D;       /* Purple (borders only) */
--success-700: #30AE0A;      /* Success Green */
--danger-700: #A60303;       /* Danger Red */
--warning-700: #F56200;      /* Warning Orange */
--caution-700: #FFBE0A;      /* Caution Yellow */
```

### Interactive States (Primary Button)

```css
Normal:   #0056B8  (--blue-dark-700)
Hover:    #00438F  (--blue-dark-800)
Active:   #003066  (--blue-dark-900)
Disabled: #5C5C5C  (--grey-dark-300)
```

---

## For Designers

Use these live examples as reference when:
- Designing new UI components
- Creating marketing materials
- Onboarding new team members
- Ensuring brand consistency

**Figma/Design Tools:**
- Extract colors directly from the live examples using browser dev tools
- Reference the complete brand system documentation for all color shades
- Use the same font stack (Inter, Plus Jakarta Sans, JetBrains Mono)

---

## For Developers

### Component Development

1. **Review the examples** to understand the brand system
2. **Copy code patterns** from `page.tsx` files for consistency
3. **Test accessibility** using the same standards shown in examples
4. **Reference documentation** for complete color palettes and guidelines

### Adding New Components

When creating new components:

1. Use the color variables from the brand system
2. Follow the 10px border radius convention
3. Implement all 4 interactive states (normal, hover, active, disabled)
4. Add proper ARIA labels and semantic HTML
5. Test with keyboard navigation
6. Respect `prefers-reduced-motion`

---

## Updating These Examples

If you need to update the branding examples:

1. **Edit the page files:**
   - `light-example/page.tsx`
   - `dark-example/page.tsx`

2. **Update documentation:**
   - This README
   - `Reference/Branding/LXP360_COMPLETE_BRAND_SYSTEM.md`

3. **Test thoroughly:**
   - Run locally: `pnpm dev`
   - Check both light and dark modes
   - Verify accessibility with keyboard navigation
   - Test with screen reader

4. **Deploy:**
   - Commit changes
   - Deploy to staging first
   - Verify in production

---

## Support & Questions

For questions about the brand system:

1. **Check the complete documentation:** [LXP360_COMPLETE_BRAND_SYSTEM.md](../../Reference/Branding/LXP360_COMPLETE_BRAND_SYSTEM.md)
2. **Review these live examples** for implementation patterns
3. **Ask the design team** for clarification on brand decisions

---

## Version History

- **October 31, 2025** - Branding system locked in, examples finalized
- **October 30, 2025** - Complete brand system documentation created
- **October 2025** - Initial branding examples developed

---

**This is the official LXP360 brand system. Use these examples as the single source of truth for all branding decisions.**
