# Pranav Gawande — AI Architect & Full-Stack Developer Portfolio

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Google GenAI](https://img.shields.io/badge/Gemini-3.8--Flash-4285F4?logo=google)](https://ai.google.dev)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)]()

A high-performance full-stack web portfolio and interactive digital resume showcasing software engineering rigor, distributed systems architectures, and an embedded conversational AI agent (**"Ved"**). Built with **React 18**, **TypeScript**, **Tailwind CSS**, and an **Express.js** backend powered by the **Google GenAI SDK** (`gemini-3.8-flash`) with resilient multi-model and deterministic grounded fallback engines.

---

## 📑 System Documentation Index

The repository includes a comprehensive, production-grade documentation suite:

| Document | Description |
| :--- | :--- |
| **[PRD.md](file:///d:/project/pranav-gawande---ai-architect-portfolio-&-resume/PRD.md)** | Product Requirements Document: Target personas, user stories, functional & non-functional requirements. |
| **[DESIGN.md](file:///d:/project/pranav-gawande---ai-architect-portfolio-&-resume/DESIGN.md)** | UI/UX & Design System: Color tokens, typography, motion curves, component specs, and responsive grid. |
| **[ARCHITECTURE.md](file:///d:/project/pranav-gawande---ai-architect-portfolio-&-resume/ARCHITECTURE.md)** | Full-Stack Architecture: C4 diagrams, Vite dev middleware vs production, event-driven state sync pipeline. |
| **[DATABASE.md](file:///d:/project/pranav-gawande---ai-architect-portfolio-&-resume/DATABASE.md)** | Data Architecture: Schemas (`UserProfile`, `ProjectItem`, etc.), storage map, and cache lifecycle. |
| **[API.md](file:///d:/project/pranav-gawande---ai-architect-portfolio-&-resume/API.md)** | REST API Reference: Specifications for `POST /api/chat`, `POST /api/newsletter/subscribe`, and static routes. |
| **[AGENTS.md](file:///d:/project/pranav-gawande---ai-architect-portfolio-&-resume/AGENTS.md)** | AI Agent Blueprint: "Ved" persona, system instruction, multi-model cascade, and grounded fallback engine. |

---

## 1. Key Features

- 🤖 **Interactive AI Assistant ("Ved"):** Built-in chat drawer ready to answer technical queries, education, certifications, and career questions.
- ⚡ **Zero-Downtime Multi-Model Resilience:** Automatically waterfalls from `gemini-3.8-flash` to `gemini-3.1-flash-lite`, and falls back to a deterministic grounded knowledge engine during 503 high-demand spikes.
- 🏆 **Verified Certifications & Credentials:** Highlighted credentials (Meta Full-Stack, Python PCAP, AWS Cloud Foundations, Java SE) with verifiable credential IDs and direct verification links.
- 💼 **Active Career & Opportunities Center:** Clean opportunity status card highlighting core competencies and facilitating direct recruiter outreach with zero artificial filler data.
- 📄 **ATS-Friendly Resume & PDF Export:** Configurable sections, skill breakdowns, and one-click PDF generation.
- 🚀 **Projects Hub with Dynamic Nodes:** Categorized software projects with architecture highlights, source snippets, and live demo links.
- 🔒 **Owner Mode & Admin Isolation:** Fully separated administrative layer allowing the portfolio owner to update profiles, headshots, and projects directly with zero exposure to public visitors.
- 📬 **Research & Newsletter Subscription:** Captures subscriber emails for distributed systems preprints and project updates with duplicate protection.
- 🎨 **Minimalist Design & Motion:** Fluid view transitions via `motion/react`, responsive mobile navigation, and modern typography.

---

## 2. System Architecture

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
│  - POST /api/chat (Resilient AI & Grounded Engine)     │
│  - POST /api/newsletter/subscribe (Updates & Email)    │
│  - Vite Dev Middleware / Production Static Servicing   │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
       Google Gemini API (`@google/genai`)
      (gemini-3.8-flash with multi-model fallback)
```

---

## 3. Quick Start & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/pranavgawande/portfolio.git
cd pranav-gawande---ai-architect-portfolio-&-resume

# Install dependencies
npm install
```

### Environment Configuration
Copy `.env.example` to `.env` and provide your Google Gemini API key:
```env
# Google GenAI API Key (Kept strictly on the backend server)
GEMINI_API_KEY="your-gemini-api-key-here"

# Application URL
APP_URL="http://localhost:3000"
```
*(Note: If `GEMINI_API_KEY` is not provided, the server seamlessly runs using the deterministic grounded knowledge base without errors!)*

### Running the Application
```bash
# Start Development Server (Express + Vite Middleware on Port 3000)
npm run dev

# Or run via Windows batch shortcut
.\run.bat
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 4. Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts Express server with hot-reloading Vite middleware on port 3000 |
| **Lint / Typecheck** | `npm run lint` | Runs `tsc --noEmit` across all TypeScript files |
| **Production Build** | `npm run build` | Bundles client with Vite and server with esbuild into `dist/` |
| **Production Start** | `npm start` | Launches compiled production server (`dist/server.cjs`) |
| **Clean** | `npm run clean` | Deletes build artifacts in `dist/` |

---

## 5. Owner Mode & Admin Authentication

The platform allows Pranav Gawande to edit live profile information and add project nodes:

| Parameter | Configuration / Value |
| :--- | :--- |
| **Authorized Owner Email** | `pranavgawande59@gmail.com` |
| **Default Initial Passcode** | `pranav2027` |
| **Session Key (Storage)** | `pranav_portfolio_owner_session` |
| **Passcode Key (Storage)** | `pranav_portfolio_passcode` |
| **Profile Overrides Key** | `pranav_portfolio_profile_custom` |

### How to Authenticate:
1. Scroll to the footer or open the navbar.
2. Click the lock icon labeled **"Owner Access"**.
3. Enter the passcode: `pranav2027`.
4. Click **"Unlock Owner Mode"**.
5. Once unlocked, the **Owner Mode Active** banner appears at the top, enabling live in-app profile edits, headshot changes, and project creation.
6. Public visitors can never see edit controls or admin components.

---

## 6. Testing & Quality Assurance

```bash
# Run TypeScript compilation check
npm run lint

# Build full-stack application for production verification
npm run build
```

---

## 7. License

MIT License © 2026 Pranav Gawande. All rights reserved.
