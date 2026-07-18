import DefaultDashboard from './DefaultDashboard';
import GymDashboard from './GymDashboard';
import TireShopDashboard from './TireShopDashboard';

function DashboardComponent({ config, data, onSelectModule }) {
  const crudModules = config.modules.filter((module) => module.type === 'crud');
  const settingsModule = config.modules.find(
    (module) => module.type === 'settings'
  );

  const totalRecords = crudModules.reduce((total, module) => {
    return total + (data[module.key]?.length || 0);
  }, 0);

  const totalFields = crudModules.reduce((total, module) => {
    return total + module.fields.length;
  }, 0);

  if (config.domain === 'academia') {
    return (
      <GymDashboard
        config={config}
        data={data}
        crudModules={crudModules}
        settingsModule={settingsModule}
        onSelectModule={onSelectModule}
      />
    );
  }

  if (config.domain === 'borracharia') {
    return (
      <TireShopDashboard
        config={config}
        data={data}
        crudModules={crudModules}
        settingsModule={settingsModule}
        onSelectModule={onSelectModule}
      />
    );
  }

  return (
    <DefaultDashboard
      config={config}
      data={data}
      crudModules={crudModules}
      totalRecords={totalRecords}
      totalFields={totalFields}
      onSelectModule={onSelectModule}
    />
  );
}

export default DashboardComponent;
