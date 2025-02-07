function selectPaymentMethod(method) {
    if (method === 'cash') {
        // Show thank you message for Cash on Delivery
        document.getElementById('thank-you-message').style.display = 'block';
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('credit-card-form').style.display = 'none';

    } else if (method === 'credit card') {
        // Show Credit Card Payment Form
        document.getElementById('credit-card-form').style.display = 'block';
        document.getElementById('payment-form').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'none';
    }else if (method === 'phonepay') {
        // Show UPI form for Phone Pay
        document.getElementById('payment-form').style.display = 'block';
        document.getElementById('credit-card-form').style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'none';
    }
}

function submitPhonePay() {
    const upiId = document.getElementById('upi-id').value;
    if (upiId) {
        // Assume the payment is successful
        document.getElementById('thank-you-message').style.display = 'block';
        document.getElementById('payment-form').style.display = 'none';
    } else {
        alert("Please enter a valid UPI ID.");
    }
}
function submitCreditCard() {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiryDate && cvv) {
        // Assume the payment is successful
        //alert("Payment successful!");
        document.getElementById('thank-you-message').style.display = 'block';
        document.getElementById('credit-card-form').style.display = 'none';
    } else {
        alert("Please fill out all credit card details.");
    }
}



function resetPage() {
    document.getElementById('thank-you-message').style.display = 'none';  // Hide the "Thank You" message
    // You can add any additional reset logic or redirect here
    // For example, redirecting to the homepage:
    // window.location.href = '/';
}


