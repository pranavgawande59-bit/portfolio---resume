# Pranav Gawande AI Portfolio: Full UI/UX Specification

*A complete description of the existing product, written so a UI-generation AI can rebuild or redesign every screen, component and interaction.*

## How to use this document

Paste the whole document into your UI maker AI (v0, Lovable, Bolt, Figma AI, Galileo, etc.) and add one line such as: *"Redesign this product with a modern, premium look. Keep all functionality, content structure and behaviour exactly as described, but you may change the visual style, layout and animations."* Sections 1 to 3 give context and design language, Section 4 is the screen-by-screen spec, Section 5 covers global overlays, and Sections 6 to 9 cover data, behaviour and redesign opportunities.

## 1. Product overview

**What it is:** A single-page personal portfolio and resume website for **Pranav Gawande**, a Full-Stack Developer from Pune, Maharashtra, India (Master in Computer Science student at G.H Raisoni international skill tech university, Pune, graduating 2027). Its signature idea is an **AI-first homepage**: instead of a classic hero, the visitor sees a big "Ask me anything" search bar that opens a chat with **Ved**, an AI assistant that answers questions about Pranav.

**Audience:** Recruiters, hiring managers, clients, collaborators and researchers.

**Primary goals:** (1) Let visitors learn about Pranav instantly by asking questions. (2) Present skills, experience, education, projects and research. (3) Convert visitors into contacts, hire inquiries or newsletter subscribers. (4) Let the owner edit profile details and photo directly on the live site, hidden from the public.

**Tech (for context only):** React + TypeScript + Tailwind CSS + Lucide icons + react-markdown, an Express server with a Gemini-powered chat endpoint. The site is a single page with tab-style navigation and **no URL routing**.

## 2. Design language (current)

The UI maker may restyle all of this, but this is what exists today.

- **Theme:** Light only. White page background, crisp slate text, sky-blue accent. Dark mode has been deliberately removed.
- **Colors:** Primary blue `#0284c7`, hover blue `#0369a1`, tint backgrounds `#e0f2fe` and `#f0f9ff`, tint border `#bae6fd`, accent sky `#38bdf8`. Text `#0f172a` (headings), `#334155` / `#475569` (body), `#64748b` (muted), `#94a3b8` (placeholder). Surface `#f8fafc`, borders gray-100 to gray-200. Semantic: emerald for success, "available" and "Expert"; amber for "Featured" and stars; rose for errors and logout.
- **Typography:** Plus Jakarta Sans (weights 300 to 800) for UI, JetBrains Mono for numbers, tags and code-like labels. Small uppercase tracking-wide labels are used for badges and section eyebrows.
- **Shape and depth:** Very rounded: cards `rounded-2xl` / `rounded-3xl`, buttons and pills fully rounded, icon tiles `rounded-xl`. Soft, minimal shadows; hover raises shadow and changes border to sky blue.
- **Recurring patterns:** Eyebrow pill badge + large bold title + muted paragraph at the top of every page; segmented-control tab switchers (gray-100 track, white active chip); filter pills; progress bars; pulsing green or blue "live" dots; dashed-border empty states; modal overlays with slate blur backdrop; icon-in-tinted-square headings.
- **Layout widths:** Content containers max-w-5xl to max-w-7xl, centered, with 16 to 24px side padding. Fixed top navbar (64px) and a page body offset by it.
- **Motion:** Subtle only: fade-in and scale-in on modals, hover scale on icons and cards, ping or pulse on status dots, bouncing dots in chat loader, smooth scroll, fade-in or slide-up on the scroll-to-top button.
- **Logo:** A dark rounded square containing an isometric hexagon prism, a white stem plus cyan curved loop forming the letter **P**, a small ">" terminal arrow and an orbiting spark dot, with a cyan glow on hover. Next to it: "Pranav Gawande" (bold) and a mono uppercase "FULL-STACK DEVELOPER" with a pulsing blue dot.

## 3. Global structure and navigation

**App shell, top to bottom:**

1. Owner Mode Banner (only visible to the unlocked owner).
2. Fixed Navbar.
3. Main content area showing exactly one of six views.
4. Footer.
5. Floating and overlay layers: AI Chat modal, PDF Preview modal, Hire Me modal, Owner Auth modal, Scroll-to-top button.

