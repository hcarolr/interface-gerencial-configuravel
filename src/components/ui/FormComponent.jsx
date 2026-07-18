import { useMemo, useState } from 'react';

import InputComponent from './InputComponent';
import ButtonComponent from './ButtonComponent';

function FormComponent({
  fields,
  entity,
  description,
  canPersist = false,
  onSubmitRecord,
}) {
  const initialFormData = useMemo(() => {
    return fields.reduce((data, field) => {
      data[field.name] = '';
      return data;
    }, {});
  }, [fields]);

  const [formData, setFormData] = useState(initialFormData);
  const [feedback, setFeedback] = useState('');

  function handleChange(fieldName, value) {
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: value,
    }));

    setFeedback('');
  }

  function handleReset() {
    setFormData(initialFormData);
    setFeedback('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!canPersist) {
      setFeedback(
        'Cadastro demonstrativo. A persistência local está habilitada para Alunos e Estoque.'
      );
      return;
    }

    onSubmitRecord(formData);

    setFormData(initialFormData);
    setFeedback(`${entity} cadastrado com sucesso no protótipo.`);
  }

  return (
    <section className="card form-card">
      <div className="section-title">
        <span>Cadastro</span>
        <h2>{entity}</h2>
        {description && <p>{description}</p>}
      </div>

      <form className="form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputComponent
            key={field.name}
            field={field}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        ))}

        {feedback && <div className="form-feedback">{feedback}</div>}

        <div className="actions">
          <ButtonComponent label="Salvar" type="submit" />
          <ButtonComponent
            label="Cancelar"
            variant="secondary"
            onClick={handleReset}
          />
        </div>
      </form>
    </section>
  );
}

export default FormComponent;
