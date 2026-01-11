
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const interviews = [
    {
        title: 'Software Engineer Behavioral Interview',
        job_role: 'Software Engineer',
        description: 'Comprehensive behavioral assessment covering problem-solving, debugging, code quality, collaboration, and continuous learning for Software Engineer positions.',
        questions: [
            { question_text: 'Tell me about a time when you had to debug a particularly challenging issue in production. What was your approach and how did you resolve it?', difficulty: 'medium', points: 10, options: { evaluates: 'Problem-solving, debugging skills, and ability to work under pressure', look_for: 'Systematic debugging approach, use of tools/logs, root cause analysis, and preventive measures implemented' } },
            { question_text: 'Describe a situation where you had to make a trade-off between code quality and meeting a deadline. How did you handle it?', difficulty: 'medium', points: 10, options: { evaluates: 'Decision-making, understanding of technical debt, and communication skills', look_for: 'Weighing pros/cons, stakeholder communication, documentation of shortcuts, and plans to address technical debt later' } },
            { question_text: 'Walk me through how you would design a system to handle 10 million users. What technologies would you choose and why?', difficulty: 'hard', points: 10, options: { evaluates: 'System design skills, scalability knowledge, and architectural thinking', look_for: 'Discussion of load balancing, caching, database sharding, microservices, CDNs, and justification for technology choices' } },
            { question_text: 'Tell me about a time you had to learn a new technology or framework quickly for a project. How did you approach it?', difficulty: 'easy', points: 10, options: { evaluates: 'Learning agility, self-motivation, and adaptability', look_for: 'Structured learning approach, use of documentation/tutorials, hands-on practice, and successful application to the project' } },
            { question_text: 'Describe a code review where you disagreed with a colleague\'s approach. How did you handle the situation?', difficulty: 'medium', points: 10, options: { evaluates: 'Collaboration, communication, and ability to give/receive feedback', look_for: 'Respectful communication, technical reasoning, willingness to listen, and collaborative problem-solving' } },
            { question_text: 'How do you ensure your code is maintainable and readable for other developers on your team?', difficulty: 'easy', points: 10, options: { evaluates: 'Code quality awareness, team collaboration, and best practices knowledge', look_for: 'Mentions of naming conventions, comments, documentation, design patterns, testing, and code reviews' } },
            { question_text: 'Tell me about a time when you identified and fixed a security vulnerability in your code or system.', difficulty: 'hard', points: 10, options: { evaluates: 'Security awareness, proactive thinking, and attention to detail', look_for: 'Understanding of common vulnerabilities (SQL injection, XSS, etc.), security testing practices, and remediation steps' } },
            { question_text: 'Describe your experience with testing. How do you decide what to test and what testing strategies do you use?', difficulty: 'medium', points: 10, options: { evaluates: 'Quality assurance mindset, testing knowledge, and thoroughness', look_for: 'Unit tests, integration tests, test coverage considerations, TDD/BDD practices, and edge case thinking' } },
            { question_text: 'Tell me about a time you optimized the performance of an application or feature. What was the problem and what improvements did you achieve?', difficulty: 'hard', points: 10, options: { evaluates: 'Performance optimization skills, analytical thinking, and results orientation', look_for: 'Performance profiling, identification of bottlenecks, specific optimizations made, and measurable improvements (metrics)' } },
            { question_text: 'How do you stay current with new technologies and industry trends in software development?', difficulty: 'easy', points: 10, options: { evaluates: 'Continuous learning, passion for technology, and professional development', look_for: 'Specific resources (blogs, conferences, courses), side projects, open-source contributions, and application of new knowledge' } }
        ]
    },
    {
        title: 'Product Manager Behavioral Interview',
        job_role: 'Product Manager',
        description: 'Comprehensive behavioral assessment covering prioritization, product validation, stakeholder management, data-driven decisions, and strategic thinking for Product Manager positions.',
        questions: [
            { question_text: 'Tell me about a product feature you championed that didn\'t perform as expected. What happened and what did you learn?', difficulty: 'medium', points: 10, options: { evaluates: 'Accountability, data-driven thinking, and ability to learn from failure', look_for: 'Honest assessment, analysis of why it failed, metrics used, pivoting decisions, and lessons applied to future work' } },
            { question_text: 'Describe a situation where you had to prioritize between multiple high-priority features with limited resources. How did you make the decision?', difficulty: 'hard', points: 10, options: { evaluates: 'Prioritization skills, strategic thinking, and stakeholder management', look_for: 'Framework used (RICE, MoSCoW, etc.), data/user research considered, stakeholder input, and clear rationale' } },
            { question_text: 'Walk me through how you would validate a new product idea before investing significant development resources.', difficulty: 'medium', points: 10, options: { evaluates: 'Product validation skills, user research methodology, and lean thinking', look_for: 'User interviews, surveys, prototypes/MVPs, A/B testing, market research, and success metrics definition' } },
            { question_text: 'Tell me about a time when engineering pushed back on a feature you wanted to build. How did you handle it?', difficulty: 'medium', points: 10, options: { evaluates: 'Cross-functional collaboration, technical understanding, and negotiation skills', look_for: 'Active listening, understanding technical constraints, finding alternatives, and collaborative problem-solving' } },
            { question_text: 'Describe how you\'ve used data and analytics to inform a product decision. What was the outcome?', difficulty: 'medium', points: 10, options: { evaluates: 'Data literacy, analytical thinking, and decision-making', look_for: 'Specific metrics tracked, analysis methods, insights derived, action taken, and measurable results' } },
            { question_text: 'Tell me about a time you had to say \'no\' to a stakeholder\'s feature request. How did you communicate that decision?', difficulty: 'hard', points: 10, options: { evaluates: 'Communication skills, strategic alignment, and ability to manage expectations', look_for: 'Clear reasoning, alignment with product strategy, empathy, alternative solutions offered, and relationship preservation' } },
            { question_text: 'How would you approach launching a product in a market where competitors already have established solutions?', difficulty: 'hard', points: 10, options: { evaluates: 'Competitive strategy, market analysis, and differentiation thinking', look_for: 'Competitive analysis, unique value proposition, target audience segmentation, go-to-market strategy, and positioning' } },
            { question_text: 'Describe your process for gathering and incorporating user feedback into the product roadmap.', difficulty: 'easy', points: 10, options: { evaluates: 'User-centric thinking, feedback management, and roadmap planning', look_for: 'Multiple feedback channels, synthesis methods, prioritization of feedback, communication back to users, and iteration process' } },
            { question_text: 'Tell me about a time you had to balance short-term business goals with long-term product vision.', difficulty: 'hard', points: 10, options: { evaluates: 'Strategic thinking, business acumen, and ability to manage competing priorities', look_for: 'Understanding of both perspectives, trade-off analysis, stakeholder alignment, and sustainable approach' } },
            { question_text: 'How do you define and measure success for a product or feature you\'re responsible for?', difficulty: 'medium', points: 10, options: { evaluates: 'Metrics definition, goal-setting, and results orientation', look_for: 'Specific KPIs, leading vs. lagging indicators, user satisfaction metrics, business impact, and tracking methods' } }
        ]
    },
    {
        title: 'Data Analyst Behavioral Interview',
        job_role: 'Data Analyst',
        description: 'Comprehensive behavioral assessment covering analytical methodology, data quality, A/B testing, visualization, and communication for Data Analyst positions.',
        questions: [
            { question_text: 'Tell me about a time when your analysis led to a significant business decision or change. What was your approach?', difficulty: 'medium', points: 10, options: { evaluates: 'Business impact, analytical methodology, and communication of insights', look_for: 'Clear problem definition, data sources used, analysis techniques, actionable insights, and measurable business outcomes' } },
            { question_text: 'Describe a situation where you discovered data quality issues. How did you identify them and what steps did you take?', difficulty: 'medium', points: 10, options: { evaluates: 'Data quality awareness, attention to detail, and problem-solving', look_for: 'Data validation techniques, root cause investigation, collaboration with data engineers, and implementation of quality checks' } },
            { question_text: 'Walk me through how you would analyze the cause of a sudden drop in user engagement on our platform.', difficulty: 'hard', points: 10, options: { evaluates: 'Analytical thinking, hypothesis generation, and systematic investigation', look_for: 'Segmentation analysis, cohort analysis, funnel analysis, external factors consideration, and structured approach' } },
            { question_text: 'Tell me about a time you had to explain complex analytical findings to non-technical stakeholders. How did you make it understandable?', difficulty: 'medium', points: 10, options: { evaluates: 'Communication skills, data visualization, and stakeholder management', look_for: 'Use of visualizations, storytelling, avoiding jargon, focusing on business impact, and checking for understanding' } },
            { question_text: 'Describe your experience with A/B testing. How do you design experiments and interpret results?', difficulty: 'hard', points: 10, options: { evaluates: 'Experimental design, statistical knowledge, and scientific thinking', look_for: 'Sample size calculation, randomization, statistical significance, practical significance, and consideration of confounding variables' } },
            { question_text: 'Tell me about a time when you had to work with incomplete or messy data. How did you handle it?', difficulty: 'medium', points: 10, options: { evaluates: 'Resourcefulness, data cleaning skills, and ability to work with constraints', look_for: 'Data cleaning techniques, imputation strategies, documentation of assumptions, and communication of limitations' } },
            { question_text: 'How do you decide which visualization type to use when presenting data to different audiences?', difficulty: 'easy', points: 10, options: { evaluates: 'Data visualization skills, audience awareness, and communication effectiveness', look_for: 'Understanding of chart types, audience consideration, clarity principles, and examples of effective visualizations created' } },
            { question_text: 'Describe a time when your initial hypothesis was proven wrong by the data. What did you do?', difficulty: 'easy', points: 10, options: { evaluates: 'Intellectual honesty, adaptability, and scientific mindset', look_for: 'Acceptance of findings, further investigation, revised hypothesis, and willingness to change direction based on evidence' } },
            { question_text: 'Tell me about your experience building dashboards or reports. How do you ensure they remain useful over time?', difficulty: 'medium', points: 10, options: { evaluates: 'Dashboard design, user needs understanding, and maintenance thinking', look_for: 'User requirements gathering, iterative design, automation, documentation, and feedback incorporation' } },
            { question_text: 'How do you prioritize multiple ad-hoc analysis requests when you have limited time?', difficulty: 'medium', points: 10, options: { evaluates: 'Time management, prioritization, and stakeholder communication', look_for: 'Impact assessment, urgency evaluation, stakeholder communication, setting expectations, and efficient workflow' } }
        ]
    },
    {
        title: 'Sales Representative Behavioral Interview',
        job_role: 'Sales Representative',
        description: 'Comprehensive behavioral assessment covering prospecting, objection handling, relationship building, quota achievement, and resilience for Sales Representative positions.',
        questions: [
            { question_text: 'Tell me about a time you lost a deal you thought you were going to win. What happened and what did you learn?', difficulty: 'medium', points: 10, options: { evaluates: 'Resilience, self-reflection, and ability to learn from setbacks', look_for: 'Honest assessment, analysis of what went wrong, lessons learned, and changes made to future approach' } },
            { question_text: 'Describe your approach to prospecting and building a pipeline of qualified leads.', difficulty: 'medium', points: 10, options: { evaluates: 'Prospecting skills, strategic thinking, and self-motivation', look_for: 'Multi-channel approach, qualification criteria, research methods, persistence, and pipeline management' } },
            { question_text: 'Walk me through how you would handle a prospect who says \'your price is too high\' during a sales conversation.', difficulty: 'hard', points: 10, options: { evaluates: 'Objection handling, value communication, and negotiation skills', look_for: 'Understanding underlying concerns, reframing to value, ROI discussion, creative solutions, and confidence' } },
            { question_text: 'Tell me about your most successful sale. What made it successful and what was your strategy?', difficulty: 'easy', points: 10, options: { evaluates: 'Sales methodology, relationship building, and strategic approach', look_for: 'Needs discovery, solution positioning, relationship development, closing techniques, and measurable success' } },
            { question_text: 'Describe a time when you had to collaborate with other teams (marketing, product, support) to close a deal.', difficulty: 'medium', points: 10, options: { evaluates: 'Cross-functional collaboration, teamwork, and resourcefulness', look_for: 'Proactive communication, leveraging resources, coordination skills, and appreciation for team contributions' } },
            { question_text: 'How do you manage your time and stay organized when juggling multiple deals at different stages?', difficulty: 'easy', points: 10, options: { evaluates: 'Time management, organization, and process discipline', look_for: 'CRM usage, prioritization system, follow-up discipline, and specific tools/methods used' } },
            { question_text: 'Tell me about a time you turned around a relationship with a difficult or skeptical prospect.', difficulty: 'hard', points: 10, options: { evaluates: 'Relationship building, persistence, and problem-solving', look_for: 'Active listening, empathy, addressing concerns, building trust, and patience' } },
            { question_text: 'Describe your approach to understanding a prospect\'s needs and pain points.', difficulty: 'medium', points: 10, options: { evaluates: 'Discovery skills, consultative selling, and active listening', look_for: 'Open-ended questions, active listening, research preparation, and connecting needs to solutions' } },
            { question_text: 'Tell me about a time you exceeded your sales quota. What strategies did you use?', difficulty: 'medium', points: 10, options: { evaluates: 'Results orientation, strategic planning, and work ethic', look_for: 'Specific strategies, activity metrics, pipeline management, and consistent execution' } },
            { question_text: 'How do you stay motivated during slow periods or after facing multiple rejections?', difficulty: 'easy', points: 10, options: { evaluates: 'Resilience, self-motivation, and mental toughness', look_for: 'Positive mindset, learning from rejection, activity focus, support systems, and long-term perspective' } }
        ]
    },
    {
        title: 'Marketing Manager Behavioral Interview',
        job_role: 'Marketing Manager',
        description: 'Comprehensive behavioral assessment covering campaign management, go-to-market strategy, attribution, brand positioning, and ROI optimization for Marketing Manager positions.',
        questions: [
            { question_text: 'Tell me about a marketing campaign that didn\'t perform as expected. How did you identify the issue and what did you do?', difficulty: 'medium', points: 10, options: { evaluates: 'Analytical skills, adaptability, and accountability', look_for: 'Performance metrics tracked, analysis of underperformance, pivoting decisions, and optimization efforts' } },
            { question_text: 'Describe how you\'ve used customer data and insights to inform a marketing strategy.', difficulty: 'medium', points: 10, options: { evaluates: 'Data-driven marketing, customer understanding, and strategic thinking', look_for: 'Data sources used, segmentation, persona development, insights derived, and strategy alignment' } },
            { question_text: 'Walk me through how you would develop a go-to-market strategy for a new product launch.', difficulty: 'hard', points: 10, options: { evaluates: 'Strategic planning, marketing knowledge, and comprehensive thinking', look_for: 'Target audience definition, positioning, channel strategy, messaging, timeline, budget, and success metrics' } },
            { question_text: 'Tell me about a time you had to manage a marketing campaign with a limited budget. How did you maximize impact?', difficulty: 'medium', points: 10, options: { evaluates: 'Resourcefulness, creativity, and ROI focus', look_for: 'Creative solutions, channel prioritization, organic strategies, partnerships, and measurable results' } },
            { question_text: 'Describe your experience with marketing attribution. How do you measure the effectiveness of different channels?', difficulty: 'hard', points: 10, options: { evaluates: 'Analytics skills, attribution knowledge, and measurement sophistication', look_for: 'Attribution models used, multi-touch attribution, tools/platforms, and data-driven optimization' } },
            { question_text: 'Tell me about a time you had to align marketing efforts with sales goals. What was your approach?', difficulty: 'medium', points: 10, options: { evaluates: 'Cross-functional collaboration, sales-marketing alignment, and business acumen', look_for: 'Communication with sales, shared metrics, lead quality focus, feedback loops, and collaborative planning' } },
            { question_text: 'How do you stay current with marketing trends and decide which ones are worth investing in?', difficulty: 'easy', points: 10, options: { evaluates: 'Continuous learning, trend awareness, and strategic judgment', look_for: 'Information sources, experimentation mindset, evaluation criteria, and examples of successful adoption' } },
            { question_text: 'Describe a time when you successfully repositioned a brand or product in the market.', difficulty: 'hard', points: 10, options: { evaluates: 'Brand strategy, market understanding, and change management', look_for: 'Market research, competitive analysis, messaging development, stakeholder buy-in, and execution' } },
            { question_text: 'Tell me about your experience managing a team or agency partners. How do you ensure quality and alignment?', difficulty: 'medium', points: 10, options: { evaluates: 'Leadership, vendor management, and quality control', look_for: 'Clear communication, goal-setting, feedback processes, relationship management, and accountability' } },
            { question_text: 'How do you balance brand-building activities with performance marketing and demand generation?', difficulty: 'hard', points: 10, options: { evaluates: 'Strategic balance, marketing mix understanding, and long-term thinking', look_for: 'Understanding of both approaches, budget allocation rationale, measurement of each, and integrated strategy' } }
        ]
    },
    {
        title: 'UX Designer Behavioral Interview',
        job_role: 'UX Designer',
        description: 'Comprehensive behavioral assessment covering user research, accessibility, design process, collaboration, and balancing user/business needs for UX Designer positions.',
        questions: [
            { question_text: 'Tell me about a time when user research findings contradicted your initial design assumptions. How did you respond?', difficulty: 'medium', points: 10, options: { evaluates: 'User-centric mindset, adaptability, and ego management', look_for: 'Acceptance of findings, design iteration, user empathy, and willingness to pivot based on evidence' } },
            { question_text: 'Describe a situation where you had to advocate for the user experience against business or technical constraints.', difficulty: 'hard', points: 10, options: { evaluates: 'Advocacy skills, communication, and balancing competing priorities', look_for: 'User impact articulation, data/research support, compromise solutions, and stakeholder influence' } },
            { question_text: 'Walk me through your process for designing a new feature from concept to final design.', difficulty: 'medium', points: 10, options: { evaluates: 'Design process, methodology, and comprehensive thinking', look_for: 'Research phase, ideation, wireframing, prototyping, testing, iteration, and handoff to development' } },
            { question_text: 'Tell me about a time you had to design for accessibility. What considerations did you make?', difficulty: 'medium', points: 10, options: { evaluates: 'Accessibility knowledge, inclusive design, and attention to detail', look_for: 'WCAG guidelines, screen readers, color contrast, keyboard navigation, and testing with diverse users' } },
            { question_text: 'Describe how you\'ve used data and analytics to validate or improve a design decision.', difficulty: 'medium', points: 10, options: { evaluates: 'Data-informed design, analytical thinking, and measurement', look_for: 'A/B testing, heatmaps, analytics tools, user behavior analysis, and iterative improvements' } },
            { question_text: 'Tell me about a time you received critical feedback on your design. How did you handle it?', difficulty: 'easy', points: 10, options: { evaluates: 'Receptiveness to feedback, collaboration, and professional maturity', look_for: 'Active listening, asking clarifying questions, non-defensive response, and constructive iteration' } },
            { question_text: 'How do you approach designing for multiple platforms or devices while maintaining consistency?', difficulty: 'hard', points: 10, options: { evaluates: 'Responsive design, design systems knowledge, and consistency thinking', look_for: 'Design systems, component libraries, responsive principles, platform-specific considerations, and scalability' } },
            { question_text: 'Describe a time when you had to simplify a complex user flow or interface. What was your approach?', difficulty: 'hard', points: 10, options: { evaluates: 'Simplification skills, information architecture, and user empathy', look_for: 'User journey mapping, prioritization, progressive disclosure, user testing, and measurable improvement' } },
            { question_text: 'Tell me about your experience collaborating with developers. How do you ensure your designs are implemented correctly?', difficulty: 'medium', points: 10, options: { evaluates: 'Cross-functional collaboration, communication, and quality assurance', look_for: 'Clear documentation, design specs, developer handoff process, collaboration tools, and QA involvement' } },
            { question_text: 'How do you balance user needs, business goals, and technical feasibility in your design decisions?', difficulty: 'hard', points: 10, options: { evaluates: 'Strategic thinking, stakeholder management, and holistic design approach', look_for: 'Understanding of all three perspectives, trade-off analysis, collaborative decision-making, and pragmatic solutions' } }
        ]
    }
];

