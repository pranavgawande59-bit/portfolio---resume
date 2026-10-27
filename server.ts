import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

// Portfolio system prompt grounding
const PORTFOLIO_SYSTEM_INSTRUCTION = `You are Ved, the official AI Portfolio Assistant for Pranav Gawande.
Pranav Gawande is a Full-Stack Developer based in Pune, Maharashtra, India.
Contact: pranavgawande59@gmail.com.

Key Profile Details:
- Title: Full-Stack Developer
- Bio: Passionate Full-Stack Developer specializing in scalable web technologies, robust microservices, and modern, high-performance user experiences.
- Education: 
  1. Bachelor of Computer Applications (BCA) from College Of Management and Computer Science, Yavatmal (June 2023 - May 2025) with strong CGPA academic distinction.
  2. Master of Computer Applications (MCA) from Savitribai Phule Pune University (Graduating 2027). Specialization in Distributed Systems, Cloud Computing & Microservices Architecture (Top 5%).
- Core Skills: Python (Expert, 4+ yrs), Java (Expert, 3+ yrs), JavaScript/TypeScript (Expert, 4+ yrs), React 18 (Expert), Node.js (Expert), SQL (Advanced, 3+ yrs), Docker, AWS Cloud, System Design, Microservices, RESTful APIs.
- Experience:
  1. Full-Stack Developer at Tech Solutions Inc. (2022 - Present): Engineered scalable Next.js & Node.js web apps (improving load times by 40%), built RESTful APIs and asynchronous data processing pipelines.
  2. Web Developer & Open-Source Contributor (2021 - 2022): Built responsive web interfaces, reusable UI components, and contributed to open-source developer tooling.

Guidelines for your responses:
- Speak courteously, professionally, and accurately as Pranav's official portfolio representative.
- Keep responses concise, clear, well-structured, and impactful.
- Use markdown formatting with bullet points and bold highlights where appropriate.
- If asked "Why should I hire him?", highlight his end-to-end full-stack mastery (React/Next.js frontend, Node.js/Java backends, Docker/AWS infrastructure), strong computer science foundations, and clean architectural problem solving.
- You can recommend scheduling a call or emailing pranavgawande59@gmail.com for hiring or collaboration.`;

/**
 * Deterministic grounded portfolio knowledge generator.
 * Used when offline, when the API key is absent, or during temporary Gemini model high-demand (503) spikes.
 */
