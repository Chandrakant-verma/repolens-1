const Loader = () => {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--code)] opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--code)]" />
      </span>
      <span className="font-mono text-xs tracking-wide text-[var(--text-muted)]">loading…</span>
    </div>
  );
};

export default Loader;