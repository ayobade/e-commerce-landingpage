let quantity = 1;
let currentImageIndex = 0;
let modalCurrentImageIndex = 0;
let cartItems = [];
let totalCartItems = 0;
const basePrice = 125.00; 
const originalBasePrice = 250.00;

const product = {
  name: "Fall Limited Edition Sneakers",
  brand: "SNEAKER COMPANY",
  price: 125.00,
  image: "./images/image-product-1-thumbnail.jpg"
}; 

const images = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg'
];

function changeImage(src, thumbnail) {
  const mainImg = document.getElementById('mainImg');
  if (mainImg) {
    mainImg.src = src;
    document.querySelectorAll('.thumbnail').forEach(img => img.classList.remove('active'));
    thumbnail.classList.add('active');
    
    currentImageIndex = images.indexOf(src);
  }
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateMainImage();
}

function previousImage() {
  currentImageIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
  updateMainImage();
}

function updateMainImage() {
  const mainImg = document.getElementById('mainImg');
  if (mainImg) {
    mainImg.src = images[currentImageIndex];

    document.querySelectorAll('.thumbnail').forEach((img, index) => {
      img.classList.toggle('active', index === currentImageIndex);
    });
  }
}

function openModal() {
  const modalGallery = document.getElementById('modal-gallery');
  if (modalGallery) {
    modalGallery.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalCurrentImageIndex = currentImageIndex;
    updateModalImage();
  }
}

