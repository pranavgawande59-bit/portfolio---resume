# System Architecture Document (ARCHITECTURE.md)
## Pranav Gawande — AI Architect & Full-Stack Developer Portfolio

**Document Version:** 1.0.0  
**Last Updated:** 2026  
**Architect:** Pranav Gawande  

---

## 1. High-Level Architectural Overview

The application is structured as a modern, reactive full-stack web application combining a **React 18 Single-Page Application (SPA)** frontend with an **Express.js** backend microservice. The system is designed to seamlessly run both in high-velocity local development mode (via Vite dev middleware) and as an optimized standalone production service.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER (Browser)                                │
│                                                                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                         React 18 SPA (TypeScript + Tailwind)                   │   │
│   │                                                                                │   │
│   │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌────────────────────┐  │   │
│   │  │  Home / Hero  │ │  About / Bio  │ │  Projects Hub │ │ Research / Preprints│  │   │
│   │  └───────────────┘ └───────────────┘ └───────────────┘ └────────────────────┘  │   │
│   │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌────────────────────┐  │   │
│   │  │  Resume / PDF │ │  Contact View │ │ AI Chat Drawer│ │ Owner Admin Modal  │  │   │
│   │  └───────────────┘ └───────────────┘ └───────────────┘ └────────────────────┘  │   │
│   │                                                                                │   │
│   │  State Stores:                                                                 │   │
│   │  - `useOwnerAuth()` Hook                                                       │   │
│   │  - `localStorage` (Profile overrides, Custom Projects, Passcode)               │   │
│   │  - `sessionStorage` (Authenticated Owner Session)                              │   │
│   │  - Custom DOM Event Pipeline (`pranav_owner_state_changed`)                     │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │
                         HTTP REST API   │   Static Assets
                         & JSON Payloads │   (HTML / JS / CSS)
                                         ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   SERVER LAYER (Node.js)                               │
