// CopyRight Years Change
document.getElementById('sf-copyright-year').textContent = new Date().getFullYear();




const logoSwiper = new Swiper('.logo-swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    speed: 600,
    pagination: {
      el: '.logo-swiper .swiper-pagination',
      clickable: true
    }
});



// navbar background solidifies on scroll
const sfNav = document.getElementById('sfNavbar');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 30){ sfNav.classList.add('scrolled'); }
    else{ sfNav.classList.remove('scrolled'); }
});

/*

(function(){
  const root = document.getElementById('bannerRoot');
  const canvas = document.getElementById('trace');
  const ctx = canvas.getContext('2d');
  let w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize(){
    w = root.clientWidth; h = root.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w+'px'; canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize();
  window.addEventListener('resize', resize);

  const MAX_NODES = 26;
  const LINK_DIST = 140;
  let nodes = [];
  let mouse = {x: w*0.7, y: h*0.4, active:false};

  function addNode(x,y){
    nodes.push({
      x, y,
      born: performance.now(),
      life: 1400 + Math.random()*500,
      r: 2 + Math.random()*2
    });
    if(nodes.length > MAX_NODES) nodes.shift();
  }

  let lastAdd = 0;
  root.addEventListener('mousemove', (e)=>{
    const rect = root.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
    const now = performance.now();
    if(now - lastAdd > 45){
      addNode(mouse.x, mouse.y);
      lastAdd = now;
    }
  });
  root.addEventListener('mouseleave', ()=>{ mouse.active = false; });

  // ambient idle drifting node for when mouse hasn't moved yet
  let idleAngle = 0;

  function draw(now){
    ctx.clearRect(0,0,w,h);

    // prune dead nodes
    nodes = nodes.filter(n => now - n.born < n.life);

    if(!mouse.active){
      idleAngle += 0.004;
      mouse.x = w*0.72 + Math.cos(idleAngle)*70;
      mouse.y = h*0.38 + Math.sin(idleAngle*1.3)*50;
      if(now - lastAdd > 90){ addNode(mouse.x, mouse.y); lastAdd = now; }
    }

    // links
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < LINK_DIST){
          const ageA = 1 - (now-a.born)/a.life;
          const ageB = 1 - (now-b.born)/b.life;
          const alpha = Math.max(0, Math.min(ageA, ageB)) * (1 - dist/LINK_DIST) * 0.55;
          if(alpha > 0.02){
            ctx.strokeStyle = `rgba(127,224,176,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.stroke();
          }
        }
      }
    }

    // nodes
    nodes.forEach(n=>{
      const age = 1 - (now-n.born)/n.life;
      if(age <= 0) return;
      const r = n.r * (0.6 + age*0.8);
      const grad = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*5);
      grad.addColorStop(0, `rgba(127,224,176,${0.9*age})`);
      grad.addColorStop(1, `rgba(127,224,176,0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x,n.y,r*5,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle = `rgba(238,244,240,${age})`;
      ctx.beginPath();
      ctx.arc(n.x,n.y,r,0,Math.PI*2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

*/

window.addEventListener('load', () => {
    const inner = document.getElementById('scroll-content');
    const innerWidth = inner.scrollWidth / 2; // Half because it's duplicated
    const speed = 95; // pixels per second (you can adjust this)

    // Calculate the animation duration based on content width
    const duration = innerWidth / speed;

    inner.style.animationDuration = `${duration}s`;
    inner.style.animationName = 'scroll';
});



document.addEventListener('DOMContentLoaded', function () {
  const vendorTrack = document.querySelector('.sf-vendor-marquee-track');
  if (vendorTrack) {
    vendorTrack.innerHTML += vendorTrack.innerHTML;
  }
});

// asset/img/Our-Team/sunflexxbitdefender.jpg


// ===== SunFlex Scroll Card Stack =====
// Paths are relative to index.html (not to this file's location in asset/js/),
// same as every other asset path in the page.

