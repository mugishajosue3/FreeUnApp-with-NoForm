/**
 * Template Name: FreeUnApp
 * Template URL: https://bootstrapmade.com/FreeUnApp-free-education-bootstrap-theme/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Smooth scrolling for anchor links with header offset
   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector("#header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20; // 20px extra padding

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);
})();

// Multi-Step Registration Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('registrationModal');
  const closeBtn = document.getElementById('closeModal');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('registrationForm');
  const steps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const progressFill = document.querySelector('.progress-fill');
  
  let currentStep = 1;
  const totalSteps = steps.length;

  // Open modal from any "Get Started" button
  document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-get-started, .btn-buy') || 
        e.target.closest('.btn-get-started, .btn-buy')) {
      e.preventDefault();
      openModal();
    }
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
  }

  // Open modal
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentStep = 1;
    updateStepDisplay();
  }

  // Close modal event listeners
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Next button functionality
  nextBtn.addEventListener('click', function() {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
      }
    }
  });

  // Previous button functionality
  prevBtn.addEventListener('click', function() {
    if (currentStep > 1) {
      currentStep--;
      updateStepDisplay();
    }
  });

  // Submit form
  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (validateCurrentStep()) {
      submitForm();
    }
  });

  // Update step display
  function updateStepDisplay() {
    // Hide all steps
    steps.forEach(step => {
      step.classList.remove('active');
    });

    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (currentStepElement) {
      currentStepElement.classList.add('active');
    }

    // Update progress indicator
    updateProgressIndicator();

    // Update navigation buttons
    updateNavigationButtons();

    // Update summary on last step
    if (currentStep === totalSteps) {
      updateSummary();
    }
  }

  // Update progress indicator
  function updateProgressIndicator() {
    progressSteps.forEach((step, index) => {
      const stepNumber = index + 1;
      step.classList.remove('active', 'completed');
      
      if (stepNumber === currentStep) {
        step.classList.add('active');
      } else if (stepNumber < currentStep) {
        step.classList.add('completed');
      }
    });

    // Update progress fill
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = progressPercentage + '%';
  }

  // Update navigation buttons
  function updateNavigationButtons() {
    if (currentStep === 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'flex';
      submitBtn.style.display = 'none';
    } else if (currentStep === totalSteps) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
      submitBtn.style.display = 'none';
    }
  }

  // Validate current step
  function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        showFieldError(field, 'This field is required');
      } else {
        clearFieldError(field);
      }

      // Email validation
      if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          showFieldError(field, 'Please enter a valid email address');
        }
      }

      // Phone validation
      if (field.type === 'tel' && field.value.trim()) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(field.value)) {
          isValid = false;
          showFieldError(field, 'Please enter a valid phone number');
        }
      }
    });

    return isValid;
  }

  // Show field error
  function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#dc3545';
  }

  // Clear field error
  function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = '#e9ecef';
  }

  // Update summary
  function updateSummary() {
    const name = document.getElementById('fullName').value || '-';
    const email = document.getElementById('email').value || '-';
    const phone = document.getElementById('phone').value || '-';
    const degree = document.getElementById('targetDegree').value || '-';

    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryEmail').textContent = email;
    document.getElementById('summaryPhone').textContent = phone;
    document.getElementById('summaryDegree').textContent = degree;
  }

  // File upload functionality
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function(e) {
      const file = e.target.files[0];
      const uploadArea = this.parentNode.querySelector('.upload-area');
      
      if (file) {
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB');
          this.value = '';
          return;
        }

        // Update upload area
        uploadArea.innerHTML = `
          <i class="bi bi-check-circle" style="color: #28a745;"></i>
          <span style="color: #28a745;">${file.name}</span>
          <small>File uploaded successfully</small>
        `;
        uploadArea.style.borderColor = '#28a745';
        uploadArea.style.background = 'rgba(40, 167, 69, 0.1)';
      }
    });
  });

  // Submit form
  function submitForm() {
    // Show loading state
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      // Show success message
      const modalBody = document.querySelector('.modal-body');
      modalBody.innerHTML = `
        <div class="success-message" style="text-align: center; padding: 60px 40px;">
          <div style="width: 80px; height: 80px; background: #28a745; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px;">
            <i class="bi bi-check-lg" style="font-size: 2rem; color: white;"></i>
          </div>
          <h3 style="color: #28a745; margin-bottom: 20px;">Application Submitted Successfully!</h3>
          <p style="color: #6c757d; line-height: 1.6; margin-bottom: 30px;">
            Thank you for submitting your application. We will review your information and get back to you within 24-48 hours with next steps.
          </p>
          <button onclick="closeModal()" style="background: #023f8a; color: white; border: none; padding: 12px 30px; border-radius: 25px; font-weight: 600; cursor: pointer;">
            Close
          </button>
        </div>
      `;

      // Hide footer
      document.querySelector('.modal-footer').style.display = 'none';
    }, 2000);
  }

  // Reset form
  function resetForm() {
    form.reset();
    currentStep = 1;
    updateStepDisplay();
    
    // Reset file upload areas
    document.querySelectorAll('.upload-area').forEach(area => {
      area.innerHTML = `
        <i class="bi bi-file-earmark-text"></i>
        <span>Click to upload</span>
        <small>PDF, DOC, DOCX (Max 5MB)</small>
      `;
      area.style.borderColor = '#023f8a';
      area.style.background = 'rgba(2, 63, 138, 0.05)';
    });

    // Show footer again
    document.querySelector('.modal-footer').style.display = 'block';
    
    // Reset submit button
    submitBtn.innerHTML = 'Submit Application <i class="bi bi-send"></i>';
    submitBtn.disabled = false;
  }

  // Initialize modal
  updateStepDisplay();
});
