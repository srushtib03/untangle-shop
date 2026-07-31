const ordersContainer = document.getElementById("ordersContainer");

async function loadOrders() {
    try {
        const response = await fetch("http://localhost:3000/orders");
        const orders = await response.json();

        displayOrders(orders);
    } catch (error) {
        console.error(error);
        ordersContainer.innerHTML = "<h3>Failed to load orders.</h3>";
    }
}

function displayOrders(orders) {
    ordersContainer.innerHTML = "";

    orders.forEach(order => {
        const card = document.createElement("div");

        card.className = "order-card";

        card.innerHTML = `
            <h3>Order #${order.id}</h3>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Total:</strong> ₹${order.total}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        `;

        ordersContainer.appendChild(card);
    });
}

loadOrders();