
"use strict";

// Quiz questions and correct answers
const questions = [
  {
    question: "Which programming language is known for its use in AI and machine learning?",
    options: ["HTML", "Python", "CSS", "SQL"],
    answer: 1
  },
  {
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Utility",
      "Central Program Usage",
      "Control Processing User"
    ],
    answer: 0
  },
  {
    question: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    answer: 2
  },
  {
    question: "Which symbol is commonly used for a single-line comment in Python?",
    options: ["//", "<!--", "#", "/*"],
    answer: 2
  },
  {
    question: "What is the main purpose of an operating system?",
    options: [
      "To design websites only",
      "To manage computer hardware and software resources",
      "To create programming languages",
      "To store passwords only"
    ],
    answer: 1
  }
];

// Track the current question, score, and selected answer
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answerChecked = false;

// Find the HTML elements used by the quiz
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const progressElement = document.getElementById("question-progress");
const scoreElement = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScoreElement = document.getElementById("final-score");
const resultMessageElement = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

// Display the current question and its four options
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  selectedAnswer = null;
  answerChecked = false;

  progressElement.textContent =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  scoreElement.textContent = `Score: ${score}`;

  progressBar.style.width =
    `${(currentQuestionIndex / questions.length) * 100}%`;

  questionElement.textContent = currentQuestion.question;
  optionsElement.replaceChildren();
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.textContent = "Check Answer";
  nextButton.disabled = true;

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");

    optionButton.type = "button";
    optionButton.className = "option-button";
    optionButton.textContent =
      `${String.fromCharCode(65 + index)}. ${option}`;

    optionButton.addEventListener("click", () => {
      selectAnswer(index);
    });

    optionsElement.appendChild(optionButton);
  });
}

// Allow the user to select an answer
function selectAnswer(answerIndex) {
  if (answerChecked) {
    return;
  }

  selectedAnswer = answerIndex;

  const optionButtons =
    optionsElement.querySelectorAll(".option-button");

  optionButtons.forEach((button, index) => {
    button.classList.toggle("selected", index === answerIndex);
  });

  nextButton.disabled = false;
}

// Check the selected answer and display feedback
function checkAnswer() {
  if (selectedAnswer === null || answerChecked) {
    return;
  }

  answerChecked = true;

  const currentQuestion = questions[currentQuestionIndex];
  const optionButtons =
    optionsElement.querySelectorAll(".option-button");

  optionButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === currentQuestion.answer) {
      button.classList.add("correct");
    } else if (index === selectedAnswer) {
      button.classList.add("incorrect");
    }
  });

  if (selectedAnswer === currentQuestion.answer) {
    score++;
    feedbackElement.textContent = "Correct! Well done.";
    feedbackElement.classList.add("success");
  } else {
    feedbackElement.textContent =
      `Incorrect. The correct answer is ${currentQuestion.options[currentQuestion.answer]}.`;
    feedbackElement.classList.add("error");
  }

  scoreElement.textContent = `Score: ${score}`;
  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "See Results"
      : "Next Question";
}

// Display the final score
function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  progressBar.style.width = "100%";
  finalScoreElement.textContent = `${score} / ${questions.length}`;

  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    resultMessageElement.textContent =
      "Perfect score! Excellent work!";
  } else if (percentage >= 60) {
    resultMessageElement.textContent =
      "Good job! Keep practising to improve your score.";
  } else {
    resultMessageElement.textContent =
      "Keep learning and try again. You can improve!";
  }
}

// Handle the Check Answer and Next Question button
nextButton.addEventListener("click", () => {
  if (!answerChecked) {
    checkAnswer();
    return;
  }

  if (currentQuestionIndex === questions.length - 1) {
    showResults();
  } else {
    currentQuestionIndex++;
    showQuestion();
  }
});

// Reset everything so the quiz can be played again
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  answerChecked = false;

  resultScreen.hidden = true;
  quizScreen.hidden = false;

  showQuestion();
});

// Start the quiz when the page loads
showQuestion();
