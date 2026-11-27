/**
 * BRANIE — de privacyverklaring (/privacy)
 * ------------------------------------------------------------------
 * Alle tekst staat hier, zelfde opzet als terms.js ({email}, **vet**).
 * Alleen bereikbaar via de footer.
 *
 * CONCEPT: geen juridisch advies. Laat de tekst controleren door de HvA
 * of een jurist en pas hem aan als jullie tools veranderen (mailtool voor
 * de nieuwsbrief, andere analytics, enzovoort).
 */
import { terms } from './terms.js';

export const privacy = {
  title: 'Privacyverklaring',
  updated: '27 november 2026',
  intro: 'BRANIE vindt jouw privacy belangrijk. Hier lees je welke gegevens we verzamelen, waarom, en wat je rechten zijn.',
  seller: terms.seller,

  sections: [
    {
      title: 'Wie is verantwoordelijk?',
      seller: true,
      text: ['Voor vragen over je gegevens mail je ons op {email}.'],
    },
    {
      title: 'Welke gegevens we gebruiken',
      text: [
        '**Bestelling van het magazine.** Je naam, bezorgadres, e-mailadres en eventueel de vouchercode die je hebt gebruikt. Je betaling verloopt via Stripe. Je bank- of kaartgegevens zien wij niet.',
        '**Cadeaubon.** Koop je een cadeaubon, dan krijgen we je e-mailadres en betaalgegevens via Stripe. Verzilver je een bon, dan vul je zelf je naam, adres, e-mailadres en de code in. Die gegevens gaan via Make (automatisering) naar ons.',
        '**Nieuwsbrief.** Meld je je aan, dan bewaren we je e-mailadres, de datum van aanmelding en de pagina waarop je je aanmeldde.',
        '**Contact.** Mail je ons, dan bewaren we je mail en je e-mailadres om je antwoord te geven.',
        '**Website.** Onze hostingpartij verwerkt technische gegevens, zoals je IP-adres, om de site te laten werken en te beveiligen. Analytische cookies (Google Analytics) zetten we alleen aan als je daarvoor toestemming geeft.',
      ],
    },
    {
      title: 'Waarom we ze gebruiken',
      text: [
        'Om je bestelling af te handelen, te bezorgen en je vragen te beantwoorden (nodig voor de overeenkomst). Om te voldoen aan de wet, zoals de belasting- en administratieplicht. Om je de nieuwsbrief te sturen (alleen met jouw toestemming). Om te zien hoe de site wordt gebruikt (alleen met jouw toestemming).',
      ],
    },
    {
      title: 'Met wie we ze delen',
      text: [
        'Alleen met partijen die we nodig hebben om BRANIE te kunnen leveren: Stripe (betalen), PostNL (bezorgen), Make en Google (automatisering en opslag van aanmeldingen en bestellijsten), onze hostingpartij Vercel en, als je toestemming geeft, Google Analytics. Met deze partijen hebben we afspraken over het veilig omgaan met gegevens. We verkopen je gegevens niet.',
        'Sommige van deze partijen zitten buiten de Europese Unie. Zij werken met de gebruikelijke waarborgen die de wet daarvoor vraagt.',
      ],
    },
    {
      title: 'Hoe lang we ze bewaren',
      text: [
        'Gegevens van bestellingen bewaren we zo lang de wet dat vraagt, tot maximaal 7 jaar. Je nieuwsbriefadres bewaren we tot je je afmeldt. Mails aan ons bewaren we niet langer dan nodig is om je vraag af te handelen.',
      ],
    },
    {
      title: 'Jouw rechten',
      text: [
        'Je mag ons vragen om inzage in je gegevens, om ze te corrigeren, te verwijderen of over te dragen, en je kunt bezwaar maken tegen het gebruik ervan. Heb je toestemming gegeven, dan trek je die altijd weer in, zonder dat dat iets verandert aan wat daarvoor is gebeurd. Mail ons op {email}, we reageren binnen een maand.',
        'Je kunt je afmelden voor de nieuwsbrief door ons te mailen op {email}. Cookies pas je op elk moment aan via Cookie-instellingen onderaan de pagina.',
        'Ben je niet tevreden over hoe we met je gegevens omgaan? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.',
      ],
    },
    {
      title: 'Wijzigingen',
      text: ['Veranderen we iets aan hoe we met gegevens omgaan, dan passen we deze pagina aan. De datum bovenaan laat zien wanneer dat voor het laatst gebeurde.'],
    },
  ],
};
