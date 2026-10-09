# BRANIE

Interactieve magazinewebsite voor **BRANIE**: een eigenzinnig magazine over Amsterdam, van 1950 tot nu.
*Geen blad voor de mond.*

> Status: projectbasis (fase 1). De fotomuur, introanimatie en scrollovergang volgen in de volgende fasen.

## Techniek

- [React](https://react.dev) + [Vite](https://vite.dev)
- Plain CSS
- [GSAP](https://gsap.com) + ScrollTrigger (voor de animaties)
- Hosting via [Vercel](https://vercel.com), gekoppeld aan deze GitHub-repository

## Lokaal draaien

Je hebt [Node.js](https://nodejs.org) 20 of hoger nodig.

```bash
git clone https://github.com/Danielprins1/branie.git
cd branie
npm install      # eenmalig: installeert de packages
npm run dev      # start de ontwikkelserver op http://localhost:5173
```

Andere commando's:

| Commando | Wat het doet |
|---|---|
| `npm run build` | Maakt de productieversie in `dist/` |
| `npm run preview` | Bekijkt die productieversie lokaal |

## Projectstructuur

```
branie/
├─ public/               Bestanden die ongewijzigd worden meegeleverd (favicon)
├─ src/
│  ├─ assets/wall/       Afbeeldingen voor de fotomuur
│  ├─ assets/cover/      De magazinecover
│  ├─ components/        React-componenten (PhotoWall, WallItem, …)
│  ├─ config/site.js     Centraal configuratiebestand: teksten, beelden, posities, kleuren, links
│  ├─ styles/            Globale CSS
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
└─ vite.config.js
```

## Publiceren (Vercel)

De repository is gekoppeld aan Vercel. Publiceren gaat automatisch:

- **Push naar `main`**: de live website wordt opnieuw gebouwd en gepubliceerd.
- **Push naar een andere branch**: Vercel maakt een aparte preview-link, zodat je wijzigingen eerst kunt bekijken.

Wijzigingen pushen vanaf je eigen computer:

```bash
git add .
git commit -m "Korte omschrijving van de wijziging"
git push
```

Vercel-instellingen (worden automatisch herkend):

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

## Aanpassen

Een uitgebreide handleiding (afbeeldingen vervangen, posities, cover, logo, kleuren, pre-orderlink) volgt zodra de website af is.
