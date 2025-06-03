const products = [
  { id: 1, name: 'Product 1', price: 199, image: 'assets/1.jpeg' },
  { id: 2, name: 'Product 2', price: 99, image: 'assets/1.jpeg' },
  { id: 3, name: 'Product 3', price: 149, image: 'assets/1.jpeg' },
  { id: 4, name: 'Product 4', price: 59, image: 'assets/1.jpeg' },
  { id: 5, name: 'Product 5', price: 79, image: 'assets/1.jpeg' },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  let filtered = [...products];

  const search = document.getElementById("search").value.toLowerCase();
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }

  const sort = document.getElementById("sort").value;
  if (sort === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (sort === "priceHigh") filtered.sort((a, b) => b.price - a.price);

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" loading="lazy">
      <h3>${p.name}</h3>
      <p>Price: ₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  items.innerHTML = "";
  let price = 0;

  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.innerHTML = `${item.name} - ₹${item.price} 
      <button onclick="removeFromCart(${i})">Remove</button>`;
    items.appendChild(div);
    price += item.price;
  });

  total.textContent = `Total: ₹${price}`;
}

// Theme toggle
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
});

// Initialize
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
  }
  renderProducts();
  renderCart();
};

document.getElementById("search").addEventListener("input", renderProducts);
document.getElementById("sort").addEventListener("change", renderProducts);
