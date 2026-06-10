/* ============================================================
   VESTA LIVING — Merkvoorstel · interactive deck
   Data-driven chapters + WAAPI page transitions
   ============================================================ */

/* ---------- DOM helpers ---------- */
const $ = (s, c = document) => c.querySelector(s);

/* ---------- Iconsax-style icons (outline, rounded) ---------- */
const ICONS = {
  flag: `<path d="M6 21V3.4"/><path d="M6 4.3h10.4c.55 0 .85.62.5 1.05L15.1 8l1.8 2.65c.35.43.05 1.05-.5 1.05H6"/>`,
  brush: `<path d="M8.8 14.6c-1.4 0-2.5 1.1-2.5 2.5 0 1-.6 1.7-1.5 2 .8.85 2 1.45 3.4 1.45 2 0 3.6-1.6 3.6-3.6 0-1.55-1.1-2.35-3-2.35z"/><path d="M11.1 13.7 19.4 5.4c.6-.6.6-1.55 0-2.15-.6-.6-1.55-.6-2.15 0L8.7 11.5"/>`,
  buildings: `<path d="M3 21h18"/><path d="M6 21V4.4l7-1.4V21"/><path d="M13 21V8.4l5 1.2V21"/><path d="M8.8 7.4h1.6M8.8 10.8h1.6M8.8 14.2h1.6"/>`,
  share: `<path d="M4 20.5V8.6C4 6.1 6 4.1 8.5 4.1h7C18 4.1 20 6.1 20 8.6v3.9c0 2.5-2 4.5-4.5 4.5H7.9L4 20.5z"/><path d="M8.4 10.4h.01M12 10.4h.01M15.6 10.4h.01"/>`,
  sitemap: `<rect x="3" y="4.6" width="18" height="12.3" rx="2.2"/><path d="M3 8.5h18"/><path d="M5.8 6.5h.01M8 6.5h.01"/><path d="M9.5 20.4h5M12 16.9v3.5"/>`,
  phase: `<rect x="3.5" y="5" width="17" height="15.5" rx="2.6"/><path d="M8 3.2v3.7M16 3.2v3.7M3.5 10.1h17"/><path d="M9 15.1l2.1 2 3.9-4"/>`,
  arrow: `<path d="M4.6 12h14.2"/><path d="M13 6.2l6 5.8-6 5.8"/>`,
  tick: `<path d="M5 12.6l4.4 4.4L19 7.4"/>`,
};
const icon = (n) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;

/* ---------- component builders ---------- */
const eyebrow = (txt, mod = "") => `<span class="eyebrow ${mod}" data-reveal>${txt}</span>`;

const onderdeelHead = (ic, kicker, title) => `
  <div class="onderdeel-head" data-reveal>
    <div class="icbadge icbadge--lg">${icon(ic)}</div>
    <div>
      <span class="meta-k">${kicker}</span>
      <h2 class="title">${title}</h2>
    </div>
  </div>`;

const kpGrid = (items) => `
  <div class="kp-grid block">
    ${items.map(([t, d]) => `
      <div class="kp" data-reveal>
        <span class="kp__ic">${icon("tick")}</span>
        <div class="kp__b"><strong>${t}</strong><span>${d}</span></div>
      </div>`).join("")}
  </div>`;

const deliver = (v) => `
  <div class="deliver" data-reveal>
    <span class="deliver__k">Oplevering</span>
    <span class="deliver__v">${v}</span>
  </div>`;

/* ============================================================
   CHAPTERS  (onderdelen order: A B D E C  →  relettered A B C D E)
   ============================================================ */
