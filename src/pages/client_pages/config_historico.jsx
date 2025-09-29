import { useState, useEffect } from "react";
import MenuConfig from "/src/components/MenuConfig.jsx";
import { buscarAtendimentosPassados } from "../../js/api/caio";

function Card_historico({ servico, statusAgendamento, preco, data, inicio }) {
  return (
    <div className="card_historico">
      <div className="esquerda">
        <div className="campos">
          <p className="semibold paragrafo-1">Serviço: </p>
          <p className="paragrafo-1"> {servico?.nome}</p>
        </div>
        <div className="campos" style={{ gap: "16px" }}>
          <p className="data" style={{ gap: "5px" }}>
            <img style={{ maxWidth: 24 }} src={"/src/assets/svg/time-sharp.svg"} alt="" />
            <span>{data}</span>
          </p>
          <p> {inicio}h</p>
        </div>
        <div className="campos" style={{ gap: "16px" }}>
          <div className="campos">
            <p className="semibold paragrafo-2">Status: </p>
            <p className="paragrafo-2">{statusAgendamento?.status}</p>
          </div>
          <div className="campos">
            <p className="semibold paragrafo-2">Valor: </p>
            <p className="paragrafo-2"> R${preco}</p>
          </div>
        </div>
      </div>
      <div className="direita">
        <button className="btn-rosa">Avaliar</button>
        <button className="btn-branco">Detalhes</button>
      </div>
    </div>
  );
}

export default function ConfigHistorico() {

  const [usuario, setUsuario] = useState(null);
  const [atendimento, setAtendimento] = useState([]);

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      const usuarioObj = JSON.parse(usuarioStr);
      setUsuario(usuarioObj);
    }
  }, []);

  useEffect(() => {
    if (usuario && usuario.id) {
      buscarAtendimentosPassados(usuario.id)
        .then(data => {
          if (Array.isArray(data)) {
            setAtendimento(data);
            console.log(data);
          } else {
            setAtendimento([]);
          }
        })
        .catch(error => {
          console.error("Erro ao carregar atendimentos passados:", error);
          setAtendimento([]);
        });
    }
  }, [usuario]);

  return (
    <MenuConfig>
      <div className="config_section_container">
        <p className="titulo-1">Atendimentos passados:</p>
        <div className="config_historico_lista">
          {atendimento.length === 0 ? (
            <p className="paragrafo-2">Nenhum atendimento encontrado.</p>
          ) : (
            atendimento.map((dado, index) => (
              <Card_historico
                key={index}
                servico={dado.servico}
                statusAgendamento={dado.statusAgendamento}
                preco={dado.preco}
                data={dado.data}
                inicio={dado.inicio}
              />
            ))
          )}
        </div>
      </div>
    </MenuConfig>
  );
}
