import { useCallback, useEffect, useState } from 'react';
import { dashboard } from '../config/dashboard.js';
import { brand } from '../config/site.js';
import BrandLogo from '../components/BrandLogo.jsx';

const KEY = 'branie-dashboard';
const REFRESH_MS = 60000;

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/**
 * Verkoopdashboard: staafdiagram met per persoon het aantal verkochte
 * exemplaren (via de vouchercode). Wachtwoordbeveiligd; de cijfers komen
 * uit Stripe via /api/verkoop. Zie README.md.
 */
export default function DashboardPage() {
  const [password, setPassword] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) || '';
    } catch {
      return '';
    }
  });
  const [typed, setTyped] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Niet laten indexeren en een neutrale titel.
  useEffect(() => {
    const prev = document.title;
    document.title = `${dashboard.title} · ${brand.name}`;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    window.scrollTo(0, 0);
    return () => {
      document.title = prev;
      meta.remove();
    };
  }, []);

  const load = useCallback(
    async (pw) => {
      if (!pw) return;
      setLoading(true);
      setError('');
      try {
        const response = await fetch('/api/verkoop', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pw }),
        });
        if (response.status === 401) {
          setError('Dat wachtwoord klopt niet.');
          setPassword('');
          try {
            sessionStorage.removeItem(KEY);
          } catch {
            // geen opslag
          }
          return;
        }
        if (response.status === 500) {
          setError('Het dashboard is nog niet gekoppeld aan Stripe. Er ontbreekt een instelling in Vercel (zie README).');
          return;
        }
        if (!response.ok) {
          setError('Stripe geeft de gegevens niet. Controleer of de sleutel in Vercel alle leesrechten heeft (zie README), of probeer het zo nog eens.');
          return;
        }
        setData(await response.json());
        try {
          sessionStorage.setItem(KEY, pw);
        } catch {
          // geen opslag: dan vraagt hij bij een herlaad opnieuw
        }
      } catch {
        setError('Geen verbinding. Probeer het zo nog eens.');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Inloggen met een onthouden wachtwoord, en elke minuut verversen.
  useEffect(() => {
    if (!password) return undefined;
    load(password);
    const timer = setInterval(() => load(password), REFRESH_MS);
    return () => clearInterval(timer);
  }, [password, load]);

  const submit = (event) => {
    event.preventDefault();
    setData(null);
    setPassword(typed);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      // geen opslag
    }
    setPassword('');
    setTyped('');
    setData(null);
  };

  const max = data ? Math.max(1, data.noCode.copies, ...data.people.map((p) => p.copies)) : 1;
  const percent = data ? Math.min(100, (data.total.copies / data.edition) * 100) : 0;
  const time = data ? new Date(data.updatedAt).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <main className="dash">
      <header className="dash__top">
        <BrandLogo as="span" />
      </header>

      <div className="dash__inner">
        <h1 className="dash__title">{dashboard.title}</h1>

        {!data && (
          <form className="dash__login" onSubmit={submit}>
            <label htmlFor="dash-pw">Wachtwoord</label>
            <div className="dash__login-row">
              <input
                id="dash-pw"
                type="password"
                autoComplete="current-password"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                autoFocus
              />
              <button type="submit" className="paper-btn" disabled={loading || !typed}>
                {loading ? 'Even kijken' : 'Open'}
              </button>
            </div>
            {password && loading && !error && <p className="dash__note">Gegevens ophalen uit Stripe.</p>}
            {error && (
              <p className="dash__error" role="alert">
                {error}
              </p>
            )}
          </form>
        )}

        {data && (
          <>
            <section className="dash__progress" aria-label="Voortgang van de oplage">
              <p className="dash__big">
                <strong>{data.total.copies}</strong> van {data.edition} exemplaren verkocht
              </p>
              <div className="dash__track" role="img" aria-label={`${data.total.copies} van ${data.edition} verkocht`}>
                <span style={{ width: `${percent}%` }} />
              </div>
              <ul className="dash__facts">
                <li>
                  <strong>{data.total.orders}</strong> bestellingen
                </li>
                <li>
                  <strong>{Math.max(0, data.edition - data.total.copies)}</strong> nog beschikbaar
                </li>
                {data.total.refunded > 0 && (
                  <li>
                    <strong>{data.total.refunded}</strong> terugbetaald, niet meegeteld
                  </li>
                )}
              </ul>
            </section>

            <section className="dash__chart" aria-label="Verkochte exemplaren per persoon">
              <h2>Per persoon</h2>
              <ol className="dash__rows">
                {data.people.map((person, index) => (
                  <li className={`dash__row${index === 0 && person.copies > 0 ? ' is-first' : ''}`} key={`${person.code}-${person.name}`}>
                    <span className="dash__name">{person.name}</span>
                    <span className="dash__bar" aria-hidden="true">
                      <span style={{ width: `${(person.copies / max) * 100}%` }} />
                    </span>
                    <span className="dash__val">
                      <strong>{person.copies}</strong>
                      <small>{plural(person.orders, 'bestelling', 'bestellingen')}</small>
                    </span>
                  </li>
                ))}
              </ol>

              <h2 className="dash__sub">Zonder code</h2>
              <ol className="dash__rows">
                <li className="dash__row is-none">
                  <span className="dash__name">Geen code</span>
                  <span className="dash__bar" aria-hidden="true">
                    <span style={{ width: `${(data.noCode.copies / max) * 100}%` }} />
                  </span>
                  <span className="dash__val">
                    <strong>{data.noCode.copies}</strong>
                    <small>{plural(data.noCode.orders, 'bestelling', 'bestellingen')}</small>
                  </span>
                </li>
              </ol>
            </section>

            <footer className="dash__foot">
              <span>
                Bijgewerkt om {time}. Ververst vanzelf elke minuut.
              </span>
              <span className="dash__actions">
                <button type="button" onClick={() => load(password)} disabled={loading}>
                  {loading ? 'Bezig' : 'Nu verversen'}
                </button>
                <button type="button" onClick={logout}>
                  Uitloggen
                </button>
              </span>
            </footer>
            {error && (
              <p className="dash__error" role="alert">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
