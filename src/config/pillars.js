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
      'De Amsterdammers die je elke dag ziet en nooit spreekt: de kroegbaas op de hoek, de buurvrouw die alles weet, de ondernemer die al veertig jaar dezelfde zaak heeft. We gaan bij ze zitten en laten ze vertellen.',
    ],
    articles: [
      {
        slug: 'snoepen-zoals-vroeger',
        category: 'Portretserie',
        title: 'Snoepen zoals vroeger',
        image: 'snoepsigaret-stippenjurk.webp',
        excerpt: 'Fotoserie met twee Amsterdamse dames en het snoep uit hun jeugd: snoepsigaretten, zure matten en snoepkettingen.',
        gallery: ['snoepsigaar-stippenjurk.webp', 'snoepvrouw-zure-mat.webp', 'snoepvrouw-tanden.webp', 'snoepvrouw-ogen.webp', 'snoepje-op-tong.webp'],
        placeholder: true,
      },
      {
        slug: 'slapen-in-de-stad',
        category: 'Portret',
        title: 'Wakker worden in Amsterdam',
        image: 'pyjama-bankje-nacht.webp',
        excerpt: 'Fotoserie: in pyjama door de stad, van het Instituut voor Sociale Geschiedenis tot een bankje aan het fietspad.',
        gallery: ['pyjama-instituut-sociale-geschiedenis.webp'],
        placeholder: true,
      },
      { slug: 'bakker-van-tachtig', category: 'Portret', title: 'De bakker van tachtig die nog elke nacht om drie uur opstaat', excerpt: 'Portret van een bakker die na zijn pensioen gewoon is doorgegaan.', placeholder: true },
      { slug: 'twee-buren', category: 'Dubbelgesprek', title: 'Eén portiek, twee buren, vijftig jaar verschil', image: 'amsterdammertje.webp', excerpt: 'Een buurvrouw die er al tientallen jaren woont en een buurman die er net woont, over hun portiek.', placeholder: true },
      { slug: 'stadsprinses-op-de-boerderij', category: 'Buiten de ring', title: 'Tussen tram & trekker: de stadsprinses gaat melk tappen', image: 'dorpsbranie-cover.webp', excerpt: 'Uit de special DORPSBRANIE: een stadsmeisje gaat melk tappen op de boerderij.', placeholder: true },
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
      'Gebouwen, straten en buurten, en wat ervan over is. We leggen oude foto’s naast nieuwe en gaan langs bij de mensen die er wonen, ook buiten de ring.',
    ],
    articles: [
      {
        slug: 'de-plaskrul',
        category: 'Straatmeubilair',
        title: 'De plaskrul: plassen met uitzicht op de gracht',
        image: 'plaskrul-gracht-heroshot.webp',
        excerpt: 'Fotoverhaal over de groene plaskrul aan de gracht en wat Amsterdammers ervan vinden.',
        placeholder: true,
      },
      { slug: 'wat-was-dit-gebouw-vroeger', category: 'Vroeger & nu', title: 'Wat was dit gebouw vroeger?', image: 'posterwand.webp', excerpt: 'Oude en nieuwe foto’s van dezelfde gevels naast elkaar.', placeholder: true },
      { slug: 'een-hele-straat', category: 'Buurt', title: 'We interviewden een hele straat', excerpt: 'We bellen in één straat bij zoveel mogelijk deuren aan.', placeholder: true },
      { slug: 'aan-de-gracht', category: 'Straatbeeld', title: 'Aan de gracht staat een Fiat die nooit meer weggaat', image: 'fiat-500.webp', excerpt: 'Over een oude Fiat 500 aan de gracht en de eigenaar die hem niet weg wil doen.', placeholder: true },
      { slug: 'krakers-en-woningzoekers', category: 'Wonen', title: 'Krakers van toen, woningzoekers van nu', image: 'rode-kast.webp', excerpt: 'Oud-krakers en woningzoekers van nu over wonen in Amsterdam.', placeholder: true },
      { slug: 'hofjes', category: 'Verborgen plek', title: 'Hofjes waar je nog nooit hebt aangebeld', excerpt: 'Een wandeling langs Amsterdamse hofjes.', placeholder: true },
    ],
  },
  {
    slug: 'onderweg',
    title: 'Onderweg',
    subtitle: 'Openbaar vervoer, fietsen, mobiliteit en bereikbaarheid.',
    image: 'onderweg-pont.webp',
    focus: '50% 30%',
    intro: [
      'Over de pont, de tram en de fiets: hoe Amsterdammers zich door hun stad bewegen, en waar ze zich onderweg aan ergeren.',
    ],
    articles: [
      { slug: 'vijf-minuten-varen', category: 'De pont', title: 'Vijf minuten varen, een heel ander Amsterdam', excerpt: 'Een ochtendspits op de pont naar Noord.', placeholder: true },
      { slug: 'van-omafiets-naar-fatbike', category: 'Fiets', title: 'Van omafiets naar fatbike', image: 'febo-gevel-fietsers.webp', excerpt: 'Over de omafiets, de bakfiets, de fatbike en de ergernissen ertussen.', placeholder: true },
      { slug: 'het-amsterdammertje', category: 'Openbare ruimte', title: 'Het Amsterdammertje: een paaltje met een verleden', image: 'amsterdammertje.webp', excerpt: 'Over het bruinrode paaltje met de drie andreaskruisen.', placeholder: true },
      { slug: 'lijn-17-tot-de-eindhalte', category: 'Tram', title: 'Lijn 17 tot de eindhalte', excerpt: 'Een rit met tramlijn 17, van de eerste halte tot de laatste.', placeholder: true },
      { slug: 'waar-vroeger-de-auto-stond', category: 'Van grijs naar groen', title: 'Waar vroeger de auto stond', image: 'fiat-500.webp', excerpt: 'Over parkeerplaatsen die verdwijnen en wat ervoor terugkomt.', placeholder: true },
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
      'Muziek, film, mode, straatkunst en de taal die je alleen hier hoort. We gaan naar de platenzaak, het filmhuis en de muren waar steeds nieuwe posters op komen.',
    ],
    articles: [
      {
        slug: 'concerto',
        category: 'Muziek',
        title: 'Concerto: graven in de bakken',
        image: 'concerto-cd-wand.webp',
        layout: 'wide',
        excerpt: 'Fotoverhaal uit platenzaak Concerto in de Utrechtsestraat: de bakken, de cd-wand, de strips en de koffiebar.',
        gallery: ['concerto-rapbakken-hand.webp', 'concerto-cd-stapels.webp', 'concerto-live-wand.webp', 'concerto-strips-hoek.webp', 'concerto-koffiebar.webp'],
        placeholder: true,
      },
      {
        slug: 'het-filmhuis',
        category: 'Film',
        title: 'Het licht gaat uit: De Uitkijk en Rialto',
        image: 'rialto-nacht.webp',
        excerpt: 'Fotoverhaal over filmtheater De Uitkijk en Rialto.',
        gallery: ['de-uitkijk-filmtheater.webp'],
        placeholder: true,
      },
      {
        slug: 'kamp-seedorf',
        category: 'Straatkunst',
        title: 'Een gezicht op de muur',
        image: 'kamp-seedorf-plakmuur.webp',
        excerpt: 'Over geplakte portretten op Amsterdamse muren.',
        placeholder: true,
      },
      {
        slug: 'stijl-van-de-straat',
        category: 'Mode & identiteit',
        title: 'Stijl van de straat',
        image: 'roken-graffitideur.webp',
        excerpt: 'Fotoserie over straatstijl, geschoten voor de bekladde deuren van de stad.',
        gallery: ['selfie-graffitimuur.webp'],
        placeholder: true,
      },
      { slug: 'de-roxy-generatie', category: 'Nachtleven', title: 'De RoXY-generatie gaat weer uit', excerpt: 'Oud-bezoekers van de RoXY over uitgaan toen en nu.', placeholder: true },
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
      'Eten en drinken in Amsterdam, van de kroket uit de muur tot de jenever op het terras. We gaan langs bij de zaken waar Amsterdammers zelf komen.',
    ],
    articles: [
      {
        slug: 'uit-de-muur',
        category: 'Snack',
        title: 'Uit de muur',
        image: 'febo-kroket-automaat.webp',
        excerpt: 'Fotoverhaal over de FEBO en de snack uit de muur.',
        gallery: ['febo-automatenwand.webp', 'febo-kroket-eten.webp', 'febo-raam-tram.webp', 'febo-gevel-fietsers.webp'],
        placeholder: true,
      },
      {
        slug: 'koffie-verkeerd-of-matcha',
        category: 'Koffie',
        title: 'Koffie verkeerd tegenover matcha met havermelk',
        image: 'matcha-koffie-rietje.webp',
        layout: 'wide',
        excerpt: 'Over koffie verkeerd, iced matcha en wie wat bestelt.',
        gallery: ['matcha-koffie-tafel.webp'],
        placeholder: true,
      },
      {
        slug: 'de-borrel',
        category: 'Terras',
        title: 'Eentje dan',
        image: 'terras-twee-jongens.webp',
        excerpt: 'Fotoserie op een terras: een biertje, een cola en een jonge jenever.',
        gallery: ['borrelglaasjes-handen.webp'],
        placeholder: true,
      },
      { slug: 'de-bruine-kroeg', category: 'Bruine kroeg', title: 'De bruine kroeg als tijdcapsule', excerpt: 'Over de bruine kroeg en de vaste gasten aan de bar.', placeholder: true },
      { slug: 'albert-cuyp-om-zes-uur', category: 'Markt', title: 'Albert Cuyp om zes uur ’s ochtends', excerpt: 'De markt in de vroege ochtend, voordat het druk wordt.', placeholder: true },
      { slug: 'melk-tappen', category: 'Boerderij', title: 'Melk tappen op de boerderij', image: 'melk-tappen.webp', excerpt: 'Uit de special DORPSBRANIE: verse melk uit de tap op de boerderij.', placeholder: true },
    ],
  },
];
