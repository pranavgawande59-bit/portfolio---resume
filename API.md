# REST API Specification (API.md)
## Pranav Gawande — AI Architect & Full-Stack Developer Portfolio

**API Version:** 1.0.0  
**Base URL:** `http://localhost:3000` (or configured production domain)  
**Content-Type:** `application/json`  

---

## 1. Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/chat` | Send message to AI assistant ("Ved") with multi-turn history | None (Public) |
| `POST` | `/api/newsletter/subscribe` | Register visitor email for research & project releases | None (Public) |
| `GET` | `/*` | Single-Page Application (SPA) HTML fallback / Static Asset router | None (Public) |

---

## 2. Endpoint Details

### 2.1 `POST /api/chat`

Generates an intelligent response representing Pranav Gawande. Uses a resilient multi-model pipeline (`gemini-3.8-flash` -> `gemini-3.1-flash-lite` -> `gemini-flash-latest`) and automatically switches to the grounded portfolio knowledge engine if upstream LLM services encounter `503 Service Unavailable` or `429 Too Many Requests`.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body Schema
```json
{
  "message": "string (required, non-empty)",
  "history": [
    {
      "role": "user | assistant | model",
      "text": "string"
    }
  ]
}
```

#### Request Example
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are Pranav\u0027s core technical strengths?",
    "history": [
      { "role": "user", "text": "Hi Ved" },
      { "role": "assistant", "text": "Hello! I am Ved, Pranav\u0027s AI Assistant." }
    ]
  }'
```

#### Response Body Schemas

**Success (AI Generated - HTTP 200):**
```json
{
  "reply": "Pranav Gawande specializes in React 18, Node.js, Python, Java, SQL, and Docker. He combines strong algorithmic foundations with scalable full-stack application development.",
  "source": "ai"
}
```

**Success (Grounded Knowledge Fallback - HTTP 200):**
*Triggered automatically if Gemini API key is missing or when upstream Google GenAI models experience high demand (503).*
```json
{
  "reply": "### Pranav\u0027s Technical Skills & Foundation (Fresher)\n\n- **Core Languages**:\n  * **Python**: Backend scripting, automation, clean algorithms, data structures\n  * **Java**: Core Java, OOP principles, multithreading, software engineering fundamentals\n...",
  "source": "grounded-fallback"
}
```

**Error (Bad Request - HTTP 400):**
```json
{
  "error": "Message is required"
}
```

---

### 2.2 `POST /api/newsletter/subscribe`

Subscribes a visitor or recruiter to updates regarding Pranav's open-source projects, system design blogs, and distributed systems research preprints.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body Schema
```json
{
  "name": "string (optional)",
  "email": "string (required, must include @)",
  "topics": ["string"] (optional),
  "timestamp": "string (optional ISO 8601 string)"
}
```

#### Request Example
```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Vance",
    "email": "alex.vance@techcorp.io",
    "topics": ["system-design", "research"],
    "timestamp": "2026-11-14T10:00:00.000Z"
  }'
```

#### Response Body Schemas

**Success (HTTP 200):**
```json
{
  "success": true,
  "message": "Successfully subscribed to project and research updates!",
  "subscriberCount": 14
}
```

**Error (Validation Error - HTTP 400):**
```json
{
  "error": "Valid email is required"
}
```

**Error (Server Failure - HTTP 500):**
```json
{
  "error": "Failed to record subscription"
}
```

---

## 3. Client Integration Examples (TypeScript)

### 3.1 Invoking the AI Chat Endpoint
```typescript
interface ChatResponse {
  reply: string;
  source: 'ai' | 'grounded' | 'grounded-fallback';
}

export async function sendChatMessage(
  message: string, 
  history: Array<{ role: string; text: string }>
): Promise<ChatResponse> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.statusText}`);
  }

  return response.json();
}
```

### 3.2 Subscribing to Project Updates
```typescript
export async function subscribeToUpdates(email: string, name?: string): Promise<boolean> {
  const res = await fetch('/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      name,
      topics: ['open-source', 'system-design'],
      timestamp: new Date().toISOString(),
    }),
  });

  const data = await res.json();
  return data.success === true;
}
```

---

## 4. Security & Operational Policies
- **Rate & Error Safeguards:** The server catches all internal exceptions on `/api/chat` and immediately redirects to `getGroundedPortfolioReply()`, guaranteeing a 200 OK response with meaningful information.
- **Payload Constraints:** Request bodies are restricted to standard JSON with 100kb payload caps enforced by Express middleware.
- **CORS Configuration:** In production, requests originating from the primary host domain are permitted; foreign cross-origin scrapers are prevented from consuming LLM credits.
