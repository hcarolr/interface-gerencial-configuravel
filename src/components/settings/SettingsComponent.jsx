import UserManagementPanel from './UserManagementPanel';

function SettingsComponent({
  config,
  themeOptions = [],
  selectedThemeName,
  onThemeChange,
  showTechnicalSummary = false,
  platformSummary,
  users = [],
  onCreateUser,
}) {
  const selectedTheme =
    themeOptions.find((theme) => theme.name === selectedThemeName) ||
    config.theme;

  return (
    <section className="card">
      <div className="section-title">
        <span>{showTechnicalSummary ? 'Parâmetros' : 'Personalização'}</span>
        <h2>Configurações</h2>
        <p>
          {showTechnicalSummary
            ? 'Resumo técnico da configuração carregada para geração dinâmica da interface.'
            : 'Escolha o tema visual aplicado à interface deste ambiente.'}
        </p>
      </div>

      <div className="settings-panel">
        {showTechnicalSummary && platformSummary && (
          <>
            <div className="config-row">
              <span>Cenários configurados</span>
              <strong>{platformSummary.totalScenarios}</strong>
            </div>

            <div className="config-row">
              <span>Total de módulos</span>
              <strong>{platformSummary.totalModules}</strong>
            </div>

            <div className="config-row">
              <span>Módulos operacionais</span>
              <strong>{platformSummary.totalCrudModules}</strong>
            </div>

            <div className="config-row">
              <span>Campos configurados</span>
              <strong>{platformSummary.totalFields}</strong>
            </div>

            <div className="config-row">
              <span>Temas disponíveis</span>
              <strong>{platformSummary.totalThemes}</strong>
            </div>
          </>
        )}

        {showTechnicalSummary && (
          <UserManagementPanel users={users} onCreateUser={onCreateUser} />
        )}

        <div className="theme-config-block">
          <div className="theme-config-header">
            <div>
              <span>Tema visual</span>
              <strong>{selectedTheme.label || selectedTheme.name}</strong>
              <p>
                As cores são carregadas por configuração e alteram a identidade
                visual do sistema sem modificar os componentes da interface.
              </p>
            </div>

            <select
              value={selectedThemeName}
              onChange={(event) => onThemeChange(event.target.value)}
            >
              {themeOptions.map((theme) => (
                <option key={theme.name} value={theme.name}>
                  {theme.label}
                </option>
              ))}
            </select>
          </div>

          <div className="theme-options-grid">
            {themeOptions.map((theme) => (
              <button
                key={theme.name}
                type="button"
                className={
                  selectedThemeName === theme.name
                    ? 'theme-option-card selected'
                    : 'theme-option-card'
                }
                onClick={() => onThemeChange(theme.name)}
              >
                <span className="theme-preview">
                  <i style={{ background: theme.primary }}></i>
                  <i style={{ background: theme.accent }}></i>
                  <i style={{ background: theme.soft }}></i>
                </span>

                <strong>{theme.label}</strong>
                <small>{theme.name}</small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsComponent;
