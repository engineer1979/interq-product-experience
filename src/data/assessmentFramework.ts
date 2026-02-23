
// SECTION 4: SCORING & EVALUATION RUBRIC
export const evaluationRubrics = {
    junior: {
        name: "Junior Hiring Rubric",
        threshold: 60,
        weights: {
            technicalDepth: 50,
            problemSolving: 30,
            communication: 20,
            architectureThinking: 0,
            securityAwareness: 0
        }
    },
    mid: {
        name: "Mid-Level Hiring Rubric",
        threshold: 75,
        weights: {
            technicalDepth: 40,
            problemSolving: 30,
            communication: 10,
            architectureThinking: 10,
            securityAwareness: 10
        }
    },
    senior: {
        name: "Senior Hiring Rubric",
        threshold: 85,
        weights: {
            technicalDepth: 30,
            problemSolving: 20,
            communication: 10,
            architectureThinking: 20,
            securityAwareness: 20
        }
    }
};

// SECTION 5: ADAPTIVE TESTING LOGIC
export const adaptiveTestingLogic = {
    model: "3-Tier Progressive Difficulty",
    rules: [
        {
            condition: "score > 80% in first 10 questions",
            action: "increase difficulty to 'Hard/Expert'",
            rationale: "Candidate shows mastery of fundamentals."
        },
        {
            condition: "score < 50%",
            action: "moderate level to 'Easy/Medium'",
            rationale: "Identify the candidate's core competency baseline."
        },
        {
            condition: "fail 3 practical tasks",
            action: "insert debugging scenario",
            rationale: "Test granular troubleshooting skills when implementation fails."
        }
    ]
};

// SECTION 6: LMS / ATS EXPORT FORMAT
export const exportFormats = {
    jsonSchema: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "AssessmentResult",
        "type": "object",
        "properties": {
            "candidateId": { "type": "string" },
            "assessmentId": { "type": "string" },
            "score": { "type": "number" },
            "skillMapping": {
                "type": "object",
                "additionalProperties": { "type": "number" }
            },
            "verdict": { "type": "string", "enum": ["Hire", "No Hire", "Strong Hire"] }
        }
    },
    excelColumns: [
        "Candidate Name", "Email", "Assessment ID", "Total Score", "Difficulty Level", "Time Taken", "Passed"
    ],
    atsTagging: ["Role:Senior", "Domain:DevOps", "Status:Shortlisted"]
};
