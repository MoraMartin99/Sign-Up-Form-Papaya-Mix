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

