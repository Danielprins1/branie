// Laadt alle afbeeldingen uit src/assets automatisch in, zodat je in
// src/config/site.js alleen de bestandsnaam hoeft in te vullen.
const wall = import.meta.glob('../assets/wall/*.{webp,avif,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});
const coverImages = import.meta.glob('../assets/cover/*.{webp,avif,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});

function byName(map, folder) {
  return (name) => {
    if (!name) return undefined;
    const url = map[`../assets/${folder}/${name}`];
    if (!url && import.meta.env.DEV) {
      console.warn(`[BRANIE] Afbeelding niet gevonden: src/assets/${folder}/${name}`);
    }
    return url;
  };
}

export const wallImage = byName(wall, 'wall');
export const coverImage = byName(coverImages, 'cover');

const brandFiles = import.meta.glob('../assets/brand/*.{svg,webp,png}', {
  eager: true,
  import: 'default',
});
export const brandAsset = byName(brandFiles, 'brand');

// Foto's voor de pijlers (src/assets/pillars/). `anyImage` zoekt ook op de muur.
const pillarFiles = import.meta.glob('../assets/pillars/*.{webp,avif,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});
export const pillarImage = byName(pillarFiles, 'pillars');
export function anyImage(name) {
  if (!name) return undefined;
  return pillarFiles[`../assets/pillars/${name}`] ?? wall[`../assets/wall/${name}`] ?? wallImage(name);
}

// Foto's voor de salespagina (src/assets/sales/).
const salesFiles = import.meta.glob('../assets/sales/*.{webp,avif,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});
export const salesImage = (name) => salesFiles[`../assets/sales/${name}`] ?? anyImage(name);
