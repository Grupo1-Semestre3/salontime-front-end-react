import "../../css/popup/realizarAgendamento.css";
// FUNCOES 
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { exibirHorariosDisponiveis, listarPagamento, salvarAgendamento, reagendarAgendamento } from "../../js/api/maikon.js"; 

// COMPONENTES
import NavbarLandingPage from "/src/components/NavbarLandingPage.jsx";
import Footer from "/src/components/Footer.jsx";
import Popup, { PopupAlerta } from "../../components/Popup.jsx";

// JS 
import { mensagemSucesso, mensagemErro, formatarDataBR } from "../../js/utils.js";
import { buscarServicos } from "../../js/api/servico.js"
import { buscarProximoAgendamento, cancelarAgendamentoJS, enviarMotivoCancelar } from "../../js/api/caio.js"
import "../../css/popup/padraoPopup.css";


export default function Servicos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [popupAlertaAberto, setPopupAlertaAberto] = useState(false);
  const [popupMotivoCancelar, setPopupMotivoCancelar] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [proximoAgendamento, setProximoAgendamento] = useState({});
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [dadosParaReagendar, setDadosParaReagendar] = useState(null)
  const [modalRealizarReagendamento, setModalRealizarReagendamento] = useState(false);


  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      setUsuario(JSON.parse(usuario));
    }
  }, []);

  useEffect(() => {
    buscarServicos()
      .then(data => {
        setServicos(data);
      })
      .catch(error => {
        console.error("Erro ao carregar catalogo de servicos:", error);
      });

  }, []); // 👈 useEffect fechado corretamente

  useEffect(() => {
    if (usuario && usuario.id) {
      buscarProximoAgendamento(usuario.id)
        .then(data => {
          setProximoAgendamento(data);
        })
        .catch(error => {
          console.error("Erro ao carregar próximo agendamento:", error);
        });
    }
  }, [usuario]);

  const handleAgendarClick = (idServico) => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Você precisa estar logado!',
        text: 'Faça login para agendar um serviço.',
        confirmButtonText: 'Ok'
      });
    } else {
      const servico = servicos.find(s => s.id === idServico);
      setServicoSelecionado(servico);
      setModalAberto(true);
    }
  };

  const handleCancelarClick = () => {
    setPopupAlertaAberto(true);
  };

  const handleMotivoCancelar = () => {
    // Lógica para lidar com o motivo do cancelamento
    setPopupMotivoCancelar(true);
  }

  const confirmarCancelamento = () => {
    try {
      cancelarAgendamentoJS(proximoAgendamento.id);
      mensagemSucesso(`Agendamento cancelado com sucesso!`)
      setTimeout(() => {
        handleMotivoCancelar();
      }, 1500);
    } catch (error) {
      mensagemErro("Erro ao cancelar agendamento. Tente novamente mais tarde.");
      return
    }
    setPopupAlertaAberto(false);

  };

  
  const carregarProximoAgendamento = async (idUsuario) => {
    try {
      const data = await buscarProximoAgendamento(idUsuario);
      setProximoAgendamento(data);
    } catch (error) {
      console.error("Erro ao carregar próximo agendamento:", error);
    }
  };

  const confirmarMotivoCancelar = () => {
    try {
      const descricao = document.getElementById("motivo-cancelamento").value;
      enviarMotivoCancelar({ descricao, agendamento: proximoAgendamento });
      mensagemSucesso(`Motivo de cancelamento enviado com sucesso!`)
    } catch (error) {
      mensagemErro("Erro ao enviar motivo de cancelamento. Tente novamente mais tarde.");
      return
    }
    setPopupMotivoCancelar(false);
    
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("usuarioLogado") === "1");
  }, []);

  return (
    <>

      {/* Pop up */}
      {modalAberto && servicoSelecionado && (
        <RealizarAgendamento
          servico={servicoSelecionado}
          onClose={() => setModalAberto(false)}
        />
      )}

      {modalRealizarReagendamento && dadosParaReagendar && (
        <RealizarReagendamento
          onClose={() => {
            setModalRealizarReagendamento(false);
            setDadosParaReagendar(null);
          }}
          dadosAgendamento={dadosParaReagendar}
          onAgendamentoSalvo={() => carregarProximoAgendamento(usuario.id)}
        />
      )}

      {/* NAV */}
      <NavbarLandingPage />

      {/* HOME */}
      {!isLoggedIn && (
        <section className="home_section_pai" id="section_home_servicos">
          <div className="home_section_title">
            <div className="home_section_title_desc">
              <p className="super-titulo">Marina Mota Hair</p>
              <p className="paragrafo-2">
                Quando o assunto é auto cuidado, a Salon Time e Marina Motta são suas melhores amigas!
                Cadastre-se e agende seus serviços de beleza a qualquer hora, com praticidade e exclusividade,
                além de promoções temporárias imperdíveis!
              </p>
            </div>
            <div className="btn-juntos">
              <button className="btn-branco" onClick={() => navigate("/")}>Saiba Mais</button>
              <button className="btn-rosa" onClick={() => navigate("/servicos")}>Serviços</button>
            </div>
          </div>
          <div className="home_section_img">
            <img src="/src/assets/img/Group 51.png" alt="imagem de fundo" />
          </div>
        </section>
      )}

      {/* PRÓXIMOS ATENDIMENTOS */}
      {isLoggedIn && (
        <section className="principal_section" id="section_proximos_atendimentos">
          <div className="home_session_pai">
            <h2 id="nomeDinamico" className="super-titulo">
              Bem vinda de volta{usuario ? ` ${usuario.nome}` : ""}!
            </h2>

            <div className="conteudo_proximo_agendamento">
              <span className="paragrafo-1">{
                proximoAgendamento && proximoAgendamento.statusAgendamento?.id === 1
                  ? `Você tem 1 horário marcado:`
                  : "Você não tem horários marcados 😢"
              }</span>

              <div className="card_proximo_agendamento shadow" style={{ display: proximoAgendamento && proximoAgendamento.statusAgendamento?.id === 1 ? "flex" : "none" }}>
                <div className="conteudo">
                  <p className="paragrafo-1 bold">{proximoAgendamento.servico?.nome}</p>
                  <p className="paragrafo-1 bold" style={{ display: "flex", alignItems: "center", gap: '4px' }}>
                    <img src="/src/assets/vector/icon_horariio/ionicons/sharp/time-sharp.svg" alt="" style={{ minHeight: "20px", minWidth: "20px" }} />
                    {/* 01/01/2000 00:00pm */}
                    {formatarDataBR(proximoAgendamento.data)  || "--/--/----"} {proximoAgendamento.inicio || "--:--"}h
                  </p>
                  <p className="paragrafo-1">
                    <b>Status:</b> {proximoAgendamento.statusAgendamento?.status || "Sem status"}
                  </p>
                </div>
                <div className="btn-juntos" style={{ flexDirection: "column" }}>
                  <button className="btn-rosa paragrafo-1"
                    onClick={() => {
                      setDadosParaReagendar(proximoAgendamento);
                      setModalRealizarReagendamento(true);
                    }}
                  >Reagendar</button>
                  <button className="btn-branco paragrafo-1" onClick={handleCancelarClick}>Cancelar</button>
                  {popupAlertaAberto && (
                    <PopupAlerta
                      mensagem="Tem certeza que deseja cancelar o agendamento?"
                      funcao={confirmarCancelamento}
                      onClose={() => setPopupAlertaAberto(false)}
                    />
                  )}
                  {popupMotivoCancelar && (
                    <Popup>
                      <p className="paragrafo-2 semibold">Pode nos dizer o motivo do cancelamento?</p>
                      <textarea id="motivo-cancelamento" placeholder="Digite o motivo do cancelamento..." />
                      <div className="btn-juntos">
                        <button className="btn-rosa" onClick={() => confirmarMotivoCancelar()}>Enviar</button>
                        <button className="btn-branco" onClick={() => setPopupMotivoCancelar(false)}>Pular</button>
                      </div>
                    </Popup>
                  )}
                </div>
              </div>
            </div>

            <p className="hist_agendamento paragrafo-2" onClick={() => navigate("/config-historico")}>
              <img src="/src/assets/svg/arrow-back.svg" alt="" />
              Histórico de Agendamentos
            </p>
          </div>
        </section>
      )}

      {/* MARINA POINTS */}
      {isLoggedIn && (
        <section className="marina_points_section" id="section_marina_points">
          <div className="marina_points_title">
            <p className="titulo-1" style={{ color: "var(--rosa-2)" }}>Marina Points!</p>
            <div className="marina_points_dec">
              <p className="paragrafo-1 bold" style={{ color: "var(--rosa-2)" }}>Complete a trilha para receber um cupom de desconto!
              </p>
              <p className="paragrafo-2" style={{ color: "var(--rosa-2)" }}>A cada agendamento realizado 1 ponto é registrado.</p>
            </div>
          </div>
          <div className="marina_points_bar">
            <div className="marina_points_etapas">

              <div className="marina_points_etapa_ativa">
                <div className="marina_points_circle">
                  <p className="subtitulo bold" style={{ color: "var(--rosa-4)" }}>1</p>
                </div>
                <div className="marina_points_conexao"></div>
              </div>

              <div className="marina_points_etapa_ativa">
                <div className="marina_points_circle">
                  <p className="subtitulo bold" style={{ color: "var(--rosa-4)" }}>2</p>
                </div>
                <div className="marina_points_conexao"></div>
              </div>

              <div className="marina_points_etapa_inativa">
                <div className="marina_points_circle">
                  <p className="subtitulo bold" style={{ color: "var(--rosa-1)" }}>3</p>
                </div>
                <div className="marina_points_conexao"></div>
              </div>

              <div className="marina_points_etapa_inativa">
                <div className="marina_points_circle">
                  <p className="subtitulo bold" style={{ color: "var(--rosa-1)" }}>4</p>
                </div>
                <div className="marina_points_conexao"></div>
              </div>

              <div className="marina_points_etapa_inativa">
                <div className="marina_points_circle">
                  <p className="subtitulo bold" style={{ color: "var(--rosa-1)" }}>5</p>
                </div>
                <div className="marina_points_conexao"></div>
              </div>
            </div>
            <img src="/src/assets/vector/icon_cupom/bootstrap/filled/tags-fill.svg" alt="icon-cupom" className="icon-cupom-max" />
          </div>
        </section>
      )}

      {/* CATÁLOGO DE SERVIÇOS */}
      <section className="catalogo_section_pai">
        <p className="titulo-1">Agende um serviço!</p>
        <div className="catalogo_section_lista">
          {servicos.map((dado) => {
            const estrelaQtd = Math.round(dado.mediaAvaliacao);
            const estrelas = [];

            for (let i = 1; i <= 5; i++) {
              estrelas.push(
                <img
                  key={i}
                  src={
                    i <= estrelaQtd
                      ? "/src/assets/svg/icon_star_outline.svg"
                      : "/src/assets/svg/icon_star_filled.svg"
                  }
                  alt="star"
                />
              );
            }

            return (
              <div key={dado.id} className="catalogo_section_card shadow">
                <div className="catalogo_section_title">
                  <p className="paragrafo-1 bold" style={{ color: "var(--rosa-4)" }}>
                    {dado.nome}
                  </p>
                </div>
                <div className="catalogo_section_conteudo">
                  <p className="paragrafo-2">{dado.descricao}</p>
                  <div className="catalogo_section_infos">
                    <div className="estrelas">{estrelas}</div>
                    <div className="info">
                      <img
                        src="/src/assets/vector/icon_horariio/ionicons/sharp/time-sharp.svg"
                        alt="icon-horario"
                      />
                      <p className="paragrafo-2">{dado.tempo}</p>
                    </div>
                    <div className="info">
                      <img
                        src="/src/assets/vector/icon_dinheiro/ionicons/sharp/cash-sharp.svg"
                        alt="icon-dinheiro"
                      />
                      <p className="paragrafo-2">A partir de R${dado.preco}</p>
                    </div>
                    <button
                      className="btn-rosa"
                      value={dado.id}
                      onClick={() => handleAgendarClick(dado.id)}
                    >
                      <img
                        src="/src/assets/vector/icon_sum/jam-icons//Vector.svg"
                        alt="icon-sum"
                      />
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* FOOTER */}
      <Footer></Footer>
    </>
  );
}

function RealizarAgendamento({ servico, onClose }) {

  const [pagamentos, setPagamento] = useState([]);

  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [cupomSelecionado, setCupomSelecionado] = useState("");
  const [pagamentoSelecionado, setPagamentoSelecionado] = useState("");


  useEffect(() => {
    // Buscar serviços e clientes ao abrir o popup
    async function carregarDadosIniciais() {
      try {

        const pagamento = await listarPagamento();

        setPagamento(pagamento);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarDadosIniciais();
  }, []);

  useEffect(() => {
    async function carregarHorarios() {
      if (dataSelecionada && servico?.id) {
        try {
          const horariosDisponiveis = await exibirHorariosDisponiveis(servico.id, dataSelecionada);
          setHorarios(horariosDisponiveis);
        } catch (error) {
          console.error("Erro ao buscar horários:", error);
          mensagemErro("Erro ao buscar horários disponíveis.");
        }
      }
    }

    carregarHorarios();
  }, [dataSelecionada, servico]);

  async function handleConfirmarAgendamento() {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));

      if (!usuario || !usuario.id) {
        mensagemErro("Usuário não encontrado. Faça login novamente.");
        return;
      }

      if (!dataSelecionada || !horarioSelecionado || !pagamentoSelecionado) {
        mensagemErro("Preencha todos os campos obrigatórios.");
        return;
      }

      await salvarAgendamento(
        usuario.id,
        servico.id,
        pagamentoSelecionado,
        dataSelecionada,
        horarioSelecionado
      );

      mensagemSucesso("Agendamento realizado com sucesso!");
      onClose(); // fecha o modal
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      mensagemErro("Erro ao realizar agendamento. Tente novamente mais tarde.");
    }
  }


  return (
    <Popup>
      <div className="nome_servico_box">
        <p className="paragrafo-1">{servico?.nome || "Serviço"}</p>
      </div>

      <div className="servicos">
        <div className="servico_agendamento_popup">

          <label htmlFor="data">Selecione a data que preferir</label>
          <input
            type="date"
            name="data"
            id="data"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // impedindo datas passadas
          />


          <select
            value={horarioSelecionado}
            onChange={(e) => setHorarioSelecionado(e.target.value)}
            disabled={!horarios.length}
          >
            <option value="" disabled hidden>
              {dataSelecionada && servico?.id
                ? "Selecione um horário"
                : "Selecione data"}
            </option>
            {horarios.map((hora, i) => (
              <option key={i} value={hora.horario}>
                {hora.horario}
              </option>
            ))}
          </select>

          <select
            value={pagamentoSelecionado}
            onChange={(e) => setPagamentoSelecionado(e.target.value)}
          >
            <option value="" disabled hidden>Pagamento</option>
            {pagamentos.map((pagamento, i) => (
              <option key={i} value={pagamento.id}>{pagamento.forma}</option>
            ))}
          </select>

          <label htmlFor="cupom">Digite o cupom</label>
          <input
            placeholder="Digite o cupom (OPCIONAL)"
            type="text"
            name="cupom"
            id="cupom"
            value={cupomSelecionado}
            onChange={(e) => setCupomSelecionado(e.target.value)}
          />
        </div>

        <div className="button_box">
          <button className="btn-rosa" onClick={handleConfirmarAgendamento}>Confirmar</button>

          <button className="btn-branco" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </Popup>
  );

}



function RealizarReagendamento({ onClose, dadosAgendamento, onAgendamentoSalvo }) {
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  const servicoId = dadosAgendamento?.servico?.id;
  const agendamentoId = dadosAgendamento?.id;

  // 🔁 Buscar horários quando data muda
  useEffect(() => {
    async function carregarHorarios() {
      if (dataSelecionada && servicoId) {
        try {
          const horariosDisponiveis = await exibirHorariosDisponiveis(servicoId, dataSelecionada);
          setHorarios(horariosDisponiveis);
        } catch (error) {
          console.error("Erro ao buscar horários:", error);
          mensagemErro("Erro ao buscar horários disponíveis.");
        }
      }
    }

    carregarHorarios();
  }, [dataSelecionada, servicoId]);

  const handleConfirmarReagendamento = async () => {
    if (!dataSelecionada || !horarioSelecionado) {
      mensagemErro("Selecione uma nova data e horário.");
      return;
    }

    console.log("###############3")
    console.log(agendamentoId, dataSelecionada, horarioSelecionado)
    console.log("###############3")
    try {
      await reagendarAgendamento(agendamentoId, dataSelecionada, horarioSelecionado);
      mensagemSucesso("Reagendamento realizado com sucesso!");
      if (onAgendamentoSalvo) await onAgendamentoSalvo();
      onClose();
    } catch (error) {
      console.error("Erro ao reagendar:", error);
      mensagemErro("Erro ao realizar reagendamento.");
    }
  };

  return (
    <Popup>
      <div className="calendario_box_popup_realizar_agendamento_adm">
        <h2 className="supertitulo-2">Reagendar Atendimento</h2>

        <p className="paragrafo-2">Serviço: <strong>{dadosAgendamento?.servico?.nome}</strong></p>

        <div className="calendario_box_lbl_inp_popup">
          <label>Nova data</label>
          <input
            type="date"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="calendario_box_down_boxes_popup">
          <label>Horários disponíveis</label>
          <select
            value={horarioSelecionado}
            onChange={(e) => setHorarioSelecionado(e.target.value)}
          >
            <option value="" disabled hidden>Selecione o horário</option>
            {horarios.map((hora, i) => (
              <option key={i} value={hora.horario}>
                {hora.horario}
              </option>
            ))}
          </select>
        </div>

        <div className="button_box">
          <button className="btn-rosa" onClick={handleConfirmarReagendamento}>Confirmar</button>
          <button className="btn-branco" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </Popup>
  );
}