"use strict";

// show the tab content based on the clicked tab
function showTab(index) {
  var contents = document.querySelectorAll('.tab-content');
  contents.forEach(function (el, i) {
    el.classList.toggle('hidden', i !== index);
  });
} // tab underline on hover effect


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
}); // Our products carousel 

$(document).ready(function () {
  $('.carousel').carousel();
}); //reviews carousel (tried using slick but couldnt get it wokring for some reason. AI suggested it might conflict with tailwind so just made my own version)

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

setInterval(nextSlide, 10000);
//# sourceMappingURL=main.dev.js.map
