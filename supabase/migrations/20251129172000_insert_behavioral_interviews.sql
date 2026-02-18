-- Insert Behavioral Interview Templates for 6 Roles
-- This migration creates pre-seeded behavioral interview templates

-- Software Engineer Behavioral Interview
WITH software_engineer_interview AS (
  INSERT INTO interviews (
    title, job_role, description, duration_minutes, is_published, questions,
    created_by
  ) VALUES (
    'Software Engineer Behavioral Interview',
    'Software Engineer',
    'Comprehensive behavioral assessment covering problem-solving, debugging, code quality, collaboration, and continuous learning for Software Engineer positions.',
    60,
    true,
    '{}'::jsonb,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO interview_questions (interview_id, question_type, question_text, difficulty, points, order_index, options)
SELECT id, 'mcq', question_text, difficulty, points, order_index, metadata
FROM software_engineer_interview, (VALUES
  ('Tell me about a time when you had to debug a particularly challenging issue in production. What was your approach and how did you resolve it?', 'medium', 10, 1, '{"evaluates": "Problem-solving, debugging skills, and ability to work under pressure", "look_for": "Systematic debugging approach, use of tools/logs, root cause analysis, and preventive measures implemented"}'::jsonb),
  ('Describe a situation where you had to make a trade-off between code quality and meeting a deadline. How did you handle it?', 'medium', 10, 2, '{"evaluates": "Decision-making, understanding of technical debt, and communication skills", "look_for": "Weighing pros/cons, stakeholder communication, documentation of shortcuts, and plans to address technical debt later"}'::jsonb),
  ('Walk me through how you would design a system to handle 10 million users. What technologies would you choose and why?', 'hard', 10, 3, '{"evaluates": "System design skills, scalability knowledge, and architectural thinking", "look_for": "Discussion of load balancing, caching, database sharding, microservices, CDNs, and justification for technology choices"}'::jsonb),
  ('Tell me about a time you had to learn a new technology or framework quickly for a project. How did you approach it?', 'easy', 10, 4, '{"evaluates": "Learning agility, self-motivation, and adaptability", "look_for": "Structured learning approach, use of documentation/tutorials, hands-on practice, and successful application to the project"}'::jsonb),
  ('Describe a code review where you disagreed with a colleague''s approach. How did you handle the situation?', 'medium', 10, 5, '{"evaluates": "Collaboration, communication, and ability to give/receive feedback", "look_for": "Respectful communication, technical reasoning, willingness to listen, and collaborative problem-solving"}'::jsonb),
  ('How do you ensure your code is maintainable and readable for other developers on your team?', 'easy', 10, 6, '{"evaluates": "Code quality awareness, team collaboration, and best practices knowledge", "look_for": "Mentions of naming conventions, comments, documentation, design patterns, testing, and code reviews"}'::jsonb),
  ('Tell me about a time when you identified and fixed a security vulnerability in your code or system.', 'hard', 10, 7, '{"evaluates": "Security awareness, proactive thinking, and attention to detail", "look_for": "Understanding of common vulnerabilities (SQL injection, XSS, etc.), security testing practices, and remediation steps"}'::jsonb),
  ('Describe your experience with testing. How do you decide what to test and what testing strategies do you use?', 'medium', 10, 8, '{"evaluates": "Quality assurance mindset, testing knowledge, and thoroughness", "look_for": "Unit tests, integration tests, test coverage considerations, TDD/BDD practices, and edge case thinking"}'::jsonb),
  ('Tell me about a time you optimized the performance of an application or feature. What was the problem and what improvements did you achieve?', 'hard', 10, 9, '{"evaluates": "Performance optimization skills, analytical thinking, and results orientation", "look_for": "Performance profiling, identification of bottlenecks, specific optimizations made, and measurable improvements (metrics)"}'::jsonb),
  ('How do you stay current with new technologies and industry trends in software development?', 'easy', 10, 10, '{"evaluates": "Continuous learning, passion for technology, and professional development", "look_for": "Specific resources (blogs, conferences, courses), side projects, open-source contributions, and application of new knowledge"}'::jsonb)
) AS questions(question_text, difficulty, points, order_index, metadata);

-- Product Manager Behavioral Interview
WITH product_manager_interview AS (
  INSERT INTO interviews (
    title, job_role, description, duration_minutes, is_published, questions,
    created_by
  ) VALUES (
    'Product Manager Behavioral Interview',
    'Product Manager',
    'Comprehensive behavioral assessment covering prioritization, product validation, stakeholder management, data-driven decisions, and strategic thinking for Product Manager positions.',
    60,
    true,
    '{}'::jsonb,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO interview_questions (interview_id, question_type, question_text, difficulty, points, order_index, options)
SELECT id, 'mcq', question_text, difficulty, points, order_index, metadata
FROM product_manager_interview, (VALUES
  ('Tell me about a product feature you championed that didn''t perform as expected. What happened and what did you learn?', 'medium', 10, 1, '{"evaluates": "Accountability, data-driven thinking, and ability to learn from failure", "look_for": "Honest assessment, analysis of why it failed, metrics used, pivoting decisions, and lessons applied to future work"}'::jsonb),
  ('Describe a situation where you had to prioritize between multiple high-priority features with limited resources. How did you make the decision?', 'hard', 10, 2, '{"evaluates": "Prioritization skills, strategic thinking, and stakeholder management", "look_for": "Framework used (RICE, MoSCoW, etc.), data/user research considered, stakeholder input, and clear rationale"}'::jsonb),
  ('Walk me through how you would validate a new product idea before investing significant development resources.', 'medium', 10, 3, '{"evaluates": "Product validation skills, user research methodology, and lean thinking", "look_for": "User interviews, surveys, prototypes/MVPs, A/B testing, market research, and success metrics definition"}'::jsonb),
  ('Tell me about a time when engineering pushed back on a feature you wanted to build. How did you handle it?', 'medium', 10, 4, '{"evaluates": "Cross-functional collaboration, technical understanding, and negotiation skills", "look_for": "Active listening, understanding technical constraints, finding alternatives, and collaborative problem-solving"}'::jsonb),
  ('Describe how you''ve used data and analytics to inform a product decision. What was the outcome?', 'medium', 10, 5, '{"evaluates": "Data literacy, analytical thinking, and decision-making", "look_for": "Specific metrics tracked, analysis methods, insights derived, action taken, and measurable results"}'::jsonb),
  ('Tell me about a time you had to say ''no'' to a stakeholder''s feature request. How did you communicate that decision?', 'hard', 10, 6, '{"evaluates": "Communication skills, strategic alignment, and ability to manage expectations", "look_for": "Clear reasoning, alignment with product strategy, empathy, alternative solutions offered, and relationship preservation"}'::jsonb),
  ('How would you approach launching a product in a market where competitors already have established solutions?', 'hard', 10, 7, '{"evaluates": "Competitive strategy, market analysis, and differentiation thinking", "look_for": "Competitive analysis, unique value proposition, target audience segmentation, go-to-market strategy, and positioning"}'::jsonb),
  ('Describe your process for gathering and incorporating user feedback into the product roadmap.', 'easy', 10, 8, '{"evaluates": "User-centric thinking, feedback management, and roadmap planning", "look_for": "Multiple feedback channels, synthesis methods, prioritization of feedback, communication back to users, and iteration process"}'::jsonb),
  ('Tell me about a time you had to balance short-term business goals with long-term product vision.', 'hard', 10, 9, '{"evaluates": "Strategic thinking, business acumen, and ability to manage competing priorities", "look_for": "Understanding of both perspectives, trade-off analysis, stakeholder alignment, and sustainable approach"}'::jsonb),
  ('How do you define and measure success for a product or feature you''re responsible for?', 'medium', 10, 10, '{"evaluates": "Metrics definition, goal-setting, and results orientation", "look_for": "Specific KPIs, leading vs. lagging indicators, user satisfaction metrics, business impact, and tracking methods"}'::jsonb)
) AS questions(question_text, difficulty, points, order_index, metadata);

-- Data Analyst Behavioral Interview
WITH data_analyst_interview AS (
  INSERT INTO interviews (
    title, job_role, description, duration_minutes, is_published, questions,
    created_by
  ) VALUES (
    'Data Analyst Behavioral Interview',
    'Data Analyst',
    'Comprehensive behavioral assessment covering analytical methodology, data quality, A/B testing, visualization, and communication for Data Analyst positions.',
    60,
    true,
    '{}'::jsonb,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO interview_questions (interview_id, question_type, question_text, difficulty, points, order_index, options)
SELECT id, 'mcq', question_text, difficulty, points, order_index, metadata
FROM data_analyst_interview, (VALUES
  ('Tell me about a time when your analysis led to a significant business decision or change. What was your approach?', 'medium', 10, 1, '{"evaluates": "Business impact, analytical methodology, and communication of insights", "look_for": "Clear problem definition, data sources used, analysis techniques, actionable insights, and measurable business outcomes"}'::jsonb),
  ('Describe a situation where you discovered data quality issues. How did you identify them and what steps did you take?', 'medium', 10, 2, '{"evaluates": "Data quality awareness, attention to detail, and problem-solving", "look_for": "Data validation techniques, root cause investigation, collaboration with data engineers, and implementation of quality checks"}'::jsonb),
  ('Walk me through how you would analyze the cause of a sudden drop in user engagement on our platform.', 'hard', 10, 3, '{"evaluates": "Analytical thinking, hypothesis generation, and systematic investigation", "look_for": "Segmentation analysis, cohort analysis, funnel analysis, external factors consideration, and structured approach"}'::jsonb),
  ('Tell me about a time you had to explain complex analytical findings to non-technical stakeholders. How did you make it understandable?', 'medium', 10, 4, '{"evaluates": "Communication skills, data visualization, and stakeholder management", "look_for": "Use of visualizations, storytelling, avoiding jargon, focusing on business impact, and checking for understanding"}'::jsonb),
  ('Describe your experience with A/B testing. How do you design experiments and interpret results?', 'hard', 10, 5, '{"evaluates": "Experimental design, statistical knowledge, and scientific thinking", "look_for": "Sample size calculation, randomization, statistical significance, practical significance, and consideration of confounding variables"}'::jsonb),
  ('Tell me about a time when you had to work with incomplete or messy data. How did you handle it?', 'medium', 10, 6, '{"evaluates": "Resourcefulness, data cleaning skills, and ability to work with constraints", "look_for": "Data cleaning techniques, imputation strategies, documentation of assumptions, and communication of limitations"}'::jsonb),
  ('How do you decide which visualization type to use when presenting data to different audiences?', 'easy', 10, 7, '{"evaluates": "Data visualization skills, audience awareness, and communication effectiveness", "look_for": "Understanding of chart types, audience consideration, clarity principles, and examples of effective visualizations created"}'::jsonb),
  ('Describe a time when your initial hypothesis was proven wrong by the data. What did you do?', 'easy', 10, 8, '{"evaluates": "Intellectual honesty, adaptability, and scientific mindset", "look_for": "Acceptance of findings, further investigation, revised hypothesis, and willingness to change direction based on evidence"}'::jsonb),
  ('Tell me about your experience building dashboards or reports. How do you ensure they remain useful over time?', 'medium', 10, 9, '{"evaluates": "Dashboard design, user needs understanding, and maintenance thinking", "look_for": "User requirements gathering, iterative design, automation, documentation, and feedback incorporation"}'::jsonb),
  ('How do you prioritize multiple ad-hoc analysis requests when you have limited time?', 'medium', 10, 10, '{"evaluates": "Time management, prioritization, and stakeholder communication", "look_for": "Impact assessment, urgency evaluation, stakeholder communication, setting expectations, and efficient workflow"}'::jsonb)
) AS questions(question_text, difficulty, points, order_index, metadata);

-- Sales Representative Behavioral Interview
WITH sales_rep_interview AS (
  INSERT INTO interviews (
    title, job_role, description, duration_minutes, is_published, questions,
    created_by
  ) VALUES (
    'Sales Representative Behavioral Interview',
    'Sales Representative',
    'Comprehensive behavioral assessment covering prospecting, objection handling, relationship building, quota achievement, and resilience for Sales Representative positions.',
    60,
    true,
    '{}'::jsonb,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO interview_questions (interview_id, question_type, question_text, difficulty, points, order_index, options)
SELECT id, 'mcq', question_text, difficulty, points, order_index, metadata
FROM sales_rep_interview, (VALUES
  ('Tell me about a time you lost a deal you thought you were going to win. What happened and what did you learn?', 'medium', 10, 1, '{"evaluates": "Resilience, self-reflection, and ability to learn from setbacks", "look_for": "Honest assessment, analysis of what went wrong, lessons learned, and changes made to future approach"}'::jsonb),
  ('Describe your approach to prospecting and building a pipeline of qualified leads.', 'medium', 10, 2, '{"evaluates": "Prospecting skills, strategic thinking, and self-motivation", "look_for": "Multi-channel approach, qualification criteria, research methods, persistence, and pipeline management"}'::jsonb),
  ('Walk me through how you would handle a prospect who says ''your price is too high'' during a sales conversation.', 'hard', 10, 3, '{"evaluates": "Objection handling, value communication, and negotiation skills", "look_for": "Understanding underlying concerns, reframing to value, ROI discussion, creative solutions, and confidence"}'::jsonb),
  ('Tell me about your most successful sale. What made it successful and what was your strategy?', 'easy', 10, 4, '{"evaluates": "Sales methodology, relationship building, and strategic approach", "look_for": "Needs discovery, solution positioning, relationship development, closing techniques, and measurable success"}'::jsonb),
  ('Describe a time when you had to collaborate with other teams (marketing, product, support) to close a deal.', 'medium', 10, 5, '{"evaluates": "Cross-functional collaboration, teamwork, and resourcefulness", "look_for": "Proactive communication, leveraging resources, coordination skills, and appreciation for team contributions"}'::jsonb),
  ('How do you manage your time and stay organized when juggling multiple deals at different stages?', 'easy', 10, 6, '{"evaluates": "Time management, organization, and process discipline", "look_for": "CRM usage, prioritization system, follow-up discipline, and specific tools/methods used"}'::jsonb),
  ('Tell me about a time you turned around a relationship with a difficult or skeptical prospect.', 'hard', 10, 7, '{"evaluates": "Relationship building, persistence, and problem-solving", "look_for": "Active listening, empathy, addressing concerns, building trust, and patience"}'::jsonb),
  ('Describe your approach to understanding a prospect''s needs and pain points.', 'medium', 10, 8, '{"evaluates": "Discovery skills, consultative selling, and active listening", "look_for": "Open-ended questions, active listening, research preparation, and connecting needs to solutions"}'::jsonb),
  ('Tell me about a time you exceeded your sales quota. What strategies did you use?', 'medium', 10, 9, '{"evaluates": "Results orientation, strategic planning, and work ethic", "look_for": "Specific strategies, activity metrics, pipeline management, and consistent execution"}'::jsonb),
  ('How do you stay motivated during slow periods or after facing multiple rejections?', 'easy', 10, 10, '{"evaluates": "Resilience, self-motivation, and mental toughness", "look_for": "Positive mindset, learning from rejection, activity focus, support systems, and long-term perspective"}'::jsonb)
) AS questions(question_text, difficulty, points, order_index, metadata);

-- Marketing Manager Behavioral Interview
WITH marketing_manager_interview AS (
  INSERT INTO interviews (
    title, job_role, description, duration_minutes, is_published, questions,
    created_by
  ) VALUES (
    'Marketing Manager Behavioral Interview',
    'Marketing Manager',
    'Comprehensive behavioral assessment covering campaign management, go-to-market strategy, attribution, brand positioning, and ROI optimization for Marketing Manager positions.',
    60,
    true,
    '{}'::jsonb,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO interview_questions (interview_id, question_type, question_text, difficulty, points, order_index, options)
SELECT id, 'mcq', question_text, difficulty, points, order_index, metadata
FROM marketing_manager_interview, (VALUES
  ('Tell me about a marketing campaign that didn''t perform as expected. How did you identify the issue and what did you do?', 'medium', 10, 1, '{"evaluates": "Analytical skills, adaptability, and accountability", "look_for": "Performance metrics tracked, analysis of underperformance, pivoting decisions, and optimization efforts"}'::jsonb),
  ('Describe how you''ve used customer data and insights to inform a marketing strategy.', 'medium', 10, 2, '{"evaluates": "Data-driven marketing, customer understanding, and strategic thinking", "look_for": "Data sources used, segmentation, persona development, insights derived, and strategy alignment"}'::jsonb),
  ('Walk me through how you would develop a go-to-market strategy for a new product launch.', 'hard', 10, 3, '{"evaluates": "Strategic planning, marketing knowledge, and comprehensive thinking", "look_for": "Target audience definition, positioning, channel strategy, messaging, timeline, budget, and success metrics"}'::jsonb),
  ('Tell me about a time you had to manage a marketing campaign with a limited budget. How did you maximize impact?', 'medium', 10, 4, '{"evaluates": "Resourcefulness, creativity, and ROI focus", "look_for": "Creative solutions, channel prioritization, organic strategies, partnerships, and measurable results"}'::jsonb),
  ('Describe your experience with marketing attribution. How do you measure the effectiveness of different channels?', 'hard', 10, 5, '{"evaluates": "Analytics skills, attribution knowledge, and measurement sophistication", "look_for": "Attribution models used, multi-touch attribution, tools/platforms, and data-driven optimization"}'::jsonb),
  ('Tell me about a time you had to align marketing efforts with sales goals. What was your approach?', 'medium', 10, 6, '{"evaluates": "Cross-functional collaboration, sales-marketing alignment, and business acumen", "look_for": "Communication with sales, shared metrics, lead quality focus, feedback loops, and collaborative planning"}'::jsonb),
  ('How do you stay current with marketing trends and decide which ones are worth investing in?', 'easy', 10, 7, '{"evaluates": "Continuous learning, trend awareness, and strategic judgment", "look_for": "Information sources, experimentation mindset, evaluation criteria, and examples of successful adoption"}'::jsonb),
  ('Describe a time when you successfully repositioned a brand or product in the market.', 'hard', 10, 8, '{"evaluates": "Brand strategy, market understanding, and change management", "look_for": "Market research, competitive analysis, messaging development, stakeholder buy-in, and execution"}'::jsonb),
  ('Tell me about your experience managing a team or agency partners. How do you ensure quality and alignment?', 'medium', 10, 9, '{"evaluates": "Leadership, vendor management, and quality control", "look_for": "Clear communication, goal-setting, feedback processes, relationship management, and accountability"}'::jsonb),
  ('How do you balance brand-building activities with performance marketing and demand generation?', 'hard', 10, 10, '{"evaluates": "Strategic balance, marketing mix understanding, and long-term thinking", "look_for": "Understanding of both approaches, budget allocation rationale, measurement of each, and integrated strategy"}'::jsonb)
) AS questions(question_text, difficulty, points, order_index, metadata);

-- UX Designer Behavioral Interview
WITH ux_designer_interview AS (
  INSERT INTO interviews (
    title, job_role, description, duration_minutes, is_published, questions,
    created_by
  ) VALUES (
    'UX Designer Behavioral Interview',
    'UX Designer',
    'Comprehensive behavioral assessment covering user research, accessibility, design process, collaboration, and balancing user/business needs for UX Designer positions.',
    60,
    true,
    '{}'::jsonb,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO interview_questions (interview_id, question_type, question_text, difficulty, points, order_index, options)
SELECT id, 'mcq', question_text, difficulty, points, order_index, metadata
FROM ux_designer_interview, (VALUES
  ('Tell me about a time when user research findings contradicted your initial design assumptions. How did you respond?', 'medium', 10, 1, '{"evaluates": "User-centric mindset, adaptability, and ego management", "look_for": "Acceptance of findings, design iteration, user empathy, and willingness to pivot based on evidence"}'::jsonb),
  ('Describe a situation where you had to advocate for the user experience against business or technical constraints.', 'hard', 10, 2, '{"evaluates": "Advocacy skills, communication, and balancing competing priorities", "look_for": "User impact articulation, data/research support, compromise solutions, and stakeholder influence"}'::jsonb),
  ('Walk me through your process for designing a new feature from concept to final design.', 'medium', 10, 3, '{"evaluates": "Design process, methodology, and comprehensive thinking", "look_for": "Research phase, ideation, wireframing, prototyping, testing, iteration, and handoff to development"}'::jsonb),
  ('Tell me about a time you had to design for accessibility. What considerations did you make?', 'medium', 10, 4, '{"evaluates": "Accessibility knowledge, inclusive design, and attention to detail", "look_for": "WCAG guidelines, screen readers, color contrast, keyboard navigation, and testing with diverse users"}'::jsonb),
  ('Describe how you''ve used data and analytics to validate or improve a design decision.', 'medium', 10, 5, '{"evaluates": "Data-informed design, analytical thinking, and measurement", "look_for": "A/B testing, heatmaps, analytics tools, user behavior analysis, and iterative improvements"}'::jsonb),
  ('Tell me about a time you received critical feedback on your design. How did you handle it?', 'easy', 10, 6, '{"evaluates": "Receptiveness to feedback, collaboration, and professional maturity", "look_for": "Active listening, asking clarifying questions, non-defensive response, and constructive iteration"}'::jsonb),
  ('How do you approach designing for multiple platforms or devices while maintaining consistency?', 'hard', 10, 7, '{"evaluates": "Responsive design, design systems knowledge, and consistency thinking", "look_for": "Design systems, component libraries, responsive principles, platform-specific considerations, and scalability"}'::jsonb),
  ('Describe a time when you had to simplify a complex user flow or interface. What was your approach?', 'hard', 10, 8, '{"evaluates": "Simplification skills, information architecture, and user empathy", "look_for": "User journey mapping, prioritization, progressive disclosure, user testing, and measurable improvement"}'::jsonb),
  ('Tell me about your experience collaborating with developers. How do you ensure your designs are implemented correctly?', 'medium', 10, 9, '{"evaluates": "Cross-functional collaboration, communication, and quality assurance", "look_for": "Clear documentation, design specs, developer handoff process, collaboration tools, and QA involvement"}'::jsonb),
  ('How do you balance user needs, business goals, and technical feasibility in your design decisions?', 'hard', 10, 10, '{"evaluates": "Strategic thinking, stakeholder management, and holistic design approach", "look_for": "Understanding of all three perspectives, trade-off analysis, collaborative decision-making, and pragmatic solutions"}'::jsonb)
) AS questions(question_text, difficulty, points, order_index, metadata);
