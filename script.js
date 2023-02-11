// DOM elements
const numberBtns = document.querySelectorAll(".num")
const operatorBtns = document.querySelectorAll(".operator")
const equalBtn = document.querySelector(".equal")
const acBtn = document.querySelector(".ac")
const pmBtn = document.querySelector(".pm")
const percentBtn = document.querySelector(".percent")
const prevDisplay = document.querySelector(".previous-display")
const currentDisplay = document.querySelector(".current-display")
const decimalBtn = document.querySelector(".decimal")

// variables
let prevDisplayContent = ""
let currentDisplayContent = ""
let operator = ""
let numbers = []
let operators = []
let equalPressed = false

// AC button
acBtn.addEventListener('click', () => {
    prevDisplay.textContent = ''
    currentDisplay.textContent = '0'
    operator = ''
})

// show buttons on display when pressed
numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        // app starts / AC pressed (opr unknown)
        if (operator === '') {
            // if there's 0 on display
            if (currentDisplay.textContent === '0' || currentDisplay.textContent === '-0') {
                currentDisplay.textContent = btn.textContent
            } else {
                currentDisplay.textContent += btn.textContent
            }
            // if operator known
        } else {
            // if user types 0 first, can't use numbers anymore unless "."
            if (currentDisplay.textContent.startsWith("0") && !currentDisplay.textContent.includes(".")) {
                return null
            }
            // if result is on the current display
            if (equalPressed) {
                currentDisplay.textContent = btn.textContent
                equalPressed = false
            } else {
                currentDisplay.textContent += btn.textContent
            }
        }
        // flush numbers array, so that numbers[0] changes for operations
        numbers = []
    })
})

// decimal can only be in one place in the entire array
decimalBtn.addEventListener("click", () => {
    if (currentDisplay.textContent.includes(".")) {
        return null
    } else if (currentDisplay.textContent === '') {
        currentDisplay.textContent = "0."
    } else {
        currentDisplay.textContent += '.'
    }
})

// when operator pressed, move current disp to uppermost disp
operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        number = currentDisplay.textContent.slice(0, currentDisplay.textContent.length)
        operator = btn.textContent
        numbers.push(number)
        operators.push(operator)
        console.log(numbers)
        console.log(operators)

        // if nothing shows on current display (at least 2nd turn of opr. presses)
        if (!currentDisplay.textContent) {
            let previous_operator = operators[operator.length - 1]

            if (previous_operator === operator) {
                prevDisplay.textContent = numbers[0] + operator
                return null
            } else {
                prevDisplay.textContent = numbers[0] + operator
            }
            // first time an operator pressed
        } else {
            if (operator === "＋") {
                prevDisplay.textContent = currentDisplay.textContent + operator
            } else if (operator === "－") {
                prevDisplay.textContent = currentDisplay.textContent + operator
            } else if (operator === "✕") {
                prevDisplay.textContent = currentDisplay.textContent + operator
            } else {
                prevDisplay.textContent = currentDisplay.textContent + operator
            }
        }
        currentDisplay.textContent = ''
    })
})

// when plus/minus button pressed
pmBtn.addEventListener("click", () => {
    if (currentDisplay.textContent[0] !== '-') {
        if (currentDisplay.textContent === '' || currentDisplay.textContent === '0') {
            currentDisplay.textContent = "-0"
        } else {
            currentDisplay.textContent = "-" + currentDisplay.textContent
        }
    } else {
        currentDisplay.textContent = currentDisplay.textContent.slice(1)
    }
})

// when percent pressed
percentBtn.addEventListener("click", () => {
    currentDisplay.textContent = String((strNumberConversion(currentDisplay.textContent) * 0.01).toPrecision(1))
})

// OPERATIONS: when equal pressed
equalBtn.addEventListener("click", () => {
    operator = prevDisplay.textContent[prevDisplay.textContent.length - 1]
    numbers = []
    operators = []

    switch (operator) {
        case '＋':
            currentDisplay.textContent = format_if_decimal(strNumberConversion(currentDisplay.textContent) + strNumberConversion(prevDisplay.textContent.slice(0, prevDisplay.textContent.length - 1)))
            break;
        case '－':
            currentDisplay.textContent = format_if_decimal(strNumberConversion(prevDisplay.textContent.slice(0, prevDisplay.textContent.length - 1)) - strNumberConversion(currentDisplay.textContent))
            break;
        case '✕':
            currentDisplay.textContent = format_if_decimal(strNumberConversion(currentDisplay.textContent) * strNumberConversion(prevDisplay.textContent.slice(0, prevDisplay.textContent.length - 1)))
            break;
        case '÷':
            currentDisplay.textContent = format_if_decimal(strNumberConversion(prevDisplay.textContent.slice(0, prevDisplay.textContent.length - 1)) / strNumberConversion(currentDisplay.textContent))
            break;

        default:
            break;
    }
    if (isNaN(currentDisplay.textContent)) {
        prevDisplay.textContent = ""
        currentDisplay.textContent = "Error"
        equalPressed = true
    } else {
        prevDisplay.textContent = ""
        equalPressed = true
    }
})


// format decimal numbers to have max 2 decimal places 
function format_if_decimal(n) {
    if (n % 1 != 0) {
        return n.toFixed(2)
    } else {
        return n
    }
}

function strNumberConversion(n) {
    if (n[0] === '-') {
        n = -1 * Number(n.slice(1))
        return n
    } else {
        return Number(n)
    }
}