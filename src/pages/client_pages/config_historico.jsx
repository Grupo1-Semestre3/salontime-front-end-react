import { useNavigate } from "react-router-dom";
import MenuConfig from "/src/components/MenuConfig.jsx";

function Card_historico({id, nome, data, horario, status, valor}) {
  return (
    <>
      <div className="card_historico">
        <div className="esquerda">
          <div className="campos">
            <p className="semibold paragrafo-1">Serviço: </p>
            <p className="paragrafo-1"> {nome}</p>
          </div>
          <div className="campos" style={{ gap: "16px" }}>
            <p className="data" style={{ gap: "5px" }}>
              <img style={{ maxWidth: 24 }} src={"/src/assets/svg/time-sharp.svg"} alt="" />
              <span>{data}</span>
            </p>
            <p> {horario} pm</p>
          </div>
          <div className="campos" style={{ gap: "16px" }}>
            <div className="campos">
              <p className="semibold paragrafo-2">Status: </p>
              <p className="paragrafo-2">{status}</p>
            </div>
            <div className="campos">
              <p className="semibold paragrafo-2">Valor: </p>
              <p className="paragrafo-2"> R${valor}</p>
            </div>
          </div>
        </div>
        <div className="direita">
          <button className="btn-rosa">Avaliar</button>
          <button className="btn-branco">Detalhes</button>
        </div>
      </div>
    </>
  )
}

function listarHistorico(lista){
  return lista.map(item => (
    <Card_historico
      key={item.id}
      idServico={item.id}
      nomeServico={item.nome}
      data={item.data}
      horario={item.horario}
      status={item.status}
      valor={item.valor}
    />
  ));
}

export default function Config_historico() {
  const lista = [
          {id: 1, nome: "Corte de Cabelo", data: "12/05/23", horario: "14:00", status: "Concluído", valor: "50,00"},
          {id: 2, nome: "Manicure", data: "15/05/23", horario: "10:00", status: "Concluído", valor: "30,00"},
          {id: 3, nome: "Pedicure", data: "20/05/23", horario: "11:00", status: "Concluído", valor: "40,00"},
          {id: 4, nome: "Massagem", data: "25/05/23", horario: "16:00", status: "Concluído", valor: "100,00"}
        ]
  return (
    <MenuConfig>
      <div className="config_section_container">
        <p className="titulo-1">Atendimentos passados:</p>
        {lista.map((item, idx) => (
          <Card_historico key={idx} {...item} />
        ))}
      </div>
    </MenuConfig>
  );
}
