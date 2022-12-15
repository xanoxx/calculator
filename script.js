function add(a, b) {return a+b;}
function subtract(a, b) {return a-b;}
function multiply(a, b) {return a*b;}
function divide(a, b) {return (b !== 0) ? a/b : 'ERROR';}
function operate(operator, num1, num2) {
    let res;
    switch(operator) {
        case 'add':
            res = add(num1, num2);
            break;
        case 'subtract':
            res = subtract(num1, num2);
            break;
        case 'multiply':
            res = multiply(num1, num2);
            break;
        case 'divide':
            res = divide(num1, num2);
            break;
        default:
            res = 'ERROR';
            break;
    }
    return res;
}

let number = '';
const screen = document.querySelector('#screen');
const numButtons = document.querySelectorAll('button.number');
const opButtons = document.querySelectorAll('button.operator');
const equalButton = document.querySelector('button.equal');
const clearButton = document.querySelector('button.clear');

let num1, num2;
let inserted = false;
let op1, op2;

function clearDisplay() {
    number = '';
    screen.textContent = number;
}

numButtons.forEach((btn) => {
    btn.addEventListener('click', e => {
        number += btn.id;
        screen.textContent = number;
        
        if (!inserted) {
            num1 = Number(number); 
        } else {
            num2 = Number(number);
        }

    })
});

opButtons.forEach((btn) => {
    btn.addEventListener('click', e => {
        inserted = true;
        number = '';
        
        let op = btn.id;
        
        if (op1 === undefined) {
            op1 = op; 
        } else {
            op2 = op;
        }

        if (op2 !== undefined) {
            console.log(num1, num2, op1, op2, 'second op');

            if (num2 === undefined) {
                num2 = num1;
            } 
            num1 = operate(op1, num1, num2);

            if (num1 !== Math.floor(num1)) {
                num1 = num1.toFixed(5);
            } 

            screen.textContent = num1;
            num2 = undefined; 
            op1 = op2;
            op2 = undefined;

            console.log(num1, num2, op1, op2, 'second op');
        }
    })
});

equalButton.addEventListener('click', e => {
    console.log(num1, num2, op1, op2, 'equal');

    if (op1 === undefined) return;

    if (num2 === undefined) {
        num2 = num1;
    }
    let res = operate(op1, num1, num2);
    if (res !== Math.floor(res)) {
        res = res.toFixed(5);
    }
    screen.textContent = res; 
    num1 = res; 
    num2 = undefined;
    op1 = undefined; 

    console.log(num1, num2, op1, op2, 'equal');    
});

clearButton.addEventListener('click', e => {
    num1 = undefined;
    num2 = undefined;
    op1 = undefined;
    op2 = undefined;
    inserted = false;
    clearDisplay();
    screen.textContent = '0';
});