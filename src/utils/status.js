import { normalize } from './text';

export function getStatusClass(status) {
  const normalizedStatus = normalize(status);

  if (normalizedStatus.includes('pendente')) return 'status-warning';
  if (normalizedStatus.includes('atendimento')) return 'status-progress';
  if (normalizedStatus.includes('finalizado')) return 'status-success';
  if (normalizedStatus.includes('recebido')) return 'status-paid';
  if (normalizedStatus.includes('ativo')) return 'status-active';
  if (normalizedStatus.includes('disponivel')) return 'status-active';
  if (normalizedStatus.includes('despesa')) return 'status-warning';
  if (normalizedStatus.includes('receita')) return 'status-paid';

  return '';
}

export function isStatusField(fieldName) {
  return fieldName === 'situacao' || fieldName === 'categoria';
}
