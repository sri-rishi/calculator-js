const app = document.querySelector(".app")
const checkbox = document.getElementById("theme-checkbox");
const container = document.querySelector(".container");
const title = document.querySelector(".title");
const buttonDiv = document.querySelector(".buttons-div");
const purpleButton = document.querySelectorAll(".bg-purple"); 

const prevInput = document.querySelector(".prev-input");
const currInput = document.querySelector(".curr-input");
const tempResult = document.querySelector(".temp-result");
const operationsEl = document.querySelectorAll(".operations");
const numbersEl = document.querySelectorAll(".numbers");
const point = document.querySelector(".dot");
const zero = document.querySelector(".btn-0");
const equal = document.querySelector(".equal");
const clearLastEntity = document.querySelector(".last-entity-clear");
const clearAll = document.querySelector(".all-clear");


checkbox.addEventListener("change", () => {
    app.classList.toggle("light");
    container.classList.toggle("container-light");
    title.classList.toggle("title-dark");
    buttonDiv.classList.toggle("buttons-div-light");
    purpleButton.forEach(button => button.classList.toggle("bg-purple-light"))
})

let prevInputVal = "";
let currInputVal = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach((number) => {
    number.addEventListener("click", (e) => {
        if(e.target.innerText === "." && !haveDot) {
            haveDot = true;
        }else if(e.target.innerText === '.' && haveDot) {
            return;
        }

        currInputVal += e.target.innerText;
        currInput.innerText = currInputVal
    })
});

operationsEl.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if(!currInputVal) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(prevInputVal && currInputVal && lastOperation) {
            calculateExpression();
        }else {
            result = parseFloat(currInputVal);
        }
        clearVal(operationName);
        lastOperation = operationName
    })
})

const clearVal = (name = " ") => {
    prevInputVal += currInputVal + " " + name + " ";
    prevInput.innerText = prevInputVal;
    currInput.innerText = "";
    currInputVal = "";
    tempResult.innerText = result;
}

const calculateExpression = () => {
    if(lastOperation === "X"){
        result = parseFloat(result) * parseFloat(currInputVal);
    }else if(lastOperation === "+"){
        result = parseFloat(result) + parseFloat(currInputVal);
    }else if(lastOperation === "-"){
        result = parseFloat(result) - parseFloat(currInputVal);
    }else if(lastOperation === "/"){
        result = parseFloat(result) / parseFloat(currInputVal);
    }else if(lastOperation === "%"){
        result = parseFloat(result) % parseFloat(currInputVal);
    }
}

equal.addEventListener("click", (e) => {
    if(!prevInputVal || !currInputVal) return;
    haveDot = false;
    calculateExpression();
    clearVal();
    currInput.innerText = result;
    tempResult.innerText = "";
    currInputVal = result;
    console.log((prevInputVal))
    prevInputVal = "";
});

clearAll.addEventListener("click", (e) => {
    prevInputVal = "";
    currInputVal = "";
    prevInput.innerText = "0";
    currInput.innerText = "0";
    result = "";
    tempResult.innerText = "0"
});

clearLastEntity.addEventListener("click", (e) => {
    if(currInput.innerText !== "0") {
        currInput.innerText = "";
        currInputVal = ""
    }
})


window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButtonEl(e.key);
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOperation(e.key);
    } else if (e.key === "*") {
        clickOperation("x");
    } else if (e.key == "Enter" || e.key === "=") {
        clickEqual();
    }
});

const clickButtonEl = (key) => {
    numbersEl.forEach((number) => {
        if (number.innerText === key) {
            number.click();
        }
    });
}

const clickOperation = (key) => {
    operationsEl.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

const clickEqual = () => {
    equal.click();
}