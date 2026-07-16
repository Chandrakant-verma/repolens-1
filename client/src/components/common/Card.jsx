const Card = ({ children, className = "" }) => {
  return (
    <div className={`relative card overflow-hidden p-8 ${className}`}>
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[var(--code)] to-[var(--ai)]" />
      {children}
    </div>
  );
};

export default Card;