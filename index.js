const output = document.getElementById('output');
let currentInput = '0';
let previousInput = '';
let operator = null;
let isReset = false;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;

        if (button.classList.contains('clear')) {
            clearCalculator();
        } else if (button.classList.contains('operator')) {
            handleOperator(buttonText);
        } else {
            handleNumber(buttonText);
        }

        // Dynamically adjust the font size based on the length of the output
        adjustFontSize();
    });
});

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    output.innerText = currentInput;
    resetFontSize(); // Reset font size after clearing
}

function handleOperator(operatorInput) {
    if (operatorInput === '=') {
        if (operator && previousInput !== '') {
            currentInput = calculate(previousInput, currentInput, operator);
            operator = null;
        }
    } else {
        if (operator) {
            currentInput = calculate(previousInput, currentInput, operator);
        }
        previousInput = currentInput;
        operator = operatorInput;
        currentInput = '0';
    }
    output.innerText = currentInput;
}

function handleNumber(number) {
    if (isReset) {
        currentInput = number;
        isReset = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    output.innerText = currentInput;
}

function calculate(a, b, operator) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (operator) {
        case '+':
            return (numA + numB).toString();
        case '-':
            return (numA - numB).toString();
        case '×':
            return (numA * numB).toString();
        case '÷':
            return (numA / numB).toString();
        default:
            return b;
    }
}

// Function to adjust font size dynamically based on output length
function adjustFontSize() {
    const maxLength = 9; // Maximum number of digits before reducing font size
    const defaultFontSize = 56; // Default font size in pixels

    if (output.innerText.length > maxLength) {
        const newFontSize = defaultFontSize - (output.innerText.length - maxLength) * 4;
        output.style.fontSize = `${Math.max(newFontSize, 24)}px`; // Minimum font size is 24px
    } else {
        resetFontSize();
    }
}

// Function to reset the font size to default
function resetFontSize() {
    output.style.fontSize = '56px';
}
