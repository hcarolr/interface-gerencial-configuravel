function SectionHeader({ label, title, action }) {
  return (
    <div className="dashboard-section-header">
      <div>
        <span>{label}</span>
        <h3>{title}</h3>
      </div>

      {action}
    </div>
  );
}

export default SectionHeader;