**Six views (tabs):** Home, About, Projects, Research, Resume, Contact. Switching a tab swaps the content, closes mobile menus and scrolls to top. There is no router, so deep links and the browser back button do not work today (an opportunity, see Section 9).

**Cross-view links:** Home pills and cards open the AI chat with a pre-filled question. The chat footer has shortcut links to About, Projects, Research, Resume and Contact. About's "Request References" opens the Hire Me modal. Resume's "Download PDF" opens the PDF modal. Owner lock icons open the Owner modal.

## 4. Screens in detail

### 4.1 Navbar (global, fixed top, 64px, white 90% opacity with backdrop blur and bottom border)

- **Left:** Brand logo (full emblem + name + role). Clicking returns to Home.
- **Center (desktop only):** Text links: About, Projects, Research, Resume, Contact. Active link is dark and semibold; inactive are muted gray and darken on hover. (Home has no link; the logo is Home.)
- **Right:**
  - **"Chat with Ved ✨"** pill button (bordered, turns sky-tinted on hover) that opens the AI chat.
  - **Owner access button:** a small gray lock icon for visitors; for the unlocked owner it becomes a green shield with the word "Owner" (word hidden on small screens). Opens the Owner modal.
  - **Hamburger / close icon** (mobile only).
- **Mobile drawer:** Slides below the bar. Contains Home plus all five links as full-width rows (active row has blue tint), then a solid blue full-width "Chat with Ved" button, then an outlined Owner Login / Owner Dashboard button.

### 4.2 Home (AI landing)

Centered single column, max-w-5xl, generous vertical padding.

1. **Badge:** Sky pill with sparkle icon, text "AI PORTFOLIO".
2. **Headline:** "Hi, I'm Pranav Gawande" (4xl to 6xl bold, centered).
3. **Subtitle:** "Ask me anything about my work, skills, projects, education, or experience."
4. **Hero search bar (centerpiece):** Large pill-shaped input (max-w-2xl) with a search icon on the left, placeholder "Ask me anything...", and a round blue arrow submit button on the right (disabled and faded when empty). A soft cyan radial glow sits behind it and intensifies on hover. Focus state: blue border with a soft blue ring. Submitting opens the Chat modal with that text as the first message, then clears the input.
5. **"Try asking:" row:** Four pill chips, each with a blue icon: **My skills**, **My projects**, **My experience**, **Why should I hire him?** Click opens chat with a prepared question.
6. **Status line:** Pulsing green dot + "AI is based on my portfolio".
7. **"You can ask me about ✨" section:** Heading, then a 4-column grid (2 on tablet, 1 on mobile) of tall clickable cards, each with a round tinted icon and a question: "What are his strongest skills?" (code icon), "What systems has he built?" (folder icon), "What is his full-stack experience?" (CPU icon), "Share his education details." (graduation cap icon). Hover: border turns sky, shadow appears, icon scales up, title turns blue. Click opens chat with a longer prepared query.
8. **Project & Research Updates form** (see 4.9) placed at the bottom with large top margin.

### 4.3 About

Vertical stack of sections, max-w-5xl.

1. **Bio card:** Rounded-2xl card with a square-rounded avatar (96 to 112px, blue ring), name (h1), role pill (e.g. "FULL-STACK DEVELOPER"), bio paragraph, then location (pin icon) and email (mail icon). *Owner only:* an "Edit Details" pill that opens the Owner modal. The avatar is the custom uploaded photo if the owner set one, otherwise a default image.
2. **Technical Skills & Proficiency** (the richest interactive block):
   - Header with code icon, title, helper sentence, and a **view-mode toggle** (segmented control): "Progress Bars" or "Badge Grid".
   - **Category filter pills:** All Skills, Languages, Frameworks, Cloud & DevOps, each with a count chip. Active "All" is dark; active categories are blue.
   - **Progress Bars view:** 2-column grid of cards. Each card: a category icon tile, skill name, "X+ yrs experience", a colored **level badge** (Expert = green, Advanced = sky, Proficient = indigo) with dot, mono percentage, a full-width gradient progress bar (animates width), and a line "Specialization: …".
   - **Badge Grid view:** 3-column grid of compact cards with icon, name, level badge, highlight text, and a footer row with years and "NN% Proficiency".
   - **Skills shown:** Python 95% Expert 4+ yrs; Java 90% Expert 3+; JavaScript 92% Expert 4+; SQL 89% Advanced 3+; React 18 94% Expert 3+; Node.js 91% Expert 3+; Docker 88% Advanced 3; AWS Cloud 86% Advanced 3. Each has a one-line specialization description.
