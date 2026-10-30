/**
 * BRANIE — centraal configuratiebestand
 * ------------------------------------------------------------------
 * Bijna alles wat je wilt aanpassen staat hier: teksten, kleuren,
 * lettertypes, de pre-orderlink, de magazinecover en alle objecten
 * op de fotomuur (beeld, positie, formaat, rotatie, titel).
 *
 * Zie README.md → "Aanpassen" voor uitleg met voorbeelden.
 */

/* ------------------------------------------------------------------ */
/* Merk & teksten                                                      */
/* ------------------------------------------------------------------ */
export const brand = {
  name: 'BRANIE',
  payoff: 'Geen blad voor de mond, Amsterdam doet wat ie wil',
  slogan: 'Geen blad voor de mond.',
  /**
   * Het logo als SVG in src/assets/brand/. De kleur in het bestand doet
   * er niet toe: die kies je per plek met `logoColors` hieronder.
   * Laat leeg ('') om het logo als gewone tekst te tonen.
   */
  logo: 'branie-logo.svg',
  /** Breedte ÷ hoogte van het logo (uit de viewBox van de SVG). */
  logoAspect: 2543 / 718,
  /**
   * Kleur van het logo per plek: de naam van een kleur uit `colors`
   * (bijv. 'red', 'cream', 'bordeaux').
   */
  logoColors: {
    wall: 'cream', // over de fotomuur (intro)
    magazine: 'red', // in de magazinesectie
    poster: 'red', // op de 'in opbouw'-poster
  },
  /** Het rode sterretje (src/assets/brand/). */
  asterisk: 'asterisk.svg',
  /** Toont het rode sterretje naast het logo. */
  showAsterisk: true,
};

export const magazine = {
  eyebrow: 'Nº 01 · Amsterdam 1950 tot nu',
  slogan: 'Geen blad voor de mond.',
  intro:
    'Amsterdam verandert. De mensen, de straten, de verhalen. BRANIE brengt het Amsterdam van vroeger en nu samen, verteld door de mensen die de stad maken.',
  closing: "Een magazine voor iedereen met Amsterdam in z'n hart.",
};

/* ------------------------------------------------------------------ */
/* Lancering & 'in opbouw'-pagina                                      */
/* ------------------------------------------------------------------ */
export const launch = {
  /**
   * true  → de live website (main-branch op Vercel) toont de
   *          'in opbouw'-pagina. Previews tonen gewoon de volledige site.
   * false → de volledige site gaat live. Dit is de lanceringsknop.
   *
   * Tip: zet ?binnenkort achter een URL om de 'in opbouw'-pagina altijd
   * te bekijken, bijvoorbeeld op een preview of lokaal.
   */
  comingSoonOnProduction: true,
};

export const comingSoon = {
  /** Optionele regels; laat leeg ('') om ze niet te tonen. */
  eyebrow: '',
  heading: 'Het magazine over Amsterdam',
  text: 'Over het Amsterdam van vroeger en nu, verteld door de mensen die de stad maken. Het eerste nummer ligt bijna op de drukpers.',
  stamp: 'Binnenkort',
  stampSmall: '', // kleine regel boven 'Binnenkort' (leeg = niet tonen)
  /**
   * Objecten rond de poster. `id` verwijst naar een object uit
   * `wallItems` hieronder (zelfde beeld/inhoud), met hier een eigen
   * positie. Zelfde canvas en regels als de fotomuur.
   */
  wall: [
    { id: 'posterwand', desktop: { x: -40, y: -36, w: 262, r: 0.8, z: 2 }, mobile: { x: -70, y: -50, w: 240, r: 1, z: 2 } },
    { id: 'verandert', desktop: { x: 262, y: 36, w: 230, h: 304, r: -1.6, z: 2 } },
    { id: 'fiat', desktop: { x: 1110, y: 40, w: 300, r: 1.4, z: 3 }, mobile: { x: 220, y: -90, w: 360, r: -2, z: 2 } },
    { id: 'dorpsbranie', desktop: { x: 1430, y: -40, w: 210, r: 2.4, z: 2 }, mobile: { x: 590, y: -60, w: 220, r: 3, z: 1 } },
    { id: 'amsterdammertje', desktop: { x: 120, y: 410, w: 170, r: 2, z: 3 } },
    { id: 'sinds-1950', desktop: { x: 250, y: 650, w: 240, h: 320, r: -1.2, z: 2 }, mobile: { x: 310, y: 1120, w: 240, h: 310, r: 1.5, z: 2 } },
    { id: 'mandje', desktop: { x: 1150, y: 420, w: 210, r: -1, z: 3 }, mobile: { x: 40, y: 1130, w: 230, r: -1.5, z: 3 } },
    { id: 'matcha', desktop: { x: 1390, y: 650, w: 240, h: 312, r: 1.6, z: 2 }, mobile: { x: 590, y: 1150, w: 230, h: 300, r: -2, z: 2 } },
    { id: 'melk', desktop: { x: -30, y: 690, w: 220, r: -2.5, z: 2 } },
  ],
};

