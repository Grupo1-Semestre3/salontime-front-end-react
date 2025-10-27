import { useState, useEffect } from "react";
import { criarUsuarioCliente, atualizarUsuario } from "../js/api/kaua";
import { mensagemErro, mensagemSucesso } from "../js/utils";
import "../css/pages/adm_pages/usuarios/formularioFuncionario.css";

export default function FormularioCriarFuncionario({ onClose, atualizarFuncionarios }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [servicos, setServicos] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);

  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await fetch("http://localhost:8080/servicos");
      const data = await response.json();
      setServicos(data);
    } catch (error) {
      mensagemErro("Erro ao carregar serviços.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const funcionario = {
      nome,
      email,
      telefone,
      cpf,
      senha,
      servicos: servicosSelecionados, // array de IDs
      tipoUsuario: "FUNCIONARIO"
    };

    try {
      await criarUsuarioCliente(funcionario);
      mensagemSucesso("Funcionário cadastrado com sucesso!");
      atualizarFuncionarios();
      onClose();
    } catch (error) {
      mensagemErro("Erro ao cadastrar funcionário.");
    }
  };

  const handleSelecionarServico = (id) => {
    setServicosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="form-overlay">
      <div className="form-card">
        <button className="btn-fechar" onClick={onClose}>
          ✖
        </button>

        <h2>Cadastrar Funcionário</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />

          <h4>Serviços do Funcionário:</h4>
          <div className="servicos-lista">
            {servicos.map((serv) => (
              <label key={serv.id} className="servico-item">
                <input
                  type="checkbox"
                  checked={servicosSelecionados.includes(serv.id)}
                  onChange={() => handleSelecionarServico(serv.id)}
                />
                {serv.nome}
              </label>
            ))}
          </div>

          <button type="submit" className="btn-rosa">Salvar</button>
        </form>
      </div>
    </div>
  );
}