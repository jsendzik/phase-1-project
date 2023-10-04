document.addEventListener("DOMContentLoaded", () => console.log("Connected"))
//Do next 
//get a working fetch request from a db.json file
//replace above console.log with fetch function
function fetchData(url) {
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => console.log(data))

}