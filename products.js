
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" width="100" height="100">
                    <h3>${product.title}</h3>
                    <p>${product.description.substring(0, 100)}...</p>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productElement);
            });
        })
        .catch(error => console.error("Error loading products:", error));
});