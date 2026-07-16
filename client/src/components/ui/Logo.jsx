const Logo = ({ className = "" }) => {
  return (
    <span className={`inline-flex select-none items-center gap-2 ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="12" r="7" stroke="var(--code)" strokeWidth="1.6" />
        <circle cx="15" cy="12" r="7" stroke="var(--ai)" strokeWidth="1.6" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-[var(--text)]">
        Repo<span className="text-[var(--code)]">Lens</span>
      </span>
    </span>
  );
};

export default Logo;