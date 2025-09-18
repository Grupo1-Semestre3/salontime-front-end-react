import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLandingPage from "/src/components/NavbarLandingPage.jsx";
import Footer from "/src/components/Footer.jsx";

export default function Servicos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [servicos, setServicos] = useState([]); 
  useEffect(() => {
    // Recupera usuário
    const user = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(user);

    // Buscar serviços
    fetch("http://localhost:8080/servicos")
      .then((res) => res.json())
      .then((dados) => setServicos(dados))
      .catch((err) => console.error("Erro ao buscar serviços:", err));

    verificarLoginServicos();
  }, []);

  const listar = () => {
    console.log("Listar serviços...");
  };

  const verificarLoginServicos = () => {
    console.log("Verificando login para serviços...");
  };

  const navegar = (url) => {
    window.location.href = url;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "1");
  }, []);

  return (
    <>
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
          <img src="/src/assets/vector/icon_cupom/bootstrap/filled/tags-fill.svg" alt="icon-cupom"/>
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
              <button className="btn-rosa" value={dado.id}>
                <img
                  src="/src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg"
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






// <!DOCTYPE html>
// <html lang="pt-br">

// <head> <!-- UTILIZAR ESSSA HEAD COMO PADRAO PARA AS OUTRAS TELAS -->
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <link rel="stylesheet" href="/src/css/main.css" />
//   <script src="/src/js/utils/utils_cliente_pages.js"></script>
//   <script src="/src/js/api/cliente/cliente.js"></script>
//   <link rel="shortcut icon" href="/src/assets/svg/logo_rosa.svg" type="image/x-icon" />
//   <title>Salon Time | Serviços</title>
// </head>

// <body onload="listar(), verificarLoginServicos()">

//   <nav className="nav_institucional_pai">
//     <div class="nav_institucional_coluna">
//       <p class="paragrafo-2 underline-hover" onclick="navegar('./index.html')">Página Inicial</p>
//       <p class="paragrafo-2 underline" onclick="navegar('./servicos.html')">Serviços</p>
//     </div>
//     <div class="nav_institucional_coluna">
//       <img src="/src/assets/svg/logo_black.svg" alt="logo" style="height: 50px;">
//     </div>
//     <div class="nav_institucional_coluna">
//       <button id="btn_entrar" class="btn-branco" onclick="navegar('./login.html')">Entrar</button>
//       <button id="btn_cadastrar" class="btn-rosa" onclick="navegar('./cadastro.html')">Cadastre-se</button>
//       <button id="btn_perfil" class="btn-rosa" onclick="navegar('./config_perfil.html')" style="display: none;">Configurações</button>
//     </div>
//   </nav>

//   <!-- COMPONENTE - HOME -->
//   <section class="home_section_pai" id="section_home_servicos">
//     <div class="home_section_title">
//       <div class="home_section_title_desc">
//         <p class="super-titulo">Marina Mota Hair</p>
//         <p class="paragrafo-2">Quando o assunto é auto cuidado, a Salon Time e Marina Motta são suas melhores amigas!
//           Cadastre-se e agende seus serviços de beleza a qualquer hora, com praticidade e exclusividade, além de
//           promoções temporárias imperdíveis!</p>
//       </div>
//       <div class="btn-juntos">
//         <button class="btn-branco" onclick="navegar('./index.html')">Saiba Mais</button>
//         <button class="btn-rosa" onclick="navegar('./servicos.html')">Serviços</button>
//       </div>
//     </div>
//     <div class="home_section_img">
//       <img src="/src/assets/img/Group 51.png" alt="imgem de fundo">
//     </div>
//   </section>

//   <section class="principal_section" id="section_proximos_atendimentos" style="display: none;">
//     <div class="home_session_pai">
//       <h2 id="nomeDinamico" class="super-titulo"></h2>

//       <div class="conteudo_proximo_agendamento">
//         <span class="paragrafo-1">Você tem 1 horário marcado:</span>

//         <div class="card_proximo_agendamento shadow">
//           <div class="conteudo">
//             <p class="paragrafo-1 bold">Nome do serviço</p>
//             <p class="paragrafo-1 bold" style="display: flex; align-items: end;">
//               <img src="/src/assets/vector/icon_horariio/ionicons/sharp/time-sharp.svg" alt="">
//               01/01/2000 00:00pm
//             </p>
//             <p class="paragrafo-1"> <b>Status:</b> Confirmado</p>
//           </div>
//           <div class="btn-juntos" style="flex-direction: column;">
//             <button class="btn-rosa paragrafo-1"">Reagendar</button>
//             <button class=" btn-branco paragrafo-1"">Cancelar</button>
//           </div>
//         </div>

//       </div>

//       <p class="hist_agendamento paragrafo-2">
//         <img src="/src/assets/svg/arrow-back.svg" alt="">
//         Histórico de Agendamentos
//       </p>
//     </div>
//   </section>

//   <section class="marina_points_section" id="section_marina_points" style="display: none;">
//     <div class="marina_points_title"> 
//       <p class="titulo-1" style={{ color: "var(--rosa-2)" }}>Marina Points!</p>
//       <div class="marina_points_dec">
//         <p class="paragrafo-1 bold" style={{ color: "var(--rosa-2)" }}>Complete a trilha para receber um cupom de desconto!
//         </p>
//         <p class="paragrafo-2" style={{ color: "var(--rosa-2)" }}>A cada agendamento realizado 1 ponto é registrado.</p>
//       </div>
//     </div>
//     <div class="marina_points_bar">
//       <div class="marina_points_etapas">
//         
//         <div class="marina_points_etapa_ativa">
//           <div class="marina_points_circle">
//             <p class="subtitulo bold" style={{ color: "var(--rosa-2)" }}>1</p>
//           </div>
//           <div class="marina_points_conexao"></div>
//         </div>
//         
//         <div class="marina_points_etapa_ativa">
//           <div class="marina_points_circle">
//             <p class="subtitulo bold" style={{ color: "var(--rosa-2)" }}>2</p>
//           </div>
//           <div class="marina_points_conexao"></div>
//         </div>
//         
//         <div class="marina_points_etapa_inativa">
//           <div class="marina_points_circle">
//             <p class="subtitulo bold" style={{ color: "var(--rosa-2)" }}>3</p>
//           </div>
//           <div class="marina_points_conexao"></div>
//         </div>
//         
//         <div class="marina_points_etapa_inativa">
//           <div class="marina_points_circle">
//             <p class="subtitulo bold" style={{ color: "var(--rosa-2)" }}>4</p>
//           </div>
//           <div class="marina_points_conexao"></div>
//         </div>
//         
//         <div class="marina_points_etapa_inativa">
//           <div class="marina_points_circle">
//             <p class="subtitulo bold" style={{ color: "var(--rosa-2)" }}>5</p>
//           </div>
//           <div class="marina_points_conexao"></div>
//         </div>
//       </div>
//       <img src="/src/assets/vector/icon_cupom/bootstrap/filled/tags-fill.svg" alt="icon-cupom">
//     </div>
//   </section>



//   <section class="catalogo_section_pai">
//     <p class="titulo-1">Agende um serviço!</p>
//     <div id="catalogo_section_lista" class="catalogo_section_lista">
//       <!-- COMPONENTE CARD
      
//       <div class="catalogo_section_card shadow">
//         <div class="catalogo_section_title">
//           <p class="paragrafo-1 bold" style={{ color: "var(--rosa-2)" }}">Nome do Serviço</p>
//         </div>
//         <div class="catalogo_section_conteudo">
//           <p class="paragrafo-2">
//             Breve descrição do serviço <br>
//             Breve descrição do serviço <br>
//             Breve descrição do serviço <br>
//             Breve descrição do serviço <br>
//           </p>
//           <div class="catalogo_section_infos">
            
//             <div class="estrelas">
//               <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
//               <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
//               <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
//               <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
//               <img src="/src/assets/svg/icon_star_filled.svg" alt="star-preenchida">
//             </div>

//             <div class="info">
//               <img src="/src/assets/vector/icon_horariio/ionicons/sharp/time-sharp.svg" alt="icon-horario">
//               <p class="paragrafo-2">Tempo de atendimento: 10min</p>
//             </div>
//             <div class="info">
//               <img src="/src/assets/vector/icon_dinheiro/ionicons/sharp/cash-sharp.svg" alt="icon-dinheiro">
//               <p class="paragrafo-2">A partir de R$000,00</p>
//             </div>
//             <button class="btn-rosa"><img src="/src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg" alt=" icon-sum">Agendar</button>
//           </div>
//         </div>
//       </div>

//     </div>
//     -->

//   </section>
//   <!-- COMPONENTE FOOTER -->
//   <footer class="footer_pai">
//     <div class="footer_linha1">
//       <img src="/src/assets/svg/logo_white.svg" alt="logo" style="height: 45px;">
//       <div class="footer_linha1_social">
//         <img src="/src/assets/svg/icon_facebook.svg" alt="icon-social">
//         <img src="/src/assets/svg/icon_instagram3.svg" alt="icon-social">
//         <img src="/src/assets/svg/icon_linkedin.svg" alt="icon-social">
//       </div>
//     </div>
//     <div class="footer_linha2"></div>
//     <p class="paragrafo-2" style={{ color: "var(--rosa-2)" }}>@Copyright2025 Todos os direitos reservados.</p>
//   </footer>

// </body>
// </html>
// <script>

// const usuario = JSON.parse(localStorage.getItem("usuario"));

// const elementoNomeDinamico = document.getElementById("nomeDinamico")

// elementoNomeDinamico.innerHTML = `Bem vinda de volta ${usuario.nome}!`

// </script>