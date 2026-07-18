import ArchitectureNote from './ArchitectureNote';
import DashboardHero from './DashboardHero';
import KpiCard from './KpiCard';
import ModuleCards from './ModuleCards';
import SectionHeader from './SectionHeader';
import { formatCurrency } from '../../utils/formatters';
import { getStatusClass } from '../../utils/status';
import { normalize } from '../../utils/text';
import tireLogo from '../../assets/tire-logo.svg';

function TireShopDashboard({
  config,
  data,
  crudModules,
  settingsModule,
  onSelectModule,
}) {
  const vehicles = data.veiculos || [];
  const services = data.servicos || [];
  const financialRecords = data.financeiro || [];

  const vehiclesInService = vehicles.filter((vehicle) =>
    normalize(vehicle.situacao).includes('atendimento')
  );

  const finishedServices = services.filter((service) =>
    normalize(service.situacao).includes('finalizado')
  );

  const registeredRevenue = financialRecords
    .filter((record) => normalize(record.categoria).includes('receita'))
    .reduce((total, record) => total + Number(record.valor || 0), 0);

  const pendingExpenses = financialRecords
    .filter((record) => normalize(record.situacao).includes('pendente'))
    .reduce((total, record) => total + Number(record.valor || 0), 0);

  const queue = vehicles.map((vehicle) => {
    const service = services.find((item) => item.veiculo === vehicle.modelo);

    return {
      vehicle,
      service,
    };
  });

  return (
    <section className="dashboard-page">
      <DashboardHero
        label="Painel do dia"
        title={
          <>
            Bom dia, Borracharia Rangel
            <img
              className="hero-title-icon"
              src={tireLogo}
              alt=""
              aria-hidden="true"
            />
          </>
        }
        description={
          <>
            Você tem {vehiclesInService.length} veículo em atendimento,
            {` ${finishedServices.length} serviço finalizado`} e
            {` ${formatCurrency(pendingExpenses)} em pendências financeiras`}.
          </>
        }
        badgeLabel="Operação"
        badgeValue="Em andamento"
        className="operational-hero tire-shop-hero"
      />

      <div className="kpi-grid operation-kpi-grid">
        <KpiCard
          label="Em atendimento"
          value={vehiclesInService.length}
          description="veículo agora na oficina"
          className="operation-kpi-card"
        />
        <KpiCard
          label="Serviços finalizados"
          value={finishedServices.length}
          description="registros concluídos"
          className="operation-kpi-card"
        />
        <KpiCard
          label="Receita registrada"
          value={formatCurrency(registeredRevenue)}
          description="entradas no financeiro"
          className="operation-kpi-card money-card"
        />
        <KpiCard
          label="Pendências"
          value={formatCurrency(pendingExpenses)}
          description="atenção para o caixa"
          className="operation-kpi-card warning-card"
        />
      </div>

      <section className="card workshop-queue-card">
        <SectionHeader
          label="Fila da oficina"
          title="Atendimentos em andamento e concluídos"
          action={
            <button
              type="button"
              className="ghost-action"
              onClick={() => onSelectModule('veiculos')}
            >
              Abrir veículos
            </button>
          }
        />

        <div className="queue-list">
          {queue.map(({ vehicle, service }) => (
            <button
              key={vehicle.placa}
              type="button"
              className="queue-item"
              onClick={() => onSelectModule('servicos')}
            >
              <div className="queue-main">
                <div className="queue-icon">🚘</div>
                <div>
                  <strong>
                    {vehicle.modelo} •{' '}
                    {service?.tipo || 'Serviço não informado'}
                  </strong>
                  <span>
                    Cliente: {vehicle.cliente} · Placa {vehicle.placa}
                  </span>
                </div>
              </div>

              <span
                className={`status-pill ${getStatusClass(vehicle.situacao)}`}
              >
                {vehicle.situacao}
              </span>
            </button>
          ))}
        </div>
      </section>

      <SectionHeader
        label="Módulos do SaaS"
        title="Gestão simples para o dia a dia da borracharia"
      />

      <ModuleCards
        modules={crudModules}
        data={data}
        onSelectModule={onSelectModule}
      />

      <ArchitectureNote
        label="Resultado técnico"
        title="Experiência personalizada, estrutura reaproveitada"
        settingsModule={settingsModule}
        onSelectModule={onSelectModule}
      >
        O painel acima usa os mesmos componentes do protótipo, mas adapta
        textos, indicadores e contexto operacional para o domínio da
        borracharia. A configuração continua vindo do arquivo{' '}
        <code>{config.configFile}</code>.
      </ArchitectureNote>
    </section>
  );
}

export default TireShopDashboard;
