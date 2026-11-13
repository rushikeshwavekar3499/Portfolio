/* global Lenis, PROFILE, PROJECTS, EXPERIENCE, EDUCATION, TOOLS, COMPETENCIES, EXTRAS, FREELANCE, SIZES, IMG, projectImages */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const page = document.body.dataset.page;
  const isMobile = () => innerWidth < 768;
  const remPx = () => innerWidth / (isMobile() ? 390 : 1440);
  const pad2 = (n) => String(n).padStart(2, '0');
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
    sget(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };

  /* ---------- small template helpers ---------- */
  const lines = (arr) => arr.map((t) => `<span class="line"><span>${t}</span></span>`).join('');
  const ar = (n) => (SIZES[n] ? (SIZES[n][0] / SIZES[n][1]).toFixed(3) : 1.4);
  const media = (n, { drawing = false, alt = '', ratio, eager = false, cls = '' } = {}) =>
    `<div class="media ${drawing ? 'drawing' : ''} ${cls}" style="--ar:${ratio || ar(n)};aspect-ratio:${ratio || ar(n)}"><img src="${IMG(n)}" alt="${alt}" ${eager ? '' : 'loading="lazy"'} decoding="async"></div>`;
  const projectUrl = (p) => `project.html?p=${p.slug}`;
  const arrow = '<svg viewBox="0 0 12 12" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M2 10 10 2M4 2h6v6"/></svg>';

  /* ---------- header / footer ---------- */
  function header() {
    const links = [['index.html', 'Index', 'home'], ['work.html', 'Work', 'work'], ['about.html', 'About', 'about'], ['index.html#contact', 'Contact', 'contact']];
    const active = page === 'project' ? 'work' : page;
    const h = document.createElement('header');
    h.className = 'header';
    h.innerHTML = `<a class="logo" href="index.html" aria-label="Home"><span>${PROFILE.first} ${PROFILE.last}</span> <span class="logo__role">Architect</span></a>
      <div class="header__right">
        <nav class="nav">${links.map(([href, label, key], i) => `<a class="u ${key === active ? 'is-active' : ''}" href="${href}" data-nav="${key}">${label}</a>${i < links.length - 1 ? '<span class="sep">,</span>' : ''}`).join('')}</nav>
        <button class="theme-toggle" type="button"><span class="theme-toggle__icon" aria-hidden="true"></span><span class="theme-toggle__label"></span></button>
      </div>`;
    document.body.prepend(h);
    themeToggle($('.theme-toggle', h));
  }

  /* light / dark mode — initial theme is set by a tiny script in <head> to avoid a flash */
  function themeToggle(btn) {
    const root = document.documentElement;
    const current = () => (root.dataset.theme === 'dark' ? 'dark' : 'light');
    const sync = () => {
      const next = current() === 'dark' ? 'Light' : 'Dark';
      $('.theme-toggle__label', btn).textContent = next;
      btn.setAttribute('aria-label', `Switch to ${next.toLowerCase()} mode`);
      btn.setAttribute('aria-pressed', String(current() === 'dark'));
    };
    const apply = (t) => { root.dataset.theme = t; sync(); fitFooter(); };
    btn.addEventListener('click', (e) => {
      const next = current() === 'dark' ? 'light' : 'dark';
      store.set('rw-theme', next);
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!document.startViewTransition || reduced) {
        root.classList.add('theme-fade');
        apply(next);
        setTimeout(() => root.classList.remove('theme-fade'), 500);
        return;
      }
      // circular reveal growing from the button
      const r = btn.getBoundingClientRect();
      const x = e.clientX || r.left + r.width / 2, y = e.clientY || r.top + r.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      const vt = document.startViewTransition(() => apply(next));
      vt.ready.then(() => root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.76, 0, .24, 1)', pseudoElement: '::view-transition-new(root)' },
      )).catch(() => {});
    });
    // follow the system setting until the visitor picks one
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!store.get('rw-theme')) apply(e.matches ? 'dark' : 'light');
    });
    sync();
  }

  function footer() {
    const f = document.createElement('footer');
    f.className = 'footer';
    f.id = 'contact';
    f.innerHTML = `
      <div class="grid">
        <div class="footer__logo">${PROFILE.first} ${PROFILE.last} <span class="logo__role">Architect</span></div>
        <div class="footer__h">Navigation</div>
        <div class="footer__c"><a href="index.html">Index</a><a href="work.html">Work</a><a href="about.html">About</a><a href="#contact" data-scroll-top="0">Contact</a></div>
        <div class="footer__h">Media</div>
        <div class="footer__c"><a href="${PROFILE.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a href="mailto:${PROFILE.email}">Email</a>${PROFILE.phones.map((p) => `<a href="tel:${p.link}">Phone (${p.label})</a>`).join('')}</div>
        <div class="footer__h">Based</div>
        <div class="footer__c"><span>Business Bay</span><span>Dubai</span><span>UAE</span></div>
        <div class="footer__cta">
          <a class="footer__hello" href="mailto:${PROFILE.email}">Let’s build<br><em>something.</em></a>
          <div class="contact">
            ${PROFILE.phones.map((p) => `<a class="contact__item" href="tel:${p.link}"><small>Phone · ${p.label}</small><span>${p.display}</span></a>`).join('')}
            <a class="contact__item" href="mailto:${PROFILE.email}"><small>Email</small><span>${PROFILE.email}</span></a>
          </div>
        </div>
      </div>
      <div class="footer__big" aria-hidden="true"><span>${PROFILE.last.toUpperCase()}</span></div>
      <div class="footer__bottom">
        <span>All rights reserved</span><span>${PROFILE.title}</span><span>${PROFILE.location}</span>
        <span>“${PROFILE.quote[0]}” — ${PROFILE.quote[1]}</span><span>© ${new Date().getFullYear()}</span>
      </div>`;
    document.body.append(f);
    fitFooter();
  }
  function fitFooter() {
    const big = $('.footer__big');
    if (!big) return;
    // size the word so it runs from the left margin to just past the right edge of the screen
    const span = big.firstElementChild;
    const overshoot = document.documentElement.clientWidth * 0.004; // the "R" slips ~0.4% past the edge
    big.style.fontSize = '100px';
    // measure where the last letter's ink ends (not its text box) at 100px, then scale linearly
    const text = span.firstChild;
    const range = document.createRange();
    range.setStart(text, text.length - 1); range.setEnd(text, text.length);
    const left = span.getBoundingClientRect().left;
    const lastLeft = range.getBoundingClientRect().left - left;
    const cs = getComputedStyle(big);
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
    const ink = lastLeft + ctx.measureText(text.data.slice(-1)).actualBoundingBoxRight;
    const target = document.documentElement.clientWidth + overshoot - left;
    big.style.fontSize = `${(100 * target) / ink}px`;
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitFooter());

  /* ---------- HOME ---------- */
  function renderHome() {
    const main = $('main');
    const featured = PROJECTS.slice(0, 8);
    main.innerHTML = `
    <section class="hero">
      <div class="hero__img"><img src="${IMG('bhaktiyog-2')}" alt="Bhaktiyog towers at night, Borivali, Mumbai" id="heroImg"></div>
      <div class="hero__bar"></div>
      <div class="hero__tag">${PROFILE.disciplines.map((d) => `<span>${d}</span>`).join('<i>|</i>')}</div>
      <h1 class="hero__title is-in-on-ready">${lines([PROFILE.first, PROFILE.last])}</h1>
      <div class="hero__side">
        <p>Residential, hospitality and commercial work — high-rise elevations, interiors and on-site execution.</p>
        <p>Concept, elevation and planning, working drawings, site coordination, project management.</p>
      </div>
    </section>

    <section class="intro grid">
      <dl class="facts" data-reveal>
        <dt>Based</dt><dd>Business Bay, Dubai</dd>
        <dt>Practice</dt><dd>Since ${PROFILE.since}</dd>
        <dt>Currently</dt><dd>Architect,<br>${PROFILE.current}</dd>
        <dt>Focus</dt><dd>${PROFILE.sectors.join(', ')}</dd>
      </dl>
      <p class="intro__text serif" data-reveal>${PROFILE.statement}<span class="accent-rule"></span></p>
    </section>

    <section class="cols grid">
      <div class="cols__label" data-reveal>Profile</div>
      <div class="cols__col" data-reveal><h4>Expertise</h4><ul><li>Residential architecture</li><li>Commercial interior</li><li>Project management</li><li>Hospitality interior</li></ul></div>
      <div class="cols__col" data-reveal><h4>Achievements</h4><ul>${EXTRAS.Achievements.map((a) => `<li>${a}</li>`).join('')}</ul></div>
      <div class="cols__col" data-reveal><h4>Involvement</h4><ul>${EXTRAS.Involvement.map((a) => `<li>${a}</li>`).join('')}</ul></div>
      <div class="cols__col" data-reveal><h4>Freelance</h4><ul>${FREELANCE.slice(0, 2).map((a) => `<li><b>${a.title}</b>${a.note}</li>`).join('')}</ul></div>
    </section>

    <h2 class="statement serif" data-lines>${lines(['Architectural design,', 'project coordination,', 'interior design, working', 'drawings, site execution.'])}</h2>
    ${tableHtml('Experience', EXPERIENCE.map((e) => ({ a: e.company, b: e.role, c: e.period, more: e.points })))}
    ${tableHtml('Education', EDUCATION.map((e) => ({ a: e.title, b: e.school, c: e.period })))}

    <section class="process grid">
      <h2 class="process__title" data-lines>${lines(['From Drawing', 'to Site'])}<small>Every line on paper is tested on site — in the details, the coordination, the craft.</small></h2>
      <div class="process__media" data-speed="-0.06">${media('cover', { ratio: 0.72, alt: 'Portfolio cover artwork' })}</div>
      <div class="process__text" data-reveal>
        <h3>Design to Delivery</h3>
        <p>Having worked as architect and as project manager, I bring design intent and site reality to the same table — resolving MEP clashes, fabrication details and timelines without losing the idea.</p>
      </div>
      <ol class="process__steps">
        <li data-reveal><span>01</span><p>Concept, elevation and planning studies — massing, façades, podium and amenity layouts.</p></li>
        <li data-reveal style="--i:1"><span>02</span><p>Working and GFC drawings, sections and joinery details; compliance with UDCPR & DCPR.</p></li>
        <li data-reveal style="--i:2"><span>03</span><p>Site execution — coordination with consultants, contractors and vendors to deliver on time.</p></li>
      </ol>
    </section>

    <h2 class="projects-head" data-lines><span class="bar"></span>${lines(['Selected', `Projects<sup>(${PROJECTS.length})</sup>`])}</h2>
    <section class="stagger-grid">${featured.map((p, i) => cardHtml(p, i)).join('')}</section>
    <div class="see-all"><a class="btn" href="work.html">See all work ${arrow}</a></div>

    <section class="radial" id="tools">
      <div class="radial__stage">
        <svg class="radial__svg"></svg>
        <div class="radial__labels"></div>
        <div class="radial__center">
          <div class="is-on">Tools of<br>the Practice<small>Software & skills</small></div>
          <div>Draw, Detail<br>& Deliver</div>
          <div>Precise &<br>Considered</div>
        </div>
        <div class="radial__caption">Skills & Tools</div>
        <div class="radial__count">${pad2(TOOLS.length)} tools</div>
      </div>
    </section>

    <section class="stats grid">
      <h2 class="stats__title" data-lines>${lines(['Practice', '& Process'])}<small>Four offices, three sectors and a steady move from drawing board to site.</small></h2>
      <div class="stats__year" data-reveal><b>${PROFILE.since}</b>First year in practice</div>
      <div class="stats__list">
        ${[[4, '', 'Practices — intern to architect'], [PROJECTS.length, '', 'Selected projects'], [35, 'K', 'Sq.ft. 5-star hotel executed'], [3, '', 'Sectors — residential, hospitality, commercial']]
          .map(([n, s, l], i) => `<div class="stat" data-reveal style="--i:${i}"><b data-count="${n}" data-suffix="${s}">0${s}</b><span>${l}</span></div>`).join('')}
      </div>
    </section>

    <div class="marquee"><div class="marquee__track">${[0, 1].map(() => TOOLS.concat(COMPETENCIES.slice(0, 4).map((c) => ({ name: c }))).map((t) => `<span>${t.name}</span>`).join('')).join('')}</div></div>`;
  }

  function tableHtml(label, rows) {
    return `<section class="table grid">
      <div class="table__label" data-reveal>${label}</div>
      <div class="table__rows">${rows.map((r, i) => `
        <div class="row ${r.more ? 'has-more' : ''}" data-reveal style="--i:${i}" ${r.more ? 'role="button" tabindex="0"' : ''}>
          <span>${r.a}</span><span>${r.b}</span><span>${r.c}</span><span class="arrow">${r.more ? '↗' : ''}</span>
          ${r.more ? `<div class="row__more"><ul>${r.more.map((m) => `<li>${m}</li>`).join('')}</ul></div>` : ''}
        </div>`).join('')}</div>
    </section>`;
  }

  function cardHtml(p, i) {
    return `<a class="card" href="${projectUrl(p)}" data-type="${p.type}" data-reveal style="--i:${i % 5}">
      ${media(p.cover, { alt: p.name, ratio: 0.8 })}
      <div class="card__cap"><span><i>${pad2(PROJECTS.indexOf(p) + 1)}</i>${p.name}</span><span>${p.type}</span></div>
      <div class="card__sub"><span>${p.scale}</span><span>${p.year}</span></div>
    </a>`;
  }

  function initRows() {
    $$('.row.has-more').forEach((r) => {
      const t = () => { r.classList.toggle('is-open'); setTimeout(() => lenis && lenis.resize(), 650); };
      r.addEventListener('click', t);
      r.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t(); } });
    });
  }

  /* radial "tools" section */
  function initRadial() {
    const sec = $('.radial');
    if (!sec) return;
    const svg = $('.radial__svg', sec);
    const wrap = $('.radial__labels', sec);
    const centers = $$('.radial__center > div', sec);
    const N = TOOLS.length;
    const rf = [0.95, 0.78, 1, 0.84, 0.92, 0.74, 0.98, 0.86];
    const jit = [4, -9, 6, -3, 10, -6, 2, -11];
    svg.innerHTML = TOOLS.map(() => '<line/>').join('');
    wrap.innerHTML = TOOLS.map((t, i) => `<div class="radial__label"><i>${pad2(i + 1)}</i><b>${t.name}</b>${'●'.repeat(t.level)}${'○'.repeat(5 - t.level)}</div>`).join('');
    const ls = $$('line', svg);
    const lbs = $$('.radial__label', wrap);
    let last = -1;
    return (p) => {
      const w = innerWidth, h = innerHeight;
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w * 0.46, h * 0.44);
      const rot = -30 + p * 75;
      for (let i = 0; i < N; i++) {
        const a = ((i / N) * 360 + jit[i] + rot) * (Math.PI / 180);
        const r = R * (rf[i] - 0.12 * Math.sin(p * Math.PI * 2 + i));
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        const x0 = cx + Math.cos(a) * r * 0.06, y0 = cy + Math.sin(a) * r * 0.06;
        ls[i].setAttribute('x1', x0); ls[i].setAttribute('y1', y0);
        ls[i].setAttribute('x2', x - Math.cos(a) * 22); ls[i].setAttribute('y2', y - Math.sin(a) * 22);
        lbs[i].style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      const phase = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
      if (phase !== last) { centers.forEach((c, i) => c.classList.toggle('is-on', i === phase)); last = phase; }
      sec.classList.toggle('is-dark', p > 0.42);
    };
  }

  /* ---------- WORK ---------- */
  function renderWork() {
    const types = ['All', ...new Set(PROJECTS.map((p) => p.type))];
    const count = (t) => (t === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.type === t).length);
    $('main').innerHTML = `
      <section class="page-head grid">
        <h1 data-lines>${lines([`Work<sup>(${PROJECTS.length})</sup>`])}</h1>
        <p data-reveal>A catalogue of selected work, 2021 — 2026. Residential towers, a five-star hotel, logistics and studio interiors — from concept to site.</p>
      </section>
      <div class="filters" data-reveal>${types.map((t, i) => `<button class="${i ? '' : 'is-active'}" data-filter="${t}">${t}<sup>${count(t)}</sup></button>`).join('')}</div>
      <section class="view view--grid is-active" data-view="grid"><div class="stagger-grid">${PROJECTS.map((p, i) => cardHtml(p, i)).join('')}</div><div style="height:160rem"></div></section>
      <section class="view view--list" data-view="list"><div class="list">${PROJECTS.map((p) => `
        <div class="lrow" data-type="${p.type}">
          <a class="lrow__name" href="${projectUrl(p)}">${p.name.replace(' ', '<br>')}<small>${p.type} · ${p.year} · ${p.scale}</small></a>
          <div class="lrow__thumbs">${projectImages(p).slice(0, 12).map((n) => `<a href="${projectUrl(p)}"><img src="${IMG(n)}" alt="" loading="lazy"></a>`).join('')}</div>
        </div>`).join('')}</div></section>
      <section class="view view--gallery" data-view="gallery"></section>
      <div class="switch" role="tablist" aria-label="View">
        <button data-set="grid" class="is-active"><svg viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="5" height="5"/><rect x="7" y="0" width="5" height="5"/><rect x="0" y="7" width="5" height="5"/><rect x="7" y="7" width="5" height="5"/></svg>Grid</button>
        <button data-set="list"><svg viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="1" width="12" height="2"/><rect x="0" y="5" width="12" height="2"/><rect x="0" y="9" width="12" height="2"/></svg>List</button>
        <button data-set="gallery"><svg viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="7" height="5"/><rect x="8" y="0" width="4" height="7"/><rect x="0" y="6" width="4" height="6"/><rect x="5" y="8" width="7" height="4"/></svg>Gallery</button>
      </div>`;
  }

  function initWork() {
    let filter = 'All';
    let view = store.get('rw-view') || 'grid';
    let gallery = null;
    const setView = (v) => {
      view = v;
      store.set('rw-view', v);
      $$('.switch button').forEach((b) => b.classList.toggle('is-active', b.dataset.set === v));
      $$('.view').forEach((s) => s.classList.toggle('is-active', s.dataset.view === v));
      document.body.classList.toggle('is-gallery', v === 'gallery');
      if (v === 'gallery') { lenis && lenis.stop(); gallery = gallery || makeGallery($('.view--gallery')); gallery.build(filter); gallery.start(); }
      else { gallery && gallery.stop(); lenis && lenis.start(); scrollTo(0, 0); lenis && lenis.scrollTo(0, { immediate: true }); observe(); }
      refreshParallax();
    };
    $$('.switch button').forEach((b) => b.addEventListener('click', () => setView(b.dataset.set)));
    $$('.filters button').forEach((b) => b.addEventListener('click', () => {
      filter = b.dataset.filter;
      $$('.filters button').forEach((x) => x.classList.toggle('is-active', x === b));
      $$('.card, .lrow').forEach((el) => el.classList.toggle('is-hidden', filter !== 'All' && el.dataset.type !== filter));
      if (view === 'gallery') gallery.build(filter);
      lenis && lenis.resize();
      refreshParallax();
    }));
    const list = $('.list');
    $$('.lrow').forEach((r) => {
      r.addEventListener('mouseenter', () => { list.classList.add('is-hovering'); r.classList.add('is-hover'); });
      r.addEventListener('mouseleave', () => { list.classList.remove('is-hovering'); r.classList.remove('is-hover'); });
    });
    setView(view);
  }

  /* infinite, draggable gallery plane */
  function makeGallery(root) {
    root.innerHTML = '<div class="gallery"><div class="gallery__plane"></div></div><div class="gallery__hint">Drag to explore</div>';
    const el = $('.gallery', root), plane = $('.gallery__plane', root), hint = $('.gallery__hint', root);
    let tiles = [], W = 0, H = 0, running = false;
    const pos = { x: 0, y: 0 }, target = { x: 0, y: 0 };
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    function build(filter) {
      seed = 7;
      const C = (isMobile() ? 170 : 330) * remPx();
      const items = [];
      PROJECTS.filter((p) => filter === 'All' || p.type === filter).forEach((p) => projectImages(p).forEach((n) => items.push({ n, p })));
      const cols = Math.max(isMobile() ? 4 : 7, Math.ceil(innerWidth / C) + 2);
      const cells = Math.max(Math.ceil((items.length * 1.5) / cols) * cols, cols * (Math.ceil(innerHeight / C) + 2));
      const rows = cells / cols;
      W = cols * C; H = rows * C;
      const order = [...Array(cells).keys()].sort(() => rnd() - 0.5);
      let k = 0;
      tiles = [];
      plane.innerHTML = '';
      order.forEach((cell, idx) => {
        const cx = (cell % cols) * C, cy = Math.floor(cell / cols) * C;
        const it = k < items.length && (idx % 3 !== 2 || cells - idx <= items.length - k) ? items[k++] : null;
        const a = it ? SIZES[it.n][0] / SIZES[it.n][1] : 0.6 + rnd() * 1.2;
        let w = C * (0.42 + rnd() * 0.4), h = w / a;
        if (h > C * 0.85) { h = C * 0.85; w = h * a; }
        const x = cx + rnd() * (C - w), y = cy + rnd() * (C - h);
        const t = document.createElement(it ? 'a' : 'div');
        t.className = `gtile ${it ? '' : 'is-frame'}`;
        t.style.width = `${w}px`; t.style.height = `${h}px`;
        if (it) {
          t.href = projectUrl(it.p);
          t.draggable = false;
          t.innerHTML = `<img alt="${it.p.name}" draggable="false"><span class="gtile__cap">${it.p.name}</span>`;
          const img = t.firstChild;
          img.onload = () => img.classList.add('is-loaded');
          img.src = IMG(it.n);
        }
        plane.append(t);
        tiles.push({ el: t, x, y, w, h });
      });
      target.x = pos.x = -(W - innerWidth) / 2;
      target.y = pos.y = -(H - innerHeight) / 2;
      draw();
    }
    const mod = (a, n) => ((a % n) + n) % n;
    function draw() {
      for (const t of tiles) {
        const x = mod(t.x + pos.x + t.w, W) - t.w;
        const y = mod(t.y + pos.y + t.h, H) - t.h;
        t.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    }
    function loop() {
      if (!running) return;
      pos.x += (target.x - pos.x) * 0.09;
      pos.y += (target.y - pos.y) * 0.09;
      draw();
      requestAnimationFrame(loop);
    }
    let down = null, moved = 0, last = null, vel = { x: 0, y: 0 };
    const hideHint = () => hint.classList.add('is-off');
    el.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; last = { ...down }; moved = 0; el.classList.add('is-drag'); });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - last.x, dy = e.clientY - last.y;
      target.x += dx * 1.6; target.y += dy * 1.6; vel = { x: dx, y: dy };
      moved += Math.abs(dx) + Math.abs(dy); last = { x: e.clientX, y: e.clientY };
      if (moved > 6) hideHint();
    });
    addEventListener('pointerup', () => { if (!down) return; down = null; el.classList.remove('is-drag'); target.x += vel.x * 12; target.y += vel.y * 12; vel = { x: 0, y: 0 }; });
    el.addEventListener('click', (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
    el.addEventListener('wheel', (e) => { e.preventDefault(); target.x -= e.deltaX * 1.2; target.y -= e.deltaY * 1.2; hideHint(); }, { passive: false });
    el.addEventListener('mouseover', (e) => el.classList.toggle('is-hover', !!e.target.closest('a.gtile')));
    el.addEventListener('mouseleave', () => el.classList.remove('is-hover'));
    return {
      build,
      start() { if (!running) { running = true; loop(); } setTimeout(hideHint, 4000); },
      stop() { running = false; },
    };
  }

  /* ---------- PROJECT ---------- */
  function renderProject() {
    const slug = new URLSearchParams(location.search).get('p');
    const idx = Math.max(0, PROJECTS.findIndex((p) => p.slug === slug));
    const p = PROJECTS[idx];
    const next = PROJECTS[(idx + 1) % PROJECTS.length];
    const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    document.title = `${p.name} — ${PROFILE.name}`;
    document.body.style.setProperty('--pc', p.color);
    const imgs = projectImages(p);
    const isDrawing = (n) => /plan|section|elev|site|typical|amenity|bar/.test(n);

    // group the project's blocks into sections: an optional text, then the images that follow it
    const sections = [];
    p.blocks.forEach((b) => {
      if (b.text || !sections.length) sections.push({ text: b.text || null, imgs: [] });
      const cur = sections[sections.length - 1];
      if (b.img) cur.imgs.push({ n: b.img, cap: b.cap, drawing: !!b.drawing || isDrawing(b.img) });
      if (b.pair) b.pair.forEach((n, i) => cur.imgs.push({ n, cap: b.cap && b.cap[i], drawing: !!b.drawing || isDrawing(n) }));
    });

    const sumA = (list) => list.reduce((s, im) => s + +ar(im.n), 0);
    // a few images without text of their own join the next section instead of floating alone
    for (let i = 0; i < sections.length - 1; i++) {
      if (!sections[i].text && sumA(sections[i].imgs) < 2) { sections[i + 1].imgs.unshift(...sections[i].imgs); sections.splice(i, 1); i--; }
    }

    // pack images into justified rows: each image keeps its proportions, images in a row share one height,
    // and the row spans the full content width. Of all ways to split the sequence into rows,
    // pick the one whose rows are closest to a comfortable height (combined aspect ≈ 2.5).
    const packRows = (list) => {
      const cost = (s) => (s - 2.5) ** 2 + (s < 2 ? 3 : 0);
      let best = null;
      for (let mask = 0; mask < 1 << (list.length - 1); mask++) {
        const rows = [[]];
        list.forEach((im, i) => { rows[rows.length - 1].push(im); if (i < list.length - 1 && (mask >> i) & 1) rows.push([]); });
        if (rows.some((r) => r.length > 4)) continue;
        const c = rows.reduce((t, r) => t + cost(sumA(r)), 0);
        if (!best || c < best.c) best = { c, rows };
      }
      return best ? best.rows : [];
    };
    const rowHtml = (row) => {
      const sum = sumA(row);
      return `<div class="jrow" data-reveal style="--sum:${sum.toFixed(3)};--n:${row.length}">${row.map((im) => `
        <figure class="jrow__item" style="flex-grow:${(ar(im.n) * 100).toFixed(1)}" data-lb="${im.n}">
          ${media(im.n, { drawing: im.drawing, alt: im.cap || p.name })}
          ${im.cap ? `<figcaption>${im.cap}</figcaption>` : ''}
        </figure>`).join('')}</div>`;
    };
    const headingLines = (t) => t.split(' ').reduce((acc, w) => { const l = acc[acc.length - 1]; if (l && (l + ' ' + w).length <= 18) acc[acc.length - 1] = l + ' ' + w; else acc.push(w); return acc; }, []);
    let num = 0;
    const detail = sections.map((s) => {
      const text = s.text ? `<span class="psec__num">${pad2(++num)}</span><h3 data-lines>${lines(headingLines(s.text[0]))}</h3><p data-reveal>${s.text[1]}</p>` : '';
      // too few images to fill a row → text on the left, images on the right (same as the opening)
      if (s.text && s.imgs.length && sumA(s.imgs) < 1.6) {
        return `<section class="psec psec--split grid">
          <div class="psec__side">${text}</div>
          <div class="psec__media" style="--a:${sumA(s.imgs).toFixed(3)}">${rowHtml(s.imgs)}</div>
        </section>`;
      }
      return `<section class="psec">
        ${text ? `<div class="psec__text grid">${text}</div>` : ''}
        ${packRows(s.imgs).map(rowHtml).join('')}
      </section>`;
    }).join('');
    const titleLines = p.name.length > 14 ? p.name.split(' ').reduce((a, w, i, arr) => (i < Math.ceil(arr.length / 2) ? [a[0] ? a[0] + ' ' + w : w, a[1]] : [a[0], a[1] ? a[1] + ' ' + w : w]), ['', '']) : [p.name];

    $('main').innerHTML = `
      <section class="p-hero">
        <h1 class="p-hero__title" data-lines><span class="bar"></span>${lines(titleLines)}</h1>
        <div class="p-hero__sub">
          <span><b>${p.type}</b> · ${p.scale}</span><span>${p.meta.Location}</span><span>${p.meta.Date}</span>
          <span class="p-hero__nav"><a class="u" href="${projectUrl(prev)}">← Prev</a><a class="u" href="${projectUrl(next)}">Next →</a></span>
        </div>
      </section>
      <section class="p-open grid">
        <div class="p-open__text">
          <div class="p-lead" data-reveal><h2>${p.lead[0]}</h2><p>${p.lead[1]}</p></div>
          <dl class="p-meta" data-reveal>${Object.entries(p.meta).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
        </div>
        <figure class="p-open__cover" data-lb="${p.cover}" style="--a:${ar(p.cover)}">${media(p.cover, { eager: true, alt: p.name })}</figure>
      </section>
      <div class="pv pv--detail is-active" data-pv="detail"><div class="detail">${detail}</div></div>
      <div class="pv pv--masonry" data-pv="masonry"><div class="masonry">${imgs.map((n) => `<figure data-lb="${n}">${media(n, { alt: p.name, drawing: /plan|section|elev|site|typical|amenity|bar/.test(n) })}</figure>`).join('')}</div></div>
      <div class="pv pv--slider" data-pv="slider"><div class="slider"><div class="slider__track">${imgs.map((n) => `<figure data-lb="${n}" style="aspect-ratio:${ar(n)}">${media(n, { alt: p.name, ratio: ar(n), drawing: /plan|section|elev|site|typical|amenity|bar/.test(n) })}</figure>`).join('')}</div>
        <div class="slider__nav"><button class="u" data-sl="-1">Prev</button><span>01 / ${pad2(imgs.length)}</span><button class="u" data-sl="1">Next</button></div></div></div>
      ${p.credit ? `<p class="b-credit">${p.credit}</p>` : ''}
      <a class="next" href="${projectUrl(next)}">
        <div class="next__inner">
          <span class="next__label">Next work</span>
          <span class="next__name" data-lines>${lines(next.name.split(' '))}</span>
          <div class="next__img" style="--a:${ar(next.cover)}">${media(next.cover, { alt: next.name })}</div>
        </div>
      </a>
      <div class="switch" aria-label="Layout">
        <button data-set="detail" class="is-active">Detail</button><button data-set="masonry">Masonry</button><button data-set="slider">Slider</button>
      </div>
      <div class="lightbox" aria-hidden="true"><img alt=""><button class="lightbox__prev" aria-label="Previous"></button><button class="lightbox__next" aria-label="Next"></button><button class="lightbox__close u">Close</button><div class="lightbox__ui"><span>${p.name}</span><span class="lb-count"></span></div></div>`;
  }

  function initProject() {
    $$('.switch button').forEach((b) => b.addEventListener('click', () => {
      $$('.switch button').forEach((x) => x.classList.toggle('is-active', x === b));
      $$('.pv').forEach((v) => v.classList.toggle('is-active', v.dataset.pv === b.dataset.set));
      const top = $('.p-open').offsetTop + $('.p-open').offsetHeight - 40;
      if (scrollY > top) lenis ? lenis.scrollTo(top, { immediate: true }) : scrollTo(0, top);
      lenis && lenis.resize(); observe(); refreshParallax();
    }));
    // slider
    const track = $('.slider__track');
    const counter = $('.slider__nav span');
    const figs = $$('figure', track);
    const current = () => figs.reduce((best, f, i) => (Math.abs(f.offsetLeft - track.scrollLeft) < Math.abs(figs[best].offsetLeft - track.scrollLeft) ? i : best), 0);
    track.addEventListener('scroll', () => { counter.textContent = `${pad2(current() + 1)} / ${pad2(figs.length)}`; });
    $$('[data-sl]').forEach((b) => b.addEventListener('click', () => {
      const i = Math.min(figs.length - 1, Math.max(0, current() + +b.dataset.sl));
      track.scrollTo({ left: figs[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }));
    let sd = null;
    track.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') { sd = { x: e.clientX, l: track.scrollLeft, m: 0 }; track.style.scrollSnapType = 'none'; } });
    addEventListener('pointermove', (e) => { if (sd) { track.scrollLeft = sd.l - (e.clientX - sd.x); sd.m = Math.abs(e.clientX - sd.x); } });
    addEventListener('pointerup', () => { if (sd) { track.style.scrollSnapType = ''; const moved = sd.m; sd = null; if (moved > 5) track.dataset.dragged = '1'; setTimeout(() => delete track.dataset.dragged, 50); } });
    // lightbox
    const lb = $('.lightbox'), lbImg = $('img', lb), lbCount = $('.lb-count', lb);
    let list = [], at = 0;
    const show = (i) => { at = (i + list.length) % list.length; lbImg.src = IMG(list[at]); lbCount.textContent = `${pad2(at + 1)} / ${pad2(list.length)}`; };
    const close = () => { lb.classList.remove('is-open'); lenis && lenis.start(); };
    document.addEventListener('click', (e) => {
      const f = e.target.closest('[data-lb]');
      if (!f || track.dataset.dragged) return;
      const scope = f.closest('.pv') || document;
      list = [...new Set($$('[data-lb]', scope).map((x) => x.dataset.lb))];
      if (!list.length) list = [f.dataset.lb];
      show(list.indexOf(f.dataset.lb));
      lb.classList.add('is-open'); lenis && lenis.stop();
    });
    $('.lightbox__close').addEventListener('click', close);
    $('.lightbox__prev').addEventListener('click', () => show(at - 1));
    $('.lightbox__next').addEventListener('click', () => show(at + 1));
    addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(at - 1);
      if (e.key === 'ArrowRight') show(at + 1);
    });
  }

  /* ---------- ABOUT ---------- */
  function renderAbout() {
    $('main').innerHTML = `
      <section class="a-hero">
        <div class="a-hero__text">
          <div class="a-hero__kicker" data-reveal><b>SELECTED WORK</b>${PROFILE.disciplines.join(' &nbsp;|&nbsp; ')}</div>
          <h1 data-lines><span class="bar"></span>${lines(['About', PROFILE.first, PROFILE.last])}<span class="rule"></span></h1>
          <div class="a-hero__foot" data-reveal>${PROFILE.sectors.map((s) => `<span>${s}</span>`).join('')}</div>
          <span class="a-hero__vline"></span>
        </div>
        <div class="a-hero__media">${media('cover', { ratio: 'auto', eager: true, alt: 'Portfolio cover artwork' }).replace('aspect-ratio:auto', '')}</div>
      </section>
      <section class="intro grid">
        <dl class="facts" data-reveal>
          <dt>Title</dt><dd>${PROFILE.title}</dd>
          <dt>Based</dt><dd>${PROFILE.location}</dd>
          <dt>Languages</dt><dd>${EXTRAS.Languages.join(', ')}</dd>
          <dt>Phone</dt><dd>${PROFILE.phones.map((p) => `<a class="u" href="tel:${p.link}">${p.display}</a> <span class="muted">(${p.label})</span>`).join('<br>')}</dd>
          <dt>Email</dt><dd><a class="u" href="mailto:${PROFILE.email}">${PROFILE.email}</a></dd>
          <dt>LinkedIn</dt><dd><a class="u" href="${PROFILE.linkedin}" target="_blank" rel="noopener">rushikesh-wavekar</a></dd>
        </dl>
        <p class="intro__text serif" data-reveal>Three years of professional practice across residential, commercial and interior projects — from concept to execution — developing skills in design, technical detailing and project coordination. Graduate study in architecture will let me deepen this foundation: sustainability, advanced design methods and urban thinking.<span class="accent-rule"></span></p>
      </section>
      <h2 class="statement serif" data-lines>${lines(['Experience'])}</h2>
      ${tableHtml('Professional', EXPERIENCE.map((e) => ({ a: e.company, b: e.role, c: e.period, more: e.points })))}
      ${tableHtml('Freelance', FREELANCE.map((e) => ({ a: e.title, b: e.note, c: 'Independent' })))}
      <h2 class="statement serif" data-lines>${lines(['Education'])}</h2>
      ${tableHtml('Academic', EDUCATION.map((e) => ({ a: e.title, b: `${e.school}, ${e.place}`, c: e.period })))}
      <h2 class="statement serif" data-lines>${lines(['Skills & Tools'])}</h2>
      <section class="skills grid">
        <div class="skills__label" data-reveal>Software</div>
        <div class="skills__list">${TOOLS.map((t) => `<div class="skill" data-reveal><span>${t.name}</span><small>${t.use}</small><span class="skill__dots">${[1, 2, 3, 4, 5].map((d) => `<i class="${d <= t.level ? 'on' : ''}" style="--d:${d}"></i>`).join('')}</span></div>`).join('')}</div>
        <div class="skills__label" data-reveal style="margin-top:50rem">Core competencies</div>
        <div class="chips" data-reveal>${COMPETENCIES.map((c) => `<span>${c}</span>`).join('')}</div>
      </section>
      <section class="cols grid">
        <div class="cols__label" data-reveal>Beyond work</div>
        ${['Achievements', 'Involvement', 'Interests'].map((k) => `<div class="cols__col" data-reveal><h4>${k}</h4><ul>${EXTRAS[k].map((a) => `<li>${a}</li>`).join('')}</ul></div>`).join('')}
      </section>
      <section class="quote" data-reveal><p>“${PROFILE.quote[0]}.”</p><span>— ${PROFILE.quote[1]}</span></section>`;
  }

  /* ---------- shared behaviours ---------- */
  let lenis = null;
  let io = null;
  function observe() {
    io = io || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    $$('[data-reveal]:not(.is-in), .media:not(.is-in), [data-lines]:not(.is-in), .stat:not(.is-in)').forEach((el) => {
      if (el.closest('.hero') || el.offsetParent === null) return;
      io.observe(el);
    });
  }
  function mediaLoad() {
    $$('.media img').forEach((img) => {
      const done = () => img.parentElement.classList.add('is-loaded');
      if (img.complete && img.naturalWidth) done(); else img.addEventListener('load', done, { once: true });
    });
  }
  function counters() {
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      const el = e.target, n = +el.dataset.count, s = el.dataset.suffix || '';
      const t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 1600); el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))) + s; if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: 0.5 });
    $$('[data-count]').forEach((el) => cio.observe(el));
  }

  // parallax + scroll-driven bits
  let para = [];
  function refreshParallax() {
    para = $$('[data-speed]').filter((el) => el.offsetParent !== null).map((el) => ({ el, s: +el.dataset.speed, top: 0, h: 0 }));
    measure();
  }
  function measure() {
    const y = scrollY;
    para.forEach((p) => { p.el.style.transform = ''; const r = p.el.getBoundingClientRect(); p.top = r.top + y; p.h = r.height; });
  }
  let radialTick = null;
  function tick() {
    const y = lenis ? lenis.scroll : scrollY;
    const vh = innerHeight;
    if (!isMobile()) {
      for (const p of para) {
        const c = p.top + p.h / 2 - (y + vh / 2);
        if (Math.abs(c) < vh * 1.5) p.el.style.transform = `translate3d(0, ${(c * p.s).toFixed(1)}px, 0)`;
      }
    }
    const hero = $('#heroImg');
    if (hero && y < vh * 1.2) hero.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y / vh * 0.12})`;
    if (radialTick) {
      const sec = $('.radial');
      const r = sec.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      radialTick(p);
    }
  }

  function smooth() {
    if (typeof Lenis === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addEventListener('scroll', tick, { passive: true });
      return;
    }
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', tick);
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    // in-page anchors
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname && !(url.pathname.endsWith('/index.html') && /\/$|index\.html$/.test(location.pathname))) return;
      const t = url.hash && $(url.hash);
      if (t) { e.preventDefault(); lenis.scrollTo(t, { duration: 1.6 }); }
    });
  }

  // page transitions
  function transitions() {
    const cur = document.createElement('div');
    cur.className = 'curtain';
    document.body.append(cur);
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      e.preventDefault();
      cur.classList.add('is-in');
      setTimeout(() => { location.href = a.href; }, 650);
    });
    addEventListener('pageshow', (e) => { if (e.persisted) cur.classList.remove('is-in'); });
  }

  // preloader
  function loader(ready) {
    const first = !store.sget('rw-seen');
    store.sset('rw-seen', '1');
    const l = document.createElement('div');
    l.className = `loader ${first ? '' : 'is-quick'}`;
    l.innerHTML = `<div class="loader__bar"></div><div class="loader__num">0</div><div class="loader__name">${PROFILE.first} ${PROFILE.last} <span class="logo__role">Architect</span></div>`;
    document.body.append(l);
    const num = $('.loader__num', l), bar = $('.loader__bar', l);
    const imgs = first ? $$('main img').filter((i) => i.loading !== 'lazy').slice(0, 4) : [];
    let loaded = imgs.length ? 0 : 1;
    const total = Math.max(1, imgs.length);
    imgs.forEach((i) => { if (i.complete) loaded++; else { i.addEventListener('load', () => loaded++, { once: true }); i.addEventListener('error', () => loaded++, { once: true }); } });
    const t0 = performance.now();
    const minT = first ? 1600 : 250;
    const run = (t) => {
      const time = Math.min(1, (t - t0) / minT);
      const k = Math.min(time, (loaded / total) * 0.6 + time * 0.4 + (t - t0 > 4000 ? 1 : 0));
      const v = Math.min(100, Math.round(k * 100));
      num.textContent = v; bar.style.width = `${v}%`;
      if (v >= 100 && time >= 1) { l.classList.add('is-done'); ready(); setTimeout(() => l.remove(), 1100); return; }
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  /* ---------- boot ---------- */
  header();
  if (page === 'home') renderHome();
  if (page === 'work') renderWork();
  if (page === 'project') renderProject();
  if (page === 'about') renderAbout();
  footer();
  mediaLoad();
  smooth();
  transitions();
  if (page === 'home') { initRows(); radialTick = initRadial(); counters(); }
  if (page === 'about') initRows();
  if (page === 'work') initWork();
  if (page === 'project') initProject();

  loader(() => {
    document.body.classList.add('is-ready');
    $$('.hero [data-lines], .hero__title').forEach((el) => el.classList.add('is-in'));
    observe();
    refreshParallax();
    tick();
    if (location.hash && $(location.hash)) setTimeout(() => (lenis ? lenis.scrollTo($(location.hash), { immediate: true }) : $(location.hash).scrollIntoView()), 50);
  });

  let rt;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { fitFooter(); refreshParallax(); tick(); }, 150); });
  addEventListener('load', () => { refreshParallax(); lenis && lenis.resize(); });
})();
