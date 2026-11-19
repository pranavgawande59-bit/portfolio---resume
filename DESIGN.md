# Design Specifications & UI/UX Architecture (DESIGN.md)
## Pranav Gawande — AI Architect & Full-Stack Developer Portfolio

---

## 1. Design Philosophy & Aesthetic Identity

The design language of the portfolio is inspired by modern high-precision developer tools (Linear, Vercel, Stripe), blending clean Scandinavian minimalism with futuristic engineering aesthetics.

### Key Visual Principles:
1. **Clarity & Content-First:** Clean typography and generous whitespace prioritize readability of code snippets, architecture highlights, and academic credentials.
2. **Subtle Depth & Layering:** Restrained drop shadows, delicate hairline borders (`border-slate-200/80`), and light translucent backdrops (`backdrop-blur-md`) create depth without visual noise.
3. **Responsive Motion:** Meaningful micro-interactions powered by `motion/react` provide feedback without degrading perceived performance.
4. **Professional Tech Palette:** Professional slate, dark cyan/sky blue primary highlights, and emerald status indicators convey modern technical credibility.

---

## 2. Design Tokens & Color Palette

### 2.1 Color Tokens

| Token Name | Hex Code | Tailwind Equivalent | Usage / Semantic Role |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#ffffff` / `#f8fafc` | `bg-white` / `bg-slate-50` | Primary page canvas and elevated card surfaces |
| **Surface Raised** | `#f1f5f9` | `bg-slate-100` | Subtle contrast panels, pill tabs, input backgrounds |
| **Text Primary** | `#0f172a` | `text-slate-900` | Primary headings, titles, high-emphasis body text |
| **Text Secondary** | `#475569` | `text-slate-600` | Subtitles, supporting copy, descriptions |
| **Text Muted** | `#94a3b8` | `text-slate-400` | Metadata, timestamps, placeholders, inactive states |
| **Border Subtle** | `#e2e8f0` | `border-slate-200` | Card borders, dividers, subtle separators |
| **Primary Brand (Sky/Blue)**| `#0284c7` / `#0ea5e9` | `text-sky-600` / `bg-sky-500` | Primary buttons, active tab indicators, glowing accents |
| **Accent Emerald** | `#10b981` | `text-emerald-600` | "Available for hire" status dot, success indicators |
| **Warning / Notice** | `#f59e0b` | `text-amber-500` | Under-review tags, work-in-progress alerts |
| **Owner Mode Accent** | `#8b5cf6` | `text-violet-600` | Admin mode banners, owner control badges |

### 2.2 Typography Scale

