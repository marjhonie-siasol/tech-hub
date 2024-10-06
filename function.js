const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const typingText = document.getElementById('typing-text');
const dynamicDiv = document.getElementById('dynamic-div');
const headerHeight = document.querySelector('header').offsetHeight;

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
let deletingSpeed = 30; // Speed up the deleting phase

function type() {
    // Check if we are pausing after a phrase is fully typed
    if (pauseAfterTyping) {
        return;
    }

    // Typing forward (adding characters)
    if (isTyping) {
        currentText += textArray[textIndex].charAt(charIndex);
        typingText.innerHTML = currentText;
        charIndex++;

        if (charIndex === textArray[textIndex].length) {
            // Once the full phrase is typed, pause for 3 seconds
            isTyping = false;
            pauseAfterTyping = true;
            setTimeout(() => {
                pauseAfterTyping = false;  // Resume after the pause
                isTyping = false;           // Switch to deleting phase
            }, 3000);  // Pause for 3 seconds
        }
    } 
    // Typing backward (removing characters)
    else {
        currentText = currentText.slice(0, -1);
        typingText.innerHTML = currentText;

        if (currentText.length === 0) {
            isTyping = true;    // Switch back to typing phase
            charIndex = 0;      // Reset character index
            textIndex = (textIndex + 1) % textArray.length;  // Move to the next text
        }
    }
}

// Set typing and deleting speed based on typing phase
function adjustSpeed() {
    let speed = isTyping ? typingSpeed : deletingSpeed;  // Typing or deleting speed
    type();
    setTimeout(adjustSpeed, speed);
}

// Start the typing animation with adjustable speed
adjustSpeed();

// Menu toggle for mobile view
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
        dynamicDiv.classList.add('sticky');
    } else {
        dynamicDiv.classList.remove('sticky');
    }
});
