import { useEffect, useState } from "react";
import { 
  listarUsuarioPorId, 
  agendamentosPassadosFuncionario, 
  listarServicosPorFuncionario, 
  listarServicos, 
  deletarServicoFuncionario,
  criarServicoFuncionario,
  getFotoPerfilUsuario
} from "../js/api/kaua";
import { mensagemErro, mensagemSucesso } from "../js/utils";
import "../css/pages/adm_pages/usuarios/clienteDetalhes.css";
import ConcluirAgendamentoPop from "./ConcluirAgendamentoPop";
import VerDetalhesPop from "./VerDetalhesPop";

export default function FuncionarioDetalhes({ idFuncionario, onClose }) {
  const [funcionario, setFuncionario] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState("/src/assets/img/foto_perfil.png"); // 🔹 Fallback padrão
  const [agendamentos, setAgendamentos] = useState([]);
  const [todosServicos, setTodosServicos] = useState([]);
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [competenciasFuncionario, setCompetenciasFuncionario] = useState([]);
  const [popupConcluir, setPopupConcluir] = useState(null);
  const [popupDetalhes, setPopupDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idFuncionario) {
      buscarDadosFuncionario();
    }
  }, [idFuncionario]);

  const buscarDadosFuncionario = async () => {
    setLoading(true);
    try {
      const dados = await listarUsuarioPorId(idFuncionario);
      setFuncionario(dados);

      // 🔹 Buscar foto de perfil do funcionário
      try {
        const blob = await getFotoPerfilUsuario(idFuncionario);
        const fotoUrl = URL.createObjectURL(blob);
        setFotoPerfil(fotoUrl);
      } catch {
        setFotoPerfil("/src/assets/img/foto_perfil.png");
      }

      const historico = await agendamentosPassadosFuncionario(idFuncionario);
      setAgendamentos(historico);

      const competencias = await listarServicosPorFuncionario(idFuncionario);
      setCompetenciasFuncionario(competencias);

      const idsSelecionados = competencias.map(c => c.servico.id);
      setServicosSelecionados(idsSelecionados);

      const todos = await listarServicos();
      setTodosServicos(todos);

    } catch (error) {
      mensagemErro("Erro ao carregar informações do funcionário.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const atualizarServicos = async () => {
    try {
      const idsNovos = servicosSelecionados.filter(id => !competenciasFuncionario.some(c => c.servico.id === id));
      for (let id of idsNovos) {
        await criarServicoFuncionario({ funcionario: idFuncionario, servico: id });
      }

      const idsRemover = competenciasFuncionario
        .filter(c => !servicosSelecionados.includes(c.servico.id))
        .map(c => c.id);
      for (let idComp of idsRemover) {
        await deletarServicoFuncionario(idComp);
      }

      mensagemSucesso("Serviços atualizados com sucesso!");
      buscarDadosFuncionario();
    } catch (error) {
      mensagemErro("Erro ao atualizar serviços do funcionário.");
      console.error(error);
    }
  };

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className="cliente-detalhes-overlay">
      <div className="cliente-detalhes-card">
        <button className="btn-fechar" onClick={onClose}>✖</button>

        <div className="cliente-info-header">
          <img src={fotoPerfil} alt="Foto do funcionário" className="foto-cliente" />
          <div className="cliente-info">
            <h3 className="bold">{funcionario.nome}</h3>
            <p>📧 {funcionario.email}</p>
            <p>📞 {funcionario.telefone}</p>
            <p>🆔 CPF: {funcionario.cpf}</p>
          </div>
        </div>

        <h4>Serviços Liberados:</h4>
        <div className="servicos-lista">
          {todosServicos.map((s) => (
            <label key={s.id} className="servico-item">
              <input
                type="checkbox"
                checked={servicosSelecionados.includes(s.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setServicosSelecionados([...servicosSelecionados, s.id]);
                  } else {
                    setServicosSelecionados(servicosSelecionados.filter(id => id !== s.id));
                  }
                }}
              />
              {s.nome}
            </label>
          ))}
        </div>

        <button className="btn-verde" onClick={atualizarServicos}>Atualizar</button>

        <h4>Atendimentos Passados:</h4>
        <div className="agendamentos-lista">
          {agendamentos.length > 0 ? (
            agendamentos.map((ag) => (
              <div key={ag.id} className="agendamento-card">
                <p><strong>Serviço:</strong> {ag.servico.nome}</p>
                <p><strong>Data:</strong> {ag.data} {ag.fim}</p>
                <p><strong>Status:</strong> {ag.statusAgendamento.status}</p>

                <div className="botoes-agendamento">
                  <button className="btn-rosa" onClick={() => setPopupConcluir(ag)}>Concluir</button>
                  <button className="btn-branco" onClick={() => setPopupDetalhes([ag])}>Detalhes</button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum atendimento encontrado.</p>
          )}
        </div>

        <button className="btn-rosa" onClick={onClose}>Sair</button>
      </div>

      {popupConcluir && (
        <ConcluirAgendamentoPop
          dados={popupConcluir}
          onClose={() => setPopupConcluir(null)}
          atualizarAgendamentos={buscarDadosFuncionario}
        />
      )}

      {popupDetalhes && (
        <VerDetalhesPop
          dados={popupDetalhes}
          onClose={() => setPopupDetalhes(null)}
        />
      )}
    </div>
  );
}
