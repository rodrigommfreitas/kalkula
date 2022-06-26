const maxScreenDigits = 8;
let currentScreenDigits = 0;
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetCurrentScreen = false;

const previousScreen = document.getElementById('previousScreen');
const currentScreen = document.getElementById('currentScreen');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.getElementById('clearBtn');
const undoButton = document.getElementById('undoBtn');
const floatButton = document.getElementById('floatBtn');
const resultButton = document.getElementById('resultBtn');

function resetScreen() {
    currentScreen.textContent = '0';
    currentScreenDigits = 0;
    shouldResetCurrentScreen = false;
}

function printNumber(num) {
    if (currentScreenDigits >= maxScreenDigits)
        return;
    if (currentScreen.textContent === '0' || shouldResetCurrentScreen) {
        resetScreen();
        currentScreen.textContent = num;
    }
    else currentScreen.textContent += num;
    currentScreenDigits++;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = currentScreen.textContent;
    currentOperation = operator;
    previousScreen.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetCurrentScreen = true;
    currentScreenDigits--;
}

function clear() {
    currentScreen.textContent = '0';
    previousScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    currentScreenDigits = 0;
    shouldResetCurrentScreen = false;
}

function undo() {
    if (currentScreen.textContent === '0') return;
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
    if (currentScreen.textContent === '')
        currentScreen.textContent = 0;
    currentScreenDigits--;
}

function appendPoint() {
    if (currentScreen.textContent === '0' ||
        currentScreen.textContent.includes('.') ||
        currentScreenDigits > maxScreenDigits - 1) return;
    currentScreen.textContent += '.';
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const remainder = (a, b) => a % b;

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            if (b === 0) return null;
            else return divide(a, b);
        case '%':
            if (b > a) return a;
            if (b === 0) return null;
            return remainder(a, b);
        default:
            return null;
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function evaluate() {
    if (currentOperation === null) return;
    if (currentOperation === '÷' && currentScreen.textContent === '0') {
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = currentScreen.textContent;
    currentScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
    previousScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null;
}

function convertOperator(operator) {
    if (operator === '/') return '÷';
    if (operator === '*') return '×';
    if (operator === '-') return '-';
    if (operator === '+') return '+';
    if (operator === '%') return '%';
}

function useKeyboard(e) {
    if (e.key >= 0 && e.key <= 9) printNumber(e.key);
    if (e.key === '.') appendPoint();
    if (e.key === '=' || e.key === 'Enter') evaluate();
    if (e.key === 'Backspace') undo();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key));
}

numberButtons.forEach((button) =>
    button.addEventListener('click', () => printNumber(button.textContent)));
operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent)));
clearButton.addEventListener('click', clear);
undoButton.addEventListener('click', undo);
floatButton.addEventListener('click', appendPoint);
resultButton.addEventListener('click', evaluate);
window.addEventListener('keydown', useKeyboard);