function KpiCard({ label, value, description, className = '' }) {
  return (
    <article className={`kpi-card ${className}`.trim()}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{description}</small>
    </article>
  );
}

export default KpiCard;
