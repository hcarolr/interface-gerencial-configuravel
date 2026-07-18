function DashboardHero({ label, title, description, badgeLabel, badgeValue, className = '' }) {
  return (
    <div className={`dashboard-hero card ${className}`.trim()}>
      <div>
        <span className="hero-label">{label}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={`hero-badge ${className.includes('operational-hero') ? 'operational-badge' : ''} ${className.includes('gym-hero') ? 'gym-badge' : ''}`.trim()}>
        <span>{badgeLabel}</span>
        <strong>{badgeValue}</strong>
      </div>
    </div>
  );
}

export default DashboardHero;
