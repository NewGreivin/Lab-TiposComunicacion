const LoadingSpinner = ({ texto = "Cargando..." }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-secondary">
      <div className="spinner-border mb-2" role="status" aria-hidden="true"></div>
      <span>{texto}</span>
    </div>
  );
};

export default LoadingSpinner;