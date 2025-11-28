-- Insert AI Automation Engineer Test (26 MCQs, 40 minutes)
WITH new_assessment AS (
  INSERT INTO assessments (
    title, description, category, difficulty, duration_minutes, passing_score,
    timer_enabled, auto_submit_on_timeout, tab_switch_detection, max_tab_switches,
    face_detection_enabled, proctoring_enabled, is_published, created_by
  ) VALUES (
    'AI Automation Engineer Technical Test',
    'Comprehensive assessment covering machine learning algorithms, neural networks, NLP, computer vision, AI model deployment, automation frameworks, MLOps, and AI ethics.',
    'AI & Machine Learning',
    'advanced',
    40,
    75,
    true,
    true,
    true,
    2,
    true,
    true,
    true,
    (SELECT id FROM auth.users LIMIT 1)
  ) RETURNING id
)
INSERT INTO assessment_questions (assessment_id, question_text, question_type, options, correct_answer, points, order_index) 
SELECT id, question_text, question_type, options, correct_answer, points, order_index
FROM new_assessment, (VALUES
  -- Machine Learning Algorithms (6 questions)
  ('What is supervised learning?', 'multiple_choice', '["Learning from labeled data", "Learning without labels", "Reinforcement learning", "Unsupervised clustering"]'::jsonb, 'Learning from labeled data', 3, 1),
  ('What is the difference between classification and regression?', 'multiple_choice', '["Classification predicts categories, regression predicts continuous values", "They are identical", "Classification is faster", "Regression is more accurate"]'::jsonb, 'Classification predicts categories, regression predicts continuous values', 3, 2),
  ('What is overfitting in machine learning?', 'multiple_choice', '["Model performs well on training data but poorly on new data", "Model is too simple", "Model trains too fast", "Model has too few features"]'::jsonb, 'Model performs well on training data but poorly on new data', 3, 3),
  ('What is cross-validation?', 'multiple_choice', '["Technique to assess model performance on different data subsets", "Data preprocessing", "Feature engineering", "Model deployment"]'::jsonb, 'Technique to assess model performance on different data subsets', 3, 4),
  ('What is the purpose of a confusion matrix?', 'multiple_choice', '["Evaluate classification model performance", "Train neural networks", "Preprocess data", "Deploy models"]'::jsonb, 'Evaluate classification model performance', 3, 5),
  ('What is gradient descent?', 'multiple_choice', '["Optimization algorithm to minimize loss function", "Data augmentation technique", "Feature selection method", "Deployment strategy"]'::jsonb, 'Optimization algorithm to minimize loss function', 3, 6),
  
  -- Neural Networks & Deep Learning (5 questions)
  ('What is a neural network?', 'multiple_choice', '["Computing system inspired by biological neural networks", "Database system", "Web server", "File system"]'::jsonb, 'Computing system inspired by biological neural networks', 3, 7),
  ('What is backpropagation?', 'multiple_choice', '["Algorithm to calculate gradients for updating weights", "Forward pass through network", "Data preprocessing", "Model deployment"]'::jsonb, 'Algorithm to calculate gradients for updating weights', 3, 8),
  ('What is a convolutional neural network (CNN)?', 'multiple_choice', '["Neural network designed for image processing", "Text processing network", "Time series network", "Audio processing network"]'::jsonb, 'Neural network designed for image processing', 3, 9),
  ('What is dropout in neural networks?', 'multiple_choice', '["Regularization technique that randomly disables neurons", "Loss function", "Activation function", "Optimization algorithm"]'::jsonb, 'Regularization technique that randomly disables neurons', 3, 10),
  ('What is transfer learning?', 'multiple_choice', '["Using pre-trained model for new task", "Training from scratch", "Data augmentation", "Model compression"]'::jsonb, 'Using pre-trained model for new task', 3, 11),
  
  -- NLP & Computer Vision (4 questions)
  ('What does NLP stand for?', 'multiple_choice', '["Natural Language Processing", "Network Layer Protocol", "Neural Learning Process", "New Language Parser"]'::jsonb, 'Natural Language Processing', 3, 12),
  ('What is tokenization in NLP?', 'multiple_choice', '["Breaking text into smaller units like words", "Encrypting text", "Compressing text", "Translating text"]'::jsonb, 'Breaking text into smaller units like words', 3, 13),
  ('What is object detection in computer vision?', 'multiple_choice', '["Identifying and locating objects in images", "Image compression", "Color correction", "Image resizing"]'::jsonb, 'Identifying and locating objects in images', 3, 14),
  ('What is BERT?', 'multiple_choice', '["Pre-trained transformer model for NLP tasks", "Image classification model", "Reinforcement learning algorithm", "Database system"]'::jsonb, 'Pre-trained transformer model for NLP tasks', 3, 15),
  
  -- AI Model Deployment (4 questions)
  ('What is model serialization?', 'multiple_choice', '["Saving trained model to disk", "Training process", "Data preprocessing", "Feature engineering"]'::jsonb, 'Saving trained model to disk', 3, 16),
  ('What is an API endpoint for AI models?', 'multiple_choice', '["Interface for making predictions via HTTP requests", "Training interface", "Data storage", "Monitoring dashboard"]'::jsonb, 'Interface for making predictions via HTTP requests', 3, 17),
  ('What is model versioning?', 'multiple_choice', '["Track and manage different model versions", "Training technique", "Data preprocessing", "Feature engineering"]'::jsonb, 'Track and manage different model versions', 3, 18),
  ('What is A/B testing for AI models?', 'multiple_choice', '["Compare two model versions in production", "Training technique", "Data preprocessing", "Model optimization"]'::jsonb, 'Compare two model versions in production', 3, 19),
  
  -- Automation Frameworks (3 questions)
  ('What is RPA?', 'multiple_choice', '["Robotic Process Automation", "Remote Processing API", "Real-time Performance Analysis", "Random Pattern Algorithm"]'::jsonb, 'Robotic Process Automation', 3, 20),
  ('What is the purpose of automation testing?', 'multiple_choice', '["Automatically test code and models", "Manual testing", "Code compilation", "Database backup"]'::jsonb, 'Automatically test code and models', 3, 21),
  ('What is pipeline automation in ML?', 'multiple_choice', '["Automate data preprocessing, training, and deployment", "Manual model building", "Code editing", "Database management"]'::jsonb, 'Automate data preprocessing, training, and deployment', 3, 22),
  
  -- MLOps Practices (2 questions)
  ('What is MLOps?', 'multiple_choice', '["Practices for deploying and maintaining ML systems", "Machine learning optimization", "Model training", "Data collection"]'::jsonb, 'Practices for deploying and maintaining ML systems', 3, 23),
  ('What is continuous training in MLOps?', 'multiple_choice', '["Automatically retrain models with new data", "One-time training", "Manual updates", "Static models"]'::jsonb, 'Automatically retrain models with new data', 3, 24),
  
  -- Ethics in AI (2 questions)
  ('What is bias in AI?', 'multiple_choice', '["Systematic errors favoring certain outcomes", "Processing speed", "Model accuracy", "Data storage"]'::jsonb, 'Systematic errors favoring certain outcomes', 3, 25),
  ('What is explainable AI (XAI)?', 'multiple_choice', '["Making AI decision-making transparent and understandable", "Faster training", "Better accuracy", "Data compression"]'::jsonb, 'Making AI decision-making transparent and understandable', 3, 26)
) AS questions(question_text, question_type, options, correct_answer, points, order_index);