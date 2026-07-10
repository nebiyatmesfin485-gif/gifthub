const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

async function loadOrders() {

    try {

        const response = await fetch(`${API_URL}/orders/my`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        const ordersList = document.getElementById("orders-list");
        const orderCount = document.getElementById("order-count");

        ordersList.innerHTML = "";

        if (!data.orders || data.orders.length === 0) {

            orderCount.textContent = "Total Orders: 0";

            ordersList.innerHTML = `
                <div class="order-card">
                    <h3>No orders found.</h3>
                    <p>Start shopping to place your first order.</p>
                </div>
            `;

            return;
        }

        // Show newest orders first
        data.orders.reverse();

        orderCount.textContent = `Total Orders: ${data.orders.length}`;

        data.orders.forEach(order => {

            let statusClass = "pending";

            if (order.status.toLowerCase() === "processing")
                statusClass = "processing";

            if (order.status.toLowerCase() === "delivered")
                statusClass = "delivered";

            ordersList.innerHTML += `
                <div class="order-card">

                    <h3>Order #${order.id}</h3>

                    <p><strong>Total:</strong> ETB ${order.total_price}</p>

                    <p>
                        <strong>Status:</strong>
                        <span class="status ${statusClass}">
                            ${order.status}
                        </span>
                    </p>

                    <p>
                        <strong>Order Date:</strong>
                        ${new Date(order.created_at).toLocaleString()}
                    </p>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

        document.getElementById("orders-list").innerHTML = `
            <div class="order-card">
                <h3>Unable to load your orders.</h3>
            </div>
        `;
    }

}

loadOrders();