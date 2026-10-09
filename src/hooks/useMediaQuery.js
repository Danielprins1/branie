import { useSyncExternalStore } from 'react';

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const PORTRAIT_QUERY = '(max-aspect-ratio: 4/5)';
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