const CHAPTERS = [
  /* ---------- 0 · COVER ---------- */
  {
    id: "cover",
    nav: "Voorblad",
    num: "",
    render: () => `
      <div class="cover">
      ${eyebrow("Merkvoorstel · Fase 1 · Branding")}
        <h1 class="display" data-reveal>Vesta&nbsp;Living</h1>
        <p class="lead" data-reveal>
          Eén sterk, professioneel merk dat overtuigt richting huurders, <strong>gemeentes</strong> en
          <strong>marktpartijen</strong>. <strong>Kopieerbaar</strong> naar nieuwe franchisegebieden. Dit voorstel legt het
          <strong>fundament</strong> van Vesta Living op <strong>communicatief</strong> en <strong>visueel</strong> vlak | fysiek en digitaal.
        </p>

        <div class="cover-cta" data-reveal>
          <button class="btn" data-go="1">
            Bekijk het voorstel
            <span class="btn__circ">→</span>
          </button>
          <small>12 hoofdstukken · klik je erdoorheen of gebruik ← →</small>
        </div>

        <dl class="cover__meta" data-reveal>
          <div><dt>Voor</dt><dd>Rob Ranzijn &amp; Aroen Thakoeri</dd></div>
          <div><dt>Van</dt><dd>Rob Huttinga · Mooi Bekeken</dd></div>
          <div><dt>Datum</dt><dd>10 juni 2026</dd></div>
          <div><dt>Scope</dt><dd>Branding &amp; merkcommunicatie</dd></div>
        </dl>
      </div>`,
  },

  /* ---------- 1 · AANLEIDING & DOEL ---------- */
  {
    id: "aanleiding",
    nav: "Aanleiding & doel",
    num: "01",
    render: () => `
      ${eyebrow("Hoofdstuk 01")}
      <h2 class="title" data-reveal>Aanleiding &amp; doel</h2>
      <p class="lead" data-reveal>
        Vesta Living ontwikkelt nieuwe woonruimte uit bestaand vastgoed. Inmiddels <strong>8 à 9 projecten
        in uitvoering</strong> en de eerste huurders in <strong>augustus</strong>. De ambitie is groot;
        het merk loopt daar nu op achter.
      </p>

      <div class="block" data-reveal>
        <div class="contrast">
          <div class="contrast__col contrast__col--now">
            <div class="contrast__k">Het merk nu</div>
            <ul>
              <li>Communicatie naar de doelgroepen ontbreekt of schiet tekort</li>
              <li>Snel met een AI-generator gebouwde website</li>
              <li>Nog geen consistente uitstraling</li>
            </ul>
          </div>
          <div class="contrast__arrow">→</div>
          <div class="contrast__col contrast__col--next">
            <div class="contrast__k">Waar we naartoe gaan</div>
            <ul>
              <li>Professioneel richting gemeentes &amp; markt</li>
              <li>Huurders rechtstreeks binnenhalen</li>
              <li>Eén merk, kopieerbaar naar franchisegebieden</li>
            </ul>
          </div>
        </div>
      </div>

      <p class="fineprint" data-reveal>
        Dit voorstel betreft uitsluitend <strong>branding, merkcommunicatie en positionering</strong>.
      </p>`,
  },

  /* ---------- 2 · SCOPE ---------- */
  {
    id: "scope",
    nav: "Scope in één oogopslag",
    num: "02",
    render: () => `
      ${eyebrow("Hoofdstuk 02")}
      <h2 class="title" data-reveal>Scope in één oogopslag</h2>
      <p class="lead" data-reveal>Vijf onderdelen die samen het merkfundament vormen: communicatief, visueel, fysiek en online.</p>

      <div class="scope-grid block">
        ${[
          ["A", "flag", "Merkpositionering &amp; communicatieplan", "Het communicatieve fundament: doelgroepen, pijnpunten en pijlers."],
          ["B", "brush", "Volledige branding &amp; huisstijl", "Geprofessionaliseerd logo en een compleet visueel systeem."],
          ["C", "buildings", "Fysieke merkdragers", "Visitekaartjes, signage en muurbedrukking voor op de gebouwen."],
          ["D", "share", "Social media-opzet", "Alle kanalen ingericht: banners, bio's en profielfoto's."],
          ["E", "sitemap", "Sitemap &amp; websitestructuur", "De blauwdruk voor de website en de paginastructuur."],
        ].map(([L, ic, t, d]) => `
          <div class="card scope" data-reveal>
            <div class="scope__top">
              <div class="icbadge icbadge--md">${icon(ic)}</div>
              <span class="scope__k">${L}</span>
            </div>
            <div class="scope__t">${t}</div>
            <div class="scope__d">${d}</div>
          </div>`).join("")}
      </div>`,
  },

  /* ---------- 3 · ONDERDEEL A — Merkpositionering ---------- */
  {
    id: "onderdeel-a",
    nav: "A · Merkpositionering",
    num: "03",
    render: () => `
      ${onderdeelHead("flag", "Onderdeel A · Hoofdstuk 03", "Merkpositionering &amp; communicatieplan")}
      <p class="lead" data-reveal>
        Het fundament onder alles. We leggen vast wie Vesta is, voor wie, en waarom partijen voor Vesta kiezen.
        Zonder het operationele recept prijs te geven aan concurrenten.
      </p>
      ${kpGrid([
        ["Merkfundament", "Kernverhaal, missie, visie, merkwaarden en merkbelofte."],
        ["Doelgroepanalyse", "Per groep de pijnpunten en de gewenste uitkomst."],
        ["Communicatiepijlers", "3 à 4 vaste thema's waarop alle communicatie rust."],
        ["Tone-of-voice", "Zakelijk richting gemeente, warm richting huurder. Eén merk."],
      ])}
      ${deliver("Merk- &amp; communicatieplan")}`,
  },

  /* ---------- 4 · ONDERDEEL B — Branding ---------- */
  {
    id: "onderdeel-b",
    nav: "B · Branding & huisstijl",
    num: "04",
    render: () => `
      ${onderdeelHead("brush", "Onderdeel B · Hoofdstuk 04", "Volledige branding &amp; huisstijl")}
      <p class="lead" data-reveal>
        Een compleet, consistent visueel systeem dat Vesta overal direct herkenbaar maakt. Ontworpen om
        óók fysiek te werken: als sticker of spray op gevels en deuren.
      </p>
      ${kpGrid([
        ["Logo-redesign", "Schaalbaar beeldmerk. Full-colour én als stencil."],
        ["Sub-merk-systeem", "Vesta Urban, Pro en Care. Klaar voor franchise."],
        ["Kleur, typografie &amp; beeldstijl", "Inclusief fotografie-richtlijnen."],
        ["Styleguide &amp; templates", "Merkhandboek, basis-templates en social media-templates."],
      ])}
      ${deliver("Logo-pakket + styleguide + templates")}`,
  },

  /* ---------- 5 · ONDERDEEL C — Fysieke merkdragers (was D) ---------- */
  {
    id: "onderdeel-c",
    nav: "C · Fysieke merkdragers",
    num: "05",
    render: () => `
      ${onderdeelHead("buildings", "Onderdeel C · Hoofdstuk 05", "Fysieke merkdragers")}
      <p class="lead" data-reveal>
        Het merk fysiek zichtbaar maken, met verschillende fysieke touchpoints.
      </p>
      ${kpGrid([
        ["Visitekaartjes", "Ontwerp, drukklaar."],
        ["Briefpapier &amp; e-mail", "Briefpapier en e-mailhandtekening in huisstijl."],
        ["Muurbedrukking &amp; signage", "Plan en voorbeelden voor Vesta muurbedrukking en signage, voor binnen en buiten."],
      ])}
      ${deliver("Ontwerpen + mockups van genoemde merkdragers")}`,
  },

  /* ---------- 6 · ONDERDEEL D — Social media (was E) ---------- */
  {
    id: "onderdeel-d",
    nav: "D · Social media",
    num: "06",
    render: () => `
      ${onderdeelHead("share", "Onderdeel D · Hoofdstuk 06", "Social media-opzet")}
      <p class="lead" data-reveal>
        Volledige inrichting van de social-aanwezigheid, zodat alle doelgroepen Vesta makkelijk vinden.
      </p>
      ${kpGrid([
        ["Accounts ingericht", "Zoals Instagram, Facebook en LinkedIn."],
        ["Profielfoto's &amp; banners", "Per kanaal, volledig in huisstijl."],
        ["Bio's op de doelgroep", "Per kanaal afgestemd."],
        ["Canva ready templates", "Kant-en-klare templates die je direct kunt inzetten."],
      ])}
      ${deliver("Ingerichte kanalen + assets + ready-to-use Canva-omgeving")}`,
  },

  /* ---------- 7 · ONDERDEEL E — Sitemap (was C) ---------- */
  {
    id: "onderdeel-e",
    nav: "E · Sitemap & structuur",
    num: "07",
    render: () => `
      ${onderdeelHead("sitemap", "Onderdeel E · Hoofdstuk 07", "Sitemap &amp; websitestructuur")}
      <p class="lead" data-reveal>
        De blauwdruk voor de website: welke pagina's er komen en hoe elke pagina is opgebouwd.
        De exacte indeling bepalen we samen.
      </p>
      ${kpGrid([
        ["Pagina's &amp; opbouw", "Welke pagina's, en de layout per pagina."],
        ["Informatiestructuur", "Wat staat waar, met welk doel, per pagina."],
        ["Communicatiestrategie", "De pijlers vertaald naar elke pagina."],
        ["Contactmomenten", "Strategisch geplaatst per doelgroep."],
      ])}
      ${deliver("Sitemap + structuur- en contentplan")}`,
  },

  /* ---------- 8 · PLANNING ---------- */
  {
    id: "planning",
    nav: "Planning & fasering",
    num: "08",
    render: () => `
      ${eyebrow("Hoofdstuk 08", "eyebrow--amber")}
      <h2 class="title" data-reveal>Planning &amp; fasering</h2>
      <p class="lead" data-reveal>
        De doorlooptijd is <strong>maximaal 10 weken</strong>. Gezien het tijdpad richting augustus
        stel ik een <strong>gefaseerde oplevering</strong> voor, zodat er onderweg al waarde staat.
      </p>

      <div class="timeline block">
        <div class="sprint" data-reveal>
          <div class="sprint__no">01</div>
          <div class="sprint__body"><strong>Merkpositionering &amp; logo-redesign</strong><span>Het fundament eerst.</span></div>
          <div class="sprint__when">Week 1-3</div>
        </div>
        <div class="sprint" data-reveal>
          <div class="sprint__no">02</div>
          <div class="sprint__body"><strong>Huisstijl, styleguide &amp; sitemap</strong><span>Het merk tot een compleet systeem.</span></div>
          <div class="sprint__when">Week 4-7</div>
        </div>
        <div class="sprint" data-reveal>
          <div class="sprint__no">03</div>
          <div class="sprint__body"><strong>Fysieke merkdragers &amp; social</strong><span>Laatste onderdelen live, plus oplevering van alle assets.</span></div>
          <div class="sprint__when">Week 8-10</div>
        </div>
      </div>

      <div class="callout" data-reveal>
        <span class="callout__icon">🎯</span>
        <p><strong>Prioriteit richting augustus:</strong> logo, uitstraling en social-kanalen eerst live.
        Het volledige merksysteem wordt parallel afgerond.</p>
      </div>`,
  },

  /* ---------- 9 · BUITEN SCOPE ---------- */
  {
    id: "buiten-scope",
    nav: "Wat er niet in zit",
    num: "09",
    render: () => `
      ${eyebrow("Hoofdstuk 09")}
      <h2 class="title" data-reveal>Wat hier (nog) niet in zit</h2>
      <p class="lead" data-reveal>Voor de duidelijkheid: dit valt buiten dit voorstel, maar staat wél op de roadmap.</p>

      <div class="exclude block">
        ${[
          ["Bouw &amp; development van de website", "Apart traject, voortbouwend op de sitemap (onderdeel E)."],
          ["Productiekosten", "Drukwerk, gevelsignage en fotografie."],
          ["Andere ontwerpen", "Andere fysieke merkdragers en uitingen buiten deze scope."],
        ].map(([t, d]) => `
          <div class="exclude__row" data-reveal>
            <span class="exclude__mark">${icon("arrow")}</span>
            <div class="exclude__body"><strong>${t}</strong><span>${d}</span></div>
          </div>`).join("")}
      </div>`,
  },

  /* ---------- 10 · VERVOLG ---------- */
  {
    id: "vervolg",
    nav: "Vervolg",
    num: "10",
    render: () => `
      ${eyebrow("Hoofdstuk 10", "eyebrow--sage")}
      <h2 class="title" data-reveal>Vervolg</h2>
      <p class="lead" data-reveal>
        Na akkoord plannen we een <strong>fysieke strategiesessie</strong>. Een eerste brainstorm om Vesta Living
        scherp te krijgen: wat jullie doen, voor wie, en wat jullie onderscheidt.
      </p>

      <div class="steps block">
        <div class="step" data-reveal>
          <div class="step__no">1</div>
          <div class="step__body"><strong>Akkoord op dit voorstel</strong><span>70% aanbetaling, 30% eindbetaling bij oplevering.</span></div>
        </div>
        <div class="step" data-reveal>
          <div class="step__no">2</div>
          <div class="step__body"><strong>Fysieke strategiesessie</strong><span>Een eerste brainstorm: Vesta Living, de doelgroepen en het verhaal in kaart.</span></div>
        </div>
        <div class="step" data-reveal>
          <div class="step__no">3</div>
          <div class="step__body"><strong>Start van de uitwerking</strong><span>We starten de uitwerking van het merkfundament en de vijf onderliggende rubrieken.</span></div>
        </div>
      </div>`,
  },

  /* ---------- 11 · INVESTERING (finale) ---------- */
  {
    id: "investering",
    nav: "De investering",
    num: "11",
    finale: true,
    render: () => `
      ${eyebrow("Tot slot · De investering", "eyebrow--amber")}
      <h2 class="title" data-reveal>Dit krijg je voor één heldere prijs</h2>
      <p class="lead" data-reveal>
        Het complete merkfundament: communicatie, een professioneel logo en huisstijl, fysieke merkdragers,
        social-kanalen en de blauwdruk voor je website.
      </p>

      <div class="invest__recap block" data-reveal>
        <div class="recap-grid">
          ${[
            ["flag", "Merkpositionering", "Merk- &amp; communicatieplan"],
            ["brush", "Branding &amp; huisstijl", "Logo + styleguide + templates"],
            ["buildings", "Fysieke merkdragers", "Ontwerpen + productiegids"],
            ["share", "Social media-opzet", "Kanalen + assets + templates"],
            ["sitemap", "Sitemap &amp; structuur", "Sitemap + structuurplan"],
            ["phase", "Gefaseerde oplevering", "Prioriteit richting augustus"],
          ].map(([ic, t, d]) => `
            <div class="recap">
              <span class="icbadge icbadge--sm">${icon(ic)}</span>
              <div class="recap__t"><strong>${t}</strong><span>${d}</span></div>
            </div>`).join("")}
        </div>
      </div>

      <div class="price-card" data-reveal>
        <div class="price-card__top">
          <div class="price-card__k">Totale investering</div>
          <div class="price-card__amount">4.500<span class="price-card__cur">,&ndash;</span></div>
          <p class="price-card__note">Eén vaste prijs voor het complete merkfundament. Onderdeel A t/m E, inclusief de gefaseerde oplevering richting augustus.</p>
        </div>
        <div class="price-card__bottom">
          <div class="price-meta"><dt>Betaling</dt><dd>70% aanbetaling · 30% bij oplevering</dd></div>
          <div class="price-meta"><dt>Doorlooptijd</dt><dd>Max. 10 weken, gefaseerd</dd></div>
        </div>
      </div>`,
  },

  /* ---------- 12 · OPTIONEEL — Webdesign & ontwikkeling ---------- */
  {
    id: "webdesign",
    nav: "Optioneel · Webdesign",
    num: "12",
    render: () => `
      ${eyebrow("Optioneel · Extra aanbod", "eyebrow--amber")}
      <h2 class="title" data-reveal>Webdesign &amp; ontwikkeling</h2>
      <p class="lead" data-reveal>
        Wil je de website ook meteen geregeld? Dan bouwen we hem er turnkey bij, voortbouwend op de
        sitemap en de branding uit dit voorstel.
      </p>
      ${kpGrid([
        ["Volledige website", "Snel, veilig en Google-indexeerbaar. Alle pagina's ontworpen én ontwikkeld (tot 8 hoofdpagina's)."],
        ["Live &amp; betrouwbaar", "Koppeling met je domein, snelle servers en 99,9% uptime."],
        ["Branding doorgevoerd", "Volledige implementatie van branding, communicatie en huisstijl."],
        ["Structuur doorgevoerd", "Volledige implementatie van sitemap, paginastructuur en content."],
        ["1 maand gratis support", "Technische support inbegrepen na oplevering."],
      ])}
      <div class="addon-price" data-reveal>
        <span class="addon-price__k">Meerprijs, bovenop de investering</span>
        <span class="addon-price__v">+&nbsp;1.200<span class="addon-price__cur">,&ndash;</span></span>
      </div>`,
  },
];

