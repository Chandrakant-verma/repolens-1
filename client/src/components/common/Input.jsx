const Input = ({ label, type = "text", placeholder, register, error }) => {
  return (
    <div className="mb-5">
      {label && <label className="field-label">{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        className={`field-input ${error ? "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/30" : ""}`}
        {...register}
      />

      {error && <p className="field-error">{error.message}</p>}
    </div>
  );
};

export default Input;