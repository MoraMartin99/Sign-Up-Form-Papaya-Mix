/* Variables globales */
/* -------------------------------------------------------------------------------------------------- */

const form = document.querySelector("form");
const inputArr = Array.from(document.querySelectorAll("#form input"));
const createButton = document.querySelector("#createButton");

/* -------------------------------------------------------------------------------------------------- */

/* Tests */
/* -------------------------------------------------------------------------------------------------- */

const isValidHTMLInput = (input) => {
    input.setCustomValidity("");
    return input.checkValidity();
};

const hasMinimumLength = (input) => {
    const value = input.value;
    const lengthReg = /^\S{8,}$/;
    return lengthReg.test(value);
};

const hasUpperAndLowerCase = (input) => {
    const value = input.value;
    const lowerReg = /[a-z]/;
    const upperReg = /[A-Z]/;
    return lowerReg.test(value) && upperReg.test(value);
};

const hasDigit = (input) => {
    const value = input.value;
    const digReg = /\d/;
    return digReg.test(value);
};

const hasSpecialChar = (input) => {
    const value = input.value;
    const specialReg = /[^a-z0-9\s]/i;
    return specialReg.test(value);
};

const areSamePassword = (input) => {
    const value = input.value;
    const password = document.querySelector("#contraseña").value;
    if (value === "") return false;
    return value === password;
};

/* -------------------------------------------------------------------------------------------------- */

/* Handlers */
/* -------------------------------------------------------------------------------------------------- */
const focusOutHandler = (e) => {
    const target = e.target;
    testHandler(target);
    if (!target.checkValidity()) {
        target.addEventListener("input", onInputHandler);
    }
};

const onInputHandler = (e) => {
    const target = e.target;
    testHandler(target);
};

const rippleHandler = (e) => {
    const button = e.currentTarget;
    const children = Array.from(document.querySelectorAll(`#${button.id} *`));

    children.forEach((child) => {
        child.remove();
    });

    const ripple = document.createElement("div");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const coordinateX = e.clientX - button.getBoundingClientRect().x - radius;
    const coordinateY = e.clientY - button.getBoundingClientRect().y - radius;
    ripple.classList.add("ripple");

    button.appendChild(ripple);
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${coordinateX}px`;
    ripple.style.top = `${coordinateY}px`;
};

const testHandler = (input) => {
    const testOptions = {
        nombre: { test: [isValidHTMLInput] },
        apellido: { test: [isValidHTMLInput] },
        email: { test: [isValidHTMLInput] },
        nTelefono: { test: [isValidHTMLInput] },
        contraseña: { test: [hasMinimumLength, hasUpperAndLowerCase, hasDigit, hasSpecialChar] },
        rContraseña: { test: [areSamePassword] },
    };
    const testArr = testOptions[input.id].test;
    const inputInstTextArr = Array.from(document.querySelectorAll(`#${input.id} ~ .instructionText`));
    const resultArr = testArr.map((currentTest, currentIndex) => {
        const result = currentTest(input);
        if (result) {
            if (inputInstTextArr.length > 0) {
                removeClass(inputInstTextArr[currentIndex], ["customInvalid"]);
                addClass(inputInstTextArr[currentIndex], ["customValid"]);
            }
            return result;
        }
        if (inputInstTextArr.length > 0) {
            removeClass(inputInstTextArr[currentIndex], ["customValid"]);
            addClass(inputInstTextArr[currentIndex], ["customInvalid"]);
        }
        return result;
    });
    const succeedAllTest = resultArr.every((test) => {
        return test === true;
    });

    addClass(input, ["targetInput"]);

    if (succeedAllTest) {
        input.setCustomValidity("");
    } else {
        input.setCustomValidity("Favor ingresar un valor válido");
    }
};

/* -------------------------------------------------------------------------------------------------- */

/* Funciones de bajo nivel */
/* -------------------------------------------------------------------------------------------------- */

const addClass = (element, classArr) => {
    classArr.forEach((currentClass) => {
        element.classList.add(currentClass);
    });
};

const removeClass = (element, classArr) => {
    classArr.forEach((currentClass) => {
        element.classList.remove(currentClass);
    });
};

/* -------------------------------------------------------------------------------------------------- */

/* Utilidades */
/* -------------------------------------------------------------------------------------------------- */

let printAllEventListener = () => {
    let elementArr = Array.from(document.querySelectorAll("body, body *"));
    elementArr.forEach((element) => {
        if (Object.keys(getEventListeners(element)).length > 0) {
            console.log(getEventListeners(element));
            console.log(element);
        }
    });
};

/* -------------------------------------------------------------------------------------------------- */

