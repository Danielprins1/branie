export default function ScrollHint() {
  return (
    <div className="scroll-hint" aria-hidden="true">
      <div className="scroll-hint__inner">
        <span className="scroll-hint__label">scroll</span>
        <svg className="scroll-hint__arrow" viewBox="0 0 24 64" fill="none">
          <path d="M12 2c-2 18 3 34 0 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 50l7 11 7-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
