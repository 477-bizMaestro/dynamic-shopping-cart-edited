document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    appliedPromo = null; // Reset promo code
    updateCartUI();
});

document.getElementById("apply-promo").addEventListener("click", () => {
    const promoCode = document.getElementById("promo-code").value.trim().toLowerCase();
    const promoMessage = document.getElementById("promo-message");

    // Check if promo code is valid
    if (promoCode === "ostad10" || promoCode === "ostad5") {
        if (appliedPromo) {
            promoMessage.innerText = "You have already applied a promo code.";
        } else {
            appliedPromo = promoCode; // Apply the promo code
            promoMessage.innerText = `Promo code '${promoCode}' applied successfully!`;
            updateCartUI();
        }
    } else {
        promoMessage.innerText = "Invalid promo code. Please try again.";
    }

    document.getElementById("promo-code").value = ''; // Clear input
});
