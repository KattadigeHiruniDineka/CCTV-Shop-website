```javascript
document.addEventListener("DOMContentLoaded", function () {
    // Get HTML elements
    const searchInput = document.getElementById("productSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const productCards = document.querySelectorAll(".product-card");
    const noResults = document.getElementById("noResults");
    const contactButton = document.getElementById("contactButton");

    // Enter your shop's WhatsApp number here.
    // Example: 94771234567 (without spaces or + sign)
    const WHATSAPP_NUMBER = "94771234567";

    // Search and filter products
    function filterProducts() {
        if (!searchInput || !categoryFilter) {
            return;
        }

        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;

        let visibleCount = 0;

        productCards.forEach(function (card) {
            const text = card.textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = text.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const showCard = matchesSearch && matchesCategory;

            card.hidden = !showCard;

            if (showCard) {
                visibleCount++;
            }
        });

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }
    }

    // Search input event
    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    // Category filter event
    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterProducts);
    }

    // Open WhatsApp chat
    function openWhatsApp(productName) {
       if (
    !WHATSAPP_NUMBER ||
    WHATSAPP_NUMBER === "94771234567"
) {
    alert(
        "Please replace the example WhatsApp number in script.js with your shop's real WhatsApp number."
    );
    return;
}

        const message =
            "Hello! I would like to inquire about " +
            productName +
            ".";

        const url =
            "https://wa.me/" +
            WHATSAPP_NUMBER +
            "?text=" +
            encodeURIComponent(message);

        window.open(url, "_blank", "noopener,noreferrer");
    }

    // Product inquiry buttons
    document.querySelectorAll(".inquire-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const productName =
                this.dataset.product || "your CCTV product";

            openWhatsApp(productName);
        });
    });

    // Main contact button
    if (contactButton) {
        contactButton.addEventListener("click", function () {
            openWhatsApp("your CCTV products and services");
        });
    }

    // Handle product image loading errors
    document.querySelectorAll(".product-image img").forEach(function (img) {
        img.addEventListener("error", function () {
            this.style.display = "none";

            this.parentElement.classList.add("image-error");

            this.parentElement.setAttribute(
                "aria-label",
                "Product image unavailable"
            );
        });
    });
});
```