document.addEventListener('DOMContentLoaded', function() {
    // Toggle the mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
 // Carousel script
 const carousel = document.getElementById('carousel');
 const dots = document.querySelectorAll('button[id^="dot-"]');
 let index = 0;

 const slideImages = () => {
   const totalSlides = carousel.children.length;
   index = (index + 1) % totalSlides;
   carousel.style.transform = `translateX(-${index * 100}%)`;
   updateActiveDot();
 };

 const updateActiveDot = () => {
   dots.forEach((dot, i) => {
     if (i === index) {
       dot.classList.add('bg-gray-500');
       dot.classList.remove('bg-gray-300');
     } else {
       dot.classList.remove('bg-gray-500');
       dot.classList.add('bg-gray-300');
     }
   });
 };

 dots.forEach((dot, i) => {
   dot.addEventListener('click', () => {
     index = i;
     carousel.style.transform = `translateX(-${index * 100}%)`;
     updateActiveDot();
   });
 });

 setInterval(slideImages, 2000);

  });

  //tabing system
  function changeTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.grid').forEach(grid => grid.classList.add('hidden'));

    // Show the clicked tab
    document.getElementById(tab).classList.remove('hidden');

    // Update tab styling
    document.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('border-black');
      btn.classList.add('border-transparent');
    });
    document.getElementById('tab-' + tab).classList.remove('border-transparent');
    document.getElementById('tab-' + tab).classList.add('border-black');
  }
  // Cart functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartDrawer = document.getElementById('cartDrawer');
  const cartToggle = document.getElementById('cartToggle');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');

  function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
      cart.forEach((item, index) => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('cart-item');
          itemElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                  <h3>${item.name}</h3>
                  <p>$${item.price.toFixed(2)}</p>
                  <div class="cart-item-quantity">
                      <button onclick="changeQuantity(${index}, -1)">-</button>
                      <span>${item.quantity}</span>
                      <button onclick="changeQuantity(${index}, 1)">+</button>
                  </div>
              </div>
          `;
          cartItems.appendChild(itemElement);
          total += item.price * item.quantity;
      });
      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(product) {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      updateCart();
  }

  function changeQuantity(index, change) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
      }
      updateCart();
  }

  cartToggle.addEventListener('click', () => {
      cartDrawer.classList.add('open');
  });

  closeCart.addEventListener('click', () => {
      cartDrawer.classList.remove('open');
  });

  // Add event listeners to your "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', () => {
          const product = {
              id: button.dataset.id,
              name: button.dataset.name,
              price: parseFloat(button.dataset.price),
              image: button.dataset.image
          };
          addToCart(product);
      });
  });

  // Initial cart update
  updateCart();