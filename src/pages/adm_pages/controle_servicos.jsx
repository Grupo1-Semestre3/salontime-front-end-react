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
  // helper: formata Date -> YYYY-MM-DD para inputs type=date e chamadas à API
  const toISODate = (d) => {
    const date = d instanceof Date ? d : new Date(d);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // padrão: intervalo dos últimos 7 dias
  const hoje = new Date();
  const seteDiasAtras = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [dataInicio, setDataInicio] = useState(toISODate(seteDiasAtras));
  const [dataFim, setDataFim] = useState(toISODate(hoje));
  const [kpiData, setKpiData] = useState(null);
  const [kpiUsuariosData, setKpiUsuariosData] = useState(null);
  const [atendimentoGraficoData, setAtendimentoGraficoData] = useState(null);
  const [atendimentoServicoData, setAtendimentoServicoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [iaLoading, setIaLoading] = useState(false);
  const [iaResposta, setIaResposta] = useState("");
  const [iaErro, setIaErro] = useState("");

  // Função que carrega todos os dados do dashboard para o intervalo selecionado
  const carregarDados = async () => {
    setLoading(true);
    setErro(null);
    const errors = [];

    // Run all requests in parallel but handle each result individually so one failing
    // endpoint doesn't prevent the others from rendering.
    const pKpi = buscarKPI(dataInicio, dataFim);
    const pKpiUsuarios = buscarKPIUsuarios(dataInicio, dataFim);
    const pGrafico = buscarAtendimentoGrafico(dataInicio, dataFim);
    const pServico = buscarAtendimentoServico(dataInicio, dataFim);

    const results = await Promise.allSettled([pKpi, pKpiUsuarios, pGrafico, pServico]);

    // KPI geral
    if (results[0].status === "fulfilled") {
      const dados = results[0].value;
      if (dados && dados.length > 0) setKpiData(dados[0]);
      else setKpiData(null);
    } else {
      console.error("buscarKPI failed:", results[0].reason);
      setKpiData(null);
      errors.push("KPI geral");
    }

    // KPI usuários
    if (results[1].status === "fulfilled") {
      setKpiUsuariosData(results[1].value || null);
    } else {
      console.error("buscarKPIUsuarios failed:", results[1].reason);
      setKpiUsuariosData(null);
      errors.push("KPI usuários");
    }

    // Gráfico de atendimentos
    if (results[2].status === "fulfilled") {
      const dadosGrafico = results[2].value;
      setAtendimentoGraficoData(dadosGrafico && dadosGrafico.length > 0 ? dadosGrafico : null);
    } else {
      console.error("buscarAtendimentoGrafico failed:", results[2].reason);
      setAtendimentoGraficoData(null);
      errors.push("Atendimentos (gráfico)");
    }

    // Atendimentos por serviço
    if (results[3].status === "fulfilled") {
      const dadosServico = results[3].value;
      setAtendimentoServicoData(dadosServico && dadosServico.length > 0 ? dadosServico : null);
    } else {
      console.error("buscarAtendimentoServico failed:", results[3].reason);
      setAtendimentoServicoData(null);
      errors.push("Atendimentos por serviço");
    }

    if (errors.length > 0) {
      setErro(`Falha ao carregar: ${errors.join(", ")}.`);
    } else {
      setErro(null);
    }

    setLoading(false);
  };

  // Carrega inicialmente ao montar
  useEffect(() => {
    carregarDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Processar dados do gráfico de atendimentos
  const processarDadosGrafico = () => {
    if (!atendimentoGraficoData || atendimentoGraficoData.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Periodo selecionado",
            data: [],
            borderColor: "black",
            backgroundColor: "#211F1E",
            fill: false,
            pointBackgroundColor: "black",
            tension: 0.3,
          }
        ],
      };
    }

    // Garantir que os pontos estejam ordenados pelo dia do mês
    const dadosOrdenados = [...atendimentoGraficoData].sort(
      (a, b) => Number(a.diaMesAtual) - Number(b.diaMesAtual)
    );

    // Formatar labels como DD/MM usando o mês de dataInicio
    const mesNum = new Date(dataInicio).getMonth() + 1;
    const diasMes = dadosOrdenados.map((item) =>
      `${String(item.diaMesAtual).padStart(2, "0")}/${String(mesNum).padStart(2, "0")}`
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
        }
      ],
    };
  };

  const atendimentosData = processarDadosGrafico();

  const atendimentosOptions = {
    responsive: true,
    maintainAspectRatio: true, // preserve aspect ratio to avoid vertical stretch
    aspectRatio: 3, // width / height; tweak (e.g., 2.5~3.5) to taste
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
            label: "Período selecionado",
            data: [],
            backgroundColor: "black",
          }
        ],
      };
    }

    // Ordenar por quantidade atual (decrescente) para mostrar os mais populares primeiro
    const dadosOrdenados = [...atendimentoServicoData].sort(
      (a, b) => b.qtdAtual - a.qtdAtual
    );

    const labels = dadosOrdenados.map(item => item.nomeServico);
    const qtdAtual = dadosOrdenados.map(item => item.qtdAtual);

    return {
      labels,
      datasets: [
        {
          label: "Periodo selecionado",
          data: qtdAtual,
          backgroundColor: "black",
        }
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
Período: ${dataInicio} a ${dataFim}
Total atendimentos: ${kpiData?.totalAtendimentos ?? "NA"}
Cancelados: ${kpiData?.totalCancelados ?? "NA"}
Clientes cadastrados: ${kpiUsuariosData?.totalCadastros ?? "NA"}
Faturamento: ${kpiData?.faturamentoTotal ?? "NA"}
Top serviços (qtd no período): ${contextoServicos || "Sem dados"}

Objetivo: gere uma análise em português, com:
- Tendências principais
- Possíveis causas
- Sugestões práticas para aumentar receita e reduzir cancelamentos
Use bullets curtos e tom profissional.

Lembre-se que sua resposta será uma variavel string exibida diretamente dentro de uma div de um site, então não utilize formatações de texto (bold/italic/title/etc).`;

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
          <p className="titulo-1">Período Selecionado:</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '24px' }}>
            <label className="paragrafo-1" style={{marginTop:"4px"}} htmlFor="dataInicio_input">De</label>
            <input
              id="dataInicio_input"
              type="date"
              className="paragrafo-2 input select_data_range_dash semibold"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              onFocus={() => setErro(null)}
            />

            <label className="paragrafo-1" style={{marginTop:"4px"}} htmlFor="dataFim_input">Até</label>
            <input
              id="dataFim_input"
              type="date"
              className="paragrafo-2 input select_data_range_dash semibold"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              onFocus={() => setErro(null)}
            />

            <button
              className="btn-rosa paragrafo-2"
              onClick={() => {
                // validação simples: dataInicio <= dataFim
                if (new Date(dataInicio) > new Date(dataFim)) {
                  setErro('Data inicial não pode ser maior que data final.');
                  return;
                }
                setErro(null);
                carregarDados();
              }}
              style={{ marginLeft: '12px' }}
            >
              Atualizar
            </button>
          </div>
        </div>

        {/* Mini Nav */}
       <ControleMensal />

        {/* KPIs */}
        <div className="section_controle_servico_kpis_pai">
          <div className="section_controle_servico_kpis card">
            <p className="paragrafo-2 italic">Total de Atendimentos</p>
            <div className="section_controle_servico_kpis_card_column">
              <p className="paragrafo-1 semibold">{kpiData?.totalAtendimentos ?? "—"}</p>
              {/* <p className="paragrafo-2 section_controle_servico_kpis_card_value">
                {kpiData?.totalAtendimentosTaxa 
                  ? `${kpiData.totalAtendimentosTaxa > 0 ? '+' : ''}${kpiData.totalAtendimentosTaxa}%` 
                  : "—"}
              </p> */}
            </div>
          </div>

          <div className="section_controle_servico_kpis card">
            <p className="paragrafo-2 italic">Atendimentos Cancelados</p>
            <div className="section_controle_servico_kpis_card_column">
              <p className="paragrafo-1 semibold">{kpiData?.totalCancelados ?? "—"}</p>
              {/* <p
                className="paragrafo-2 section_controle_servico_kpis_card_value"
                style={{ backgroundColor: "var(--vermelho)" }}
              >
                {kpiData?.totalCanceladosTaxa 
                  ? `${kpiData.totalCanceladosTaxa > 0 ? '+' : ''}${kpiData.totalCanceladosTaxa}%` 
                  : "—"}
              </p> */}
            </div>
          </div>

          <div className="section_controle_servico_kpis card">
            <p className="paragrafo-2 italic">Clientes Cadastrados</p>
            <div className="section_controle_servico_kpis_card_column">
              <p className="paragrafo-1 semibold">{kpiUsuariosData?.totalCadastros ?? "—"}</p>
              {/* <p className="paragrafo-2 section_controle_servico_kpis_card_value">
                {kpiUsuariosData?.variacaoPercentual 
                  ? `${kpiUsuariosData.variacaoPercentual > 0 ? '+' : ''}${kpiUsuariosData.variacaoPercentual}%` 
                  : "—"}
              </p> */}
            </div>
          </div>

          <div className="section_controle_servico_kpis card">
            <p className="paragrafo-2 italic">Faturamento Total</p>
            <div className="section_controle_servico_kpis_card_column">
              <p className="paragrafo-1 semibold">
                {kpiData?.faturamentoTotal ? `R$${kpiData.faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
              </p>
              {/* <p className="paragrafo-2 section_controle_servico_kpis_card_value">
                {kpiData?.faturamentoTotalTaxa 
                  ? `${kpiData.faturamentoTotalTaxa > 0 ? '+' : ''}${kpiData.faturamentoTotalTaxa}%` 
                  : "—"}
              </p> */}
            </div>
          </div>
        </div>

        {/* Gráfico de Atendimentos por Dia */}
        <div className="section_controle_servico_grafico card" style={{ width: "100%" }}>
          <p className="paragrafo-2 semibold" style={{ alignSelf: "flex-start", textAlign: "start" }}>Atendimentos por Dia</p>
          <Line data={atendimentosData} options={atendimentosOptions} style={{ width: "100%", justifyContent: "center"}} />
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
              <p className="paragrafo-2">Gere insights automáticos com base nos dados apresentados.</p>
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
                  maxHeight:"180px",
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

