import { useEffect, useMemo, useState } from 'react';
import mockUsers from './data/mockUsers.json';

import DynamicPage from './components/layout/DynamicPage';
import LoginPage from './components/auth/LoginPage';

import adminConfig from './configs/admin.json';
import adminData from './data/adminData.json';
import academiaConfig from './configs/academia.json';
import borrachariaConfig from './configs/borracharia.json';
import themes from './configs/themes.json';

import academiaData from './data/academiaData.json';
import borrachariaData from './data/borrachariaData.json';

import './App.css';

const initialScenarioData = {
  academia: academiaData,
  borracharia: borrachariaData,
  admin: adminData,
};

const persistentModules = {
  academia: ['alunos'],
  borracharia: ['estoque'],
};

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('tcc-current-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('tcc-users');
    return savedUsers ? JSON.parse(savedUsers) : mockUsers;
  });

  const [scenario, setScenario] = useState(() => {
    return localStorage.getItem('tcc-current-scenario') || null;
  });

  const [selectedThemes, setSelectedThemes] = useState({
    academia: academiaConfig.theme.name,
    borracharia: borrachariaConfig.theme.name,
    admin: adminConfig.theme.name,
  });

  const [scenarioData, setScenarioData] = useState(() => {
    const savedData = localStorage.getItem('tcc-scenario-data');
    return savedData ? JSON.parse(savedData) : initialScenarioData;
  });

  useEffect(() => {
    localStorage.setItem('tcc-scenario-data', JSON.stringify(scenarioData));
  }, [scenarioData]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('tcc-current-user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('tcc-current-user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (scenario) {
      localStorage.setItem('tcc-current-scenario', scenario);
    } else {
      localStorage.removeItem('tcc-current-scenario');
    }
  }, [scenario]);

  useEffect(() => {
    localStorage.setItem('tcc-users', JSON.stringify(users));
  }, [users]);

  const scenarios = {
    academia: {
      config: academiaConfig,
      data: scenarioData.academia,
    },
    borracharia: {
      config: borrachariaConfig,
      data: scenarioData.borracharia,
    },
    admin: {
      config: adminConfig,
      data: scenarioData.admin,
    },
  };

  const businessScenarios = {
    academia: scenarios.academia,
    borracharia: scenarios.borracharia,
  };

  const platformSummary = useMemo(() => {
    const scenarioEntries = Object.entries(businessScenarios);

    const allModules = scenarioEntries.flatMap(
      ([, scenarioData]) => scenarioData.config.modules || []
    );

    const crudModules = allModules.filter((module) => module.type === 'crud');

    const totalFields = crudModules.reduce(
      (total, module) => total + (module.fields?.length || 0),
      0
    );

    const totalThemes = scenarioEntries.reduce(
      (total, [scenarioKey]) => total + (themes[scenarioKey]?.length || 0),
      0
    );

    return {
      totalScenarios: scenarioEntries.length,
      totalModules: allModules.length,
      totalCrudModules: crudModules.length,
      totalFields,
      totalThemes,
    };
  }, []);

  const currentScenario = scenario ? scenarios[scenario] : null;
  const themeOptions = scenario ? themes[scenario] || [] : [];

  const selectedTheme = currentScenario
    ? themeOptions.find((theme) => theme.name === selectedThemes[scenario]) ||
      currentScenario.config.theme
    : null;

  const currentConfig = useMemo(() => {
    if (!currentScenario || !selectedTheme) {
      return null;
    }

    return {
      ...currentScenario.config,
      icon: selectedTheme.logo || currentScenario.config.icon,
      theme: selectedTheme,
    };
  }, [currentScenario, selectedTheme]);

  function handleLogin(user) {
    setCurrentUser(user);
    setScenario(user.scenario);
  }

  function handleLogout() {
    localStorage.removeItem('tcc-current-user');
    localStorage.removeItem('tcc-current-scenario');

    setCurrentUser(null);
    setScenario(null);
  }

  function handleThemeChange(themeName) {
    if (!scenario) {
      return;
    }

    setSelectedThemes((currentThemes) => ({
      ...currentThemes,
      [scenario]: themeName,
    }));
  }

  function handleCreateUser(userData) {
    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      businessName: userData.businessName,
      scenario: userData.scenario,
      role: userData.role,
      canSwitchScenario: userData.scenario === 'admin',
    };

    setUsers((currentUsers) => [...currentUsers, newUser]);

    return newUser;
  }

  function handleCreateRecord(moduleKey, fields, recordData) {
    const canPersist = persistentModules[scenario]?.includes(moduleKey);

    if (!canPersist) {
      return null;
    }

    const newRecord = {
      id: `${moduleKey}-${Date.now()}`,
    };

    fields.forEach((field) => {
      const value = recordData[field.name];
      newRecord[field.name] =
        field.type === 'number' ? Number(value || 0) : value || '';
    });

    setScenarioData((currentData) => {
      const currentScenarioData = currentData[scenario] || {};
      const currentModuleData = currentScenarioData[moduleKey] || [];

      return {
        ...currentData,
        [scenario]: {
          ...currentScenarioData,
          [moduleKey]: [...currentModuleData, newRecord],
        },
      };
    });

    return newRecord;
  }

  if (!currentUser) {
    return <LoginPage users={users} onLogin={handleLogin} />;
  }

  if (!currentScenario || !currentConfig) {
    return <LoginPage users={users} onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="scenario-selector">
        <div>
          <span>{currentUser.role}</span>
          <strong>{currentUser.name}</strong>
          <small>
            {currentUser.email} ·{' '}
            {currentConfig.name || currentUser.businessName}
          </small>
        </div>

        <div className="scenario-actions">
          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>

      <DynamicPage
        key={scenario}
        config={currentConfig}
        data={currentScenario.data}
        themeOptions={themeOptions}
        selectedThemeName={selectedTheme.name}
        onThemeChange={handleThemeChange}
        showTechnicalSummary={currentUser.canSwitchScenario}
        platformSummary={platformSummary}
        users={users}
        onCreateUser={handleCreateUser}
        persistentModules={persistentModules[scenario] || []}
        onCreateRecord={handleCreateRecord}
      />
    </>
  );
}

export default App;
