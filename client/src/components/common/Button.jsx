const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const styles = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    ai: "btn-ai",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles[variant] || styles.primary} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;