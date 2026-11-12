/**
 * BRANIE — de pagina Over ons (/over-ons)
 * ------------------------------------------------------------------
 * Alle teksten en de teamindeling staan hier. De polaroids staan in
 * src/assets/team/ (vul alleen de bestandsnaam in).
 */

export const about = {
  title: 'De koppen achter',
  scrollHint: 'Scroll en gooi de stapel om',

  who: {
    heading: 'Over BRANIE',
    script: 'toen en nu',
    body: [
      'BRANIE is een magazine over Amsterdam toen en nu, gemaakt door studenten van de Hogeschool van Amsterdam. We gaan op zoek naar de verhalen achter de straten waar je elke dag doorheen fietst. Iemand die er is opgegroeid ziet een andere buurt dan iemand die er vorige week de sleutel kreeg. Wij willen ze allebei spreken.',
      'Een beetje branie komt daarbij goed van pas. We stellen die ene vraag die je normaal inslikt, bellen aan waar we anders voorbij zouden lopen en vragen door als iemand zegt: ‘Zo gaat dat hier nou eenmaal.’ Juist dan willen we weten waarom.',
      'Want wat missen we nou écht aan vroeger? Wie voelt zich vandaag thuis in de stad? En wat zie je als je eens aan de andere kant van de straat gaat staan?',
    ],
  },

  teamsHeading: 'Vier teams',
  teams: [
    {
      name: 'Team Tekst',
      tone: 'red',
      members: [
        { name: 'Puck', photo: 'puck.webp' },
        { name: 'Charlie', photo: 'charlie.webp' },
        { name: 'Senna', photo: 'senna.webp' },
        { name: 'Maud', photo: 'maud-tekst.webp' },
        { name: 'Tamar', photo: 'tamar.webp' },
        { name: 'Jet', photo: 'jet.webp' },
        { name: 'Sanne', photo: 'sanne.webp' },
      ],
    },
    {
      name: 'Team Beeld & Vormgeving',
      tone: 'olive',
      members: [
        { name: 'Sem', photo: 'sem.webp' },
        { name: 'Maud', photo: 'maud-beeld.webp' },
        { name: 'Indy', photo: 'indy.webp' },
        { name: 'Jonna', photo: 'jonna.webp' },
        // `caption`: de naam wordt op de polaroid geschreven (foto zonder naam).
        { name: 'Thijs', photo: 'thijs.webp', caption: 'Thijs' },
        { name: 'Roemer', photo: 'roemer.webp' },
        { name: 'Caya', photo: 'caya.webp' },
      ],
    },
    {
      name: 'Team Marketing & Digital',
      tone: 'ochre',
      members: [
        { name: 'Milou', photo: 'milou.webp' },
        { name: 'Daniël', photo: 'daniel.webp' },
        { name: 'Iris', photo: 'iris.webp' },
        { name: 'Madeline', photo: 'madeline.webp' },
        { name: 'Serra', photo: 'serra.webp' },
        { name: 'Lynsey', photo: 'lynsey.webp' },
      ],
    },
    {
      name: 'Team Sales, Operations & Events',
      tone: 'bordeaux',
      members: [
        { name: 'Yenthe', photo: 'yenthe.webp' },
        { name: 'Esmée', photo: 'esmee.webp' },
        { name: 'Dyllon', photo: 'dyllon.webp' },
        { name: 'Charissa', photo: 'charissa.webp' },
        { name: 'Aniek', photo: 'aniek.webp' },
        { name: 'Ninthe', photo: 'ninthe.webp' },
      ],
    },
  ],

  /** De feiten op een rij, onder de teams. */
  facts: [
    ['Lancering', '14 januari 2027'],
    ['Oplage', '750 stuks'],
    ['Omvang', '164 pagina’s'],
    ['Editie', 'Eenmalig'],
  ],

  magazine: {
    heading: 'Het magazine',
    script: 'om te bewaren',
    // Deze tekst komt uit de saleskit.
    lead: 'Een magazine dat het Amsterdam van toen opnieuw tot leven brengt.',
    body: [
      'Amsterdam zit vol verhalen die langzaam uit het straatbeeld verdwijnen. Plekken die er niet meer zijn, gewoontes die zijn veranderd en verhalen van Amsterdammers die de stad hebben gevormd. BRANIE haalt deze verhalen naar boven en legt ze naast het Amsterdam van nu.',
      'Niet omdat het vroeger beter was, maar omdat het verleden het Amsterdam van nu betekenis geeft.',
    ],
    pillarsLink: 'Bekijk de vijf pijlers',
  },
};

/** Iedereen achter elkaar, voor de stapel bovenaan de pagina. */
export const everyone = about.teams.flatMap((team) => team.members);
