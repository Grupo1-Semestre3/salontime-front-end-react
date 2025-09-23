import axios from "axios";

export async function buscarAvaliacoes() {
    try {
        const response = await axios.get(`http://localhost:8080/avaliacao`);
        console.log(response.data)
        return response.data;


    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        throw error;
    }
}