const questionHeader = document.getElementById("question-header");
const question = document.getElementById("question");
const userAnswer = document.getElementById("answer");
const currentScore = document.getElementById("current-score");

userAnswer.addEventListener('keyup', checkAnswer);

let timerVar = setInterval(countTimer, 1000);
let totalSeconds = 0;
let expectedOutcome;
let questionNumber = 0;
let score = 0;

mathsQuestions();


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
    document.getElementById("time").textContent = hour + ":" + minute + ":" + seconds;
}

function mathsQuestions() {
    questionNumber++;
    let rightSide = Math.floor(Math.random() * 21);
    let leftSide = Math.floor(Math.random() * 21);
    let operationList = ["+", "-", "x"];
    let operatorSelection = Math.floor(Math.random() * 3);

    questionHeader.textContent = "Question " + questionNumber;
    question.textContent = rightSide + " " + operationList[operatorSelection] + " " + leftSide;

    if (operationList[operatorSelection] == "+") {
        expectedOutcome = rightSide + leftSide;
    } else if (operationList[operatorSelection] == "-") {
        expectedOutcome = rightSide - leftSide;
    } else {
        expectedOutcome = rightSide * leftSide;
    }

    console.log(expectedOutcome);
}

function checkAnswer(event) {
    if (event.keyCode == 13) {
        console.log(userAnswer.value);
        if (userAnswer.value == expectedOutcome) {
            score++;
            currentScore.textContent = score + "/20";
        }
        if (score < 20) {
            userAnswer.value = '';
            mathsQuestions();
        }
    }
}