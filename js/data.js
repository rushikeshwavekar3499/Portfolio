/* ------------------------------------------------------------------
   All site content lives here. Edit this file to update the website.
   Image files are in assets/img/<name>.jpg — [width, height] below.
------------------------------------------------------------------- */
const SIZES = {"anglo-1":[866,1505],"anglo-2":[511,836],"anglo-3":[514,608],"anglo-4":[1104,562],"anglo-plan":[1092,829],"bhaktiyog-1":[1718,1553],"bhaktiyog-2":[2000,1006],"bhaktiyog-3":[902,1553],"bhaktiyog-amenity":[1164,1070],"bhaktiyog-plan":[1152,1034],"bhaktiyog-typical":[828,1394],"cover":[1294,2000],"iconiqa-1":[1368,1437],"iconiqa-2":[2000,1093],"iconiqa-3":[1788,1062],"iconiqa-4":[1735,1553],"iconiqa-5":[936,1687],"iconiqa-6":[1121,1553],"iconiqa-7":[725,1183],"iconiqa-8":[624,591],"iconiqa-bar":[1291,733],"iconiqa-plan":[2000,794],"monrepos-1":[1483,1553],"monrepos-2":[1063,1072],"monrepos-3":[960,1553],"monrepos-4":[1030,1553],"monrepos-5":[1118,1553],"monrepos-6":[1121,1553],"monrepos-plan":[1217,961],"monrepos-section":[840,1466],"regalia-1":[854,1553],"regalia-2":[1051,1553],"regalia-3":[1363,1553],"regalia-4":[1565,1553],"regalia-5":[950,1553],"regalia-6":[1565,1553],"regalia-plan":[1104,1058],"regalia-site":[1152,1298],"sampoorna-1":[1404,1392],"sampoorna-2":[1190,1687],"sampoorna-3":[1123,1519],"sampoorna-elev":[1296,1562],"sampoorna-plan":[804,1406],"seabird-1":[2000,537],"seabird-2":[1080,1435],"seabird-plan":[1128,1502],"seabird-section":[1584,517],"starhub-1":[828,1534],"starhub-elev":[1502,644],"starhub-plan":[2000,638],"tilak-1":[912,1687],"tilak-2":[859,1562],"tilak-elev":[1344,685],"tilak-plan":[1373,986],"tilak-section":[696,1526],"udipi-1":[1368,1324],"udipi-site":[2000,1157]};

const PROFILE = {
  name: 'Rushikesh Wavekar',
  first: 'Rushikesh', last: 'Wavekar',
  title: 'Architect & Project Manager',
  location: 'Business Bay, Dubai, UAE',
  email: 'rushikesh.wavekar3499@gmail.com',
  phones: [
    { label: 'UAE', display: '+971 50 208 4506', link: '+971502084506' },
    { label: 'India', display: '+91 88795 19110', link: '+918879519110' },
  ],
  linkedin: 'https://www.linkedin.com/in/rushikesh-wavekar',
  since: '2021',
  current: 'Talati & Partners LLP',
  statement:
    'A Dubai-based architect working across residential, commercial and hospitality projects — from concept and elevation design to working drawings and on-site execution. I care about how design intent survives the journey to built reality: the detail, the coordination, the craft.',
  intro: 'Architectural design, project coordination, interior design, working drawings and site execution.',
  disciplines: ['Architecture', 'Design', 'Execution'],
  sectors: ['Residential', 'Hospitality', 'Commercial'],
  quote: ['I am still learning', 'Michelangelo'],
};

const EXPERIENCE = [
  { role: 'Architect', company: 'Talati & Partners LLP', period: 'Jan 2026 — Present', place: 'Mumbai',
    points: ['High-rise residential presentations, 3D modelling, structural elevations and floor plan development.', 'AI-based rendering, client coordination and stack chart analysis.'] },
  { role: 'Project Manager', company: 'Design Oltre Orizzonte', period: 'Aug 2024 — Nov 2025', place: 'Mumbai',
    points: ['Project Manager — ICONIQA 5-Star Hotel, 35,000 sq.ft. near Mumbai International Airport.', 'Led on-site execution, design coordination, MEP resolution, timelines and reworks.'] },
  { role: 'Architect', company: 'Associated Architects', period: 'Jul 2023 — Jul 2024', place: 'Mumbai',
    points: ['Managed designs of multiple projects simultaneously, with site coordination and detail focus.', 'Rendering, working drawings, presentation drawings, area calculations and consultant coordination.'] },
  { role: 'Intern', company: 'RL Narayan & Associates', period: 'Nov 2021 — Apr 2022', place: 'Mumbai',
    points: ['Executed interior works for Qyuki Design Studio (StarHub) and Anglo-Eastern training institute.'] },
];

