//function to generate random id number



function initializeContactCount() {
    var count = localStorage.getItem('conCount');
    if (count === null) {
        localStorage.setItem('conCount', '0');
        return 0;
    } else {
        return parseInt(count);
    }
}

//function to creat new appliction

function createNewApplication(name,email,subject,department,message)
{
    var application = {
        name:name,
        email:email,
        subject:subject,
        Dep: department,
        Msg:message
    };
    var count = initializeContactCount(); 
    var id = `Contact_${count}`;
    localStorage.setItem(id, JSON.stringify(application));
    count++;
    localStorage.setItem('conCount', count.toString());   
}

//get all existing applications
function getAllApplications()
{
    var applications=[];
    var len = localStorage.length,i;
  for (i = 0; i < len; i++) {
    var key = localStorage.key(i);
    var index = key.indexOf("_"),
      prefix = key.substring(0, index);
    if (prefix === "Contact") {
      var applicationJSON = localStorage.getItem(key);
      var application = JSON.parse(applicationJSON);
      applications.push(application);
    }
  }
  return applications;
}