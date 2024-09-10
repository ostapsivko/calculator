function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(op1, op2, operator) {
    switch(operator) {
        case "+":
            return add(op1, op2);
        case "-":
            return subtract(op1, op2);
        case "*":
            return multiply(op1, op2);
        case "/":
            return divide(op1, op2);
    }
}

const display = document.querySelector(".display");
const numbers = document.querySelector(".numbers");
const operations = document.querySelector(".operations");

let input = "";
let first = "";
let second = "";
let operator = "";

numbers.addEventListener("click", (e) => {
    if(e.target !== numbers) {
        input += e.target.innerText;
        updateDisplayValue(input);
    }
});

operations.addEventListener("click", (e) => {
    if(e.target.innerText === "=") {
        second = input;
        let result = operate(Number(first), Number(second), operator);
        updateDisplayValue(result);
    } else if(e.target !== operations) {
        first = input;
        input = operator = e.target.innerText;

        updateDisplayValue(input);

        input = "";
    }
});

function updateDisplayValue(value) {
    display.value = value;
}