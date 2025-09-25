import axios from "axios";
// ...existing code...

export async function buscarCancelamentosDashboard() {
  try {
    const response = await axios.get("http://localhost:8080/cancelamentos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cancelamentos do dashboard:", error);
    throw error;
  }
}