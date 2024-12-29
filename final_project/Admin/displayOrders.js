document.addEventListener("DOMContentLoaded", () => {
    // function to get all the orders that are stored in the local storage 
    function getAllOrders() {
        var orders = [];
        var len = localStorage.length;
        console.log("Total items in localStorage:", len); // Debugging
        for (var i = 0; i < len; i++) {
            var key = localStorage.key(i);
            console.log("Checking key:", key); // Debugging
            if (key.startsWith("Order_")) {
                var orderJSON = localStorage.getItem(key);
                console.log("Raw order JSON:", orderJSON); // Debugging
                try {
                    var order = JSON.parse(orderJSON);
                    console.log("Parsed order:", order); // Debugging
                    if (order && order.userEmail && Array.isArray(order.products)) {
                        orders.push(order);
                    } else {
                        console.log("Invalid order format:", order); // Debugging
                    }
                } catch (error) {
                    console.error("Error parsing order JSON:", error);
                }
            }
        }
        console.log("All orders:", orders); // Debugging
        return orders;
    }

    const allOrders = getAllOrders();
    const ordersList = document.getElementById('orders-list');

    if (allOrders.length > 0) {
        allOrders.forEach((order) => {
            const liItem = document.createElement('li');
            liItem.classList.add('order-item');

            const orderInfo = document.createElement('div');
            orderInfo.classList.add('order-info');
            const userEmail = document.createElement('span');
            userEmail.textContent = `Email: ${order.userEmail}`;

            const products = document.createElement("ul");
            order.products.forEach(product => {
                const item = document.createElement('li');
                item.classList.add('product-item');
                const totalPrice = (Number(product.price) * Number(product.qty)).toFixed(2);
                const content = `Product name: ${product.name}, Price: ${product.price}, Qty: ${product.qty}, Total Price: $${totalPrice}`;
                item.textContent = content;
                products.appendChild(item);
            });

            orderInfo.appendChild(userEmail);
            orderInfo.appendChild(products);
            liItem.appendChild(orderInfo);
            ordersList.appendChild(liItem);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.textContent = "No orders found.";
        ordersList.appendChild(listItem);
    }
});