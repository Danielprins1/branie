import { forwardRef } from 'react';
import { brand, cover } from '../config/site.js';
import { wallImage } from '../lib/assets.js';
import MagazineCover from './MagazineCover.jsx';
import Asterisk from './Asterisk.jsx';

/** Eén object op de fotomuur. Positie/formaat komen uit de config. */
const WallItem = forwardRef(function WallItem({ item, layout, onCoverActivate }, coverSlotRef) {
  const pos = item[layout];
  const isCover = item.type === 'cover';
  const height = isCover ? pos.w / cover.aspect : pos.h;

  const style = {
    left: `calc(${pos.x} * var(--u))`,
    top: `calc(${pos.y} * var(--u))`,
    width: `calc(${pos.w} * var(--u))`,
    height: height ? `calc(${height} * var(--u))` : undefined,
    zIndex: pos.z ?? 1,
  };

  if (isCover) {
    return (
      <div className="wall-item wall-item--cover" style={style}>
        <div className="cover-slot" ref={coverSlotRef} data-rotation={pos.r ?? 0}>
          <span className="cover-slot__ghost" style={{ rotate: `${pos.r ?? 0}deg` }} aria-hidden="true" />
          <span className="cover-slot__nail" aria-hidden="true" />
          <button
            type="button"
            className="wall-item__body wall-cover"
            style={{ rotate: `${pos.r ?? 0}deg` }}
            onClick={onCoverActivate}
            aria-label={`${brand.name} ${cover.issue}: bekijk het magazine`}
          >
            <span className="cover-frame">
              <MagazineCover priority />
            </span>
            {item.title && (
              <span className="wall-item__caption" aria-hidden="true">
                {item.title}
              </span>
            )}
          </button>
        </div>
      </div>
    );
  }

  const hoverable = Boolean(item.title);

  return (
    <div className={`wall-item wall-item--${item.type}${hoverable ? ' wall-item--hoverable' : ''}`} style={style}>
      <div className="wall-item__body" style={{ rotate: `${pos.r ?? 0}deg` }}>
        <ItemContent item={item} />
        <Attachment kind={item.attach} />
        {hoverable && (
          <span className="wall-item__caption" aria-hidden="true">
            {item.title}
          </span>
        )}
      </div>
    </div>
  );
});

export default WallItem;

function Img({ item }) {
  return (
    <img
      src={wallImage(item.image)}
      alt={item.alt ?? ''}
      loading="eager"
      decoding="async"
      draggable="false"
    />
  );
}

function ItemContent({ item }) {
  switch (item.type) {
    case 'photo':
      return (
        <div className="print">
          <Img item={item} />
        </div>
      );
    case 'framed':
      return (
        <div className={`frame frame--${item.frame ?? 'black'}`}>
          <div className="frame__mat">
            <Img item={item} />
          </div>
        </div>
      );
    case 'page':
      return (
        <div className="page">
          <Img item={item} />
        </div>
      );
    case 'poster':
      return (
        <div className={`poster poster--${item.tone ?? 'paper'}`} style={item.fontSize ? { '--poster-size': item.fontSize } : undefined}>
          <p className="poster__lines">
            {item.lines.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </p>
          {item.script && <p className="poster__script">{item.script}</p>}
          {item.tone !== 'red' && <Asterisk className="poster__asterisk" />}
        </div>
      );
    case 'note':
      return (
        <div className="note">
          <p className="note__text">{item.text}</p>
          {item.sign && <p className="note__sign">{item.sign}</p>}
        </div>
      );
    case 'clipping':
      return (
        <div className="clipping">
          <p className="clipping__kicker">{item.kicker}</p>
          <p className="clipping__headline">{item.headline}</p>
          <p className="clipping__body">{item.body}</p>
        </div>
      );
    case 'ticket':
      return (
        <div className="ticket">
          <div className="ticket__main">
            <p className="ticket__top">{item.top}</p>
            <p className="ticket__title">{item.main}</p>
            <p className="ticket__bottom">{item.bottom}</p>
          </div>
          <div className="ticket__stub" aria-hidden="true">
            <span>Nº 0412</span>
          </div>
        </div>
      );
    case 'ad':
      return (
        <div className="ad">
          <p className="ad__heading">{item.heading}</p>
          <p className="ad__text">{item.text}</p>
          <div className="ad__tabs" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={i === 2 ? 'is-torn' : undefined}>
                {item.tab}
              </span>
            ))}
          </div>
        </div>
      );
    case 'sticker':
      return (
        <div className="sticker">
          <span>{item.text}</span>
        </div>
      );
    case 'placeholder':
      return (
        <div className="placeholder-board" role="img" aria-label="Lege fotolijsten: hier komen nog foto's van vroeger en nu.">
          {(item.pair ?? ['']).map((label) => (
            <div key={label} className="placeholder-board__slot">
              <span className="placeholder-board__year">{label}</span>
              <span className="placeholder-board__label">{item.label}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function Attachment({ kind }) {
  if (!kind || kind === 'none') return null;
  if (kind === 'pin') return <span className="pin" aria-hidden="true" />;
  if (kind === 'tape-corners')
    return (
      <>
        <span className="tape tape--tl" aria-hidden="true" />
        <span className="tape tape--tr" aria-hidden="true" />
      </>
    );
  return <span className="tape tape--top" aria-hidden="true" />;
}
