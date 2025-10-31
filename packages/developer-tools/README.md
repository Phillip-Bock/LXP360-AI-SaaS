# Developer Tools & Interactive Components

## Overview

This package contains interactive HTML components that need to be converted to React/TypeScript for integration into LXP360-AI-SaaS.

## Directory Structure

```
developer-tools/
├── interactive-components/
│   ├── eMentor/                    # AI mentor feedback tool
│   ├── interactive-checklist/      # Interactive checklist component
│   └── 360-video-player/           # 360-degree video player
└── README.md                        # This file
```

## Components Inventory

### 1. eMentor
**Location**: `interactive-components/eMentor/`

**Description**: AI-powered mentor feedback tool for providing contextual question guidance

**Features**:
- Question/answer feedback interface
- Real-time AI response suggestions
- Progress tracking
- Clean UI with brand colors

**Tech**: Standalone HTML/CSS/JS with Tailwind

**Status**: ⚠️ **NEEDS CONVERSION** to React component

**Integration Path**:
- Convert to React component in `apps/lxp360-monolith/components/interactive-blocks/`
- Add to content block library
- Connect to Google Cloud AI for responses

---

### 2. Interactive Checklist
**Location**: `interactive-components/interactive-checklist/`

**Description**: Interactive checklist with progress tracking and completion states

**Features**:
- Checkbox list with completion tracking
- Progress bar
- Completion feedback
- Branded styling (#234F7A)

**Tech**: Standalone HTML/CSS/JS with Tailwind

**Status**: ⚠️ **NEEDS CONVERSION** to React component

**Integration Path**:
- Convert to React component in `apps/lxp360-monolith/components/interactive-blocks/`
- Add state management
- Integrate with course progress tracking

---

### 3. 360 Video Player
**Location**: `interactive-components/360-video-player/`

**Description**: Interactive 360-degree video player with hotspot support

**Features**:
- 360-degree video playback
- Interactive hotspots
- Spherical video projection
- A-Frame based rendering

**Tech**: HTML/A-Frame/WebGL

**Status**: ⚠️ **NEEDS CONVERSION** to React component

**Integration Path**:
- Convert to React component using react-three-fiber or A-Frame React
- Add to media blocks
- Support interactive hotspots
- Integrate with course content system

**Dependencies**:
- A-Frame or Three.js
- Video streaming support
- WebGL compatibility

---

## Conversion Priority

### Phase 1 - Quick Wins (Tonight/Tomorrow)
1. **Interactive Checklist** ← Easiest, high value
   - Simple state management
   - No external dependencies
   - Direct integration path

### Phase 2 - Medium Complexity
2. **eMentor** ← Requires AI integration
   - Connect to Google Cloud AI (Gemini API)
   - Add real-time response handling
   - Integrate with question banks

### Phase 3 - Complex
3. **360 Video Player** ← Most complex
   - Requires 3D rendering library
   - Video streaming setup
   - Performance optimization
   - Testing across devices

## Conversion Guide

### General Process
1. **Extract logic** from HTML/JS
2. **Create React component** with TypeScript
3. **Add props interface** for configuration
4. **Implement state management** (useState/useReducer)
5. **Style with Tailwind** (already used in HTML)
6. **Add to block library** in monolith
7. **Test integration** with course editor

### Example: Interactive Checklist Conversion

**Input** (HTML):
```html
<div class="checklist">
  <input type="checkbox" id="item1">
  <label for="item1">Check this</label>
</div>
```

**Output** (React):
```tsx
interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

interface InteractiveChecklistProps {
  items: ChecklistItem[];
  onComplete?: () => void;
}

export function InteractiveChecklist({ items, onComplete }: InteractiveChecklistProps) {
  const [checklist, setChecklist] = useState(items);
  // ... component logic
}
```

### Styling Notes
All components use brand color: `#234F7A`

Already compatible with Tailwind CSS (used in monolith).

## Integration Locations

### Where to Add Converted Components

#### Interactive Blocks
```
apps/lxp360-monolith/components/interactive-blocks/
├── accordion-collapsible.tsx
├── drag-drop-categorize.tsx
├── flip-cards.tsx
├── interactive-checklist.tsx      ← ADD HERE
├── e-mentor.tsx                    ← ADD HERE
└── ...
```

#### Media Blocks
```
apps/lxp360-monolith/components/media-blocks/
├── audio-player.tsx
├── video-player.tsx
├── video-360-player.tsx           ← ADD HERE
└── ...
```

## Documentation Requirements

After conversion, update:
1. `Reference/Page-Maps/PAGE_MAP.md` - Add new components
2. Component README in respective folders
3. Storybook stories (future)
4. Usage examples

## Testing Requirements

1. **Unit tests** - Component behavior
2. **Integration tests** - With course editor
3. **Visual regression** - Screenshot tests
4. **Accessibility** - WCAG 2.1 AA compliance
5. **Cross-browser** - Chrome, Firefox, Safari, Edge
6. **Mobile** - iOS and Android

## Dependencies to Add

### For 360 Video Player
```json
{
  "dependencies": {
    "@react-three/fiber": "^8.0.0",
    "@react-three/drei": "^9.0.0",
    "three": "^0.150.0"
  }
}
```

Or use A-Frame React:
```json
{
  "dependencies": {
    "aframe": "^1.4.0",
    "aframe-react": "^5.0.0"
  }
}
```

### For eMentor AI Integration
Already have Google Cloud AI access - use Gemini API:
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
```

## Brand Colors (From HTML Files)

- **Primary Blue**: `#234F7A`
- **Dark Blue**: `#1b3b5c`
- **Background**: `#f9fafb`
- **White**: `#ffffff`

These match LXP360 branding documented in `Reference/Branding/BRANDING_GUIDELINES.md`.

## Next Steps

1. ✅ Components copied to `developer-tools/`
2. ⏳ Convert Interactive Checklist to React (PRIORITY 1)
3. ⏳ Convert eMentor to React + AI integration (PRIORITY 2)
4. ⏳ Convert 360 Video Player to React (PRIORITY 3)
5. ⏳ Add to content block library
6. ⏳ Update documentation
7. ⏳ Create conversion guide for any remaining HTML components

## Conversion Assistance

When converting, reference:
- **Existing blocks**: `apps/lxp360-monolith/components/interactive-blocks/`
- **Branding**: `Reference/Branding/BRANDING_GUIDELINES.md`
- **Structure**: `Reference/Structure/MONOREPO_STRUCTURE.md`

All existing interactive blocks follow the same pattern - use them as templates.

---

**Created**: October 30, 2025
**Status**: Ready for conversion
**Priority**: High (needed for complete feature set)
