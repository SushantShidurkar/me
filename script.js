// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });
}

// Interactive chips from your skills
const skills = [
  'Java', 'Spring Boot', 'Microservices', 'REST APIs', 'Vue.js', 'Angular', 'TypeScript',
  'HTML', 'CSS', 'Azure', 'Azure DevOps', 'Jenkins', 'PostgreSQL', 'Oracle', 'MongoDB',
  'JUnit', 'Mockito', 'Cucumber', 'GA4'
];
const chipsEl = document.getElementById('skills-chips');
skills.forEach(s => {
  const span = document.createElement('span');
  span.className = 'chip';
  span.textContent = s;
  span.title = s;
  chipsEl.appendChild(span);
});

// Feature projects (sample placeholders you can replace with real repos)
const projects = [
  {
    title: 'Consumer Credits Portal',
    desc: 'Modular frontend + Spring Boot services for Loans, Limits, Compensation in banking.',
    tech: ['Vue', 'Java', 'Spring Boot', 'Azure'],
    link: '#',
    repo: '#',
    badge: 'BANKING'
  },
  {
    title: 'CI/CD Modernization',
    desc: 'Migrated pipelines from Jenkins to Azure DevOps with gated releases and QA automation.',
    tech: ['Azure DevOps', 'Docker', 'JUnit'],
    link: '#',
    repo: '#',
    badge: 'DEVOPS'
  },
  {
    title: 'Analytics Insights',
    desc: 'GA4 instrumentation for customer journey tracking and product analytics dashboards.',
    tech: ['GA4', 'TypeScript'],
    link: '#',
    repo: '#',
    badge: 'ANALYTICS'
  }
];

const projectsEl = document.getElementById('project-cards');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card project';
  card.innerHTML = `
    <div class="card__thumb">${p.badge}</div>
    <h3>${p.title}</h3>
    <p class="card__meta">${p.desc}</p>
    <div class="tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
    <div class="card__actions">
      <a class="btn btn--ghost" href="${p.repo}" target="_blank" rel="noopener">Code</a>
      <a class="btn" href="${p.link}" target="_blank" rel="noopener">Live</a>
    </div>
  `;
  projectsEl.appendChild(card);
});

// Smooth anchor scrolling (native behavior is fine; optional polyfill)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior:'smooth', block:'start' });
      // Close mobile menu after click
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
