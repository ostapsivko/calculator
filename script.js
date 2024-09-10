let calculator = {
    add: function (x, y) {
        return x + y;
    },

    subtract: function (x, y) {
        return x - y;
    },

    multiply: function(x, y) {
        return x * y;
    },

    divide: function (x, y) {
        return x / y;
    },

    operate: function (operation) {
        switch(operation.operator) {
            case "+":
                return this.add(Number(operation.first), Number(operation.second));
            case "-":
                return this.subtract(Number(operation.first), Number(operation.second));
            case "*":
                return this.multiply(Number(operation.first), Number(operation.second));
            case "/":
                return this.divide(Number(operation.first), Number(operation.second));
        }
    },
    
    updateDisplayValue: function (value) {
        display.value = value;
    },

    newOperation: function() {
        return {
            first: "",
            second: "",
            operator: "",
        }
    }
};

calculator.display = display = document.querySelector(".display");
calculator.numbers = document.querySelector(".numbers");
calculator.operations = document.querySelector(".operations");

let input = "";
let operation = calculator.newOperation();

calculator.numbers.addEventListener("click", (e) => {
    if(e.target !== calculator.numbers) {
        input += e.target.innerText;
        calculator.updateDisplayValue(input);
    }
});

calculator.operations.addEventListener("click", (e) => {
    if(e.target.innerText === "=") {
        operation.second = input;
        let result = calculator.operate(operation);
        calculator.updateDisplayValue(result);
    } else if(e.target !== calculator.operations) {
        operation.first = input;
        input = operation.operator = e.target.innerText;
        calculator.updateDisplayValue(input);
        input = "";
    }
});