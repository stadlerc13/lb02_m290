// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate form data
 * @param data
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateFormData(data) {
    // Check required fields
    let result = validateLib.checkRequired("firstName", data.firstName);
    if (result.isNotValid) {
        return result;
    }


    //Aufgabe: checkRequired für lastName, subject, description, phone hinzufügen
    //--Begin
    result = validateLib.checkRequired("lastName", data.lastName);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("email", data.email);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("phone", data.phone);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkRequired("subject", data.subject);
    if (result.isNotValid) {
        return result;
    }
    result = validateLib.checkRequired("description", data.description);
    if (result.isNotValid) {
        return result;
    }


    //--End

    //check length
    result = validateLib.checkLength("firstName", data.firstName, 3, 50);
    if (result.isNotValid) {
        return result;
    }

    //Aufgabe: checkLength für lastName hinzufügen
    //--Begin
    result = validateLib.checkLength("lastName", data.lastName, 3, 50);
    if (result.isNotValid) {
        return result;
    }
    //--End

    result = validateLib.checkLength("subject", data.subject, 3, 50);
    if (result.isNotValid) {
        return result;
    }

    result = validateLib.checkLength("description", data.description, 3, 500);
    if (result.isNotValid) {
        return result;
    }

    //check email syntax
    result = validateLib.checkEmail("email", data.email);
    if (result.isNotValid) {
        return result;
    }

    //check mobile syntax
    //Aufgabe: Validierungsregel der Mobilenummer anwenden
    //--Begin
    result = validateLib.checkMobileNumber("phone", data.phone);
    if (result.isNotValid) {
        return result;
    }
    //--End


    //all inputs are valid and isNotValid=false
    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateContact: validateFormData
}
