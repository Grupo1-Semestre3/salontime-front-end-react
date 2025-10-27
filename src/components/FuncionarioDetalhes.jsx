import { useEffect, useState } from "react";
import { listarUsuarioPorId, agendamentosPassadosFuncionario } from "../js/api/kaua";
import { mensagemErro } from "../js/utils";
import "../css/pages/adm_pages/usuarios/clienteDetalhes.css";
import ConcluirAgendamentoPop from "./ConcluirAgendamentoPop";
import VerDetalhesPop from "./VerDetalhesPop";

export default function FuncionarioDetalhes({ idFuncionario, onClose }) {
  const [funcionario, setFuncionario] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [popupConcluir, setPopupConcluir] = useState(null);
  const [popupDetalhes, setPopupDetalhes] = useState(null);

  useEffect(() => {
    buscarDadosFuncionario();
  }, [idFuncionario]);

  const buscarDadosFuncionario = async () => {
    try {
      const dados = await listarUsuarioPorId(idFuncionario);
      const historico = await agendamentosPassadosFuncionario(idFuncionario);
      setFuncionario(dados);
      setAgendamentos(historico);
    } catch (error) {
      mensagemErro("Erro ao carregar informações do funcionário.");
    }
  };

  if (!funcionario) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className="cliente-detalhes-overlay">
      <div className="cliente-detalhes-card">
        <button className="btn-fechar" onClick={onClose}>✖</button>

        <div className="cliente-info-header">
          <img src={"/src/assets/img/foto_perfil.png"} alt="Foto do funcionário" className="foto-cliente" />
          <div className="cliente-info">
            <h3 className="bold">{funcionario.nome}</h3>
            <p>📧 {funcionario.email}</p>
            <p>📞 {funcionario.telefone}</p>
            <p>🆔 CPF: {funcionario.cpf}</p>
          </div>
        </div>

        <h4>Serviços do Funcionário:</h4>
        <div className="servicos-lista">
          {funcionario.servicos?.length > 0 ? (
            funcionario.servicos.map((s, idx) => (
              <span key={idx} className="servico-tag">{s.nome}</span>
            ))
          ) : (
            <p>Sem serviços atribuídos.</p>
          )}
        </div>

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