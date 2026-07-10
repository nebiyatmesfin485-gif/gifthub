
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

function loadCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h3>Your cart is empty.</h3>";
        totalPrice.innerHTML = "";
        return;

    }

    cart.forEach((product, index) => {

        total += Number(product.price);

        cartItems.innerHTML += `
            <div class="product-card">

                <img src="images/${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h4>ETB ${product.price}</h4>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;

    });

    totalPrice.innerHTML = `<h2>Total: ETB ${total}</h2>`;

}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

document.getElementById("checkoutBtn").addEventListener("click", async () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");
        return;

    }

    const token = localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    const shippingAddress = prompt("Enter your shipping address:");

    if (!shippingAddress) {

        alert("Shipping address is required.");

        return;

    }
// Clear Cart
const clearCartBtn = document.getElementById("clearCartBtn");

if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {

        if (confirm("Are you sure you want to clear your cart?")) {

            localStorage.removeItem("cart");

            alert("Cart cleared successfully.");

            location.reload();
        }

    });
}


    const items = cart.map(product => ({
        id: product.id,
        quantity: 1,
        price: Number(product.price)
    }));

    try {

        const response = await fetch("http://localhost:3000/api/orders", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                items,
                shippingAddress
            })

        });

        const data = await response.json();

        if (data.success) {

            alert("Order placed successfully!");

            localStorage.removeItem("cart");

            window.location.href = "index.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});

loadCart();