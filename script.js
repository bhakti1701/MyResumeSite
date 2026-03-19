// ===========================
//  NAVBAR — scroll effect
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
//  HAMBURGER MENU (mobile)
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===========================
//  SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ===========================
//  ACTIVE NAV LINK highlight
// ===========================
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
//  SMOOTH SCROLL for anchors
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
//  CURSOR TRAIL (subtle dot)
// ===========================
const cursor = document.createElement('div');
cursor.style.cssText = `
  width: 6px;
  height: 6px;
  background: var(--accent, #b85c2a);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.15s ease, opacity 0.3s ease;
  mix-blend-mode: multiply;
`;
document.body.appendChild(cursor);

let cursorX = 0, cursorY = 0;
let isMoving = false;
let moveTimeout;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.left = cursorX - 3 + 'px';
  cursor.style.top = cursorY - 3 + 'px';
  cursor.style.opacity = '1';
  cursor.style.transform = 'scale(1)';

  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(() => {
    cursor.style.opacity = '0';
  }, 1200);
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

// Grow cursor on hover over interactive elements
document.querySelectorAll('a, button, .edu-card, .award-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(3.5)';
    cursor.style.opacity = '0.4';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.opacity = '1';
  });
});
