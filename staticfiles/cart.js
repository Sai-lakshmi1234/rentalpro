let cart = [];  

// Base prices for products in USD (per hour)
const basePrices = {
    1: 50,  // Product 1: $10/hour
    2: 25,  // Product 2: $15/hour
    3: 50,  // Product 3: $50/hour
    4: 25,
    5: 45,
    6: 35,
    7: 200,
    8: 150,
    9: 200,
    10: 220,
    11:70,
    12: 90,
    13: 30,
    14: 50,
    15: 30,
    16: 22,
    17: 10,
    18: 22,
    19: 15,
    20: 60,
    21: 62,
    22: 65,
    23: 63,
    24: 70,
    25: 100,
    26: 80,
    27: 40,
    28: 35,
    29: 80,
    30: 70,
    31: 120,
    32: 100,
    33: 150,
    34: 70,
    35: 100,
    36: 90,
    37: 60,
    38: 60,
   

};

// Exchange rate (1 USD = 83 INR)
const exchangeRate = 1;

// Product images mapping
const productImages = {
    "Product 1": "../static/av.jpg",
    "Product 2": "../static/bicycle2.jpg",
    "Product 3": "../static/bike1.jpg",
    "Product 3": "../static/bike1.jpg",
    "Product 4": "../static/bike3.jpg",
    "Product 5": "../static/bike4.jpg",
    "Product 6": "../static/black honda.jpg",
    "Product 7": "../static/bus.jpg",
    "Product 8": "../static/bus2.jpg",
    "Product 9": "../static/bus3.jpg",
    "Product 10": "../static/bus4.jpg",
    "Product 11": "../static/car1.jpg",
    "Product 12": "../static/car2.jpg",
    "Product 13": "../static/car3.jpg",
    "Product 14": "../static/car4.jpg",
    "Product 15": "../static/car5.jpg",
    "Product 16": "../static/cy5.jpg",
    "Product 17": "../static/cyc4.jpg",
    "Product 18": "../static/cycle1.jpg",
    "Product 19": "../static/cycle3.jpg",
    "Product 20": "../static/jeep.jpg",
    "Product 21": "../static/jeep2.jpg",
    "Product 22": "../static/jeep3.jpg",
    "Product 23": "../static/jeep4.jpg",
    "Product 24": "../static/ktm.jpg",
    "Product 25": "../static/red truck.jpg",
    "Product 26": "../static/royal.jpg",
    "Product 27": "../static/scooty.jpg",
    "Product 28": "../static/scooty1.jpg",
    "Product 29": "../static/ta3.jpg",
    "Product 30": "../static/trac2.jpg",
    "Product 31": "../static/tractor.jpg",
    "Product 32": "../static/truck1.jpg",
    "Product 33": "../static/truck2.jpg",
    "Product 34": "../static/truck4.jpg",
    "Product 35": "../static/van1.jpg",
    "Product 36": "../static/van2.jpg",
    "Product 37": "../static/van3.jpg",
    "Product 38": "../static/van4.jpg",
};

// Function to update product price display based on unit selection
function updateProductPrice(productId) {
    const unit = document.getElementById(`unit${productId}`).value;
    const quantity = document.getElementById(`quantity${productId}`).value;
    const priceElement = document.getElementById(`price${productId}`);
    let price = basePrices[productId]; // Get base price in USD (per hour)

    let totalPriceUSD;
    
    if (unit === 'hour') {
        totalPriceUSD = price * quantity;
    } else if (unit === 'day') {
        totalPriceUSD = price * 24 * quantity;
    } else if (unit === 'month') {
        totalPriceUSD = price * 30 * 24 * quantity;
    }

    const totalPriceINR = totalPriceUSD * exchangeRate; // Convert to INR

    // Update price display
    priceElement.innerHTML = ` ₹${totalPriceINR} (${unit})`;
    priceElement.dataset.unitPrice = totalPriceUSD; // Store price in USD
}

// Function to add product to cart
function addToCart(id, name, price) {
    const selectedUnit = document.getElementById(`unit${id}`).value;
    const quantity = document.getElementById(`quantity${id}`).value;
    let totalPriceUSD;

    if (selectedUnit === 'hour') {
        totalPriceUSD = price * quantity;
    } else if (selectedUnit === 'day') {
        totalPriceUSD = price * 24 * quantity;
    } else if (selectedUnit === 'month') {
        totalPriceUSD = price * 30 * 24 * quantity;
    }

    const totalPriceINR = totalPriceUSD * exchangeRate; // Convert to INR

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = { 
        id, 
        name, 
        priceUSD: totalPriceUSD, 
        priceINR: totalPriceINR, 
        unit: selectedUnit, 
        quantity
    };

    const existingProduct = cart.find(item => item.id === id);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = '/cart';
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item-card");

        const imagePath = productImages[item.name] || "images/default.jpg";

        const itemDetails = `
            <img src="${imagePath}" alt="${item.name}" class="cart-item-image">
            <h3>${item.name}</h3>
            <p>Price: ₹${item.priceINR.toFixed(2)} per ${item.unit}</p>
            <p>Selected Quantity: ${item.quantity} ${item.unit}(s)</p>
            <p>Total: ₹${(item.priceINR * item.quantity).toFixed(2)}</p>
            <div>
                <button onclick="updateQuantity(${item.id}, 'decrease')">-</button>
                ${item.quantity}
                <button onclick="updateQuantity(${item.id}, 'increase')">+</button>
            </div>
            <button onclick="removeItem(${item.id})">Remove</button>
        `;

        cartItem.innerHTML = itemDetails;
        cartContainer.appendChild(cartItem);
    });

    updateTotalPrice();
}

// Function to update the quantity of a product in the cart
function updateQuantity(id, action) {
    const product = cart.find(item => item.id === id);
    if (action === 'increase') {
        product.quantity++;
    } else if (action === 'decrease' && product.quantity > 1) {
        product.quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Function to update the total cart price
function updateTotalPrice() {
    let totalPriceUSD = 0;
    let totalPriceINR = 0;

    cart.forEach(item => {
        totalPriceUSD += item.priceUSD * item.quantity;
        totalPriceINR += item.priceINR * item.quantity;
    });

    const totalElement = document.getElementById("total-price");
    totalElement.textContent = `Total: ₹${totalPriceINR.toFixed(2)}`;
}

// Load cart on page load
window.onload = () => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartDisplay();
};
