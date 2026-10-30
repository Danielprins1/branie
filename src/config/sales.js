/**
 * BRANIE — de salespagina (/sales)
 * ------------------------------------------------------------------
 * Alle inhoud komt uit de saleskit (originals/saleskit/). Pas hier
 * prijzen, data, teksten en contactgegevens aan; de pagina volgt vanzelf.
 * Foto's staan in src/assets/sales/ (vul alleen de bestandsnaam in).
 */

export const sales = {
  title: 'Saleskit',
  intro: 'Adverteren in BRANIE of het magazine verkopen? Hier staat alles dat je moet weten.',
  pdf: '/downloads/BRANIE-saleskit.pdf',
  heroPhotos: ['oude-nieuwstraat-bord.webp', 'werker-op-boot.webp', 'dam-paleis-beweging.webp', 'man-op-stroomkast.webp', 'zeedijk-chinatown.webp', 'amsterdammertje-paal.webp'],

  launch: { label: 'Lancering', date: '14 jan', year: '2027' },

  introduction: {
    aside: 'Ontdek het Amsterdam dat je dacht te kennen.',
    asidePhoto: 'dam-paleis-beweging.webp',
    lead: 'BRANIE. Een magazine dat het Amsterdam van toen opnieuw tot leven brengt.',
    body: [
      'Amsterdam zit vol verhalen die langzaam uit het straatbeeld verdwijnen. Plekken die er niet meer zijn, gewoontes die zijn veranderd en verhalen van Amsterdammers die de stad hebben gevormd. BRANIE haalt deze verhalen naar boven en legt ze naast het Amsterdam van nu.',
      'Van bekende plekken tot vergeten verhalen: we ontdekken waar Amsterdam vandaan komt en hoe dat terug te zien is in de stad van vandaag. Niet omdat het vroeger beter was, maar omdat het verleden het Amsterdam van nu betekenis geeft.',
    ],
    facts: [
      ['Lancering', '14 januari 2027'],
      ['Frequentie', 'Eenmalige editie'],
      ['Verkoopprijs', '€24,99'],
      ['Pre-sale', '€19,99'],
      ['Oplage', '750'],
      ['Formaat', '24 × 30 cm'],
      ['Aantal pagina’s', '164'],
    ],
  },

  mission: {
    heading: 'BRANIE brengt het Amsterdam van 1950 tot nu opnieuw tot leven.',
    photos: ['zeedijk-chinatown.webp', 't-mandje-bankje.webp', 'man-op-stroomkast.webp', 'bruine-kroeg-interieur.webp'],
    missie: [
      'We duiken in verhalen van de mensen en plekken die de stad hebben gevormd en volgen hoe Amsterdam door de jaren heen is veranderd. Van buurten en architectuur tot de taal op straat, van eten en sport tot muziek en cultuur. Alles vertelt iets over de stad en haar inwoners.',
      'Door het Amsterdam van toen naast dat van nu te leggen, ontdekken we wat verdwenen is, wat is veranderd en wat nog altijd onderdeel is van de stad. **BRANIE wil Amsterdamliefhebbers anders naar de stad laten kijken.** We geven vergeten verhalen een podium, brengen verschillende generaties samen en laten zien dat achter iedere straat, plek, gewoonte en Amsterdammer een verhaal schuilt.',
    ],
    visie: [
      '**BRANIE wil verhalen uit het verleden bewaren en doorgeven aan een nieuwe generatie.** We willen mensen met meer nieuwsgierigheid en waardering naar de stad laten kijken en de verbinding tussen toen en nu versterken.',
      'Onze ambitie is om hét bookazine te worden dat Amsterdam door de tijd heen zichtbaar maakt en generaties, verhalen en merken met elkaar verbindt.',
    ],
    statement: 'BRANIE verbindt mensen met verhalen van de stad, en merken met een betrokken publiek dat Amsterdam een warm hart toedraagt.',
  },

  pillarsHeading: 'Pijlers BRANIE',

  preview: {
    heading: 'Een kijkje in het blad',
    caption: 'Uit BRANIE: Concerto, een ‘gewone’ platenzaak? Echt niet!',
    spreads: [
      { image: 'concerto-spread-1.webp', alt: 'Spread uit BRANIE over platenzaak Concerto: Geen trend, maar een klassieker en De platenbak als sociale hotspot.' },
      { image: 'concerto-spread-2.webp', alt: 'Spread uit BRANIE over platenzaak Concerto: Voor ieder wat wils en Live op eigen podium.' },
    ],
  },

  look: {
    heading: 'Zo ziet BRANIE eruit',
    text: 'Ruw, Amsterdams en eigenwijs. Gebruik deze kleuren als je materiaal voor of met BRANIE maakt.',
    asterisk: 'Het sterretje is ons beeldmerk. Het staat bij koppen, op de cover en overal waar BRANIE iets te zeggen heeft.',
    swatches: [
      { name: 'Bordeaux', hex: '#7B0B00', text: '#FFFDF9' },
      { name: 'Rood', hex: '#FF0000', text: '#FFFDF9' },
      { name: 'Olijf', hex: '#8B9600', text: '#FFFDF9' },
      { name: 'Mosterd', hex: '#E6AD00', text: '#7B0B00' },
      { name: 'Lichtblauw', hex: '#A2DCEC', text: '#7B0B00' },
      { name: 'Wit', hex: '#FFFDF9', text: '#7B0B00' },
    ],
  },

  where: {
    heading: 'Waar je BRANIE vindt',
    text: 'BRANIE is zowel offline als online verkrijgbaar.',
    channels: [
      { title: 'Fysieke verkooppunten', text: 'De verkooppunten worden binnenkort bekendgemaakt.', photo: 'oude-nieuwstraat-bord.webp', tone: 'red' },
      { title: 'Online', text: 'Bestelbaar via onze website en social media.', photo: 'werker-op-boot.webp', tone: 'olive' },
      { title: 'Offline promotie', text: 'Flyers, stickers en posters met QR-code.', photo: 'man-op-bank.webp', tone: 'ochre' },
    ],
    socialsText: 'We vergroten onze naamsbekendheid via Instagram, Facebook en TikTok',
  },

  ads: {
    heading: 'Adverteren in BRANIE',
    tagline: 'Je merk naast de verhalen van de stad.',
    print: [
      { size: 'full', label: 'Hele pagina', price: 195 },
      { size: 'half', label: 'Halve pagina', price: 125 },
      { size: 'quarter', label: 'Kwart pagina', price: 75 },
      { size: 'spread', label: 'Spread', price: 375 },
    ],
    social: [
      { label: 'Instagram story', price: 10 },
      { label: 'Instagram post', price: 20 },
      { label: 'Carousel / slide post', price: 30 },
      { label: 'Video op socials', price: 40 },
      { label: 'Branded content / product placement', price: 50 },
    ],
  },

  advertorial: {
    heading: 'Advertorial in BRANIE',
    tagline: 'Je merk naast de verhalen van de stad.',
    print: [
      { size: 'full', label: 'Hele pagina', price: 295 },
      { size: 'half', label: 'Halve pagina', price: 175 },
      { size: 'spread', label: 'Spread', price: 495 },
    ],
    text: 'Met een advertorial in BRANIE krijgt jouw onderneming de ruimte om je verhaal te vertellen. Geen standaard advertentie, maar een persoonlijk en aansprekend verhaal dat aansluit bij de eigenwijze identiteit van ons magazine.',
  },

  packages: {
    heading: 'Print en online in een pakket',
    text: 'Onze pakketten geven je **ruim 20% korting** ten opzichte van losse advertenties.',
    items: [
      { name: 'Pakket 1', focus: 'focus op online', price: 100, separate: 135, tone: 'olive', items: ['1/4 pagina-advertentie', 'Branded content of product placement in een post of video', '1 Instagram/Facebook story'] },
      { name: 'Pakket 2', focus: 'half print, half online', price: 150, separate: 195, tone: 'red', items: ['1/2 pagina-advertentie', '1 slide post (meerdere beelden in één post op Instagram/Facebook)', '1 video (Reel op Instagram of TikTok)'] },
      { name: 'Pakket 3', focus: 'focus op print', price: 210, separate: 290, tone: 'bordeaux', items: ['1/1 pagina-advertentie', '1/4 extra advertentie', '1 social media post, bijvoorbeeld op Instagram of Facebook'] },
    ],
  },

  price: {
    heading: 'Wat kost BRANIE?',
    shop: { label: 'In de winkel', price: '€24,99' },
    presale: { label: 'Pre-sale', price: '€19,99' },
  },

  delivery: {
    heading: 'Aanleverspecificaties',
    text: 'Voor een optimale weergave van je advertentie hanteren we deze specificaties.',
    deadline: '2026-12-04',
    deadlineLabel: '4 december 2026',
    deliverText: 'Mail je materiaal en vragen naar',
  },

  contact: {
    heading: 'Contact',
    email: 'sales@braniemagazine.nl',
    website: 'www.braniemagazine.nl',
    /** Zet `url` op '' zolang de website nog niet online is. */
    websiteUrl: '',
    socials: '@braniemagazine',
    socialLinks: [
      { label: 'Instagram', url: 'https://www.instagram.com/braniemagazine' },
      { label: 'TikTok', url: 'https://www.tiktok.com/@braniemagazine' },
      { label: 'Facebook', url: 'https://www.facebook.com/braniemagazine' },
    ],
    photos: ['borrel-handen.webp', 'amsterdammertje-paal.webp', 'delftsblauw-trap.webp'],
  },
};
