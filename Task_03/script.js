// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const prefersDark = localStorage.getItem('theme') === 'dark';

if (prefersDark) {
  document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Carousel Logic
let currentSlide = 0;
const carouselImages = document.querySelectorAll('.carousel-image');
const dotsContainer = document.getElementById('carouselDots');

// Create dot indicators
carouselImages.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('span');

function showSlide(index) {
  carouselImages.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active-dot'));
  carouselImages[index].classList.add('active');
  dots[index].classList.add('active-dot');
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + carouselImages.length) % carouselImages.length;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-play
let carouselInterval = setInterval(() => changeSlide(1), 4000);

document.querySelector('.carousel-container').addEventListener('mouseenter', () => clearInterval(carouselInterval));
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
  carouselInterval = setInterval(() => changeSlide(1), 4000);
});

// Init
showSlide(currentSlide);

// API Fetch
async function fetchJoke() {
  const jokeBox = document.getElementById('jokeOutput');
  jokeBox.textContent = "Loading...";
  try {
    const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
    const data = await res.json();
    jokeBox.textContent = `${data.setup} — ${data.punchline}`;
  } catch {
    jokeBox.textContent = "Oops! Could not fetch joke.";
  }
}
