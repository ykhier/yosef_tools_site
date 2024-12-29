//Function to insert data to local storage

//Build a json string to enter it
//The id is the email
function createNewUser(userEmail, userFName, userLName, userPassword) {
  //if user doesnt exist
  if (!getUser(userEmail)) {
    var user = {
      email: userEmail,
      firstName: userFName,
      lastName: userLName,
      password: userPassword,
    };
    var id = `User_${userEmail}`;
    localStorage.setItem(id, JSON.stringify(user));
    return true;
  }
  console.log("user already exists");
  return false;
}

//Extarct an user with specific Email, returns all information
function getUser(userEmail) {
  var id = `User_${userEmail}`;
  var userJSON = localStorage.getItem(id);
  if (userJSON) {
    var user = JSON.parse(userJSON);
    return user;
  } else {
    console.log("user not found");
    return null;
  }
}

// Function to get all users
function getAllUsers() {
  var users = [];
  var len = localStorage.length,
    i;
  for (i = 0; i < len; i++) {
    var key = localStorage.key(i);
    var index = key.indexOf("_"),
      prefix = key.substring(0, index);
    if (prefix === "User") {
      var userJSON = localStorage.getItem(key);
      var user = JSON.parse(userJSON);
      users.push(user);
    }
  }
  return users;
}

//initialize the currently looged-in-user
function initializeLoggedUser(userEmail, userName) {
  var user = {
    email: userEmail,
    name: userName,
  };
  localStorage.setItem("loggedUser", JSON.stringify(user));
  return true;
}

function getCurrentUser() {
  var user = localStorage.getItem("loggedUser");
  if (user) {
    return user;
  }
  return null;
}
