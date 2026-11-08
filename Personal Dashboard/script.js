/*CLOCK*/

const clock = document.getElementById("clock");
const date = document.getElementById("date");

function updateClock() {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    date.textContent = now.toLocaleDateString([], {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

updateClock();

setInterval(updateClock, 1000);


/*TASKS*/

const tasks = [
    document.getElementById("task1"),
    document.getElementById("task2"),
    document.getElementById("task3")
];

tasks.forEach(function(task, index) {

    const saved = localStorage.getItem("task" + (index + 1));

    if (saved === "true") {
        task.checked = true;
    }

    task.addEventListener("change", function() {

        localStorage.setItem(
            "task" + (index + 1),
            task.checked
        );

    });

});


/*FOCUS TIMER*/

const timer = document.getElementById("timer");
const startTimer = document.getElementById("startTimer");

let focusSeconds = 25 * 60;
let focusRunning = false;
let focusInterval = null;

function showFocusTime() {

    const minutes = Math.floor(focusSeconds / 60);
    const seconds = focusSeconds % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

showFocusTime();


startTimer.addEventListener("click", function() {

    if (!focusRunning) {

        focusRunning = true;

        startTimer.textContent = "Pause Focus";

        focusInterval = setInterval(function() {

            focusSeconds--;

            showFocusTime();

            if (focusSeconds <= 0) {

                clearInterval(focusInterval);

                focusRunning = false;

                startTimer.textContent = "Start Focus";

                focusSeconds = 25 * 60;

                showFocusTime();

                alert("Focus session finished.");

            }

        }, 1000);

    } else {

        clearInterval(focusInterval);

        focusRunning = false;

        startTimer.textContent = "Start Focus";
    }

});


/*NOTES*/

const noteText = document.getElementById("noteText");
const saveNote = document.getElementById("saveNote");

const savedNote = localStorage.getItem("dashboardNote");

if (savedNote) {
    noteText.value = savedNote;
}


saveNote.addEventListener("click", function() {

    localStorage.setItem(
        "dashboardNote",
        noteText.value
    );

    saveNote.textContent = "Saved";

    setTimeout(function() {
        saveNote.textContent = "Save Note";
    }, 1200);

});


/*STUDY TIMER*/

const studyHours = document.getElementById("studyHours");
const startStudy = document.getElementById("starStudy");

let studySeconds = 0;
let studyRunning = false;
let studyInterval = null;

const savedStudyTime =
    Number(localStorage.getItem("studySeconds"));

if (!isNaN(savedStudyTime)) {
    studySeconds = savedStudyTime;
}


function showStudyTime() {

    const hours = Math.floor(studySeconds / 3600);

    const minutes =
        Math.floor((studySeconds % 3600) / 60);

    studyHours.textContent =
        hours + "h " +
        String(minutes).padStart(2, "0") +
        "m";
}

showStudyTime();


startStudy.addEventListener("click", function() {

    if (!studyRunning) {

        studyRunning = true;

        startStudy.textContent = "Stop Study";

        studyInterval = setInterval(function() {

            studySeconds++;

            localStorage.setItem(
                "studySeconds",
                studySeconds
            );

            showStudyTime();

        }, 1000);

    } else {

        clearInterval(studyInterval);

        studyRunning = false;

        startStudy.textContent = "Start Study";
    }

});


/*CODING TIME*/

const totalCodingSeconds =
    (19 * 60 * 60) + (14 * 60);

const targetSeconds =
    153 * 60 * 60;

const remainingSeconds =
    targetSeconds - totalCodingSeconds;

const codingTimeBoxes =
    document.querySelectorAll(".time-box h3");


function formatCodingTime(seconds) {

    const hours = Math.floor(seconds / 3600);

    const minutes =
        Math.floor((seconds % 3600) / 60);

    return hours + "h " +
        String(minutes).padStart(2, "0") +
        "m";
}


if (codingTimeBoxes.length >= 3) {

    codingTimeBoxes[0].textContent =
        formatCodingTime(totalCodingSeconds);

    codingTimeBoxes[1].textContent =
        "4h 29m";

    codingTimeBoxes[2].textContent =
        "15h 44m";
}


/*MAIN GOAL*/

const goalProgress =
    document.querySelector(".goal-progress-bar");

const goalSmall =
    document.querySelector(".goal-small");

const goalHours =
    document.querySelectorAll(".goal-hours strong");


const progress =
    (totalCodingSeconds / targetSeconds) * 100;


if (goalProgress) {
    goalProgress.style.width =
        progress + "%";
}


if (goalSmall) {

    goalSmall.textContent =
        formatCodingTime(totalCodingSeconds) +
        " / 153h";
}


if (goalHours.length >= 3) {

    goalHours[0].textContent =
        formatCodingTime(totalCodingSeconds);

    goalHours[1].textContent =
        formatCodingTime(remainingSeconds);

    goalHours[2].textContent =
        "153h";
}