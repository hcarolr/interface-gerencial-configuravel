import { useState } from 'react';

import ButtonComponent from '../ui/ButtonComponent';
import { formatCellValue } from '../../utils/formatters';

function ReportsComponent({ config, data }) {
  const crudModules = config.modules.filter((module) => module.type === 'crud');

  const [selectedModuleKey, setSelectedModuleKey] = useState(
    crudModules[0]?.key || ''
  );

  const [format, setFormat] = useState('screen');
  const [generatedReport, setGeneratedReport] = useState(null);
  const [feedback, setFeedback] = useState('');

  const selectedModule =
    crudModules.find((module) => module.key === selectedModuleKey) ||
    crudModules[0];

  const records = selectedModule ? data[selectedModule.key] || [] : [];

  function escapeCsvValue(value) {
    const stringValue = String(value ?? '');
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  function downloadCsv() {
    const headers = selectedModule.fields.map((field) => field.label);

    const rows = records.map((record) =>
      selectedModule.fields.map((field) =>
        formatCellValue(field, record[field.name])
      )
    );

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(';'))
      .join('\r\n');

    const blob = new Blob([`\uFEFFsep=;\r\n${csvContent}`], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `relatorio-${config.domain}-${selectedModule.key}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  function handleGenerateReport(event) {
    event.preventDefault();

    if (!selectedModule) {
      setFeedback('Nenhum módulo disponível para relatório.');
      return;
    }

    if (records.length === 0) {
      setGeneratedReport(null);
      setFeedback('Nenhum registro encontrado para este relatório.');
      return;
    }

    if (format === 'csv') {
      downloadCsv();
      setGeneratedReport(null);
      setFeedback('Relatório CSV gerado para download.');
      return;
    }

    setGeneratedReport({
      module: selectedModule,
      records,
    });

    setFeedback('Relatório gerado para visualização em tela.');
  }

  return (
    <section className="card">
      <div className="section-title">
        <span>Consulta</span>
        <h2>Relatórios</h2>
        <p>
          Relatórios gerados com base nos módulos configurados para o cenário
          selecionado.
        </p>
      </div>

      <form className="report-form" onSubmit={handleGenerateReport}>
        <div className="form-field">
          <label>Tipo de relatório</label>
          <select
            value={selectedModuleKey}
            onChange={(event) => {
              setSelectedModuleKey(event.target.value);
              setGeneratedReport(null);
              setFeedback('');
            }}
          >
            {crudModules.map((module) => (
              <option key={module.key} value={module.key}>
                Registros de {module.entity}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Formato</label>
          <select
            value={format}
            onChange={(event) => {
              setFormat(event.target.value);
              setGeneratedReport(null);
              setFeedback('');
            }}
          >
            <option value="screen">Tela</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <div className="form-field">
          <label>Data inicial</label>
          <input type="date" />
        </div>

        <div className="form-field">
          <label>Data final</label>
          <input type="date" />
        </div>

        <ButtonComponent label="Gerar relatório" type="submit" />
      </form>

      {feedback && <div className="mock-feedback">{feedback}</div>}

      {generatedReport && (
        <div className="report-preview">
          <strong>Prévia do relatório: {generatedReport.module.entity}</strong>

          <p>
            Total de registros encontrados: {generatedReport.records.length}
          </p>

          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>#</th>
                  {generatedReport.module.fields.map((field) => (
                    <th key={field.name}>{field.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {generatedReport.records.slice(0, 5).map((record, index) => (
                  <tr key={record.id || index}>
                    <td>{index + 1}</td>

                    {generatedReport.module.fields.map((field) => (
                      <td key={field.name}>
                        {formatCellValue(field, record[field.name])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReportsComponent;
