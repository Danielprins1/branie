/**
 * BRANIE — de pijlers (pagina /pijlers)
 * ------------------------------------------------------------------
 * Vijf horizontale, gescheurde papierstroken. Elke pijler heeft:
 *  - slug        deel van de URL: /pijlers/<slug>
 *  - title       grote titel op de strook en bovenaan de pijler
 *  - subtitle    korte omschrijving (onder de titel op de pijlerpagina)
 *  - image       foto in src/assets/pillars/ (of src/assets/wall/)
 *  - focus       welk deel van de foto in de smalle strook valt
 *                ('50% 40%' = horizontaal midden, iets boven het midden)
 *  - intro       redactionele introductie (één of meer alinea's)
 *  - articles    de verhalen binnen de pijler (zie hieronder)
 *
 * Artikelen:
 *  - slug        deel van de URL: /pijlers/<pijler>/<artikel>
 *  - category    klein label boven de titel
 *  - title       titel
 *  - image       optioneel; zonder foto wordt het een typografisch blad
 *  - excerpt     korte inleiding (bovenaan het artikel)
 *  - body        alinea's van het artikel (laat weg voor voorbeeldtekst)
 *  - placeholder true = duidelijk gemarkeerd als voorbeeldartikel
 *  - layout      optioneel: 'feature' | 'wide' | 'note' | 'small'
 *                (anders wisselt de opmaak automatisch)
 */

export const pillarsPage = {
  title: 'De pijlers',
  hint: 'Scheur open',
  tagline: 'scheur de stad open',
  backLabel: 'Alle pijlers',
  articlesHeading: 'Verhalen',
  placeholderNote: 'Dit is een voorbeeldartikel. De echte tekst en foto’s volgen.',
};

