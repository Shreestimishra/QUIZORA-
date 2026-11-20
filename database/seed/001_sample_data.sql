-- Insert sample categories
INSERT INTO categories (name, icon, description) VALUES
('Science', '🔬', 'Explore the wonders of the natural world'),
('Technology', '💻', 'Computers, coding, and digital innovation'),
('Mathematics', '📐', 'Numbers, logic, and problem-solving'),
('General Knowledge', '🌍', 'Facts about the world we live in'),
('History', '📜', 'Events that shaped our world'),
('Geography', '🗺️', 'Countries, capitals, and landscapes'),
('Business', '💼', 'Economics, finance, and entrepreneurship'),
('Programming', '⌨️', 'Coding languages and software development')
ON CONFLICT (name) DO NOTHING;

-- Insert sample quizzes
INSERT INTO quizzes (title, description, category, difficulty, question_count, time_limit) VALUES
('Basic Science', 'Test your knowledge of fundamental science concepts', 'Science', 'easy', 5, 300),
('Web Development Basics', 'Questions about HTML, CSS, and JavaScript', 'Technology', 'easy', 5, 300),
('Algebra Fundamentals', 'Basic algebraic concepts and equations', 'Mathematics', 'medium', 5, 360),
('World Geography', 'Countries, capitals, and geographical features', 'Geography', 'easy', 5, 300),
('Modern History', 'Major events of the 20th and 21st centuries', 'History', 'medium', 5, 360),
('Business Fundamentals', 'Basic concepts in business and economics', 'Business', 'easy', 5, 300),
('JavaScript Essentials', 'Core JavaScript concepts and syntax', 'Programming', 'medium', 5, 360),
('General Knowledge Challenge', 'Mixed questions from various topics', 'General Knowledge', 'easy', 5, 300)
ON CONFLICT DO NOTHING;

-- Get quiz IDs for questions
DO $$
DECLARE
  science_quiz UUID;
  tech_quiz UUID;
  math_quiz UUID;
  geo_quiz UUID;
  history_quiz UUID;
  business_quiz UUID;
  prog_quiz UUID;
  gk_quiz UUID;
