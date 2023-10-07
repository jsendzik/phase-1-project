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


const startButton = document.querySelector("#start")
startButton.addEventListener("click", startGame)

function startGame() {
    fetch("http://localhost:3000/questions")
    .then((resp) => resp.json())
    .then((questions) => post(questions))
}

function post(questions) {
    questions.forEach((item) => {
        const p = document.createElement("p")
        list.appendChild(p);
        p.innerText = item.question;
    })
}