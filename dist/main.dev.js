"use strict";

// show the tab content based on the clicked tab (index.html)
function showTab(index) {
  var contents = document.querySelectorAll('.tab-content');
  contents.forEach(function (el, i) {
    el.classList.toggle('hidden', i !== index);
  });
} // tab underline on hover effect (all pages with header)


document.querySelectorAll('.tab').forEach(function (tab) {
  // Create the animated border element
  var border = document.createElement('div');
  border.className = "\n        h-[4px] rounded\n        transition-all duration-300 ease-in-out\n    ";

  if (tab.parentElement.classList.contains('header')) {
    border.classList.add('bg-orange-400');
  } else {
    border.classList.add('bg-[#51658f]');
  }

  border.style.width = '0';
  tab.appendChild(border); // Animate on hover

  tab.addEventListener('mouseenter', function () {
    border.style.width = '100%';
  });
  tab.addEventListener('mouseleave', function () {
    border.style.width = '0';
  });
}); // Our products carousel (index.html)

$(document).ready(function () {
  $('.carousel').carousel();
}); //reviews carousel (tried using slick but couldnt get it wokring for some reason. AI suggested it might conflict with tailwind so just made my own version) (index.html)

var slides = document.querySelectorAll("#slider .slide");
var dots = document.querySelectorAll(".dot");
var current = 0;
var isTransitioning = false;
var fadeDuration = 700; // must match Tailwind's duration-700

function showSlide(index) {
  // prevent clicks or autoplay overlap during fade
  if (isTransitioning || index === current) return;
  isTransitioning = true;
  var currentSlide = slides[current];
  var nextSlide = slides[index]; // Fade out the current slide

  currentSlide.classList.remove("opacity-100");
  currentSlide.classList.add("opacity-0"); // Wait for fade out to finish before showing the next

  setTimeout(function () {
    // Hide old slide
    currentSlide.classList.add("hidden"); // Prepare the new slide for fade-in

    nextSlide.classList.remove("hidden", "opacity-100");
    nextSlide.classList.add("opacity-0"); // Force a reflow (browser reset) before applying fade-in to make the fade-in smooth

    void nextSlide.offsetWidth; // Now fade in smoothly

    nextSlide.classList.remove("opacity-0");
    nextSlide.classList.add("opacity-100");
    current = index; // Update dots

    dots.forEach(function (dot, i) {
      if (i === index) {
        dot.classList.add("opacity-100");
        dot.classList.remove("opacity-30", "hover:opacity-60");
      } else {
        dot.classList.add("opacity-30", "hover:opacity-60");
        dot.classList.remove("opacity-100");
      }
    });
    isTransitioning = false;
  }, fadeDuration);
}

function nextSlide() {
  var nextIndex = (current + 1) % slides.length; // modulus operator to make it repeat infinitely

  showSlide(nextIndex);
} // Make the dots clickable


dots.forEach(function (dot, i) {
  dot.addEventListener("click", function () {
    showSlide(i);
  });
}); // Initialize first slide

showSlide(0); // Auto-rotate slides

setInterval(nextSlide, 10000); // Order cart sidebar 

var cart = document.getElementById("cart");
var mainContent = document.getElementById("page-content");
var overlay = document.getElementById("overlay");
var checkout = document.getElementById("cart-checkout");

function openCart() {
  cart.classList.add("open");
  mainContent.classList.add("-translate-x-[300px]", "sm:-translate-x-[500px]", "brightness-50");
  overlay.classList.remove("hidden");
  overlay.classList.add("opacity-100");
  setTimeout(function () {
    checkout.classList.add("z-1000");
    checkout.classList.remove("-z-10");
  }, 500);
}

function closeCart() {
  cart.classList.remove("open");
  mainContent.classList.remove("-translate-x-[300px]", "sm:-translate-x-[500px]", "brightness-50");
  overlay.classList.remove("opacity-100");
  overlay.classList.add("hidden");
  checkout.classList.remove("z-1000");
  checkout.classList.add("-z-10");
} // Close cart when clickin


overlay.addEventListener("click", closeCart); //Ensuring cards have equal height even after some have text wrapping to multiple lines (products.html)

function setEqualCardHeights() {
  var cards = document.querySelectorAll('.product-card');
  var maxHeight = 0; // First, reset heights to auto to get natural heights

  cards.forEach(function (card) {
    card.style.height = 'auto';
  }); // Find the maximum height

  cards.forEach(function (card) {
    var cardHeight = card.offsetHeight;

    if (cardHeight > maxHeight) {
      maxHeight = cardHeight;
    }
  }); // Set all cards to the maximum height

  cards.forEach(function (card) {
    card.style.height = "".concat(maxHeight, "px");
  });
} // Call the function on page load and window resize


window.addEventListener('load', setEqualCardHeights);
window.addEventListener('resize', setEqualCardHeights); // Open filters popup (products.html)

function openFilters() {
  var filters = document.querySelector(".filters");
  filters.classList.remove("hidden");
  filters.classList.add("flex");
}

function closeFilters() {
  var filters = document.querySelector(".filters");
  filters.classList.remove("flex");
  filters.classList.add("hidden");
}
//# sourceMappingURL=main.dev.js.map
