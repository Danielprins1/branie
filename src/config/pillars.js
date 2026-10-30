/**
 * BRANIE — de pijlers (pagina /pijlers)
 * ------------------------------------------------------------------
 * Vijf horizontale, gescheurde papierstroken. Elke pijler heeft:
 *  - slug        deel van de URL: /pijlers/<slug>
 *  - title       grote titel op de strook en bovenaan de pijler
 *  - subtitle    korte omschrijving (onder de titel op de pijlerpagina)
 *  - image       foto in src/assets/pillars/ (of src/assets/wall/)
 *  - introImage  optioneel: andere foto voor de pijlerintro (anders `image`)
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
 *  - gallery     optioneel: extra foto's, getoond als fotoserie in het artikel
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
    introImage: 'snoepsigaret-stippenjurk.webp',
    intro: [
      'De kroegbaas, de bakker van tachtig, het gezicht achter de galerie. Amsterdam bestaat bij de gratie van de mensen die er al jaren hetzelfde doen, en van de nieuwkomers die het net anders doen.',
      'Geen BN’ers op de rode loper, maar de mensen die je elke dag tegenkomt en nooit hebt gesproken. Tot nu.',
    ],
    articles: [
      {
        slug: 'snoepen-zoals-vroeger',
        category: 'Portretserie',
        title: 'Snoepen zoals vroeger',
        image: 'snoepsigaret-stippenjurk.webp',
        excerpt: 'Snoepsigaretten, zure matten en snoepkettingen. Twee Amsterdamse dames laten zien dat je nooit te oud bent voor een snoepje, of voor een grote mond.',
        gallery: ['snoepsigaar-stippenjurk.webp', 'snoepvrouw-zure-mat.webp', 'snoepvrouw-tanden.webp', 'snoepvrouw-ogen.webp', 'snoepje-op-tong.webp'],
        placeholder: true,
      },
      {
        slug: 'slapen-in-de-stad',
        category: 'Portret',
        title: 'Wakker worden in Amsterdam',
        image: 'pyjama-bankje-nacht.webp',
        excerpt: 'In pyjama door de stad: over slapen, wonen en de vraag waar je in Amsterdam nog een bed kunt vinden.',
        gallery: ['pyjama-instituut-sociale-geschiedenis.webp'],
        placeholder: true,
      },
      { slug: 'bakker-van-tachtig', category: 'Portret', title: 'De bakker van tachtig die nog elke nacht om drie uur opstaat', excerpt: 'Over meel, eelt en waarom hij nooit met pensioen gaat.', placeholder: true },
      { slug: 'twee-buren', category: 'Dubbelgesprek', title: 'Eén portiek, twee buren, vijftig jaar verschil', image: 'amsterdammertje.webp', excerpt: 'Zij woont er sinds 1971, hij sinds vorig jaar. Wie is hier eigenlijk de echte Amsterdammer?', placeholder: true },
      { slug: 'stadsprinses-op-de-boerderij', category: 'Buiten de ring', title: 'Tussen tram & trekker: de stadsprinses gaat melk tappen', image: 'dorpsbranie-cover.webp', excerpt: 'Onze zelfverklaarde stadsprinses ruilde haar havermelk in voor een middag Durgerdam.', placeholder: true },
    ],
  },
  {
    slug: 'de-stad',
    title: 'De stad en de plekken',
    subtitle: 'Wonen, architectuur, plekken, buurten en het veranderende straatbeeld.',
    image: 'stad-markt.webp',
    focus: '50% 38%',
    introImage: 'plaskrul-gracht-heroshot.webp',
    intro: [
      'Wat was dit gebouw vroeger? Wie woonde hier voordat het een Airbnb werd? Amsterdam verandert sneller dan je kunt verhuizen, maar sommige plekken houden stand.',
      'We zetten oude foto’s naast nieuwe, lopen door buurten buiten het centrum en zoeken de hofjes waar je nog nooit hebt aangebeld.',
    ],
    articles: [
      {
        slug: 'de-plaskrul',
        category: 'Straatmeubilair',
        title: 'De plaskrul: plassen met uitzicht op de gracht',
        image: 'plaskrul-gracht-heroshot.webp',
        excerpt: 'Groen, gietijzer en onmiskenbaar Amsterdams. Over het meest besproken straatmeubel van de stad.',
        placeholder: true,
      },
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
      { slug: 'van-omafiets-naar-fatbike', category: 'Fiets', title: 'Van omafiets naar fatbike', image: 'febo-gevel-fietsers.webp', excerpt: 'Tegenwind was ooit karaktervorming. Nu heb je een accu.', placeholder: true },
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
    introImage: 'concerto-cd-wand.webp',
    intro: [
      'Van de RoXY tot de koffiebar met dj, van Mokums tot TikTok-slang. Amsterdamse cultuur staat niet in een museum; die hangt op een stroomkast, staat in de rij voor de club of zit op een bankje bij de markt.',
      'Hier vertellen we het verhaal van de stad door haar stijl, haar muziek en haar mond.',
    ],
    articles: [
      {
        slug: 'concerto',
        category: 'Muziek',
        title: 'Concerto: graven in de bakken',
        image: 'concerto-cd-wand.webp',
        layout: 'wide',
        excerpt: 'Duizenden cd’s, platen tot aan het plafond, strips, koffie en gratis optredens. Een middag in de platenzaak waar je altijd langer blijft dan je van plan was.',
        gallery: ['concerto-rapbakken-hand.webp', 'concerto-cd-stapels.webp', 'concerto-live-wand.webp', 'concerto-strips-hoek.webp', 'concerto-koffiebar.webp'],
        placeholder: true,
      },
      {
        slug: 'het-filmhuis',
        category: 'Film',
        title: 'Het licht gaat uit: De Uitkijk en Rialto',
        image: 'rialto-nacht.webp',
        excerpt: 'Neon, letterborden en klassiekers op het grote doek. Waarom de Amsterdamse filmhuizen het streamen overleven.',
        gallery: ['de-uitkijk-filmtheater.webp'],
        placeholder: true,
      },
      {
        slug: 'kamp-seedorf',
        category: 'Straatkunst',
        title: 'Een gezicht op de muur',
        image: 'kamp-seedorf-plakmuur.webp',
        excerpt: 'Geplakt, gescheurd en opnieuw geplakt. Over de posters en portretten op de muren van de stad.',
        placeholder: true,
      },
      {
        slug: 'stijl-van-de-straat',
        category: 'Mode & identiteit',
        title: 'Stijl van de straat',
        image: 'roken-graffitideur.webp',
        excerpt: 'Hoed, wijde jeans, een sigaret op de stoep. Amsterdamse stijl zie je niet in de etalage, maar in de portiek.',
        gallery: ['selfie-graffitimuur.webp'],
        placeholder: true,
      },
      { slug: 'de-roxy-generatie', category: 'Nachtleven', title: 'De RoXY-generatie gaat weer uit', excerpt: 'Ze dansten tot de zon opkwam. Nu staan ze om tien uur thuis. Of toch niet?', placeholder: true },
      { slug: 'hoe-amsterdams-ben-jij', category: 'Taal', title: 'Hoe Amsterdams ben jij? De quiz', excerpt: 'Weet jij wat een gozer, een kapsalon en een bakkie pleur is?', placeholder: true },
    ],
  },
  {
    slug: 'proef-de-stad',
    title: 'Proef de stad',
    subtitle: 'Eten, drinken, horeca en de Amsterdamse eetcultuur.',
    image: 'proef-bruine-kroeg.webp',
    focus: '50% 70%',
    introImage: 'febo-automatenwand.webp',
    intro: [
      'De bruine kroeg als tijdcapsule, de markt om zes uur ’s ochtends, het terras op de eerste zonnige dag. In Amsterdam proef je de stad, en de mensen die haar draaiende houden.',
      'Koffie verkeerd of matcha met havermelk? Wij oordelen niet. Nou ja, een beetje.',
    ],
    articles: [
      {
        slug: 'uit-de-muur',
        category: 'Snack',
        title: 'Uit de muur',
        image: 'febo-kroket-automaat.webp',
        excerpt: 'Muntje erin, luikje open, kroket eruit. Over de automatiek als Amsterdams instituut, van de nachtelijke trek tot de lunch op de stoep.',
        gallery: ['febo-automatenwand.webp', 'febo-kroket-eten.webp', 'febo-raam-tram.webp', 'febo-gevel-fietsers.webp'],
        placeholder: true,
      },
      {
        slug: 'koffie-verkeerd-of-matcha',
        category: 'Koffie',
        title: 'Koffie verkeerd tegenover matcha met havermelk',
        image: 'matcha-koffie-rietje.webp',
        layout: 'wide',
        excerpt: 'Twee generaties, één tafel, geen consensus.',
        gallery: ['matcha-koffie-tafel.webp'],
        placeholder: true,
      },
      {
        slug: 'de-borrel',
        category: 'Terras',
        title: 'Eentje dan. De borrel als Amsterdamse religie',
        image: 'terras-twee-jongens.webp',
        excerpt: 'Een bankje voor het raam, een biertje en een jonge jenever. Meer heb je niet nodig.',
        gallery: ['borrelglaasjes-handen.webp'],
        placeholder: true,
      },
      { slug: 'de-bruine-kroeg', category: 'Bruine kroeg', title: 'De bruine kroeg als tijdcapsule', excerpt: 'Zelfde kruk, zelfde glas, zelfde verhaal. Al vijftig jaar.', placeholder: true },
      { slug: 'albert-cuyp-om-zes-uur', category: 'Markt', title: 'Albert Cuyp om zes uur ’s ochtends', excerpt: 'Voordat de toeristen komen, is de markt van de marktlui.', placeholder: true },
      { slug: 'melk-tappen-in-durgerdam', category: 'Boerderij', title: 'Vergeet de supermarkt: melk tappen in Durgerdam', image: 'melk-tappen.webp', excerpt: 'Verse melk uit een tap, tussen de koeien. Gewoon tien minuten fietsen.', placeholder: true },
    ],
  },
];
