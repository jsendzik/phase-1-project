// Traditional Function Expression
function add(x, y) {
    return x + y;
}

// Arrow Function
const add = (x, y) => x + y;

//Arrow Function with {} Braces
const add = (x, y) => {
    return x + y
}

//Arrow Function with Single Parameter
const greet = name => `Hello, ${name}`

//Arrow Function with No Parameter
const hello = () => `Hello, World!`

//Array of Numbers
const numbers = [9, 16, 25]

//Square Roots
const squareRoots = numbers.map((number) => Math.sqrt(number))
console.log(squareRoots) // [3, 4, 5]

//Apply Discount Function
const applyDiscount = (price, discount) => price - (price * discount);
console.log(applyDiscount(50, .10))  // 45