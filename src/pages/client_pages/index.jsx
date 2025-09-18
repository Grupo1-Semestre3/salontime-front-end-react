import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarLandingPage from "/src/components/NavbarLandingPage.jsx";
import Footer from "/src/components/Footer.jsx";


// --- COMPONENTE ESPECIALIDADE ---
function EspecialidadeCard({ icon, titulo, descricao }) {
  return (
    <div className="especialidade_section_column">
      <div className="especialidade_icone">
        <img src={icon} alt={`icone-${titulo.toLowerCase()}`} />
      </div>
      <p className="paragrafo-1 bold" style={{ color: "var(--rosa-4)" }}>
        {titulo}
      </p>
      <p className="paragrafo-2" style={{ color: "var(--rosa-4)" }}>
        {descricao}
      </p>
    </div>
  );
}

// --- COMPONENTE AVALIAÇÃO ---
function AvaliacaoCard({ nome, data, estrelas, servico, comentario, imagem }) {
  return (
    <div className="avaliacao_section_card shadow">
      <div className="avaliacao_section_card_infos">
        <p className="paragrafo-2">{nome} • {data} •</p>
        <div className="estrelas">
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              key={i}
              src={`/src/assets/svg/${i < estrelas ? "icon_star_filled.svg" : "icon_star_outline.svg"}`}
              alt="estrela"
            />
          ))}
        </div>
      </div>
      <p className="paragrafo-2 italic">Serviço realizado: {servico}</p>
      <p className="paragrafo-2">{comentario}</p>
      <img src={imagem} alt="imagem-avaliacao" className="img-avaliacao" />
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function Index() {
  const navigate = useNavigate();

  // dados mockados (poderiam vir de API futuramente)
  const especialidades = [
    {
      icon: "/src/assets/svg/icon_cores.svg",
      titulo: "CORES",
      descricao: "Tons vibrantes, naturais ou ousados — encontramos a cor perfeita para valorizar sua beleza."
    },
    {
      icon: "/src/assets/svg/icon_corte.svg",
      titulo: "CORTE",
      descricao: "Cortes personalizados que respeitam seu estilo, sua rotina e a textura natural dos fios."
    },
    {
      icon: "/src/assets/svg/icon_mechas.svg",
      titulo: "MECHAS",
      descricao: "Luzes, balayage ou morena iluminada: mechas com técnica e bom gosto para realçar seu brilho."
    }
  ];

  const avaliacoes = [
    {
      nome: "Juliana Silva",
      data: "12 jun",
      estrelas: 4,
      servico: "Corte",
      comentario: "Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo",
      imagem: "/src/assets/img/mock_avaliacao/Team-member.png"
    },
    {
      nome: "Daniela Almeida",
      data: "03 ago",
      estrelas: 5,
      servico: "Luzes",
      comentario: "Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo",
      imagem: "/src/assets/img/mock_avaliacao/img-avaliacao-2.png"
    },
    {
      nome: "Thais Silva",
      data: "12 jun",
      estrelas: 4,
      servico: "Corte",
      comentario: "Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo",
      imagem: "/src/assets/img/mock_avaliacao/img-avaliacao-4.png"
    }
  ];

  return (
    <>
      <NavbarLandingPage />

      {/* Home */}
      <section className="home_section_pai">
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
            <button className="btn-rosa" onClick={() => navigate("/")}>Saiba Mais</button>
            <button className="btn-branco" onClick={() => navigate("/servicos")}>Serviços</button>
          </div>
        </div>
        <div className="home_section_img">
          <img src="/src/assets/img/Group 51.png" alt="imgem de fundo" />
        </div>
      </section>

      {/* Especialidades */}
      <section className="especialidade_section_pai">
        <p className="especialidade_section_title">ESPECIALISTA EM</p>
        <div className="especialidade_section_container">
          {especialidades.map((esp, idx) => (
            <EspecialidadeCard key={idx} {...esp} />
          ))}
        </div>
      </section>

      {/* Portifólio] */}
      <section className="portifolio_section_pai">
        <p className="paragrafo-2 italic portifolio_section_title">Um pouco do meu trabalho!</p>
        <img src="/src/assets/img/portifolio_teste.png" alt="portifolio" />
        <a href="https://www.instagram.com/marinamotahair/" target="_blank" rel="noopener noreferrer">
          <button className="btn-rosa bold" style={{ height: "50px" }}>
            <img src="/src/assets/svg/icon_instagram.svg" alt="" style={{ height: "30px" }} />
            Veja mais!
          </button>
        </a>
      </section>


      {/* Sobre mim */}
      <section className="sobre_section_pai">
        <img src="/src/assets/img/marina_sobre_mim.png" alt="sobre-mim" style={{ height: "576px" }} />
        <div className="sobre_section_container">
          <p className="titulo-1" style={{ fontFamily: "Georgia" }}>Sobre Mim</p>
          <p className="paragrafo-2" style={{ maxWidth: "424px" }}>
            Texto com uma breve descrição da Marina<br />
            Texto com uma breve descrição da Marina<br />
            Texto com uma breve descrição da Marina<br />
            Texto com uma breve descrição da Marina
          </p>
          <p className="paragrafo-2 italic sobre_section_social">
            <img src="/src/assets/svg/icon_whatsapp 1.svg" alt="icon-zap" />
            (11) 96555-8010
          </p>
          <p className="paragrafo-2 italic sobre_section_social">
            <img src="/src/assets/svg/icon_instagram2.svg" alt="icon-insta" />
            @marinamotahair
          </p>
          <button
            className="btn-rosa"
            onClick={() => navigate("/servicos")}
          >
            <img src="/src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg" alt="" />
            Agendar
          </button>
        </div>
      </section>

      {/* Localizacao */}
      <section className="section_local_pai">
        <div className="section_local_title">
          <p className="titulo-1" style={{ color: "var(--rosa-3)", fontFamily: "Georgia" }}>
            Localização do Salão
          </p>
          <div className="section_local_ender">
            <p className="paragrafo-2" style={{ color: "var(--rosa-3)" }}>
              R. Adamantina, 34 - 3 - Baeta Neves
            </p>
            <p className="paragrafo-2 italic" style={{ color: "var(--rosa-2)" }}>
              São Bernardo do Campo - SP, 09760-340
            </p>
          </div>
        </div>

        <div className="section_local_mapa">
          <div className="section_local_mapa_bar">
            <div className="section_local_circulo"></div>
            <div className="section_local_circulo"></div>
            <div className="section_local_circulo"></div>
          </div>
          <div className="section_local_mapa_google" id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.6253637830596!2d-46.5593502!3d-23.657927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce425d6f37e0cf%3A0x92b7fbb1e0c21678!2sR.%20Adamantina%2C%2034%20-%203%20-%20Baeta%20Neves%2C%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP%2C%2009760-340!5e0!3m2!1spt-BR!2sbr!4v1692279080345!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "0px 0px 32px 32px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section className="avaliacao_section_pai" style={{ padding: "0px !important" }}>
        <p className="titulo-1">Avaliações:</p>
        <div className="avaliacao_section_carrossel">
          <div className="group">
            {avaliacoes.map((av, idx) => (
              <AvaliacaoCard key={idx} {...av} />
            ))}
          </div>
          <div className="group">
            {avaliacoes.map((av, idx) => (
              <AvaliacaoCard key={idx} {...av} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}




/*
<!DOCTYPE html>
<html lang="pt-br">

<head> <!-- UTILIZAR ESSSA HEAD COMO PADRAO PARA AS OUTRAS TELAS -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/src/css/main.css" />
  <script src="/src/js/utils/utils_cliente_pages.js"></script>
  <link rel="shortcut icon" href="/src/assets/svg/logo_rosa.svg" type="image/x-icon" />
  <title>Salon Time | Página Inicial</title>
</head>

<body onload="verificarLoginIndex()">

  <!-- NAVBAR INSTITUCIONAL -->
  <nav className="nav_institucional_pai">
    <div className="nav_institucional_coluna">
      <p className="paragrafo-2 underline" onclick="navegar('./index.html')">Página Inicial</p>
      <p className="paragrafo-2 underline-hover" onclick="navegar('./servicos.html')">Serviços</p>
    </div>
    <div className="nav_institucional_coluna">
      <img src="/src/assets/svg/logo_black.svg" alt="logo" style="height: 50px;">
    </div>
    <div className="nav_institucional_coluna">
      <button id="btn_entrar" className="btn-branco" onclick="navegar('./login.html')">Entrar</button>
      <button id="btn_cadastrar" className="btn-rosa" onclick="navegar('./cadastro.html')">Cadastre-se</button>
      <button id="btn_perfil" className="btn-rosa" onclick="navegar('./config_perfil.html')"
        style="display: none;">Configurações</button>
    </div>
  </nav>


  <!-- COMPONENTE - HOME -->
  <section class="home_section_pai">
    <div class="home_section_title">
      <div class="home_section_title_desc">
        <p class="super-titulo">Marina Mota Hair</p>
        <p class="paragrafo-2">Quando o assunto é auto cuidado, a Salon Time e Marina Motta são suas melhores amigas!
          Cadastre-se e agende seus serviços de beleza a qualquer hora, com praticidade e exclusividade, além de
          promoções temporárias imperdíveis!</p>
      </div>
      <div class="btn-juntos">
        <button class="btn-rosa" onclick="navegar('./index.html')">Saiba Mais</button>
        <button class="btn-branco" onclick="navegar('./servicos.html')">Serviços</button>
      </div>
    </div>
    <div class="home_section_img">
      <img src="/src/assets/img/Group 51.png" alt="imgem de fundo">
    </div>
  </section>

  <!-- COMPONENTE - ESPECIALIDADES -->
  <section class="especialidade_section_pai">
    <p class="especialidade_section_title">ESPECIALISTA EM</p>
    <div class="especialidade_section_container">
      <!-- COMPONENTE - CARD -->
      <div class="especialidade_section_column">
        <div class="especialidade_icone">
          <img src="/src/assets/svg/icon_cores.svg" alt="icone-cores">
        </div>
        <p class="paragrafo-1 bold" style="color: var(--rosa-4)">CORES</p>
        <p class="paragrafo-2" style="color: var(--rosa-4)">Tons vibrantes, naturais ou ousados — encontramos a cor
          perfeita para valorizar sua
          beleza.</p>
      </div>
      <!-- COMPONENTE - CARD -->
      <div class="especialidade_section_column">
        <div class="especialidade_icone">
          <img src="/src/assets/svg/icon_corte.svg" alt="icone-cores">
        </div>
        <p class="paragrafo-1 bold" style="color: var(--rosa-4)">CORTE</p>
        <p class="paragrafo-2" style="color: var(--rosa-4)">Cortes personalizados que respeitam seu estilo, sua rotina e
          a textura natural dos fios.</p>
      </div>
      <!-- COMPONENTE - CARD -->
      <div class="especialidade_section_column">
        <div class="especialidade_icone">
          <img src="/src/assets/svg/icon_mechas.svg" alt="icone-cores">
        </div>
        <p class="paragrafo-1 bold" style="color: var(--rosa-4)">MECHAS</p>
        <p class="paragrafo-2" style="color: var(--rosa-4)">Luzes, balayage ou morena iluminada: mechas com técnica e
          bom gosto para realçar seu brilho.</p>
      </div>
    </div>
  </section>

  <!-- COMPONENTE - PORTIFOLIO -->
  <section class="portifolio_section_pai">
    <p class="paragrafo-2 italic portifolio_section_title">Um pouco do meu trabalho!</p>
    <img src="/src/assets/img/portifolio_teste.png" alt="portifolio">
    <a href="https://www.instagram.com/marinamotahair/" target="_blank">
      <button class="btn-rosa bold" style="height: 50px;">
        <img src="/src/assets/svg/icon_instagram.svg" alt="" style="height: 30px;">
        Veja mais!
      </button>
    </a>
  </section>

  <!-- COMPONENTE - SOBRE MIM -->
  <section class="sobre_section_pai">
    <img src="/src/assets/img/marina_sobre_mim.png" alt="sobre-mim" style="height: 576px;">
    <div class="sobre_section_container">
      <p class="titulo-1" style="font-family: Georgia;">Sobre Mim</p>
      <p class="paragrafo-2" style="max-width: 424px;">
        Texto com uma breve descrição da Marina
        Texto com uma breve descrição da Marina
        Texto com uma breve descrição da Marina
        Texto com uma breve descrição da Marina
      </p>
      <p class="paragrafo-2 italic sobre_section_social">
        <img src="/src/assets/svg/icon_whatsapp 1.svg" alt="icon-zap">
        (11) 96555-8010
      </p>
      <p class="paragrafo-2 italic sobre_section_social">
        <img src="/src/assets/svg/icon_instagram2.svg" alt="icon-insta">
        @marinamotahair
      </p>
      <button class="btn-rosa" onclick="navegar('./servicos.html')">
        <img src="/src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg" alt="">
        Agendar
      </button>
    </div>
  </section>

  <!-- COMPONENTE - LOCAL -->
  <section class="section_local_pai">
    <div class="section_local_title">
      <p class="titulo-1" style="color: var(--rosa-3); font-family: Georgia;">Localização do Salão</p>
      <div class="section_local_ender">
        <p class="paragrafo-2" style="color: var(--rosa-3)">R. Adamantina, 34 - 3 - Baeta Neves</p>
        <p class="paragrafo-2 italic" style="color: var(--rosa-2)">São Bernardo do Campo - SP, 09760-340</p>
      </div>
    </div>
    <div class="section_local_mapa">
      <div class="section_local_mapa_bar">
        <div class="section_local_circulo"></div>
        <div class="section_local_circulo"></div>
        <div class="section_local_circulo"></div>
      </div>
      <div class="section_local_mapa_google" id="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.6253637830596!2d-46.5593502!3d-23.657927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce425d6f37e0cf%3A0x92b7fbb1e0c21678!2sR.%20Adamantina%2C%2034%20-%203%20-%20Baeta%20Neves%2C%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP%2C%2009760-340!5e0!3m2!1spt-BR!2sbr!4v1692279080345!5m2!1spt-BR!2sbr"
          width="100%" height="100%" style="border:0; border-radius: 0px 0px 32px 32px;" allowfullscreen="" l
          oading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </section>

  <!-- COMPONENTE - AVALIACOES -->
  <section class="avaliacao_section_pai" style="padding: 0px !important;">
    <p class="titulo-1">Avaliações:</p>
    <div class="avaliacao_section_carrossel">
      <div class="group">
                    <!-- COMPONENTE - CARD -->
                    <div class="avaliacao_section_card shadow">
                      <div class="avaliacao_section_card_infos">
                        <p class="paragrafo-2">Juliana Silva • 12 jun •</p>
                        <!-- COMPONENTE - ESTRELAS -->
                        <div class="estrelas">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_filled.svg" alt="star-preenchida">
                        </div>
                      </div>
                      <p class="paragrafo-2 italic">Serviço realizado: Corte</p>
                      <p class="paragrafo-2">Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo
                      </p>
                      <img src="/src/assets/img/mock_avaliacao/Team-member.png" alt="imagem-avaliacao" class="img-avaliacao">
                    </div>


                    <!-- COMPONENTE - CARD -->
                    <div class="avaliacao_section_card shadow">
                      <div class="avaliacao_section_card_infos">
                        <p class="paragrafo-2">Daniela Almeida • 03 ago •</p>
                        <!-- COMPONENTE - ESTRELAS -->
                        <div class="estrelas">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                        </div>
                      </div>
                      <p class="paragrafo-2 italic">Serviço realizado: Luzes</p>
                      <p class="paragrafo-2">Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo
                      </p>
                      <img src="/src/assets/img/mock_avaliacao/img-avaliacao-2.png" alt="imagem-avaliacao" class="img-avaliacao">
                    </div>



                    <!-- COMPONENTE - CARD -->
                    <div class="avaliacao_section_card shadow">
                      <div class="avaliacao_section_card_infos">
                        <p class="paragrafo-2">Thais Silva • 12 jun •</p>
                        <!-- COMPONENTE - ESTRELAS -->
                        <div class="estrelas">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_filled.svg" alt="star-preenchida">
                        </div>
                      </div>
                      <p class="paragrafo-2 italic">Serviço realizado: Corte</p>
                      <p class="paragrafo-2">Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo
                      </p>
                      <img src="/src/assets/img/mock_avaliacao/img-avaliacao-4.png" alt="imagem-avaliacao" class="img-avaliacao">
                    </div>
      </div>
      <div arial-hidden class="group">
                    <!-- COMPONENTE - CARD -->
                    <div class="avaliacao_section_card shadow">
                      <div class="avaliacao_section_card_infos">
                        <p class="paragrafo-2">Juliana Silva • 12 jun •</p>
                        <!-- COMPONENTE - ESTRELAS -->
                        <div class="estrelas">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_filled.svg" alt="star-preenchida">
                        </div>
                      </div>
                      <p class="paragrafo-2 italic">Serviço realizado: Corte</p>
                      <p class="paragrafo-2">Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo
                      </p>
                      <img src="/src/assets/img/mock_avaliacao/Team-member.png" alt="imagem-avaliacao" class="img-avaliacao">
                    </div>


                    <!-- COMPONENTE - CARD -->
                    <div class="avaliacao_section_card shadow">
                      <div class="avaliacao_section_card_infos">
                        <p class="paragrafo-2">Daniela Almeida • 03 ago •</p>
                        <!-- COMPONENTE - ESTRELAS -->
                        <div class="estrelas">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                        </div>
                      </div>
                      <p class="paragrafo-2 italic">Serviço realizado: Luzes</p>
                      <p class="paragrafo-2">Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo
                      </p>
                      <img src="/src/assets/img/mock_avaliacao/img-avaliacao-2.png" alt="imagem-avaliacao" class="img-avaliacao">
                    </div>



                    <!-- COMPONENTE - CARD -->
                    <div class="avaliacao_section_card shadow">
                      <div class="avaliacao_section_card_infos">
                        <p class="paragrafo-2">Thais Silva • 12 jun •</p>
                        <!-- COMPONENTE - ESTRELAS -->
                        <div class="estrelas">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_outline.svg" alt="star-preenchida">
                          <img src="/src/assets/svg/icon_star_filled.svg" alt="star-preenchida">
                        </div>
                      </div>
                      <p class="paragrafo-2 italic">Serviço realizado: Corte</p>
                      <p class="paragrafo-2">Experiência incrível! Fui super bem atendida e o resultado ficou sensacional! Recomendo
                      </p>
                      <img src="/src/assets/img/mock_avaliacao/img-avaliacao-4.png" alt="imagem-avaliacao" class="img-avaliacao">
                    </div>

      </div>
    </div>
  </section>

  <!-- COMPONENTE FOOTER -->
  <footer class="footer_pai">
    <div class="footer_linha1">
      <img src="/src/assets/svg/logo_white.svg" alt="logo" style="height: 45px;">
      <div class="footer_linha1_social">
        <img src="/src/assets/svg/icon_facebook.svg" alt="icon-social">
        <img src="/src/assets/svg/icon_instagram3.svg" alt="icon-social">
        <img src="/src/assets/svg/icon_linkedin.svg" alt="icon-social">
      </div>
    </div>
    <div class="footer_linha2"></div>
    <p class="paragrafo-2" style="color: var(--rosa-4);">@Copyright2025 Todos os direitos reservados.</p>
  </footer>
</body>

</html>

*/