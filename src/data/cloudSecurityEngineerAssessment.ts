export const cloudSecurityAssessment = {
    title: "Cloud Security Engineer - Advanced Assessment",
    role: "Cloud Security Engineer",
    difficulty: "Hard",
    duration_minutes: 60,
    description: "A comprehensive assessment for Cloud Security Engineers focusing on IAM architecture, advanced encryption strategies, threat detection, and multi-cloud compliance controls.",
    questions: [
        // 12 MCQs
        {
            id: "q1",
            type: "mcq",
            question: "In an AWS multi-account environment, what is the most secure way to enforce that no user can disable CloudTrail logging across the entire organization?",
            options: [
                "Create an IAM policy in each account and attach it to all users.",
                "Use AWS Organizations Service Control Policies (SCPs) with a Deny action on cloudtrail:StopLogging.",
                "Rely on AWS Config rules to auto-remediate and restart logging if stopped.",
                "Set up an SNS notification to alert the security team when logging stops."
            ],
            correctAnswer: "Use AWS Organizations Service Control Policies (SCPs) with a Deny action on cloudtrail:StopLogging.",
            explanation: "SCPs provide centralized control over the maximum available permissions for all accounts in an organization, bypassing even local administrator permissions."
        },
        {
            id: "q2",
            type: "mcq",
            question: "Which encryption mechanism provides the highest level of security for data in transit within a Kubernetes cluster by ensuring only authorized pods can communicate?",
            options: [
                "TLS termination at the Ingress Controller.",
                "Mutual TLS (mTLS) implemented via a Service Mesh (e.g., Istio or Linkerd).",
                "Encrypted EBS volumes for the worker nodes.",
                "Using HTTPS for API server communication."
            ],
            correctAnswer: "Mutual TLS (mTLS) implemented via a Service Mesh (e.g., Istio or Linkerd).",
            explanation: "mTLS ensures that both the client and server verify each other's certificates, providing strong identity-based encryption between microservices."
        },
        {
            id: "q3",
            type: "mcq",
            question: "You are implementing 'Privileged Identity Management' (PIM) in Azure. What is the primary benefit of 'Just-In-Time' (JIT) access?",
            options: [
                "It eliminates the need for passwords.",
                "It reduces the risk of long-standing 'standing access' by granting permissions only when needed for a limited time.",
                "It automatically rotates the global administrator password every 24 hours.",
                "It prevents users from accessing the Azure Portal from outside the corporate network."
            ],
            correctAnswer: "It reduces the risk of long-standing 'standing access' by granting permissions only when needed for a limited time.",
            explanation: "JIT access minimizes the attack surface by ensuring privileged roles are only active during specific maintenance windows or tasks."
        },
        {
            id: "q4",
            type: "mcq",
            question: "During a threat monitoring exercise, you notice 'DnsRequest' events in GuardDuty indicating communication with a known Command & Control (C2) server. Which log source is essential for investigating the specific EC2 instance's process that initiated the request?",
            options: [
                "VPC Flow Logs",
                "CloudTrail Logs",
                "Route 53 Resolver Query Logs",
                "OS-level EDR (Endpoint Detection and Response) or Sysinternals logs"
            ],
            correctAnswer: "OS-level EDR (Endpoint Detection and Response) or Sysinternals logs",
            explanation: "VPC and DNS logs tell you 'what' happened on the network, but only OS-level logs can identify the specific binary or process that made the call."
        },
        {
            id: "q5",
            type: "mcq",
            question: "What is the security implication of using 'Confidential Computing' (Tee/Enclaves) in a cloud environment?",
            options: [
                "It encrypts data at rest using AES-256.",
                "It protects data in use by keeping it encrypted while it is being processed in the CPU.",
                "It increases the latency of all API requests by 50%.",
                "It replaces the need for an Identity Provider (IdP)."
            ],
            correctAnswer: "It protects data in use by keeping it encrypted while it is being processed in the CPU.",
            explanation: "Confidential Computing ensures that even the cloud provider or a guest OS compromise cannot see the cleartext data while it's in the processor's memory."
        },
        {
            id: "q6",
            type: "mcq",
            question: "Which of the following best describes the 'Principle of Least Privilege' in the context of Cloud IAM?",
            options: [
                "Granting users the 'AdministratorAccess' policy for convenience.",
                "Using wildcard permissions (e.g., s3:*) to ensure operations don't break.",
                "Granting only the minimal set of permissions required to perform a specific task for the shortest duration necessary.",
                "Creating a single IAM role for all developers to share."
            ],
            correctAnswer: "Granting only the minimal set of permissions required to perform a specific task for the shortest duration necessary.",
            explanation: "Least privilege is a fundamental security concept that limits an entity's access to only what is strictly necessary, reducing the impact of a breach."
        },
        {
            id: "q7",
            type: "mcq",
            question: "In AWS KMS, what happens to data encrypted with a CMK if the CMK is scheduled for deletion and the 7-day waiting period passes?",
            options: [
                "AWS KMS will automatically decrypt the data using a backup key.",
                "The data becomes permanently unrecoverable unless a manual export was performed.",
                "The data is re-encrypted with the AWS Managed Key for that service.",
                "The CMK enters a 'Supended' state and can be recovered within 30 days."
            ],
            correctAnswer: "The data becomes permanently unrecoverable unless a manual export was performed.",
            explanation: "Once a CMK is deleted, there is no way to decrypt data that was encrypted with it. AWS enforces a mandatory waiting period to prevent accidental loss."
        },
        {
            id: "q8",
            type: "mcq",
            question: "Which Google Cloud Service is best suited for identifying and protecting sensitive data like PII (Personally Identifiable Information) at scale?",
            options: [
                "Cloud IAM",
                "Cloud DLP (Data Loss Prevention)",
                "Cloud Armor",
                "Cloud Key Management Service"
            ],
            correctAnswer: "Cloud DLP (Data Loss Prevention)",
            explanation: "Cloud DLP provides tools to discover, classify, and redact sensitive data across various GCP storage and database services."
        },
        {
            id: "q9",
            type: "mcq",
            question: "For a highly regulated environment requiring FIPS 140-2 Level 3 compliance for key storage, which cloud solution should be used?",
            options: [
                "Software-backed Cloud KMS",
                "Cloud HSM (Hardware Security Module)",
                "Standard S3 Server-Side Encryption",
                "Managed Active Directory"
            ],
            correctAnswer: "Cloud HSM (Hardware Security Module)",
            explanation: "HSMs provide higher security assurance and physical tamper-resistance required for Level 3 compliance, unlike standard software KMS."
        },
        {
            id: "q10",
            type: "mcq",
            question: "In a 'Zero Trust' architecture, what is the primary factor used to grant access to a resource?",
            options: [
                "The user's location (Source IP).",
                "The user's group membership in Active Directory.",
                "A combination of user identity, device health, and context-based risk scores.",
                "Being connected to the company VPN."
            ],
            correctAnswer: "A combination of user identity, device health, and context-based risk scores.",
            explanation: "Zero Trust assumes no implicit trust and evaluates multiple signals (Identity, Device, Context) for every access request."
        },
        {
            id: "q11",
            type: "mcq",
            question: "What is the primary function of a Cloud Access Security Broker (CASB)?",
            options: [
                "To provide a high-speed connection between on-premise and the cloud.",
                "To act as a policy enforcement point between cloud service consumers and cloud service providers.",
                "To manage the physical security of the cloud data centers.",
                "To replace the traditional firewall in a VPC."
            ],
            correctAnswer: "To act as a policy enforcement point between cloud service consumers and cloud service providers.",
            explanation: "CASBs help organizations extend their security policies from on-premise infrastructure to the cloud (SaaS, PaaS, IaaS)."
        },
        {
            id: "q12",
            type: "mcq",
            question: "Which type of cloud 'Shared Responsibility' model usually places the most security burden on the customer?",
            options: [
                "SaaS (Software as a Service)",
                "PaaS (Platform as a Service)",
                "IaaS (Infrastructure as a Service)",
                "Serverless"
            ],
            correctAnswer: "IaaS (Infrastructure as a Service)",
            explanation: "In IaaS, the customer is responsible for a large portion of the stack, including the OS, applications, and data security."
        },

        // 5 Scenario-based questions
        {
            id: "q13",
            type: "scenario",
            question: "Scenario: A financial services firm is migrating their core transaction database to the cloud. They require 'Bring Your Own Key' (BYOK) for compliance. During the transition, an auditor discovers that the database snapshots are not encrypted. What is the most likely architectural gap?",
            options: [
                "The CMK was never created.",
                "The 'Copy Snapshot' operation was performed without specifying an encryption key.",
                "The database engine does not support encryption at rest.",
                "Snapshot encryption must be enabled in the IdP, not the Cloud Console."
            ],
            correctAnswer: "The 'Copy Snapshot' operation was performed without specifying an encryption key.",
            explanation: "Many cloud providers require explicit encryption settings during snapshot creation or copying; if the default is 'none', snapshots may remain unencrypted even if the DB is encrypted."
        },
        {
            id: "q14",
            type: "scenario",
            question: "Scenario: An organization detects an unauthorized user accessing an S3 bucket. Investigation shows the user logged in using a valid developer's credentials from an unknown IP. MFA was enabled for the developer. How could this happen?",
            options: [
                "The attacker brute-forced the MFA token.",
                "The attacker used an 'MFA Bypass' exploit in AWS.",
                "The developer's long-term access keys was leaked and used via CLI (which may not always enforce MFA depending on the policy).",
                "The S3 bucket policy was set to 'Public'."
            ],
            correctAnswer: "The developer's long-term access keys was leaked and used via CLI (which may not always enforce MFA depending on the policy).",
            explanation: "Standard IAM policies often allow CLI access via Access Keys without enforcing MFA unless explicitly required in the policy condition (e.g., 'aws:MultiFactorAuthPresent')."
        },
        {
            id: "q15",
            type: "scenario",
            question: "Scenario: Your SOC alerts you to an unusual amount of outbound traffic from a public-facing web server to an external IP on port 443. The web server has a Security Group allowing 80/443 inbound and 'All Traffic' outbound. What is your immediate remediation step while preserving forensics?",
            options: [
                "Terminate the instance immediately.",
                "Update the Security Group to deny all outbound traffic to that specific external IP.",
                "Reboot the instance to clear the memory.",
                "Disable the network interface (ENI) entirely."
            ],
            correctAnswer: "Update the Security Group to deny all outbound traffic to that specific external IP.",
            explanation: "Updating a SG is immediate and non-destructive. Termination or rebooting loses volatile forensic evidence (RAM, active connections)."
        },
        {
            id: "q16",
            type: "scenario",
            question: "Scenario: A developer accidentally commits an IAM User Access Key to a public GitHub repository. Within seconds, you see unauthorized EC2 instances being launched. Describe the automated response workflow you would implement.",
            options: [
                "Delete the GitHub repository.",
                "Use a Lambda triggered by CloudWatch/GuardDuty to deactivate the Access Key, quarantine the instances, and notify the security team.",
                "Call the developer and ask them to change their password.",
                "Manually stop each instance in the console."
            ],
            correctAnswer: "Use a Lambda triggered by CloudWatch/GuardDuty to deactivate the Access Key, quarantine the instances, and notify the security team.",
            explanation: "Automation is critical for 'leaked credential' scenarios. Deactivating the key immediately stops the attacker, and quarantine prevents further spread."
        },
        {
            id: "q17",
            type: "scenario",
            question: "Scenario: A high-traffic application is suffering from frequent 'Insecure Cryptographic Storage' vulnerabilities. The developers claim it's too difficult to manage keys for every user. What architectural solution provides per-user encryption without complex key management for developers?",
            options: [
                "Give every user an IAM Role.",
                "Implement Envelope Encryption using a service like AWS KMS or Azure Key Vault.",
                "Hardcode a master key in the application source code.",
                "Store all data in plaintext but restrict access via IAM."
            ],
            correctAnswer: "Implement Envelope Encryption using a service like AWS KMS or Azure Key Vault.",
            explanation: "Envelope encryption manages data keys for each record/user while protecting those data keys with a master key stored in the KMS, simplifying the dev workflow."
        },

        // 3 Short-answer technical questions
        {
            id: "q18",
            type: "short_answer",
            question: "Technical Concept: Explain the role of a 'Conditional Access' policy in a cloud environment and give one example of a condition.",
            correctAnswer: "A Conditional Access policy evaluates signals (like location, device health, or app risk) to decide whether to allow, block, or require extra verification (MFA) for a login attempt.",
            explanation: "Example: Requiring MFA if a user is logging in from a country they haven't visited before (unfamiliar location)."
        },
        {
            id: "q19",
            type: "short_answer",
            question: "Identity: What is the primary difference between an Identity Provider (IdP) and a Service Provider (SP) in a SAML-based SSO flow?",
            correctAnswer: "The IdP (e.g., Okta or Azure AD) authenticates the user and provides an assertion, while the SP (e.g., Salesforce or AWS) trusts that assertion to grant access to its service.",
            explanation: "IdP is the 'Source of Truth' for identity; SP is the 'Consumer' of that identity."
        },
        {
            id: "q20",
            type: "short_answer",
            question: "Networking/Monitoring: Define 'Lateral Movement' in a cloud security context and explain how VPC Flow Logs can help detect it.",
            correctAnswer: "Lateral movement is when an attacker moves from one compromised instance to another within the same network. VPC Flow Logs detect this by showing unexpected internal traffic patterns (e.g., SSH attempts from a Web Server to a Database Server).",
            explanation: "Internal traffic that doesn't follow normal application flows is a primary indicator of lateral movement."
        }
    ]
};
