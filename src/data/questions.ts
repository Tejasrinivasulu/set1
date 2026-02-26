export interface Question {
  id: number;
  type: "mcq" | "fill";
  question: string;
  options?: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  // MCQs (1-25)
  { id: 1, type: "mcq", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correctAnswer: "Hyper Text Markup Language" },
  { id: 2, type: "mcq", question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], correctAnswer: "CSS" },
  { id: 3, type: "mcq", question: "Which is not a JavaScript framework?", options: ["React", "Angular", "Django", "Vue"], correctAnswer: "Django" },
  { id: 4, type: "mcq", question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correctAnswer: "Cascading Style Sheets" },
  { id: 5, type: "mcq", question: "Which HTML tag is used for the largest heading?", options: ["<h6>", "<head>", "<h1>", "<heading>"], correctAnswer: "<h1>" },
  { id: 6, type: "mcq", question: "Which property is used to change background color in CSS?", options: ["color", "bgcolor", "background-color", "background"], correctAnswer: "background-color" },
  { id: 7, type: "mcq", question: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Google", "Apple"], correctAnswer: "Netscape" },
  { id: 8, type: "mcq", question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"], correctAnswer: "Structured Query Language" },
  { id: 9, type: "mcq", question: "Which is used to connect to a database in web development?", options: ["HTML", "CSS", "PHP", "JavaScript"], correctAnswer: "PHP" },
  { id: 10, type: "mcq", question: "What is the correct syntax for referring to an external script?", options: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<script file='app.js'>"], correctAnswer: "<script src='app.js'>" },
  { id: 11, type: "mcq", question: "Which operator is used for strict equality in JavaScript?", options: ["==", "===", "!=", "="], correctAnswer: "===" },
  { id: 12, type: "mcq", question: "What does API stand for?", options: ["Application Programming Interface", "Application Process Integration", "Applied Programming Interface", "Application Protocol Interface"], correctAnswer: "Application Programming Interface" },
  { id: 13, type: "mcq", question: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], correctAnswer: "<a>" },
  { id: 14, type: "mcq", question: "Which of the following is a backend language?", options: ["HTML", "CSS", "Node.js", "Bootstrap"], correctAnswer: "Node.js" },
  { id: 15, type: "mcq", question: "What is the default position value in CSS?", options: ["relative", "absolute", "fixed", "static"], correctAnswer: "static" },
  { id: 16, type: "mcq", question: "Which method converts JSON to a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"], correctAnswer: "JSON.parse()" },
  { id: 17, type: "mcq", question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Order Model", "Digital Object Model"], correctAnswer: "Document Object Model" },
  { id: 18, type: "mcq", question: "Which is a version control system?", options: ["Git", "Python", "Java", "Docker"], correctAnswer: "Git" },
  { id: 19, type: "mcq", question: "What is the purpose of the <title> tag in HTML?", options: ["Displays a title on the page", "Sets the browser tab title", "Creates a heading", "Adds a tooltip"], correctAnswer: "Sets the browser tab title" },
  { id: 20, type: "mcq", question: "Which CSS property controls text size?", options: ["text-style", "font-size", "text-size", "font-style"], correctAnswer: "font-size" },
  { id: 21, type: "mcq", question: "Which protocol is used for secure web communication?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correctAnswer: "HTTPS" },
  { id: 22, type: "mcq", question: "What is React?", options: ["A database", "A CSS framework", "A JavaScript library", "A programming language"], correctAnswer: "A JavaScript library" },
  { id: 23, type: "mcq", question: "Which HTML element is used to define an unordered list?", options: ["<ol>", "<li>", "<ul>", "<list>"], correctAnswer: "<ul>" },
  { id: 24, type: "mcq", question: "Which event occurs when a user clicks on an HTML element?", options: ["onchange", "onmouseover", "onclick", "onmouseclick"], correctAnswer: "onclick" },
  { id: 25, type: "mcq", question: "What does NPM stand for?", options: ["Node Package Manager", "New Programming Method", "Node Project Manager", "Network Package Manager"], correctAnswer: "Node Package Manager" },
  // Fill in the blanks (26-30)
  { id: 26, type: "fill", question: "The _______ tag is used to define a paragraph in HTML.", correctAnswer: "<p>" },
  { id: 27, type: "fill", question: "JavaScript variables declared with _______ cannot be reassigned.", correctAnswer: "const" },
  { id: 28, type: "fill", question: "CSS stands for Cascading _______ Sheets.", correctAnswer: "Style" },
  { id: 29, type: "fill", question: "The _______ method is used to add an element at the end of an array in JavaScript.", correctAnswer: "push" },
  { id: 30, type: "fill", question: "In HTML, the _______ attribute specifies an alternate text for an image.", correctAnswer: "alt" },
];
