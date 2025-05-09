const questions = [
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Earth", correct: false }
        ]
    },
    {
        question: "What is the name of our galaxy?",
        answers: [
            { text: "Andromeda", correct: false },
            { text: "Milky Way", correct: true },
            { text: "Proxima Centauri", correct: false },
            { text: "Triangulum", correct: false }
        ]
    },
    {
        question: "Which moon of Jupiter is known for its subsurface ocean?",
        answers: [
            { text: "Io", correct: false },
            { text: "Europa", correct: true },
            { text: "Ganymede", correct: false },
            { text: "Callisto", correct: false }
        ]
    },
    {
        question: "What is a black hole?",
        answers: [
            { text: "A type of star", correct: false },
            { text: "A region of spacetime with strong gravity", correct: true },
            { text: "A large comet", correct: false },
            { text: "A distant galaxy", correct: false }
        ]
    },
    {
        question: "What is the smallest planet in our solar system?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Mercury", correct: true }, // Using current IAU definition
            { text: "Venus", correct: false },
            { text: "Pluto", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const quizContainer = document.getElementById("quiz");
const scoreArea = document.getElementById("score-area");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    scoreArea.classList.add('hide'); // Hide score area
    quizContainer.classList.remove('hide'); // Show quiz area
    nextButton.classList.add('hide'); // Hide next button initially
    restartButton.classList.add('hide'); // Hide restart button
    showQuestion();
}

function showQuestion() {
    resetState(); // Clear previous question and buttons
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Add data attribute for correct answer
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    // Clear previous answer feedback classes
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.classList.add("hide"); // Hide the next button until an answer is selected
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    // Disable all buttons after one is selected and show correct answer
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable button clicks
    });

    nextButton.classList.remove("hide"); // Show the next button
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState(); // Clear question area
    quizContainer.classList.add('hide'); // Hide quiz area
    scoreArea.classList.remove('hide'); // Show score area
    finalScoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
    restartButton.classList.remove('hide'); // Show restart button
}

// Event Listeners
nextButton.addEventListener("click", handleNextButton);
restartButton.addEventListener("click", startQuiz); // Restart button calls startQuiz

// Start the quiz when the page loads
startQuiz();