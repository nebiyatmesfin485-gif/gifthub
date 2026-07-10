const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

if (!token) {

    alert("Please login.");

    window.location.href = "login.html";

}

async function loadOrders() {

    const response = await fetch(`${API_URL}/orders`, {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    const data = await response.json();

    if (!data.success) {

        alert("Only admins can access this page.");

        return;

    }

    const tbody = document.querySelector("#ordersTable tbody");

    tbody.innerHTML = "";

    let pending = 0;

    document.getElementById("totalOrders").innerHTML =
        data.orders.length;

    data.orders.forEach(order => {

        if(order.status==="Pending") pending++;

        tbody.innerHTML += `

        <tr>

            <td>${order.id}</td>

            <td>${order.full_name}</td>

            <td>${order.email}</td>

            <td>ETB ${order.total_price}</td>

            <td>

                <select id="payment-${order.id}">

                    <option ${order.payment_status=="Pending"?"selected":""}>Pending</option>

                    <option ${order.payment_status=="Paid"?"selected":""}>Paid</option>

                </select>

            </td>

            <td>

                <select id="status-${order.id}">

                    <option ${order.status=="Pending"?"selected":""}>Pending</option>

                    <option ${order.status=="Processing"?"selected":""}>Processing</option>

                    <option ${order.status=="Shipped"?"selected":""}>Shipped</option>

                    <option ${order.status=="Delivered"?"selected":""}>Delivered</option>

                </select>

            </td>

            <td>

                <button onclick="updateOrder(${order.id})">

                    Update

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("pendingOrders").innerHTML =
        pending;

}

async function updateOrder(id){

    const payment_status =
        document.getElementById(`payment-${id}`).value;

    const status =
        document.getElementById(`status-${id}`).value;

    const response = await fetch(`${API_URL}/orders/${id}`,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json",

            Authorization:`Bearer ${token}`

        },

        body:JSON.stringify({

            payment_status,

            status

        })

    });

    const data=await response.json();

    if(data.success){

        alert("Order updated successfully.");

        loadOrders();

    }else{

        alert("Unable to update order.");

    }

}

document.getElementById("logoutBtn").addEventListener("click",()=>{

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href="login.html";

});

loadOrders();