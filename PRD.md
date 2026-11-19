# Product Requirements Document (PRD)
## Pranav Gawande — AI Architect & Full-Stack Developer Portfolio

**Document Version:** 1.0.0  
**Status:** Approved / Active  
**Author:** Pranav Gawande Engineering  
**Target Release:** Production 2026 / 2027  

---

## 1. Executive Summary & Vision

### 1.1 Product Vision
To build an industry-leading, interactive, high-performance portfolio and digital resume for Pranav Gawande—combining modern full-stack web engineering with intelligent conversational AI capabilities. The platform serves as an interactive showcase of software engineering rigor, distributed systems architecture, research preprints, and practical full-stack projects, while providing an embedded AI agent ("Ved") capable of answering technical and recruitment queries 24/7 with zero downtime.

### 1.2 Target Audience & Personas
1. **Technical Recruiters & Engineering Hiring Managers:**
   - *Needs:* Rapid qualification of core competencies (React 18, Node.js, Python, Java, SQL, Cloud), academic credentials, project metrics, and downloadable ATS-friendly resume.
   - *Behavior:* Scans profile within 60 seconds; uses quick search or asks targeted questions to the AI assistant.
2. **Staff / Principal Engineers & System Architects:**
   - *Needs:* Evaluation of architectural depth, microservices design patterns, system scalability, and code cleanliness.
   - *Behavior:* Inspects system architecture diagrams, project tech stacks, repository structures, and research publications.
3. **Academic Peers & Research Collaborators:**
   - *Needs:* Access to research papers, distributed systems preprints, academic rankings, and thesis topics.
   - *Behavior:* Reads abstracts, copies BibTeX citations, and subscribes to research updates.
4. **Portfolio Owner (Pranav Gawande):**
   - *Needs:* Private administrative access to modify profile data, project details, avatar headshots, and security credentials without manual redeployment.

---

## 2. Problem Statement & Opportunities

| Problem | Opportunity & Solution in Platform |
| :--- | :--- |
| **Static, boring PDF resumes** fail to demonstrate interactive engineering depth or dynamic capabilities. | Provide a live, reactive web application featuring dynamic tab navigation, interactive skill metrics, and on-the-fly PDF customization. |
| **Recruiters lack time** to read through multi-page repositories and documents. | An AI representative ("Ved") instantly answers specific recruiter queries with grounded, verified facts and zero hallucinations. |
| **AI downtime or rate limits** (such as Gemini 503 high-demand errors) can break traditional AI portfolios. | Implement a resilient multi-model cascade with automated fallback to a deterministic grounded knowledge engine. |
| **Public portfolios exposing admin portals** present major security and privacy vulnerabilities. | Complete separation of public guest views from owner mode via client-side session tokens, zero admin leakage in DOM, and encrypted localStorage persistence. |

---

## 3. Scope of Requirements

### 3.1 Functional Requirements (FR)

- **FR-1: Navigation & Views:**
  - Support multi-tab navigation: `Home`, `About`, `Projects`, `Research`, `Resume`, `Contact`.
  - Maintain smooth animated tab transitions via Framer Motion / Motion v12.
  - Floating fast-action controls: AI Chat Drawer launcher, Scroll-to-Top button.

- **FR-2: Conversational AI Representative ("Ved"):**
  - Persistent interactive drawer available across all pages.
  - Quick-prompt suggestion pills on Home (`"What are Pranav's core skills?"`, `"Tell me about his education"`, `"Why hire Pranav?"`).
  - Streaming/asynchronous chat interface with markdown parsing, code blocks, and source attribution badges (`source: "ai"` vs `source: "grounded-fallback"`).
  - Robust conversation history tracking (last 6 contextual dialogue turns).

- **FR-3: Project Showcase & Node Management:**
  - Filtering by category: `All`, `Full-Stack`, `Frontend`, `Backend & APIs`, `Cloud Architecture`.
  - Project Cards displaying metrics, architecture highlights, tech badges, live demo, and GitHub repository links.
  - Interactive project detail modal with architecture deep dives and source snippets.
  - Dynamic "Add Project" capability for authorized owners with local persistence.

