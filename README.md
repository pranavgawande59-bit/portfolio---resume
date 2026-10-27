# Pranav Gawande — Full-Stack Developer Portfolio

A high-performance full-stack web portfolio showcasing full-stack engineering, distributed systems, modern web architectures, and an interactive AI portfolio assistant. Built with **React 18**, **TypeScript**, **Tailwind CSS**, and an **Express.js** backend powered by the **Google GenAI SDK**.

---

## 1. System Architecture & Backend Logic

The application follows a full-stack architecture where backend services run via an Express server (`server.ts`) and the frontend client is served using Vite in development and static assets in production.

```
┌────────────────────────────────────────────────────────┐
│                   Frontend Client                      │
│       React 18 · TypeScript · Tailwind CSS             │
│   (Read-Only Public Views vs. Authenticated Owner)     │
└───────────────┬────────────────────────▲───────────────┘
                │                        │
       HTTP / JSON Calls         JSON Responses
                │                        │
┌───────────────▼────────────────────────┴───────────────┐
│              Full-Stack Express Server                 │
│                      (server.ts)                       │
│  - POST /api/chat (Resilient AI & Grounded Engine)    │
│  - POST /api/newsletter/subscribe (Updates & Email)    │
│  - Vite Dev Middleware / Production Static Servicing   │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
       Google Gemini API (`@google/genai`)
      (gemini-3.8-flash with multi-model fallback)
```

### Backend Endpoints (`server.ts`)

#### 1. `POST /api/chat`
* **Purpose**: Powers **Ved**, the official AI portfolio representative.
* **Model**: Uses `gemini-3.8-flash` as primary model with automated candidate fallback (`gemini-flash-latest`, `gemini-3.1-flash-lite`).
* **Multi-Model Fallback & High-Demand Handling**:
  - Automatically recovers from upstream `503 Service Unavailable` ("model is currently experiencing high demand") or `429` rate spikes.
  - If external AI services are unreachable or temporarily congested, the backend instantly falls back to a deterministic, grounded portfolio knowledge base (`getGroundedPortfolioReply()`).
  - Returns HTTP `200` with clean JSON (`{ reply: string, source: "ai" | "grounded-fallback" }`), ensuring visitors never see server crashes or error alerts.
* **Security**: The `GEMINI_API_KEY` is kept strictly server-side in `process.env.GEMINI_API_KEY` and is never exposed to the client or browser bundle.

#### 2. `POST /api/newsletter/subscribe`
* **Purpose**: Captures emails for research preprints, system design publications, and project releases.
* **Payload**:
  ```json
  {
    "name": "Visitor Name",
    "email": "user@example.com",
    "topics": ["open-source", "research", "system-design"],
    "timestamp": "2026-09-08T22:00:00.000Z"
  }
  ```
* **Validation & Deduplication**: Validates email format, normalizes to lowercase, de-duplicates subscribers in-memory, and returns `{ success: true, subscriberCount: N }`.

#### 3. Production Asset Serving & SPA Fallback
* In development (`NODE_ENV !== 'production'`), mounts Vite dev middleware (`createViteServer({ server: { middlewareMode: true }, appType: 'spa' })`).
* In production, serves optimized static assets from `dist/` with wildcard SPA routing (`app.get('*')` to `dist/index.html`).

---

## 2. Owner & Admin Credentials

The application provides an administrative mode that allows the portfolio owner to edit profile information, change headshots, and manage settings directly on the site.

| Parameter | Configuration / Value |
| :--- | :--- |
| **Authorized Owner Email** | `pranavgawande59@gmail.com` |
| **Default Initial Passcode** | `pranav2027` |
| **Session Key (Storage)** | `pranav_portfolio_owner_session` |
| **Passcode Key (Storage)** | `pranav_portfolio_passcode` |
| **Profile Overrides Key** | `pranav_portfolio_profile_custom` |

### How to Authenticate as Owner:
1. Scroll to the footer or open the navigation bar.
2. Click the small lock icon labeled **"Owner Access"**.
3. In the authentication modal, enter the passcode:
   ```
   pranav2027
   ```
4. Click **"Unlock Owner Mode"**.
5. Once authenticated, the **Owner Mode Active** banner appears at the top, unlocking live in-app profile editing, headshot replacement, and passcode management.

---

## 3. Strict Admin Privacy & Public User Isolation

> **Critical Security & Privacy Guarantee**: Regular visitors and public users **CANNOT** see admin details, credentials, or editing interfaces.

### How Public Users Are Restricted:
1. **Component-Level Conditional Rendering**:
   - The top banner (`OwnerModeBanner`) returns `null` immediately whenever `isOwner` is false:
     ```tsx
     if (!isOwner) return null;
     ```
   - Regular visitors see no administrative banners, toolbar buttons, edit badges, or control controls.
2. **Hidden Profile Edit Controls**:
   - In `AboutView`, `ResumeView`, and `Navbar`, all "Edit Profile", "Upload Photo", and "Settings" buttons are wrapped in `{isOwner && (...) }`.
   - Normal visitors only see clean, static presentation cards and cannot trigger editing state.
3. **No Passcode Exposure**:
   - Passcodes and authentication tokens are never rendered in public HTML or delivered in public API payloads.
   - Client-side state defaults strictly to `isOwner: false` until a user explicitly inputs the valid passcode.
4. **Session Isolation**:
   - Owner authentication is bound to `sessionStorage` / `localStorage` under a unique token (`authenticated_owner_pranavgawande59@gmail.com`).
   - Visitors on other machines or incognito sessions start as unauthenticated guests with zero edit rights.
5. **Lockout & Logout**:
   - Clicking **"Lock"** in the top banner instantly clears stored session keys, notifies all active components via custom DOM events, and restores read-only mode.

---

## 4. Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`):

```env
# GEMINI_API_KEY: Secret API key for Google GenAI services (kept strictly server-side)
GEMINI_API_KEY="your-gemini-api-key-here"

# APP_URL: The base URL where this applet is hosted
APP_URL="http://localhost:3000"
```

---

## 5. Available Scripts & Commands

```bash
# Start development server (boots Express server with Vite middleware on port 3000)
npm run dev

# Run TypeScript type check and linter
npm run lint

# Build full-stack application (client bundle + bundled CJS server for production)
npm run build

# Start production server
npm start
```

---

## 6. Technology Stack Summary

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend**: Node.js, Express, tsx, esbuild
- **AI / LLM Integration**: `@google/genai` (Gemini 3.8 Flash)
- **Deployment**: Production containerized deployment on port 3000
