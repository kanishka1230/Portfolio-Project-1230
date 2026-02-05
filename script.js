// ========================================
// Preloader
// ========================================
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 500);
});

// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcons(currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcons(newTheme);
});

function updateThemeIcons(theme) {
  if (theme === 'light') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

// ========================================
// Mobile Navigation
// ========================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ========================================
// Custom Cursor
// ========================================
if (window.matchMedia('(pointer: fine)').matches) {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Magnetic effect
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
      const rect = elem.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      elem.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    elem.addEventListener('mouseleave', () => {
      elem.style.transform = 'translate(0, 0)';
    });
  });
  
  // Cursor grow on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card-large, .skill-card, .edu-card');
  
  interactiveElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOutline.style.opacity = '0.2';
    });
    
    elem.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.opacity = '0.5';
    });
  });
}

// ========================================
// Scroll Progress Bar
// ========================================
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  scrollProgress.style.width = scrollPercent + '%';
});

// ========================================
// Header Scroll Effect
// ========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========================================
// Typewriter Effect
// ========================================
const typewriterElement = document.getElementById('typewriter');
const phrases = ['CSE Student', 'AI/ML Researcher', 'Deep Learning Engineer', 'Problem Solver'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before typing
  }
  
  setTimeout(typeWriter, typeSpeed);
}

// Start typewriter
setTimeout(typeWriter, 1000);

// ========================================
// Stats Counter Animation
// ========================================
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.h-number');
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            stat.textContent = target;
          }
        };
        
        updateCounter();
      });
      
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// ========================================
// 3D Tilt Effect for Cards
// ========================================
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// ========================================
// Scroll Reveal Animation
// ========================================
const revealElements = document.querySelectorAll('.section-header, .skill-card, .project-card-large, .timeline-item, .pub-item, .cert-item, .edu-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  revealObserver.observe(el);
});

// ========================================
// Form Handling
// ========================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
    
    // Reset after delay
    setTimeout(() => {
      submitBtn.classList.remove('success');
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3000);
  }, 1500);
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80; // Header height
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Dynamic Year in Footer
// ========================================
document.getElementById('year').textContent = new Date().getFullYear();

// ========================================
// Parallax Effect for Hero Orbs
// ========================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll('.gradient-orb');
  
  orbs.forEach((orb, index) => {
    const speed = 0.5 + (index * 0.2);
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});