async function seed() {
    console.log('Starting seed process...');

    // Get a user ID to assign as creator (using the first user found)
    const { data: users, error: userError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 });

    if (userError) {
        console.error('Error fetching users:', userError);
        // Fallback: try to find a user from profiles if admin API fails
        // But admin API should work with service role key
    }

    const userId = users?.users[0]?.id;

    if (!userId) {
        console.error('No users found to assign as creator. Please create a user first.');
        return;
    }

    console.log(`Using user ID: ${userId} as creator`);

    for (const interview of interviews) {
        console.log(`Creating interview: ${interview.title}`);

        // Check if interview already exists
        const { data: existing } = await supabase
            .from('interviews')
            .select('id')
            .eq('title', interview.title)
            .single();

        if (existing) {
            console.log(`Interview "${interview.title}" already exists. Skipping.`);
            continue;
        }

        // Create interview
        const { data: newInterview, error: createError } = await supabase
            .from('interviews')
            .insert({
                title: interview.title,
                job_role: interview.job_role,
                description: interview.description,
                duration_minutes: 60,
                is_published: true,
                questions: {}, // Empty JSONB as we use interview_questions table
                created_by: userId
            })
            .select()
            .single();

        if (createError) {
            console.error(`Error creating interview ${interview.title}:`, createError);
            continue;
        }

        console.log(`Created interview ID: ${newInterview.id}`);

        // Create questions
        const questionsToInsert = interview.questions.map((q, index) => ({
            interview_id: newInterview.id,
            question_type: 'mcq',
            question_text: q.question_text,
            difficulty: q.difficulty,
            points: q.points,
            order_index: index + 1,
            options: q.options
        }));

        const { error: questionsError } = await supabase
            .from('interview_questions')
            .insert(questionsToInsert);

        if (questionsError) {
            console.error(`Error creating questions for ${interview.title}:`, questionsError);
        } else {
            console.log(`Successfully added ${questionsToInsert.length} questions for ${interview.title}`);
        }
    }

    console.log('Seed process completed!');
}

seed().catch(console.error);
