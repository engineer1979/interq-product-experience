export interface SectionScores {
    pronunciation: number;
    fluency: number;
    content: number;
    vocabulary: number;
    grammar: number;
}

export interface AdminNote {
    id: string;
    timestamp: number;
    text: string;
    author: string;
    createdAt: string;
}

export interface CandidateResult {
    candidate_id: string;
    name: string;
    email: string;
    position: string;
    test_date: string;
    status: "completed" | "pending" | "failed" | "reviewed";
    overall_score: number;
    section_scores: SectionScores;
    recording_url: string;
    duration_seconds: number;
    ai_feedback: {
        strengths: string[];
        improvements: string[];
        summary: string;
    };
    admin_notes: AdminNote[];
    reviewed_by: string | null;
    reviewed_date: string | null;
}

export const mockCandidateResults: CandidateResult[] = [
    {
        candidate_id: "12345",
        name: "John Doe",
        email: "john.doe@example.com",
        position: "Senior React Developer",
        test_date: "2024-01-15T14:30:00Z",
        status: "completed",
        overall_score: 85,
        section_scores: {
            pronunciation: 82,
            fluency: 88,
            content: 90,
            vocabulary: 80,
            grammar: 85
        },
        recording_url: "https://actions.google.com/sounds/v1/speech/voice_male_1.ogg", // Sample audio
        duration_seconds: 420,
        ai_feedback: {
            strengths: ["Strong vocabulary usage", "Clear articulation", "Relevant technical examples"],
            improvements: ["Pacing could be more consistent", "Minor grammar slips in complex sentences"],
            summary: "John demonstrated a solid understanding of React principles. His communication is clear, though he tends to speak fast when excited."
        },
        admin_notes: [
            {
                id: "n1",
                timestamp: 45,
                text: "Great explanation of hooks here.",
                author: "Admin User",
                createdAt: "2024-01-16T10:00:00Z"
            }
        ],
        reviewed_by: "admin@company.com",
        reviewed_date: null
    },
    {
        candidate_id: "12346",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        position: "Frontend Engineer",
        test_date: "2024-01-14T09:15:00Z",
        status: "reviewed",
        overall_score: 92,
        section_scores: {
            pronunciation: 95,
            fluency: 90,
            content: 92,
            vocabulary: 88,
            grammar: 94
        },
        recording_url: "https://actions.google.com/sounds/v1/speech/voice_female_1.ogg",
        duration_seconds: 380,
        ai_feedback: {
            strengths: ["Excellent fluency", "Precise technical terminology", "Structured answers"],
            improvements: ["Could provide more concrete examples"],
            summary: "Jane is a top candidate. Her technical knowledge is deep and she communicates complex ideas effectively."
        },
        admin_notes: [],
        reviewed_by: "lead@company.com",
        reviewed_date: "2024-01-14T15:00:00Z"
    },
    {
        candidate_id: "12347",
        name: "Robert Johnson",
        email: "robert.j@example.com",
        position: "Full Stack Developer",
        test_date: "2024-01-16T11:00:00Z",
        status: "pending",
        overall_score: 0,
        section_scores: {
            pronunciation: 0,
            fluency: 0,
            content: 0,
            vocabulary: 0,
            grammar: 0
        },
        recording_url: "",
        duration_seconds: 0,
        ai_feedback: {
            strengths: [],
            improvements: [],
            summary: "Analysis pending."
        },
        admin_notes: [],
        reviewed_by: null,
        reviewed_date: null
    },
    {
        candidate_id: "12348",
        name: "Emily Davis",
        email: "emily.d@example.com",
        position: "UI/UX Designer",
        test_date: "2024-01-12T16:45:00Z",
        status: "failed",
        overall_score: 45,
        section_scores: {
            pronunciation: 50,
            fluency: 40,
            content: 45,
            vocabulary: 50,
            grammar: 40
        },
        recording_url: "https://actions.google.com/sounds/v1/speech/voice_female_2.ogg",
        duration_seconds: 120,
        ai_feedback: {
            strengths: ["Polite tone"],
            improvements: ["Lack of technical depth", "Frequent pauses", "Off-topic answers"],
            summary: "Candidate struggled with core concepts."
        },
        admin_notes: [],
        reviewed_by: "hr@company.com",
        reviewed_date: "2024-01-13T09:00:00Z"
    }
];
