/*❗❗Saving pattern ❗❗:
{Order_uderEmail:" ",products : []}
products is an array with the items he purchased
each product pattern:
{Product_id:"",name:"",price:"",qty:""}


*/
//Function to check if the logged-user has aleady purchased the product.If so, the product will be returned, else null
function productExistsInOrder(userEmail, productId) {
  var orderKey = `Order_${userEmail}`;
  var orderJSON = localStorage.getItem(orderKey);

  if (orderJSON) {
    var order = JSON.parse(orderJSON);
    var products = order.products;
    if (products === null || !products) return null;
    for (var j = 0; j < products.length; j++) {
      if (products[j].Product_id === productId) {
        return products[j];
      }
    }
  }

  return null;
}

//function to add new product to the list of the user.
//if the product exists then the quantity will be changed

function AddNewItemToOrder(productId, productName, price) {
  //Check if there is an looged in user
  var currentUser = getCurrentUser();
  console.log(currentUser);

  if (!currentUser) {
    console.log("No user logged in.");
    alert("please login or signup to see the shopping cart.");
    return;
  }
  var userEmail = currentUser;
  var orderProducts = getOrderProducts(userEmail);
  var product = productExistsInOrder(userEmail, productId);
  //If the product already exists, the qty will be updated
  if (product) {
    var Updatedproduct = {
      Product_id: product.Product_id,
      name: product.name,
      price: product.price,
      qty: product.qty + 1,
    };
    var productIndex = orderProducts.indexOf(product);
    orderProducts[productIndex] = Updatedproduct;
    localStorage.setItem(`Order_${userEmail}`, JSON.stringify(orderProducts));
    console.log("Existing product was updated");
    return;
  }
  //If this is a new product, it will simply be added to the prodcut array
  else {
    var newProduct = {
      Product_id: productId,
      name: productName,
      price: price,
      qty: 1,
    };
    if (!orderProducts) orderProducts = [newProduct];
    else orderProducts.push(newProduct);
    localStorage.setItem(`Order_${currentUser}`, JSON.stringify(orderProducts));
    console.log("New product was added");
  }
  alert("this product has been added to your shopping cart.");
}

//function to get all the products for the loogged-in-user
function getOrderProducts(userEmail) {
  var id = `Order_${userEmail}`;
  var order = JSON.parse(localStorage.getItem(id)) || {
    userEmail: userEmail,
    products: [],
  }; //The second is if there is not order for this user
  return order.products;
}

function getCurrentUser() {
  var user = localStorage.getItem("loggedUser");
  if (user) {
    return user;
  }
  return null;
}
