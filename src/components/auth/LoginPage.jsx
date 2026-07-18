import { useState } from 'react';

import mockUsers from '../../data/mockUsers.json';
import './LoginPage.css';

function LoginPage({ users = mockUsers, onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: value,
    }));

    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === credentials.email.trim().toLowerCase() &&
        user.password === credentials.password
    );

    if (!foundUser) {
      setError(
        'E-mail ou senha inválidos. Verifique os dados e tente novamente.'
      );
      return;
    }

    onLogin(foundUser);
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="login-logo">⚙️</span>
          <div>
            <p className="login-kicker">Sistema parametrizável</p>
            <h1>Entrar na plataforma</h1>
          </div>
        </div>

        <p className="login-description">
          Acesse o ambiente vinculado ao seu usuário para carregar a interface
          configurada conforme o cenário de negócio.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="seuemail@empresa.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-submit-button">
            Entrar
          </button>
        </form>

        <p className="login-helper">
          Ambiente demonstrativo com usuários vinculados a cenários
          configuráveis.
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
