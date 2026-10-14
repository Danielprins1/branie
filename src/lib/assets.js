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