3. **Core Domain Stacks:** Three cards in a row, each with an uppercase blue title and a wrap of gray tag chips: **Core Stack** (Python, Java, JavaScript, React 18, Node.js, SQL, Docker, AWS Cloud), **Languages & Frameworks** (Python, Java, JavaScript, React 18, Node.js, SQL), **Cloud & Infrastructure** (Docker, AWS Cloud, SQL Database Systems).
4. **Experience + Education:** Two cards side by side (stacked on mobile), each with an icon heading and divider. Entries show title, blue subtitle (company or institution), a period pill, and bullets (education also has a description). Experience: *Full-Stack Developer, Tech Solutions Inc., 2022 to Present* and *Web Developer & Open-Source Contributor, Independent Projects, 2021 to 2022*. Education: *Bachelor in Computer Science, Sant Gadge Baba Amravati University, Amravati, 2023 to 2025* and *Master in Computer Science, G.H Raisoni international skill tech university, Pune, Graduating 2027*.
5. **Client & Collaborator Endorsements (Reviews):** see 4.8.
6. **Verified Certifications** grid (4-up): shown only if certificates exist; currently the list is empty so the section is hidden. Card: date chip, title, issuer, up to 3 skill tags.

### 4.4 Projects

max-w-6xl page.

- **Header (centered):** Pill "Engineered Systems", H1 "Architected & Ongoing Projects", subtitle about production-grade apps, UIs, microservices and cloud.
- **Filters row:** (a) **Status segmented control:** "All Projects (n)", "Ongoing Projects (n)" with a pinging blue dot, "Shipped / Production (n)" with a green check. (b) **Category pills:** All, Full-Stack, Frontend, Backend & APIs, Cloud Architecture. Both filters combine.
- **Project grid:** 2 columns, large gap. **Project card** contains: category badge; status badge ("In Active Dev" with ping dot, or green "Shipped"); optional amber "Featured" badge (completed only); title with a top-right arrow icon that nudges on hover; blue tagline; for ongoing projects a highlighted **progress panel** ("Development Progress", percent, bar, "Target release: …"); description; a **key-metric box** with an icon; a "Core Architecture" bullet list; and a footer with tech-stack chips on the left and GitHub and Live Demo icon links on the right. Ongoing cards have a thicker sky border and a corner gradient accent.
- **Empty state (currently what visitors see, as no projects are added yet):** Dashed card, layers icon, "No Projects Listed", and a sentence saying case studies will appear once published.
- **Data shape for a project:** id, title, category, tagline, description, metrics, techStack\[\], demoUrl?, githubUrl?, architectureHighlights\[\], featured?, status (completed / in-progress / research), progressPercentage?, expectedCompletion?.

### 4.5 Research

max-w-6xl page, same structure as Projects.

- **Header:** Pill "Publications & Active Research", H1 "Research & Technical Papers", subtitle.
- **Status segmented control:** All Works, Ongoing Research (pinging dot), Peer-Reviewed & Published. On the right: "Active focus: Distributed Systems & Cloud Infrastructure" with a flask icon.
- **Paper cards (stacked, full width):** top bar with venue (file icon), a status badge (In Progress = blue, Under Peer Review = amber with clock, Published = green) and a year pill; large title; optional "Affiliation: …" collaborators line; for ongoing papers a **stage and progress panel** (current stage, % complete, bar, timeline); an **Abstract** (or "Research Overview & Hypothesis" if ongoing) box with a quote icon; **Key findings** as a 3-column grid of small cards with sparkle icons; and a footer with #tag chips, a **"Copy BibTeX"** button (switches to a green "BibTeX Copied!" for about 2.5s) and a blue **mailto button** ("Request Preprint PDF" for published, "Inquire / Collaborate" for ongoing, subject pre-filled).
- **Empty state:** Dashed card, book icon, "No Research Papers Listed".
- **Data shape:** id, title, conferenceOrVenue, year, abstract, keyFindings\[\], tags\[\], doiOrUrl?, bibtex?, status, stage?, progressPercentage?, expectedVenueOrDate?, collaborators\[\]?.

