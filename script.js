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
