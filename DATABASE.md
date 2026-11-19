# Data Architecture & Storage Specification (DATABASE.md)
## Pranav Gawande — AI Architect & Full-Stack Developer Portfolio

**Document Version:** 1.0.0  
**Storage Paradigm:** In-Memory Cache + Client-Side Reactive Storage + Static Seed  

---

## 1. Storage Strategy Overview

The portfolio uses an ultra-fast, zero-overhead storage strategy suited for high-performance developer portfolios:
1. **Static Immutable Seed Data:** Hardcoded defaults in `src/data/portfolioData.ts` ensure instant initial render and offline reliability.
2. **Client-Side Reactive Storage (`localStorage` & `sessionStorage`):** Stores dynamic user modifications, custom added projects, avatar headshot changes, and owner authentication tokens without requiring heavy database hosting.
3. **Server-Side In-Memory Cache:** Maintains active subscriber records and runtime state during the lifetime of the Node.js process.

---

## 2. Entity Schemas & TypeScript Definitions

### 2.1 User Profile Entity (`UserProfile`)
Stores the primary personal and career branding attributes of the portfolio owner.

```typescript
export interface UserProfile {
  name: string;          // e.g., "Pranav Gawande"
  title: string;         // e.g., "FULL-STACK DEVELOPER"
  avatarUrl: string;     // URL to primary headshot image or base64 data URI
  tagline: string;       // Secondary highlight text or motto
  bio: string;           // Multi-sentence summary of experience and focus
  email: string;         // Primary contact email (e.g., "pranavgawande59@gmail.com")
  github: string;        // GitHub profile link
  linkedin: string;      // LinkedIn profile link
  twitter: string;       // Twitter/X handle link
  location: string;      // Geographic location (e.g., "Pune, Maharashtra, India")
}
```

### 2.2 Project Node Entity (`ProjectItem`)
Defines the structure for software engineering and distributed architecture projects.

```typescript
export interface ProjectItem {
  id: string;                                                      // Unique slug (e.g., "proj-distributed-cache")
  title: string;                                                   // Project display name
  category: 'Full-Stack' | 'Frontend' | 'Backend & APIs' | 'Cloud Architecture';
  tagline: string;                                                 // 1-sentence value proposition
  description: string;                                             // Detailed architectural overview
  metrics: string;                                                 // Measurable achievement (e.g., "<10ms latency")
  techStack: string[];                                             // Array of technologies used
  demoUrl?: string;                                                // Live application link
  githubUrl?: string;                                              // Repository URL
  imageUrl?: string;                                               // Screenshot / diagram image
  sourceSnippet?: string;                                          // Core code sample snippet
  architectureHighlights: string[];                               // Key architectural decisions
  featured?: boolean;                                              // Pin to top of projects view
  status?: 'completed' | 'in-progress' | 'research';
  progressPercentage?: number;                                     // 0 - 100
  expectedCompletion?: string;
}
```

### 2.3 Technical Skill Entity (`TechnicalSkill`)
Represents technical capabilities, categorization, and competency levels.

```typescript
export interface TechnicalSkill {
  name: string;                                                    // Skill name (e.g., "React 18", "Python")
  category: 'language' | 'framework' | 'ai-data' | 'cloud-devops';
  proficiency: number;                                             // Rating between 0 and 100
  level: 'Expert' | 'Advanced' | 'Proficient' | 'Fresher';
  experienceYears?: string;                                        // e.g., "Academic & Projects"
  highlight?: string;                                              // Key practical application
}
```

### 2.4 Experience & Education Entities

```typescript
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type?: string;
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  highlights?: string[];
}
```

### 2.5 In-Memory Subscriber Record (`Subscriber`)
Maintained on the backend server (`server.ts`):

```typescript
interface Subscriber {
  name?: string;
  email: string;
  topics?: string[];
  timestamp: string; // ISO 8601 string
}
```

---

## 3. Storage Keys & LocalStorage Map

| Key | Scope | Type | Purpose |
| :--- | :--- | :--- | :--- |
| `pranav_portfolio_owner_session` | Session / Local | `string` | Contains `authenticated_owner_pranavgawande59@gmail.com` when unlocked |
| `pranav_portfolio_passcode` | LocalStorage | `string` | Stores custom owner passcode (defaults to `pranav2027`) |
| `pranav_portfolio_profile_custom` | LocalStorage | `JSON string` | Partial or complete `UserProfile` overrides |
| `pranav_portfolio_projects_custom`| LocalStorage | `JSON string` | Array of `ProjectItem` objects modified or created by owner |
| `pranav_portfolio_avatar_custom` | LocalStorage | `string` | Custom profile image URI or uploaded image URL |

---

## 4. State Synchronization & Event Lifecycle

```
[User Action in UI]
       │
       ▼
[ownerAuthHelper.ts]
       │
       ├─► Write to localStorage.setItem(KEY, value)
       │
       └─► window.dispatchEvent(new Event('pranav_owner_state_changed'))
                  │
                  ├─► useOwnerAuth() Hook listener triggered
                  │          │
                  │          └─► React state updated (setIsOwner, setProfile, setProjects)
                  │                     │
                  │                     └─► UI Re-renders automatically
                  │
                  └─► Other open browser tabs capture window.addEventListener('storage')
                             │
                             └─► Synchronized across all tabs simultaneously
```

---

## 5. Data Migrations, Sanitization & Purge Safeguards

### 5.1 Legacy Sample Data Purge
To prevent stale placeholder data from persisting in local browser caches across version updates, `ownerAuthHelper.ts` runs an automatic migration check:

```typescript
// Automatic cleanup of previous sample records
const hasDummy = parsed.some((p: any) => p?.id === 'proj-prohub' || p?.id === 'proj-nexflow');
if (hasDummy) {
  localStorage.removeItem(OWNER_PROJECTS_STORAGE_KEY);
  return [];
}
```

### 5.2 Reset Capabilities
The application exposes dedicated functions to restore clean baseline states:
- `resetCustomProfile()`: Deletes profile overrides; restores `src/data/portfolioData.ts`.
- `clearAllCustomProjects()`: Empties custom projects.
- `resetCustomProjects()`: Removes custom array and reverts to default project seeds.
