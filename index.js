document.addEventListener("DOMContentLoaded", () => {
    console.log("Connected");
    fetchData("http://localhost:3000/questions")
})

function fetchData(url) {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
}
//Above is just for reference to data from json


const header = document.querySelector('h1');
header.style.fontSize = "40px";

let counter = 0;

const list = document.querySelector("#questionList");
const instructions = document.querySelector("#instructions");
const startButton = document.querySelector("#start");

startButton.addEventListener("click", startGame);

function startGame() {
    fetch("http://localhost:3000/questions")
    .then((resp) => resp.json())
    .then((questions) => {
        post(questions)
        startButton.remove();
        instructions.innerText = "Choose the correct answer for each.  60-second timer starts now!";
        startTimer();
    })
    .catch((error) => {
        console.error("Error fetching questions. Check connection.", error);
    });
}

function startTimer() {
    let seconds = 60;
    const timer = document.querySelector("#timer");
    const timerInterval = setInterval(() => {
        seconds--;
        timer.innerText = seconds;
        if (seconds === 0) {
            clearInterval(timerInterval);
            alert(`Time is up! I hope you learned some basics about JavaScript.  Thanks for playing!`)
        }
        }, 1000)
    }

function post(questions) {
    questions.forEach((item) => {
        const p = document.createElement("p");
        p.innerText = item.question;
        p.style.fontWeight = "bold";
        p.style.fontSize = "28px";

        const ul = document.createElement("ul");
        p.appendChild(ul);

        item.choices.forEach((choice) => {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.innerText = choice;
            li.appendChild(button);
            ul.appendChild(li);
            button.classList.add("choice-button");
            button.addEventListener("mouseover", highlight);
            button.addEventListener("mouseout", unhighlight);
            button.addEventListener("click", handleClick(button, item));
            button.addEventListener("click", toggleBold);
        });

        list.appendChild(p);
    });
}

function highlight() {
    button.style.color = "blue"
}
        
function unhighlight() {
    button.style.color = "black"
}
        
function toggleBold() {
    if (button.style.fontWeight === "normal" || button.style.fontWeight === "") {
        button.style.fontWeight = "bold"
    } else {
        button.style.fontWeight = "normal"
    }
}

function handleClick(button, item) {
    if (button.innerText === item.answer) {
        counter++;
        alert("Very good!  Move on to the next question.")
    } else {
        alert("Incorrect, try again!");
        button.remove()
    }
}

