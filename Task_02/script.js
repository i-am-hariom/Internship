const imageForm = document.getElementById('imageForm');
const imageUrl = document.getElementById('imageUrl');
const imageTitle = document.getElementById('imageTitle');
const gallery = document.getElementById('gallery');
const formError = document.getElementById('formError');
const searchInput = document.getElementById('searchInput');

// Validate URL format
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

// Add image to gallery
function addImage(title, url) {
  const item = document.createElement('div');
  item.classList.add('gallery-item');
  item.innerHTML = `
    <button class="delete-btn">×</button>
    <img src="${url}" alt="${title}">
    <h3>${title}</h3>
  `;
  gallery.appendChild(item);

  // Delete functionality
  item.querySelector('.delete-btn').addEventListener('click', () => {
    item.remove();
  });
}

// Handle image form submission
imageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = imageTitle.value.trim();
  const url = imageUrl.value.trim();

  if (!title || !url) {
    formError.textContent = 'All fields are required.';
    return;
  }

  if (!isValidUrl(url)) {
    formError.textContent = 'Please enter a valid image URL.';
    return;
  }

  addImage(title, url);
  imageForm.reset();
  formError.textContent = '';
});

// Filter images by title
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  document.querySelectorAll('.gallery-item').forEach(item => {
    const title = item.querySelector('h3').textContent.toLowerCase();
    item.style.display = title.includes(filter) ? '' : 'none';
  });
});

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactForm.reset();
  contactMessage.textContent = 'Thank you! Your message has been sent.';
  setTimeout(() => contactMessage.textContent = '', 5000);
});