- **FR-4: Interactive Resume & PDF Generation:**
  - Visual breakdown of Experience, Education, Technical Skills, and Certifications.
  - Modal-driven ATS-friendly PDF export engine with customizable sections (toggle contact, skills, experience, education).

- **FR-5: Research & Publications Hub:**
  - Display academic preprints, thesis topics (Distributed Systems & Cloud Computing), conference submissions, and key findings.
  - One-click BibTeX citation copying and paper links.

- **FR-6: Contact & Newsletter Subscription:**
  - Direct contact inquiry modal ("Hire Me") with email intent triggers (`mailto:pranavgawande59@gmail.com`).
  - Newsletter subscription endpoint (`POST /api/newsletter/subscribe`) with client-side feedback and duplicate protection.

- **FR-7: Owner Administration Mode:**
  - Discrete entry point in the footer ("Owner Access") protected by owner passcode (`pranav2027` default).
  - Ability to modify profile bio, title, tagline, social links, and avatar image URL.
  - Ability to add, edit, or purge custom projects.
  - Persistent passcode management with instant cross-tab state synchronization via custom DOM events.
  - Zero UI footprint for unauthorized public visitors.

### 3.2 Non-Functional Requirements (NFR)

- **NFR-1: Performance & Latency:**
  - First Contentful Paint (FCP) < 1.0s on broadband connections.
  - AI Chat endpoint response time < 1.5s on external API; < 50ms on grounded fallback.
  - Production build bundle size < 300KB (gzipped).

- **NFR-2: Reliability & Availability:**
  - 99.9% uptime for core portfolio web server.
  - 100% availability for the chat interface via deterministic fallback when Gemini API encounters high demand (HTTP 503) or rate limits (HTTP 429).

- **NFR-3: Security & Privacy:**
  - API keys (`GEMINI_API_KEY`) must remain strictly server-side and never leak into client bundles.
  - Owner mode controls must never render in public DOM trees.
  - In-memory subscriber registry must sanitize email payloads to prevent injection attacks.

- **NFR-4: Responsiveness & Accessibility:**
  - Fully responsive across Mobile (320px+), Tablet (768px+), Laptop (1024px+), and Desktop (1440px+).
  - WCAG 2.1 AA compliant color contrast ratios and keyboard navigation support.

---

## 4. User Stories & Acceptance Criteria

### US-1: Recruiter Asking About Skills via AI
- **As a** technical recruiter,
- **I want to** click a single button to ask Ved about Pranav's technical qualifications,
- **So that** I can rapidly confirm if he matches our job description.
- **Acceptance Criteria:**
  - Clicking any prompt chip on the Home view opens the chat drawer and immediately sends the query.
  - The AI assistant replies within 2 seconds with formatted markdown detailing Python, Java, React 18, Node.js, SQL, Docker, and AWS skills.
  - The reply includes clear recommendations for contact and interview scheduling.

### US-2: Owner Updating Portfolio Avatar & Profile
- **As the** portfolio owner (Pranav Gawande),
- **I want to** authenticate on the live site and replace my avatar or bio,
- **So that** my portfolio remains current without triggering a redeployment.
- **Acceptance Criteria:**
  - Entering the correct passcode unlocks owner mode and renders the top management banner.
  - Profile edits save to `localStorage` and trigger instant component re-renders.
  - Logging out immediately resets the view to public presentation mode.

---

## 5. Success Metrics & KPIs

| Metric | Target Goal | Measurement Method |
| :--- | :--- | :--- |
| **AI Chat Satisfaction / Availability** | 100% response success rate | Ratio of valid responses (AI + Grounded) vs total chat requests |
| **Bounce Rate** | < 30% | Analytics session duration > 90 seconds |
| **Contact / Inquire Conversion** | > 8% of unique visitors | Clicks on Hire Me modal & email mailto triggers |
| **Lighthouse Score** | > 95 Performance, > 95 Accessibility | Google Chrome Lighthouse audit |
