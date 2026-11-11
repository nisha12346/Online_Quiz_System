
const questions = [
  {
    q: "1. What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Markup Language",
      "Home Text Markup Language"
    ],
    answer: 0
  },
  {
    q: "2. Which language is used to style a webpage?",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: 1
  },
  {
    q: "3. Which language adds interactivity to a webpage?",
    options: ["CSS", "SQL", "JavaScript", "HTML"],
    answer: 2
  },
  {
    q: "4. Which HTML tag creates a paragraph?",
    options: ["<h1>", "<p>", "<img>", "<table>"],
    answer: 1
  },
  {
    q: "5. Which CSS property changes text color?",
    options: ["font-size", "background", "color", "margin"],
    answer: 2
  },
  {
    q: "6. Which keyword declares a variable in JavaScript?",
    options: ["let", "echo", "print", "style"],
    answer: 0
  },
  {
    q: "7. What is the brain of a computer?",
    options: ["Mouse", "Monitor", "Keyboard", "CPU"],
    answer: 3
  },
  {
    q: "8. What is 12 × 5?",
    options: ["50", "60", "65", "55"],
    answer: 1
  },
  {
    q: "9. Which planet is called the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: 2
  },
  {
    q: "10. Which function displays output in Python?",
    options: ["show()", "echo()", "print()", "display()"],
    answer: 2
  }
];

let current = 0;
let score = 0;
let answered = false;

function startQuiz() {
  current = 0;
  score = 0;
  answered = false;

  document.getElementById("startBtn").hidden = true;
  document.getElementById("intro").hidden = true;

  showQuestion();
}

function showQuestion() {
  answered = false;

  const item = questions[current];

  document.getElementById("progress").textContent =
    `Question ${current + 1} of ${questions.length}`;

  document.getElementById("question").textContent = item.q;
  document.getElementById("result").textContent = "";
  document.getElementById("nextBtn").hidden = true;

  const box = document.getElementById("options");
  box.innerHTML = "";

  item.options.forEach((option, index) => {
    const btn = document.createElement("button");

    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);

    box.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (answered) return;

  answered = true;

  const item = questions[current];
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;

    if (i === item.answer) {
      btn.style.background = "#15803d";
      btn.style.color = "white";
    } else if (i === index) {
      btn.style.background = "#b91c1c";
      btn.style.color = "white";
    }
  });

  if (index === item.answer) {
    score++;

    document.getElementById("result").textContent =
      "Correct Answer! 🎉";
  } else {
    document.getElementById("result").textContent =
      "Wrong Answer! Correct answer: " +
      item.options[item.answer];
  }

  const nextBtn = document.getElementById("nextBtn");

  nextBtn.textContent =
    current === questions.length - 1
      ? "View Final Result 🏆"
      : "Next Question →";

  nextBtn.hidden = false;
}

function nextQuestion() {
  if (!answered) return;

  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  const total = questions.length;
  const wrong = total - score;
  const percentage = Math.round((score / total) * 100);

  let message;

  if (percentage >= 90) {
    message = "Excellent! Quiz Champion 🏆";
  } else if (percentage >= 70) {
    message = "Very Good! Keep it up 🌟";
  } else if (percentage >= 50) {
    message = "Good effort! Keep practising 💪";
  } else {
    message = "Keep learning. Try again! 📚";
  }

  document.getElementById("progress").textContent =
    "QUIZ COMPLETED";

  document.getElementById("question").textContent =
    "Your Final Result 🏆";

  document.getElementById("options").innerHTML = "";

  document.getElementById("result").textContent =
    `${message}\n\n` +
    `Total Questions: ${total}\n` +
    `Correct Answers: ${score}\n` +
    `Wrong Answers: ${wrong}\n` +
    `Final Score: ${score} / ${total}\n` +
    `Percentage: ${percentage}%`;

  document.getElementById("nextBtn").hidden = true;

  const startBtn = document.getElementById("startBtn");

  startBtn.textContent = "🔄 Play Again";
  startBtn.hidden = false;
}