### 4.6 Resume

Two-column layout on desktop (sidebar + content), stacked on mobile; max-w-7xl.

**Left sticky sidebar profile card (w-72 to w-80, rounded-3xl):**

- Round avatar (112px) with a blue ring and a small **green availability dot** (tooltip "Available for Full-Stack & Engineering Roles"). Name (h1) and uppercase blue title.
- *Owner only:* hover on the avatar shows a dark overlay with a camera and "Update Photo"; links "Change Photo" and "Edit Details"; drag-and-drop an image onto the avatar to replace it. For visitors, clicking the avatar opens the owner login. After success a green "Photo updated!" chip appears briefly.
- **Quick-jump menu:** Experience, Education, Skills, and Certificates (only if any exist). Each has an icon; active item has blue tint. Clicking smooth-scrolls to the section (offset for the fixed navbar) and highlights it.
- **"Download PDF Resume"** full-width blue button, which opens the PDF modal.

**Right content column:**

1. **Intro:** Optional large tagline (only shown if the owner has set one) and the bio paragraph.
2. **Experience section** (icon tile + H3 + divider): job cards with role, building icon + company, a calendar period pill, chevron-bullet list, and a footer row of technology chips. Cards raise and turn sky-bordered on hover.
3. **Education section:** cards with degree, blue institution, period pill, description, and a row of sky pill "highlights" with sparkle icons (e.g. "Distributed Systems & Cloud Computing Specialization", "Department Rank Top 5%").
4. **Skills & Technologies:** 2-column grid of group cards with uppercase blue titles and gray skill chips that turn blue on hover.
5. **Certificates & Credentials** (hidden while empty): cards with title, date pill, issuer, skill tags, mono credential ID and a "Verify ↗" link.

**Photo Update modal (owner only):** Title "Update Resume Photo", current avatar preview with a "Custom" badge if replaced, a dashed **drag-and-drop zone** ("Click to browse or drag & drop image here", PNG/JPG/WebP), error text in rose, "Reset to Default" (only if custom) and "Done". Images are resized to max 512px and stored locally in the browser.

### 4.7 Contact

max-w-7xl, 12-column grid on desktop (5 + 7).

- **Header:** pill "Get in Touch" with message icon, H2 "Let's Connect", paragraph about discussing engineering, architecture, open source and careers.
- **Left column:**
  - **Availability card:** pinging green dot + "Current Status: Open to Opportunities", heading "Ready for New Challenges", short text about openness to Full-Stack and backend roles.
  - **Contact details panel:** three rows with icon tiles: **Direct Email** (mailto link, hover border blue), **Location** (Pune, Maharashtra, India), **Timezone** (IST, UTC+05:30, Remote Friendly).
  - **Developer Ecosystem card:** three equal buttons for GitHub, LinkedIn, Twitter (open in new tab).
- **Right column: "Direct Message" form card** with: Name\*, Email\*, an **Inquiry Nature** dropdown (Technical Consulting & Development, Full-Time Full-Stack Role, System Architecture, Collaboration & Mentorship), Message\* textarea (5 rows), and a full-width pill "Send Message" button. Submitting shows "Sending Message..." for about 0.8s, then a **success state**: green check circle, "Message Sent!", thank-you text and a "Send Another Message" button. (Today this is a front-end simulation: nothing is actually sent.)

### 4.8 Reviews / Endorsements (inside About)