export const pillars = [
  {
    slug: 'personen',
    title: 'Personen in Amsterdam',
    subtitle: 'De (on)bekende Amsterdammer, ondernemers en lokale makers.',
    image: 'personen-schaatsen.webp',
    focus: '50% 40%',
    intro: [
      'De kroegbaas, de bakker van tachtig, het gezicht achter de galerie. Amsterdam bestaat bij de gratie van de mensen die er al jaren hetzelfde doen, en van de nieuwkomers die het net anders doen.',
      'Geen BN’ers op de rode loper, maar de mensen die je elke dag tegenkomt en nooit hebt gesproken. Tot nu.',
    ],
    articles: [
      { slug: 'veertig-jaar-achter-de-bar', category: 'De ondernemer', title: 'Veertig jaar achter de bar van de Zeedijk', image: 't-mandje.webp', excerpt: 'Hij zag de buurt veranderen van hoerenloper tot hotspot. Zijn kroeg bleef hetzelfde.', placeholder: true },
      { slug: 'bakker-van-tachtig', category: 'Portret', title: 'De bakker van tachtig die nog elke nacht om drie uur opstaat', excerpt: 'Over meel, eelt en waarom hij nooit met pensioen gaat.', placeholder: true },
      { slug: 'twee-buren', category: 'Dubbelgesprek', title: 'Eén portiek, twee buren, vijftig jaar verschil', image: 'amsterdammertje.webp', excerpt: 'Zij woont er sinds 1971, hij sinds vorig jaar. Wie is hier eigenlijk de echte Amsterdammer?', placeholder: true },
      { slug: 'stadsprinses-op-de-boerderij', category: 'Buiten de ring', title: 'Tussen tram & trekker: de stadsprinses gaat melk tappen', image: 'dorpsbranie-cover.webp', excerpt: 'Onze zelfverklaarde stadsprinses ruilde haar havermelk in voor een middag Durgerdam.', placeholder: true },
      { slug: 'makers-van-de-pijp', category: 'Maker', title: 'Zij naait je jas, hij lapt je fiets: de makers van De Pijp', excerpt: 'Ambachten die het overleven tussen de koffiebars.', placeholder: true },
    ],
  },
  {
    slug: 'de-stad',
    title: 'De stad en de plekken',
    subtitle: 'Wonen, architectuur, plekken, buurten en het veranderende straatbeeld.',
    image: 'stad-markt.webp',
    focus: '50% 38%',
    intro: [
      'Wat was dit gebouw vroeger? Wie woonde hier voordat het een Airbnb werd? Amsterdam verandert sneller dan je kunt verhuizen, maar sommige plekken houden stand.',
      'We zetten oude foto’s naast nieuwe, lopen door buurten buiten het centrum en zoeken de hofjes waar je nog nooit hebt aangebeld.',
    ],
    articles: [
      { slug: 'wat-was-dit-gebouw-vroeger', category: 'Vroeger & nu', title: 'Wat was dit gebouw vroeger?', image: 'posterwand.webp', excerpt: 'Tien gevels, tien levens. Van pakhuis tot poptempel.', placeholder: true },
      { slug: 'een-hele-straat', category: 'Buurt', title: 'We interviewden een hele straat', excerpt: 'Van nummer 1 tot 143: de Javastraat in één middag.', placeholder: true },
      { slug: 'aan-de-gracht', category: 'Straatbeeld', title: 'Aan de gracht staat een Fiat die nooit meer weggaat', image: 'fiat-500.webp', excerpt: 'Over parkeervergunningen, stilstand en liefde voor oud blik.', placeholder: true },
      { slug: 'krakers-en-woningzoekers', category: 'Wonen', title: 'Krakers van toen, woningzoekers van nu', image: 'rode-kast.webp', excerpt: 'In 1980 trapte je een deur in. Nu sta je vijftien jaar op een lijst.', placeholder: true },
      { slug: 'hofjes', category: 'Verborgen plek', title: 'Hofjes waar je nog nooit hebt aangebeld', excerpt: 'Achter de voordeur ligt een ander Amsterdam. Als je beleefd bent.', placeholder: true },
    ],
  },
  {
    slug: 'onderweg',
    title: 'Onderweg',
    subtitle: 'Openbaar vervoer, fietsen, mobiliteit en bereikbaarheid.',
    image: 'onderweg-pont.webp',
    focus: '50% 30%',
    intro: [
      'Amsterdam is een stad die je onderweg leert kennen: op de pont, op de bagagedrager, in de tram die net voor je neus wegrijdt.',
      'Van omafiets naar fatbike, van grijs naar groen. Over hoe we ons verplaatsen, en wat dat zegt over wie we zijn.',
    ],
    articles: [
      { slug: 'vijf-minuten-varen', category: 'De pont', title: 'Vijf minuten varen, een heel ander Amsterdam', excerpt: 'Wie stapt er om half acht ’s ochtends op de pont naar Noord?', placeholder: true },
      { slug: 'van-omafiets-naar-fatbike', category: 'Fiets', title: 'Van omafiets naar fatbike', excerpt: 'Tegenwind was ooit karaktervorming. Nu heb je een accu.', placeholder: true },
      { slug: 'het-amsterdammertje', category: 'Openbare ruimte', title: 'Het Amsterdammertje: een paaltje met een verleden', image: 'amsterdammertje.webp', excerpt: 'Ooit tegen foutparkeerders, nu een souvenir. De geschiedenis van drie kruisjes.', placeholder: true },
      { slug: 'lijn-17-tot-de-eindhalte', category: 'Tram', title: 'Lijn 17 tot de eindhalte', excerpt: 'Een rit van de Dam naar Osdorp, en alle verhalen die onderweg instappen.', placeholder: true },
      { slug: 'waar-vroeger-de-auto-stond', category: 'Van grijs naar groen', title: 'Waar vroeger de auto stond', image: 'fiat-500.webp', excerpt: 'Parkeerplaatsen worden geveltuinen. Niet iedereen is blij.', placeholder: true },
    ],
  },
  {
    slug: 'cultuur',
    title: 'Amsterdamse cultuur',
    subtitle: '(Straat)cultuur, mode, identiteit, muziek, nachtleven, taal en kunst.',
    image: 'cultuur-straat.webp',
    focus: '50% 34%',
    intro: [
      'Van de RoXY tot de koffiebar met dj, van Mokums tot TikTok-slang. Amsterdamse cultuur staat niet in een museum; die hangt op een stroomkast, staat in de rij voor de club of zit op een bankje bij de markt.',
      'Hier vertellen we het verhaal van de stad door haar stijl, haar muziek en haar mond.',
    ],
    articles: [
      { slug: 'de-roxy-generatie', category: 'Nachtleven', title: 'De RoXY-generatie gaat weer uit', excerpt: 'Ze dansten tot de zon opkwam. Nu staan ze om tien uur thuis. Of toch niet?', placeholder: true },
      { slug: 'wie-plakt-die-posters', category: 'Straatkunst', title: 'Plakwerk: wie hangt die posters eigenlijk op?', image: 'posterwand.webp', excerpt: 'Een nacht op pad met de mensen achter de plakmuren.', placeholder: true },
      { slug: 'hoe-amsterdams-ben-jij', category: 'Taal', title: 'Hoe Amsterdams ben jij? De quiz', excerpt: 'Weet jij wat een gozer, een kapsalon en een bakkie pleur is?', placeholder: true },
      { slug: 'stroomkasten-als-canvas', category: 'Kunst', title: 'Stroomkasten als canvas', image: 'rode-kast.webp', excerpt: 'Het grootste openluchtmuseum van de stad staat gewoon op de stoep.', placeholder: true },
      { slug: 'stijl-door-de-decennia', category: 'Mode', title: 'Stijl door de decennia: van Waterlooplein tot vintage-app', excerpt: 'Tweedehands was ooit armoe. Nu is het een statement.', placeholder: true },
    ],
  },
  {
    slug: 'proef-de-stad',
    title: 'Proef de stad',
    subtitle: 'Eten, drinken, horeca en de Amsterdamse eetcultuur.',
    image: 'proef-bruine-kroeg.webp',
    focus: '50% 70%',
    intro: [
      'De bruine kroeg als tijdcapsule, de markt om zes uur ’s ochtends, het terras op de eerste zonnige dag. In Amsterdam proef je de stad, en de mensen die haar draaiende houden.',
      'Koffie verkeerd of matcha met havermelk? Wij oordelen niet. Nou ja, een beetje.',
    ],
    articles: [
      { slug: 'de-bruine-kroeg', category: 'Bruine kroeg', title: 'De bruine kroeg als tijdcapsule', excerpt: 'Zelfde kruk, zelfde glas, zelfde verhaal. Al vijftig jaar.', placeholder: true },
      { slug: 'koffie-verkeerd-of-matcha', category: 'Koffie', title: 'Koffie verkeerd tegenover matcha met havermelk', image: 'matcha.webp', excerpt: 'Twee generaties, één tafel, geen consensus.', placeholder: true },
      { slug: 'eerste-terrasdag', category: 'Terras', title: 'Eerste terrasdag: wie zit er al om negen uur?', image: 'terras.webp', excerpt: 'De zon schijnt, de jassen blijven aan. Een ochtend op het plein.', placeholder: true },
      { slug: 'albert-cuyp-om-zes-uur', category: 'Markt', title: 'Albert Cuyp om zes uur ’s ochtends', excerpt: 'Voordat de toeristen komen, is de markt van de marktlui.', placeholder: true },
      { slug: 'melk-tappen-in-durgerdam', category: 'Boerderij', title: 'Vergeet de supermarkt: melk tappen in Durgerdam', image: 'melk-tappen.webp', excerpt: 'Verse melk uit een tap, tussen de koeien. Gewoon tien minuten fietsen.', placeholder: true },
    ],
  },
];
