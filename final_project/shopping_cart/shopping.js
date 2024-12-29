// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Call the function to populate the shopping cart table
  populateShoppingCartTable();
});

// Function to populate the shopping cart table with product data
function populateShoppingCartTable() {
  // Retrieve order products from local storage
  var orderProducts = getOrderProducts();

  // Get the table body element where products will be displayed
  var tableBody = document.getElementById("productsTable");

  // Clear existing rows in the table body
  tableBody.innerHTML = "";

  // Create table header row
  var headerRow = document.createElement("tr");
  headerRow.classList.add("table-header-row"); // Add class for styling

  // Define headers for each column
  var headers = ["Product ID", "Product", "Price", "Quantity", "Total"];

  // Create header cells for each header text
  headers.forEach(function (headerText) {
    var headerCell = document.createElement("th");
    headerCell.classList.add("table-header-cell"); // Add class for styling
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell); // Append header cell to header row
  });

  // Append the header row to the table body
  tableBody.appendChild(headerRow);

  // Populate table with product data
  orderProducts.forEach(function (product) {
    // Display only products with quantity greater than 0
    if (product.qty > 0) {
      var row = document.createElement("tr"); // Create a new row for each product

      // Create cells for each product attribute (Product ID, Name, Price, Quantity, Total)
      var productIdCell = document.createElement("td");
      productIdCell.textContent = product.Product_id;
      row.appendChild(productIdCell);

      var productNameCell = document.createElement("td");
      productNameCell.textContent = product.name;
      row.appendChild(productNameCell);

      var priceCell = document.createElement("td");
      priceCell.textContent = `$${product.price.toFixed(2)}`;
      row.appendChild(priceCell);

      var qtyCell = document.createElement("td");
      qtyCell.textContent = product.qty;
      row.appendChild(qtyCell);

      var totalCell = document.createElement("td");
      totalCell.textContent = `$${(product.price * product.qty).toFixed(2)}`;
      row.appendChild(totalCell);

      // Append the row with product details to the table body
      tableBody.appendChild(row);
    }
  });

  // If no products are found, display a message in a new row
  if (orderProducts.length === 0) {
    var noProductRow = document.createElement("tr");
    var noProductCell = document.createElement("td");
    noProductCell.setAttribute("colspan", headers.length.toString()); // Span across all columns
    noProductCell.textContent = "No products found in the shopping cart.";
    noProductRow.appendChild(noProductCell);
    tableBody.appendChild(noProductRow);
  }
}

// Function to retrieve order products from local storage based on current user
function getOrderProducts() {
  var currentUser = getCurrentUser();
  var storedOrder = localStorage.getItem(`Order_${currentUser}`);
  return storedOrder ? JSON.parse(storedOrder).products : []; // Parse JSON data if exists, otherwise return an empty array
}

// Function to retrieve the current logged-in user from local storage
function getCurrentUser() {
  var user = localStorage.getItem("loggedUser");
  if (!user) {
    alert("Please login or signup to see the shopping cart.");
    return null;
  }
  return user;
}
