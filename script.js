const previousScreen = document.getElementById('previousOnScreen');
const currentScreen = document.getElementById('currentOnScreen');
const numButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.getElementById('clearBtn');
const undoButton = document.getElementById('undoBtn');
const floatButton = document.getElementById('floatBtn');
const resultButton = document.getElementById('resultBtn');


window.addEventListener('keydown', handleKeyboardInput);