/* ------------------------------------------------------------------ */
/* Pre-order                                                           */
/* ------------------------------------------------------------------ */
export const preorder = {
  label: 'PRE-ORDER BRANIE',
  /**
   * Zet hier de URL van de bestelpagina, bijvoorbeeld
   * 'https://www.branie.nl/pre-order'. Zolang dit leeg is, laat de knop
   * duidelijk zien dat bestellen nog niet kan.
   */
  url: '',
  /** Opent de bestelpagina in een nieuw tabblad. */
  openInNewTab: false,
  comingSoonBadge: 'Binnenkort',
  comingSoonNote: 'Bestellen kan nog niet: de pre-order opent binnenkort.',
};

/* ------------------------------------------------------------------ */
/* Huisstijl                                                           */
/* ------------------------------------------------------------------ */
/**
 * Kleuren worden als CSS-variabelen op de pagina gezet
 * (bijv. `red` → `var(--color-red)`).
 */
export const colors = {
  red: '#e10000', // BRANIE-rood (sterretje, accenten, knop)
  bordeaux: '#7b0b00', // logo en koppen
  cream: '#fdfbf5', // achtergrond magazinesectie
  paper: '#f2ede2', // papier op de muur
  blue: '#acd7e8', // lichtblauw vlak
  ochre: '#ddb03a', // oker vlak
  olive: '#8a952f', // olijfgroen vlak
  ink: '#1c1715', // zwarte inkt / tekst
  wall: '#474643', // de muur
};

/**
 * Lettertypes. De bestanden staan in `src/assets/fonts/` en worden
 * geladen in `src/styles/fonts.css`. Ander lettertype? Zet het bestand
 * (.woff2) in die map, voeg een @font-face toe in fonts.css en zet hier
 * de naam.
 */
export const fonts = {
  display: "'BRANIE', 'Arial Black', Impact, sans-serif",
  script: "'Rock Salt', 'Marker Felt', 'Comic Sans MS', cursive",
  body: "'Switzer', system-ui, -apple-system, 'Segoe UI', sans-serif",
};

/* ------------------------------------------------------------------ */
/* De magazinecover                                                    */
/* ------------------------------------------------------------------ */
/**
 * Twee mogelijkheden:
 * 1. `image`: één kant-en-klare, staande coverafbeelding (3:4) in
 *    `src/assets/cover/`. Als die is ingevuld, wordt alleen dat beeld
 *    getoond.
 * 2. Laat `image` leeg: dan wordt een voorlopige cover opgebouwd uit
 *    `photo` + de teksten hieronder.
 */
export const cover = {
  image: '', // bijv. 'branie-cover-nr1.webp'
  photo: 'cover-stickerkast.webp',
  photoPosition: '50% 30%',
  alt: 'Cover van BRANIE nummer 1: iemand staat op een beplakte stroomkast.',
  issue: 'Nº 01',
  price: '1950 tot nu',
  headline: 'Amsterdam verandert.',
  headlineAccent: 'De branie blijft.',
  lines: ['De kroegbaas van de Zeedijk', 'Van omafiets naar fatbike', 'Wat was dit gebouw vroeger?'],
  /** Verhouding breedte / hoogte. */
  aspect: 3 / 4,
  /** Rotatie (graden) waarmee de cover in de magazinesectie landt. */
  restingRotation: -4,
};

