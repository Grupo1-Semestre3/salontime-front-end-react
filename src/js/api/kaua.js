import axios from "axios";

// 🔹 Listar informações do salão
export async function listarInfoSalao() {
  try {
    const response = await axios.get("http://localhost:8080/info-salao");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar informações do salão:", error);
    throw error;
  }
}

// 🔹 Listar clientes
export async function listarClientes() {
  try {
    const response = await axios.get("http://localhost:8080/usuarios/lista-clientes");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
}

// 🔹 Listar funcionários
export async function listarFuncionarios() {
  try {
    const response = await axios.get("http://localhost:8080/usuarios/lista-funcionarios");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    throw error;
  }
}

// 🔹 Criar usuário cliente
export async function criarUsuarioCliente(novoUsuario) {
  try {
    const response = await axios.post(
      "http://localhost:8080/usuarios/cadastro",
      novoUsuario
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário cliente:", error);
    throw error;
  }
}

// 🔹 Atualizar usuário (PUT)
export async function editarUsuarioCliente(id, usuarioAtualizado) {
  try {
    const response = await axios.put(
      `http://localhost:8080/usuarios/${id}`,
      usuarioAtualizado
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}

// 🔹 Deletar usuário
export async function deletarUsuarioCliente(id) {
  try {
    const response = await axios.patch(
      `http://localhost:8080/usuarios/deletar/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
}

// 🔹 Buscar usuário por ID
export async function listarUsuarioPorId(id) {
  try {
    const response = await axios.get(`http://localhost:8080/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
}

// 🔹 Mudar senha
export async function mudarSenha(id, newSenha, oldSenha) {
  try {
    const response = await axios.patch(
      `http://localhost:8080/usuarios/mudarSenha/${id}`,
      { senhaAtual: oldSenha, novaSenha: newSenha }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    throw error;
  }
}

// 🔹 Atualizar informações do salão
export async function editarInfoSalaoCompleto(infoSalao) {
  try {
    const response = await axios.put("http://localhost:8080/info-salao", infoSalao);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar informações do salão:", error);
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

export async function agendamentosPassadosUsuario(id) {
  try {
    const response = await axios.get(`http://localhost:8080/agendamento/passados-usuario/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos passados do usuário:", error);
    throw error;
  }
}

export async function agendamentosPassadosFuncionario(id) {
  try {
    const response = await axios.get(`http://localhost:8080/agendamento/passados-funcionario/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar agendamentos passados do funcionário:", error);
    throw error;
  }
}