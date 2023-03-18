const calculatorDisplay = document.getElementById("display");
const clearButton = document.getElementById("clear-button");
const decimalButton = document.getElementById("decimal");

const jsBackButton = document.querySelector(".js-back-button");

const numberButtons = document.querySelectorAll(".js-number");
const operatorButtons = document.querySelectorAll(".js-operator");

let firstValue = 0;
let operator = "";
let next = false;

function handleNumberClicked(value) {
  const displayValue = calculatorDisplay.textContent;
  if (!next && value.length + displayValue.length > 16) {
    return;
  }
  if (next) {
    calculatorDisplay.textContent = value;
    next = false;
  } else {
    calculatorDisplay.textContent =
      displayValue === "0" ? value : `${displayValue}${value}`;
  }
}

const operate = {
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "/": (firstNumber, secondNumber) => {
    if (secondNumber === 0) {
      alert("Dividing by 0 is not possible. Please try something else.");
      return firstNumber;
    }
    return firstNumber / secondNumber;
  },
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function handleOperatorClicked(value) {
  console.log(value);
  if (operator && next) {
    operator = value;
    return;
  }

  const currentValue = +calculatorDisplay.textContent;
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = operate[operator](firstValue, currentValue);
    firstValue = calculation;
    console.log(calculation, calculation.toString().length);
    if (calculation.toString().length > 16) {
      calculatorDisplay.textContent = calculation.toExponential();
    } else {
      calculatorDisplay.textContent = calculation;
    }
  }
  next = true;
  operator = value;
}

function handleDecimalClicked() {
  const displayValue = calculatorDisplay.textContent;
  if (!next && !displayValue.includes(".")) {
    calculatorDisplay.textContent = `${displayValue}.`;
  }
}

function handleClearClicked() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operator = "";
  next = false;
}

function handleBackButtonClicked() {
  const displayValue = calculatorDisplay.textContent;
  if (next || displayValue === "0") {
    return;
  }

  if (displayValue.length === 1) {
    calculatorDisplay.textContent = "0";
  } else {
    calculatorDisplay.textContent = displayValue.slice(0, -1);
  }
}

numberButtons.forEach((b) =>
  b.addEventListener("click", () => handleNumberClicked(b.value))
);

operatorButtons.forEach((b) =>
  b.addEventListener("click", () => handleOperatorClicked(b.value))
);

clearButton.addEventListener("click", handleClearClicked);
decimalButton.addEventListener("click", handleDecimalClicked);
jsBackButton.addEventListener("click", handleBackButtonClicked);

document.onkeydown = function (event) {
  if ("+*-/".includes(event.key)) {
    handleOperatorClicked(event.key);
  } else if (event.key === "Enter") {
    handleOperatorClicked("=");
  } else if (event.key === ".") {
    handleDecimalClicked();
  } else if (event.key === "Backspace") {
    handleBackButtonClicked();
  } else if (event.key === "Escape") {
    handleClearClicked();
  } else if ("0123456789".includes(event.key)) {
    handleNumberClicked(event.key);
  }
};
