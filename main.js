// show the tab content based on the clicked tab
function showTab(index) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach((el, i) => {
        el.classList.toggle('hidden', i !== index);
    });
}

// tab underline on hover effect
document.querySelectorAll('.tab').forEach(tab => {
    // Create the animated border element
    const border = document.createElement('div');
    border.className = `
        h-[4px] rounded
        transition-all duration-300 ease-in-out
    `;

    if (tab.parentElement.classList.contains('header')) {
        border.classList.add('bg-orange-400');
    } else {
        border.classList.add('bg-[#51658f]');
    }

    border.style.width = '0';
    tab.appendChild(border);

    // Animate on hover
    tab.addEventListener('mouseenter', () => {
        border.style.width = '100%';
    });

    tab.addEventListener('mouseleave', () => {
        border.style.width = '0';
    });
});

// Our products carousel 
$(document).ready(function() {
	$('.carousel').carousel();
});

//reviews carousel (tried using slick but couldnt get it wokring for some reason. AI suggested it might conflict with tailwind so just made my own version)
const slides = document.querySelectorAll("#slider .slide");
const dots = document.querySelectorAll(".dot");
let current = 0;
let isTransitioning = false;
const fadeDuration = 700; // must match Tailwind's duration-700

function showSlide(index) {
    // prevent clicks or autoplay overlap during fade
    if (isTransitioning || index === current) return;
    isTransitioning = true;

    const currentSlide = slides[current];
    const nextSlide = slides[index];

    // Fade out the current slide
    currentSlide.classList.remove("opacity-100");
    currentSlide.classList.add("opacity-0");

    // Wait for fade out to finish before showing the next
    setTimeout(() => {
        // Hide old slide
        currentSlide.classList.add("hidden");

        // Prepare the new slide for fade-in
        nextSlide.classList.remove("hidden", "opacity-100");
        nextSlide.classList.add("opacity-0");

         // Force a reflow (browser reset) before applying fade-in to make the fade-in smooth
        void nextSlide.offsetWidth;

        // Now fade in smoothly
        nextSlide.classList.remove("opacity-0");
        nextSlide.classList.add("opacity-100");

        current = index;

        // Update dots
        dots.forEach((dot, i) => {
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
    const nextIndex = (current + 1) % slides.length; // modulus operator to make it repeat infinitely
    showSlide(nextIndex);
}

// Make the dots clickable
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        showSlide(i);
    });
});

// Initialize first slide
showSlide(0);

// Auto-rotate slides
setInterval(nextSlide, 10000);


// Order cart sidebar 
const cart = document.getElementById("cart");
const mainContent = document.getElementById("page-content");
const overlay = document.getElementById("overlay");
const checkout = document.getElementById("cart-checkout")

function openCart() {
    cart.classList.add("open");
    mainContent.classList.add("-translate-x-[300px]","sm:-translate-x-[500px]", "brightness-50");
    overlay.classList.remove("hidden");
    overlay.classList.add("opacity-100");
    setTimeout(() => {
        checkout.classList.add("z-1000");
        checkout.classList.remove("-z-10");
    }, 500);
}

function closeCart() {
    cart.classList.remove("open");
    mainContent.classList.remove("-translate-x-[300px]","sm:-translate-x-[500px]", "brightness-50");
    overlay.classList.remove("opacity-100");
    overlay.classList.add("hidden");
    checkout.classList.remove("z-1000");
    checkout.classList.add("-z-10");
}

// Close cart when clickin
overlay.addEventListener("click", closeCart);

