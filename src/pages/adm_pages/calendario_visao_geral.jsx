import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuDash from "../../components/MenuDash";
import NavCalendario from "../../components/NavCalendario";
import Calendario from "../../components/Calendario";
import { buscarProximosAgendamentosFuncionario } from "../../js/api/agendamento";

export default function CalendarioVisaoGeral() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.id) {
      buscarProximosAgendamentosFuncionario(usuario.id)
        .then(data => {
          setAgendamentos(data);
        })
        .catch(error => {
          console.error("Erro ao carregar agendamentos:", error);
        });
    }
  }, []); // 👈 useEffect fechado corretamente

  return (
    <>
      {/* NAVBAR LATERAL */}
      <MenuDash>
        {/* MINI NAV */}
        <NavCalendario />
        <div className="dash_section_container">
          <h1 className="supertitulo-1">Próximos atendimentos</h1>
        </div>

        {/* CARDS DE AGENDAMENTO */}
        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento, index) => (
            <div key={index} className="calendario_card_proximo_atendimento card">
              <div className="calendario_info_box_card_proximo_atendimento">
                <p className="titulo-1 semibold">{agendamento.usuario.nome}</p>
                <p className="subtitulo">
                  <span className="semibold">Serviço:</span> {agendamento.servico.nome}
                </p>
                <p className="subtitulo semibold info">
                  <img
                    src="/src/assets/svg/time-sharp.svg"
                    alt="icone tempo"
                    style={{ width: "38px", height: "38px" }}
                  />
                  {agendamento.data} - incio {agendamento.inicio} até {agendamento.fim}
                </p>
              </div>
              <div className="calendario_buttons_box_card_proximo_atendimento">
                <button className="btn-rosa" style={{ height: "60px" }}>Reagendar</button>
                <button className="btn-branco" style={{ height: "60px" }}>Cancelar</button>
              </div>
            </div>
          ))
        ) : (
          <p>Sem agendamentos próximos.</p>
        )}

        {/* CALENDÁRIO */}
        <Calendario />

        {/* BOTÕES FINAIS */}
        <div className="btn-juntos" style={{ flexDirection: "row", width: "100%" }}>
          <button className="btn-rosa" style={{ width: "100%" }}>Criar Agendamento</button>
          <button className="btn-branco" style={{ width: "100%" }}>Criar Compromisso</button>
        </div>
      </MenuDash>
    </>
  );
}



// <!DOCTYPE html>
// <html lang="pt-br">

// <head> <!-- UTILIZAR ESSSA HEAD COMO PADRAO PARA AS OUTRAS TELAS -->
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link rel="stylesheet" href="../../css/main.css" />
//     <script src="../../js/utils/utils_cliente_pages.js"></script>
//     <script src="../../js/api/cliente/cliente.js"></script>
//     <link rel="shortcut icon" href="../../assets/svg/logo_rosa.svg" type="image/x-icon" />
//     <title>Salon Time | Visão Geral</title>
// </head>

// <body>
//     <dev class="dash_section_pai">
//         <!-- COMPONENTE - NAVBAR LATERAL -->
//         <div class="dash_navbar_pai">
//             <div class="dash_navbar_filho">
//                 <img src="../../assets/svg/logo_black.svg" alt="icone" style="max-width: 169px;">
//                 <p class="paragrafo-e bold">Bem vinda Marina!</p>
//                 <div class="dash_navbar_column">
//                     <button class="btn-navbar-ativo" onclick="navegar('./calendario_visao_geral.html')"><img style="max-width: 24px;"
//                             src="../../assets/svg/nav_dash/icon_house_filled.svg" alt="">Calendário</button>
//                     <button class="btn-navbar" onclick="navegar('./servicos_servicos.html')"><img style="max-width: 24px;"
//                             src="../../assets/svg/nav_dash/icon_tesoura_outline.svg" alt="">Serviços</button>
//                     <button class="btn-navbar" onclick="navegar('./usuarios_clientes.html')"><img style="max-width: 24px;"
//                             src="../../assets/svg/nav_dash/icon_user_outline.svg" alt="">Usuários</button>
//                     <button class="btn-navbar" onclick="navegar('./controlem_servicos.html')"><img style="max-width: 24px;"
//                             src="../../assets/svg/nav_dash/icon_doc_outline.svg" alt="">Controle Mensal</button>
//                     <button class="btn-navbar" onclick="navegar('./perfil.html')"><img style="max-width: 24px;" 
//                             src="../../assets/svg/nav_dash/icon_smile_outline.svg" alt="">Perfil</button>
//                 </div>
//                 <button onclick="logout()" class="btn-sair"><img style="max-width: 24px;" src="../../assets/svg/nav_config/icon_exit.svg"
//                 alt="">Sair</button>
//             </div>
//         </div>
        
//         <div class="dash_section_filho">


//             <!-- COMPONENTE - MINI -->
//             <div class="mini_nav_pai">
//                 <p class="paragrafo-2 mini_nav_filho_ativo" onclick="navegar('./calendario_visao_geral.html')">Visão Geral</p>
//                 <p class="paragrafo-2 mini_nav_filho" onclick="navegar('./calendario_atendimentos.html')">Atendimentos Passados</p>
//                 <p class="paragrafo-2 mini_nav_filho" onclick="navegar('./calendario_configuracoes.html')">Configurações</p>
//             </div>

//             <div class="dash_section_container">
//                 <h1 class="supertitulo-1">Próximos atendimentos</h1>
//             </div>

//             <!-- <div class="dash_section_container"> -->
//             <div class="calendario_card_proximo_atendimento card">
//                 <div class="calendario_info_box_card_proximo_atendimento">
//                     <p class="titulo-1 semibold">Nome da Cliente</p>
//                     <p class="subtitulo"><a class="semibold">Serviço:</a> Luzes morena iluminada</p>
//                     <p class="subtitulo semibold info">
//                         <img src="../../assets/svg/time-sharp.svg" style="width: 38px; height: 38px;"> 
//                         dd/mm/yy 00:00
//                     </p>
//                 </div>
//                 <div class="calendario_buttons_box_card_proximo_atendimento">
//                     <button class="btn-rosa" style="height: 60px;">Reagendar</button>
//                     <button class="btn-branco" style="height: 60px;">Cancelar</button>
//                 </div>
//             </div>
//             <!-- </div> -->

//             <div class="div_section_calendar card"></div>

//             <div class="btn-juntos" style="flex-direction: row; width: 100%;">
//                 <button class="btn-rosa" style="width: 100%;">Criar Agendamento</button>
//                 <button class="btn-branco" style="width: 100%;">Criar Compromisso</button>
//             </div>


//         </div>