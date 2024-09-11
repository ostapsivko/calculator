class Calculator {
    constructor () {

        this.add = function (x, y) {
            return x + y;
        };
        this.subtract = function (x, y) {
            return x - y;
        };
    
        this.multiply = function(x, y) {
            return x * y;
        };
    
        this.divide = function (x, y) {
            return x / y;
        };
    
        this.operate = function (operation) {
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
        };

        this.numbers = document.querySelector(".numbers");

        this.numbers.addEventListener("click", (e) => {
            if(e.target !== this.numbers) {
                if(!this.operation)
                    this.operation = this.operations.newOperation();
                
                this.display.input += e.target.innerText;
                this.display.updateDisplayValue();
            }
        });

        this.display = new Display();
        this.operations = new Operations();
        this.operation = this.operations.newOperation();

        this.operations.element.addEventListener("click", (e) => {
            if(e.target !== this.operations.element) {
                if(!this.operation) {
                    this.display.input = "ERROR";
                    return;
                }                    
                
                if(e.target.innerText === "=") {
                    this.operation.second = this.display.input;
                    
                    this.display.input = this.operate(this.operation);
                    this.display.updateDisplayValue();
                } else {
                    this.operation.first = this.display.input;
                    
                    this.display.input = this.operation.operator = e.target.innerText;
                    this.display.updateDisplayValue();
                    this.display.input = "";
                }
            }
        });
    }
};

class Operations {
    constructor() {
        this.element = document.querySelector(".operations");
        this.newOperation = function() {
            return new Operation();  
        }
    }
}

class Operation {
    constructor() {
        this.first = "";
        this.second = "";
        this.operator = "";
    }
}

class Display {
    constructor() {
        this.input = "";
        this.element = document.querySelector(".display");
        this.updateDisplayValue = function () {
            this.element.value = this.input;
        };
    }
}

const calculator = new Calculator();