- **Header row:** quote icon + "Client & Collaborator Endorsements" + subtitle. On the right a **rating chip** ("5.0 Rating (n Endorsements)" or, when empty, "References Available Upon Request") and a dark **"Leave an Endorsement"** button.
- **Tag filter pills** (only when reviews exist): "All Endorsements (n)" plus one pill per tag with counts, and a "Peer-Verified Collaborations" note.
- **Review cards (2-column):** star row (1 to 5 filled amber stars) and an optional green metric badge (e.g. "Delivered 2 weeks ahead"); italic quote text; faint quote watermark in the corner; footer with initials avatar (dark gradient square), name, "Role • Company", a relationship chip and a date.
- **Empty state:** Dashed card "No Public Endorsements Posted Yet" with "Leave First Endorsement" (blue) and "Connect on LinkedIn" (outlined).
- **Bottom banner:** "Need Formal Letters of Recommendation or Client Contacts?" with buttons "Request References" (opens Hire Me modal) and "LinkedIn Profile".
- **Leave-a-review modal:** Fields: Full Name\*, Job Title, Company\*, Relationship (Client Partner / Tech Lead / Manager / Peer Collaborator / Research Co-Author), **interactive 5-star rating**, Category Tag (Full-Stack Systems, Backend & APIs, Cloud & DevOps, Distributed AI, Research), optional Key Outcome/Metric, Review text\*. Submit shows a green "Thank You for Your Endorsement!" state for about 1.4s, then closes. The new review is added to the top of the list immediately and saved only in the visitor's own browser.

### 4.9 Project & Research Updates (newsletter) form (at bottom of Home)

Large rounded-3xl card with a white-to-gray gradient and a soft blue glow.

- **Header:** pill "Stay in the Loop" with bell icon, H3 "Get Project & Research Updates", paragraph, and a mail icon tile (hidden on mobile).
- **Topic chips (multi-select, at least one must stay selected):** Full-Stack Engineering, Open Source Releases, Cloud Infrastructure & DevOps, System Architecture. Selected chips are solid blue with a check; unselected are white with a sparkle. Two are preselected (Full-Stack Engineering, System Architecture).
- **Inputs row:** optional Name, required Email (with mail icon, validated for @ and .), and a blue **"Get Updates →"** button (shows "Subscribing..."). Inline rose error text for invalid email.
- **Trust line:** green shield + "Zero spam. Updates sent only for major system and paper releases." and "Unsubscribe at any time."
- **Success state:** green check tile, "You're all signed up!", confirmation text with the email in bold, and a button "Update preferences or change email" that resets it. The subscription is remembered in the browser so returning visitors see the success state.

### 4.10 Footer (global)

Three zones in one row (stacks on mobile): **left** small brand logo; **center** "© {year} Pranav Gawande. All rights reserved." plus a tiny "🔒 Owner Access" link (or green "Owner Mode Active" when unlocked); **right** a **Share** button (uses the native share sheet; otherwise copies the URL and shows "Link Copied!" in green for about 2.5s), a divider, and GitHub, LinkedIn and Email icon links.

## 5. Global overlays and utility components

### 5.1 AI Chat modal ("Ved — AI Assistant")

Centered modal, max-w-2xl, 85vh tall, white card with dim blurred backdrop.

- **Header (light gray):** sparkle icon circle, title "Ved — AI Assistant", small blue "Online" badge, subtitle "Powered by portfolio knowledge". Right side: a "clear conversation" icon (appears once messages exist) and a close X.
- **Empty state:** Bot icon tile, "How can I help you?", helper sentence, and three suggestion chips: "Tell me about Pranav", "Top Projects", "Why Hire Him?".
- **Message stream:** User messages are right-aligned blue bubbles with a gray user avatar. Assistant messages are left-aligned white bordered bubbles with a blue bot avatar, **rendered as Markdown** (headings, bold, bullet lists), plus a footer inside the bubble with the timestamp and a "Copy" action (turns green "Copied"). While waiting: three bouncing blue dots and "Analyzing portfolio...". Auto-scrolls to the newest message.
- **"Explore deep views" strip:** Links to About • Projects • Research • Resume • Contact, each with an external-link icon; clicking closes the chat and navigates.
- **Input bar:** rounded input "Ask follow-up question..." and a blue send button (disabled when empty or loading).
- **Behaviour:** Opening it from Home sends the pre-filled question automatically. The last few messages are sent as context. If the AI is unavailable it falls back to a built-in answer bank covering greeting, skills, experience, education, hiring pitch, projects, contact and about, so the user never sees an error. Replies are always short, structured Markdown.

