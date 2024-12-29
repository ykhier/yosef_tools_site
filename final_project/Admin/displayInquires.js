document.addEventListener("DOMContentLoaded", () => {
    function getAllApplications() {
        var applications = [];
        var len = localStorage.length;
        for (var i = 0; i < len; i++) {
            var key = localStorage.key(i);
            var index = key.indexOf("_");
            var prefix = key.substring(0, index);
            if (prefix === "Contact") {
                var applicationJSON = localStorage.getItem(key);
                var application = JSON.parse(applicationJSON);
                applications.push(application);
            }
        }
        return applications;
    }

    const inquires = getAllApplications();
    console.log(inquires);
    const inquiresList = document.getElementById("inquires-list");

    if (inquires && Array.isArray(inquires)) {
        // Loop through the list of inquiries and create list items
        inquires.forEach((inq) => {
            const item = document.createElement("li");

            const inqInfo = document.createElement("div");
            inqInfo.classList.add("inq-info");

            const username = document.createElement("span");
            username.textContent = `Name: ${inq.name}`;

            const email = document.createElement("span");
            email.textContent = `Email: ${inq.email}`;

            const subject = document.createElement("span");
            subject.textContent = `Subject: ${inq.subject}`;

            const message = document.createElement("span");
            message.textContent = `Message: ${inq.Msg}`;

            inqInfo.appendChild(username);
            inqInfo.appendChild(email);
            inqInfo.appendChild(subject);
            inqInfo.appendChild(message);

            item.appendChild(inqInfo);
            inquiresList.appendChild(item);
        });
    } else {
        // Display a message if no inquiries are found
        const listItem = document.createElement("li");
        listItem.textContent = "No inquiries found.";
        inquiresList.appendChild(listItem);
    }
});
