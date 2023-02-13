class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operator = undefined
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        if (equalsPressed) {
            this.currentOperand = ''
            equalsPressed = false
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    calculatePercentage() {
        this.currentOperand = (Number(this.currentOperand) * 0.01).toPrecision(1)
    }

    prependPM() {
        console.log(typeof (this.currentOperand))
        if (this.currentOperand.toString().startsWith("-")) {
            this.currentOperand = this.currentOperand.toString().slice(1)
        } else {
            this.currentOperand = "-" + this.currentOperand.toString()
        }
    }

    chooseOperator(operator) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let calculation
        let prev = Number(this.previousOperand)
        let curr = Number(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return

        switch (this.operator) {
            case "＋":
                calculation = prev + curr
                break;
            case "－":
                calculation = prev - curr
                break;
            case "✕":
                calculation = prev * curr
                break;
            case "÷":
                calculation = prev / curr
                break;
            default:
                return;
        }
        this.currentOperand = calculation
        this.operator = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent = this.currentOperand
        if (this.operator) {
            this.previousOperandTextElement.textContent =
                `${this.previousOperand} ${this.operator}`
        } else {
            this.previousOperandTextElement.textContent = ''
        }
    }
}

//#region DOM elements
const numberBtns = document.querySelectorAll(".num")
const operatorBtns = document.querySelectorAll(".operator")
const equalsBtn = document.querySelector(".equal")
const acBtn = document.querySelector(".ac")
const pmBtn = document.querySelector(".pm")
const percentBtn = document.querySelector(".percent")
const previousOperandTextElement = document.querySelector(".previous-operand")
const currentOperandTextElement = document.querySelector(".current-operand")
let equalsPressed = false
//#endregion


// instantiation of an object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

acBtn.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsBtn.addEventListener("click", () => {
    calculator.calculate()
    calculator.updateDisplay()
    equalsPressed = true
})

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.textContent)
        calculator.updateDisplay()
    })
})

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.chooseOperator(btn.textContent)
        calculator.updateDisplay()
    })
})

pmBtn.addEventListener("click", () => {
    calculator.prependPM()
    calculator.updateDisplay()
})

percentBtn.addEventListener("click", () => {
    calculator.calculatePercentage()
    calculator.updateDisplay()
})