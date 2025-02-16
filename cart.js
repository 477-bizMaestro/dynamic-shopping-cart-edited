// cart.js
let cart = [];
let appliedPromoCode = ""; // Track applied promo code

function addToCart(id) {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === id);
            if (product) {
                const existingItem = cart.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                updateCartUI();
            }
        })
        .catch(error => console.error("Error fetching product details:", error));
}

function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const itemElement = document.createElement("div");
        itemElement.innerHTML = `
            <p>${item.title} - $${item.price.toFixed(2)} x 
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </p>
        `;
        cartItems.appendChild(itemElement);
    });

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    applyPromoCode(); // Ensure discount is recalculated
}

function updateQuantity(id, newQuantity) {
    let quantity = parseInt(newQuantity);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1; // Reset to minimum 1
    }

    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        updateCartUI();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function applyPromoCode() {
    const promoCodeInput = document.getElementById("promo-code").value.toLowerCase();
    let discount = 0;
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (promoCodeInput === "ostad10") {
        discount = subtotal * 0.10;
        appliedPromoCode = "ostad10";
    } else if (promoCodeInput === "ostad5") {
        discount = subtotal * 0.05;
        appliedPromoCode = "ostad5";
    } else {
        appliedPromoCode = "";
    }

    document.getElementById("discount").innerText = discount.toFixed(2);
    document.getElementById("total-price").innerText = (subtotal - discount).toFixed(2);

    const promoMessage = document.getElementById("promo-message");
    if (appliedPromoCode) {
        promoMessage.innerText = `Promo code applied: ${appliedPromoCode.toUpperCase()}`;
        promoMessage.style.color = "green";
    } else {
        promoMessage.innerText = "Invalid promo code!";
        promoMessage.style.color = "red";
    }
}

// Apply promo code on button click
document.getElementById("apply-promo").addEventListener("click", applyPromoCode);