BEGIN
  SELECT id INTO science_quiz FROM quizzes WHERE title = 'Basic Science' LIMIT 1;
  SELECT id INTO tech_quiz FROM quizzes WHERE title = 'Web Development Basics' LIMIT 1;
  SELECT id INTO math_quiz FROM quizzes WHERE title = 'Algebra Fundamentals' LIMIT 1;
  SELECT id INTO geo_quiz FROM quizzes WHERE title = 'World Geography' LIMIT 1;
  SELECT id INTO history_quiz FROM quizzes WHERE title = 'Modern History' LIMIT 1;
  SELECT id INTO business_quiz FROM quizzes WHERE title = 'Business Fundamentals' LIMIT 1;
  SELECT id INTO prog_quiz FROM quizzes WHERE title = 'JavaScript Essentials' LIMIT 1;
  SELECT id INTO gk_quiz FROM quizzes WHERE title = 'General Knowledge Challenge' LIMIT 1;

  -- Science Questions
  INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  (science_quiz, 'What is the chemical symbol for water?', 'H2O', 'CO2', 'NaCl', 'O2', 'H2O', 'Water consists of two hydrogen atoms and one oxygen atom.', 'easy'),
  (science_quiz, 'What planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Mars', 'Mars appears red due to iron oxide on its surface.', 'easy'),
  (science_quiz, 'What is the powerhouse of the cell?', 'Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus', 'Mitochondria', 'Mitochondria produce ATP, the cell''s energy currency.', 'easy'),
  (science_quiz, 'What gas do plants absorb from the atmosphere?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen', 'Carbon Dioxide', 'Plants use CO2 for photosynthesis, releasing oxygen.', 'easy'),
  (science_quiz, 'What is the largest organ in the human body?', 'Heart', 'Liver', 'Skin', 'Brain', 'Skin', 'The skin is the body''s largest organ, providing protection.', 'easy');

  -- Technology Questions
  INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  (tech_quiz, 'What does HTML stand for?', 'Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language', 'Hyper Text Markup Language', 'HTML is the standard markup language for creating web pages.', 'easy'),
  (tech_quiz, 'What is the purpose of CSS?', 'Database management', 'Styling web pages', 'Server-side scripting', 'Network security', 'Styling web pages', 'CSS controls the visual presentation of HTML elements.', 'easy'),
  (tech_quiz, 'What does HTTP stand for?', 'Hyper Text Transfer Protocol', 'High Tech Transfer Protocol', 'Hyper Text Transmission Protocol', 'Home Tool Transfer Protocol', 'Hyper Text Transfer Protocol', 'HTTP is the foundation of data communication on the web.', 'easy'),
  (tech_quiz, 'What is a URL?', 'Universal Resource Locator', 'Uniform Resource Locator', 'United Resource Locator', 'Universal Register Locator', 'Uniform Resource Locator', 'A URL specifies the address of a resource on the internet.', 'easy'),
  (tech_quiz, 'What programming language is primarily used for web browsers?', 'Python', 'Java', 'JavaScript', 'C++', 'JavaScript', 'JavaScript is the dominant language for client-side web development.', 'easy');

  -- Mathematics Questions
  INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  (math_quiz, 'What is 2 + 2 * 2?', '8', '6', '4', '10', '6', 'Following order of operations: 2 + (2 * 2) = 2 + 4 = 6', 'medium'),
  (math_quiz, 'What is the square root of 144?', '10', '11', '12', '13', '12', '12 * 12 = 144', 'medium'),
  (math_quiz, 'What is 15% of 200?', '15', '20', '25', '30', '30', '15% of 200 = (15/100) * 200 = 30', 'medium'),
  (math_quiz, 'Solve for x: 2x + 5 = 15', 'x = 5', 'x = 10', 'x = 7.5', 'x = 20', 'x = 5', '2x = 15 - 5 = 10, so x = 5', 'medium'),
  (math_quiz, 'What is the area of a rectangle with length 8 and width 5?', '13', '26', '40', '45', '40', 'Area = length * width = 8 * 5 = 40', 'medium');

  -- Geography Questions
  INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  (geo_quiz, 'What is the capital of France?', 'London', 'Berlin', 'Paris', 'Madrid', 'Paris', 'Paris has been the capital of France since 987 AD.', 'easy'),
  (geo_quiz, 'Which is the largest continent by area?', 'Africa', 'Asia', 'Europe', 'North America', 'Asia', 'Asia covers about 30% of Earth''s land area.', 'easy'),
  (geo_quiz, 'What is the longest river in the world?', 'Amazon', 'Nile', 'Yangtze', 'Mississippi', 'Nile', 'The Nile River flows through northeastern Africa for 6,650 km.', 'easy'),
  (geo_quiz, 'Which country has the most people?', 'India', 'United States', 'China', 'Indonesia', 'India', 'India surpassed China as the world''s most populous nation.', 'easy'),
  (geo_quiz, 'What is the smallest country in the world?', 'Monaco', 'Vatican City', 'San Marino', 'Liechtenstein', 'Vatican City', 'Vatican City is only 0.44 square kilometers in area.', 'easy');

  -- History Questions
  INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  (history_quiz, 'In what year did World War II end?', '1943', '1944', '1945', '1946', '1945', 'WWII ended in 1945 with Japan''s surrender in September.', 'medium'),
  (history_quiz, 'Who was the first President of the United States?', 'Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin', 'George Washington', 'Washington served from 1789 to 1797.', 'medium'),
  (history_quiz, 'What year did the Berlin Wall fall?', '1987', '1988', '1989', '1990', '1989', 'The Berlin Wall fell on November 9, 1989.', 'medium'),
  (history_quiz, 'Which empire was ruled by Genghis Khan?', 'Roman Empire', 'Mongol Empire', 'Ottoman Empire', 'Persian Empire', 'Mongol Empire', 'Genghis Khan founded the Mongol Empire in 1206.', 'medium'),
  (history_quiz, 'What year did the Titanic sink?', '1910', '1911', '1912', '1913', '1912', 'The Titanic sank on April 15, 1912, after hitting an iceberg.', 'medium');

  -- Business Questions
  INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  (business_quiz, 'What does ROI stand for?', 'Return on Investment', 'Rate of Interest', 'Revenue on Investment', 'Risk of Investment', 'Return on Investment', 'ROI measures the efficiency of an investment.', 'easy'),
  (business_quiz, 'What is a balance sheet?', 'Income statement', 'Financial position statement', 'Cash flow statement', 'Profit statement', 'Financial position statement', 'A balance sheet shows assets, liabilities, and equity.', 'easy'),
  (business_quiz, 'What is GDP?', 'Gross Domestic Product', 'General Domestic Product', 'Gross Domestic Profit', 'General Domestic Profit', 'Gross Domestic Product', 'GDP measures the total value of goods and services produced.', 'easy'),
  (business_quiz, 'What is a monopoly?', 'Many sellers, one buyer', 'One seller, many buyers', 'Many sellers, many buyers', 'One seller, one buyer', 'One seller, many buyers', 'A monopoly exists when a single company dominates a market.', 'easy'),
  (business_quiz, 'What does CEO stand for?', 'Chief Executive Officer', 'Chief Employment Officer', 'Corporate Executive Officer', 'Central Executive Officer', 'Chief Executive Officer', 'The CEO is the highest-ranking executive in a company.', 'easy');

  -- Programming Questions
  INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  (prog_quiz, 'What keyword declares a constant in JavaScript?', 'var', 'let', 'const', 'constant', 'const', 'const declares a block-scoped constant that cannot be reassigned.', 'medium'),
  (prog_quiz, 'What does DOM stand for?', 'Document Object Model', 'Data Object Model', 'Digital Object Model', 'Document Oriented Model', 'Document Object Model', 'The DOM represents HTML documents as objects for programming.', 'medium'),
  (prog_quiz, 'Which method converts JSON to a JavaScript object?', 'JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.object()', 'JSON.parse()', 'JSON.parse() parses a JSON string and returns a JavaScript object.', 'medium'),
  (prog_quiz, 'What is the output of typeof null in JavaScript?', '"null"', '"undefined"', '"object"', '"number"', '"object"', 'This is a known JavaScript bug where typeof null returns "object".', 'medium'),
  (prog_quiz, 'Which operator checks for both value and type?', '==', '===', '!=', '!==', '===', '=== is the strict equality operator that checks both value and type.', 'medium');

  -- General Knowledge Questions
  INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
  (gk_quiz, 'How many days are in a leap year?', '364', '365', '366', '367', '366', 'Leap years have 366 days, adding February 29th.', 'easy'),
  (gk_quiz, 'What is the largest mammal in the world?', 'Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus', 'Blue Whale', 'The blue whale is the largest animal known to have ever lived.', 'easy'),
  (gk_quiz, 'How many continents are there?', '5', '6', '7', '8', '7', 'The seven continents are Africa, Antarctica, Asia, Australia, Europe, North America, and South America.', 'easy'),
  (gk_quiz, 'What color do you get when mixing blue and yellow?', 'Green', 'Orange', 'Purple', 'Brown', 'Green', 'Blue and yellow are primary colors that mix to create green.', 'easy'),
  (gk_quiz, 'What is the hardest natural substance on Earth?', 'Gold', 'Iron', 'Diamond', 'Platinum', 'Diamond', 'Diamond is the hardest known natural material.', 'easy');
END $$;
