import { formatDate } from "../../utils/formatDate";

const ListaMensajes = ({ mensajes }) => {
  if (!mensajes.length) {
    return <p className="text-muted">Aún no hay mensajes en esta solicitud.</p>;
  }

  return (
    <div className="d-flex flex-column gap-2 mb-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
      {mensajes.map((m) => {
        const esCliente = m.emisor === "Cliente";
        return (
          <div
            key={m.id}
            className={`p-2 rounded-3 ${esCliente ? "bg-light align-self-start" : "bg-primary text-white align-self-end"}`}
            style={{ maxWidth: "75%" }}
          >
            <div className="small fw-semibold">{m.emisor}</div>
            <div>{m.mensaje}</div>
            <div className={`small ${esCliente ? "text-muted" : "text-white-50"}`}>
              {formatDate(m.fecha)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListaMensajes;