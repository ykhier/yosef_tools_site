/*Check the inputs of the form.
In case of error user will get an message clerifying the error, else user will be redirect
to the login/main page
*/
//Note: The validation of email is done by default by the input type.
function validation() {
  //text area for error messages
  var inf = document.getElementById("information");
  //inputs values
  var fname = trim(document.getElementById("fname").value);
  var lname = trim(document.getElementById("lname").value);
  var password = document.getElementById("psw").value;
  var email = document.getElementById("email").value;
  var message = "";
  //Check if names contain only letters with regular expressions
  /*
  +: Matches one or more of any letter from the [a-zA-Z] character class.
 $: Can be no additional characters after the alphabetic characters.*/
  let regexName = /^[a-zA-Z]+$/;
  // Check if password contains at least one upper case, one lower case, one digit, and one special character.
  let regexNums = /[0-9]/,
    regexSigns = /[!@#$%^&*-_]/,
    regexUpLetter = /[A-Z]/,
    regexLowLetter = /[a-z]/,
    regexOnlyEnglishLetters = /^[a-zA-Z0-9!@#$%^&*-_]+$/;
  var checkNames = regexName.test(fname) && regexName.test(lname);
  if (!checkNames) message += "Names should only contain letters.\n";
  var checkPassword =
    password.length >= 8 &&
    regexNums.test(password) &&
    regexSigns.test(password) &&
    regexLowLetter.test(password) &&
    regexUpLetter.test(password) &&
    regexOnlyEnglishLetters.test(password);
  if (!checkPassword)
    message +=
      "Password should be at least 8 characters long and contain at least one digit, one special character, one uppercase letter, and one lowercase letter.";
  inf.hidden = false;
  if (checkNames && checkPassword) {
    inf.innerText = "Form is valid. You will be redirected soon.";
    // Redirect to main page/login page

    //Add users detaild to data base
    createNewUser(email, fname, lname, password);
    var us = getAllUsers();
    console.log(us);
    alert("Congrats!!You have successfully signed up");
    window.location.href = "loginForm.html";
  } else {
    inf.innerText = message;
  }
}

//Later on, we will have usercheck-if the user already exists

//Show password when clicking on the eye icon,in the next click hide it
function showPassword() {
  var password = document.getElementById("psw");
  var icon = document.getElementById("eyeicon");
  if (password.type === "password") {
    password.type = "text";
    icon.innerText = "🙈";
  } else {
    password.type = "password";
    icon.innerText = "👁️";
  }
}

//Function from the lecture to remove spaces in the beginning and the end
function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

//Clear all the previous error messages
function resetMessage() {
  document.getElementById("information").hidden = true;
  document.getElementById("information").innerText = "";
}

// this function -> validates input to ensure only alphabetic characters (a-z, A-Z) and spaces are allowed
// prevents input if a digit or other invalid character is pressed
function validInput(event, messageId) {
  var key = event.key;
  var message = document.getElementById(messageId);
    
  // check if the key is not a valid letter, space, Backspace, or Delete
  if (!( /^[a-zA-Z ]$/.test(key) || key === 'Backspace' || key === 'Delete')) {
        //if the key is not CapsLock, Alt, or Tab
    if (key != 'CapsLock' && key != 'Alt' && key != 'Tab') {
      alert('You can only enter A-Z, a-z, or spaces.');
      event.preventDefault();
      message.style.display = 'block';
    }
  } else {
      message.style.display = 'none';
  }
}