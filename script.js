const questionHeader = document.getElementById("question-header");
const question = document.getElementById("question");
const userAnswer = document.getElementById("answer");
const currentScore = document.getElementById("current-score");
const resultDisplay = document.getElementById("results");
const timeElapsedDisplay = document.getElementById("time-to-complete");

let timerVar;
let totalSeconds = 0;
let expectedOutcome;
let questionNumber = 0;
let elapsedTime = "0";
let score = 0;
let incorrectAnswers = 0;
let practicePagePath = /practice/gm;
let resultPagePath = /results/gm;
sessionStorage.setItem("correctAnswers", "0");

if (practicePagePath.test(window.location.pathname)) {
    userAnswer.addEventListener('keyup', checkAnswer);
    setQuestion();
    timerVar = setInterval(countTimer, 1000);
    sessionStorage.setItem("incorrectAnswers", "0");
    sessionStorage.setItem("elapsedTime", "0");
} else if (resultPagePath.test(window.location.pathname)) {
    displayResults();
}

function countTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds - hour * 3600) / 60);
    let seconds = totalSeconds - (hour * 3600 + minute * 60);
    if (hour < 10)
        hour = "0" + hour;
    if (minute < 10)
        minute = "0" + minute;
    if (seconds < 10)
        seconds = "0" + seconds;
    elapsedTime = `${hour}:${minute}:${seconds}`;
    document.getElementById("time").textContent = elapsedTime;
}

function setQuestion() {
    questionNumber++;
    let rightSide = Math.floor(Math.random() * 21);
    let leftSide = Math.floor(Math.random() * 21);
    let operationList = ["+", "-", "x", "/"];
    let operatorSelection = Math.floor(Math.random() * 4);
    let easyDivisors = [1, 2, 3, 4, 5, 6, 8, 10];

    if (operationList[operatorSelection] == "/") {
        leftSide = easyDivisors[Math.floor(Math.random() * 8)];
        rightSide = leftSide * (Math.floor(Math.random() * 15));
    }

    questionHeader.textContent = "Question " + questionNumber;
    question.textContent = rightSide + " " + operationList[operatorSelection] + " " + leftSide;

    if (operationList[operatorSelection] == "+") {
        expectedOutcome = rightSide + leftSide;
    } else if (operationList[operatorSelection] == "-") {
        expectedOutcome = rightSide - leftSide;
    } else if (operationList[operatorSelection] == "x") {
        expectedOutcome = rightSide * leftSide;
    } else {
        expectedOutcome = rightSide / leftSide;
    }

    console.log(expectedOutcome);
}

function checkAnswer(event) {
    if (event.keyCode == 13) {
        console.log(userAnswer.value);
        if (userAnswer.value == expectedOutcome) {
            score++;
            currentScore.textContent = score + "/20";
        } else {
            incorrectAnswers++;
        }
        if (score < 20) {
            userAnswer.value = '';
            setQuestion();
        } else {
            clearInterval(timerVar);
            sessionStorage.setItem("incorrectAnswers", incorrectAnswers);
            sessionStorage.setItem("elapsedTime", elapsedTime);
            window.location.replace('results.html');
        }
    }
}

function displayResults() {
    let totalIncorrectAnswers = sessionStorage.getItem("incorrectAnswers");
    if (totalIncorrectAnswers == 0) {
        resultDisplay.textContent = 'You answered 20 questions correctly with no mistakes!';
    } else if (totalIncorrectAnswers == 1) {
        resultDisplay.textContent = 'You answered 20 questions correctly with 1 mistake.';
    } else {
        resultDisplay.textContent = 'You answered 20 questions correctly with ' + totalIncorrectAnswers + ' mistakes.'
    }

    timeElapsedDisplay.textContent = sessionStorage.getItem("elapsedTime");
}