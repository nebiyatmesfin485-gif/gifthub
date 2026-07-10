const API_URL = "http://localhost:3000/api";

let allProducts = [];

// Display products
function displayProducts(products) {

    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    if (products.length === 0) {
        productList.innerHTML = `
            <h3 style="text-align:center; width:100%;">
                No products found.
            </h3>
        `;
        return;
    }

    products.forEach(product => {

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

}

// Load all products
async function loadProducts() {

    try {

        const response = await fetch(`${API_URL}/products`);

        const data = await response.json();

        if (!data.success) {

            alert("Failed to load products.");

            return;

        }

        allProducts = data.products;

        displayProducts(allProducts);

    } catch (error) {

        console.error("Error loading products:", error);

    }

}

// Search products
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const keyword = searchInput.value.toLowerCase();

        const filteredProducts = allProducts.filter(product =>

            product.name.toLowerCase().includes(keyword) ||

            product.description.toLowerCase().includes(keyword)

        );

        displayProducts(filteredProducts);

    });

}

// Add product to cart
window.addToCart = function(id) {

    const product = allProducts.find(item => item.id === id);

    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(product.name + " added to cart!");

}

loadProducts();