### 5.2 Resume PDF Preview modal

max-w-3xl modal with scrollable content. **Header:** file icon tile, "Resume Document Preview", "Formatted for PDF Export & ATS Parsing", and buttons **Print**, **Export PDF** (shows "Preparing..." then triggers the browser print dialog so the user can save as PDF) and close. **Body:** a paper-like gray canvas with white section cards: header (name, title, email, location, bio), Education, Core Competencies & Technical Stack (3 columns), Key Certifications (if any), Professional Experience (role, company, period, bullets). Print CSS hides navbar, footer, buttons and sidebar.

### 5.3 Hire Me modal

max-w-xl modal. **Header:** sparkle tile, "Hire Pranav Gawande", subtitle "Full-Stack & Engineering Advisory", close X. **Value-prop strip (3 icons):** Deterministic AI, Rapid Deployment, Production Scale. **Form:** Your Name\*, Company / Organization\*, Work Email\*, Engagement Model dropdown (Full-Time Full-Stack Engineer, Contract / System Engineering, Advisory & Code Audit, Web App & API Development), Project Scope & Deliverables\* textarea, and a full-width "Submit Engagement Inquiry" button. After about 0.7s shows a success state: green check, "Proposal Received!", "will respond within 24 hours", and a Done button. (The state also holds budget range and timeline fields that are not shown in the form; the UI maker may add them.)

### 5.4 Owner Mode (hidden admin layer)

Visitors never see edit controls. The owner unlocks by entering a passcode.

- **Owner Banner (when unlocked):** sticky dark-to-blue gradient strip at the very top: pulsing green dot, shield icon, "Owner Mode Active: {owner email}", and buttons **Upload Photo** (hidden on mobile; jumps to Resume), **Edit Details**, and red **Lock** (logs out).
- **Owner Auth modal (max-w-xl):** header with lock (guest) or green shield (owner) icon, title "Owner Authentication" or "Owner Dashboard & Settings" with an "Unlocked" badge, and the owner email.
  - **Login view (guests):** info box "Owner-Only Modification Protection" explaining that details are read-only for the public; **password input with show/hide eye toggle**; rose error box on wrong passcode; green success box "Authenticated successfully! Unlocking owner mode..."; blue "Unlock Owner Mode" button.
  - **Tab bar (owner):** "Edit Details" and "Security & Passcode".
  - **Edit Details:** two-column form with Full Name, Professional Title/Headline, Tagline/Hero Hook, Bio/Summary (textarea), Email, Location, GitHub URL, LinkedIn URL. Buttons: "Reset to Defaults" (confirm dialog, also resets photo), "Lock & Logout", and blue "Save Changes". A green "saved" message appears. Changes update the whole site instantly.
  - **Security & Passcode:** Current Passcode, New Passcode (min 4 chars), Confirm New Passcode, rose or green status boxes, "Lock & Logout" and "Update Passcode".

### 5.5 Scroll-to-Top button

Circular white 44px button, fixed bottom-right, with an up-arrow. Fades and slides in after scrolling 300px; hover turns blue and nudges the arrow upward.

## 6. Key user flows

1. **Ask the AI:** Home → type in the search bar or tap a chip or card → Chat modal opens and answers → follow-up questions → jump to a deep view or close.
2. **Evaluate the candidate:** About (skills and experience) → Projects and Research → Resume (download PDF) → Contact or Hire Me.
3. **Get in touch:** Contact form, direct email link, or Hire Me modal from the References banner.
4. **Subscribe:** Fill the updates form at the bottom of Home → success state persists.
5. **Leave an endorsement:** About → Leave an Endorsement → modal → card appears at top.
6. **Owner edits:** Lock icon → passcode → banner appears → Edit Details or Upload Photo → Save → Lock.

## 7. Responsive behaviour

