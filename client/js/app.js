const API_URL = "http://localhost:3000/api";

async function loadCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

async function loadProducts() {

    try {

        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        const productList = document.getElementById("product-list");

        productList.innerHTML = "";

        data.products.forEach(product => {

            productList.innerHTML += `
                <div class="product-card">
                    <img src="images/${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <h4>ETB ${product.price}</h4>
                    <button>Add to Cart</button>
                </div>
            `;

        });

    } catch (error) {
        console.error("Error loading products:", error);
    }

}

loadCategories();
loadProducts();