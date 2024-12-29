function validateForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var department = document.getElementById("department").value;
  var message = document.getElementById("textbox").value;
  var issue = document.getElementById("issue");
  var check = 0;
  var msg = "Enter your "; // Clear previous issues

  // Check if name field is empty
  if (name === "") {
    msg += "name";
    check = 1;
  }
  // Check if email field is empty
  if (email === "") {
    msg += (check ? ", " : "") + "email";
    check = 1;
  }
  // Check if subject field is empty
  if (subject === "") {
    msg += (check ? ", " : "") + "subject";
    check = 1;
  }
  // Check if message field is empty
  if (message === "" || message === "enter your message") {
    msg += (check ? ", " : "") + "message";
    check = 1;
  }
  // Check if relevant department is selected
  if (department === "none") {
    msg += (check ? ", " : "") + "department";
    check = 1;
  }
  // If all checks pass, submit the form
  if (check == 0) {
    alert("Form submitted successfully!");
    createNewApplication(name,email,subject,department,message);
    console.log(getAllApplications());
    clearForm();
    return false; // Prevent form submission for demonstration
  } else {
    issue.innerText = msg;
    return false; // Prevent form submission if there are issues
  }
  
}

function clearForm() {
  // Clear form inputs and issue message
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("department").value = "none";
  document.getElementById("textbox").value = "enter your message";
  document.getElementById("issue").innerHTML = "";
}
