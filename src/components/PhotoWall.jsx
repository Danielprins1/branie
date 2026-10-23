import { forwardRef } from 'react';
import { wallCanvas, wallItems as defaultItems } from '../config/site.js';
import { useMediaQuery, PORTRAIT_QUERY } from '../hooks/useMediaQuery.js';
import WallItem from './WallItem.jsx';

/**
 * De fotomuur: een vast ontwerp-canvas dat schermvullend wordt geschaald
 * (zoals `object-fit: cover`). Staande schermen krijgen een eigen indeling.
 */
const PhotoWall = forwardRef(function PhotoWall({ onCoverActivate, items: sourceItems = defaultItems }, coverSlotRef) {
  const portrait = useMediaQuery(PORTRAIT_QUERY);
  const layout = portrait ? 'mobile' : 'desktop';
  const canvas = wallCanvas[layout];
  const items = sourceItems.filter((item) => item[layout]);

  return (
    <div className="wall" data-layout={layout} style={{ '--cw': canvas.width, '--ch': canvas.height }}>
      <div className="wall__canvas">
        {items.map((item) => (
          <WallItem
            key={item.id}
            item={item}
            layout={layout}
            ref={item.type === 'cover' ? coverSlotRef : undefined}
            onCoverActivate={onCoverActivate}
          />
        ))}
      </div>
      <div className="wall__light" aria-hidden="true" />
    </div>
  );
});

export default PhotoWall;
