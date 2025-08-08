// Set dynamic current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle logic
const navToggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('show');
});

// Smooth scrolling to anchor links and close mobile menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if(targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if(menu.classList.contains('show')){
        menu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', "false");
      }
    }
  });
});

// Skills data with competency (percentage 0-100)
const skills = [
  { name: 'Java', competency: 90 },
  { name: 'Spring Boot', competency: 85 },
  { name: 'Microservices', competency: 85 },
  { name: 'REST APIs', competency: 80 },
  { name: 'Vue.js', competency: 88 },
  { name: 'Angular', competency: 75 },
  { name: 'TypeScript', competency: 80 },
  { name: 'HTML', competency: 90 },
  { name: 'CSS', competency: 85 },
  { name: 'Azure', competency: 70 },
  { name: 'Azure DevOps', competency: 75 },
  { name: 'Jenkins', competency: 70 },
  { name: 'PostgreSQL', competency: 75 },
  { name: 'Oracle', competency: 70 },
  { name: 'MongoDB', competency: 70 },
  { name: 'JUnit', competency: 80 },
  { name: 'Mockito', competency: 75 },
  { name: 'Cucumber', competency: 65 },
  { name: 'GA4', competency: 60 }
];

// Render skill cards with animated competency bars
const skillsGrid = document.getElementById('skills-grid');

skills.forEach(skill => {
  const card = document.createElement('div');
  card.className = 'skill-card';

  const name = document.createElement('p');
  name.className = 'skill-name';
  name.textContent = skill.name;

  const footer = document.createElement('div');
  footer.className = 'skill-footer';

  const bar = document.createElement('div');
  bar.className = 'skill-bar';

  footer.appendChild(bar);
  card.appendChild(name);
  card.appendChild(footer);
  skillsGrid.appendChild(card);

  // Animate the competency bar fill after a short delay
  setTimeout(() => {
    bar.style.width = skill.competency + '%';
  }, 200);
});

// Projects data
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

// Render projects
const projectsGrid = document.getElementById('projects-grid');

projects.forEach(project => {
  const card = document.createElement('div');
  card.className = 'project-card';

  card.innerHTML = `
    <p class="project-badge">${project.badge}</p>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-desc">${project.desc}</p>
    <div class="tags-small">
      ${project.tech.map(t => `<span>${t}</span>`).join('')}
    </div>
    <div class="project-links">
      <a href="${project.repo}" target="_blank" rel="noopener">Code</a>
      <a href="${project.link}" target="_blank" rel="noopener">Live</a>
    </div>
  `;
  projectsGrid.appendChild(card);
});
