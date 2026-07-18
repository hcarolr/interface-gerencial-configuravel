function InputComponent({ field, value, onChange }) {
  const fieldClassName = value ? 'has-value' : '';

  if (field.type === 'select') {
    return (
      <div className="form-field">
        <label htmlFor={field.name}>{field.label}</label>

        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={(event) => onChange(field.name, event.target.value)}
          className={fieldClassName}
          required
        >
          <option value="" disabled>
            Selecione {field.label.toLowerCase()}
          </option>

          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={field.name}>{field.label}</label>

      <input
        id={field.name}
        name={field.name}
        type={field.type || 'text'}
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        placeholder={`Informe ${field.label.toLowerCase()}`}
        className={fieldClassName}
        required
      />
    </div>
  );
}

export default InputComponent;