/* ============================================================
   ENGINE
   ============================================================ */
const stage = $("#stage");
const railList = $("#railList");
const dotsWrap = $("#dots");
const progressBar = $("#progressBar");
const prevBtn = $("#prevBtn");
const nextBtn = $("#nextBtn");
const prevLabel = $("#prevLabel");
const nextLabel = $("#nextLabel");
const curNum = $("#curNum");
const totNum = $("#totNum");

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let current = 0;

function buildChrome() {
  totNum.textContent = String(CHAPTERS.length - 1).padStart(2, "0");
  CHAPTERS.forEach((ch, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "rail__item";
    btn.dataset.idx = i;
    btn.innerHTML = `<span class="rail__num">${ch.num || "·"}</span><span class="rail__label">${ch.nav}</span>`;
    btn.addEventListener("click", () => { go(i); closeRail(); });
    li.appendChild(btn);
    railList.appendChild(li);

    const dot = document.createElement("button");
    dot.dataset.idx = i;
    dot.setAttribute("aria-label", ch.nav);
    dot.addEventListener("click", () => go(i));
    dotsWrap.appendChild(dot);
  });
}

function updateChrome() {
  railList.querySelectorAll(".rail__item").forEach((el, i) => {
    el.classList.toggle("is-active", i === current);
    el.classList.toggle("is-done", i < current);
  });
  dotsWrap.querySelectorAll("button").forEach((el, i) => {
    el.classList.toggle("is-active", i === current);
    el.classList.toggle("is-done", i < current);
  });
  progressBar.style.width = (current / (CHAPTERS.length - 1)) * 100 + "%";
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === CHAPTERS.length - 1;
  prevLabel.textContent = current > 0 ? CHAPTERS[current - 1].nav : "Vorige";
  nextLabel.textContent = current < CHAPTERS.length - 1 ? CHAPTERS[current + 1].nav : "Klaar";
  curNum.textContent = (CHAPTERS[current].num || "00").padStart(2, "0");
}

