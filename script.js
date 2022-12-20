
const calculatorDisplay = document.getElementById('calculatorDisplay');

const operators = document.getElementsByClassName('operator');
const keyEquals = document.getElementById('keyEquals');
const keyClear = document.getElementById('keyClear');
const keyDelete = document.getElementById('keyDelete');
const keyDot = document.getElementById('keyDot');

let displayValue = '';
let firstOperand;
let secondOperand;
let selectedOperator;
let mode = 'input';

function add(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

for (let i = 0; i < 10; i++) {
    document.getElementById(`key${i}`).addEventListener('click', () => {
        mode = 'input';
        displayValue = +(`${displayValue}${i}`);
        displayNumber(displayValue);
    });
}

keyDot.addEventListener('click', () => {
    if (!displayValue.toString().includes('.')) {
        mode = 'input';
        displayValue = `${displayValue}.`;
        displayNumber(displayValue);
    }
});

Array.from(operators).forEach(operator => {
    operator.addEventListener('click', () => {
        mode = 'output';
        if (firstOperand) equals();
        selectedOperator = window[`${operator.dataset.operator}`];
        firstOperand = +displayValue;
        displayValue = '';
    })
});

keyEquals.addEventListener('click', () => {
    mode = 'output';
    equals();
    selectedOperator = null;
    firstOperand = null;
});

function equals() {
    let result = operate(selectedOperator, firstOperand, +displayValue);
    displayValue = result;
    displayNumber(result);
}

keyClear.addEventListener('click', () => {
    displayNumber('');
    displayValue = '';
    firstOperand = null;
    selectedOperator = null;
});

keyDelete.addEventListener('click', () => {
    if (mode === 'input') {
        displayValue = +displayValue.toString().slice(0, -1);
        displayNumber(displayValue);
    }
});

function operate(operator, a, b) {
    return operator(a, b);
}

function displayNumber(number) {
    calculatorDisplay.textContent = number;
}



