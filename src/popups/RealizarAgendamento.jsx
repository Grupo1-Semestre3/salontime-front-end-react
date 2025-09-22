import { useEffect, useState } from "react";
import "../css/popup/realizarAgendamento.css";
import "../css/popup/padraoPopup.css";

export default function RealizarAgendamento({ servico, onClose }) {
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    // Ativa a classe "ativo" após o render
    const timeout = setTimeout(() => setAnimar(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="popup-overlay">
      <div className={`popup ${animar ? "ativo" : ""}`}>
        <div className="nome_servico_box">
          <p className="paragrafo-2">{servico?.nome || "Serviço"}</p>
        </div>

        <div className="data_box">
          <label htmlFor="data">Selecione a data que preferir</label>
          <input type="date" name="data" id="data" />
        </div>

        <div className="horarios_box">
          <p>Horários disponíveis</p>
          <div className="grid_horarios">
            {Array(12).fill("9:00").map((hora, i) => (
              <div key={i}>{hora}</div>
            ))}
          </div>
        </div>

        <div className="button_box">
          <button className="btn-rosa">Confirmar</button>
          <button className="btn-branco" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
