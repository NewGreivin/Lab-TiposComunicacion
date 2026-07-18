import { ESTADO_BADGE } from "../constans/solicitudes.constans";

const EstadoBadge = ({ estado }) => {
  const color = ESTADO_BADGE[estado] || "secondary";

  return <span className={`badge bg-${color}`}>{estado}</span>;
};

export default EstadoBadge;