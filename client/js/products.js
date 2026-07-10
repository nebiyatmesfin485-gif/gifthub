const API_URL = "http://localhost:3000/api";

let allProducts = [];

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
  if (!data.success) {
            alert("Failed to load products.");
            return;
        }


        allProducts = data.products;

        const productList = document.getElementById("product-list");
        productList.innerHTML = "";

        allProducts.forEach(product => {
            productList.innerHTML += `
                <div class="product-card">
                    <img src="images/${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <h4>ETB ${product.price}</h4>
                    <button onclick="addToCart(${product.id})">
                        🛒 Add to Cart
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
}


window.addToCart = function(id) {

    const product = allProducts.find(item => item.id === id);

    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart!");
}

loadProducts();