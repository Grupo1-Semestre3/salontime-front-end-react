

import { useNavigate } from "react-router-dom";

export default function Usuarios_funcionarios() {
  return <div>Usuarios funcionarios</div>;
}


// <!DOCTYPE html>
// <html lang="pt-br">

// <head> <!-- UTILIZAR ESSSA HEAD COMO PADRAO PARA AS OUTRAS TELAS -->
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link rel="stylesheet" href="../../css/main.css" />
//         <script src="../../js/utils/utils_cliente_pages.js"></script>
//         <script src="../../js/api/cliente/cliente.js"></script>
//         <link rel="shortcut icon" href="../../assets/svg/logo_rosa.svg" type="image/x-icon" />
//         <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

//         <title>Salon Time | Gerenciar Clientes</title>
// </head>

// <body class="pagina_usuarios_funcionarios">
//         <div class="dash_section_pai">
//                 <!-- COMPONENTE - NAVBAR LATERAL -->
//                 <div class="dash_navbar_pai">
//                         <div class="dash_navbar_filho">
//                                 <img src="../../assets/svg/logo_black.svg" alt="icone" style="max-width: 169px;">
//                                 <p class="paragrafo-e bold">Bem vinda Marina!</p>
//                                 <div class="dash_navbar_column">
//                                         <button class="btn-navbar"
//                                                 onclick="navegar('./calendario_visao_geral.html')"><img
//                                                         style="max-width: 24px;"
//                                                         src="../../assets/svg/nav_dash/icon_house_outline.svg"
//                                                         alt="">Calendário</button>
//                                         <button class="btn-navbar" onclick="navegar('./servicos_servicos.html')"><img
//                                                         style="max-width: 24px;"
//                                                         src="../../assets/svg/nav_dash/icon_tesoura_outline.svg"
//                                                         alt="">Serviços</button>
//                                         <button class="btn-navbar-ativo"
//                                                 onclick="navegar('./usuarios_clientes.html')"><img
//                                                         style="max-width: 24px;"
//                                                         src="../../assets/svg/nav_dash/Icon_user_filled.svg"
//                                                         alt="">Usuários</button>
//                                         <button class="btn-navbar" onclick="navegar('./controlem_servicos.html')"><img
//                                                         style="max-width: 24px;"
//                                                         src="../../assets/svg/nav_dash/icon_doc_outline.svg"
//                                                         alt="">Controle Mensal</button>
//                                         <button class="btn-navbar" onclick="navegar('./perfil.html')"><img
//                                                         style="max-width: 24px;"
//                                                         src="../../assets/svg/nav_dash/icon_smile_outline.svg"
//                                                         alt="">Perfil</button>
//                                 </div>
//                                 <button onclick="logout()" class="btn-sair"><img style="max-width: 24px;"
//                                                 src="../../assets/svg/nav_config/icon_exit.svg" alt="">Sair</button>
//                         </div>
//                 </div>
//                 <div class="dash_section_filho">

//                         <!-- COMPONENTE - MINI -->
//                         <div class="mini_nav_pai">
//                                 <p class="paragrafo-2 mini_nav_filho"
//                                         onclick="navegar('./usuarios_clientes.html')">Clientes</p>
//                                 <p class="paragrafo-2 mini_nav_filho_ativo"
//                                         onclick="navegar('./usuarios_funcionarios.html')">Funcionários</p>
//                         </div>

//                         <div class="dash_section_container usuarios_funcionario_titulo_box">
//                                 <h1 class="titulo-1">Gerenciar Funcionários</h1>
//                                 <button class="btn-rosa"><img
//                                                 src="../../assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg"
//                                                 alt="">Cadastrar Funcionário</button>
//                         </div>

//                         <div class="dash_section_container">
//                                 <div class="card usuarios_card">
//                                         <img 
//                                         lass="card-foto-funcionario" 
//                                         src="../../assets/img/foto_perfil.png"
//                                         alt="Foto do Cliente"
//                                         style="width: 90px; height: 90px;"
//                                         >
//                                         <div class="card-info">
//                                                 <p class="paragrafo-1 semibold">Nome do Funcionário</p>
//                                                 <div class="info-item">
//                                                         <img src="../../assets/svg/icon_mail.svg" alt="Ícone Email"
//                                                                 class="icon-small">
//                                                         email@email.com
//                                                 </div>

//                                                 <div class="info-item">
//                                                         <img src="../../assets/svg/icon_phone.svg" alt="Ícone Telefone"
//                                                                 class="icon-small">
//                                                         123123-12312
//                                                 </div>
//                                         </div>
//                                         <div class="card-buttons">
//                                                 <button class="btn-rosa">Editar</button>
//                                                 <button class="btn-branco">Detalhes</button>
//                                         </div>
//                                 </div>
//                         </div>
//                 </div>