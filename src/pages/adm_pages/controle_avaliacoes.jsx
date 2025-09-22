import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MenuDash from "../../components/MenuDash";

export default function Controle_avaliacoes() {
  const navigate = useNavigate();
  const [mesSelecionado] = useState("fev");

  // Mock data - substituir por API quando disponível
  const avaliacoes = [
    {
      id: 1,
      clienteNome: "Nome da Cliente",
      servicoNome: "xxxx",
      dataHoraISO: "2025-02-14T15:00:00.000Z",
      descricao:
        "Mensagem de avaliação da cliente Mensagem de avaliação da cliente Mensagem de avaliação da cliente Mensagem de avaliação da cliente",
      fotoUrl: "/src/assets/img/foto_perfil.png",
      estrelas: 1,
      mes: "fev",
    },
  ];

  const itensFiltrados = avaliacoes.filter((a) => a.mes === mesSelecionado);

  const formatarDataHora = (iso) => {
    try {
      const d = new Date(iso);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yy = String(d.getFullYear()).slice(2);
      const hh = d.getHours();
      const min = String(d.getMinutes()).padStart(2, "0");
      const sufixo = hh >= 12 ? "pm" : "am";
      const hh12 = ((hh + 11) % 12) + 1;
      return `${dd}/${mm}/${yy} ${String(hh12).padStart(2, "0")}:${min}${sufixo}`;
    } catch {
      return iso;
    }
  };

  // Componente de estrelas de avaliação
  const Estrelas = ({ quantidade }) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= quantidade;
      const iconSrc = isFilled
        ? "/src/assets/svg/icon_star_filled.svg"
        : "/src/assets/svg/icon_star_outline.svg";
      estrelas.push(
        <img key={i} src={iconSrc} alt={`estrela ${isFilled ? 'preenchida' : 'vazia'}`} />
      );
    }
    return <div className="estrelas">{estrelas}</div>;
  };

  return (
    <MenuDash>
      <div className="section_controle_servico_title">
        <p className="titulo-1">Mês Selecionado</p>
        <select className="paragrafo-1 select semibold" name="mes" id="mes_select" defaultValue="fev">
          <option value="fev">Fevereiro</option>
        </select>
      </div>

      <div className="mini_nav_pai">
        <p className="paragrafo-2 mini_nav_filho" onClick={() => navigate("/adm/controle-servicos")}>
          Serviços
        </p>
        <p className="paragrafo-2 mini_nav_filho" onClick={() => navigate("/adm/controle-cancelamentos")}>
          Cancelamentos
        </p>
        <p className="paragrafo-2 mini_nav_filho_ativo" onClick={() => navigate("/adm/controle-avaliacoes")}>
          Avaliações
        </p>
      </div>

      <div className="dash_lista_itens">
        {itensFiltrados.map((a) => (
          <div key={a.id} className="section_controle_avaliacao_card card">
            <div className="section_controle_avaliacao_card_line" style={{ alignItems: "center" }}>
              <img src={a.fotoUrl} alt="icon_perfil" />
              <p className="paragrafo-1 semibold">{a.clienteNome}</p>
              <Estrelas quantidade={a.estrelas} />
            </div>
            <div className="section_controle_avaliacao_card_line" style={{ gap: "24px" }}>
              <p className="paragrafo-2">
                <a className="semibold">Serviço:</a> {a.servicoNome}
              </p>
              <p className="paragrafo-2 italic">
                <a className="semibold">Data:</a> {formatarDataHora(a.dataHoraISO)}
              </p>
            </div>
            <div className="section_controle_avaliacao_card_line" style={{ flexDirection: "column", gap: 0 }}>
              <p className="paragrafo-2 semibold">Descrição:</p>
              <p className="paragrafo-2">{a.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </MenuDash>
  );
}