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
let counter = 0

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
            alert(`Time is up! ${counter}/10`)
        }
        }, 1000)
    }





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
        const button = document.createElement("button");
        button.innerText = choice;
        li.appendChild(button);
        button.classList.add("choice-button");
        button.addEventListener("mouseover", highlight);
        button.addEventListener("mouseout", unhighlight);
        function highlight() {
            button.style.color = "blue"
        }
        
        function unhighlight() {
            button.style.color = "black"
        }
        button.addEventListener("click", toggleBold);
        function toggleBold() {
            if (button.style.fontWeight === "normal" || button.style.fontWeight === "") {
                button.style.fontWeight = "bold"
            } else {
                button.style.fontWeight = "normal"
            }
        }
        button.addEventListener("click", () => {
            if (button.innerText === item.answer) {
                counter++
            }
            item.choices.forEach((choice) => {
                if (button.innerText !== choice) {
                    console.log(choice)
                }
            })

        })


        })
    })
}

