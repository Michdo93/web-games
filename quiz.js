const questions = [
    {
        question: "Wie heißt dieser Roboter?",
        options: ["NAO", "Pepper", "Turtlebot", "Panda"],
        answer: "Pepper"
    },
    {
        question: "Was ist eine Abkürzung für HTML?",
        options: ["Hyper Text Markup Language", "High Tech Machine Learning", "Happy Time with Monkeys", "Hello To My Land"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Für was steht 'KI'?",
        options: ["Künstliche Intelligenz", "Kluge Innovation", "Kreative Idee", "Kollektive Intuition"],
        answer: "Künstliche Intelligenz"
    },
    {
        question: "Was ist ein Algorithmus?",
        options: ["Eine spezielle Rechenoperation", "Ein großer Computer", "Ein bestimmtes Programm", "Eine mathematische Formel"],
        answer: "Eine spezielle Rechenoperation"
    },
    {
        question: "Was bedeutet 'HTTP'?",
        options: ["HyperText Transfer Protocol", "Highway To The Planet", "Halt Time, Please", "Help The Technology Progress"],
        answer: "HyperText Transfer Protocol"
    },
    {
        question: "Was ist ein 'Byte'?",
        options: ["Eine Maßeinheit für Daten", "Ein kleines Insekt", "Eine Verbindung im Internet", "Eine Art von Programmiersprache"],
        answer: "Eine Maßeinheit für Daten"
    },
    {
        question: "Was ist ein Betriebssystem?",
        options: ["Eine Software, die den Betrieb eines Computers ermöglicht", "Ein Computer für den Betrieb", "Ein elektronisches Handbuch", "Ein Bürogebäude für Computersysteme"],
        answer: "Eine Software, die den Betrieb eines Computers ermöglicht"
    },
    {
        question: "Was ist ein 'Router'?",
        options: ["Ein Gerät zur Datenübertragung zwischen Computernetzwerken", "Ein elektronisches Werkzeug", "Ein Programm zum Zeichnen von Linien", "Ein Bestandteil eines Autos"],
        answer: "Ein Gerät zur Datenübertragung zwischen Computernetzwerken"
    },
    {
        question: "Was ist 'Open Source Software'?",
        options: ["Software, deren Quellcode öffentlich zugänglich ist", "Software, die nur mit einem speziellen Schlüssel geöffnet werden kann", "Eine besonders teure Software", "Eine Software nur für staatliche Organisationen"],
        answer: "Software, deren Quellcode öffentlich zugänglich ist"
    },
    {
        question: "Was bedeutet 'URL'?",
        options: ["Uniform Resource Locator", "Unique Radio Location", "Universal Research Link", "Ultimate Reality Location"],
        answer: "Uniform Resource Locator"
    }
];    

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('nextButton');

function displayQuestion() {
    questionElement.textContent = questions[currentQuestion].question;
    optionsElement.innerHTML = '';

    questions[currentQuestion].options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', checkAnswer);
        optionsElement.appendChild(button);
    });
}

function checkAnswer(e) {
    const selectedOption = e.target.textContent;
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
        resultElement.textContent = 'Richtig!';
    } else {
        resultElement.textContent = 'Falsch!';
    }
    nextButton.disabled = false;
    optionsElement.querySelectorAll('.option').forEach(option => option.disabled = true);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        resultElement.textContent = '';
        nextButton.disabled = true;
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.textContent = `Quiz beendet! Du hast ${score} von ${questions.length} Fragen richtig beantwortet.`;
    optionsElement.innerHTML = '';
    resultElement.textContent = '';
    nextButton.disabled = true;
}

nextButton.addEventListener('click', nextQuestion);

displayQuestion();
