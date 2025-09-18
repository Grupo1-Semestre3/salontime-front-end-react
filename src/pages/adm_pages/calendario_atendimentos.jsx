import { useNavigate } from "react-router-dom";
import MenuDash from "/src/components/MenuDash.jsx";
import NavCalendario from "/src/components/NavCalendario.jsx";

export default function Calendario_atendimentos() {
  return(
<>
<MenuDash>
<NavCalendario/>

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
//                 <p class="paragrafo-2 mini_nav_filho" onclick="navegar('./calendario_visao_geral.html')">Visão Geral</p>
//                 <p class="paragrafo-2 mini_nav_filho_ativo" onclick="navegar('./calendario_atendimentos.html')">Atendimentos Passados</p>
//                 <p class="paragrafo-2 mini_nav_filho" onclick="navegar('./calendario_configuracoes.html')">Configurações</p>
//             </div>

//             <div class="dash_section_container">
//                 <h1 class="supertitulo-1">Atendimentos Passados:</h1>
//             </div>

//             <div class="dash_section_container">
//                 <div class="atendimento_passados_card_box card">
//                     <div class="info_box_atendimento_passados_card_box">
//                         <p class="paragrafo-1 semibold info">
//                             <img src="../../assets/svg/perfil_foto.svg" style="height: 45px;">
//                             <a>Nome da Cliente</a>
//                         </p>
//                         <p class="paragrafo-1 semibold">Serviço: Luzes morena iluminada</p>
//                         <p class="paragrafo-2 info"><img src="../../assets/svg/time-sharp.svg" style="height: 24px;">dd/mm/yy 00:00</p>
                        
//                         <div class="atendimentos_passados_infos">
//                             <p class="paragrafo-2"><a class="semibold">Status:</a> <i>Pagamento em Aberto</i></p>
//                             <p class="paragrafo-2"><a class="semibold">Valor:</a> <i>R$000,00</i></p>
//                         </div>
//                     </div>
//                     <div class="buttons_box_atendimento_passados_card_box">
//                         <button class="btn-rosa">Concluir</button>
//                         <button class="btn-branco">Detalhes</button>
//                     </div>
//                 </div>
//             </div>            
//         </div>