/* ------------------------------------------------------------------ */
/* De fotomuur                                                         */
/* ------------------------------------------------------------------ */
/**
 * De muur is ontworpen op een vast "canvas" (in eenheden, niet in pixels).
 * Dat canvas wordt altijd schermvullend geschaald; wat buiten het scherm
 * valt, wordt afgesneden. Zo loopt de collage over de randen door.
 *
 * Er zijn twee indelingen:
 *  - `desktop` (liggende schermen)  — canvas 1600 × 1000
 *  - `mobile`  (staande schermen)   — canvas 800 × 1400
 * Het midden (rond het logo) blijft op beide zoveel mogelijk vrij.
 *
 * Elk object heeft per indeling een positie:
 *   { x, y, w, h, r, z }
 *   x, y = linkerbovenhoek op het canvas
 *   w    = breedte
 *   h    = hoogte (weglaten bij foto's: dan volgt de beeldverhouding)
 *   r    = rotatie in graden (negatief = tegen de klok in)
 *   z    = stapelvolgorde (hoger = bovenop)
 * Laat een indeling weg om het object daar niet te tonen.
 *
 * Soorten objecten (`type`):
 *  - 'cover'       de magazinecover (precies één keer)
 *  - 'photo'       foto als losse print met witte rand
 *  - 'framed'      foto in een lijst (`frame: 'black' | 'wood'`)
 *  - 'page'        losse magazinepagina
 *  - 'poster'      typografische poster (`lines`, `script`, `tone`)
 *  - 'note'        handgeschreven briefje (`text`, `sign`)
 *  - 'clipping'    krantenknipsel (`kicker`, `headline`, `body`)
 *  - 'ticket'      toegangskaartje (`top`, `main`, `bottom`)
 *  - 'ad'          prikbordbriefje met afscheurstrookjes
 *  - 'sticker'     ronde sticker (`text`)
 *  - 'placeholder' lege lijst(en) voor foto's die nog komen
 *
 * Bevestiging (`attach`): 'tape' | 'tape-corners' | 'pin' | 'none'
 * Toon poster (`tone`):   'red' | 'black' | 'olive' | 'ochre' | 'blue' | 'paper'
 *
 * `title`  verschijnt bij hover als klein bijschrift (optioneel).
 * `pillar` is de redactionele pijler (alleen ter documentatie).
 *
 * Afbeeldingen staan in `src/assets/wall/` of `src/assets/pillars/`; vul alleen de bestandsnaam in.
 */
export const wallCanvas = {
  desktop: { width: 1600, height: 1000 },
  mobile: { width: 800, height: 1400 },
};

