import { articles } from './articles.js';

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
 * Artikelen: zie src/config/articles.js.
 */

export const pillarsPage = {
  title: 'De pijlers',
  hint: 'Scheur open',
  tagline: 'scheur de stad open',
  backLabel: 'Alle pijlers',
  articlesHeading: 'Verhalen',
  lockedHeading: 'Lees verder in BRANIE',
  lockedText: 'Net als het leuk wordt, hè? Het hele verhaal lees je in BRANIE. Pre-order het magazine en lees verder.',
};

export const pillars = [
  {
    slug: 'personen',
    title: 'De Amsterdamse bek',
    subtitle: 'De (on)bekende Amsterdammer, ondernemers en lokale makers.',
    image: 'personen-schaatsen.webp',
    focus: '50% 40%',
    introImage: 'snoepsigaret-stippenjurk.webp',
    intro: [
      'De Amsterdammers die je elke dag ziet en nooit spreekt: de kroegbaas op de hoek, de buurvrouw die alles weet, de ondernemer die al veertig jaar dezelfde zaak heeft. We gaan bij ze zitten en laten ze vertellen.',
    ],
    articles: articles['personen'],
  },
  {
    slug: 'de-stad',
    title: 'Achter de gevel',
    subtitle: 'Wonen, architectuur, plekken, buurten en het veranderende straatbeeld.',
    image: 'stad-markt.webp',
    focus: '50% 38%',
    introImage: 'plaskrul-gracht-heroshot.webp',
    intro: [
      'Gebouwen, straten en buurten, en wat ervan over is. We leggen oude foto’s naast nieuwe en gaan langs bij de mensen die er wonen, ook buiten de ring.',
    ],
    articles: articles['de-stad'],
  },
  {
    slug: 'onderweg',
    title: 'Dwars door de straten',
    subtitle: 'Openbaar vervoer, fietsen, mobiliteit en bereikbaarheid.',
    image: 'onderweg-pont.webp',
    focus: '50% 30%',
    intro: [
      'Over de pont, de tram en de fiets: hoe Amsterdammers zich door hun stad bewegen, en waar ze zich onderweg aan ergeren.',
    ],
    articles: articles['onderweg'],
  },
  {
    slug: 'cultuur',
    title: 'De stad maakt lawaai',
    subtitle: '(Straat)cultuur, mode, identiteit, muziek, nachtleven, taal en kunst.',
    image: 'cultuur-straat.webp',
    focus: '50% 34%',
    introImage: 'concerto-cd-wand.webp',
    intro: [
      'Muziek, film, mode, straatkunst en de taal die je alleen hier hoort. We gaan naar de platenzaak, het filmhuis en de muren waar steeds nieuwe posters op komen.',
    ],
    articles: articles['cultuur'],
  },
  {
    slug: 'proef-de-stad',
    title: 'Om je vingers bij af te likken',
    subtitle: 'Eten, drinken, horeca en de Amsterdamse eetcultuur.',
    image: 'proef-bruine-kroeg.webp',
    focus: '50% 70%',
    introImage: 'febo-automatenwand.webp',
    intro: [
      'Eten en drinken in Amsterdam, van de kroket uit de muur tot de jenever op het terras. We gaan langs bij de zaken waar Amsterdammers zelf komen.',
    ],
    articles: articles['proef-de-stad'],
  },
];
