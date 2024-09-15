class Calculator {
    constructor () {
        this.operate = function (operation, operator) {
            switch(operator) {
                case "+":
                    return Number(operation.firstOperand) + Number(operation.secondOperand);
                case "-":
                    return Number(operation.firstOperand) - Number(operation.secondOperand);
                case "*":
                    return Number(operation.firstOperand) * Number(operation.secondOperand);
                case "/":
                    if(Number(operation.secondOperand) === 0)
                        return "You tried to divide by zero. I hope you regret this."

                    return Number(operation.firstOperand) / Number(operation.secondOperand);
            }
        };

        this.numbers = document.querySelector(".numbers");

        this.numbers.addEventListener("click", (e) => {
            if(e.target !== this.numbers) {
                if(!this.operation)
                    this.operation = this.operations.newOperation();
                                
                if(this.operation.firstOperator === "") {
                    if(this.display.input === "0") {
                        //first input
                        this.display.input = e.target.innerText;
                    } else if(this.display.input === e.target.innerText) {
                        //previous operation just completed
                        this.display.input = e.target.innerText;
                    } else {
                        //first input continues
                        this.display.input += e.target.innerText;
                    }
                } else if(this.operation.secondOperator === "") {
                    if(this.display.input === this.operation.firstOperand) {
                        //second input start
                        this.display.input = e.target.innerText;
                    } else {
                        //second input continues
                        this.display.input += e.target.innerText;
                    }
                }

                this.display.updateDisplayValue();
            }
        });

        this.display = new Display();
        this.operations = new Operations();
        this.operation = this.operations.newOperation();

        this.handleOperationCompletion = function() {
            this.operation.second = this.display.input;
            
            let result = this.operate(this.operation);
            
            this.operation = this.operations.newOperation();
            this.display.input = this.operation.first = result
            this.display.updateDisplayValue();
            this.display.input = "";
        }

        this.operations.element.addEventListener("click", (e) => {
            if(e.target.classList.contains("equals")) {
                //TODO handle '='
                return;
            }
            
            if(e.target !== this.operations.element) {
                if(!this.operation) {
                    this.display.input = "ERROR";
                } else if(this.operation.firstOperator !== "" && this.operation.secondOperator === "") {
                    this.operation.secondOperator = e.target.innerText;
                    this.operation.secondOperand = this.display.input;
                    this.display.input = this.operate(this.operation, this.operation.firstOperator);
                    this.operation.firstOperand = this.display.input; 
                } else if(this.operation.firstOperator !== "" && this.operation.secondOperator !== "") {
                    this.operation.secondOperand = this.display.input;
                    this.display.input = this.operate(this.operation, this.operation.secondOperator);
                    this.operation.secondOperator = e.target.innerText;
                    this.operation.firstOperand = this.display.input;
                } else {
                    this.operation.firstOperator = e.target.innerText;
                    this.operation.firstOperand = this.display.input;
                }

                this.display.updateDisplayValue();
            }
        });

        this.clear = document.querySelector(".clear");
        this.clear.addEventListener("click", (e) => {
            this.display.input = "";
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
        this.firstOperator = "";
        this.secondOperator = "";
    }
}

class Display {
    constructor() {
        this.input = "0";
        this.element = document.querySelector(".display");
        this.updateDisplayValue = function () {
            // if(this.input.length > 9)
            //     this.input = this.input.substring(0, 9);

            this.element.value = this.input;
        };

        this.updateDisplayValue();
    }
}

const calculator = new Calculator();