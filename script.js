/* ════════════════════════════════════════════
   script.js  —  Portfolio JavaScript
   ════════════════════════════════════════════ */

/* ─── 1. CUSTOM CURSOR ─── */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Dot follows mouse instantly
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';

  // Ring follows with smooth lag
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor grows on hover over links/buttons
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width      = '20px';
    cursor.style.height     = '20px';
    cursorRing.style.width  = '50px';
    cursorRing.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width      = '12px';
    cursor.style.height     = '12px';
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
  });
});


/* ─── 2. TYPED TEXT EFFECT ─── */
const phrases = [
  'Full Stack Developer',
  'React.js Enthusiast',
  'Problem Solver',
  'CS Student @ MANUU'
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
const typedEl    = document.getElementById('typed');

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Typing
    typedEl.textContent = currentPhrase.slice(0, ++charIndex);
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800); // pause before deleting
      return;
    }
  } else {
    // Deleting
    typedEl.textContent = currentPhrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 95);
}

// Start after 1.2s delay (lets page animations settle)
setTimeout(typeEffect, 1200);


/* ─── 3. SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ─── 4. CONTACT FORM SUBMIT ─── */
function handleSubmit(event) {
  event.preventDefault();

  const successMsg = document.getElementById('formSuccess');
  successMsg.style.display = 'block';

  // Reset form fields
  event.target.reset();

  // Hide success message after 4 seconds
  setTimeout(() => {
    successMsg.style.display = 'none';
  }, 4000);
}
