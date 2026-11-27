/**
 * BRANIE — de pagina Algemene voorwaarden (/voorwaarden)
 * ------------------------------------------------------------------
 * Alle tekst staat hier. Deze pagina staat alleen in de footer, niet in
 * het menu. Een leeg veld bij `seller` (kvk, btw) verdwijnt vanzelf van
 * de pagina: vul ze in zodra je ze hebt.
 *
 * Gebruik {email} in een tekst voor het e-mailadres; het wordt vanzelf
 * een link. Zet **vet** tussen sterretjes.
 *
 * LET OP: dit is een heldere, korte standaardtekst, geen juridisch
 * advies. Laat hem controleren door de HvA of een jurist voordat de
 * verkoop start.
 */

export const terms = {
  title: 'Algemene voorwaarden',
  updated: '16 november 2026',
  intro: 'Kort en duidelijk: dit geldt als je BRANIE bestelt op braniemagazine.nl.',

  seller: {
    name: 'BRANIE Magazine',
    address: 'Rhijnspoorplein 1, 1091 GC Amsterdam',
    email: 'sales@braniemagazine.nl',
    website: 'braniemagazine.nl',
    kvk: '',
    btw: '',
  },

  sections: [
    {
      title: 'Wie wij zijn',
      seller: true,
    },
    {
      title: 'Waarvoor gelden deze voorwaarden',
      text: ['Ze gelden voor elke bestelling van het magazine BRANIE via braniemagazine.nl. Door te bestellen ga je hiermee akkoord.'],
    },
    {
      title: 'Wat je bestelt',
      text: [
        'BRANIE is een eenmalig magazine over Amsterdam van 1950 tot nu: 164 pagina’s, formaat 24 × 30 cm, in het Nederlands. De oplage is 750 exemplaren.',
        'Het magazine verschijnt op 14 januari 2027. Met een pre-order bestel je het dus al vooraf.',
      ],
    },
    {
      title: 'Prijzen',
      text: [
        'Een exemplaar kost in de pre-sale **€19,99 exclusief btw**. Met 9% btw is dat **€21,79**.',
        'De verzendkosten zijn **€4,25 exclusief btw**, met 9% btw **€4,63**. Heb je een vouchercode van een van de BRANIE-makers, dan betaal je geen verzendkosten.',
        'Het totaalbedrag zie je op de betaalpagina voordat je betaalt. Je betaalt niets extra’s.',
      ],
    },
    {
      title: 'Vouchercodes',
      text: ['Een vouchercode geeft gratis verzending op je bestelling. Je kunt er één per bestelling gebruiken, hij is niet in te wisselen voor geld en hij geldt niet met andere acties.'],
    },
    {
      title: 'Bestellen en betalen',
      text: [
        'Je betaalt direct bij het bestellen, met iDEAL of creditcard. De betaling loopt via Stripe.',
        'Na je betaling krijg je een bevestiging per e-mail. Daarmee is de bestelling definitief. Staat er niets in je inbox, kijk dan in je spam of mail ons.',
      ],
    },
    {
      title: 'Levering',
      text: [
        'We leveren alleen in Nederland, met PostNL, rond de verschijning op 14 januari 2027. Je krijgt het magazine op het adres dat je bij het afrekenen opgeeft.',
        'Verschuift de planning, dan mailen we je. Komt je bestelling meer dan 30 dagen later dan 14 januari 2027, dan kun je kosteloos annuleren en krijg je al je geld terug.',
      ],
    },
    {
      title: 'Bedenktijd en annuleren',
      text: [
        'Je mag je bestelling binnen 14 dagen na ontvangst zonder reden ontbinden. Annuleren kan ook al voordat je het magazine hebt gekregen. Mail ons dan op {email} met je naam en het e-mailadres van je bestelling.',
        'Je krijgt je geld binnen 14 dagen na je bericht terug, via dezelfde manier als waarmee je betaalde. Heb je het magazine al ontvangen, stuur het dan binnen 14 dagen na je bericht terug in goede staat. Wij sturen je dan het retouradres. De kosten van het terugsturen zijn voor jou.',
      ],
    },
    {
      title: 'Is er iets mis met je exemplaar',
      text: ['Is je magazine beschadigd of kwijt, mail ons dan op {email}. We reageren binnen 14 dagen en lossen het op, met een nieuw exemplaar of je geld terug.'],
    },
    {
      title: 'Jouw gegevens',
      text: [
        'We gebruiken je naam, adres en e-mailadres alleen om je bestelling af te handelen en te bezorgen. Daarvoor delen we ze met Stripe (betalen) en PostNL (bezorgen). We verkopen je gegevens niet.',
        'Meld je je aan voor de nieuwsbrief, dan bewaren we alleen je e-mailadres om die nieuwsbrief te sturen. Afmelden kan altijd via {email}.',
        'Analytische cookies zetten we alleen aan als je daar op onze site toestemming voor geeft. Dat kun je altijd aanpassen via Cookie-instellingen onderaan de pagina.',
      ],
    },
    {
      title: 'Welk recht geldt',
      text: ['Op je bestelling is Nederlands recht van toepassing. Komen we er samen niet uit, mail ons dan eerst. We lossen het liever samen op.'],
    },
  ],
};
