import axios from "axios";

export async function buscarProximoAgendamento(id) {
  try {
    const response = await axios.get(`http://localhost:8080/agendamento/proximo-usuario/${id}`);
    console.log("Próximo agendamento!!!")
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw error;
  }
}

export function cancelarAgendamentoJS(id) {
  try {
    axios.patch(`http://localhost:8080/agendamento/status/${id}/2`);
    console.log("Agendamento cancelado com sucesso!");
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    return false;
  }
  return true;
}