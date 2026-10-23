# BRANIE

Interactieve magazinewebsite voor **BRANIE**: een eigenzinnig magazine over Amsterdam, van 1950 tot nu.
*Geen blad voor de mond.*

Je komt binnen op een schermvullende fotomuur, met daaroverheen het logo en de pay-off. Scroll je naar beneden, dan
komt de magazinecover los van de muur en valt hij in de volgende sectie, waar het magazine wordt gepresenteerd met
een pre-orderknop.

## Techniek

- [React](https://react.dev) + [Vite](https://vite.dev), gewone CSS
- [GSAP](https://gsap.com) + ScrollTrigger voor de intro en de scrollovergang
- Lettertypes lokaal via Fontsource (Londrina Solid, Sacramento, Inter)
- Hosting via [Vercel](https://vercel.com), gekoppeld aan deze GitHub-repository

## Lokaal draaien

Je hebt [Node.js](https://nodejs.org) 20 of hoger nodig.

```bash
git clone https://github.com/Danielprins1/branie.git
cd branie
npm install      # eenmalig
npm run dev      # open http://localhost:5173
```

| Commando | Wat het doet |
|---|---|
| `npm run dev` | Ontwikkelserver; wijzigingen zie je direct |
| `npm run build` | Maakt de productieversie in `dist/` (dit doet Vercel ook) |
| `npm run preview` | Bekijkt die productieversie lokaal |

## Projectstructuur

```
branie/
├─ originals/                Originele, onbewerkte beeldbestanden (worden niet gepubliceerd)
├─ src/
│  ├─ config/site.js         ★ Hier pas je bijna alles aan
│  ├─ assets/wall/           Afbeeldingen voor de fotomuur (WebP)
│  ├─ assets/cover/          Afbeelding(en) voor de magazinecover
│  ├─ assets/brand/          Logo en rode sterretje (SVG)
│  ├─ components/
│  │  ├─ PhotoWall.jsx       De muur (schaalt een vast canvas schermvullend)
│  │  ├─ WallItem.jsx        Eén object op de muur (foto, lijst, poster, knipsel…)
│  │  ├─ IntroAnimation.jsx  De intro (muur → logo → pay-off)
│  │  ├─ BrandLogo.jsx       Het logo (SVG uit de config)
│  │  ├─ Payoff.jsx          De pay-off (nu tekst in handschriftletter)
│  │  ├─ MagazineCover.jsx   De cover als fysiek tijdschrift
│  │  ├─ MagazineTransition.jsx  De cover die van de muur valt
│  │  ├─ MagazineSection.jsx De magazinepresentatie
│  │  ├─ PreOrderButton.jsx  De pre-orderknop
│  │  └─ ComingSoon.jsx      De 'in opbouw'-pagina
│  ├─ styles/                CSS (global, wall, hero, magazine) + fonts.js
│  └─ lib/assets.js          Laadt afbeeldingen automatisch op bestandsnaam
└─ index.html
```

## Aanpassen

Bijna alles staat in **`src/config/site.js`**. Na het opslaan zie je het resultaat meteen in `npm run dev`.

### Een afbeelding op de muur vervangen

1. Zet het nieuwe bestand in `src/assets/wall/`. Gebruik bij voorkeur **WebP** van maximaal ±1000 px aan de lange
   kant (in [Squoosh](https://squoosh.app) kun je elk beeld zo omzetten). Bewaar het origineel eventueel in
   `originals/`.
2. Zoek het object in `wallItems` in `src/config/site.js` en verander `image`:
   ```js
   image: 'mijn-nieuwe-foto.webp',
   alt: 'Korte beschrijving van wat er op de foto staat.',
   ```
   Pas ook de `alt` aan: die wordt voorgelezen aan mensen die de foto niet kunnen zien.

### Een nieuwe afbeelding toevoegen

Voeg een object toe aan de lijst `wallItems`:

```js
{
  id: 'bijlmer',                  // unieke naam
  type: 'photo',                  // 'photo' | 'framed' | 'page' (zie de uitleg in site.js)
  image: 'bijlmer-1975.webp',
  alt: 'Flats in de Bijlmer in 1975.',
  title: 'Bijlmer, 1975',         // optioneel: bijschrift bij hover
  attach: 'tape',                 // 'tape' | 'tape-corners' | 'pin' | 'none'
  desktop: { x: 900, y: 400, w: 220, r: -2, z: 3 },
  mobile:  { x: 100, y: 1100, w: 240, r: 2, z: 3 },   // weglaten = niet tonen op mobiel
},
```

Er zijn ook objecten zonder foto: `poster`, `note`, `clipping`, `ticket`, `ad`, `sticker` en `placeholder`. Het
commentaar boven `wallItems` laat zien welke velden ze hebben; kopieer gerust een bestaand object.

### De positie van een afbeelding veranderen

Elk object heeft per indeling `{ x, y, w, h, r, z }`:

- De muur is ontworpen op een **canvas van 1600 × 1000** (desktop) en **800 × 1400** (staande schermen). Dat canvas
  wordt altijd schermvullend geschaald; wat buiten beeld valt, wordt afgesneden.
- `x`, `y` = linkerbovenhoek, `w` = breedte, `h` = hoogte (bij foto's weglaten), `r` = rotatie in graden,
  `z` = wat bovenop ligt.
- Houd het midden vrij voor het logo (desktop ± x 430–1170 / y 370–680).
- Belangrijke dingen (zoals de cover) liefst tussen **y 150 en 850** zetten: op heel brede schermen valt boven en
  onder wat weg.

### De cover vervangen

In `src/config/site.js` → `cover`:

- **Kant-en-klare cover:** zet een staand beeld (3:4, bijvoorbeeld 900 × 1200 px) in `src/assets/cover/` en vul in:
  `image: 'branie-cover-nr1.webp'`. Dan wordt alleen dat beeld gebruikt: op de muur, tijdens de val en in de sectie.
- **Voorlopige cover:** laat `image` leeg en pas `photo`, `headline`, `headlineAccent` en `lines` aan.
- Andere verhouding? Pas `aspect` aan (breedte ÷ hoogte), én `aspect-ratio` in `.cover-frame` in
  `src/styles/magazine.css`.
- `restingRotation` bepaalt hoe scheef het magazine uiteindelijk ligt.

### Het logo en de pay-off vervangen

- **Logo:** staat als SVG in `src/assets/brand/branie-logo.svg` (origineel in `originals/`; de vorige versie heet `-v1`). De kleur kies je per plek met `brand.logoColors` (muur, magazinesectie, poster). Nieuwe versie? Vervang het
  bestand (zelfde naam), of zet een nieuw bestand in die map en pas `brand.logo` en `brand.logoAspect`
  (breedte ÷ hoogte uit de `viewBox`) aan in `site.js`. Het logo wordt als masker gebruikt, dus de kleur in het bestand
  maakt niet uit: die komt uit de CSS (crème op de muur, bordeaux in de magazinesectie).
  Laat `brand.logo` leeg om terug te vallen op gewone tekst.
- **Sterretje:** `src/assets/brand/asterisk.svg` (instelling `brand.asterisk`). Wordt overal gebruikt: naast het logo,
  op posters en in de footer. `brand.showAsterisk: false` verbergt het naast het logo.
- **Pay-off-tekst:** `brand.payoff` in `site.js`.
- **Handgeschreven pay-off als SVG-schrijfanimatie:** vervang in `src/components/Payoff.jsx` de tekst door je inline
  `<svg>` met paden, en animeer in `src/components/IntroAnimation.jsx` (regel met `.payoff`) de `stroke-dashoffset`
  in plaats van `--reveal`. Laat de className `payoff` staan; dan blijft de timing van de intro kloppen.
- **Tip:** SVG's kun je verkleinen met [SVGOMG](https://jakearchibald.github.io/svgomg/). Zet daarbij
  "Remove viewBox" **uit**, anders schaalt het logo niet meer mee.

### Kleuren en lettertypes aanpassen

- **Kleuren:** `colors` in `site.js`. Ze worden als CSS-variabelen gebruikt (`red` → `var(--color-red)`), dus één
  wijziging werkt overal door.
- **Lettertypes:** installeer een Fontsource-pakket, bijvoorbeeld `npm install @fontsource/bebas-neue`, importeer het
  in `src/styles/fonts.js` (`import '@fontsource/bebas-neue';`) en zet de naam in `fonts` in `site.js`
  (`display: "'Bebas Neue', sans-serif"`). Eigen fontbestanden kunnen ook: zet ze in `src/assets/fonts/` en voeg een
  `@font-face` toe aan `src/styles/global.css`.

### De pre-orderlink wijzigen

In `site.js` → `preorder`:

```js
url: 'https://www.jouwwinkel.nl/branie-pre-order',
openInNewTab: true,   // optioneel
```

Zolang `url` leeg is, is de knop gemarkeerd als **Binnenkort** en staat eronder dat bestellen nog niet kan.

## 'In opbouw'-pagina en lanceren

Zolang BRANIE nog niet af is, toont de **live website** een 'in opbouw'-pagina: een grote, opgeplakte poster op de
fotomuur. **Previews** (andere branches) en `npm run dev` tonen gewoon de volledige site, zodat je ongestoord kunt
doorwerken.

- **Bekijken zonder live te zetten:** zet `?binnenkort` achter een URL, bijvoorbeeld
  `http://localhost:5173/?binnenkort` of `<preview-link>/?binnenkort`.
- **Volledige site op de live URL bekijken (bijvoorbeeld voor een presentatie):** zet `?volledig` erachter. Let op:
  dit is geen beveiliging; iedereen die dit weet, kan het ook.
- **Teksten en posities aanpassen:** `comingSoon` in `src/config/site.js`. De objecten rond de poster verwijzen met
  `id` naar de objecten van de fotomuur en krijgen daar een eigen positie.
- **Lanceren:** zet in `src/config/site.js` `launch.comingSoonOnProduction` op `false`, commit en push naar `main`.
  Binnen een minuut staat de volledige site live.

Hoe weet de site of hij live staat? Vercel geeft bij het bouwen `VERCEL_ENV` mee (`production` voor `main`,
`preview` voor andere branches). `vite.config.js` maakt die waarde beschikbaar voor `src/main.jsx`.

## Publiceren

De repository is gekoppeld aan Vercel. Publiceren gaat automatisch:

- **Push naar `main`** → de live website wordt opnieuw gebouwd en gepubliceerd (± 1 minuut).
- **Push naar een andere branch** → Vercel maakt een aparte **preview-link**, zodat je eerst kunt kijken. De link
  staat in je Vercel-dashboard en bij de commit/pull request op GitHub.

Wijzigingen naar GitHub pushen vanaf je computer:

```bash
git add .
git commit -m "Nieuwe foto's op de muur"
git push
```

Gaat een build mis, dan blijft de vorige versie online en zie je de foutmelding in Vercel onder **Deployments**.
Draai `npm run build` lokaal om de fout te vinden.

Vercel-instellingen (worden automatisch herkend): framework **Vite**, build command `npm run build`, output `dist`.

## Hoe de scrollovergang werkt

- De muur blijft (`position: sticky`) staan terwijl de cover loskomt, en schuift daarna omhoog.
- Er is één "vliegende" cover. Op elk frame worden de plek op de muur en de landingsplek in de sectie opnieuw
  gemeten, en de cover wordt daartussen geïnterpoleerd (FLIP-achtig). Begin- en eindpositie kloppen daardoor op elk
  schermformaat.
- Bij het begin en einde wisselt de vliegende cover onzichtbaar met de "echte" cover op de muur of in de sectie.
- De scroll bestuurt alles (`scrub`), dus achteruit scrollen werkt vanzelf.
- Met "minder beweging" (prefers-reduced-motion) staan muur, logo en magazine gewoon stil op hun plek.

Fijnafstemming staat bovenin `src/components/MagazineTransition.jsx` (`LIFT_END`) en in de `render`-functie
(schaal, rotatie, kanteling en schaduw tijdens de val).

## Beeldmateriaal

De foto's op de muur komen uit de BRANIE-doelgroepanalyse en de DORPSBRANIE-special (originelen in `originals/`).
De lege lijsten "1950 / nu" zijn bedoeld voor een vroeger-en-nu-fotopaar dat nog moet komen.
