import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuDash from "../../components/MenuDash";
import ControleMensalLayout from "../../components/ControleMensalLayout";
import ControleItemCard from "../../components/ControleItemCard";

export default function Controle_cancelamentos() {
  const navigate = useNavigate();
  const [mesSelecionado, setMesSelecionado] = useState("fev");

  // ...existing code...

  // Mock/fonte de dados (substitua por API/estado real se já houver)
  const cancelamentos = [
    {
      id: 1,
      clienteNome: "Nome da Cliente",
      servicoNome: "xxxx",
      dataHoraISO: "2025-02-14T15:00:00.000Z",
      descricao:
        "Descrição do motivo Descrição do motivo Descrição do motivo...",
      fotoUrl: "/src/assets/img/foto_perfil.png",
      mes: "fev",
    },
  ];

  // Filtro por mês selecionado
  const itensFiltrados = cancelamentos.filter((c) => c.mes === mesSelecionado);

  // Formatação de data/hora
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

  return (
    <MenuDash>
      <ControleMensalLayout
        active="cancelamentos"
        mes={mesSelecionado}
        onMesChange={setMesSelecionado}
      >
        <div className="dash_lista_itens">
          {itensFiltrados.map((c) => (
            <ControleItemCard
              key={c.id}
              tipo="cancelamento"
              fotoUrl={c.fotoUrl}
              clienteNome={c.clienteNome}
              servicoNome={c.servicoNome}
              dataHoraISO={c.dataHoraISO}
              descricao={c.descricao}
              formatarDataHora={formatarDataHora}
            />
          ))}
        </div>
      </ControleMensalLayout>
    </MenuDash>
  );
}