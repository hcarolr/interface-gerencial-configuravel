import { useEffect, useState } from 'react';

import FormComponent from '../ui/FormComponent';
import TableComponent from '../ui/TableComponent';
import DashboardComponent from '../dashboard/DashboardComponent';
import ReportsComponent from '../reports/ReportsComponent';
import SettingsComponent from '../settings/SettingsComponent';

import tireLogo from '../../assets/tire-logo.svg';

function DynamicPage({
  config,
  data,
  themeOptions = [],
  selectedThemeName,
  onThemeChange,
  showTechnicalSummary = false,
  platformSummary,
  users = [],
  onCreateUser,
  persistentModules = [],
  onCreateRecord,
}) {
  const [activeModuleKey, setActiveModuleKey] = useState(config.modules[0].key);

  useEffect(() => {
    setActiveModuleKey(config.modules[0].key);
  }, [config.domain]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [activeModuleKey]);

  const activeModule =
    config.modules.find((module) => module.key === activeModuleKey) ||
    config.modules[0];

  const dashboardModule =
    config.modules.find((module) => module.type === 'dashboard') ||
    config.modules[0];

  const isDashboard = activeModule?.key === dashboardModule.key;

  function goToDashboard() {
    setActiveModuleKey(dashboardModule.key);
  }

  const isTireShop = config.domain === 'borracharia';
  const isGym = config.domain === 'academia';

  const brandName = isTireShop
    ? 'Borracharia Rangel'
    : isGym
      ? 'Academia Rangel'
      : 'Arquitetura Configurável';

  const brandSubtitle =
    isTireShop || isGym ? 'SaaS operacional' : 'Sistema gerencial';

  const moduleData = data[activeModule?.key] || [];

  const iconAssets = {
    'tire-logo': {
      src: tireLogo,
      alt: 'Logo moderno de pneu',
    },
  };

  function renderBrandIcon() {
    const iconAsset = iconAssets[config.icon];

    if (iconAsset) {
      return (
        <img
          className="brand-icon-image"
          src={iconAsset.src}
          alt={iconAsset.alt}
        />
      );
    }

    return config.icon;
  }

  function renderContent() {
    if (!activeModule) {
      return null;
    }
    if (activeModule.type === 'dashboard') {
      return (
        <DashboardComponent
          config={config}
          data={data}
          onSelectModule={setActiveModuleKey}
        />
      );
    }

    if (activeModule.type === 'reports') {
      return <ReportsComponent config={config} data={data} />;
    }

    if (activeModule.type === 'settings') {
      return (
        <SettingsComponent
          config={config}
          themeOptions={themeOptions}
          selectedThemeName={selectedThemeName}
          onThemeChange={onThemeChange}
          showTechnicalSummary={showTechnicalSummary}
          platformSummary={platformSummary}
          users={users}
          onCreateUser={onCreateUser}
        />
      );
    }

    return (
      <section className="content-grid">
        <FormComponent
          fields={activeModule.fields}
          entity={activeModule.entity}
          description={activeModule.description}
          canPersist={persistentModules.includes(activeModule.key)}
          onSubmitRecord={(recordData) =>
            onCreateRecord(activeModule.key, activeModule.fields, recordData)
          }
        />

        <TableComponent
          fields={activeModule.fields}
          data={moduleData}
          entity={activeModule.entity}
        />
      </section>
    );
  }

  const themeStyle = {
    '--primary': config.theme.primary,
    '--primary-dark': config.theme.primaryDark,
    '--accent': config.theme.accent,
    '--theme-soft': config.theme.soft,
  };

  return (
    <div className="shell" style={themeStyle}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">{renderBrandIcon()}</div>
          <div>
            <strong>{brandName}</strong>
            <span>{brandSubtitle}</span>
          </div>
        </div>

        <nav className="side-menu">
          {config.modules.map((module) => (
            <button
              key={module.key}
              onClick={() => setActiveModuleKey(module.key)}
              className={
                activeModuleKey === module.key
                  ? 'side-menu-item active'
                  : 'side-menu-item'
              }
            >
              {module.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="workspace">
        {!isDashboard && (
          <button
            type="button"
            className="mobile-back-dashboard"
            onClick={goToDashboard}
          >
            ← Voltar ao Dashboard
          </button>
        )}

        <header
          className={`topbar clean ${isTireShop || isGym ? 'product-topbar' : ''}`}
        >
          <div>
            <p className="eyebrow">
              {isTireShop
                ? 'SaaS operacional para borracharias'
                : isGym
                  ? 'SaaS operacional para academias'
                  : 'Protótipo de front-end configurável'}
            </p>
            <h1>{config.title}</h1>
            <p className="subtitle">{config.subtitle}</p>
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
}

export default DynamicPage;
