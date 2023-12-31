// document.addEventListener("DOMContentLoaded", () => {
//     console.log("Connected");
//     fetchData("http://localhost:3000/questions")
// })

// function fetchData(url) {
//     fetch(url)
//     .then((resp) => resp.json())
//     .then((data) => console.log(data))
// }
//Above is just for reference to data from json


const header = document.querySelector('h1');

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
        alert("Error fetching questions. Check connection.", error);
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
            if (counter > 8) {
               alert(`Time is up! You scored ${counter}/10, great job!`) 
            } else if (counter > 5) {
                alert(`Time is up! You scored ${counter}/10, not bad!`)
            } else {
                alert(`Time is up! You scored ${counter}/10, keep studying!`)
            }  
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
            button.addEventListener("mouseover", () => highlight(button));
            button.addEventListener("mouseout", () => unhighlight(button));
            button.addEventListener("click", () => toggleBold(button));
            button.addEventListener("click", () => handleClick(button, item));
            
        });

        list.appendChild(p);
    });
}

function highlight(button) {
    button.style.color = "black"
}
        
function unhighlight(button) {
    button.style.color = "white"
}

function toggleBold(button) {
    if (button.style.fontWeight === "normal" || button.style.fontWeight === "") {
        button.style.fontWeight = "bold"
    } 
}

function handleClick(button, item) {
    if (button.innerText === item.answer) {
        counter++;
        alert("Very good!  Move on to the next question.");
        button.style.backgroundColor = "green";
    } else {
        alert("Incorrect, try again!");
        counter--;
        button.remove()
    }
}

