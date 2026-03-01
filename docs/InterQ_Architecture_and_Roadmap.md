# InterQ: Advanced AI-Powered Interview Platform
## Comprehensive Architectural Blueprint & System Design

As the Senior AI Product Architect, I have designed this end-to-end scalable architecture for **InterQ**. This system is built to handle thousands of concurrent video streams, perform real-time NLP analysis, and provide bias-free recruitment at scale.

---

## 1. User Roles & Access Control (RBAC)
The system utilizes a hierarchical RBAC model with secure JWT-based authentication via Supabase/Auth0, supporting OAuth2 and SAML for Enterprise.

| Role | Access Level | Primary Responsibilities |
| :--- | :--- | :--- |
| **Candidate** | Personal Access | Practice mocks, view prep plans, record assigned interviews. |
| **Recruiter** | Departmental Access | Setup interviews, ingestion of JD/Resumes, view candidate scores. |
| **Admin** | System Access | Manage question banks, AI scoring calibration, audit logs. |
| **Enterprise** | Global Access | Branding customization, SSO management, API key provisioning. |

---

## 2. End-to-End Workflow

### Step 1: Setup (Interview Configuration)
*   **Intuitive UI:** Multi-step wizard to define `Role`, `Seniority`, and `Category`.
*   **Intelligence Ingestion:** 
    *   **Resume Parser:** Extract skills/X-factors using NLP from PDF/DOC.
    *   **JD Ingestion:** Automatically generate a weighted scoring rubric based on job requirements.
*   **Configuration Engine:**
    *   **Logic:** Dynamic question branching based on initial answer quality (using LLM routers).
    *   **Integrity:** Hardware checks (Webcam/Mic) and Anti-cheat (Tab focus tracking).

### Step 2: Record (Interview Execution)
*   **Seamless Delivery:** WebRTC-based low-latency video streaming.
*   **AI Interviewer Avatar:** Voice/Video-based prompt delivery.
*   **Dynamic Follow-ups:** 
    *   The AI doesn't just read questions; it analyzes the transcript in real-time (via Whisper-Streaming) and asks context-aware follow-up questions ("You mentioned Kubernetes; could you elaborate on...")
*   **Auto-Recovery:** IndexedDB local caching to prevent data loss during network hiccups.

### Step 3: AI Analysis (The Intelligence Layer)
Our evaluation engine uses a tiered processing model:
1.  **Level 1 (Signal Extraction):** STT (Transcription), Sentiment Analysis, and Audio Feature extraction (Detecting filler words: *uhm, like, basically*).
2.  **Level 2 (Contextual Mapping):** Mapping transcript segments to the **STAR method** (Situation, Task, Action, Result).
3.  **Level 3 (Bias-Aware Scoring):** Scoring against the predefined rubric while masking PII.
4.  **Level 4 (Fraud Check):** Cross-referencing audio patterns and metadata to identify "collusion" or external aids.

### Step 4: Feedback & Scoring
*   **Automated Scorecard:** Categorized breakdown (Technical, Soft Skills, Communication).
*   **Coachable Insights:** Personalized video clips with "Play-by-play" AI coaching for candidates.
*   **Decision Support:** A "Comparison Matrix" for recruiters to see how candidates stack up at a glance.

---

## 3. Data Schema (Core Entities)

```sql
-- Core Tables for Scalability
CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id),
    title TEXT NOT NULL,
    config JSONB, -- Time limits, difficulty, AI persona
    rubric JSONB, -- Scoring weights for Level 3 Analysis
    created_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY,
    interview_id UUID REFERENCES interviews(id),
    candidate_id UUID REFERENCES users(id),
    video_url TEXT, -- S3/Blob Path
    transcript TEXT,
    status VARCHAR DEFAULT 'in_progress', -- pending_analysis, completed
    integrity_score FLOAT -- Fraud/Cheat detection metric
);

CREATE TABLE evaluation_metrics (
    id UUID PRIMARY KEY,
    session_id UUID REFERENCES sessions(id),
    category VARCHAR, -- 'technical', 'fluency', 'sentiment'
    score FLOAT,
    evidence TEXT -- The specific quote/action that justified the score
);
```

---

## 4. AI Prompt Strategy (Standard Template)
To maintain consistency, our prompts use a **Chain-of-Thought (CoT)** structure:

```markdown
SYSTEM PROMPT:
You are an expert technical recruiter specializing in [ROLE]. 
Analyze the following transcript based on this rubric: [RUBRIC_JSON].
Follow these steps:
1. Extract the main technical concepts mentioned.
2. Evaluate the STAR method adherence for behavioral questions.
3. Identify 3 specific strengths and 2 areas for growth.
4. Provide a bias-free score from 1-10 for each category.
OUTPUT: Strict JSON format matching Schema X.
```

---

## 5. Modern Tech Stack Recommendation

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | Next.js (Tailwind + Framer) | Server-side rendering for SEO (Landing) + Immersive UI. |
| **Backend** | Python (FastAPI) | High-performance async handling for AI processing. |
| **Database** | PostgreSQL + pgvector | Relational data + Vector search for question similarity. |
| **AI Models** | OpenAI Whisper + GPT-4o-mini | Gold standard for cost-effective transcription and logic. |
| **Streaming** | LiveKit / WebRTC | Industry-standard low-latency video infrastructure. |
| **Infrastructure** | Vercel (Edge) + AWS (Media) | Global availability with dedicated heavy computation. |

---

## 6. Non-Functional Requirements & Security
*   **Bias Mitigation:** Human-in-the-loop (HITL) calibration for AI scoring. 
*   **Compliance:** GDPR-ready (Right to Erasure, Data Portability). 
*   **Scalability:** Horizontal scaling of AI inference using K8s-based worker nodes.
*   **Explainable AI:** Every score must include a text-based "Justification String" citing parts of the transcript.

---

## 7. Strategic Roadmap
1.  **Q1 (The Core):** Basic video recording + Whisper transcription + Simple Rubric grading.
2.  **Q2 (The Intelligence):** Dynamic question branching + Resume-to-Interview auto-config.
3.  **Q3 (The Scale):** Enterprise integrations (Greenhouse/Lever) + Custom AI Personality training.
4.  **Q4 (The Ecosystem):** Candidate Prep Marketplace + Corporate Benchmarking Analytics.
