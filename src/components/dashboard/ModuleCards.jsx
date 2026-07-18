import { moduleActions, moduleIcons } from './dashboardConfig';

function ModuleCards({ modules, data, onSelectModule }) {
  const maxRecords = Math.max(
    ...modules.map((module) => data[module.key]?.length || 0),
    1
  );

  return (
    <div className="module-cards-grid">
      {modules.map((module) => {
        const recordsCount = data[module.key]?.length || 0;
        const height = Math.max(18, (recordsCount / maxRecords) * 100);

        return (
          <button
            key={module.key}
            className="module-card"
            onClick={() => onSelectModule(module.key)}
          >
            <div className="module-card-header">
              <div className="module-icon">
                {moduleIcons[module.key] || '📁'}
              </div>

              <div>
                <h4>{module.label}</h4>
                <span>{module.entity}</span>
              </div>
            </div>

            <p>{module.description}</p>

            <div className="module-quick-actions">
              {(moduleActions[module.key] || ['Abrir módulo']).map((action) => (
                <span key={action}>{action}</span>
              ))}
            </div>

            <div className="module-card-footer">
              <div>
                <strong>{recordsCount}</strong>
                <span>registros</span>
              </div>

              <div className="mini-bar">
                <span style={{ height: `${height}%` }}></span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ModuleCards;
