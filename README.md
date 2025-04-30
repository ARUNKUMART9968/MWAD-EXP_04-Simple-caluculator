# MWAD-EXP_04-Simple-caluculator
## Date:

## AIM
To  develop a Simple Calculator using React.js with clean and responsive design, ensuring a smooth user experience across different screen sizes.

## ALGORITHM
### STEP 1
Create a React App.

### STEP 2
Open a terminal and run:
  <ul><li>npx create-react-app simple-calculator</li>
  <li>cd simple-calculator</li>
  <li>npm start</li></ul>

### STEP 3
Inside the src/ folder, create a new file Calculator.js and define the basic structure.

### STEP 4
Plan the UI: Display screen, number buttons (0-9), operators (+, -, *, /), clear (C), and equal (=).

### STEP 5
Create a new file Calculator.css in src/ and add the styling.

### STEP 6
Open src/App.js and modify it.

### STEP 7
Start the development server.
  npm start

### STEP 8
Open http://localhost:3000/ in the browser.

### STEP 9
Test the calculator by entering numbers and operations.

### STEP 10
Fix styling issues and refine content placement.

### STEP 11
Deploy the website.

### STEP 12
Upload to GitHub Pages for free hosting.

## PROGRAM
``` react
app.jsx
import React, { useState } from 'react';
import './App.css';
import Calculator from './calculator';

function App() {
  return (
    <div className="App">
      <h1>React Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;
```
```react
calulator.jsx
import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (operator === '+') {
      return firstOperand + inputValue;
    }
    if (operator === '-') {
      return firstOperand - inputValue;
    }
    if (operator === '*') {
      return firstOperand * inputValue;
    }
    if (operator === '/') {
      return firstOperand / inputValue;
    }

    return inputValue;
  };

  const handleEquals = () => {
    if (!operator) return;

    const inputValue = parseFloat(display);
    const result = performCalculation();

    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    const percentValue = currentValue / 100;
    setDisplay(String(percentValue));
  };

  const toggleSign = () => {
    const currentValue = parseFloat(display);
    setDisplay(String(-1 * currentValue));
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display-value">{display}</div>
      </div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="key-clear" onClick={clearDisplay}>AC</button>
            <button className="key-sign" onClick={toggleSign}>±</button>
            <button className="key-percent" onClick={handlePercentage}>%</button>
          </div>
          <div className="digit-keys">
            <button className="key-0" onClick={() => inputDigit('0')}>0</button>
            <button className="key-dot" onClick={() => inputDecimal()}>.</button>
            <button className="key-1" onClick={() => inputDigit('1')}>1</button>
            <button className="key-2" onClick={() => inputDigit('2')}>2</button>
            <button className="key-3" onClick={() => inputDigit('3')}>3</button>
            <button className="key-4" onClick={() => inputDigit('4')}>4</button>
            <button className="key-5" onClick={() => inputDigit('5')}>5</button>
            <button className="key-6" onClick={() => inputDigit('6')}>6</button>
            <button className="key-7" onClick={() => inputDigit('7')}>7</button>
            <button className="key-8" onClick={() => inputDigit('8')}>8</button>
            <button className="key-9" onClick={() => inputDigit('9')}>9</button>
          </div>
        </div>
        <div className="operator-keys">
          <button className="key-divide" onClick={() => handleOperator('/')}>÷</button>
          <button className="key-multiply" onClick={() => handleOperator('*')}>×</button>
          <button className="key-subtract" onClick={() => handleOperator('-')}>−</button>
          <button className="key-add" onClick={() => handleOperator('+')}>+</button>
          <button className="key-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
```
```css
app.css
.App {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}


.calculator {
  width: 320px;
  background-color: #222;
  border-radius: 12px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}

.calculator-display {
  background-color: #1c1c1c;
  color: white;
  text-align: right;
  padding: 20px;
  font-size: 36px;
  font-weight: 300;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  overflow: hidden;
}

.display-value {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.calculator-keypad {
  display: flex;
}

.input-keys {
  width: 240px;
}

.function-keys {
  display: flex;
  height: 64px;
}

.digit-keys {
  display: flex;
  flex-wrap: wrap;
  height: 256px;
}

.operator-keys {
  display: flex;
  flex-direction: column;
  width: 80px;
}

button {
  font-size: 20px;
  font-weight: 100;
  border: none;
  border-right: 1px solid #444;
  border-bottom: 1px solid #444;
  outline: none;
  color: white;
  padding: 0;
  margin: 0;
  background-color: #323232;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:active {
  background-color: #4d4d4d;
}

.function-keys button {
  flex: 1;
  background-color: #a5a5a5;
  color: black;
}

.function-keys button:active {
  background-color: #d9d9d9;
}

.digit-keys button {
  width: 80px;
  height: 64px;
}

.key-0 {
  width: 160px !important;
}

.operator-keys button {
  height: 64px;
  background-color: #f1a33c;
}

.operator-keys button:active {
  background-color: #f8c37c;
}

/* For better responsive behavior */
@media (max-width: 350px) {
  .calculator {
    width: 280px;
  }
  
  .input-keys {
    width: 210px;
  }
  
  .digit-keys button {
    width: 70px;
  }
  
  .key-0 {
    width: 140px !important;
  }
  
  .operator-keys {
    width: 70px;
  }
}
```

## OUTPUT
![image](https://github.com/user-attachments/assets/0fa2aa7f-9f95-4e2d-9694-a6fbb3b5cfe7)


## RESULT
The program for developing a simple calculator in React.js is executed successfully.
