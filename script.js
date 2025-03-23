const messages = [
    "Welcome to my profile!",
    "Check out my TikTok, I'm probably live rn",
    "Let's play Roblox?"
];

const infoElement = document.querySelector(".info");
const audio = document.getElementById("audio");
const volumeSlider = document.getElementById("volumeSlider");
const profileContainer = document.querySelector(".profile-container");

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

audio.volume = 0.5;

function playAudio() {
    audio.play().catch(error => console.log("Autoplay prevented:", error));
    document.removeEventListener("click", playAudio);
}

document.addEventListener("click", playAudio);

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

function typeEffect() {
    const currentMessage = messages[messageIndex];

    if (isDeleting) {
        infoElement.innerHTML = currentMessage.substring(0, charIndex);
        charIndex--;
    } else {
        infoElement.innerHTML = currentMessage.substring(0, charIndex + 1);
        charIndex++;
    }

    let typingSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentMessage.length) {
        typingSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});

document.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    const { innerWidth: width, innerHeight: height } = window;

    const moveX = (x / width - 0.5) * 15; 
    const moveY = (y / height - 0.5) * 15; 

    profileContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