const FREELANCE = [
  { title: '5,000 sq.ft. Bungalow', note: 'Architectural design & execution' },
  { title: '1 BHK Residential Interior', note: 'Interior design & documentation' },
  { title: 'Logo design', note: 'Identity work' },
  { title: 'German Laundry', note: 'Interior work' },
];

const EDUCATION = [
  { title: 'Bachelor of Architecture', school: 'CTES College of Architecture', place: 'Mumbai', period: '2017 — 2023' },
  { title: 'Junior College', school: 'Swami Vivekananda Junior College', place: 'Chembur, Mumbai', period: '2015 — 2017' },
  { title: 'Schooling', school: 'General Education Academy', place: 'Chembur, Mumbai', period: '2015' },
];

// level: out of 5
const TOOLS = [
  { name: 'AutoCAD', level: 5, use: 'Drafting & working drawings' },
  { name: 'Revit', level: 4, use: 'BIM & documentation' },
  { name: 'SketchUp', level: 4, use: '3D modelling' },
  { name: 'Lumion', level: 4, use: 'Real-time visualisation' },
  { name: 'Photoshop', level: 4, use: 'Post-production & presentation' },
  { name: 'CorelDRAW', level: 4, use: 'Graphics & layouts' },
  { name: '3ds Max', level: 3, use: '3D modelling' },
  { name: 'V-Ray', level: 3, use: 'Rendering' },
];

const COMPETENCIES = [
  'Architectural Design', 'Interior Design', 'Working Drawings', 'Project Coordination', 'Site Coordination',
  'Residential & Hospitality Design', 'Client & Consultant Coordination', 'Presentation Drawings & AI Renders',
];

const EXTRAS = {
  Languages: ['English', 'Hindi', 'Marathi'],
  Achievements: ['HPCL Gold Medal — 100m dash', 'Super Division Football', 'District Level Gymnastics'],
  Involvement: ['NASA ANDC', 'Metal sculpting', 'Siporex modelling'],
  Interests: ['Football', 'Athletics', 'Badminton', 'Guitar', 'Drums', 'Sketching'],
};

