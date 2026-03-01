
import { cloudSecurityAssessment } from './cloudSecurityEngineerAssessment';
import { softwareEngineeringAssessment } from './softwareEngineeringAssessment';
import { devOpsAssessment } from './devOpsAssessment';
import { aiDataScienceAssessment } from './aiDataScienceAssessment';

export const globalITAssessmentSystem = {
    domains: [
        { id: "software-dev", name: "Software Development", questionCount: 200, category: "Development", tags: ["Full Stack", "Clean Code"], difficulty: "Medium", sampleTest: softwareEngineeringAssessment },
        { id: "frontend", name: "Frontend Development", questionCount: 200, category: "Development", tags: ["React", "CSS", "Performance"], difficulty: "Medium", sampleTest: softwareEngineeringAssessment },
        { id: "backend", name: "Backend Development", questionCount: 200, category: "Development", tags: ["Node.js", "Python", "Microservices"], difficulty: "Hard", sampleTest: softwareEngineeringAssessment },
        { id: "ai-ml", name: "AI / Machine Learning", questionCount: 200, category: "Data & AI", tags: ["Neural Networks", "Pandas", "PyTorch"], difficulty: "Hard", sampleTest: aiDataScienceAssessment },
        { id: "cyber-sec", name: "Cybersecurity", questionCount: 200, category: "Security", tags: ["SOC", "Ethical Hacking"], difficulty: "Hard", sampleTest: cloudSecurityAssessment },
        { id: "cloud-security", name: "Cloud Security", questionCount: 20, category: "Security", tags: ["IAM", "VPC", "WAF"], difficulty: "Hard", sampleTest: cloudSecurityAssessment },
        { id: "devops", name: "DevOps Engineering", questionCount: 200, category: "Infrastructure", tags: ["Kubernetes", "Docker", "CI/CD"], difficulty: "Hard", sampleTest: devOpsAssessment },
        { id: "db-admin", name: "Database Administrator", questionCount: 20, category: "Data & AI", tags: ["SQL", "NoSQL", "Query Optimization"], difficulty: "Medium", sampleTest: devOpsAssessment },
        { id: "mobile-app", name: "Mobile App Development", questionCount: 200, category: "Development", tags: ["Flutter", "React Native", "Swift"], difficulty: "Medium", sampleTest: softwareEngineeringAssessment },
        { id: "sys-admin", name: "System Administration", questionCount: 200, category: "Infrastructure", tags: ["Linux", "Windows Server", "Active Directory"], difficulty: "Medium", sampleTest: devOpsAssessment },
        { id: "qa-testing", name: "QA / Automation Testing", questionCount: 200, category: "Quality", tags: ["Selenium", "Jest", "Manual Testing"], difficulty: "Medium", sampleTest: softwareEngineeringAssessment },
        { id: "blockchain", name: "Blockchain Development", questionCount: 200, category: "Development", tags: ["Solidity", "Web3", "Ethereum"], difficulty: "Expert", sampleTest: softwareEngineeringAssessment },
        { id: "sre", name: "Site Reliability Engineering", questionCount: 200, category: "Infrastructure", tags: ["Observability", "SLOs", "Reliability"], difficulty: "Hard", sampleTest: devOpsAssessment },
        { id: "ui-ux", name: "UI/UX Design", questionCount: 150, category: "Design", tags: ["Figma", "User Research", "Prototyping"], difficulty: "Medium" }
    ]
};
