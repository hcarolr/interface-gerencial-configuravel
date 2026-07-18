import ArchitectureNote from './ArchitectureNote';
import DashboardHero from './DashboardHero';
import KpiCard from './KpiCard';
import ModuleCards from './ModuleCards';
import SectionHeader from './SectionHeader';

function DefaultDashboard({ config, data, crudModules, totalRecords, totalFields, onSelectModule }) {
  return (
    <section className="dashboard-page">
      <DashboardHero
        label="Visão geral"
        title="Dashboard configurável"
        description={
          <>
            Painel gerado dinamicamente a partir dos módulos definidos no
            arquivo de configuração do cenário {config.title}.
          </>
        }
        badgeLabel="Cenário ativo"
        badgeValue={config.domain}
      />

      <div className="kpi-grid">
        <KpiCard
          label="Módulos operacionais"
          value={crudModules.length}
          description="Com formulário e tabela"
        />
        <KpiCard
          label="Registros simulados"
          value={totalRecords}
          description="Dados carregados por módulo"
        />
        <KpiCard
          label="Campos configurados"
          value={totalFields}
          description="Renderizados por metadados"
        />
      </div>

      <SectionHeader
        label="Módulos do cenário"
        title="Estrutura gerada por configuração"
      />

      <ModuleCards modules={crudModules} data={data} onSelectModule={onSelectModule} />

      <ArchitectureNote
        label="Resultado técnico"
        title="Mesmos componentes, diferentes configurações"
      >
        Os cards acima são montados a partir dos módulos definidos no JSON.
        Ao alternar entre academia e borracharia, a estrutura visual é
        preservada, enquanto os módulos, entidades e campos exibidos são
        alterados pelos metadados do cenário.
      </ArchitectureNote>
    </section>
  );
}

export default DefaultDashboard;
