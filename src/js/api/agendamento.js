import axios from "axios";

export async function buscarProximosAgendamentosFuncionario(idFuncionario) {
  try {
    const id = Number(idFuncionario); 
    const response = await axios.get(`http://localhost:8080/agendamento/proximos-funcionario/${id}`);return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw error;
  }
}


export async function buscarAtendimentosPassadosPorIdFuncionario(idFuncionario) {
  try {
    const id = Number(idFuncionario); 
    const response = await axios.get(`http://localhost:8080/agendamento/passados-funcionario/${id}`);
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    throw error;
  }
}