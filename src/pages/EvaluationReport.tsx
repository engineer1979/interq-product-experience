import React from "react";

const reportData = {
  candidateName: "Rahul Vaidya",
  interviewType: "Programming Assessment",
  sessionDate: "18 January 2024",
  overallScore: 490,
  totalPossible: 490,
  percentage: 100,
  status: "Shortlisted",
  questions: [
    { title: "Valid Parentheses", score: 80, total: 80, testCases: "9/9", result: "Passed" },
    { title: "Game with Stones Weights", score: 90, total: 90, testCases: "10/10", result: "Passed" },
    { title: "Zero One Pattern-2", score: 40, total: 40, testCases: "5/5", result: "Passed" },
    { title: "Self Dividing Numbers", score: 90, total: 90, testCases: "10/10", result: "Passed" },
    { title: "Absent Number", score: 100, total: 100, testCases: "11/11", result: "Passed" },
    { title: "Arrange the Heights", score: 90, total: 90, testCases: "10/10", result: "Passed" },
  ],
};

export default function EvaluationReport() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Evaluation Report</h1>
      <h2>{reportData.candidateName}</h2>
      <p><strong>Interview Type:</strong> {reportData.interviewType}</p>
      <p><strong>Date:</strong> {reportData.sessionDate}</p>
      <p><strong>Status:</strong> {reportData.status}</p>
      <h2>Overall Score: {reportData.overallScore}/{reportData.totalPossible} ({reportData.percentage}%)</h2>
      <h3>Question Breakdown</h3>
      <ul>
        {reportData.questions.map((q, index) => (
          <li key={index}>
            {q.title} - {q.score}/{q.total} ({q.testCases} test cases) - {q.result}
          </li>
        ))}
      </ul>
    </div>
  );
}