function closeModal() {
  const modalGallery = document.getElementById('modal-gallery');
  if (modalGallery) {
    modalGallery.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function changeImageModal(src, thumbnail) {
  const modalMainImg = document.getElementById('modalMainImg');
  if (modalMainImg) {
    modalMainImg.src = src;
    document.querySelectorAll('.modal-thumbnail').forEach(img => img.classList.remove('active'));
    thumbnail.classList.add('active');
    
    modalCurrentImageIndex = images.indexOf(src);
  }
}

function nextImageModal() {
  modalCurrentImageIndex = (modalCurrentImageIndex + 1) % images.length;
  updateModalImage();
}

function previousImageModal() {
  modalCurrentImageIndex = modalCurrentImageIndex === 0 ? images.length - 1 : modalCurrentImageIndex - 1;
  updateModalImage();
}

function updateModalImage() {
  const modalMainImg = document.getElementById('modalMainImg');
  if (modalMainImg) {
    modalMainImg.src = images[modalCurrentImageIndex];

    document.querySelectorAll('.modal-thumbnail').forEach((img, index) => {
      img.classList.toggle('active', index === modalCurrentImageIndex);
    });
  }
}

function updatePrices() {
  const totalPrice = (basePrice * quantity).toFixed(2);
  
  const priceElement = document.getElementById('current-price');
  if (priceElement) {
    priceElement.textContent = `$${totalPrice}`;
  }
}

function increaseQuantity() {
  quantity++;
  const quantityElement = document.getElementById('quantity');
  if (quantityElement) {
    quantityElement.textContent = quantity;
  }
  updatePrices();
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    const quantityElement = document.getElementById('quantity');
    if (quantityElement) {
      quantityElement.textContent = quantity;
    }
    updatePrices();
  }
}

function updateCartCounter() {
  const counter = document.getElementById('cart-counter');
  counter.textContent = totalCartItems;
  
  if (totalCartItems > 0) {
    counter.style.display = 'flex';
  } else {
    counter.style.display = 'none';
  }
}

function toggleCartDropdown() {
  const dropdown = document.getElementById('cart-dropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
}

function closeCart() {
  const dropdown = document.getElementById('cart-dropdown');
  if (dropdown) {
    dropdown.style.display = 'none';
  }
}

function updateCartDisplay() {
  const cartContent = document.getElementById('cart-content');
  
  if (cartItems.length === 0) {
    cartContent.className = 'cart-dropdown-content empty';
    cartContent.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
  } else {
    cartContent.className = 'cart-dropdown-content';
    let cartHTML = '';
    cartItems.forEach((item, index) => {
      cartHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
            <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <div class="cart-item-actions">
            <div class="cart-item-controls">
              <button class="cart-qty-btn" onclick="decreaseCartItem(${index})">-</button>
              <span class="cart-qty-display">${item.quantity}</span>
              <button class="cart-qty-btn" onclick="increaseCartItem(${index})">+</button>
            </div>
            <img src="./images/icon-delete.svg" alt="Delete All" class="cart-item-delete" onclick="removeFromCart(${index})">
          </div>
        </div>
      `;
    });
    
           // Add clear cart and checkout buttons
       cartHTML += `
         <div class="cart-actions">
           <button class="clear-cart-btn" onclick="clearCart()">Clear Cart</button>
           <button class="checkout-btn" onclick="checkout()">Checkout</button>
         </div>
       `;
    cartContent.innerHTML = cartHTML;
  }
}

function addToCart() {
  const existingItemIndex = cartItems.findIndex(item => item.name === product.name);
  
  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    cartItems.push({
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  updateCartCounter();
  updateCartDisplay();
  
  alert(`✅ Successfully added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`);
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  updateCartCounter();
  updateCartDisplay();
}

function increaseCartItem(index) {
  cartItems[index].quantity++;
  totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  updateCartCounter();
  updateCartDisplay();
}

function decreaseCartItem(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
  } else {
    cartItems.splice(index, 1);
  }
  totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  updateCartCounter();
  updateCartDisplay();
}

function clearCart() {
  cartItems = [];
  totalCartItems = 0;
  updateCartCounter();
  updateCartDisplay();
}

function checkout() {
  if (cartItems.length === 0) {
    alert('⚠️ Your cart is empty! Please add some items before checkout.');
    return;
  }
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  alert(`🛒 Proceeding to checkout!\n\nItems: ${totalItems}\nTotal: $${totalPrice.toFixed(2)}\n\nThank you for shopping with us!`);
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.hamburger-menu');
  
  if (mobileMenu) {
    const isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
    
    if (hamburger) {
      hamburger.src = isOpen ? './images/icon-menu.svg' : './images/icon-close.svg';
    }
    
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.hamburger-menu');
  
  if (mobileMenu) {
    mobileMenu.style.display = 'none';
    
    if (hamburger) {
      hamburger.src = './images/icon-menu.svg';
    }
    
    document.body.style.overflow = 'auto';
  }
}

function toggleProfileMenu() {
  const profileMenu = document.getElementById('profile-menu');
  if (profileMenu) {
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
  }
}

function closeProfileMenu() {
  const profileMenu = document.getElementById('profile-menu');
  if (profileMenu) {
    profileMenu.style.display = 'none';
  }
}

document.addEventListener('click', function(event) {
  const cartContainer = document.querySelector('.cart-container');
  const dropdown = document.getElementById('cart-dropdown');
  const profileContainer = document.querySelector('.profile-container');
  const profileMenu = document.getElementById('profile-menu');
  
  if (!cartContainer.contains(event.target)) {
    dropdown.style.display = 'none';
  }
  
  if (profileContainer && !profileContainer.contains(event.target)) {
    if (profileMenu) {
      profileMenu.style.display = 'none';
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.getElementById('cart-dropdown');
  if (dropdown) {
    dropdown.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }
  
  const profileMenu = document.getElementById('profile-menu');
  if (profileMenu) {
    profileMenu.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }
});

window.addEventListener('resize', function() {
  if (window.innerWidth > 965) {
    closeMobileMenu();
  }
});

window.onload = function() {
  const isMainPage = document.getElementById('mainImg') !== null;
  
  if (isMainPage) {
    updateCartCounter();
    updateCartDisplay();
  } else {
    const counter = document.getElementById('cart-counter');
    if (counter) {
      counter.style.display = 'none';
    }
    updateCartDisplay();
  }
} 