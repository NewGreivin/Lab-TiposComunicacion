export const getErrorMessage = (error) => {
  return (
    error?.response?.data?.mensaje ||
    error?.message ||
    "Ocurrió un error inesperado. Intenta de nuevo."
  );
};