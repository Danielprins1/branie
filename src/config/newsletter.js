// Nieuwsbrief-aanmelding in de footer.
// Aanmeldingen gaan via /api/nieuwsbrief naar een Google Sheet.
// enabled: true = het formulier blijft verborgen. Zet op true zodra de
// drie Google-instellingen in Vercel staan (zie api/nieuwsbrief.js).
export const newsletter = {
  enabled: true,
  url: '/api/nieuwsbrief',
  heading: 'Blijf op de hoogte',
  text: 'Een paar keer per jaar een mail met nieuws over BRANIE. Geen spam.',
  placeholder: 'Je e-mailadres',
  consent: 'Ja, ik wil de nieuwsbrief van BRANIE ontvangen. Afmelden kan altijd.',
  button: 'Aanmelden',
  sending: 'Even geduld…',
  success: 'Gelukt! Je staat op de lijst.',
  error: 'Dat lukte niet. Probeer het later nog eens of mail ons.',
};