- **Mobile (<768px):** Hamburger menu with full-width drawer; grids collapse to one column; Resume sidebar stacks above content (not sticky); Contact columns stack; filter rows scroll or wrap; modals become near full width with internal scroll; footer stacks vertically.
- **Tablet (768 to 1024px):** 2-column grids; desktop nav links appear.
- **Desktop (>1024px):** 3 to 4 column grids where noted, sticky Resume sidebar, 12-column Contact layout.

## 8. Content and data model summary

- **Profile:** name, title ("FULL-STACK DEVELOPER"), avatar, tagline (empty by default), bio ("Passionate Full-Stack Developer specializing in scalable web technologies, robust microservices, and modern, high-performance user experiences."), email, GitHub, LinkedIn, Twitter, location.
- **Collections:** experience\[\], education\[\], skillGroups\[\], technicalSkills\[\] (name, category, proficiency 0 to 100, level, years, highlight), certificates\[\], projects\[\], research\[\], reviews\[\].
- **Currently empty:** certificates, projects, research and reviews, so those pages and sections show designed empty states. The redesign should look good both empty and populated.
- **Persistence:** Everything user-generated (owner profile edits, custom photo, passcode, reviews, newsletter status) is saved in the visitor's own browser storage. Only the AI chat and newsletter call a real server (`POST /api/chat`, `POST /api/newsletter/subscribe`).

## 9. Redesign opportunities and known issues

Use these as optional improvements when prompting the UI maker.

**UX improvements:**

- Add real URL routing (`/about`, `/projects`, ...) so pages are shareable and the back button works.
- Add a proper hero with Pranav's photo, a clear one-line value proposition and primary CTAs ("Chat with Ved", "Download Resume", "Hire Me") above the fold; the Home page currently has no photo or CTA besides the chat.
- Add an "Available for work" status and a prominent "Hire Me" button in the navbar (the Hire Me modal has no direct entry point from the navbar today).
- Add featured-project previews, a stats strip and a testimonial teaser on Home.
- Replace the duplicate skill listings (About shows skills twice: proficiency cards and domain stacks, and the Resume repeats them again) with one cohesive skills experience.
- Improve the chat: streaming responses, source chips, a persistent floating chat launcher, and conversation history.
- Add skeleton loaders, scroll-reveal animations, a project detail drawer and a timeline view for experience.
- Offer an optional dark theme and a theme toggle.

**Functional gaps to design around:**

- The Contact form and Hire Me form are front-end only today (no real submission). Design them with real success and error states.
- Endorsements are saved only in the submitter's own browser and are not moderated; a redesign should assume a moderated submission flow.
- The "Download PDF" uses the browser print dialog rather than a generated file.
- The owner passcode is checked in the browser, and the default passcode is shown inside the login screen. Hide that hint in the redesign and plan a proper authenticated admin area.

**Small inconsistencies found:**

- The page loads *Plus Jakarta Sans* but the stylesheet references *DM Sans*; pick one typeface.
- A "PortfolioView" component exists but is unused (it duplicates Projects).
- The Hire Me budget and timeline fields exist in code but are not displayed.
- The skill-group titles do not include "Architecture & Cloud", although Resume's layout expects it.
- Twitter appears in Contact and the profile data but not in the footer.

## 10. One-paragraph prompt summary (optional short version)

"Design a modern, light-themed, fully responsive single-page portfolio for a Full-Stack Developer named Pranav Gawande. Navigation: Home, About, Projects, Research, Resume, Contact, plus a 'Chat with Ved' AI button and a hidden owner-login lock. Home is an AI landing with a large 'Ask me anything' search bar, suggestion chips, four question cards and a newsletter signup. About has a bio card, filterable skill proficiency (progress bar or badge grid views), domain stacks, experience and education, and an endorsements section with a review modal. Projects and Research have status and category filters, rich cards with progress bars, tags and links, and empty states. Resume has a sticky profile sidebar with quick-jump links and PDF download, plus experience, education, skills and certificates. Contact has availability status, contact details, social links and a message form. Include modals for AI chat (markdown replies, copy, clear), PDF preview, Hire Me inquiry, and owner login with profile editing, photo upload and passcode change. Use a sky-blue (#0284c7) accent, rounded-2xl cards, soft shadows, Plus Jakarta Sans and JetBrains Mono."
