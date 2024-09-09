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





//cart
document.addEventListener('DOMContentLoaded' ,()=>{
// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartDrawer = document.getElementById('cartDrawer');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const continueShopping = document.getElementById('continueShopping');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('flex', 'py-6');
        itemElement.innerHTML = `
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover object-center">
            </div>
            <div class="ml-4 flex flex-1 flex-col">
                <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>${item.name}</h3>
                        <p class="ml-4">৳${item.price}</p>
                    </div>
                </div>
                <div class="flex flex-1 items-end justify-between text-sm">
                    <div class="flex items-center">
                        <button onclick="changeQuantity(${index}, -1)" class="font-medium text-indigo-600 hover:text-indigo-500 px-2">-</button>
                        <p class="text-gray-500 px-2">${item.quantity}</p>
                        <button onclick="changeQuantity(${index}, 1)" class="font-medium text-indigo-600 hover:text-indigo-500 px-2">+</button>
                    </div>
                    <button type="button" onclick="removeItem(${index})" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = `৳${total.toFixed(2)}`;
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
    openCart();
}

function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeItem(index);
    } else {
        updateCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    cartDrawer.classList.remove('translate-x-full');
}

function closeCartDrawer() {
    cartDrawer.classList.add('translate-x-full');
}

cartToggle.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
});

closeCart.addEventListener('click', closeCartDrawer);
continueShopping.addEventListener('click', closeCartDrawer);

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







//update info 

document.qu


//end
})



  