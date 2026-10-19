function Button({ children, onClick, variant = "primary", disabled }) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition";

  const styles = {
    primary: "bg-primary text-white hover:bg-primaryHover",
    secondary: "border border-border text-textPrimary hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
