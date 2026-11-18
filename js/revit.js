/* global RVT */
(() => {
  const el = document.getElementById('rv');
  if (!el || typeof RVT === 'undefined') return;
  const A = 'assets/revit/';
  const it = Array.isArray(RVT.items) ? RVT.items : RVT.items.value;
  const fmt = (n) => Number(n).toLocaleString('en-US');
  const c = RVT.counts;
  const pick = (k, names) => names.map((n) => it.find((x) => x.k === k && x.n === n)).filter(Boolean);
  const fig = (x, sub = '', tag = '') => `<figure class="rv__fig" data-src="${A + x.img}"><div class="ph"><img src="${A + x.img}" alt="${x.n}" loading="lazy"></div><figcaption>${x.label || x.n}</figcaption>${sub ? `<small>${sub}</small>` : ''}${tag}</figure>`;

  const lab = (arr, labels) => arr.map((x, i) => ({ ...x, label: labels[i] }));
  const views3d = lab(pick('3d', ['{3D}', 'ZZ_WEB_3D_CUTAWAY', '{3D} Copy 1']), ['Tower: 3D view', 'Tower: shaded 3D view', 'Tower: façade 3D view']);
  const sections = [...lab(pick('elevation', ['North']), ['North elevation']), ...pick('section', ['Section 1', 'Section 2', 'Section 3', 'Section 5', 'Section 6', 'Section 7'])];
  const plans = lab(pick('plan', ['Basement 1', '10 TH FLOOR']), ['Basement 1 plan', '10th floor plan']);
  const fams = it.filter((x) => x.k === 'family');
  const nested = fams.filter((f) => f.nest);
  const famOrder = [...nested, ...fams.filter((f) => !f.nest)];

  const P = (img, n, sub) => ({ img: 'p3_' + img + '.jpg', n, sub });
  const V = (img, n) => ({ img: img + '.jpg', n });
  const CROWN = [P('crown_front', 'Crown: front'), P('crown_corner', 'Crown: corner view')];
  const FAMS = [
    P('f537825_back', 'Fluted planter beam', 'Nested “single Flute” · 74 in model'),
    P('f921378_back', 'Fluted band beam', 'Nested “single Flute” · 91 in model'),
    P('f639151_back', 'Stepped curved planter beam', 'Nested stepped profile · 117 in model'),
    P('f737743_back', 'Alternate beam band, above 16th floor', '68 in model'),
    P('f1473171_back', 'Podium 1 folded band beam', 'Band depth parameter'),
    P('f1476124_back', 'Planter & extended slab beam', 'Planter and band depth parameters'),
    P('f854254_front', 'Curtain panel jali', 'Jali screen'),
  ];
  const PROFS = [
    {...P('f522809_profile', 'Service floor 1 band', '1850 profile'), b: 'band_sf1'},
    {...P('f523159_profile', 'Service floor 2 band', '1950 profile'), b: 'band_sf2'},
    {...P('f522457_profile', 'Podium 1 band', '1650 profile'), b: 'band_podium1'},
  ];
  const levels =RVT.levels.map((l) => `<div>${l.n}<span>${l.e >= 0 ? '+' : ''}${Number(l.e).toFixed(2)} m</span></div>`).join('');

  el.innerHTML = `<section class="rv">
    <p class="rv__lab">BIM · Autodesk Revit · Residential high-rise · Mumbai</p>
    <h1>A 41-level residential tower, modelled in Revit from raft to roof</h1>
    <p class="rv__lead">The complete architectural BIM model for a residential tower of up to 30 storeys, with a nursing home, an eight-level podium, refuge and service floors. I built the façade language as my own parametric families: fluted, stepped and curved podium beam bands, jali screens and curtain panels, balusters and window awnings, many of them using nested families.</p>
    <div class="rv__stats">
      <div class="rv__stat"><b>${RVT.levels.length}</b><span>Levels, raft to top</span></div>
      <div class="rv__stat"><b>${Math.round(RVT.extent.height)} m</b><span>Modelled height</span></div>
      <div class="rv__stat"><b>${fmt(Math.round(RVT.area))} m²</b><span>Modelled floor area</span></div>
      <div class="rv__stat"><b>${fams.length}</b><span>Custom families</span></div>
      <div class="rv__stat"><b>${fmt(c.Walls)}</b><span>Walls</span></div>
      <div class="rv__stat"><b>${fmt(c.Doors)}</b><span>Doors</span></div>
      <div class="rv__stat"><b>${fmt(c.CurtainWallPanels)}</b><span>Curtain panels</span></div>
      <div class="rv__stat"><b>${fmt(c.StructuralFraming)}</b><span>Framing members</span></div>
    </div>

    <div class="rv__sec"><p class="rv__lab">01 — Model</p><h2>3D views</h2><p class="rv__note">Views exported directly from the Revit model.</p>
      <div class="rv__grid">${views3d.map((x) => fig(x)).join('')}</div></div>

    <div class="rv__sec"><p class="rv__lab">02 — Drawings</p><h2>Sections &amp; elevations</h2><p class="rv__note">Sections and elevations generated from the live model.</p>
      <div class="rv__grid rv__grid--4">${sections.map((x) => fig(x, x.k[0].toUpperCase() + x.k.slice(1))).join('')}</div></div>

    <div class="rv__sec"><p class="rv__lab">03 — Plans</p><h2>Floor plans</h2><p class="rv__note">Key floor plans from the model. All ${RVT.levels.length} levels are listed in the level schedule below.</p>
      <div class="rv__grid" style="grid-template-columns:1fr 1fr">${plans.map((x) => fig(x, 'Floor plan')).join('')}</div></div>

    <div class="rv__sec"><p class="rv__lab">04 — Crown</p><h2>Crown of the tower</h2><p class="rv__note">The top of the tower, cut from the model above the upper floors.</p>
      <div class="rv__wide">${fig(V('vw_crown', 'Crown and upper floors: front'))}</div>
      <div class="rv__grid" style="grid-template-columns:1fr 1fr">${CROWN.map((x) => fig(x)).join('')}</div></div>

    <div class="rv__sec"><p class="rv__lab">05 — Façade</p><h2>Façade detail</h2><p class="rv__note">Fluted pilasters, jali balustrades and the band beams below each balcony, as they come together on the elevation.</p>
      <div class="rv__grid" style="grid-template-columns:1.25fr 1fr">${fig(V('vw_facade', 'Typical floors: front elevation'))}${fig(V('vw_balcony', 'Balcony band and jali railing: close-up'))}</div></div>

    <div class="rv__sec rv__soft"><p class="rv__lab">06 — Families</p><h2>Custom &amp; nested parametric families</h2><p class="rv__note">I modelled each of these families myself. A nested single flute or stepped profile, repeated by a <em>Flute Count</em> parameter, generates the podium and band beams across the façade.</p>
      <div class="rv__grid">${FAMS.map((f) => fig(f, f.sub)).join('')}</div></div>

    <div class="rv__sec rv__soft"><p class="rv__lab">07 — Profiles</p><h2>Floor band profiles</h2><p class="rv__note">The profile families behind the slab-edge band that runs around the tower at the service floors and the podium.</p>
      <div class="rv__pairs">${PROFS.map((f) => `<div class="rv__pair">${fig({ ...f, n: f.n + ': profile' }, f.sub)}${fig(V(f.b, f.n + ': 3D in model'))}</div>`).join('')}</div></div>

    <div class="rv__sec"><p class="rv__lab">08 — Levels</p><h2>Level schedule</h2><p class="rv__note">All ${RVT.levels.length} levels in the model, with their elevations.</p>
      <div class="rv__levels">${levels}</div></div>
  </section>`;

  const box = document.getElementById('rvbox');
  el.addEventListener('click', (e) => { const f = e.target.closest('.rv__fig'); if (!f) return; box.querySelector('img').src = f.dataset.src; box.classList.add('on'); });
  box.addEventListener('click', () => box.classList.remove('on'));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') box.classList.remove('on'); });
})();
