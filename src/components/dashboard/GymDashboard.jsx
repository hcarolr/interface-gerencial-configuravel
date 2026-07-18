import ArchitectureNote from './ArchitectureNote';
import DashboardHero from './DashboardHero';
import KpiCard from './KpiCard';
import ModuleCards from './ModuleCards';
import SectionHeader from './SectionHeader';
import { formatCurrency } from '../../utils/formatters';
import { getStatusClass } from '../../utils/status';
import { normalize } from '../../utils/text';

function GymDashboard({
  config,
  data,
  crudModules,
  settingsModule,
  onSelectModule,
}) {
  const students = data.alunos || [];
  const teachers = data.professores || [];
  const classes = data.aulas || [];
  const financialRecords = data.financeiro || [];
  const stock = data.estoque || [];

  const activeStudents = students.filter((student) =>
    normalize(student.situacao).includes('ativo')
  );

  const activeTeachers = teachers.filter((teacher) =>
    normalize(teacher.situacao).includes('ativo')
  );

  const activeClasses = classes.filter((classItem) =>
    normalize(classItem.situacao).includes('ativo')
  );

  const receivedRevenue = financialRecords
    .filter((record) => normalize(record.categoria).includes('receita'))
    .reduce((total, record) => total + Number(record.valor || 0), 0);

  const pendingExpenses = financialRecords
    .filter((record) => normalize(record.situacao).includes('pendente'))
    .reduce((total, record) => total + Number(record.valor || 0), 0);

  const availableProducts = stock.filter((product) =>
    normalize(product.situacao).includes('disponivel')
  );

  const totalAvailableSeats = classes.reduce((total, classItem) => {
    return total + Number(classItem.vagas || 0);
  }, 0);

  return (
    <section className="dashboard-page">
      <DashboardHero
        label="Painel da academia"
        title="Bom dia, Academia Rangel 🥋"
        description={
          <>
            Você tem {activeStudents.length} alunos ativos,
            {` ${activeClasses.length} aulas ativas`} e
            {` ${formatCurrency(receivedRevenue)} em mensalidades recebidas`}.
          </>
        }
        badgeLabel="Treinos"
        badgeValue="Hoje"
        className="operational-hero gym-hero"
      />

      <div className="kpi-grid operation-kpi-grid">
        <KpiCard
          label="Alunos ativos"
          value={activeStudents.length}
          description="matrículas em dia"
          className="operation-kpi-card"
        />

        <KpiCard
          label="Aulas ativas"
          value={activeClasses.length}
          description={`${totalAvailableSeats} vagas configuradas`}
          className="operation-kpi-card"
        />

        <KpiCard
          label="Mensalidades"
          value={formatCurrency(receivedRevenue)}
          description="receita registrada"
          className="operation-kpi-card money-card"
        />

        <KpiCard
          label="Despesas pendentes"
          value={formatCurrency(pendingExpenses)}
          description="atenção para o financeiro"
          className="operation-kpi-card warning-card"
        />
      </div>

      <section className="card workshop-queue-card training-schedule-card">
        <SectionHeader
          label="Hoje no tatame"
          title="Aulas previstas"
          action={
            <button
              type="button"
              className="ghost-action"
              onClick={() => onSelectModule('aulas')}
            >
              Abrir aulas
            </button>
          }
        />

        <div className="queue-list">
          {classes.map((classItem) => (
            <button
              key={`${classItem.modalidade}-${classItem.diaSemana}-${classItem.horario}`}
              type="button"
              className="queue-item training-item"
              onClick={() => onSelectModule('aulas')}
            >
              <div className="queue-main">
                <div className="queue-icon">📅</div>

                <div>
                  <strong>
                    {classItem.horario} • {classItem.modalidade}
                  </strong>

                  <span>
                    {classItem.diaSemana} · Professor: {classItem.professor} ·{' '}
                    {classItem.vagas} vagas
                  </span>
                </div>
              </div>

              <span
                className={`status-pill ${getStatusClass(classItem.situacao)}`}
              >
                {classItem.situacao}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="gym-insights-grid">
        <article className="card insight-card">
          <span>Alunos para acompanhar</span>
          <h3>Relacionamento com o aluno</h3>

          <div className="student-chips">
            {activeStudents.map((student) => (
              <button
                key={student.cpf}
                type="button"
                onClick={() => onSelectModule('alunos')}
              >
                <strong>{student.nome}</strong>
                <small>{student.plano}</small>
              </button>
            ))}
          </div>
        </article>

        <article className="card insight-card">
          <span>Operação da academia</span>
          <h3>Aulas, professores e estoque</h3>

          <p>
            O cenário academia possui {activeTeachers.length} professores
            ativos,
            {` ${classes.length} aulas configuradas`} e{' '}
            {availableProducts.length} itens disponíveis no estoque de apoio.
          </p>

          <button
            type="button"
            className="ghost-action"
            onClick={() => onSelectModule('aulas')}
          >
            Ver grade de aulas
          </button>
        </article>
      </section>

      <SectionHeader
        label="Módulos do SaaS"
        title="Gestão simples para rotina da academia"
      />

      <ModuleCards
        modules={crudModules}
        data={data}
        onSelectModule={onSelectModule}
      />

      <ArchitectureNote
        label="Resultado técnico"
        title="Mesmo front, experiência adaptada ao domínio"
        settingsModule={settingsModule}
        onSelectModule={onSelectModule}
      >
        O dashboard da academia utiliza os mesmos componentes estruturais da
        aplicação, mas adapta indicadores, textos e ações para uma rotina de
        alunos, aulas, professores, mensalidades e estoque. A configuração
        continua vindo do arquivo <code>{config.configFile}</code>.
      </ArchitectureNote>
    </section>
  );
}

export default GymDashboard;
