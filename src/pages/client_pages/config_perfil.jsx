import { useNavigate } from "react-router-dom";
import MenuConfig from "/src/components/MenuConfig.jsx";


export default function Config_perfil() {
  return (
    <>
      <MenuConfig>
        <div className="config_section_container">
          <p className="titulo-1">Dados pessoais:</p>
          {/* COMPONENTE DE INPUTS */}
          <div className="input_pai">
            <p className="paragrafo-2">Nome Completo</p>
            <input type="text" className="input" placeholder="Digite seu nome" />
          </div>
          <div className="input_pai">
            <p className="paragrafo-2">Endereço de e-mail</p>
            <input type="text" className="input" placeholder="Digite seu e-mail" />
          </div>
          <div className="input_pai">
            <p className="paragrafo-2">Número de telefone</p>
            <input type="text" className="input" placeholder="Digite seu número de telefone" />
          </div>
          <div className="input_pai">
            <p className="paragrafo-2">CPF</p>
            <input type="text" className="input" placeholder="Digite seu CPF" />
          </div>
          <div className="input_pai">
            <p className="paragrafo-2">Data de nascimento</p>
            <input type="text" className="input" placeholder="Digite sua data de nascimento" />
          </div>
          <button className="btn-rosa" style={{ width: "100%" }}>
            Atualizar
          </button>
        </div>
        <div className="config_section_divisor"></div>
        <div className="config_section_container">
          <p className="titulo-1">Alterar senha:</p>
          <div className="input_pai">
            <p className="paragrafo-2">Senha atual</p>
            <input type="text" className="input" placeholder="Digite aqui" />
          </div>
          <div className="input_pai">
            <p className="paragrafo-2">Nova senha</p>
            <input type="text" className="input" placeholder="Digite aqui" />
          </div>
          <div className="input_pai">
            <p className="paragrafo-2">Confirmar nova senha</p>
            <input type="text" className="input" placeholder="Digite aqui" />
          </div>
          <button className="btn-rosa" style={{ width: "100%" }}>
            Atualizar
          </button>
        </div>
      </MenuConfig>
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
//         <!-- COMPONENTE - NAVBAR LATERAL -->
//         <div class="config_navbar_pai">
//             <div class="config_navbar_filho">
//                 <div class="config_navbar_column">
//                     <button class="btn-navbar-ativo" onclick="navegar('./config_perfil.html')">
//                             <img style="max-width: 24px;" src="../../assets/svg/nav_config/icon_home.svg"
//                             alt="">Perfil</button>
//                     <button class="btn-navbar" onclick="navegar('./config_historico.html')">
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
//                 <p class="titulo-1">Dados pessoais:</p>
//                 <!-- COMPONENTE DE INPUTS -->
//                 <div class="input_pai">
//                     <p class="paragrafo-2">Nome Completo</p>
//                     <input type="text" class="input" placeholder="Digite seu nome" />
//                 </div>
//                 <!-- COMPONENTE DE INPUTS -->
//                 <div class="input_pai">
//                     <p class="paragrafo-2">Endereço de e-mail</p>
//                     <input type="text" class="input" placeholder="Digite seu e-mail" />
//                 </div>
//                 <!-- COMPONENTE DE INPUTS -->
//                 <div class="input_pai">
//                     <p class="paragrafo-2">Número de telefone</p>
//                     <input type="text" class="input" placeholder="Digite seu número de telefone" />
//                 </div>
//                 <!-- COMPONENTE DE INPUTS -->
//                 <div class="input_pai">
//                     <p class="paragrafo-2">CPF</p>
//                     <input type="text" class="input" placeholder="Digite seu CPF" />
//                 </div>
//                 <!-- COMPONENTE DE INPUTS -->
//                 <div class="input_pai">
//                     <p class="paragrafo-2">Data de nascimento</p>
//                     <input type="text" class="input" placeholder="Digite sua data de nascimento" />
//                 </div>

//                 <button class="btn-rosa" style="width: 100%;">Atualizar</button>
//             </div>
//             <div class="config_section_divisor"></div>
//             <div class="config_section_container">
//                 <p class="titulo-1">Alterar senha:</p>
//                 <!-- COMPONENTE DE INPUTS -->
//                 <div class="input_pai">
//                     <p class="paragrafo-2">Senha atual</p>
//                     <input type="text" class="input" placeholder="Digite aqui" />
//                 </div>
//                 <!-- COMPONENTE DE INPUTS -->
//                 <div class="input_pai">
//                     <p class="paragrafo-2">Nova senha</p>
//                     <input type="text" class="input" placeholder="Digite aqui" />
//                 </div>
//                 <!-- COMPONENTE DE INPUTS -->
//                 <div class="input_pai">
//                     <p class="paragrafo-2">Confirmar nova senha</p>
//                     <input type="text" class="input" placeholder="Digite aqui" />
//                 </div>
//                 <button class="btn-rosa" style="width: 100%;">Atualizar</button>

//             </div>
//         </div>
//     </dev>
//     <!-- COMPONENTE FOOTER -->
//   <footer class="footer_pai">
//       <div class="footer_linha1">
//         <img src="../../assets/svg/logo_white.svg" alt="logo" style="height: 45px;">
//         <div class="footer_linha1_social">
//           <img src="../../assets/svg/icon_facebook.svg" alt="icon-social">
//           <img src="../../assets/svg/icon_instagram3.svg" alt="icon-social">
//           <img src="../../assets/svg/icon_linkedin.svg" alt="icon-social">
//         </div>
//       </div>
//       <div class="footer_linha2"></div>
//       <p class="paragrafo-2" style="color: var(--rosa-4);">@Copyright2025 Todos os direitos reservados.</p>
//   </footer>

// </body>
// ### ###
// </html>