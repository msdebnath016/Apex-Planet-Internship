const questions = [
    {
        question: "Which language is used to structure a webpage?",
        options: ["CSS", "HTML", "JavaScript", "SQL"],
        answer: "HTML"
    },

    {
        question: "Which CSS property is used to change the text color?",
        options: ["font-style", "background", "color", "text-size"],
        answer: "color"
    },

    {
        question: "Which language is primarily used to add interactivity to webpages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which CSS layout system is useful for arranging items in rows and columns?",
        options: ["CSS Grid", "HTML Table", "JavaScript DOM", "PHP"],
        answer: "CSS Grid"
    },

    {
        question: "Which method can be used in JavaScript to retrieve data from an API?",
        options: ["fetch()", "query()", "getData()", "requestHTML()"],
        answer: "fetch()"
    }
];

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("score");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");

const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");

const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.getElementById("restartButton");


let currentQuestion = 0;
let score = 0;
let answered = false;


function loadQuestion() {

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent =
        `Score: ${score}`;

    questionElement.textContent =
        current.question;

    feedback.textContent = "";
    feedback.className = "feedback";

    nextButton.disabled = true;

    answered = false;



    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;



    optionsContainer.innerHTML = "";



    current.options.forEach(optionText => {

        const button = document.createElement("button");

        button.className = "option";

        button.textContent = optionText;

        button.dataset.answer = optionText;

        button.addEventListener("click", () => {
            selectAnswer(button);
        });

        optionsContainer.appendChild(button);
    });
}


function selectAnswer(selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    const selectedAnswer =
        selectedButton.dataset.answer;

    const correctAnswer =
        questions[currentQuestion].answer;



    const allOptions =
        document.querySelectorAll(".option");

    allOptions.forEach(button => {
        button.disabled = true;
    });


    if (selectedAnswer === correctAnswer) {

        selectedButton.classList.add("correct");

        feedback.textContent =
            "Correct! Great job.";

        feedback.classList.add("correct-text");

        score++;

        scoreDisplay.textContent =
            `Score: ${score}`;

    } else {

        selectedButton.classList.add("incorrect");

        feedback.textContent =
            `Incorrect. The correct answer is ${correctAnswer}.`;

        feedback.classList.add("incorrect-text");



        allOptions.forEach(button => {

            if (button.dataset.answer === correctAnswer) {
                button.classList.add("correct");
            }

        });
    }


    nextButton.disabled = false;
}


nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
});


function showResult() {

    quizCard.classList.add("hidden");

    resultCard.classList.remove("hidden");

    finalScore.textContent =
        `${score} / ${questions.length}`;


    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Excellent! You answered every question correctly.";

    } else if (percentage >= 60) {

        resultMessage.textContent =
            "Good job! You have a solid understanding of web development.";

    } else {
        resultMessage.textContent =
            "Keep practicing! Every question is another step forward.";
    }
}

restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    resultCard.classList.add("hidden");

    quizCard.classList.remove("hidden");

    loadQuestion();
});

loadQuestion();