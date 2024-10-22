import { useLocation } from "react-router-dom";

export function useCurrentPageSlug() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean); // Divide la ruta en partes y elimina los vacíos
  const currentPageSlug = pathParts[pathParts.length - 1]; // Último segmento de la URL

  return currentPageSlug || ""; // Devuelve el último segmento de la URL como slug
}
