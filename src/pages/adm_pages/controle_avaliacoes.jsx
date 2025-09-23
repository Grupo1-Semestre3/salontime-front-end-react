import { useState } from "react";
import MenuDash from "../../components/MenuDash";
import ControleMensalLayout from "../../components/ControleMensalLayout";
import ControleItemCard from "../../components/ControleItemCard";
export default function Controle_avaliacoes() {
  const [mesSelecionado, setMesSelecionado] = useState("fev");

  // Mock/fonte de dados (substitua por API/estado real)
  const avaliacoes = [
    {
      id: 1,
      clienteNome: "Nome da Cliente",
      servicoNome: "xxxx",
      dataHoraISO: "2025-02-14T15:00:00.000Z",
      descricao:
        "Mensagem de avaliação da cliente Mensagem de avaliação...",
      fotoUrl: "/src/assets/img/foto_perfil.png",
      estrelas: 4,
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

  const Estrelas = ({ quantidade }) => {
    const arr = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= quantidade;
      arr.push(
        <img
          key={i}
          src={filled ? "/src/assets/svg/icon_star_filled.svg" : "/src/assets/svg/icon_star_outline.svg"}
          alt={filled ? "estrela preenchida" : "estrela vazia"}
        />
      );
    }
    return <div className="estrelas">{arr}</div>;
  };

  return (
    <MenuDash>
      <ControleMensalLayout
        active="avaliacoes"
        mes={mesSelecionado}
        onMesChange={setMesSelecionado}
      >
        <div className="dash_lista_itens">
          {itensFiltrados.map((a) => (
            <ControleItemCard
              key={a.id}
              tipo="avaliacao"
              fotoUrl={a.fotoUrl}
              clienteNome={a.clienteNome}
              servicoNome={a.servicoNome}
              dataHoraISO={a.dataHoraISO}
              descricao={a.descricao}
              estrelas={a.estrelas}
              formatarDataHora={formatarDataHora}
            />
          ))}
        </div>
      </ControleMensalLayout>
    </MenuDash>
  );
}