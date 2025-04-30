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

