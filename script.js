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
let prevDisplayContent = "";
let currentDisplayContent = "";
let operator = "";
let equalOrPercentPressed = false;

// AC button
acBtn.addEventListener('click', () => {
    prevDisplay.textContent = ''
    currentDisplay.textContent = '0'
    prevDisplayContent = ''
    currentDisplayContent = ''
})

// show buttons on display when pressed
numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (prevDisplayContent === '' || prevDisplayContent === null) {
            if (currentDisplay.textContent === '0') {
                currentDisplay.textContent = btn.textContent
            } else {
                currentDisplay.textContent += btn.textContent
            }
        } else {
            currentDisplayContent += btn.textContent
            currentDisplay.textContent = currentDisplayContent
        }
    })
})

// decimal can only be in one place in the entire array
decimalBtn.addEventListener("click", () => {
    if (currentDisplay.textContent.includes(".")) {
        return null
    } else if (currentDisplay.textContent === '') {
        currentDisplay.textContent = '0.'
    } else {
        currentDisplay.textContent += '.'
    }
})

// todo: operator can be used once until equal
// when operator pressed, move current disp to uppermost disp
operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        prevDisplayContent = currentDisplay.textContent + btn.textContent
        prevDisplay.textContent = prevDisplayContent
        currentDisplayContent = ''
        // currentDisplay.textContent = ''
        console.log(prevDisplayContent[prevDisplayContent.length - 1] === "－")
        if (prevDisplayContent[prevDisplayContent.length - 1] === "－") {
            if (btn.textContent === "－") {
                return null
            } else if (btn.textContent === "＋") {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "＋"
            } else if (btn.textContent === "✕") {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "✕"
            } else {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "÷"
            }
        } else if (prevDisplayContent[prevDisplayContent.length - 1] === "＋") {
            if (btn.textContent === "＋") {
                return null
            } else if (btn.textContent === "－") {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "－"
            } else if (btn.textContent === "✕") {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "✕"
            } else {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "÷"
            }

        } else if (prevDisplayContent[prevDisplayContent.length - 1] === "✕") {
            if (btn.textContent === "✕") {
                return null
            } else if (btn.textContent === "－") {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "－"
            } else if (btn.textContent === "＋") {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "＋"
            } else {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "÷"
            }
        } else {
            if (btn.textContent === "÷") {
                return null
            } else if (btn.textContent === "－") {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "－"
            } else if (btn.textContent === "＋") {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "＋"
            } else {
                prevDisplayContent = prevDisplayContent.slice(0, prevDisplayContent.length) + "✕"
            }
        }

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
    operator = prevDisplayContent[prevDisplayContent.length - 1]

    switch (operator) {
        case '＋':
            currentDisplay.textContent = format_if_decimal(strNumberConversion(currentDisplay.textContent) + strNumberConversion(prevDisplayContent.slice(0, prevDisplayContent.length - 1)))
            break;
        case '－':
            currentDisplay.textContent = format_if_decimal(strNumberConversion(prevDisplayContent.slice(0, prevDisplayContent.length - 1)) - strNumberConversion(currentDisplay.textContent))
            break;
        case '✕':
            currentDisplay.textContent = format_if_decimal(strNumberConversion(currentDisplay.textContent) * strNumberConversion(prevDisplayContent.slice(0, prevDisplayContent.length - 1)))
            break;
        case '÷':
            currentDisplay.textContent = format_if_decimal(strNumberConversion(prevDisplayContent.slice(0, prevDisplayContent.length - 1)) / strNumberConversion(currentDisplay.textContent))
            break;

        default:
            break;
    }

    prevDisplayContent = currentDisplay.textContent
    prevDisplay.textContent = prevDisplayContent
    currentDisplayContent = ''
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