/* Entrance: one compositor-only animation per element (opacity + small translate).
   fill:'backwards' applies the hidden start-state through each element's delay,
   so the stagger reads cleanly with no flash and nothing reflows mid-motion. */
function animateIn(dir) {
  if (REDUCED) return;
  stage.querySelectorAll("[data-reveal]").forEach((el, i) => {
    el.animate(
      [
        { opacity: 0, transform: `translate3d(0, ${10 * dir}px, 0)` },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration: 500,
        delay: Math.min(i * 46, 340),
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "backwards",
      }
    );
  });
}

function render(dir, animate) {
  stage.innerHTML = CHAPTERS[current].render();
  stage.querySelectorAll("[data-go]").forEach((b) =>
    b.addEventListener("click", () => go(parseInt(b.dataset.go, 10)))
  );
  stage.parentElement.scrollTop = 0;
  if (animate && !REDUCED) animateIn(dir);
}

function go(idx) {
  if (idx === current || idx < 0 || idx >= CHAPTERS.length) return;
  const dir = idx > current ? 1 : -1;
  current = idx;
  history.replaceState(null, "", "#" + CHAPTERS[idx].id);
  updateChrome();
  render(dir, true);
}

/* bindings */
prevBtn.addEventListener("click", () => go(current - 1));
nextBtn.addEventListener("click", () => go(current + 1));
$("#brandHome").addEventListener("click", () => go(0));

