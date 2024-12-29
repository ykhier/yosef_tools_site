document.addEventListener('DOMContentLoaded', () => {
    function getAllUsers() {
        var users = [];
        var len = localStorage.length;
        for (var i = 0; i < len; i++) {
            var key = localStorage.key(i);
            var index = key.indexOf("_");
            var prefix = key.substring(0, index);
            if (prefix === "User") {
                var userJSON = localStorage.getItem(key);
                var user = JSON.parse(userJSON);
                users.push(user);
            }
        }
        return users;
    }

    const users = getAllUsers();
    console.log(users);
    const userList = document.getElementById('users-list');
    if (users && Array.isArray(users)) {
        // Loop through the list of users and create list items
        users.forEach((user) => {
            const item = document.createElement('li');
          
            const userInfo = document.createElement('div');
            userInfo.classList.add('user-info');

            const username = document.createElement('span');
            username.textContent = `Username: ${user.firstName} ${user.lastName}`;

            const email = document.createElement('span');
            email.textContent = `Email: ${user.email}`;

            const password = document.createElement('span');
            password.textContent = `Password: ${user.password}`;

            userInfo.appendChild(username);
            userInfo.appendChild(email);
            userInfo.appendChild(password);
            
            item.appendChild(userInfo);
            userList.appendChild(item);
        });
    } else {
        // Display a message if no users are found
        const listItem = document.createElement('li');
        listItem.textContent = 'No users found.';
        userList.appendChild(listItem);
    }
});
