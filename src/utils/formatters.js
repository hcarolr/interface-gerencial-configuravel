export function formatCurrency(value) {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return value;
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numberValue);
}

export function formatDate(value) {
  if (!value) return '';

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function formatCellValue(field, value) {
  if (field.type === 'date') return formatDate(value);

  if (field.name === 'valor' || field.name === 'preco') {
    return formatCurrency(value);
  }

  return value;
}
