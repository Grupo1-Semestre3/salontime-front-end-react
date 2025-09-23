import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import NavbarLandingPage from "/src/components/NavbarLandingPage.jsx";
import Footer from "/src/components/Footer.jsx";
import Popup from "../../components/Popup.jsx";
import { buscarServicos } from "../../js/api/servico.js"

export default function Servicos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);


  useEffect(() => {
    buscarServicos()
      .then(data => {
        setServicos(data);
      })
      .catch(error => {
        console.error("Erro ao carregar catalogo de servicos:", error);
      });

  }, []); // 👈 useEffect fechado corretamente

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

  const navegar = (url) => {
    window.location.href = url;
  };

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
              {usuario ? `Bem vinda de volta ${usuario.nome}!` : ""}
            </h2>

            <div className="conteudo_proximo_agendamento">
              <span className="paragrafo-1">Você tem 1 horário marcado:</span>

              <div className="card_proximo_agendamento shadow">
                <div className="conteudo">
                  <p className="paragrafo-1 bold">Nome do serviço</p>
                  <p className="paragrafo-1 bold" style={{ display: "flex", alignItems: "end" }}>
                    <img src="/src/assets/vector/icon_horariio/ionicons/sharp/time-sharp.svg" alt="" />
                    01/01/2000 00:00pm
                  </p>
                  <p className="paragrafo-1">
                    <b>Status:</b> Confirmado
                  </p>
                </div>
                <div className="btn-juntos" style={{ flexDirection: "column" }}>
                  <button className="btn-rosa paragrafo-1">Reagendar</button>
                  <button className="btn-branco paragrafo-1">Cancelar</button>
                </div>
              </div>
            </div>

            <p className="hist_agendamento paragrafo-2">
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
            <img src="/src/assets/vector/icon_cupom/bootstrap/filled/tags-fill.svg" alt="icon-cupom" />
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
  return (
    <Popup>
      <>
        <div className="nome_servico_box">
          <p className="paragrafo-1">{servico?.nome || "Serviço"}</p>
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
      </>
    </Popup>
  );

}
