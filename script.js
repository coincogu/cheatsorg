// Carousel scroll functionality
const carouselTrack = document.querySelector('.carousel-track');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

if (carouselTrack && leftArrow && rightArrow) {
  leftArrow.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: -240, behavior: 'smooth' });
  });
  rightArrow.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: 240, behavior: 'smooth' });
  });
}

// Product scroll functionality
const productTrack = document.querySelector('.product-track');
const productLeft = document.querySelector('.product-arrow.left');
const productRight = document.querySelector('.product-arrow.right');

if (productTrack && productLeft && productRight) {
  productLeft.addEventListener('click', () => {
    productTrack.scrollBy({ left: -320, behavior: 'smooth' });
  });
  productRight.addEventListener('click', () => {
    productTrack.scrollBy({ left: 320, behavior: 'smooth' });
  });
}

// Recommended carousel scroll functionality
const carouselTrackWide = document.querySelector('.carousel-track-wide');
const carouselLeft = document.querySelector('.carousel-arrow.left');
const carouselRight = document.querySelector('.carousel-arrow.right');

if (carouselTrackWide && carouselLeft && carouselRight) {
  carouselLeft.addEventListener('click', () => {
    carouselTrackWide.scrollBy({ left: -240, behavior: 'smooth' });
  });
  carouselRight.addEventListener('click', () => {
    carouselTrackWide.scrollBy({ left: 240, behavior: 'smooth' });
  });
}

// Language dropdown logic and translation
const langDropdown = document.querySelector('.lang-dropdown');
const langToggle = document.querySelector('.lang-dropdown-toggle');
const langList = document.querySelector('.lang-dropdown-list');

if (langDropdown && langToggle && langList) {
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });

  langList.querySelectorAll('.lang-flag').forEach(flag => {
    flag.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = flag.getAttribute("data-lang");
      langToggle.textContent = flag.textContent.split(' ')[0];
      langDropdown.classList.remove('open');
      loadLanguage(lang);
    });
  });

  document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
  });
}

// Load translations from JSON
function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      // Update text content
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });

      // Update placeholders
      document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (data[key]) el.setAttribute("placeholder", data[key]);
      });

      localStorage.setItem("preferredLang", lang);
    })
    .catch(err => console.error(`Language load failed: ${err}`));
}

// Load preferred language on page load
document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem("preferredLang") || "en";
  loadLanguage(lang);
});
