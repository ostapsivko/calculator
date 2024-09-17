class Calculator {
    constructor () {
        this.operate = function () {
            switch(this.operation.operator) {
                case "+":
                    return Number(this.operation.firstOperand) + Number(this.operation.secondOperand);
                case "-":
                    return Number(this.operation.firstOperand) - Number(this.operation.secondOperand);
                case "*":
                    return Number(this.operation.firstOperand) * Number(this.operation.secondOperand);
                case "/":
                    if(Number(this.operation.secondOperand) === 0)
                        return "You tried to divide by zero"

                    return Number(this.operation.firstOperand) / Number(this.operation.secondOperand);
            }
        };

        this.numbers = document.querySelector(".numbers");

        this.numbers.addEventListener("click", (e) => {
            if(e.target.classList.contains("number")) {
                if(!this.operation)
                    this.operation = this.operations.newOperation();
                                
                if(this.display.input === "0" || this.operation.isNewOperand) {
                    this.display.input = e.target.innerText;
                    this.operation.isNewOperand = false;
                } else {
                    this.display.input += e.target.innerText;
                }

                this.display.updateDisplayValue();
            }
        });

        this.display = new Display();
        this.operations = new Operations();
        this.operation = this.operations.newOperation();

        this.operations.element.addEventListener("click", (e) => {
            if(e.target.classList.contains("equals")) {
                if(!this.operation || this.operation.operator === "") {
                    this.display.input = "ERROR";
                    this.display.updateDisplayValue(); 
                    this.display.input = "0";
                } else {
                    this.operation.secondOperand = this.display.input;
                    let result = this.operate();
                    this.display.input = result;
                    this.operation = this.operations.newOperation();

                    if(isNaN(result)) {
                        this.display.updateDisplayValue(); 
                        this.display.input = "0";
                        return;
                    }

                    this.operation.firstOperand = this.display.input;
                    this.display.updateDisplayValue(); 
                    this.operation.isNewOperand = true;
                }
            } else if(e.target.classList.contains("operator")) {
                if(!this.operation) {
                    this.display.input = "ERROR";
                } else if(this.operation.operator !== "") {
                    let newOperator = e.target.innerText;
                    this.operation.secondOperand = this.display.input;
                    let result = this.operate();
                    this.display.input = result;
                    this.operation = this.operations.newOperation();

                    if(isNaN(result)) {
                        this.display.updateDisplayValue(); 
                        this.display.input = "0";
                        return;
                    }

                    this.operation.firstOperand = result;
                    this.operation.operator = newOperator;
                    this.display.updateDisplayValue(); 
                    this.operation.isNewOperand = true;
                } else {
                    this.operation.operator = e.target.innerText;
                    this.operation.firstOperand = this.display.input;
                    this.operation.isNewOperand = true;
                }
            } else if(e.target.classList.contains("dot")) {
                if(!this.display.input.includes(".")) {
                    this.display.input += e.target.innerText;
                    this.display.updateDisplayValue();
                }
            }
        });

        this.clear = document.querySelector(".clear");
        this.clear.addEventListener("click", (e) => {
            this.display.input = "0";
            this.operation = this.operations.newOperation();
            this.display.updateDisplayValue();
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
        this.firstOperand = "";
        this.secondOperand = "";
        this.operator = "";
        this.isNewOperand = true;
    }
}

class Display {
    constructor() {
        this.input = "0";
        this.element = document.querySelector(".display");
        this.updateDisplayValue = function () {
            let value = this.input.toString();

            if(value.length > 10) {
                value = Number(value).toPrecision(10);
            }
            
            this.element.value = value;
        };

        this.updateDisplayValue();
    }
}

const calculator = new Calculator();