document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); go(current + 1); }
  if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); go(current - 1); }
  if (e.key === "Home") go(0);
  if (e.key === "End") go(CHAPTERS.length - 1);
});

/* rail (mobile) */
const menuToggle = $("#menuToggle");
const railScrim = $("#railScrim");
function openRail() { document.body.classList.add("rail-open"); menuToggle.setAttribute("aria-expanded", "true"); }
function closeRail() { document.body.classList.remove("rail-open"); menuToggle.setAttribute("aria-expanded", "false"); }
menuToggle.addEventListener("click", () =>
  document.body.classList.contains("rail-open") ? closeRail() : openRail()
);
railScrim.addEventListener("click", closeRail);

/* swipe */
let tStartX = 0, tStartY = 0;
stage.addEventListener("touchstart", (e) => { tStartX = e.touches[0].clientX; tStartY = e.touches[0].clientY; }, { passive: true });
stage.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - tStartX;
  const dy = e.changedTouches[0].clientY - tStartY;
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) dx < 0 ? go(current + 1) : go(current - 1);
}, { passive: true });

/* boot — only animate the first paint once webfonts are loaded,
   so text metrics don't shift mid-animation (the main source of choppiness) */
buildChrome();
const fromHash = CHAPTERS.findIndex((c) => c.id === location.hash.slice(1));
current = fromHash > 0 ? fromHash : 0;
history.replaceState(null, "", "#" + CHAPTERS[current].id);
const fontsReady = !document.fonts || document.fonts.status === "loaded";
render(1, fontsReady);
updateChrome();
if (!fontsReady && document.fonts && !REDUCED) {
  document.fonts.ready.then(() => animateIn(1));
}