function getGroundedPortfolioReply(message: string): string {
  const msg = (message || '').toLowerCase();

  // Greetings
  if (/\b(hi|hello|hey|greetings|morning|afternoon|evening)\b/.test(msg) && msg.length < 25) {
    return `### Hello! I'm Ved, Pranav's AI Assistant.
Welcome to Pranav Gawande's interactive portfolio! I can answer questions about:
- **Skills & Tech Stack**: Core languages, frameworks, and cloud tools
- **Work Experience**: Production full-stack and AI development roles
- **Education**: BCA and MCA degrees with academic distinction
- **Why Hire Pranav**: Key engineering strengths and differentiators
- **Direct Contact**: Reach out at **pranavgawande59@gmail.com**

What would you like to know?`;
  }

  // Skills / Stack / Technologies
  if (
    msg.includes('skill') ||
    msg.includes('tech') ||
    msg.includes('stack') ||
    msg.includes('python') ||
    msg.includes('react') ||
    msg.includes('java') ||
    msg.includes('sql') ||
    msg.includes('aws') ||
    msg.includes('docker') ||
    msg.includes('framework') ||
    msg.includes('language')
  ) {
    return `### Pranav's Technical Skills & Architecture Stack

- **Core Languages**:
  * **Python** (Expert, 4+ yrs): Backend scripting, automation, clean architecture, data structures
  * **Java** (Expert, 3+ yrs): Core Java, OOP, multithreading, enterprise backend services
  * **JavaScript / TypeScript** (Expert, 4+ yrs): Modern ES6+, asynchronous programming, event-driven design
  * **SQL** (Advanced, 3+ yrs): Relational schema design, complex query optimization, indexing
- **Frontend & Full-Stack**:
  * **React 18 / Next.js**: State management, responsive UI, micro-frontends, performance tuning
  * **Node.js / Express**: High-throughput RESTful microservices, asynchronous worker queues
- **Cloud & DevOps**:
  * **Docker**: Containerization, multi-stage builds, predictable production deployments
  * **AWS Cloud**: EC2, S3, IAM, scalable cloud infrastructure
- **Architecture & Microservices**:
  * Distributed systems, RESTful API design, microservices architecture, relational database indexing & caching`;
  }

  // Experience / Jobs / Career
  if (
    msg.includes('experience') ||
    msg.includes('job') ||
    msg.includes('career') ||
    msg.includes('work') ||
    msg.includes('company') ||
    msg.includes('role')
  ) {
    return `### Pranav's Professional Experience

1. **Full-Stack Developer** | *Tech Solutions Inc.* (2022 – Present)
   - Engineered scalable web applications using **Next.js** and **Node.js**, improving overall load times by **40%**.
   - Built RESTful APIs and asynchronous data processing pipelines to streamline application workflows.
   - Designed and maintained robust relational schemas on **PostgreSQL** with optimized query performance.

2. **Web Developer & Open-Source Contributor** (2021 – 2022)
   - Built responsive frontend user interfaces and reusable components using **JavaScript**, **React**, and modern CSS.
   - Developed backend utility scripts, tools, and contributed to open-source developer repositories.`;
  }

  // Education / Degrees / University / College
  if (
    msg.includes('education') ||
    msg.includes('degree') ||
    msg.includes('college') ||
    msg.includes('university') ||
    msg.includes('bca') ||
    msg.includes('mca') ||
    msg.includes('cgpa') ||
    msg.includes('study')
  ) {
    return `### Academic Background & Distinction

- **Master of Computer Applications (MCA)**
  * **Institution**: Savitribai Phule Pune University
  * **Timeline**: Graduating 2027
  * **Rank & Distinction**: Department Rank in **Top 5%**
  * **Specialization**: Distributed Systems, Cloud Computing & Microservices Architecture
  * **Thesis Research**: High-Throughput Distributed Microservices and Cloud Orchestration

- **Bachelor of Computer Applications (BCA)**
  * **Institution**: College Of Management and Computer Science, Yavatmal
  * **Timeline**: June 2023 – May 2025
  * **Distinction**: Cumulative CGPA Academic Distinction
  * **Coursework**: Software Engineering, OOP, Data Structures, Relational Database Management Systems`;
  }

  // Why Hire / Strengths / Value
  if (
    msg.includes('hire') ||
    msg.includes('why') ||
    msg.includes('strength') ||
    msg.includes('recruit') ||
    msg.includes('value')
  ) {
    return `### Why You Should Hire Pranav Gawande

1. **End-to-End Full-Stack Mastery**: Pranav covers the complete product lifecycle—from responsive, polished frontend interfaces (React 18, Next.js) to resilient backend microservices (Node.js, Express, Java) and database optimization.
2. **Performance-Driven Engineering**: Proven track record of boosting system performance (e.g., cutting web application load times by 40% at Tech Solutions Inc.).
3. **Academic & Architectural Rigor**: Top 5% MCA scholar specializing in Distributed Systems and Cloud Computing at SPPU.
4. **Strong Systems Thinking**: Deep foundation across core Java, Python, SQL, Docker containerization, and AWS cloud infrastructure.
5. **Clear Communicator & High Velocity**: Collaborative mindset with rapid prototyping skills and adherence to clean code principles.`;
  }

  // Projects / Portfolio / Work samples
  if (
    msg.includes('project') ||
    msg.includes('built') ||
    msg.includes('portfolio') ||
    msg.includes('github') ||
    msg.includes('repo')
  ) {
    return `### Engineering Projects & Implementations

Pranav focuses on end-to-end production systems that marry scalable backend architecture with intuitive user interfaces and cloud infrastructure:
- **Scalable Web Architecture**: High-speed Next.js and Node.js microservices with distributed database caching and sub-second latencies.
- **RESTful APIs & Microservices**: Robust, typed API contracts, authentication flows, and scalable service orchestration.
- **Microservice Infrastructure**: Containerized Docker services deployed with AWS cloud infrastructure and automated CI/CD pipelines.

Interested in reviewing specific code repositories or technical demos? Contact Pranav directly at **pranavgawande59@gmail.com**.`;
  }

  // Contact / Email / Location / Reach out
  if (
    msg.includes('contact') ||
    msg.includes('email') ||
    msg.includes('reach') ||
    msg.includes('location') ||
    msg.includes('phone') ||
    msg.includes('connect')
  ) {
    return `### Get in Touch with Pranav Gawande

- **Email**: [pranavgawande59@gmail.com](mailto:pranavgawande59@gmail.com)
- **Location**: Pune, Maharashtra, India
- **Availability**: Open for Full-Stack Developer opportunities, backend engineering roles, and technical collaborations.
- Feel free to click the **"Contact"** tab in the navigation bar to send a message directly!`;
  }

  // About / Bio / Who is Pranav
  if (
    msg.includes('who') ||
    msg.includes('about') ||
    msg.includes('pranav') ||
    msg.includes('introduce') ||
    msg.includes('summary')
  ) {
    return `### About Pranav Gawande

Pranav Gawande is a **Full-Stack Developer** based in Pune, India. He combines deep software engineering rigor with modern web and cloud technologies to create scalable, high-performance web applications.

- **Current Pursuit**: MCA in Distributed Systems & Cloud Computing at Savitribai Phule Pune University (Top 5%).
- **Key Focus**: Production React/Next.js applications, robust Node.js/Java backends, Docker/AWS infrastructure, and scalable microservices.
- **Contact**: [pranavgawande59@gmail.com](mailto:pranavgawande59@gmail.com)`;
  }

  // Default fallback
  return `Pranav Gawande is a **Full-Stack Developer** based in Pune, India, specializing in modern web technologies (React, Node.js, Next.js), distributed systems, and cloud architectures.

You can ask me about:
- **"What are Pranav's strongest skills?"**
- **"Tell me about his work experience."**
- **"What is his education and academic rank?"**
- **"Why should I hire Pranav?"**
- Or reach out directly at **pranavgawande59@gmail.com**!`;
}

