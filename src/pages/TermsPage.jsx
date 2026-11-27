import { Fragment, useEffect } from 'react';
import { terms } from '../config/terms.js';
import { brand } from '../config/site.js';
import { navigateTo } from '../lib/navigate.js';
import BrandLogo from '../components/BrandLogo.jsx';
import Footer from '../components/Footer.jsx';

/** {email} wordt een mailto-link en **vet** wordt <strong>. */
function Text({ text }) {
  const filled = text.replace(/\{email\}/g, terms.seller.email);
  const parts = filled.split(/(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} href={`mailto:${part}`}>
          {part}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/**
 * Algemene voorwaarden (/voorwaarden). Alleen bereikbaar via de footer.
 * Inhoud: src/config/terms.js.
 */
export default function TermsPage({ doc = terms }) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${doc.title} · ${brand.name}`;
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
    };
  }, [doc]);

  const home = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    navigateTo('/');
    window.scrollTo(0, 0);
  };

  const s = doc.seller;
  const rows = [
    ['Naam', s.name],
    ['Adres', s.address],
    ['E-mail', s.email],
    ['Website', s.website],
    ['KVK-nummer', s.kvk],
    ['Btw-nummer', s.btw],
  ].filter(([, value]) => value);

  return (
    <>
      <main className="terms">
        <a className="terms__logo" href="/" onClick={home} aria-label={`${brand.name}: naar de homepage`}>
          <BrandLogo as="span" />
        </a>

        <article className="terms__inner">
          <h1 className="terms__title">{doc.title}</h1>
          <p className="terms__intro">{doc.intro}</p>
          <p className="terms__updated">Laatst bijgewerkt: {doc.updated}</p>

          {doc.sections.map((section, i) => (
            <section className="terms__section" key={section.title}>
              <h2>
                <span className="terms__num" aria-hidden="true">
                  {i + 1}
                </span>
                {section.title}
              </h2>
              {section.seller && (
                <dl className="terms__seller">
                  {rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>
                        <Text text={value} />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {section.text?.map((paragraph) => (
                <p key={paragraph}>
                  <Text text={paragraph} />
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
