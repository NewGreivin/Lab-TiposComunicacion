import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container text-center py-5">
      <h2>404</h2>
      <p className="text-muted">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
};

export default NotFoundPage;