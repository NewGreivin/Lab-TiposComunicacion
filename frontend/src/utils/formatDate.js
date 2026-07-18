export const formatDate = (isoString) => {
  if (!isoString) return "-";

  const fecha = new Date(isoString);

  return fecha.toLocaleString("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};