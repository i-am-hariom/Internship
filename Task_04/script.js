// To-Do App
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
    };
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
  }
}

if (taskList) loadTasks();

// Product Listing
const products = [
  { name: 'Sneakers', price: 50, rating: 4.5 },
  { name: 'Backpack', price: 30, rating: 4.0 },
  { name: 'Smartwatch', price: 120, rating: 4.8 },
  { name: 'Bluetooth Headphones', price: 80, rating: 4.3 },
];

const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');

function displayProducts(list) {
  if (!productList) return;
  productList.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${p.name}</h3><p>Price: $${p.price}</p><p>Rating: ${p.rating}</p>`;
    productList.appendChild(div);
  });
}

function sortProducts() {
  const criteria = document.getElementById('sortSelect').value;
  const filtered = [...products].sort((a, b) => a[criteria] - b[criteria]);
  displayProducts(filtered);
}

if (productList) {
  searchInput.addEventListener('input', () => {
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchInput.value.toLowerCase()));
    displayProducts(filtered);
  });
  displayProducts(products);
}

// Theme toggle logic (already included)
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const icon = document.querySelector(".theme-toggle");
  icon.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector(".theme-toggle").textContent = "☀️";
  }
});