/**
 * Calls Gemini models with automated retry and fallback to gracefully handle transient 503 high-demand spikes.
 */
async function generateGeminiReply(
  ai: GoogleGenAI,
  contents: Array<{ role: string; parts: Array<{ text: string }> }>
): Promise<string> {
  // Model priority: gemini-3.8-flash (primary per guidelines), gemini-3.1-flash-lite (high throughput/availability), gemini-flash-latest
  const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
  let lastError: unknown = null;

  for (const modelName of candidateModels) {
    // Attempt up to 2 tries per model in case of transient 503 spikes
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          return response.text.trim();
        }
      } catch (err: unknown) {
        lastError = err;
        const errStr = err instanceof Error ? err.message : String(err);
        const is503OrRateLimit = errStr.includes('503') || errStr.includes('demand') || errStr.includes('429');
        
        // If it's a 503 high-demand spike on attempt 1, wait 500ms and retry once
        if (is503OrRateLimit && attempt === 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          continue;
        }
        
        // Move quietly to next model candidate without printing alarmist crash messages
        break;
      }
    }
  }

  throw lastError || new Error('All model candidates exhausted');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const cleanMessage = message.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. If an API key is available, attempt Gemini generation with model fallback
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '') {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        // Format history if provided
        const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item && item.role && item.text) {
              contents.push({
                role: item.role === 'assistant' || item.role === 'model' ? 'model' : 'user',
                parts: [{ text: item.text }],
              });
            }
          }
        }

        contents.push({
          role: 'user',
          parts: [{ text: cleanMessage }],
        });

        const replyText = await generateGeminiReply(ai, contents);
        res.json({ reply: replyText, source: 'ai' });
        return;
      } catch {
        // High-demand (503) or transient API spike: smoothly switch to grounded knowledge
        const fallbackReply = getGroundedPortfolioReply(cleanMessage);
        res.json({ reply: fallbackReply, source: 'grounded-fallback' });
        return;
      }
    }

    // 2. Grounded deterministic knowledge when GEMINI_API_KEY is unconfigured
    const fallbackReply = getGroundedPortfolioReply(cleanMessage);
    res.json({ reply: fallbackReply, source: 'grounded' });
  });

  // In-memory newsletter subscribers list
  const subscribers: Array<{ name?: string; email: string; topics?: string[]; timestamp: string }> = [];

  // Project Updates / Newsletter subscription endpoint
  app.post('/api/newsletter/subscribe', (req, res) => {
    try {
      const { name, email, topics, timestamp } = req.body;
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        res.status(400).json({ error: 'Valid email is required' });
        return;
      }

      const existing = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
      if (!existing) {
        subscribers.push({
          name: name || undefined,
          email: email.trim().toLowerCase(),
          topics: Array.isArray(topics) ? topics : [],
          timestamp: timestamp || new Date().toISOString(),
        });
      }

      res.json({
        success: true,
        message: 'Successfully subscribed to project and research updates!',
        subscriberCount: subscribers.length,
      });
    } catch (err) {
      console.error('Subscription error:', err);
      res.status(500).json({ error: 'Failed to record subscription' });
    }
  });

  // Vite middleware in dev mode vs static in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
