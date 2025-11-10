import { useEffect, useState } from "react";
import MenuDash from "../../components/MenuDash";
import ControleMensal from "../../components/NavControleMensal";
import { buscarKPI, buscarKPIUsuarios, buscarAtendimentoGrafico, buscarAtendimentoServico } from "../../js/api/elerson";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { perguntarIA } from "../../js/api/ai";

// Registrar módulos do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Controle_servicos() {
  const [ano, setAno] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [kpiData, setKpiData] = useState(null);
  const [kpiUsuariosData, setKpiUsuariosData] = useState(null);
  const [atendimentoGraficoData, setAtendimentoGraficoData] = useState(null);
  const [atendimentoServicoData, setAtendimentoServicoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [iaLoading, setIaLoading] = useState(false);
  const [iaResposta, setIaResposta] = useState("");
  const [iaErro, setIaErro] = useState("");

  // Buscar dados do KPI quando ano ou mês mudar
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      setErro(null);
      try {
        // Buscar dados de KPI geral
        const dados = await buscarKPI(ano, mes);
        if (dados && dados.length > 0) {
          setKpiData(dados[0]);
        } else {
          setKpiData(null);
        }

        // Buscar dados de KPI de usuários
        const dadosUsuarios = await buscarKPIUsuarios(ano, mes);
        if (dadosUsuarios) {
          setKpiUsuariosData(dadosUsuarios);
        } else {
          setKpiUsuariosData(null);
        }

        // Buscar dados de atendimento para gráfico
        const dadosGrafico = await buscarAtendimentoGrafico(ano, mes);
        if (dadosGrafico && dadosGrafico.length > 0) {
          setAtendimentoGraficoData(dadosGrafico);
        } else {
          setAtendimentoGraficoData(null);
        }

        // Buscar dados de atendimento por serviço
        const dadosServico = await buscarAtendimentoServico(ano, mes);
        if (dadosServico && dadosServico.length > 0) {
          setAtendimentoServicoData(dadosServico);
        } else {
          setAtendimentoServicoData(null);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setErro("Erro ao carregar dados do KPI");
        setKpiData(null);
        setKpiUsuariosData(null);
        setAtendimentoGraficoData(null);
        setAtendimentoServicoData(null);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, [ano, mes]);

  // Processar dados do gráfico de atendimentos
  const processarDadosGrafico = () => {
    if (!atendimentoGraficoData || atendimentoGraficoData.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Mês selecionado",
            data: [],
            borderColor: "black",
            backgroundColor: "#211F1E",
            fill: false,
            pointBackgroundColor: "black",
            tension: 0.3,
          },
          {
            label: "Mês anterior",
            data: [],
            borderColor: "lightgray",
            backgroundColor: "lightgray",
            fill: false,
            pointBackgroundColor: "lightgray",
            tension: 0.3,
          },
        ],
      };
    }

    // Garantir que os pontos estejam ordenados pelo dia do mês
    const dadosOrdenados = [...atendimentoGraficoData].sort(
      (a, b) => Number(a.diaMesAtual) - Number(b.diaMesAtual)
    );

    // Formatar labels como DD/MM usando o mês selecionado (estado `mes`)
    const diasMes = dadosOrdenados.map((item) =>
      `${String(item.diaMesAtual).padStart(2, "0")}/${String(mes).padStart(2, "0")}`
    );
    const qtdAtual = dadosOrdenados.map((item) => item.qtdAtual);
    const qtdAnterior = dadosOrdenados.map((item) => item.qtdAnterior);

    return {
      labels: diasMes,
      datasets: [
        {
          label: "Mês selecionado",
          data: qtdAtual,
          borderColor: "black",
          backgroundColor: "#211F1E",
          fill: false,
          pointBackgroundColor: "black",
          tension: 0.3,
        },
        {
          label: "Mês anterior",
          data: qtdAnterior,
          borderColor: "lightgray",
          backgroundColor: "lightgray",
          fill: false,
          pointBackgroundColor: "lightgray",
          tension: 0.3,
        },
      ],
    };
  };

  const atendimentosData = processarDadosGrafico();

  const atendimentosOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dia do mês",
        },
        ticks: {
          maxRotation: 30,
          minRotation: 30,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Número de atendimentos",
        },
      },
    },
  };

  // Processar dados do gráfico de serviços
  const processarDadosServicos = () => {
    if (!atendimentoServicoData || atendimentoServicoData.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Mês selecionado",
            data: [],
            backgroundColor: "black",
          },
          {
            label: "Mês anterior",
            data: [],
            backgroundColor: "lightgray",
          },
        ],
      };
    }

    // Ordenar por quantidade atual (decrescente) para mostrar os mais populares primeiro
    const dadosOrdenados = [...atendimentoServicoData].sort(
      (a, b) => b.qtdAtual - a.qtdAtual
    );

    const labels = dadosOrdenados.map(item => item.nomeServico);
    const qtdAtual = dadosOrdenados.map(item => item.qtdAtual);
    const qtdAnterior = dadosOrdenados.map(item => item.qtdAnterior);

    return {
      labels,
      datasets: [
        {
          label: "Mês selecionado",
          data: qtdAtual,
          backgroundColor: "black",
        },
        {
          label: "Mês anterior",
          data: qtdAnterior,
          backgroundColor: "lightgray",
        },
      ],
    };
  };

  const servicosData = processarDadosServicos();

  const servicosOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade",
        },
      },
    },
  };

  async function gerarAnaliseIA() {
    setIaLoading(true);
    setIaErro("");
    setIaResposta("");
    try {
      // Monta um contexto resumido com alguns KPIs e top serviços
      const contextoServicos = (atendimentoServicoData || [])
        .sort((a,b) => b.qtdAtual - a.qtdAtual)
        .slice(0,5)
        .map(s => `${s.nomeServico}: ${s.qtdAtual}`)
        .join("; ");

      const prompt = `Você é um assistente que gera insights para gestão de um salão de beleza.
Mês: ${mes}/${ano}
Total atendimentos: ${kpiData?.totalAtendimentos ?? "NA"}
Cancelados: ${kpiData?.totalCancelados ?? "NA"}
Clientes cadastrados: ${kpiUsuariosData?.totalCadastros ?? "NA"}
Faturamento: ${kpiData?.faturamentoTotal ?? "NA"}
Top serviços (qtd mês atual): ${contextoServicos || "Sem dados"}

Objetivo: gere uma análise em português, com:
- Tendências principais
- Possíveis causas
- Sugestões práticas para aumentar receita e reduzir cancelamentos
- Oportunidades de marketing
Use bullets curtos e tom profissional.`;

      const resposta = await perguntarIA(prompt);
      setIaResposta(resposta);
    } catch (e) {
      setIaErro(e.message || "Erro ao gerar análise");
    } finally {
      setIaLoading(false);
    }
  }

  return (
    <MenuDash>
     
        {/* Título + Select */}
        <div className="section_controle_servico_title">
          <p className="titulo-1">Mês Selecionado</p>
          <select 
            className="paragrafo-1 select semibold" 
            name="mes" 
            id="mes_select"
            value={mes}
            onChange={(e) => setMes(parseInt(e.target.value))}
          >
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>

        {/* Mini Nav */}
       <ControleMensal />

        {/* KPIs */}
        <div className="section_controle_servico_kpis_pai">
          <div className="section_controle_servico_kpis card">
            <p className="paragrafo-2 italic">Total de Atendimentos</p>
            <div className="section_controle_servico_kpis_card_column">
              <p className="paragrafo-1 semibold">{kpiData?.totalAtendimentos ?? "—"}</p>
              <p className="paragrafo-2 section_controle_servico_kpis_card_value">
                {kpiData?.totalAtendimentosTaxa 
                  ? `${kpiData.totalAtendimentosTaxa > 0 ? '+' : ''}${kpiData.totalAtendimentosTaxa}%` 
                  : "—"}
              </p>
            </div>
          </div>

          <div className="section_controle_servico_kpis card">
            <p className="paragrafo-2 italic">Atendimentos Cancelados</p>
            <div className="section_controle_servico_kpis_card_column">
              <p className="paragrafo-1 semibold">{kpiData?.totalCancelados ?? "—"}</p>
              <p
                className="paragrafo-2 section_controle_servico_kpis_card_value"
                style={{ backgroundColor: "var(--vermelho)" }}
              >
                {kpiData?.totalCanceladosTaxa 
                  ? `${kpiData.totalCanceladosTaxa > 0 ? '+' : ''}${kpiData.totalCanceladosTaxa}%` 
                  : "—"}
              </p>
            </div>
          </div>

          <div className="section_controle_servico_kpis card">
            <p className="paragrafo-2 italic">Clientes Cadastrados</p>
            <div className="section_controle_servico_kpis_card_column">
              <p className="paragrafo-1 semibold">{kpiUsuariosData?.totalCadastros ?? "—"}</p>
              <p className="paragrafo-2 section_controle_servico_kpis_card_value">
                {kpiUsuariosData?.variacaoPercentual 
                  ? `${kpiUsuariosData.variacaoPercentual > 0 ? '+' : ''}${kpiUsuariosData.variacaoPercentual}%` 
                  : "—"}
              </p>
            </div>
          </div>

          <div className="section_controle_servico_kpis card">
            <p className="paragrafo-2 italic">Faturamento Total</p>
            <div className="section_controle_servico_kpis_card_column">
              <p className="paragrafo-1 semibold">
                {kpiData?.faturamentoTotal ? `R$${kpiData.faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
              </p>
              <p className="paragrafo-2 section_controle_servico_kpis_card_value">
                {kpiData?.faturamentoTotalTaxa 
                  ? `${kpiData.faturamentoTotalTaxa > 0 ? '+' : ''}${kpiData.faturamentoTotalTaxa}%` 
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Gráfico de Atendimentos por Dia */}
        <div className="section_controle_servico_grafico card">
          <p className="paragrafo-2 semibold">Atendimentos por Dia</p>
          <Line data={atendimentosData} options={atendimentosOptions} />
        </div>

        {/* Linha com gráfico e análise IA */}
        <div className="section_controle_servico_line2">
          <div className="section_controle_servico_column_pai card">
            <p className="paragrafo-2 semibold">Atendimentos por Serviço</p>
            <Bar data={servicosData} options={servicosOptions} />
          </div>

          <div className="section_controle_servico_column_pai card" style={{ gap: "16px" }}>
            <p className="paragrafo-2 semibold" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/src/assets/svg/icon_ia.svg" alt="icon-ia" />
              Análise de Desempenho
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              <p className="paragrafo-2">Gere insights automáticos com base nos KPIs do mês.</p>
              <button 
                onClick={gerarAnaliseIA} 
                disabled={iaLoading} 
                className="paragrafo-2 semibold" 
                style={{
                  padding:"8px 12px",
                  background:"black",
                  color:"white",
                  borderRadius:"6px",
                  width:"fit-content",
                  cursor: iaLoading?"not-allowed":"pointer",
                  opacity: iaLoading?0.7:1
                }}>
                {iaLoading ? "Gerando análise..." : "Gerar análise IA"}
              </button>
              {iaErro && <p style={{ color:"var(--vermelho)", whiteSpace:"pre-wrap" }}>{iaErro}</p>}
              {iaResposta && (
                <div style={{
                  maxHeight:"240px",
                  overflowY:"auto",
                  padding:"8px 12px",
                  border:"1px solid #ddd",
                  borderRadius:"6px",
                  background:"#fafafa",
                  whiteSpace:"pre-wrap",
                  fontSize:"0.85rem"
                }}>
                  {iaResposta}
                </div>
              )}
            </div>
          </div>
        </div>
      
    </MenuDash>
  );
}

