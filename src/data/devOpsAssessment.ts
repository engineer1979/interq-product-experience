
export const devOpsAssessment = {
    title: "DevOps & SRE - Infrastructure and Automation",
    role: "Senior DevOps Engineer / SRE",
    difficulty: "Hard",
    duration_minutes: 60,

    // SECTION 1: 20 LIVE INTERVIEW SCENARIOS (Sample)
    liveScenarios: [
        {
            id: "DO-01",
            scenario: "A Kubernetes deployment is stuck in 'ImagePullBackOff' even though the image exists in the registry.",
            problem: "Deployment failure in K8s.",
            analysis: "Analyze RBAC, pull-secrets, network policies, or registry rate limiting.",
            probing: "How would you debug if the issue is at the node level or the registry level?",
            skill: "Kubernetes Troubleshooting",
            difficulty: "Medium",
            answerOutline: "Check 'kubectl describe pod'. Verify 'imagePullSecrets'. Check node's internet access. Verify registry credentials."
        },
        {
            id: "DO-02",
            scenario: "The production database is slow during peak hours. You notice high I/O wait times but CPU usage is low.",
            problem: "Database Performance Bottleneck.",
            analysis: "Candidate should analyze disk throughput (IOPS limits), swap usage, or network latency.",
            probing: "If you are on AWS EBS, what specific cloud-native metric would you look at for burst performance?",
            skill: "Site Reliability Engineering",
            difficulty: "Hard",
            answerOutline: "Check 'Burst Balance' on EBS. Evaluate Read Replicas. Consider migrating to Provisioned IOPS (io2) or increasing volume size for gp3."
        }
    ],

    // SECTION 3: 20-QUESTION SAMPLE TEST
    questions: [
        {
            id: "do-q1",
            question_text: "What is the primary difference between 'Rolling Update' and 'Blue-Green' deployment?",
            type: "mcq",
            options: [
                "Rolling update requires two full environments, Blue-Green does not",
                "Blue-Green requires two full environments, Rolling update updates pods incrementally",
                "Rolling update allows for zero-time rollback, Blue-Green does not",
                "There is no difference"
            ],
            correctAnswer: "Blue-Green requires two full environments, Rolling update updates pods incrementally",
            explanation: "Blue-Green switches traffic between two environments. Rolling update replaces pods one by one.",
            points: 5
        },
        {
            id: "do-q6",
            question_text: "Your CI/CD pipeline is taking 45 minutes to run. Most of the time is spent on 'npm install' and 'docker build'. How do you optimize this?",
            type: "scenario",
            options: [
                "Delete the CI/CD cache after every run",
                "Use Multi-stage Docker builds and implement Layer Caching",
                "Run the pipeline less frequently",
                "Increase the CPU of the CI runner"
            ],
            correctAnswer: "Use Multi-stage Docker builds and implement Layer Caching",
            explanation: "Docker layer caching and multi-stage builds significantly reduce build time by only rebuilding changed layers.",
            points: 5
        },
        {
            id: "do-q11",
            question_text: "Write a simple Terraform block to create an S3 bucket named 'my-secure-bucket' with private ACL.",
            type: "coding",
            starter_code: "resource \"aws_s3_bucket\" \"b\" {\n  # Your code here\n}",
            correctAnswer: "resource \"aws_s3_bucket\" \"b\" {\n  bucket = \"my-secure-bucket\"\n  acl    = \"private\"\n}",
            explanation: "Basic IAC syntax for defining an AWS S3 bucket resource.",
            points: 10
        }
    ]
};