- **Font Family:** Modern Sans-Serif (`Inter`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`)
- **Code / Monospace:** `Fira Code`, `JetBrains Mono`, `ui-monospace`, `SFMono-Regular`, `Consolas`

| Style | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display Heading** | `2.5rem` – `3.25rem` (40–52px) | Bold / 800 | 1.15 | Hero title, home greeting |
| **H1 Section Title** | `1.875rem` – `2.25rem` (30–36px) | Bold / 700 | 1.25 | View headlines (About, Projects, Resume) |
| **H2 Card Header** | `1.25rem` – `1.5rem` (20–24px) | SemiBold / 600| 1.35 | Section cards, experience items, project titles |
| **Body Large** | `1.125rem` (18px) | Regular / 400 | 1.6 | Introductory summaries, lead paragraphs |
| **Body Standard** | `0.9375rem` (15px) | Regular / 400 | 1.6 | General text, bullet points, modal body |
| **Caption / Meta** | `0.75rem` – `0.8125rem` (12–13px) | Medium / 500 | 1.4 | Badges, tech tags, dates, tooltips |

---

## 3. Layout Grid & Responsive Breakpoints

```
  Mobile (<640px)        Tablet (640-1023px)         Desktop (1024px+)
┌──────────────────┐   ┌───────────────────────┐   ┌─────────────────────────────┐
│ Navbar (Collapsed│   │ Navbar (Full/Compact) │   │ Navbar (6 Tab Links + Icons)│
│ Hero (Stacked)   │   │ Hero (2-Column Grid)  │   │ Hero / Multi-Column Views   │
│ Single Column    │   │ 2-Column Cards        │   │ Max Width 1024px (5xl)      │
│ Floating Chat FAB│   │ Floating Chat Drawer  │   │ Right Slide-Over Drawer     │
└──────────────────┘   └───────────────────────┘   └─────────────────────────────┘
```

- **Container Constraint:** `max-w-5xl mx-auto px-4 sm:px-6`
- **Breakpoints:**
  - `sm`: `640px` (Tablets & landscape mobile)
  - `md`: `768px` (iPad & small laptops)
  - `lg`: `1024px` (Desktops & primary desktop grid)
  - `xl`: `1280px` (Large displays)

---

## 4. Component Design Specifications

### 4.1 Navigation Bar (`Navbar.tsx`)
- **Position:** Fixed top header (`fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80`).
- **Elements:**
  - Left: Interactive Brand Logo (`BrandLogo.tsx`) with dynamic monogram and animated status ring.
  - Center: Pill-shaped segmented tabs (`Home`, `About`, `Projects`, `Research`, `Resume`, `Contact`) with active indicator pill.
  - Right: "Chat with AI" button with gradient ring, Quick "Hire Me" action, and mobile hamburger toggle.

### 4.2 Conversational AI Drawer (`AiChatDrawer.tsx`)
- **Type:** Slide-over modal from right (or bottom sheet on mobile).
- **Z-Index:** `z-50` with high-opacity dimmed backdrop (`bg-slate-900/40 backdrop-blur-sm`).
- **Message Bubbles:**
  - **User:** Right-aligned, dark gradient background (`bg-slate-900 text-white`), rounded-2xl with bottom-right corner anchor.
  - **Assistant (Ved):** Left-aligned, white card with border (`bg-white text-slate-800 border border-slate-200 shadow-sm`), parsed with `react-markdown` for tables, lists, bold text, and code blocks.
  - **Badge:** Top pill indicating source (`AI Powered (Gemini 3.8 Flash)` or `Grounded Knowledge Base`).

### 4.3 Owner Mode Banner (`OwnerModeBanner.tsx`)
- **Visual Styling:** Distinctive purple/indigo theme (`bg-gradient-to-r from-violet-900 to-indigo-900 text-white`).
- **Actions:** Quick links to "Edit Profile", "Upload Photo", "Add Project", "Security Settings", and "Lock/Logout".
- **Conditional Visibility:** Strictly returns `null` when `isOwner === false` to ensure zero DOM visibility for normal visitors.

### 4.4 Modals (`HireMeModal.tsx`, `PdfExportModal.tsx`, `OwnerAuthModal.tsx`)
- **Backdrop:** Translucent blur layer (`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm`).
- **Transitions:** Scale from 95% to 100% with spring easing on mount; fade out on unmount.

---

## 5. Motion & Animation Standards (`motion/react`)

```typescript
// Standard View Transition Configuration
export const viewTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: 0.24,
    ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier ease-out
  },
};
```

- **Button Hover States:** Subtle scale `whileHover={{ scale: 1.02 }}` and active click compression `whileTap={{ scale: 0.98 }}`.
- **Micro-Delight:** Confetti burst on successful resume PDF download or newsletter signup via `canvas-confetti`.

---

## 6. Accessibility & Inclusivity Guidelines (A11y)
1. **Focus Rings:** Distinct keyboard outline states using `focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none`.
2. **ARIA Attributes:** All modals feature `role="dialog"`, `aria-modal="true"`, and `aria-label` tags.
3. **Contrast:** Minimum 4.5:1 text-to-background contrast ratio for standard copy; 3:1 for large display text.
4. **Screen Reader Text:** Visual-only icons feature `.sr-only` descriptive companion spans where appropriate.
