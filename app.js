document.addEventListener('DOMContentLoaded', function () {

  // Carusel
  let cur = 0; const s = document.querySelectorAll('.slide');
  setInterval(() => { s[cur].classList.remove('active'); cur = (cur + 1) % s.length; s[cur].classList.add('active'); }, 4000);

  // Scroll
  const obs = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('active')), { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

  const counters = document.querySelectorAll('.counter');
  const speed = 100; // Cu cât e mai mic numărul, cu atât e mai rapidă animația

  const startCounters = () => {
    counters.forEach(counter => {
      const animate = () => {
        const value = +counter.getAttribute('data-target');
        const data = +counter.innerText;
        const time = value / speed;

        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 20);
        } else {
          counter.innerText = value.toLocaleString(); // Adaugă separator de mii (ex: 10.000)
        }
      };
      animate();
    });
  };

  // Declanșăm numărătoarea doar când secțiunea este vizibilă
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounters();
      counterObserver.disconnect(); // Se rulează o singură dată
    }
  }, { threshold: 0.5 });

  counterObserver.observe(document.querySelector('#rezultate'));
  // Joc
  const shapes = [
    { id: 'semicerc', svg: '<path d="M 5,40 A 25,25 0 0,1 55,40 Z" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' }, { id: 'triunghi', svg: '<polygon points="30,5 55,55 5,55" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' },
    { id: 'patrat', svg: '<rect width="50" height="50" x="5" y="5" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' }, { id: 'hexagon', svg: '<polygon points="30,5 55,20 55,45 30,59 5,45 5,20" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' },
    { id: 'paralel', svg: '<polygon points="20,5 65,5 50,45 5,45" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' }, { id: 'dreptunghi', svg: '<rect width="60" height="40" x="5" y="5" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' },
    { id: 'cerc', svg: '<circle cx="30" cy="30" r="25" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' }, { id: 'trapez', svg: '<polygon points="15,5 45,5 55,45 5,45" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' },
    { id: 'oval', svg: '<ellipse cx="35" cy="25" rx="30" ry="15" stroke="#98FB98" stroke-width="4" fill="#FFB6C1"/>' }
  ];
  let done = 0;
  function init() {
    const b = document.getElementById('box-piese'); b.innerHTML = '';
    shapes.forEach(sh => {
      let d = document.createElement('div'); d.className = 'piesa-drag'; d.draggable = true; d.id = 'd-' + sh.id;
      d.innerHTML = `<svg width="70" height="60">${sh.svg}</svg>`;
      d.addEventListener('dragstart', e => e.dataTransfer.setData('text', sh.id));
      b.appendChild(d);
    });
  }
  function resetGame() { done = 0; document.getElementById('replay-btn').style.display = 'none'; document.querySelectorAll('.drop-zone').forEach(z => z.style.background = '#000'); init(); }
  document.querySelectorAll('.drop-zone').forEach(z => {
    z.addEventListener('dragover', e => e.preventDefault());
    z.addEventListener('drop', e => {
      e.preventDefault(); const id = e.dataTransfer.getData('text');
      if (id === z.dataset.shape && z.style.background !== 'var(--roz-pal)') {
        z.style.background = 'var(--verde-pal)'; document.getElementById('d-' + id).style.visibility = 'hidden';
        done++; let sm = document.createElement('div'); sm.className = 'smile-feedback'; sm.innerText = '😊';
        z.appendChild(sm); setTimeout(() => sm.remove(), 1000);
        if (done === 9) document.getElementById('replay-btn').style.display = 'block';
      }
    });
  });
  init();


});