export const wallItems = [
  {
    id: 'cover',
    type: 'cover',
    title: 'Nº 01 · scroll of klik',
    desktop: { x: 272, y: 164, w: 226, r: -2.5, z: 6 },
    mobile: { x: 104, y: 160, w: 290, r: -3, z: 6 },
  },
  {
    id: 'posterwand',
    type: 'framed',
    frame: 'black',
    image: 'posterwand.webp',
    alt: 'Volgeplakte posterwand met fietsen ervoor.',
    title: 'Plakwerk',
    pillar: 'Straatcultuur',
    desktop: { x: -46, y: -28, w: 262, r: 0.8, z: 2 },
    mobile: { x: -90, y: -70, w: 230, r: 1, z: 2 },
  },
  {
    id: 'verandert',
    type: 'poster',
    tone: 'olive',
    lines: ['“Amsterdam', 'verandert.', 'De branie', 'blijft.”'],
    script: 'Geen blad voor de mond.',
    pillar: 'Algemeen',
    desktop: { x: 548, y: -8, w: 246, h: 326, r: 1.2, z: 2 },
    mobile: { x: 424, y: 140, w: 280, h: 370, r: 2, z: 3 },
  },
  {
    id: 'fiat',
    type: 'photo',
    image: 'fiat-500.webp',
    alt: 'Een tweekleurige Fiat 500 geparkeerd aan de gracht.',
    title: 'Aan de gracht',
    attach: 'tape-corners',
    pillar: 'Vervoer & openbare ruimte',
    desktop: { x: 826, y: 28, w: 300, r: -1.6, z: 3 },
    mobile: { x: 160, y: -110, w: 360, r: -2, z: 2 },
  },
  {
    id: 'dorpsbranie',
    type: 'page',
    image: 'dorpsbranie-cover.webp',
    alt: 'Cover van de special DORPSBRANIE: tussen tram & trekker.',
    title: 'Special: DORPSBRANIE',
    attach: 'pin',
    pillar: 'De (on)bekende Amsterdammer',
    desktop: { x: 1164, y: -46, w: 212, r: 2, z: 2 },
    mobile: { x: 570, y: -160, w: 230, r: 3, z: 1 },
  },
  {
    id: 'omafiets',
    type: 'clipping',
    kicker: 'Vervoer',
    headline: 'Van omafiets naar fatbike',
    body: '‘Vroeger trapte je gewoon. Tegenwind was karaktervorming.’ Een Amsterdammer over de opkomst van de fatbike.',
    attach: 'tape',
    pillar: 'Vervoer & openbare ruimte',
    desktop: { x: 1408, y: 22, w: 236, h: 262, r: -1.4, z: 2 },
  },
  {
    id: 'nachtleven',
    type: 'poster',
    tone: 'red',
    lines: ['Nacht-', 'leven'],
    script: 'van RoXY tot nu',
    fontSize: 23,
    pillar: 'Straatcultuur',
    desktop: { x: 258, y: -36, w: 236, h: 190, r: -1.5, z: 1 },
  },
  {
    id: 'buurt',
    type: 'note',
    text: 'Mijn buurt verandert, maar het blijft mijn stad.',
    sign: 'Amsterdammer, 54',
    attach: 'pin',
    pillar: 'Wonen, plekken & buurten',
    desktop: { x: -30, y: 320, w: 226, h: 250, r: -2.2, z: 3 },
    mobile: { x: 40, y: 1240, w: 240, h: 260, r: -3, z: 3 },
  },
  {
    id: 'amsterdammertje',
    type: 'photo',
    image: 'amsterdammertje.webp',
    alt: 'Een bordeauxrood Amsterdammertje met drie andreaskruisen.',
    title: 'Het Amsterdammertje',
    attach: 'tape',
    pillar: 'Vervoer & openbare ruimte',
    desktop: { x: 222, y: 462, w: 160, r: 1.8, z: 4 },
    mobile: { x: 80, y: 900, w: 190, r: 2, z: 4 },
  },
  {
    id: 'de-meer',
    type: 'ticket',
    top: 'Stadion De Meer',
    main: 'Staanplaats',
    bottom: 'Vak 410 · ƒ 7,50',
    pillar: 'Sport',
    desktop: { x: 1200, y: 314, w: 236, h: 112, r: 4, z: 4 },
  },
  {
    id: 'kamer',
    type: 'ad',
    heading: 'Kamer gezocht',
    text: 'Student, rookt niet, kookt wel. Budget € 560. Kamer kost € 950. Iemand?',
    tab: 'bel Sanne',
    pillar: 'Wonen, plekken & buurten',
    desktop: { x: 1236, y: 454, w: 190, h: 232, r: -2.4, z: 3 },
  },
  {
    id: 'rode-kast',
    type: 'framed',
    frame: 'wood',
    image: 'rode-kast.webp',
    alt: 'Rode stroomkast vol graffiti met een stoffen tas eraan.',
    title: 'Straatmeubilair',
    pillar: 'Straatcultuur',
    desktop: { x: 1450, y: 318, w: 210, r: 1.2, z: 3 },
  },
  {
    id: 'sticker',
    type: 'sticker',
    text: 'Geen blad voor de mond',
    desktop: { x: 1128, y: 640, w: 116, r: -12, z: 7 },
    mobile: { x: 610, y: 820, w: 120, r: -12, z: 7 },
  },
  {
    id: 'sinds-1950',
    type: 'poster',
    tone: 'ochre',
    lines: ['1950', '&', 'nu'],
    fontSize: 30,
    script: 'vroeger naast nu',
    pillar: 'Algemeen',
    desktop: { x: -14, y: 650, w: 250, h: 340, r: -1, z: 2 },
    mobile: { x: 540, y: 900, w: 250, h: 330, r: 1.5, z: 2 },
  },
  {
    id: 'mandje',
    type: 'framed',
    frame: 'black',
    image: 'snoepsigaret-stippenjurk.webp',
    alt: 'Oudere dame in een stippenjurk met een snoepsigaret en een rode zonnebril.',
    title: 'Snoepen zoals vroeger',
    pillar: 'De (on)bekende Amsterdammer',
    desktop: { x: 256, y: 700, w: 216, r: 0, z: 3 },
    mobile: { x: 292, y: 920, w: 220, r: -1, z: 3 },
  },
  {
    id: 'melk',
    type: 'page',
    image: 'melk-tappen.webp',
    alt: 'Magazinepagina uit DORPSBRANIE: wij gingen melk tappen.',
    title: 'DORPSBRANIE: melk tappen',
    attach: 'tape',
    pillar: 'Eten & drinken',
    desktop: { x: 510, y: 700, w: 206, r: -2, z: 3 },
    mobile: { x: 300, y: 1250, w: 210, r: 2, z: 3 },
  },
  {
    id: 'vroeger-nu',
    type: 'placeholder',
    pair: ['1950', 'nu'],
    label: 'foto volgt',
    attach: 'tape-corners',
    pillar: 'Wonen, plekken & buurten',
    desktop: { x: 756, y: 686, w: 392, h: 262, r: 0.6, z: 2 },
  },
  {
    id: 'terras',
    type: 'photo',
    image: 'terras-twee-jongens.webp',
    alt: 'Twee jongens met een biertje en een jonge jenever op een bankje voor het raam.',
    title: 'Eentje dan',
    attach: 'pin',
    pillar: 'Eten & drinken',
    desktop: { x: 1180, y: 718, w: 200, r: 2.4, z: 3 },
  },
  {
    id: 'matcha',
    type: 'poster',
    tone: 'black',
    lines: ['Koffie', 'verkeerd', 'of matcha', 'met haver?'],
    script: 'kies maar',
    pillar: 'Eten & drinken',
    desktop: { x: 1408, y: 662, w: 244, h: 318, r: -1.4, z: 2 },
    mobile: { x: 536, y: 1270, w: 250, h: 320, r: -2, z: 2 },
  },
];
