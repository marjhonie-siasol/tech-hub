const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const exploreToggle = document.getElementById('explore-toggle');
const exploreMenu = document.getElementById('explore-menu'); // New menu for Explore
const typingText = document.getElementById('typing-text');
const textArray = [
    "EXPLORE THE LATEST TECHNOLOGY OF TODAY'S WORLD",
    "JOIN THE FUTURE OF INNOVATION",
    "DISCOVER TECH TRENDS AND UPDATES"
];

let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isTyping = true;
let pauseAfterTyping = false;
let typingSpeed = 150;
let deletingSpeed = 30;

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Explore toggle for mobile
exploreToggle.addEventListener('click', () => {
    exploreMenu.classList.toggle('hidden');
});

// Prevent click outside mobile menu and explore menu from closing them
window.addEventListener('click', function (e) {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden'); // Hide the mobile menu if clicked outside
    }
    if (!exploreToggle.contains(e.target) && !exploreMenu.contains(e.target)) {
        exploreMenu.classList.add('hidden'); // Hide the explore menu if clicked outside
    }
});

// Dropdown Functionality
const moreDropdownToggle = document.querySelector('.more-dropdown-toggle');
const moreDropdownMenu = document.querySelector('.more-dropdown-menu');

// Event listener for the More dropdown toggle
if (moreDropdownToggle) {
    moreDropdownToggle.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        moreDropdownMenu.classList.toggle('hidden'); // Toggle the hidden class
    });
}

// Close dropdown if clicked outside
window.addEventListener('click', function (e) {
    // Make sure dropdown closes on outside click even on mobile view
    if (!moreDropdownToggle.contains(e.target) && !moreDropdownMenu.contains(e.target)) {
        moreDropdownMenu.classList.add('hidden'); // Hide the dropdown if clicked outside
    }
});

// Typing Animation
function type() {
    if (pauseAfterTyping) {
        return;
    }

    if (isTyping) {
        currentText += textArray[textIndex].charAt(charIndex);
        typingText.innerHTML = currentText;
        charIndex++;

        if (charIndex === textArray[textIndex].length) {
            isTyping = false;
            pauseAfterTyping = true;
            setTimeout(() => {
                pauseAfterTyping = false;  
                isTyping = false;         
            }, 3000);  
        }
    } 
    else {
        currentText = currentText.slice(0, -1);
        typingText.innerHTML = currentText;

        if (currentText.length === 0) {
            isTyping = true;   
            charIndex = 0;    
            textIndex = (textIndex + 1) % textArray.length;  
        }
    }
}

function adjustSpeed() {
    let speed = isTyping ? typingSpeed : deletingSpeed; 
    type();
    setTimeout(adjustSpeed, speed);
}

adjustSpeed();
