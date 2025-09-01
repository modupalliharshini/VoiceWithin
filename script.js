// Initialize AOS & Swiper
AOS.init();
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 4000,
  },
});

// Initialize EmailJS
(function () {
  emailjs.init("78E9IEU60AW4LRuTt"); // Public Key
})();

// Handle Contact Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submitBtn");
  
  // Modal elements
  const popupModal = document.getElementById("popup-modal");
  const popupMessage = document.getElementById("popup-message");
  const popupClose = document.getElementById("popup-close");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable button during sending
    submitBtn.disabled = true;
    submitBtn.querySelector(".btn-text").textContent = "Sending...";

    // Send Email using EmailJS
    emailjs
      .sendForm("service_2eeu6bc", "template_xpd3gvy", form)
      .then(() => {
        showPopup("✅ Story shared successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showPopup("❌ Failed to send. Please try again.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector(".btn-text").textContent = "Submit";
      });
  });

  // Function to show the modal popup
  function showPopup(message) {
    popupMessage.textContent = message;
    popupModal.style.display = "block";
  }

  // Close modal when clicking the X
  popupClose.addEventListener("click", () => {
    popupModal.style.display = "none";
  });

  // Close modal when clicking outside the content
  window.addEventListener("click", (e) => {
    if (e.target === popupModal) {
      popupModal.style.display = "none";
    }
  });
});

// ======================
// HAMBURGER MENU TOGGLE
// ======================

(function() {
  const hamb = document.querySelector('.hamb');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.nav');

  if (!hamb || !navLinks) return;

  // Toggle hamburger menu
  hamb.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering outside click
    hamb.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');
    hamb.setAttribute(
      'aria-expanded',
      navLinks.classList.contains('open') ? 'true' : 'false'
    );
  });

  // Close menu & smooth scroll when clicking a nav item
  navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      // Close menu instantly
      hamb.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      hamb.setAttribute('aria-expanded', 'false');

      // Smooth scroll
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Close navbar when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamb.contains(e.target)) {
      hamb.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      hamb.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu if resized to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamb.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      hamb.setAttribute('aria-expanded', 'false');
    }
  });
})();









