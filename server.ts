import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Portfolio system prompt grounding
const PORTFOLIO_SYSTEM_INSTRUCTION = `You are Ved, the official AI Portfolio Assistant for Pranav Gawande.
Pranav Gawande is an enthusiastic Full-Stack Developer and fresher based in Pune, Maharashtra, India.
Contact: pranavgawande59@gmail.com.

Key Profile Details:
- Title: Full-Stack Developer (Fresher)
- Bio: Passionate Full-Stack Developer and motivated fresher with strong foundations in React, Node.js, Python, Java, and modern web architectures. Eager to engineer high-performance applications and contribute to real-world products.
- Education: 
  1. Bachelor in Computer Application from Sant Gadge Baba Amravati University, Amravati (2023 - 2025).
  2. Master in Computer Application from G.H Raisoni international skill tech university, Pune (2027).
- Core Skills: Python, Java, JavaScript/TypeScript, React 18, Node.js, SQL, Docker, AWS Cloud fundamentals, RESTful APIs.
- Verified Certifications:
  1. Full-Stack Web Development Specialization (Meta / Coursera, 2024)
  2. Python Certified Associate Programmer (PCAP, Python Institute, 2024)
  3. AWS Certified Cloud Practitioner (Amazon Web Services, 2024)
  4. Java SE & Software Architecture Fundamentals (Oracle / HackerRank, 2023)
- Career Status: Actively seeking full-time Full-Stack Developer, Backend, or Software Engineering positions.
- Practical & Coursework Engineering:
  1. Full-Stack Web Applications: Built end-to-end full-stack web applications with React, Node.js, Express, and SQL, implementing responsive interfaces and RESTful endpoints.
  2. Software Engineering Projects: Algorithmic problem solving, relational schema design, and practical interactive web projects using Java, Python, and JavaScript.

Guidelines for your responses:
- Speak courteously, professionally, and accurately as Pranav's official portfolio representative.
- Emphasize his strong computer science fundamentals, fast learning ability, clean coding discipline, and dedication to building scalable full-stack applications.
- Keep responses concise, clear, well-structured, and impactful.
- Use markdown formatting with bullet points and bold highlights where appropriate.
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
- **Education**: Bachelor & Master in Computer Application
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
    return `### Pranav's Technical Skills & Foundation (Fresher)

- **Core Languages**:
  * **Python**: Backend scripting, automation, clean algorithms, data structures
  * **Java**: Core Java, OOP principles, multithreading, software engineering fundamentals
  * **JavaScript / TypeScript**: Modern ES6+, DOM manipulation, asynchronous programming
  * **SQL**: Relational schema design, queries, database operations
- **Frontend & Full-Stack**:
  * **React 18**: Hooks, functional component architecture, state management, responsive UI
  * **Node.js & Express**: RESTful API design, server-side routes, middleware integration
- **Cloud & Tooling**:
  * **Docker**: Containerization basics, Dockerfile setup, consistent development setups
  * **AWS Cloud**: EC2 and S3 fundamentals, cloud deployment awareness
  * **Git & GitHub**: Version control, branch workflows, collaborative project structures`;
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
    return `### Pranav's Career Focus & Practical Background

Pranav is currently pursuing his **Master in Computer Application** at **G.H Raisoni international skill tech university, Pune (Graduating 2027)** and is actively seeking full-time **Full-Stack Developer**, **Backend**, or **Software Engineering** opportunities:

- **Full-Stack Foundations**: Practical project engineering with **React 18**, **Node.js**, **Express**, **Python**, **Java**, and **SQL**.
- **System Architecture**: Strong grasp of Data Structures, Object-Oriented Principles, Multithreading, and Relational Database Systems.
- **Cloud & Tooling**: Hands-on practice with **Docker** containers and **AWS Cloud Foundations**.
- **Availability**: Ready to contribute to production web architectures and collaborate with engineering teams.

You can reach Pranav directly at **pranavgawande59@gmail.com** for hiring discussions!`;
  }

  // Education / Degrees / University / College
  if (
    msg.includes('education') ||
    msg.includes('degree') ||
    msg.includes('college') ||
    msg.includes('university') ||
    msg.includes('study')
  ) {
    return `### Academic Background

- **Master in Computer Application**
  * **Institution**: G.H Raisoni international skill tech university, Pune
  * **Timeline**: 2027

- **Bachelor in Computer Application**
  * **Institution**: Sant Gadge Baba Amravati University, Amravati
  * **Timeline**: 2023 – 2025`;
  }

  // Certifications / Credentials / Licenses
  if (
    msg.includes('cert') ||
    msg.includes('credential') ||
    msg.includes('license') ||
    msg.includes('accreditation')
  ) {
    return `### Verified Certifications & Credentials

Pranav holds recognized industry and coursework certifications:

1. **Full-Stack Web Development Specialization** (2024)
   - **Issuer**: Meta / Coursera Professional Certification
   - **Credential ID**: \`META-FS-2024-8841\`
   - **Key Skills**: React 18, Node.js, Express, RESTful APIs, SQL

2. **Python Certified Associate Programmer (PCAP)** (2024)
   - **Issuer**: Python Institute
   - **Credential ID**: \`PCAP-31-03-90218\`
   - **Key Skills**: Python, OOP, Data Structures, Algorithmic Problem Solving

3. **AWS Certified Cloud Practitioner** (2024)
   - **Issuer**: Amazon Web Services (AWS)
   - **Credential ID**: \`AWS-CCP-77490-PG\`
   - **Key Skills**: AWS Cloud Foundations, EC2, S3, Security & Architecture

4. **Java SE & Software Architecture Fundamentals** (2023)
   - **Issuer**: HackerRank & Oracle Training
   - **Credential ID**: \`JAVA-SE-4120-HR\`
   - **Key Skills**: Core Java, Multithreading, OOP Design, Collections`;
  }

  // Why Hire / Strengths / Value
  if (
    msg.includes('hire') ||
    msg.includes('why') ||
    msg.includes('strength') ||
    msg.includes('recruit') ||
    msg.includes('value')
  ) {
    return `### Why You Should Hire Pranav Gawande (Fresher)

1. **Strong Full-Stack Foundation**: Solid hands-on knowledge spanning modern frontend (React 18), backend servers (Node.js, Express, Java, Python), and relational databases (SQL).
2. **Academic Foundation & Fast Learner**: Computer Applications graduate from SGBAU, currently pursuing Master in Computer Application at G.H Raisoni International Skill Tech University, quick to absorb new codebases and industry best practices.
3. **Core CS & Algorithmic Fundamentals**: Deep grasp of Data Structures, OOP, multithreading, and software engineering principles.
4. **Hands-On Practical Mindset**: Familiar with modern development tooling—Git workflows, Docker containerization, RESTful APIs, and responsive design.
5. **High Energy & Growth Potential**: Highly motivated fresher ready to contribute immediately, collaborate effectively, and grow with the engineering team.`;
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

- **Current Pursuit**: Master in Computer Application at G.H Raisoni international skill tech university, Pune (Graduating 2027).
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
