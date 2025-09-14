import { useNavigate } from "react-router-dom";

export default function config_historico() {
  return <div>Config historico</div>;
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
//     <title>Salon Time | Perfil</title>
// </head>

// <body>

//     <!-- NAVBAR INSTITUCIONAL -->
//     <nav class="nav_institucional_pai">
//         <div class="nav_institucional_coluna">
//             <p class="paragrafo-2 underline-hover" onclick="navegar('./index.html')">Página Inicial</p>
//             <p class="paragrafo-2 underline-hover" onclick="navegar('./servicos.html')">Serviços</p>
//         </div>
//         <div class="nav_institucional_coluna">
//             <img src="../../assets/svg/logo_black.svg" alt="logo" style="height: 50px;">
//         </div>
//         <div class="nav_institucional_coluna">
//             <button class="btn-rosa" onclick="navegar('./servicos.html')" style="min-width: 110px;">Voltar</button>
//         </div>
//     </nav>

//     <dev class="config_section_pai">
//        <!-- COMPONENTE - NAVBAR LATERAL -->
//         <div class="config_navbar_pai">
//             <div class="config_navbar_filho">
//                 <div class="config_navbar_column">
//                     <button class="btn-navbar" onclick="navegar('./config_perfil.html')">
//                             <img style="max-width: 24px;" src="../../assets/svg/nav_config/icon_home.svg"
//                             alt="">Perfil</button>
//                     <button class="btn-navbar-ativo" onclick="navegar('./config_historico.html')">
//                             <img style="max-width: 24px;" src="../../assets/svg/nav_config/icon_folders.svg"
//                             alt="">Meu Histórico</button>
//                     <button class="btn-navbar" onclick="navegar('./config_cupons.html')">
//                             <img style="max-width: 24px;" src="../../assets/svg/nav_config/icon_cupom.svg"
//                             alt="">CUPONS</button>
//                 </div>
//                 <button onclick="logout()" class="btn-sair"><img style="max-width: 24px;" src="../../assets/svg/nav_config/icon_exit.svg"
//                         alt="">Sair</button>
//             </div>
//         </div>

//         <div class="config_section_filho">
//             <div class="config_section_container">
//                 <p class="titulo-1">Atendimentos passados:</p>
//                 <!-- COMPONENTE DE INPUTS -->

//                 <div class="card_historico">
//                     <div class="esquerda">
//                         <div class="campos">
//                             <p>Serviço: </p>
//                             <p> Xxxx</p>
//                         </div>
//                         <div class="campos">
//                             <p class="data"><img style="max-width: 24px;" src="../../assets/svg/time-sharp.svg"
//                                     alt="">dd/mm/yy </p>
//                             <p> 00:00 pm</p>
//                         </div>
//                         <div class="campos">
//                             <div class="campos">
//                                 <p>Status: </p>
//                                 <p> Pagamentos em Aberto</p>
//                             </div>
//                             <div class="campos">
//                                 <p>Valor: </p>
//                                 <p> R$000</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="direita">
//                         <button class="btn-rosa">Avaliar</button>
//                         <button class="btn-branco">Detalhes</button>
//                     </div>
//                 </div>
//                 <div class="card_historico">
//                     <div class="esquerda">
//                         <div class="campos">
//                             <p>Serviço: </p>
//                             <p> Xxxx</p>
//                         </div>
//                         <div class="campos">
//                             <p class="data"><img style="max-width: 24px;" src="../../assets/svg/time-sharp.svg"
//                                     alt="">dd/mm/yy </p>
//                             <p> 00:00 pm</p>
//                         </div>
//                         <div class="campos">
//                             <div class="campos">
//                                 <p>Status: </p>
//                                 <p> Pagamentos em Aberto</p>
//                             </div>
//                             <div class="campos">
//                                 <p>Valor: </p>
//                                 <p> R$000</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="direita">
//                         <button class="btn-rosa">Avaliar</button>
//                         <button class="btn-branco">Detalhes</button>
//                     </div>
//                 </div>
//                 <div class="card_historico">
//                     <div class="esquerda">
//                         <div class="campos">
//                             <p>Serviço: </p>
//                             <p> Xxxx</p>
//                         </div>
//                         <div class="campos">
//                             <p class="data"><img style="max-width: 24px;" src="../../assets/svg/time-sharp.svg"
//                                     alt="">dd/mm/yy </p>
//                             <p> 00:00 pm</p>
//                         </div>
//                         <div class="campos">
//                             <div class="campos">
//                                 <p>Status: </p>
//                                 <p> Pagamentos em Aberto</p>
//                             </div>
//                             <div class="campos">
//                                 <p>Valor: </p>
//                                 <p> R$000</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="direita">
//                         <button class="btn-rosa">Avaliar</button>
//                         <button class="btn-branco">Detalhes</button>
//                     </div>
//                 </div>
//                 <div class="card_historico">
//                     <div class="esquerda">
//                         <div class="campos">
//                             <p>Serviço: </p>
//                             <p> Xxxx</p>
//                         </div>
//                         <div class="campos">
//                             <p class="data"><img style="max-width: 24px;" src="../../assets/svg/time-sharp.svg"
//                                     alt="">dd/mm/yy </p>
//                             <p> 00:00 pm</p>
//                         </div>
//                         <div class="campos">
//                             <div class="campos">
//                                 <p>Status: </p>
//                                 <p> Pagamentos em Aberto</p>
//                             </div>
//                             <div class="campos">
//                                 <p>Valor: </p>
//                                 <p> R$000</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="direita">
//                         <button class="btn-rosa">Avaliar</button>
//                         <button class="btn-branco">Detalhes</button>
//                     </div>
//                 </div>
//             </div>
//             <div class="config_section_divisor"></div>
//         </div>
//     </dev>
//     <!-- COMPONENTE FOOTER -->
//     <footer class="footer_pai">
//         <div class="footer_linha1">
//             <img src="../../assets/svg/logo_white.svg" alt="logo" style="height: 45px;">
//             <div class="footer_linha1_social">
//                 <img src="../../assets/svg/icon_facebook.svg" alt="icon-social">
//                 <img src="../../assets/svg/icon_instagram3.svg" alt="icon-social">
//                 <img src="../../assets/svg/icon_linkedin.svg" alt="icon-social">
//             </div>
//         </div>
//         <div class="footer_linha2"></div>
//         <p class="paragrafo-2" style="color: var(--rosa-4);">@Copyright2025 Todos os direitos reservados.</p>
//     </footer>

// </body>

// </html>