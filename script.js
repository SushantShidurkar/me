// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle mobile nav
const navToggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('show');
});

// Scroll and close menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.getElementById(anchor.getAttribute('href').substring(1));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Skill cards
const skills = [
  { name: 'Java', competency: 90 },
  { name: 'Spring Boot', competency: 85 },
  { name: 'Vue.js', competency: 88 },
  { name: 'Angular', competency: 75 },
  { name: 'TypeScript', competency: 80 },
  { name: 'Azure', competency: 70 },
  { name: 'Azure DevOps', competency: 75 },
  { name: 'HTML', competency: 90 },
  { name: 'CSS', competency: 85 },
  { name: 'PostgreSQL', competency: 80 },
  { name: 'JUnit', competency: 80 },
  { name: 'GA4', competency: 60 }
];

const skillsGrid = document.getElementById('skills-grid');
skills.forEach(skill => {
  const card = document.createElement('div');
  card.className = 'skill-card';
  card.innerHTML = `
    <p class="skill-name">${skill.name}</p>
    <div class="skill-footer">
      <div class="skill-bar" style="--skill-width:${skill.competency}%"></div>
    </div>`;
  skillsGrid.appendChild(card);
});

// Animate bars
setTimeout(() => {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    bar.style.width = getComputedStyle(bar).getPropertyValue('--skill-width');
  });
}, 300);

// Projects
const projects = [
  {
    title: 'Consumer Credits Portal',
    desc: 'Front-end + services for loan and credit flows',
    tech: ['Vue', 'Spring Boot', 'Azure'],
    badge: 'Banking',
    link: '#',
    repo: '#'
  },
  {
    title: 'CI/CD Modernization',
    desc: 'Migrated pipelines from Jenkins → Azure DevOps',
    tech: ['Azure DevOps', 'PostgreSQL', 'JUnit'],
    badge: 'DevOps',
    link: '#',
    repo: '#'
  }
];

const projectsGrid = document.getElementById('projects-grid');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <p class="project-badge">${p.badge}</p>
    <h3 class="project-title">${p.title}</h3>
    <p class="project-desc">${p.desc}</p>
    <div class="tags-small">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
    <div class="project-links">
      <a href="${p.repo}" target="_blank">Code</a>
      <a href="${p.link}" target="_blank">Live</a>
    </div>`;
  projectsGrid.appendChild(card);
});

// Dark mode toggle
const toggleBtn = document.getElementById('darkModeToggle');
function setDark(enabled) {
  document.body.classList.toggle('dark-mode', enabled);
  toggleBtn.textContent = enabled ? '☀️' : '🌙';
  localStorage.setItem('darkMode', enabled ? 'true' : 'false');
}

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const storedDark = localStorage.getItem('darkMode');
setDark(storedDark === 'true' || (!storedDark && prefersDark));
toggleBtn?.addEventListener('click', () => setDark(!document.body.classList.contains('dark-mode')));
