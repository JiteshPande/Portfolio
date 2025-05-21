document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initStickyHeader();
  initMobileNav();
  initScrollAnimation();
  initProjectFilter();
  initSkillTabs();
  initContactForm();
  initBackToTop();
  setCurrentYear();
  // ✅ Set up the click listener to download on click, not on load
//  document.addEventListener('DOMContentLoaded', function() {
//   // other initializations...
//   console.log("DOM fully loaded and parsed");

//   const downloadBtn = document.querySelector("#downloadBtn")
//   console.log("Download button:", downloadBtn);
//   if (downloadBtn) {
//     downloadBtn.addEventListener("click", downloadFile);
//   }
// });

});

 function downloadFile () {
      const pdfUrl = "./resume_dub.pdf"; // Replace with your actual PDF path
      const fileName = "resume.pdf"; // Desired file name for download

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

// Make the header sticky on scroll
function initStickyHeader() {
  const header = document.querySelector('.header');
  const scrollThreshold = 50;
  
  // Apply scrolled class to header when page is scrolled
  function toggleHeaderClass() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Check on page load
  toggleHeaderClass();
  
  // Add scroll event listener
  window.addEventListener('scroll', toggleHeaderClass);
}

// Mobile navigation functionality
function initMobileNav() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  // Toggle mobile navigation when hamburger is clicked
  mobileNavToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });
  
  // Close mobile nav when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNavToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });
}

// Animate elements when they come into view
function initScrollAnimation() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  function checkScroll() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // If element is in viewport
      if (elementTop < windowHeight - 100) {
        element.classList.add('animate-fade-in');
      }
    });
  }
  
  // Check on page load
  checkScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', checkScroll);
}

// Filter projects by category
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide projects based on category
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          // Add a small delay for animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Switch between skills categories
function initSkillTabs() {
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillPanes = document.querySelectorAll('.skill-pane');
  
  skillTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      skillTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get tab value
      const tabValue = this.getAttribute('data-tab');
      
      // Show corresponding skill pane
      skillPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `${tabValue}-skills`) {
          pane.classList.add('active');
        }
      });
      
      // Animate skill bars for the active tab
      animateSkillBars(tabValue);
    });
  });
  
  // Initial animation for the default tab
  animateSkillBars('frontend');
}

// Animate the skill bars
function animateSkillBars(tabId) {
  const skillBars = document.querySelectorAll(`#${tabId}-skills .skill-progress-bar`);
  
  // Reset all skill bars
  skillBars.forEach(bar => {
    bar.style.width = '0';
  });
  
  // Animate after a short delay
  setTimeout(() => {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = width;
    });
  }, 100);
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic form validation
    if (!name || !email || !message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate API call delay
    setTimeout(() => {
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      
      // Show success message
      showToast('Your message has been sent successfully!', 'success');
    }, 1500);
  });
}

// Back to top button functionality
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Show/hide button based on scroll position
  function toggleBackToTopButton() {
    if (window.scrollY > 500) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.pointerEvents = 'auto';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.pointerEvents = 'none';
    }
  }
  
  // Initial check
  toggleBackToTopButton();
  
  // Add scroll event listener
  window.addEventListener('scroll', toggleBackToTopButton);
}

// Set current year in the footer
function setCurrentYear() {
  document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Toast notification system
function showToast(message, type) {
  const toastContainer = document.getElementById('toast-container');
  
  // Create toast element
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add(`toast-${type}`);
  
  // Create toast content
  toast.innerHTML = `
    <div class="toast-message">
      ${type === 'success' 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
      }
      <span>${message}</span>
    </div>
    <button class="toast-close">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;
  
  // Add toast to container
  toastContainer.appendChild(toast);
  
  // Add close functionality
  const closeButton = toast.querySelector('.toast-close');
  closeButton.addEventListener('click', () => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}
