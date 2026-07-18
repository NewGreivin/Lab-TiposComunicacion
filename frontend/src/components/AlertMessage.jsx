const AlertMessage = ({ tipo = "danger", mensaje, onClose }) => {
  if (!mensaje) return null;

  return (
    <div className={`alert alert-${tipo} alert-dismissible fade show`} role="alert">
      {mensaje}
      {onClose && (
        <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
      )}
    </div>
  );
};

export default AlertMessage;