/* Projects — order = catalog order.
   blocks: the project page is built from these, top to bottom.
     {text: [heading, body]}            text block
     {img: 'name', cap: 'caption'}      full-width image
     {pair: ['a','b'], cap: [...]}       two images side by side
*/
const PROJECTS = [
  {
    slug: 'regalia-residences', name: 'Regalia Residences', type: 'Residential', year: '2026',
    color: '#6f675d', cover: 'regalia-1', scale: 'G+8 podium · 21 floors',
    meta: { Office: 'Talati & Partners LLP', Client: 'Puri Creators', Location: 'Mumbai', Date: 'Jan 2026 — Aug 2026', Scope: 'Designing & Planning', Role: 'Architect' },
    lead: ['Shaping the Skyline', 'Contributed to the elevation design of a residential development by Puri Creators, Mumbai, comprising a G+8 podium and 21 residential floors. The project also includes Jodi apartments and curated podium and terrace amenities.'],
    blocks: [
      { img: 'regalia-6', cap: 'Street elevation at dusk' },
      { text: ['Breaking the Horizontal', 'A key challenge was the dominance of horizontal bands across the façade, which made the structure appear more horizontal than vertical. The design evolved to introduce a strong vertical element with integrated profile lighting, visually drawing the eye upward and enhancing the tower’s slenderness. The podium was then tapered to create a continuous flow of the horizontal bands, balancing the façade while reinforcing its vertical expression.'] },
      { pair: ['regalia-5', 'regalia-2'], cap: ['Tower at dusk', 'Façade detail'] },
      { text: ['Curating the Arrival', 'The driveway was envisioned as a modern and refined arrival experience. Cladded columns, marble-finished walls, fluted panels and layered planters enhance the visual character, while a contemporary ceiling detail complements the curved RCC profile, with moulding integrated into the beam.'] },
      { img: 'regalia-3', cap: 'Arrival driveway' },
      { text: ['A Green Crown', 'The tower culminates in a landscaped rooftop amenity. Solar panels, integrated planters and a strong architectural frame create a refined crown that adds both sustainability and visual identity to the skyline.'] },
      { img: 'regalia-4', cap: 'Aerial view — rooftop amenity' },
      { pair: ['regalia-plan', 'regalia-site'], cap: ['Fig 1.1 Typical floor plan', 'Fig 1.2 Ground floor plan'], drawing: true },
    ],
  },
  {
    slug: 'mon-repos', name: 'Mon Repos', type: 'Residential', year: '2026',
    color: '#2d3446', cover: 'monrepos-1', scale: 'G+7 podium · 26 floors',
    meta: { Office: 'Talati & Partners LLP', Client: 'Yog Group', Location: 'Bandstand, Mumbai', Date: 'Jan 2026 — Aug 2026', Scope: 'Designing & Planning', Role: 'Architect' },
    lead: ['A Coastal Landmark', 'Mon Repos is a luxury sea-facing residence at Mumbai’s Bandstand, comprising a G+7 podium, amenity floor and 26 residential floors. The design combines refined contemporary architecture, expansive balconies and lush landscaping to maximise sea views, natural light and privacy — an elegant landmark next to Mannat.'],
    blocks: [
      { img: 'monrepos-3', cap: 'Green podium' },
      { text: ['Grounded in Function', 'The ground and podium floors establish a seamless transition between arrival, amenities and landscape. Carefully planned circulation, services and shared spaces create an efficient base, while landscaped edges soften the podium and connect the building to its coastal setting.'] },
      { pair: ['monrepos-plan', 'monrepos-section'], cap: ['Fig 2.3 Amenity floor plan', 'Fig 2.5 Schematic section'], drawing: true },
      { text: ['Elevating the Horizon', 'The façade creates a strong vertical identity through a central structural frame that contrasts with layered horizontal balconies. Deep terraces, integrated greenery and generous glazing add depth and rhythm, while the tapered podium anchors the tower.'] },
      { pair: ['monrepos-5', 'monrepos-4'], cap: ['Tower elevation', 'Balcony detail'] },
      { img: 'monrepos-6', cap: 'Amenity deck & pool' },
      { img: 'monrepos-2', cap: 'Crown study' },
    ],
  },
  {
    slug: 'bhaktiyog', name: 'Bhaktiyog', type: 'Residential', year: '2026',
    color: '#9a9a9a', cover: 'bhaktiyog-1', scale: 'Members’ & Sales Towers',
    meta: { Office: 'Talati & Partners LLP', Client: 'Sugee Group', Location: 'Borivali, Mumbai', Date: 'Jan 2026 — Aug 2026', Scope: 'Designing & Planning', Role: 'Architect' },
    lead: ['Designed for Privacy', 'Bhaktiyog is a redevelopment project in Borivali by Sugee Group, comprising a dedicated Members’ Tower and Sales Tower. The design prioritises privacy through carefully planned orientations and openings, ensuring minimal visual overlooking between residences, while shared amenities and landscaped spaces balance community and comfort.'],
    blocks: [
      { img: 'bhaktiyog-2', cap: 'Night view' },
      { pair: ['bhaktiyog-3', 'bhaktiyog-typical'], cap: ['Aerial view', 'Fig 3.3 Typical floor plans'] },
      { pair: ['bhaktiyog-plan', 'bhaktiyog-amenity'], cap: ['Fig 3.1 Ground floor plan', 'Fig 3.6 Amenity floor plan'], drawing: true },
    ],
  },
  {
    slug: 'iconiqa-hotel', name: 'ICONIQA Hotel', type: 'Hospitality', year: '2025',
    color: '#5b5fa8', cover: 'iconiqa-1', scale: '35,000 sq.ft. · 5-Star',
    credit: '© 2025, ICONIQA Hotels and Resorts by Royal Orchid Hotels',
    meta: { Office: 'Design Oltre Orizzonte', Client: 'Royal Orchid Hotels Ltd.', Location: 'Mumbai International Airport', Date: 'Sep 2024 — Oct 2025', Scope: 'Ground & First floor', Role: 'Project Manager' },
    lead: ['Managing Excellence on Site', 'At the ICONIQA 5-Star Hotel near Mumbai International Airport, I led the on-site execution of a luxury hospitality project — coordinating design efforts and resolving MEP challenges to maintain quality, while managing schedules, team coordination and material logistics for timely delivery.'],
    blocks: [
      { img: 'iconiqa-plan', cap: 'Fig 4.1 Ground floor plan — Aviator Lounge, Reception Lobby, Banquet & Pre-function', drawing: true },
      { text: ['The Aviator Lounge', 'The lounge greets guests with a double-height ceiling and a dramatic mirror-laminate centrepiece. I oversaw execution of the bar counter, marble flooring, bespoke high tables and furniture; the stepped ceiling and ambient lighting create a sophisticated yet welcoming atmosphere.'] },
      { img: 'iconiqa-2', cap: 'The Aviator Lounge' },
      { img: 'iconiqa-bar', cap: 'Fig 4.2 Bar unit elevation & section', drawing: true },
      { text: ['About the Desk & Lobby', 'The reception features a statement desk with a marble-over-marble profile, its front clad in Bisazza tiles — a focal point and a challenge in flawless transitions. I orchestrated fabrication and site execution to achieve high precision and material integration.'] },
      { img: 'iconiqa-3', cap: 'Reception lobby' },
      { pair: ['iconiqa-4', 'iconiqa-8'], cap: ['Entrance lobby', 'Lounge chair detail'] },
      { text: ['The Illuminated Grandeur', 'The banquet hall features tall, custom arched wall panels, each precisely fabricated and bordered with subtle mouldings. Soft LED lighting highlights the shapes; the pre-function hall pairs black tinted mirror arches with 12-foot doors in bespoke mouldings.'] },
      { pair: ['iconiqa-5', 'iconiqa-7'], cap: ['Arched LED wall panels', 'Banquet hall'] },
      { img: 'iconiqa-6', cap: 'Pre-function hall' },
    ],
  },
  {
    slug: 'tilak-niwas', name: 'Tilak Niwas', type: 'Residential', year: '2024',
    color: '#5b7bc4', cover: 'tilak-1', scale: '2+8 storeys · 1 flat / floor',
    meta: { Office: 'Associated Architects', Client: 'Yogi Hotels Pvt. Ltd.', Location: 'Chembur, Mumbai', Date: 'Aug 2023 — Jul 2024', Scope: 'GFC drawings & detailing', Role: 'Junior Architect' },
    lead: ['Designing an Urban Home', 'Tilak Niwas is a premium 2+8 storey residence in Chembur, designed for the Bahri family with one exclusive flat per floor. I delivered GFC drawings, terrace-level plans and detail sections, performed on-site gala dimension checks and coordinated with RCC and MEP consultants.'],
    blocks: [
      { pair: ['tilak-section', 'tilak-2'], cap: ['Fig 5.1 Typical section', 'Side elevation'], drawing: true },
      { text: ['Distinctive Form & Living', 'Arched terrace roofs, curved walls and flanked columns bring movement and elegance, while brick cladding and continuous flowerbeds add warmth. A rooftop infinity pool and gym crown the project.'] },
      { img: 'tilak-plan', cap: 'Fig 5.2 Typical floor plan', drawing: true },
      { img: 'tilak-elev', cap: 'Fig 5.5 West elevation — terrace level', drawing: true },
    ],
  },
  {
    slug: 'seabird-logistics', name: 'Seabird Logistics Center', type: 'Commercial', year: '2024',
    color: '#7a4f3a', cover: 'seabird-2', scale: 'Office + warehouse',
    meta: { Office: 'Associated Architects', Client: 'Seabird Marine Services Pvt. Ltd.', Location: 'Surat', Date: 'Sep 2023 — Jul 2024', Scope: 'Concept to technical detailing', Role: 'Junior Architect' },
    lead: ['Concept to Craftsmanship', 'I shaped the Seabird Logistics Center from conceptualisation through design development — 3D visualisation, rendered elevations and technical details — guiding the project with the client to merge operational needs with thoughtful architectural expression.'],
    blocks: [
      { img: 'seabird-1', cap: 'Fig 6.1 South elevation' },
      { img: 'seabird-section', cap: 'Fig 6.6 Section D–D', drawing: true },
      { text: ['Design Development', 'Both linear and curved forms were explored, experimenting with metal decking slabs, dry walls and brickwork. The façade was developed through detailed studies into a robust yet elegant structure with integrated office and parking functions.'] },
      { pair: ['seabird-plan', 'seabird-2'], cap: ['Fig 6.3 Ground floor plan', 'Fig 6.5 3D design option'] },
    ],
  },
  {
    slug: 'sampoorna', name: 'Sampoorna', type: 'Residential', year: '2024',
    color: '#7a1f3d', cover: 'sampoorna-1', scale: '2+8 storeys',
    meta: { Office: 'Associated Architects', Client: 'Dr. Prasad Mahadevan', Location: 'Mumbai', Date: 'Sep 2023 — Jul 2024', Scope: 'Working drawings & detailing', Role: 'Junior Architect' },
    lead: ['Shaping Residential Experiences', 'On Sampoorna, a 2+8 storey residential building, I contributed through precise working drawings and detailed design — from curved balconies and staircase punctures to overhung slabs, lobby, podium and ground-level layouts, and compound wall details.'],
    blocks: [
      { pair: ['sampoorna-plan', 'sampoorna-elev'], cap: ['Fig 7.1 Typical floor plan', 'Fig 7.6 East elevation'], drawing: true },
      { text: ['Technical Detailing & Sunlight', 'I detailed the staircase elevation to optimise natural sunlight into the stair well, positioning punctures and designing openings that bring both visual appeal and functional daylight to the vertical circulation.'] },
      { pair: ['sampoorna-2', 'sampoorna-3'], cap: ['Fig 7.2 First podium level', 'Fig 7.3 Metal deck slab, second podium'] },
    ],
  },
  {
    slug: 'udipi-vihar', name: 'Udipi Vihar', type: 'Residential', year: '2024',
    color: '#b04fa6', cover: 'udipi-1', scale: '8 & 15 storeys + hotel G+8',
    meta: { Office: 'Associated Architects', Client: 'Sai Palace Group of Hotels', Location: 'Mumbai', Date: 'Sep 2023 — Jul 2024', Scope: 'Podium layouts & approvals', Role: 'Junior Architect' },
    lead: ['Integrated Residential & Hospitality', 'A multi-storey residential complex paired with an adjoining banquet and hotel facility. The residential towers rise to 8 and 15 storeys and the hotel to G+8. I handled podium-level layouts, presentation drawings and compliance with UDCPR and DCPR regulations.'],
    blocks: [
      { img: 'udipi-site', cap: 'Fig 8.1 Site plan', drawing: true },
    ],
  },
  {
    slug: 'starhub', name: 'StarHub', type: 'Commercial', year: '2022',
    color: '#b05ab0', cover: 'starhub-1', scale: 'Studio interior',
    meta: { Office: 'RL Narayan & Associates', Client: 'QYUKI Digital Media', Location: 'Mumbai', Date: 'Nov 2021 — Apr 2022', Scope: 'Interior execution', Role: 'Intern' },
    lead: ['Collaborative Studio Execution', 'I created detailed drawings and marked plans for high-energy studio spaces — the entertainment studio, director’s cabin and workstations — coordinating closely with contractors and design teams for efficient execution and real-time problem-solving.'],
    blocks: [
      { img: 'starhub-plan', cap: 'Fig 9.1 Interior floor plan', drawing: true },
      { img: 'starhub-elev', cap: 'Fig 9.3 Cabin elevation', drawing: true },
    ],
  },
  {
    slug: 'anglo-eastern', name: 'Anglo-Eastern', type: 'Commercial', year: '2022',
    color: '#3b4ea0', cover: 'anglo-1', scale: 'Training institute',
    meta: { Office: 'RL Narayan & Associates', Client: 'Anglo-Eastern Shipping Company', Location: 'Mumbai', Date: 'Nov 2021 — Apr 2022', Scope: 'Site execution', Role: 'Intern' },
    lead: ['Site Execution', 'Working under the project manager, I helped execute a training institute and control room facility — simulator rooms, workstations, lecture halls, labs and AV spaces — through site supervision, multidisciplinary coordination and hands-on resolution of design and construction issues.'],
    blocks: [
      { pair: ['anglo-2', 'anglo-3'], cap: ['Fluted wall panelling', 'Fig 10.1 Control room'] },
      { img: 'anglo-plan', cap: 'Fig 10.3 Control room plan', drawing: true },
      { img: 'anglo-4', cap: 'Fig 10.2 Workstation detail' },
    ],
  },
];

const IMG = (n) => `assets/img/${n}.jpg`;
const projectImages = (p) => {
  const s = new Set([p.cover]);
  p.blocks.forEach((b) => { if (b.img) s.add(b.img); if (b.pair) b.pair.forEach((x) => s.add(x)); });
  return [...s];
};
