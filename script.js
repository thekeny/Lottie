'use strict';

const sections = [...document.querySelectorAll('main > section')];
const navLinks = [...document.querySelectorAll('.chapter-nav a')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = Math.max(0, sections.findIndex(section => `#${section.id}` === location.hash));
let navigationUntil = 0;
let wheelTotal = 0;
let lastWheel = 0;

// The page remains a normal scrollable document without JavaScript.
document.documentElement.classList.add('deck-ready');

function navigate(index, { instant = false, focus = false } = {}) {
  const target = Math.max(0, Math.min(sections.length - 1, index));
  const changed = target !== current;
  current = target;
  navigationUntil = performance.now() + (reducedMotion.matches || instant ? 200 : 1000);
  sections.forEach((section, i) => {
    section.classList.toggle('is-active', i === current);
    // Prevent Tab from jumping to a control on an offscreen slide.
    section.inert = i !== current;
  });
  navLinks.forEach(link => {
    if (link.hash === `#${sections[current].id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  window.scrollTo({ top: sections[current].offsetTop, behavior: instant || reducedMotion.matches ? 'instant' : 'smooth' });
  if (changed) {
    try { history.replaceState(null, '', `#${sections[current].id}`); } catch { /* Local file preview can restrict History. */ }
  }
  if (sections[current].id === 'moods') enterEmotions();
  else leaveEmotions();
  if (focus) {
    const heading = sections[current].querySelector('h1,h2') || sections[current];
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

window.addEventListener('wheel', event => {
  if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
  event.preventDefault();
  const now = performance.now();
  const freshGesture = now - lastWheel > 180;
  lastWheel = now;
  if (now < navigationUntil) { wheelTotal = 0; return; }
  if (freshGesture || Math.sign(wheelTotal) !== Math.sign(event.deltaY)) wheelTotal = 0;
  const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
  wheelTotal += delta;
  if (Math.abs(wheelTotal) >= 28) {
    navigate(current + Math.sign(wheelTotal));
    wheelTotal = 0;
  }
}, { passive: false });

let touchOrigin = null;
window.addEventListener('touchstart', event => {
  if (event.touches.length !== 1) { touchOrigin = null; return; }
  touchOrigin = { x: event.touches[0].clientX, y: event.touches[0].clientY };
}, { passive: true });
window.addEventListener('touchmove', event => {
  if (touchOrigin && event.touches.length === 1) event.preventDefault();
}, { passive: false });
window.addEventListener('touchend', event => {
  if (!touchOrigin || !event.changedTouches.length) return;
  const dy = touchOrigin.y - event.changedTouches[0].clientY;
  const dx = touchOrigin.x - event.changedTouches[0].clientX;
  touchOrigin = null;
  if (Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx) && performance.now() >= navigationUntil) navigate(current + Math.sign(dy));
}, { passive: true });
window.addEventListener('touchcancel', () => { touchOrigin = null; }, { passive: true });

document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select')) return;
  if ([' ', 'Enter'].includes(event.key) && event.target.closest('button,a')) return;
  const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key) ? 1 : ['ArrowUp', 'PageUp'].includes(event.key) ? -1 : 0;
  if (direction) {
    event.preventDefault();
    if (performance.now() >= navigationUntil) navigate(current + (event.shiftKey && event.key === ' ' ? -1 : direction), { focus: true });
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    navigate(event.key === 'Home' ? 0 : sections.length - 1, { focus: true });
  }
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  const target = sections.findIndex(section => `#${section.id}` === link.hash);
  if (target < 0) return;
  link.addEventListener('click', event => {
    event.preventDefault();
    navigate(target, { focus: true });
  });
});
window.addEventListener('resize', () => window.scrollTo({ top: sections[current].offsetTop, behavior: 'instant' }));
window.addEventListener('hashchange', () => {
  const index = sections.findIndex(section => `#${section.id}` === location.hash);
  if (index >= 0) navigate(index);
});

const moodSlide = document.querySelector('#moods');
const centralEmotion = document.querySelector('#emotion-central');
const orbitImages = [...document.querySelectorAll('.orbit-slot img')];
let emotionTimer = null;
let emotionPhase = 'idle';
let centralIndex = 0;
const emotionPath = index => `images/lottie-emoji/emoji_${String(index + 1).padStart(2, '0')}.png`;
// Decode before the central sequence so quick swaps never flash an unloaded image.
for (let i = 0; i < 12; i++) { const image = new Image(); image.src = emotionPath(i); }

function scheduleEmotionTick() {
  clearTimeout(emotionTimer);
  if (sections[current].id !== 'moods' || reducedMotion.matches || document.hidden) return;
  emotionTimer = setTimeout(() => {
    if (emotionPhase === 'sequence') {
      centralIndex++;
      if (centralIndex < 12) centralEmotion.src = emotionPath(centralIndex);
      else {
        emotionPhase = 'orbit';
        moodSlide.classList.add('is-orbit');
      }
    } else if (emotionPhase === 'orbit') {
      const image = orbitImages[Math.floor(Math.random() * orbitImages.length)];
      const previousIndex = Number(image.dataset.emotion ?? orbitImages.indexOf(image));
      const index = (previousIndex + 1 + Math.floor(Math.random() * 11)) % 12;
      image.src = emotionPath(index);
      image.dataset.emotion = String(index);
      if (!reducedMotion.matches) image.animate([{ opacity: .35, scale: '.88' }, { opacity: 1, scale: '1' }], { duration: 450, easing: 'ease-in-out' });
    }
    scheduleEmotionTick();
  }, emotionPhase === 'sequence' ? 145 : 2400);
}
function enterEmotions() {
  if (emotionPhase === 'idle') {
    centralIndex = 0;
    centralEmotion.src = emotionPath(0);
    emotionPhase = reducedMotion.matches ? 'orbit' : 'sequence';
    moodSlide.classList.toggle('is-orbit', reducedMotion.matches);
  }
  scheduleEmotionTick();
}
function leaveEmotions() { clearTimeout(emotionTimer); }
document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('motion-paused', document.hidden);
  moodSlide.classList.toggle('is-paused', document.hidden);
  scheduleEmotionTick();
});
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    clearTimeout(emotionTimer);
    emotionPhase = 'orbit';
    moodSlide.classList.add('is-orbit');
  } else if (sections[current].id === 'moods') scheduleEmotionTick();
});
navigate(current, { instant: true });
