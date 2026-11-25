/**
 * BRANIE: de cadeaubon (pagina /cadeau)
 * ------------------------------------------------------------------
 * Alles voor de cadeaubon staat hier: de twee koppelingen, de teksten,
 * de SEO en de banner op de homepage.
 *
 * De betaling loopt via Stripe en het versturen en controleren van de bon
 * via Make; de site bouwt zelf geen betaal- of codecontrole.
 *
 * Het adres /cadeau staat gedrukt op de bon (met ?code=BRANIE-XXXX-XXXX in
 * de QR-code). Verander die url dus niet.
 */
export const gift = {
  /** Stripe-betaallink voor het kopen van de bon (opent in hetzelfde tabblad). */
  stripeUrl: 'https://buy.stripe.com/9B614p1Rt8iC4YvdNjbQY08',

  /** Make-webhook die een bon verzilvert (POST, application/x-www-form-urlencoded). */
  redeemUrl: 'https://hook.eu1.make.com/1p5sz9y6dbkgq90pf7gbuauaq1cl4xch',

  /** Antwoordadres bij problemen. */
  email: 'info@braniemagazine.nl',

  price: '€24,95',
  priceNote: 'inclusief btw en verzending',

  /** Afbeelding van de bon, in src/assets/gift/. Vervang het bestand door de echte preview. */
  image: 'cadeaubon.webp',
  imageAlt: 'Voorbeeld van de BRANIE-cadeaubon: een bon met een unieke code, goed voor één magazine.',

  seo: {
    title: 'BRANIE cadeaubon: geef Amsterdam cadeau',
    description:
      'Geef BRANIE cadeau: het magazine over Amsterdam van 1950 tot nu. Digitale cadeaubon van € 24,95, direct in je mail. Verzilveren kan hier ook.',
  },

  /**
   * Tijdelijke banner op de homepage. Zet `enabled` op false om hem weg te
   * halen; de pagina /cadeau blijft gewoon bestaan voor het verzilveren.
   */
  banner: {
    enabled: true,
    text: 'Nog een cadeau nodig? Geef BRANIE.',
  },

  hero: {
    script: 'de BRANIE cadeaubon',
    title: 'Geef Amsterdam cadeau',
  },

  buy: {
    heading: 'Geef BRANIE cadeau',
    text: [
      'Koop de bon en je krijgt hem binnen een paar minuten per mail, als pdf met een unieke code. Print hem uit en geef hem cadeau.',
      'De ontvanger verzilvert de bon hieronder. Op 14 januari 2027 ligt BRANIE dan op de mat.',
    ],
    button: 'Koop de cadeaubon',
  },

  redeem: {
    heading: 'Bon gekregen? Verzilver hem hier',
    text: 'Vul de code van je bon in en waar BRANIE naartoe mag. Op 14 januari 2027 ligt het magazine bij je op de mat.',
    button: 'Verzilver mijn bon',
    sending: 'Even geduld',
    success: 'Gelukt! Op 14 januari 2027 ligt BRANIE bij je op de mat.',
    errors: {
      al_verzilverd: 'Deze code is al gebruikt.',
      ongeldig: 'Deze code kennen we niet. Check of je hem goed hebt overgenomen.',
      anders: 'Er ging iets mis. Probeer het opnieuw of mail',
    },
  },
};
