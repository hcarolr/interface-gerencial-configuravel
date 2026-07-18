import { useState } from 'react';

function UserManagementPanel({ users = [], onCreateUser }) {
  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    scenario: 'academia',
    role: 'Administrador',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setFeedback('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const emailAlreadyExists = users.some(
      (user) => user.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    if (emailAlreadyExists) {
      setFeedback('Já existe um usuário cadastrado com este e-mail.');
      return;
    }

    onCreateUser({
      ...formData,
      email: formData.email.trim(),
    });

    setFormData({
      name: '',
      email: '',
      password: '',
      businessName: '',
      scenario: 'academia',
      role: 'Administrador',
    });

    setFeedback(
      'Usuário cadastrado no protótipo. O registro foi salvo localmente e já pode ser usado no login.'
    );
  }

  return (
    <div className="user-management-panel">
      <div className="user-management-header">
        <div>
          <span>Usuários</span>
          <strong>Cadastro de usuários</strong>
          <p>
            Simulação de criação de usuários vinculados aos cenários
            configurados na plataforma.
          </p>
        </div>
      </div>

      <form className="user-form-grid" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex.: Gestora Clínica"
            required
          />
        </label>

        <label>
          E-mail
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="usuario@demo.com"
            required
          />
        </label>

        <label>
          Senha
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha de acesso"
            required
          />
        </label>

        <label>
          Nome do negócio
          <input
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Ex.: Clínica Modelo"
            required
          />
        </label>

        <label>
          Cenário
          <select
            name="scenario"
            value={formData.scenario}
            onChange={handleChange}
          >
            <option value="academia">Academia</option>
            <option value="borracharia">Borracharia</option>
            <option value="admin">Admin geral</option>
          </select>
        </label>

        <label>
          Perfil
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Administrador">Administrador</option>
            <option value="Operador">Operador</option>
            <option value="Administrador Geral">Administrador Geral</option>
          </select>
        </label>

        <button type="submit" className="user-submit-button">
          Cadastrar usuário
        </button>
      </form>

      {feedback && <div className="mock-feedback">{feedback}</div>}

      <div className="registered-users-list">
        {users.map((user) => (
          <div key={user.id} className="registered-user-card">
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <small>{user.businessName}</small>
            </div>

            <em>{user.scenario}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagementPanel;
