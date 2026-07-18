function ButtonComponent({
  label,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default ButtonComponent;