│                                                                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                             Express 4 (server.ts)                              │   │
│   │                                                                                │   │
│   │  ┌─────────────────────────┐  ┌─────────────────────────┐                      │   │
│   │  │ POST /api/chat          │  │ POST /api/newsletter/   │                      │   │
│   │  │ (AI Assistant Service)  │  │ subscribe               │                      │   │
│   │  └────────────┬────────────┘  └────────────┬────────────┘                      │   │
│   │               │                            │                                   │   │
│   │               │                            ▼                                   │   │
│   │               │                 ┌─────────────────────┐                        │   │
│   │               │                 │ In-Memory Registry  │                        │   │
│   │               │                 │ (Email Deduplication│                        │   │
│   │               │                 └─────────────────────┘                        │   │
│   │               ▼                                                                │   │
│   │  ┌────────────────────────────────────────────────┐                            │   │
│   │  │       Resilient AI Orchestrator                │                            │   │
│   │  │                                                │                            │   │
│   │  │   1. Attempt Gemini 3.8 Flash                  │                            │   │
│   │  │   2. Fallback to Gemini 3.1 Flash-Lite         │                            │   │
│   │  │   3. Fallback to Gemini Flash-Latest           │                            │   │
│   │  │   4. Catch 503 / 429 / Auth Failures           │                            │   │
│   │  │   5. Auto Switch to Grounded Knowledge Engine  │                            │   │
│   │  └──────────────────┬─────────────────────────────┘                            │   │
│   │                     │                                                          │   │
│   │       Vite Middleware (Dev Mode) / Static Serve from dist/ (Prod Mode)         │   │
│   └─────────────────────┼──────────────────────────────────────────────────────────┘   │
└─────────────────────────┼──────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                EXTERNAL SERVICES LAYER                                 │
│                                                                                        │
│   ┌───────────────────────────────────┐    ┌──────────────────────────────────────┐    │
│   │   Google Gemini API Gateway       │    │     Local Browser Storage            │    │
│   │   (@google/genai SDK)             │    │     - localStorage / sessionStorage  │    │
│   │   Endpoint: generativelanguage    │    │     - Client-side data persistence   │    │
│   └───────────────────────────────────┘    └──────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture (React 18 SPA)

### 2.1 Component Hierarchy & Tree Structure

```
App.tsx (Root Provider & View Orchestrator)
 ├── OwnerModeBanner.tsx (Conditional - only when isOwner === true)
 ├── Navbar.tsx (Fixed header, active tab state, quick CTAs)
 │    ├── BrandLogo.tsx (Interactive monogram & status indicator)
 │    └── NavLinks (Tab switching with animated pill highlight)
 ├── <main> View Container (Animated by motion/react AnimatePresence)
 │    ├── AiHomeView.tsx (Hero, rapid prompt cards, quick stats)
 │    ├── AboutView.tsx (Bio, technical skills grid, education, reviews)
 │    │    └── ReviewsSection.tsx (Social proof & recommendations)
 │    ├── ProjectsView.tsx (Category filtering, project cards, add project button)
 │    ├── ResearchView.tsx (Academic preprints, thesis topics, BibTeX citations)
 │    ├── ResumeView.tsx (Interactive timeline, skill bars, PDF export trigger)
 │    └── ContactView.tsx (Direct contact cards, location, social presence)
 ├── Footer.tsx (Copyright, discreet Owner Access lock trigger, social links)
 ├── AiChatDrawer.tsx (Slide-over conversational agent powered by /api/chat)
 ├── PdfExportModal.tsx (Customizable client-side resume PDF generator)
 ├── HireMeModal.tsx (Structured inquiry intent modal with direct mailto)
 ├── OwnerAuthModal.tsx (Admin passcode login, profile editor, security controls)
 └── ScrollToTop.tsx (Floating view elevation trigger)
```

### 2.2 Client-Side State Management & Reactive Event Pipeline

Rather than introducing heavy external state management libraries (e.g. Redux or Zustand) for a personal portfolio, the application utilizes a lightweight, high-performance custom hook: `useOwnerAuth()`.

- **Event Pipeline:** Components broadcast state changes across the DOM using `window.dispatchEvent(new Event('pranav_owner_state_changed'))`.
- **Cross-Tab Synchronization:** All browser tabs listening to the native `storage` event automatically synchronize when profile data, passcode, or projects are modified in another tab.
- **Fail-Safe Fallbacks:** When localStorage is empty or cleared, values gracefully revert to immutable static constants defined in `src/data/portfolioData.ts`.

---

## 3. Backend Architecture (Express.js)

### 3.1 Dual Runtime Architecture: Dev vs. Production

```typescript
// server.ts execution model
if (process.env.NODE_ENV !== 'production') {
  // Development: Mount Vite server as Express middleware for HMR
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // Production: Serve pre-compiled static assets from dist/
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}
```

### 3.2 Dual Pipeline Routing
1. **API Subsystem (`/api/*`):** Handles structured JSON requests for AI inference and newsletter signups.
2. **SPA Asset Subsystem:** Serves HTML/JS/CSS, intercepts all client routes (`*`), and serves `index.html` to allow client-side tab state and history navigation.

---

## 4. Resilient AI Pipeline Architecture

### 4.1 Multi-Model Cascade Pattern
External LLM APIs can occasionally encounter rate limits (`429`) or upstream compute spikes (`503 Service Unavailable`). The backend implements a robust waterfall retry strategy:

```
[Incoming User Query]
         │
         ▼
[Model 1: gemini-3.8-flash] ──(Success)──► [Return AI Reply (source: "ai")]
         │ (Fails / 503 / 429)
         ▼
[Retry Model 1 once with 500ms backoff] ──(Success)──► [Return AI Reply]
         │ (Fails)
         ▼
[Model 2: gemini-3.1-flash-lite] ──(Success)──► [Return AI Reply]
         │ (Fails)
         ▼
[Model 3: gemini-flash-latest] ──(Success)──► [Return AI Reply]
         │ (Fails / All Exhausted)
         ▼
[Grounded Knowledge Engine] ───────────────► [Return Grounded Reply (source: "grounded-fallback")]
```

### 4.2 Zero-Error User Guarantee
The client **never** receives an unhandled 500 or 503 error from the chat endpoint. If external AI connectivity fails completely or no `GEMINI_API_KEY` is configured, the request gracefully resolves to verified grounded portfolio facts generated in milliseconds.

---

## 5. Security & Isolation Architecture

1. **Server-Side API Key Confinement:** The `GEMINI_API_KEY` is loaded via `dotenv` into server memory and is never passed in client-facing HTML or bundles.
2. **Owner Session Token Isolation:** Tokens follow the format `authenticated_owner_${OWNER_EMAIL}` and are verified before unlocking admin functionality.
3. **Public DOM Sanitization:** Administrative modals and banners are completely unmounted (not just hidden with CSS) when unauthenticated, preventing inspection through browser developer tools.
4. **Input Sanitization:** Chat queries and email inputs are trimmed, length-bounded, and validated against malformed inputs.
