import './style.css';

document.getElementById('year').textContent = new Date().getFullYear();

// Modal Logic
// Opens a specific modal by ID and disables background scrolling
window.openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
};

// Closes a specific modal and resets internal forms/messages if necessary
window.closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore background scrolling

        // Reset the booking modal state (hide success message, show form)
        if (modalId === 'bookingModal') {
            document.getElementById('bookingForm')?.classList.remove('hidden');
            document.getElementById('successMsg')?.classList.add('hidden');
            // Reset the review modal state
        } else if (modalId === 'reviewModal') {
            document.getElementById('reviewForm')?.classList.remove('hidden');
            document.getElementById('reviewSuccessMsg')?.classList.add('hidden');
        }
    }
};

// --- MOBILE MENU LOGIC ---
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const mobileLinks = mobileMenu?.querySelectorAll('a');

window.closeMobileMenu = () => {
    mobileMenu?.classList.add('translate-x-full');
    document.body.style.overflow = 'auto';
};

menuBtn?.addEventListener('click', () => {
    mobileMenu?.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
});

closeMenuBtn?.addEventListener('click', closeMobileMenu);

mobileLinks?.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});


// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const carouselContainer = document.getElementById('carousel');

// Updates the visual state of slides and navigation dots
function updateCarousel(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    // Reset all dots to inactive color
    dots.forEach(dot => {
        dot.classList.remove('bg-brand');
        dot.classList.add('bg-zinc-800');
    });

    // Set the current slide and its corresponding dot as active
    slides[index].classList.add('active');
    dots[index].classList.remove('bg-zinc-800');
    dots[index].classList.add('bg-brand');
}

// Navigates to the next slide (loops to the beginning)
window.nextSlide = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel(currentSlide);
};

// Navigates to the previous slide (loops to the end)
window.prevSlide = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel(currentSlide);
};

// Touch events for mobile swipe functionality
let startX = 0;
let endX = 0;

if (carouselContainer) {
    // Capture the starting horizontal position of the touch
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    // Capture the ending position and trigger swipe logic
    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
}

// Detects swipe direction based on a movement threshold (50px)
function handleSwipe() {
    const swipeThreshold = 50;
    if (startX - endX > swipeThreshold) {
        nextSlide(); // Swiped left
    } else if (endX - startX > swipeThreshold) {
        prevSlide(); // Swiped right
    }
}

// Form Validation and Submission for Booking
document.getElementById('bookingForm')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default page reload

    // Form inputs and error message containers
    const name = document.getElementById('userName');
    const email = document.getElementById('userEmail');
    const msg = document.getElementById('userMsg');

    const nameErr = document.getElementById('nameError');
    const emailErr = document.getElementById('emailError');
    const msgErr = document.getElementById('msgError');

    let isValid = true;

    // Name validation: must be at least 2 characters
    if (name.value.trim().length < 2) {
        nameErr.classList.remove('hidden');
        name.classList.add('error-border');
        isValid = false;
    } else {
        nameErr.classList.add('hidden');
        name.classList.remove('error-border');
    }

    // Email validation: basic regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailErr.classList.remove('hidden');
        email.classList.add('error-border');
        isValid = false;
    } else {
        emailErr.classList.add('hidden');
        email.classList.remove('error-border');
    }

    // Message validation: must not be empty
    if (msg.value.trim() === "") {
        msgErr.classList.remove('hidden');
        msg.classList.add('error-border');
        isValid = false;
    } else {
        msgErr.classList.add('hidden');
        msg.classList.remove('error-border');
    }

    // If all fields are valid, prepare and trigger an email redirect
    if (isValid) {
        const subject = encodeURIComponent(`New Booking from ${name.value}`);
        const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\nMessage: ${msg.value}`);

        // Open user's mail client with pre-filled data
        window.location.href = `mailto:tonya@musemotion.com?subject=${subject}&body=${body}`;

        // Switch form visibility to show success message
        document.getElementById('bookingForm').classList.add('hidden');
        document.getElementById('successMsg').classList.remove('hidden');
    }
});

// Review Form Validation and Submission
document.getElementById('reviewForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('reviewName');
    const text = document.getElementById('reviewText');

    const nameErr = document.getElementById('reviewNameError');
    const textErr = document.getElementById('reviewTextError');

    let isValid = true;

    // Validation: Name must be at least 2 characters
    if (name.value.trim().length < 2) {
        nameErr.classList.remove('hidden');
        name.classList.add('error-border');
        isValid = false;
    } else {
        nameErr.classList.add('hidden');
        name.classList.remove('error-border');
    }

    // Validation: Text must not be empty
    if (text.value.trim() === "") {
        textErr.classList.remove('hidden');
        text.classList.add('error-border');
        isValid = false;
    } else {
        textErr.classList.add('hidden');
        text.classList.remove('error-border');
    }

    // If valid, show success message and clear the form fields
    if (isValid) {
        document.getElementById('reviewForm').classList.add('hidden');
        document.getElementById('reviewSuccessMsg').classList.remove('hidden');

        name.value = '';
        text.value = '';
    }
});