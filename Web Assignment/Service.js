// Initialize cart
let cart = [];
let products = [
    {
        id: 1,
        name: "Rose Bouquet",
        price: 49.99,
        image: "anniversary1.jpg"
    },
    {
        id: 2,
        name: "Lily Bundle",
        price: 59.99,
        image: "anniversary1.jpg"
    },
    {
        id: 3,
        name: "Mixed Flowers",
        price: 44.99,
        image: "anniversary1.jpg"
    },
    {
        id: 4,
        name: "Tulip Special",
        price: 39.99,
        image: "anniversary1.jpg"
    },
    {
        id: 5,
        name: "Orchid Delight",
        price: 69.99,
        image: "anniversary1.jpg"
    },
    {
        id: 6,
        name: "Sunflower Joy",
        price: 54.99,
        image: "anniversary1.jpg"
    }
];

// DOM Elements
const cartCountElement = document.getElementById('cartCount');
const listCartHTML = document.querySelector('.listCart');
const iconCart = document.querySelector('.icon-cart');
const closeCart = document.querySelector('.close');
const checkoutBtn = document.querySelector('.checkOut');
const body = document.querySelector('body');

// Event Listeners
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for your purchase! Total: RM' + calculateTotal());
        cart = [];
        updateCartDisplay();
        localStorage.removeItem('cart');
    } else {
        alert('Your cart is empty!');
    }
});

// Initialize Add to Cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        addToCart(products[index]);
        showNotification('Item added to cart!');
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 1000);
    });
});

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToLocalStorage();
}

function updateCartDisplay() {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    
    cart.forEach(item => {
        totalQuantity += item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'item';
        cartItem.dataset.id = item.id;
        
        cartItem.innerHTML = `
            <div class="image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="name">${item.name}</div>
            <div class="totalPrice">RM${(item.price * item.quantity).toFixed(2)}</div>
            <div class="quantity">
                <span class="minus" onclick="updateQuantity(${item.id}, 'minus')">-</span>
                <span>${item.quantity}</span>
                <span class="plus" onclick="updateQuantity(${item.id}, 'plus')">+</span>
            </div>
        `;
        
        listCartHTML.appendChild(cartItem);
    });
    
    cartCountElement.textContent = totalQuantity;
}

function updateQuantity(productId, action) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        if (action === 'plus') {
            cart[itemIndex].quantity += 1;
        } else if (action === 'minus') {
            cart[itemIndex].quantity -= 1;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCartDisplay();
        saveCartToLocalStorage();
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage on page load
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Initialize the cart
document.addEventListener('DOMContentLoaded', loadCartFromStorage);