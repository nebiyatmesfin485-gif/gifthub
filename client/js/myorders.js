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

        ordersList.innerHTML = "";

        if (!data.orders || data.orders.length === 0) {

            ordersList.innerHTML = "<h3>No orders found.</h3>";

            return;

        }

        data.orders.forEach(order => {

            ordersList.innerHTML += `
                <div class="product-card">

                    <h3>Order #${order.id}</h3>

                    <p><strong>Total:</strong> ETB ${order.total_price}</p>

                    <p><strong>Status:</strong> ${order.status}</p>

                    <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}</p>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadOrders();