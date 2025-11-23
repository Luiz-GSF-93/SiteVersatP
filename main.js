// ===================================
// NAVIGATION & HEADER
// ===================================
const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile navigation
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = navToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const icon = navToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Add scrolled class to header
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll("section[id]");

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add("active");
    } else {
      navLink?.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", highlightNavigation);

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===================================
// ANIMATION ON SCROLL (AOS)
// ===================================
function initAOS() {
  const elements = document.querySelectorAll("[data-aos]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize AOS when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAOS);
} else {
  initAOS();
}

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    company: document.getElementById("company").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
    timestamp: new Date().toISOString(),
  };

  // Get submit button
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  try {
    // Simulate API call (replace with actual API endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    showNotification(
      "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      "success"
    );

    // Reset form
    contactForm.reset();
  } catch (error) {
    // Show error message
    showNotification(
      "Erro ao enviar mensagem. Por favor, tente novamente.",
      "error"
    );
    console.error("Form submission error:", error);
  } finally {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success" ? "check-circle" : "exclamation-circle"
            }"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease;
    `;

  // Add to document
  document.body.appendChild(notification);

  // Close button handler
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    `;

  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add notification animations to the page
if (!document.querySelector("#notificationStyles")) {
  const style = document.createElement("style");
  style.id = "notificationStyles";
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.5rem;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.3) !important;
            transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
            .notification {
                left: 20px;
                right: 20px;
                min-width: auto;
            }
        }
    `;
  document.head.appendChild(style);
}

// ===================================
// STATS COUNTER ANIMATION
// ===================================
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===================================
// SERVICE CARDS INTERACTION
// ===================================
const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    // Add a subtle pulse animation
    this.style.animation = "cardPulse 0.6s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.animation = "";
  });
});

// Add card pulse animation
if (!document.querySelector("#cardAnimations")) {
  const style = document.createElement("style");
  style.id = "cardAnimations";
  style.textContent = `
        @keyframes cardPulse {
            0%, 100% {
                transform: translateY(-8px) scale(1);
            }
            50% {
                transform: translateY(-8px) scale(1.02);
            }
        }
    `;
  document.head.appendChild(style);
}

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================
const heroSection = document.querySelector(".hero");
const energyCircles = document.querySelectorAll(".energy-circle");

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroHeight = heroSection.offsetHeight;

  if (scrolled < heroHeight) {
    energyCircles.forEach((circle, index) => {
      const speed = 0.5 + index * 0.2;
      circle.style.transform = `scale(${1 + scrolled * 0.0002}) rotate(${
        scrolled * speed * 0.1
      }deg)`;
    });
  }
});

// ===================================
// FORM VALIDATION
// ===================================
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group select, .form-group textarea"
);

formInputs.forEach((input) => {
  // Add real-time validation
  input.addEventListener("blur", function () {
    validateField(this);
  });

  // Remove error on input
  input.addEventListener("input", function () {
    if (this.classList.contains("error")) {
      this.classList.remove("error");
      const errorMsg = this.parentElement.querySelector(".error-message");
      if (errorMsg) errorMsg.remove();
    }
  });
});

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Check if required field is empty
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "Este campo é obrigatório";
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Por favor, insira um email válido";
    }
  }

  // Phone validation
  if (field.type === "tel" && value) {
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(value) || value.length < 10) {
      isValid = false;
      errorMessage = "Por favor, insira um telefone válido";
    }
  }

  // Display validation result
  if (!isValid) {
    field.classList.add("error");

    // Remove existing error message
    const existingError = field.parentElement.querySelector(".error-message");
    if (existingError) existingError.remove();

    // Add error message
    const errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.textContent = errorMessage;
    errorElement.style.cssText = `
            display: block;
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
    field.parentElement.appendChild(errorElement);
  } else {
    field.classList.remove("error");
    const errorMsg = field.parentElement.querySelector(".error-message");
    if (errorMsg) errorMsg.remove();
  }

  return isValid;
}

// Add error styles
if (!document.querySelector("#validationStyles")) {
  const style = document.createElement("style");
  style.id = "validationStyles";
  style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
        }
        
        .form-group input.error:focus,
        .form-group select.error:focus,
        .form-group textarea.error:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
        }
    `;
  document.head.appendChild(style);
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Throttle function for scroll events
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

// Apply throttle to scroll-heavy functions
window.addEventListener(
  "scroll",
  throttle(() => {
    highlightNavigation();
  }, 100)
);

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    const icon = navToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Add focus visible for keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// Add focus styles for keyboard navigation
if (!document.querySelector("#accessibilityStyles")) {
  const style = document.createElement("style");
  style.id = "accessibilityStyles";
  style.textContent = `
        body.keyboard-navigation *:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
    `;
  document.head.appendChild(style);
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log(
  "%c🚀 Versat Prime",
  "font-size: 24px; font-weight: bold; color: #00d4ff;"
);
console.log(
  "%cWebsite desenvolvido com tecnologia de ponta",
  "font-size: 14px; color: #a8b2d1;"
);
console.log(
  "%c📧 contato@versatprime.com.br",
  "font-size: 12px; color: #6b7280;"
);

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Versat Prime website initialized successfully");

  // Add loaded class to body for any CSS animations
  document.body.classList.add("loaded");
});
