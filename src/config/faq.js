/**
 * BRANIE — de FAQ-pagina (/faq)
 * ------------------------------------------------------------------
 * Alle vragen en antwoorden staan hier, per groep. Een link in een
 * antwoord schrijf je als [tekst](adres), bijvoorbeeld
 * [de pre-order](/#magazine) of [mail ons](mailto:sales@braniemagazine.nl).
 */

export const faq = {
  title: 'Veelgestelde vragen',
  script: 'kom binnen, vraag maar raak',
  intro: 'Alles wat je wilt weten over BRANIE, het bestellen en het magazine zelf.',

  /** Het rolluik bovenaan de pagina. */
  shutter: {
    small: 'FAQ',
    hint: 'Scroll om te openen',
  },

  groups: [
    {
      title: 'Over BRANIE',
      tone: 'red',
      items: [
        ['Wat is BRANIE?', 'BRANIE is een magazine over Amsterdam van 1950 tot nu. We zetten vroeger en nu naast elkaar: hoe de stad is veranderd, en hoe verschillende generaties Amsterdammers dat hebben beleefd. Oude stad, nieuwe streken.'],
        ['Is BRANIE een reisgids?', 'Nee. Je vindt bij ons geen top-10 van hotspots. BRANIE gaat over de mensen, buurten, kroegen, woorden en gewoontes die Amsterdam Amsterdam maken, en over wat er in 75 jaar is veranderd.'],
        ['Voor wie is BRANIE?', 'Voor iedereen met een band met de stad: wie er nu woont, er is opgegroeid of er ooit heeft gewoond, gewerkt of gestudeerd. Of je nu alleen het Amsterdam van nu kent of al drie versies hebt meegemaakt, BRANIE is voor jou.'],
        ['Dus vroeger was alles beter?', 'Juist niet. We zijn nostalgisch, maar we kiezen geen kant. Elke generatie maakt haar eigen Amsterdam, en wij laten ze naast elkaar zien. Wat beter is, mag je zelf bepalen.'],
        ['Waar gaan de verhalen over?', 'Over De (on)bekende Amsterdammer, Plekken & Buurten, Wonen & Architectuur, Eten & Drinken, Vervoer & Openbare Stad, Taal & Identiteit, Sport, Ondernemers & Lokale Makers, Kunst, Media & Straatcultuur, Muziek & Nachtleven en Mode & Straatstijl. [Bekijk de pijlers](/pijlers).'],
        ['Wie maakt BRANIE?', 'Een team jonge makers uit Amsterdam die de stad van vroeger en nu wil vastleggen voordat de verhalen verdwijnen. We interviewen echte Amsterdammers, van oud tot jong. [Bekijk de koppen achter BRANIE](/over-ons).'],
      ],
    },
    {
      title: 'Bestellen & pre-order',
      tone: 'olive',
      items: [
        ['Wanneer verschijnt BRANIE?', 'Op 14 januari 2027.'],
        ['Kan ik BRANIE nu al bestellen?', 'Ja, via [de pre-order](/#magazine) op deze website. Je bent dan een van de eersten met een exemplaar in handen.'],
        ['Waarom zou ik pre-orderen?', 'Je betaalt minder dan de losse prijs (€19,99 in plaats van €24,99) en je weet zeker dat je een exemplaar hebt. De oplage is 750 stuks.'],
        ['Wat kost BRANIE?', '€24,99 per exemplaar. Tijdens de pre-order betaal je €19,99.'],
        ['Hoe kan ik betalen?', 'Met iDEAL of creditcard. Je rekent veilig af via Stripe.'],
        ['Wanneer krijg ik mijn exemplaar?', 'Pre-orders worden rond de lancering op 14 januari 2027 verstuurd.'],
        ['Verzenden jullie ook buiten Amsterdam?', 'Ja, we verzenden binnen heel Nederland. De verzendkosten zie je bij het afrekenen.'],
        ['Kan ik BRANIE ook in de winkel kopen?', 'Ja. De verkooppunten maken we binnenkort bekend.'],
        ['Is BRANIE een leuk cadeau?', 'Voor elke Amsterdammer, en voor iedereen die ooit verliefd werd op de stad: ja.'],
      ],
    },
    {
      title: 'Het magazine zelf',
      tone: 'ochre',
      items: [
        ['Is BRANIE een eenmalige uitgave?', 'Ja, BRANIE is een bookazine dat één keer verschijnt.'],
        ['Hoe dik is BRANIE?', '164 pagina’s op 24 × 30 cm. Een magazine om te bewaren, niet om weg te gooien.'],
        ['Is BRANIE ook digitaal te lezen?', 'Nee, alleen in print.'],
        ['Is BRANIE in het Engels verkrijgbaar?', 'Nee, BRANIE is in het Nederlands, met af en toe flink wat Amsterdams.'],
      ],
    },
    {
      title: 'Meedoen & contact',
      tone: 'bordeaux',
      items: [
        ['Ik heb een mooi Amsterdams verhaal. Kan ik dat delen?', 'Graag! Stuur het naar [sales@braniemagazine.nl](mailto:sales@braniemagazine.nl) of via [Instagram](https://www.instagram.com/braniemagazine).'],
        ['Ik wil adverteren of samenwerken met BRANIE. Kan dat?', 'Zeker. Mail [sales@braniemagazine.nl](mailto:sales@braniemagazine.nl) of bekijk [de saleskit](/sales) met al onze mogelijkheden.'],
        ['Hoe blijf ik op de hoogte?', 'Volg ons op Instagram: [@braniemagazine](https://www.instagram.com/braniemagazine).'],
      ],
    },
  ],

  outro: {
    heading: 'Staat je vraag er niet bij?',
    text: 'Mail ons, dan krijg je antwoord.',
    email: 'sales@braniemagazine.nl',
  },
};
