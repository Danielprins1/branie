/**
 * BRANIE — de pagina Over ons (/over-ons)
 * ------------------------------------------------------------------
 * Alle teksten en de teamindeling staan hier. De polaroids staan in
 * src/assets/team/ (vul alleen de bestandsnaam in).
 *
 * LET OP: 'Wie we zijn' en 'Het project' zijn een eerste opzet.
 * Herschrijf ze gerust in jullie eigen woorden.
 */

export const about = {
  title: 'De koppen achter',
  scrollHint: 'Scroll en gooi de stapel om',

  who: {
    heading: 'Wie we zijn',
    script: '26 koppen, één blad',
    body: [
      'Wij zijn de 26 koppen achter BRANIE. Zesentwintig studenten die samen één redactie vormen, verdeeld over vier teams: tekst, beeld en vormgeving, marketing en digital, en sales, operations en events.',
      'We schrijven de verhalen, maken de foto’s, geven het blad vorm, bellen adverteerders en regelen de lancering. Alles zelf, van het eerste idee tot het moment dat BRANIE bij jou op de mat valt.',
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

  project: {
    heading: 'Het project',
    script: 'van idee tot drukker',
    body: [
      'BRANIE begon als opdracht binnen de minor Start-up: bedenk een magazine, maak het en breng het echt op de markt. Geen oefening die in een la verdwijnt, maar een blad dat je kunt vasthouden.',
      'Daarom doen we alles wat een echte uitgever ook doet. We zoeken adverteerders, bouwen een merk op, organiseren de lancering en verkopen het magazine zelf. Op 14 januari 2027 ligt het er.',
    ],
    facts: [
      ['Lancering', '14 januari 2027'],
      ['Oplage', '750 stuks'],
      ['Omvang', '164 pagina’s'],
      ['Editie', 'Eenmalig'],
    ],
  },

  magazine: {
    heading: 'En BRANIE zelf',
    script: 'toen naast nu',
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
