document.addEventListener("DOMContentLoaded", () => {
    console.log("Connected");
    fetchData("http://localhost:3000/questions")
})

function fetchData(url) {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => console.log(data))
}

const header = document.querySelector('h1')
header.style.fontSize = "40px"

const list = document.querySelector("#questionList")
const instructions = document.querySelector("#instructions")

const startButton = document.querySelector("#start")
startButton.addEventListener("click", startGame)

function startGame() {
    fetch("http://localhost:3000/questions")
    .then((resp) => resp.json())
    .then((questions) => post(questions));
    startButton.remove();
    instructions.innerText = "Choose the correct answer for each.  60-second timer starts now!";
    startTimer()
}

function startTimer() {
    let seconds = 60
    let timerInterval = setInterval(() => {
        seconds--;
        document.querySelector("#timer").innerText = seconds;
        if (seconds === 0) {
            clearInterval(timerInterval);
            alert("Time is up!")
        }
        }, 1000)
    }

const choiceButtons = document.querySelector("#choiceButtons");
choiceButtons.addEventListener("mouseover", highlight)

function post(questions) {
    questions.forEach((item) => {
        const p = document.createElement("p");
        list.appendChild(p);
        p.innerText = item.question;
        const ul = document.createElement("ul");
        p.appendChild(ul);
        item.choices.forEach((choice) => {
        const li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = `<button id="choiceButtons">${choice}</button>`;
        })
        
        
    })
}

