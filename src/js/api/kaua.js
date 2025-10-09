import axios from "axios";

export async function listarInfoSalao() {
    try {
        const response = await axios.get(`http://localhost:8080/info-salao`);
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.error("Erro ao buscar informações do salão:", error);
        throw error;
    }
}

export async function listarClientes() {
    try {
        const response = await axios.get(`http://localhost:8080/usuarios/lista-clientes`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
}

export async function listarFuncionarios() {
    try {
        const response = await axios.get(`http://localhost:8080/usuarios/lista-funcionarios`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar funcionarios:", error);
        throw error;
    }
}

export async function mudarSenha(id, newSenha, oldSenha) {
    try {
        const response = await axios.patch(
            `http://localhost:8080/usuarios/mudarSenha/${id}`,
            {
                senhaAtual: oldSenha,
                novaSenha: newSenha
            }
        );

        console.log("Senha alterada com sucesso:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        throw error;
    }
}

export async function editarInfoSalaoCompleto(infoSalao) {
    try {
        const response = await axios.put(
            "http://localhost:8080/info-salao",
            infoSalao
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar informações do salão:", error);
        throw error;
    }
}

export async function listarUsuarioPorId(id) {
    try {
        const response = await axios.get(`http://localhost:8080/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        throw error;
    }
}

// Atualiza um usuário existente
export async function atualizarUsuario(id, usuarioAtualizado) {
    try {
        const response = await axios.put(`http://localhost:8080/usuarios/${id}`, usuarioAtualizado);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
    }
}