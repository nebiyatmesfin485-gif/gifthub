let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const itemCount = document.getElementById("item-count");
const emptyMessage = document.getElementById("empty-message");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearCartBtn = document.getElementById("clearCartBtn");

function loadCart() {

    cartItems.innerHTML = "";

    let total = 0;

    // Update item count
    itemCount.textContent = `Items: ${cart.length}`;

    if (cart.length === 0) {

        emptyMessage.style.display = "block";

        totalPrice.innerHTML = "";

        checkoutBtn.disabled = true;

        return;

    }

    emptyMessage.style.display = "none";

    checkoutBtn.disabled = false;

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

// Clear Cart
clearCartBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is already empty.");

        return;

    }

    if (confirm("Are you sure you want to clear your cart?")) {

        localStorage.removeItem("cart");

        cart = [];

        loadCart();

        alert("Cart cleared successfully.");

    }

});

// Checkout
checkoutBtn.addEventListener("click", async () => {

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

    const shippingAddress = document.getElementById("shipping_address").value.trim();

    if (!shippingAddress) {

        alert("Please enter your shipping address.");

        return;

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

            cart = [];

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