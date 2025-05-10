import { useState } from "react";

export default function useAI() {
  const [loading, setLoading] = useState(false);

  const translate = async (text, langsArray) => {
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 30000); //30s timeout
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("x-api-key", process.env.REACT_APP_TOKEN);
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/translate",
        {
          method: "POST",
          headers: myHeaders,
          mode: "cors", // this cannot be 'no-cors'
          body: JSON.stringify({
            text: `[${langsArray}]: ${text}`,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);
      if (!response.ok) throw new Error(`Error en la API: ${response.status}`);

      const { data } = await response.json();

      if (!data) return { error: "Respuesta vacía" };
      return { data };
    } catch (err) {
      console.error("Error al traducir:", err);
      return { error: "Error en la petición" };
    } finally {
      setLoading(false);
    }
  };

  return { translate, loading };
}
