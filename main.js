document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle (basic implementation)
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    // In a complete implementation, this would toggle a mobile menu class
    // For this landing page, we'll just log or do a simple alert if they click it
    // Or we could toggle display of nav-links
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(1, 23, 55, 0.95)';
      navLinks.style.padding = '1rem 0';
      navLinks.style.backdropFilter = 'blur(10px)';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      }
      
      const targetId = this.getAttribute('href');
      if(targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if(targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });
});
