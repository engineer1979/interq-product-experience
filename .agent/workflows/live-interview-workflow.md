---
description: Detailed step-by-step workflow for conducting a live interview on InterQ
---

# Live Interview Workflow: Step-by-Step Guide

This workflow outlines the comprehensive process for conducting a live interview using InterQ's suite of products (AI Interviewing, Live Assessments, and Solution Analysis). It ensures a premium experience for candidates while providing deep analytics for recruiters.

---

## 👥 Roles & Responsibilities

| Role | Responsibility |
| :--- | :--- |
| **Host** (Recruiter/Employer) | Oversees the session, manages scheduling, and reviews final reports. |
| **Interviewer** (Expert/AI) | Leads the conversation using the `InteractiveInterview` console. |
| **Guest** (Candidate) | Participates in the interview via the `LiveInterview` interface. |
| **Tech Support** (System Admin) | Ensures stable connection, microphone permissions, and API availability. |
| **Moderator** (Optional) | Manages real-time audience engagement (chat/Q&A) in high-profile sessions. |

---

## 🛠️ Workflow Stages

### 1. Pre-Interview Planning & Scheduling
*Goal: Define the technical and cognitive rubric for the session.*
*   **Action**: Navigate to the **Neural Generator** (`/create-interview`).
*   **Step 1.1**: Enter a unique **Session Identifier** (e.g., "Senior Full Stack - Q1 Intake").
*   **Step 1.2**: Select the **Job Archetype** to load the corresponding AI technical model.
*   **Step 1.3**: Set **Cognitive Depth** (Standard, Advanced, or Expert) and **Session duration**.
*   **Step 1.4**: Click **Sync with AI** to synthesize the MCQ and Coding payloads.

### 2. Technical Setup & Testing
*Goal: Ensure a frictionless entry for the guest and interviewer.*
*   **Action**: Access the **Technical Console** within the interview link.
*   **Step 2.1**: **Microphone Permission**: The system triggers `requestMicrophonePermission` automatically.
*   **Step 2.2**: **Audio Check**: Use the `AudioVisualizer` component to confirm real-time level monitoring.
*   **Step 2.3**: **Connectivity Sync**: Verify `supabase` Realtime connection is active for live status updates.

### 3. Guest Onboarding & Briefing
*Goal: Prepare the candidate for the live experience.*
*   **Action**: The Guest reaches the **Intro Stage** (`status: 'intro'`).
*   **Step 3.1**: Display clear instructions: 2-minute response limits, clear speech requirements, and re-record options.
*   **Step 3.2**: Guest clicks **Start Interview** to transition to the live question bank.

### 4. Live Interview Execution
*Goal: Conduct a high-engagement, real-time evaluation.*
*   **Action**: Use the **Intelligence Console** (`/live-interview` or `/ai-interview`).
*   **Step 4.1**: **Question Delivery**: The system presents the question via text and TTS (AI Voice).
*   **Step 4.2**: **Real-Time Recording**: Trigger `startRecording`. The system captures audio chunks via `MediaRecorder`.
*   **Step 4.3**: **Visual Engagement**: Maintain active visualization to signal the "Listening" state to the guest.
*   **Step 4.4**: **Transition**: Once stop is clicked, the system moves to the **Processing** status to analyze sentiment and technical accuracy.

### 5. Audience Interaction & Moderation (If Applicable)
*Goal: Engage stakeholders without disrupting the flow.*
*   **Action**: Activate the **Engagement Sidebar**.
*   **Step 5.1**: Use the **Chat Console** for back-channel communication between Host and Interviewer.
*   **Step 5.2**: Capture **Reactions** (Sentiment Badges) during key guest responses.
*   **Step 5.3**: Filter Q&A through the moderator before presenting to the interviewer.

### 6. Contingency & Error Handling
*Goal: Maintain session integrity during technical failures.*
*   **Action**: Automatic **Trigger-Response** system.
*   **Step 6.1**: **Mic Error**: If permissions or input fails, trigger a "Voice Error" toast with browser settings guidance.
*   **Step 6.2**: **Refresh Recovery**: The system uses `localStorage` or `supabase` session states to resume from the last completed question.
*   **Step 6.3**: **Manual Override**: The Host can manually move the session to the next stage if a technical block occurs.

### 7. Post-Interview Wrap-Up & Content Processing
*Goal: Finalize data capture and signal completion.*
*   **Action**: Reach **Completed Status** (`status: 'completed'`).
*   **Step 7.1**: Automatically upload audio blobs and metadata to Supabase storage.
*   **Step 7.2**: Trigger the **AI Synthesis** to generate final performance feedback.
*   **Step 7.3**: Redirect Guest to the success page with a "Next Steps" overview.

### 8. Performance Review & Reporting
*Goal: Evaluate candidates with data-driven insights.*
*   **Action**: Navigate to the **Admin Dashboard** (`/admin/results`).
*   **Step 8.1**: Review individual question results and AI-generated scores.
*   **Step 8.2**: Access **Solution Analysis** for cross-candidate comparisons.
*   **Step 8.3**: Export **Intelligence Reports** for hiring committee distribution.

---

## 📈 Key Success Metrics
*   **Friction Score**: Number of technical issues vs. successful completions.
*   **Engagement Rate**: Frequency of real-time interactions/reactions.
*   **Accuracy Delta**: Alignment between AI scores and manual reviewer ratings.
