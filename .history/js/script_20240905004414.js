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