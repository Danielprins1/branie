import { site } from './config/site.js';

// Tijdelijke placeholder tot fase 4: hier komen PhotoWall, IntroAnimation,
// MagazineTransition en MagazineSection.
export default function App() {
  return (
    <main className="placeholder">
      <h1 className="placeholder__logo">{site.brand.name}</h1>
      <p className="placeholder__payoff">{site.brand.payoff}</p>
      <p className="placeholder__note">Website in opbouw.</p>
    </main>
  );
}
