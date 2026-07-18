import { useMemo, useState } from 'react';

import { formatCellValue } from '../../utils/formatters';
import { getStatusClass, isStatusField } from '../../utils/status';

const ROWS_PER_PAGE = 8;

function TableComponent({ fields, data, entity }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  return (
    <section className="card table-card">
      <div className="section-title table-section-title">
        <div>
          <span>Visualização</span>
          <h2>Registros de {entity}</h2>
        </div>

        {data.length > 0 && (
          <small className="table-counter">
            Mostrando {startIndex + 1}-{Math.min(endIndex, data.length)} de{' '}
            {data.length}
          </small>
        )}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {fields.map((field) => (
                <th key={field.name}>{field.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((record, index) => (
              <tr key={`${currentPage}-${index}`}>
                {fields.map((field) => (
                  <td key={field.name}>
                    {isStatusField(field.name) ? (
                      <span
                        className={`status-pill ${getStatusClass(record[field.name])}`}
                      >
                        {record[field.name]}
                      </span>
                    ) : (
                      formatCellValue(field, record[field.name])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <p className="empty-state">
            Ainda não existem registros simulados para este módulo.
          </p>
        )}
      </div>

      {data.length > ROWS_PER_PAGE && (
        <div className="table-pagination">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(current - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(current + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      )}
    </section>
  );
}

export default TableComponent;