/*
(function () {
  const cards = [
    { src: "asset/img/Our-Team/sunflexxbitdefender.jpg", eyebrow: "SunFlex | Bidefender", label: "EDR/XDR & MDR" },
    { src: "asset/img/Our-Team/SunFlexXBitdefender3.jpg", eyebrow: "SunFlex | Bidefender", label: "EDR/XDR & MDR" },
    { src: "asset/img/Our-Team/SunFlexXFortinet.jpg",      eyebrow: "SunFlex | Fortinet",         label: "Network Security" },
    { src: "asset/img/Our-Team/SunflexXoracle1.jpg",      eyebrow: "SunFlex | Oracle",    label: "Enterprise AI" },
    { src: "asset/img/Our-Team/SunFlexXOracle2.jpg",   eyebrow: "SunFlex | Oracle",    label: "Enterprise AI" },
    { src: "asset/img/Our-Team/SunFlexXIBM.jpg",     eyebrow: "SunFlex | IBM",           label: "Cyber Threats" },
    { src: "asset/img/Our-Team/SunFlexXIBM2.jpg",      eyebrow: "SunFlex | IBM",           label: "Cyber Threats" },
    { src: "asset/img/Our-Team/SunFlexXMysql.jpg",      eyebrow: "SunFlex | MySQL",   label: "Database" },
  ];

  const stack = document.getElementById('stack');
  const sticky = document.querySelector('.sfcard-sticky');
  const section = document.getElementById('stackSection');
  if (!stack || !sticky || !section) return; // section not on this page

  const total = cards.length;

   //<div class="sfcard-index">${num}</div>   // put under image-wrap  :  number on picture
  cards.forEach((c, i) => {
    const num = String(i + 1).padStart(2, '0');
    const div = document.createElement('div');
    div.className = 'sfcard-card';
    div.innerHTML = `
      <div class="sfcard-image-wrap">
        
        <img src="${c.src}" alt="${c.label}">
      </div>
      <div class="sfcard-caption">
        <p class="sfcard-eyebrow-cat">${c.eyebrow}</p>
        <p class="sfcard-label">${c.label}</p>
        <div class="sfcard-footer-row">
          <div class="sfcard-progress-rail" data-rail></div>
          <div class="sfcard-counter"><b>${num}</b> / ${String(total).padStart(2, '0')}</div>
        </div>
      </div>
    `;
    stack.appendChild(div);
  });

  const cardEls = stack.querySelectorAll('.sfcard-card');
  const railEls = stack.querySelectorAll('[data-rail]');

  railEls.forEach((rail) => {
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.className = 'sfcard-dot';
      rail.appendChild(dot);
    }
  });

  // Height of the fixed/sticky navbar, so the pinned card doesn't sit under it.
  function getNavbarOffset() {
    const nav = document.getElementById('sfNavbar');
    if (!nav) return 0;
    const pos = getComputedStyle(nav).position;
    return (pos === 'fixed' || pos === 'sticky') ? nav.offsetHeight : 0;
  }

  // Manually pin the card stack instead of relying on position: sticky,
  // which silently fails if any ancestor on the page has overflow or a
  // transform set on it. This works the same as sticky but is driven
  // entirely by JS, so it isn't affected by that.
  function updatePin() {
    const navH = getNavbarOffset();
    const rect = section.getBoundingClientRect();
    const viewportH = window.innerHeight;

    if (rect.top <= navH && rect.bottom >= viewportH) {
      sticky.style.position = 'fixed';
      sticky.style.top = navH + 'px';
      sticky.style.bottom = '';
    } else if (rect.bottom < viewportH) {
      sticky.style.position = 'absolute';
      sticky.style.top = (section.offsetHeight - viewportH) + 'px';
      sticky.style.bottom = '';
    } else {
      sticky.style.position = 'absolute';
      sticky.style.top = '0';
      sticky.style.bottom = '';
    }
  }

  function update() {
    updatePin();

    const rect = section.getBoundingClientRect();
    const scrolled = -rect.top;
    const sectionHeight = section.offsetHeight - window.innerHeight;
    let progress = sectionHeight > 0 ? scrolled / sectionHeight : 0;
    progress = Math.min(1, Math.max(0, progress));

    const activeIndex = Math.round(progress * (total - 1));

    cardEls.forEach((card, i) => {
      let transform, opacity, z;

      if (i > activeIndex) {
        // not reached yet — fully hidden, not faded, not peeking
        transform = 'translate(0px, 0px)';
        opacity = 0;
        z = 0;
      } else {
        // already-viewed cards fan out behind the current one, each one
        // solid (opacity 1) and offset diagonally, never blended with
        // anything else, so there is nothing for text to bleed through
        const depth = activeIndex - i;
        transform = `translate(${depth * 7}px, ${depth * 9}px)`;
        opacity = 1;
        z = 100 - depth;
      }

      card.style.transform = transform;
      card.style.opacity = opacity;
      card.style.zIndex = z;
      card.style.pointerEvents = (i === activeIndex) ? 'auto' : 'none';

      const dots = card.querySelectorAll('.sfcard-dot');
      dots.forEach((dot, di) => dot.classList.toggle('active', di === activeIndex));
    });
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

*/






