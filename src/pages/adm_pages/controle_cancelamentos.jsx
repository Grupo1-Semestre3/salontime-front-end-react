import { useNavigate } from "react-router-dom";
import MenuDash from "../../components/MenuDash";

export default function Controle_cancelamentos() {
  return (
    <>
    <MenuDash/>
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
//     <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

//     <title>Salon Time | Controle Mensal</title>
// </head>

// <body>
//     <div class="dash_section_pai">
//         <!-- COMPONENTE - NAVBAR LATERAL -->
//         <div class="dash_navbar_pai">
//             <div class="dash_navbar_filho">
//                 <img src="../../assets/svg/logo_black.svg" alt="icone" style="max-width: 169px;">
//                 <p class="paragrafo-e bold">Bem vinda Marina!</p>
//                 <div class="dash_navbar_column">
//                     <button class="btn-navbar" onclick="navegar('./calendario_visao_geral.html')"><img
//                             style="max-width: 24px;" src="../../assets/svg/nav_dash/icon_house_outline.svg"
//                             alt="">Calendário</button>
//                     <button class="btn-navbar" onclick="navegar('./servicos_servicos.html')"><img
//                             style="max-width: 24px;" src="../../assets/svg/nav_dash/icon_tesoura_outline.svg"
//                             alt="">Serviços</button>
//                     <button class="btn-navbar" onclick="navegar('./usuarios_clientes.html')"><img
//                             style="max-width: 24px;" src="../../assets/svg/nav_dash/icon_user_outline.svg"
//                             alt="">Usuários</button>
//                     <button class="btn-navbar-ativo" onclick="navegar('./controlem_servicos.html')"><img
//                             style="max-width: 24px;" src="../../assets/svg/nav_dash/icon_doc_filled.svg" alt="">Controle
//                         Mensal</button>
//                     <button class="btn-navbar" onclick="navegar('./perfil.html')"><img style="max-width: 24px;"
//                             src="../../assets/svg/nav_dash/icon_smile_outline.svg" alt="">Perfil</button>
//                 </div>
//                 <button onclick="logout()" class="btn-sair"><img style="max-width: 24px;"
//                         src="../../assets/svg/nav_config/icon_exit.svg" alt="">Sair</button>
//             </div>
//         </div>
//         <div class="dash_section_filho">

//             <div class="section_controle_servico_title">
//                 <p class="titulo-1">Mês Selecionado</p>
//                 <!-- COMPONENTE - SELECT MÊS -->
//                 <select class="paragrafo-1 select semibold" name="mes" id="mes_select">
//                     <option value="fev">Fevereiro</option>
//                 </select>
//             </div>

//             <!-- COMPONENTE - MINI -->
//             <div class="mini_nav_pai">
//                 <p class="paragrafo-2 mini_nav_filho" onclick="navegar('./controlem_servicos.html')">Serviços</p>
//                 <p class="paragrafo-2 mini_nav_filho_ativo" onclick="navegar('./controlem_cancelamentos.html')">
//                     Cancelamentos</p>
//                 <p class="paragrafo-2 mini_nav_filho" onclick="navegar('./controlem_avaliacoes.html')">Avaliações</p>
//             </div>

//             <div class="dash_lista_itens">

//                 <!-- COMPONENTE - CARD CANCELAMENTO -->
//                 <div class="section_controle_cancelamento_card card">
//                     <div class="section_controle_cancelamento_card_line" style="align-items: center;">
//                         <img src="../../assets/img/foto_perfil.png" alt="icon_perfil">
//                         <p class="paragrafo-1 semibold">Nome da Cliente</p>
//                     </div>
//                     <div class="section_controle_cancelamento_card_line" style="gap: 24px;">
//                         <p class="paragrafo-2"><a class="semibold">Serviço:</a> xxxx</p>
//                         <p class="paragrafo-2 italic"><a class="semibold">Data:</a> dd/mm/yy 00:00pm</p>
//                     </div>
//                     <div class="section_controle_cancelamento_card_line" style="flex-direction: column; gap: 0px;">
//                         <p class="paragrafo-2 semibold">Descrição:</p>
//                         <p class="paragrafo-2">
//                             Descrição do motivo
//                             Descrição do motivo
//                             Descrição do motivo
//                             Descrição do motivo
//                             Descrição do motivo
//                             Descrição do motivo
//                             Descrição do motivo
//                             Descrição do motivo

//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </body>

// </html>