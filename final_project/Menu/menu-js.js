// This function checks if the user scrolls more than 100px
function show_hide_button() {
  var go_up_button = document.getElementById("goUpButton");

  // Check if the user scrolls down more than 100px
  if (window.pageYOffset > 100) {
    // If the user scrolls more than 100px, then show the button
    go_up_button.style.display = "block";
  } else {
    // If not, hide the button
    go_up_button.style.display = "none";
  }
}

// This function is for the go-up button. If the button is clicked, scroll up
function go_up_button_clicked() {
  // Smooth scroll to the top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function purchaseBtnClicked(productId, productName, price) {
  // Call add new item function to add the product to the database
  if (AddNewItemToOrder(productId, productName, price)) {
    alert("The item was added to the shopping cart.");
  } else {
    alert("Failed to add the item to the shopping cart.");
  }
}

// Function to check if a product exists in the user's order
function productExistsInOrder(userEmail, productId) {
  var orderKey = `Order_${userEmail}`;
  var orderJSON = localStorage.getItem(orderKey);

  if (orderJSON) {
    var order = JSON.parse(orderJSON);
    var products = order.products;
    if (!products) return null;
    for (var j = 0; j < products.length; j++) {
      if (products[j].Product_id === productId) {
        return products[j];
      }
    }
  }
  return null;
}

// Function to add a new product to the user's order
// If the product exists, update the quantity
function AddNewItemToOrder(productId, productName, price) {
  var currentUser = getCurrentUser();

  if (!currentUser) {
    console.log("No user logged in.");
    alert("Please login or signup to see the shopping cart.");
    return false;
  }

  var userEmail = currentUser;
  var order = getOrder(userEmail);
  var products = order.products;

  var product = productExistsInOrder(userEmail, productId);

  // If the product already exists, update the quantity
  if (product) {
    product.qty += 1;
    var updatedProducts = products.map(p => p.Product_id === productId ? product : p);
    order.products = updatedProducts;
    console.log("Existing product was updated.");
  } else {
    // If this is a new product, add it to the product array
    var newProduct = {
      Product_id: productId,
      name: productName,
      price: price,
      qty: 1,
    };
    products.push(newProduct);
    console.log("New product was added.");
  }

  // Save the updated order back to local storage
  localStorage.setItem(`Order_${userEmail}`, JSON.stringify(order));
  return true;
}

// Function to get the order object for the logged-in user
function getOrder(userEmail) {
  var orderKey = `Order_${userEmail}`;
  var orderJSON = localStorage.getItem(orderKey);
  if (orderJSON) {
    return JSON.parse(orderJSON);
  } else {
    return {
      userEmail: userEmail,
      products: [],
    };
  }
}

// Function to get all the products for the logged-in user
function getOrderProducts(userEmail) {
  var order = getOrder(userEmail);
  return order.products;
}

function getCurrentUser() {
  var user = localStorage.getItem("loggedUser");
  if (user) {
    return user;
  }
  return null;
}

// Ensure the scroll function is called on scroll
window.onscroll = show_hide_button;
