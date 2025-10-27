import Popup from "../components/Popup";
import { formatarDataBR } from "../js/utils";

export default function VerDetalhesPop({ dados, onClose }) {
  if (!dados || dados.length === 0) return null;

  return (
    <Popup>
      <div className="calendario_box_popup_concluir_agendamento">
        <h1>Detalhes do atendimento</h1>

        {dados.map((item, index) => (
          <div key={index} className="calendario_box_info_historico_detalhes_agendamento">
            <div>
              <span className="calendario_bolinha calendario_bolinha_cinza"></span>
            </div>

            <div className="calendario_box_infos_status_data">
              <h4>{item.statusAgendamento?.status}</h4>
              <p>
                {formatarDataBR(item.data)} {item.inicio?.slice(0, 5)}h
              </p>
            </div>
          </div>
        ))}

        <button className="btn-rosa" onClick={onClose}>
          Voltar
        </button>
      </div>
    </Popup>
  );
}