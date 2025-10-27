import { useEffect, useState } from "react";
import { agendamentosPassadosUsuario, listarUsuarioPorId } from "../js/api/kaua";
import { mensagemErro } from "../js/utils";
import ConcluirAgendamentoPop from "./ConcluirAgendamentoPop";
import VerDetalhesPop from "./VerDetalhesPop";
import "../css/pages/adm_pages/usuarios/clienteDetalhes.css";

export default function ClienteDetalhes({ idCliente, onClose }) {
  const [cliente, setCliente] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [popupConcluir, setPopupConcluir] = useState(null);
  const [popupDetalhes, setPopupDetalhes] = useState(null);

  useEffect(() => {
    buscarDadosCliente();
  }, [idCliente]);

  const buscarDadosCliente = async () => {
    try {
      const dadosCliente = await listarUsuarioPorId(idCliente);
      const historico = await agendamentosPassadosUsuario(idCliente);

      setCliente(dadosCliente);
      setAgendamentos(historico);
    } catch (error) {
      mensagemErro("Erro ao carregar informações do cliente.");
      console.error(error);
    }
  };

  if (!cliente) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className="cliente-detalhes-overlay">
      <div className="cliente-detalhes-card">
        {/* Botão de Fechar */}
        <button className="btn-fechar" onClick={onClose}>
          ✖
        </button>

        {/* Cabeçalho com informações do cliente */}
        <div className="cliente-info-header">
          <img
            src={"/src/assets/img/foto_perfil.png"}
            alt="Foto do cliente"
            className="foto-cliente"
          />

          <div className="cliente-info">
            <h3 className="bold">{cliente.nome}</h3>
            <p>📧 {cliente.email}</p>
            <p>📞 {cliente.telefone}</p>
            <p>🎂 {cliente.dataNascimento}</p>
            <p>🆔 CPF: {cliente.cpf}</p>
          </div>
        </div>

        {/* Histórico de atendimentos */}
        <h4>Atendimentos Passados:</h4>

        <div className="agendamentos-lista">
          {agendamentos.length > 0 ? (
            agendamentos.map((ag) => (
              <div key={ag.id} className="agendamento-card">
                <div>
                  <p>
                    <strong>Serviço:</strong> {ag.servico?.nome || "Não informado"}
                  </p>
                  <p>
                    <strong>Data:</strong> {`${ag.data} ${ag.fim}` || "dd/mm/yy 00:00"}
                  </p>
                  <p>
                    <strong>Status:</strong> {ag.statusAgendamento?.status || "Desconhecido"}{" "}
                    <strong>Valor:</strong> R${ag.preco?.toFixed(2) || "0,00"}
                  </p>
                </div>

                <div className="botoes-agendamento">
                  <button
                    className="btn-rosa"
                    onClick={() => setPopupConcluir(ag)} // abre popup de concluir
                  >
                    Concluir
                  </button>
                  <button
                    className="btn-branco"
                    onClick={() => setPopupDetalhes([ag])} // abre popup de detalhes
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum atendimento encontrado.</p>
          )}
        </div>

        {/* Botão de sair */}
        <button className="btn-rosa" onClick={onClose}>
          Sair
        </button>
      </div>

      {/* Popup de Concluir */}
      {popupConcluir && (
        <ConcluirAgendamentoPop
          dados={popupConcluir}
          onClose={() => setPopupConcluir(null)}
          atualizarAgendamentos={buscarDadosCliente}
        />
      )}

      {/* Popup de Detalhes */}
      {popupDetalhes && (
        <VerDetalhesPop
          dados={popupDetalhes}
          onClose={() => setPopupDetalhes(null)}
        />
      )}
    </div>
  );
}
