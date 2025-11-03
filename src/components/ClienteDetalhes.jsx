import { useEffect, useState } from "react";
import { 
  agendamentosPassadosUsuario, 
  listarUsuarioPorId, 
  getFotoPerfilUsuario 
} from "../js/api/kaua";
import { mensagemErro } from "../js/utils";
import ConcluirAgendamentoPop from "./ConcluirAgendamentoPop";
import VerDetalhesPop from "./VerDetalhesPop";
import "../css/pages/adm_pages/usuarios/clienteDetalhes.css";

export default function ClienteDetalhes({ idCliente, onClose }) {
  const [cliente, setCliente] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [popupConcluir, setPopupConcluir] = useState(null);
  const [popupDetalhes, setPopupDetalhes] = useState(null);
  const [fotoCliente, setFotoCliente] = useState("/src/assets/img/foto_perfil.png");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idCliente) buscarDadosCliente();
  }, [idCliente]);

  const buscarDadosCliente = async () => {
    setLoading(true);
    try {
      const dadosCliente = await listarUsuarioPorId(idCliente);
      setCliente(dadosCliente);

      const historico = await agendamentosPassadosUsuario(idCliente);
      setAgendamentos(historico);

      // Buscar foto do cliente
      const blob = await getFotoPerfilUsuario(idCliente);
      if (blob && blob.size > 0) {
        const url = URL.createObjectURL(blob);
        setFotoCliente(url);
      } else {
        setFotoCliente("/src/assets/img/foto_perfil.png");
      }
    } catch (error) {
      mensagemErro("Erro ao carregar informações do cliente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className="cliente-detalhes-overlay">
      <div className="cliente-detalhes-card">
        {/* <button className="btn-fechar" onClick={onClose}>✖</button> */}

        <div className="cliente-info-header">
          <img
            src={`http://localhost:8080/usuarios/foto/${idCliente}`}
            onError={(e) => { e.target.src = "/src/assets/img/usuario_foto_def.png"; }}
            alt={`Foto de ${cliente?.nome}`}
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

        <h4>Atendimentos Passados:</h4>
        <div className="agendamentos-lista">
          {agendamentos.length > 0 ? (
            agendamentos.map((ag) => (
              <div key={ag.id} className="agendamento-card">
                <div>
                  <p><strong>Serviço:</strong> {ag.servico?.nome || "Não informado"}</p>
                  <p><strong>Data:</strong> {`${ag.data} ${ag.fim}` || "dd/mm/yy 00:00"}</p>
                  <p>
                    <strong>Status:</strong> {ag.statusAgendamento?.status || "Desconhecido"}{" "}
                    <strong>Valor:</strong> R${ag.preco?.toFixed(2) || "0,00"}
                  </p>
                </div>

                <div className="botoes-agendamento">
                  <button className="btn-rosa" onClick={() => setPopupConcluir(ag)}>Concluir</button>
                  <button className="btn-branco" onClick={() => setPopupDetalhes([ag])}>Detalhes</button>
                </div>
              </div>
            ))
          ) : (
            <p className="italic">Nenhum atendimento encontrado.</p>
          )}
        </div>

        <button className="btn-rosa" onClick={onClose}>Sair</button>
      </div>

      {popupConcluir && (
        <ConcluirAgendamentoPop
          dados={popupConcluir}
          onClose={() => setPopupConcluir(null)}
          atualizarAgendamentos={buscarDadosCliente}
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
