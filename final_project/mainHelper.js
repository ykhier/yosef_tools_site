/*unction that are rקlated to all the sections in the project,
 to avoid repeating code
*/

//Get current logged-in-user details
function getCurrentUser()
{
  var user = localStorage.getItem("loggedUser");
  if(user)
    {
      return JSON.parse(user);
    }
    return null;
}