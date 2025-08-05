const themeToggle = document.getElementById('theme-toggle');
let isDark = false;
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  isDark = !isDark;
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});
