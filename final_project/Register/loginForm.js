//Check if the user exists then redirect to home
function checkUser() {
  var userEmail = document.getElementById("email").value;
  var password = document.getElementById("psw").value;
  console.log(userEmail, password);
  if (userEmail === "admin" && password === "admin") {
    window.location.href = "./../Admin/homePage.html";
    return;
  }
  if (userEmail) {
    var user = getUser(userEmail);
    if (user) {
      if (user.password === password) {
        alert("Welcome");
        localStorage.setItem("loggedUser", userEmail);
        //redirect to Home page
        window.location.href = "./../Menu/Menu.html";
      } else {
        alert("Wrong password, try again");
      }
    } else {
      alert("This user doesnt exist, sign up first");
    }
  }
}
