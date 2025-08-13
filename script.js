// Parallax on mouse move
const layer = document.querySelector('.layer');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  layer.style.transform = `translate(${x}px, ${y}px)`;
});

// Animate skill progress bars on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll('[data-progress]').forEach(el=>{
        el.style.width = el.getAttribute('data-progress') + '%';
      });
      entry.target.querySelectorAll('[data-stars]').forEach(el=>{
        const n = +el.getAttribute('data-stars');
        Array.from(el.children).forEach((i,idx)=>{
          if(idx < n) i.classList.add('on');
        });
      });
      io.unobserve(entry.target);
    }
  });
},{threshold:.35});
document.querySelectorAll('.skill-card').forEach(el=>io.observe(el));

// Scroll progress footer
const bar = document.querySelector('.progress-footer .bar > span');
function updateProgress(){
  const h = document.documentElement;
  const p = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  bar.style.width = p + '%';
}
document.addEventListener('scroll', updateProgress);
updateProgress();

// Contact form handler
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (!form.getAttribute('action') || form.getAttribute('action') === '#') {
      window.location.href = `mailto:sushantshidurkar@gmail.com?subject=${encodeURIComponent('Portfolio Contact: ' + data.name)}&body=${encodeURIComponent(data.message + "\\n\\nFrom: " + data.name + " (" + data.email + ")")}`;
      return;
    }
    try {
      const res = await fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (res.ok) {
        alert('Thanks! Your message has been sent.');
        form.reset();
      } else {
        alert('There was a problem sending your message.');
      }
    } catch {
      alert('Network error. Please try again.');
    }
  });
}
