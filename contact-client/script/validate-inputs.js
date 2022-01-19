// read form element
let ALL_INPUT_VALID;

//reading fields from input form
const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const description = document.getElementById('description');

/* Aufgabe: Lesen Sie folgende Input-Elemente aus:
  lastName, subject, description (textarea), phone
*/
//--Begin

//--End

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email ist nicht richtig');
    ALL_INPUT_VALID = false;
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `Diese Eingabe wird benötigt`);
      isRequired = true;
      ALL_INPUT_VALID = false;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,
        `Diese Eingabe muss mindestens ${min} Zeichen lang sein`
    );
    ALL_INPUT_VALID = false;
  } else if (input.value.length > max) {
    showError(input,
        `Diese Eingabe darf maximal ${max} Zeichen lang sein`
    );
    ALL_INPUT_VALID = false;
  } else {
    showSuccess(input);
  }
}


// Check phone is valid
//https://www.w3resource.com/javascript/form/phone-no-validation.php
/* Aufgabe:
    Validieren Sie die Mobile-Nummer ähnlich wie bei der Email mit einer
    Regular expression (regex). Für eine geeignete regex suchen Sie
    im Internet nach "javascript regular expression for mobile number".
*/
//--Begin
function checkPhone(input) {
  const re = /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Mobilenummer ist nicht richtig');
    ALL_INPUT_VALID = false;
  }
}
//--End


/**
 * Get fieldname
 * @param input: HTML-Element by its id
 * @returns {string}: Returns caption of the input field with first Letter in capital
 */
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/**
 * Validate form input elements
 */
/* Aufgabe: Validieren Sie folgende Input-Elemente aus:
  lastName, subject, phone
*/
//--Begin
function validateForm(){
  if(!checkRequired([firstName, lastName, email, phone, subject, description])){
    checkLength(firstName, 3, 20);
    checkLength(lastName, 3, 30);
    checkEmail(email);
    checkPhone(phone);
  }
}
//--End

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
  console.log(`Es wird einen Testcall zum Server gemacht...`);
  getWelcome().then(
      result => {
        console.log(`Antwort des Servers: ${result}`);
      },
      error => {
        console.log(error)
      }
  );
};

/**
 * Event listener
 */
form.addEventListener('submit', function(e) {
  ALL_INPUT_VALID = true;
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
  //Send Data
  if (ALL_INPUT_VALID){
    //Pay attention: use value property to send data. If omitting
    //you're sending HTML-DOM objects!

    /* Aufgabe: Senden Sie folgende zusätzlich Input-Daten zum Server:
        lastName, subject, description, phone
    */
    //--Begin
    let formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        subject: subject.value,
        description: description.value
      }
    //--End

    console.log(`Alle Eingaben sind korrekt. Daten werden an Server gesendet: 
      ${JSON.stringify(formData)}`);

    //Variant 1
    //sendForm1(formData);

    //Variant 2
    sendForm2(formData).then(
        result => {
          console.log(`Antwort des Servers: ${result}`);
          window.location.href = './confirm.html';
        },
        error => {
          console.log(error);
        }
    );


  } else {
    console.log("Mindestens eine Validierung hat nicht funktioniert. Es wurden keine Daten an den Server übermittelt.")
  }

});
