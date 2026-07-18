import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-headset me-2"></i>
          SmartNotifySolutions
        </Link>
        <div className="d-flex">
          <Link className="btn btn-outline-light" to="/solicitudes/nueva">
            <i className="bi bi-plus-lg me-1"></i>
            Nueva solicitud
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;