// ========== FQA ===============
document.addEventListener('DOMContentLoaded', function () {
  var fab = document.getElementById('sfFaqFab');
  var overlay = document.getElementById('sfFaqOverlay');
  var closeBtn = document.getElementById('sfFaqClose');

  function openFaq(){ overlay.classList.add('sf-faq-open'); }
  function closeFaq(){ overlay.classList.remove('sf-faq-open'); }

  fab.addEventListener('click', openFaq);
  closeBtn.addEventListener('click', closeFaq);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeFaq();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeFaq();
  });

  document.querySelectorAll('.sf-faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.sf-faq-item');
      var answer = item.querySelector('.sf-faq-a');
      var isActive = item.classList.contains('sf-faq-active');

      document.querySelectorAll('.sf-faq-item').forEach(function (i) {
        i.classList.remove('sf-faq-active');
        i.querySelector('.sf-faq-a').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('sf-faq-active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});






// ===== Show Pic =====
(function () {
  // Same data shape as your existing sfcard-stack.js — swap these src paths
  // back to your real asset/img/Our-Team/... files when you wire this in.
  const cards = [
    { src: "asset/img/Our-Team/sunflexxbitdefender.jpg", eyebrow: "SunFlex | Bidefender", label: "EDR/XDR & MDR" },
    { src: "asset/img/Our-Team/SunFlexXBitdefender3.jpg", eyebrow: "SunFlex | Bidefender", label: "EDR/XDR & MDR" },
    { src: "asset/img/Our-Team/SunFlexXFortinet.jpg",      eyebrow: "SunFlex | Fortinet",         label: "Network Security" },
    { src: "asset/img/Our-Team/SunflexXoracle1.jpg",      eyebrow: "SunFlex | Oracle",    label: "Enterprise AI" },
    { src: "asset/img/Our-Team/SunFlexXOracle2.jpg",   eyebrow: "SunFlex | Oracle",    label: "Enterprise AI" },
    { src: "asset/img/Our-Team/SunFlexXIBM.jpg",     eyebrow: "SunFlex | IBM",           label: "Cyber Threats" },
    { src: "asset/img/Our-Team/SunFlexXIBM2.jpg",      eyebrow: "SunFlex | IBM",           label: "Cyber Threats" },
    { src: "asset/img/Our-Team/SunFlexXMysql.jpg",      eyebrow: "SunFlex | MySQL",   label: "Database" },
  ];
 
  const stage = document.getElementById('sfxFanStage');
  const total = cards.length;
  let active = Math.floor(total / 2);
 
  cards.forEach((c, i) => {
    const el = document.createElement('div');
    el.className = 'sfx-fan-card';
    el.dataset.index = i;
    el.innerHTML = `
      <img src="${c.src}" alt="${c.label}">
      <div class="sfx-fan-caption">
        <div class="eyebrow">${c.eyebrow}</div>
        <div class="label">${c.label}</div>
      </div>
    `;
    el.addEventListener('click', () => setActive(i));
    stage.appendChild(el);
  });
 
  const cardEls = stage.querySelectorAll('.sfx-fan-card');
 
  function setActive(index) {
    active = index;
    cardEls.forEach((el, i) => {
      const offset = i - active;
      el.className = 'sfx-fan-card'; // reset
      if (offset === 0) el.classList.add('is-active');
      else if (offset === 1) el.classList.add('is-offset-1');
      else if (offset === -1) el.classList.add('is-offset--1');
      else if (offset === 2) el.classList.add('is-offset-2');
      else if (offset === -2) el.classList.add('is-offset--2');
      else el.classList.add('is-hidden');
    });
    document.getElementById('sfxFanCurrent').textContent = String(active + 1).padStart(2, '0');
  }
 
  document.getElementById('sfxFanPrev').addEventListener('click', () => {
    setActive((active - 1 + total) % total);
  });
  document.getElementById('sfxFanNext').addEventListener('click', () => {
    setActive((active + 1) % total);
  });
  document.getElementById('sfxFanTotal').textContent = String(total).padStart(2, '0');
 
  setActive(active);
})();

