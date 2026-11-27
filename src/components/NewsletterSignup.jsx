import { useState } from 'react';
import { newsletter as n } from '../config/newsletter.js';

export default function NewsletterSignup() {
  const [status, setStatus] = useState('idle');
  if (!n.url) return null;

  const submit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (f.website.value) return; // honeypot
    setStatus('sending');
    try {
      await fetch(n.url, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
          email: f.email.value.trim(),
          bron: window.location.pathname,
          toestemming: 'ja',
          datum: new Date().toISOString(),
        }),
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="footer__news">
      <div>
        <h3 className="footer__news-title">{n.heading}</h3>
        <p className="footer__news-text">{n.text}</p>
      </div>
      {status === 'done' ? (
        <p className="footer__news-ok" role="status">{n.success}</p>
      ) : (
        <form className="footer__news-form" onSubmit={submit}>
          <div className="footer__news-row">
            <input type="email" name="email" required placeholder={n.placeholder} aria-label={n.placeholder} autoComplete="email" />
            <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? n.sending : n.button}</button>
          </div>
          <label className="footer__news-consent">
            <input type="checkbox" name="consent" required /> <span>{n.consent}</span>
          </label>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
          {status === 'error' && <p className="footer__news-err" role="alert">{n.error}</p>}
        </form>
      )}
    </div>
  );
}
