
export const aiDataScienceAssessment = {
    title: "AI / Data Science - Machine Learning & Analytics",
    role: "Senior AI Engineer / Data Scientist",
    difficulty: "Hard",
    duration_minutes: 60,

    // SECTION 1: 20 LIVE INTERVIEW SCENARIOS (Sample)
    liveScenarios: [
        {
            id: "AI-01",
            scenario: "Your model shows 99% accuracy on training data but only 65% on test data.",
            problem: "Overfitting on training set.",
            analysis: "Candidate should analyze regularization (L1/L2), dropout, or data augmentation.",
            probing: "How would you determine if the issue is high variance or high bias using learning curves?",
            skill: "Model Validation",
            difficulty: "Medium",
            answerOutline: "Discuss Overfitting. Suggest Cross-validation. Suggest adding more data or reducing model complexity."
        },
        {
            id: "AI-02",
            scenario: "You are deploying a Large Language Model (LLM) in production, but the latency is 5 seconds per request.",
            problem: "High inference latency.",
            analysis: "Analyze Quantization, Distillation, or GPU acceleration.",
            probing: "Can you explain the trade-off between model quantization and accuracy for a transformer-based model?",
            skill: "AI Infrastructure",
            difficulty: "Hard",
            answerOutline: "Use FP16 or INT8 quantization. Implement Batching. Use ONNX Runtime or TensorRT. Discuss Model Distillation."
        }
    ],

    // SECTION 3: 20-QUESTION SAMPLE TEST
    questions: [
        {
            id: "ai-q1",
            question_text: "What does the 'R' in RAG (Retrieval-Augmented Generation) stand for?",
            type: "mcq",
            options: ["Recurrent", "Retrieval", "Regression", "Reinforcement"],
            correctAnswer: "Retrieval",
            explanation: "RAG involves retrieving relevant documents before generating a response.",
            points: 5
        },
        {
            id: "ai-q6",
            question_text: "In a classification problem with highly imbalanced classes (99:1), which metric is the LEAST useful?",
            type: "mcq",
            options: ["F1-Score", "Precision", "Accuracy", "Recall"],
            correctAnswer: "Accuracy",
            explanation: "In imbalanced datasets, accuracy can be misleadingly high even if the model fails to predict the minority class.",
            points: 5
        },
        {
            id: "ai-q11",
            question_text: "Write a Python snippet using 'pandas' to calculate the mean of column 'A' grouped by column 'B' in a DataFrame 'df'.",
            type: "coding",
            starter_code: "import pandas as pd\ndef get_mean(df):\n  # Your code here\n}",
            correctAnswer: "return df.groupby('B')['A'].mean()",
            explanation: "Standard pandas syntax for group-by aggregation.",
            points: 10
        }
    ]
};
