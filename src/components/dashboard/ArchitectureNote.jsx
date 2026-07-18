function ArchitectureNote({ label, title, children, settingsModule, onSelectModule }) {
  return (
    <div className="card architecture-note">
      <div>
        <span>{label}</span>
        <h3>{title}</h3>
        <p>{children}</p>

        {settingsModule && (
          <button
            type="button"
            className="configurator-shortcut"
            onClick={() => onSelectModule(settingsModule.key)}
          >
            ⚙️ Ver configurador
          </button>
        )}
      </div>
    </div>
  );
}

export default ArchitectureNote;
