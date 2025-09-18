import { useNavigate } from "react-router-dom";
import MenuDash from "../../components/MenuDash"
import NavCalendario from "../../components/NavCalendario"

export default function Calendario_configuracoes() {
  const navigate = useNavigate();

  return (
    <>

      {/* NAVBAR LATERAL */}
      <MenuDash>
        <NavCalendario />

        {/* HORÁRIOS PADRÃO */}
        <div className="dash_section_container">
          <h1 className="supertitulo-1">Horários Padrão:</h1>
        </div>

        {/* Exemplo de dia da semana (pode repetir para os outros dias) */}
        <div className="dash_section_container">
          <div className="configuracao_line_box">
            <div className="configuracao_box_info">
              <div>
                <p className="paragrafo-1 calendario_config_semana semibold">
                  Segunda-feira
                </p>
              </div>

              <div className="configuracao_ajuste_gap_box">
                <div>
                  <button className="configuracao_button_verde">Aberto</button>
                </div>

                <div className="configuracao_capacidade_box">
                  <img src="/src/assets/svg/capacidade_icon.svg" alt="" />
                  <p>Capacidade: 0</p>
                </div>

                <div className="configuracao_horarios_box">
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                  <div className="configuracao_seta_cinza_box">
                    <img
                      src="/src/assets/svg/seta_para_direita_icon.svg"
                      alt=""
                    />
                  </div>
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                </div>

                <div>
                  <a href="#">Editar</a>
                </div>
              </div>
            </div>
          </div>
          <div className="configuracao_line_box">
            <div className="configuracao_box_info">
              <div>
                <p className="paragrafo-1 calendario_config_semana semibold">
                  Segunda-feira
                </p>
              </div>

              <div className="configuracao_ajuste_gap_box">
                <div>
                  <button className="configuracao_button_verde">Aberto</button>
                </div>

                <div className="configuracao_capacidade_box">
                  <img src="/src/assets/svg/capacidade_icon.svg" alt="" />
                  <p>Capacidade: 0</p>
                </div>

                <div className="configuracao_horarios_box">
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                  <div className="configuracao_seta_cinza_box">
                    <img
                      src="/src/assets/svg/seta_para_direita_icon.svg"
                      alt=""
                    />
                  </div>
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                </div>

                <div>
                  <a href="#">Editar</a>
                </div>
              </div>
            </div>
          </div>
          <div className="configuracao_line_box">
            <div className="configuracao_box_info">
              <div>
                <p className="paragrafo-1 calendario_config_semana semibold">
                  Segunda-feira
                </p>
              </div>

              <div className="configuracao_ajuste_gap_box">
                <div>
                  <button className="configuracao_button_verde">Aberto</button>
                </div>

                <div className="configuracao_capacidade_box">
                  <img src="/src/assets/svg/capacidade_icon.svg" alt="" />
                  <p>Capacidade: 0</p>
                </div>

                <div className="configuracao_horarios_box">
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                  <div className="configuracao_seta_cinza_box">
                    <img
                      src="/src/assets/svg/seta_para_direita_icon.svg"
                      alt=""
                    />
                  </div>
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                </div>

                <div>
                  <a href="#">Editar</a>
                </div>
              </div>
            </div>
          </div>
          <div className="configuracao_line_box">
            <div className="configuracao_box_info">
              <div>
                <p className="paragrafo-1 calendario_config_semana semibold">
                  Segunda-feira
                </p>
              </div>

              <div className="configuracao_ajuste_gap_box">
                <div>
                  <button className="configuracao_button_verde">Aberto</button>
                </div>

                <div className="configuracao_capacidade_box">
                  <img src="/src/assets/svg/capacidade_icon.svg" alt="" />
                  <p>Capacidade: 0</p>
                </div>

                <div className="configuracao_horarios_box">
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                  <div className="configuracao_seta_cinza_box">
                    <img
                      src="/src/assets/svg/seta_para_direita_icon.svg"
                      alt=""
                    />
                  </div>
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                </div>

                <div>
                  <a href="#">Editar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HORÁRIOS DE EXCEÇÃO */}
        <div className="dash_section_container horario_excecao_titulo_box">
          <h1>Horários de Exceção:</h1>
          <button className="btn-rosa">
            <img
              src="/src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg"
              alt=""
            />
            Criar Exceção
          </button>
        </div>

        <div className="dash_section_container">
          <div className="configuracao_line_execao_box">
            <div className="configuracao_box_info">
              <div className="configuracao_ajuste_gap_box">
                <div>
                  <button className="configuracao_button_vermelho">
                    Fechado
                  </button>
                </div>
                <div className="configuracao_capacidade_box">
                  <img src="/src/assets/svg/capacidade_icon.svg" alt="" />
                  <p>Capacidade: 0</p>
                </div>

                <div className="configuracao_horarios_box">
                  <div className="configuracao_horario_mini_box">
                    <p>dd/mm/yy</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                  <div className="configuracao_seta_cinza_box">
                    <img
                      src="/src/assets/svg/seta_para_direita_icon.svg"
                      alt=""
                    />
                  </div>
                  <div className="configuracao_horario_mini_box">
                    <p>dd/mm/yy</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                </div>

                <div className="configuracao_horarios_box">
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                  <div className="configuracao_seta_cinza_box">
                    <img
                      src="/src/assets/svg/seta_para_direita_icon.svg"
                      alt=""
                    />
                  </div>
                  <div className="configuracao_horario_mini_box">
                    <p>00:00</p>
                    <img src="/src/assets/svg/log-in.svg" alt="" />
                  </div>
                </div>

                <div>
                  <a href="#">Editar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </MenuDash >
    </>
  );
}


// <!DOCTYPE html>
// <html lang="pt-br">

// <head> <!-- UTILIZAR ESSSA HEAD COMO PADRAO PARA AS OUTRAS TELAS -->
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link rel="stylesheet" href="/src/css/main.css" />
//     <script src="/src/js/utils/utils_cliente_pages.js"></script>
//     <script src="/src/js/api/cliente/cliente.js"></script>
//     <link rel="shortcut icon" href="/src/assets/svg/logo_rosa.svg" type="image/x-icon" />
//     <title>Salon Time | Visão Geral</title>
// </head>

// <body>
//     <dev class="dash_section_pai">
//         <!-- COMPONENTE - NAVBAR LATERAL -->
//         <div class="dash_navbar_pai">
//             <div class="dash_navbar_filho">
//                 <img src="/src/assets/svg/logo_black.svg" alt="icone" style="max-width: 169px;">
//                 <p class="paragrafo-e bold">Bem vinda Marina!</p>
//                 <div class="dash_navbar_column">
//                     <button class="btn-navbar-ativo" onclick="navegar('./calendario_visao_geral.html')"><img style="max-width: 24px;"
//                             src="/src/assets/svg/nav_dash/icon_house_filled.svg" alt="">Calendário</button>
//                     <button class="btn-navbar" onclick="navegar('./servicos_servicos.html')"><img style="max-width: 24px;"
//                             src="/src/assets/svg/nav_dash/icon_tesoura_outline.svg" alt="">Serviços</button>
//                     <button class="btn-navbar" onclick="navegar('./usuarios_clientes.html')"><img style="max-width: 24px;"
//                             src="/src/assets/svg/nav_dash/icon_user_outline.svg" alt="">Usuários</button>
//                     <button class="btn-navbar" onclick="navegar('./controlem_servicos.html')"><img style="max-width: 24px;"
//                             src="/src/assets/svg/nav_dash/icon_doc_outline.svg" alt="">Controle Mensal</button>
//                     <button class="btn-navbar" onclick="navegar('./perfil.html')"><img style="max-width: 24px;"
//                             src="/src/assets/svg/nav_dash/icon_smile_outline.svg" alt="">Perfil</button>
//                 </div>
//                 <button onclick="logout()" class="btn-sair"><img style="max-width: 24px;" src="/src/assets/svg/nav_config/icon_exit.svg"
//                 alt="">Sair</button>
//             </div>
//         </div>
//         <div class="dash_section_filho">

//             <!-- COMPONENTE - MINI -->
//             <div class="mini_nav_pai">
//                 <p class="paragrafo-2 mini_nav_filho" onclick="navegar('./calendario_visao_geral.html')">Visão Geral</p>
//                 <p class="paragrafo-2 mini_nav_filho" onclick="navegar('./calendario_atendimentos.html')">Atendimentos Passados</p>
//                 <p class="paragrafo-2 mini_nav_filho_ativo" onclick="navegar('./calendario_configuracoes.html')">Configurações</p>
//             </div>

//             <div class="dash_section_container">
//                 <h1 class="supertitulo-1">Horários Padrão:</h1>
//             </div>

//             <div class="dash_section_container">
//                 <div class="configuracao_line_box">
//                     <div class="configuracao_box_info">
//                         <div>
//                             <p class="paragrafo-1 calendario_config_semana semibold">Segunda-feira</p>
//                         </div>

//                         <div class="configuracao_ajuste_gap_box">

//                             <div>
//                                 <button class="configuracao_button_verde">Aberto</button>
//                             </div>
//                             <div class="configuracao_capacidade_box">
//                                 <img src="/src/assets/svg/capacidade_icon.svg" alt="">
//                                 <p>Capacidade: 0</p>
//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div>
//                                 <a href="#">Editar</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//                 <div class="configuracao_line_box">
//                     <div class="configuracao_box_info">
//                         <div>
//                             <p class="paragrafo-1 calendario_config_semana semibold">Terça-feira</p>
//                         </div>

//                         <div class="configuracao_ajuste_gap_box">


//                             <div>
//                                 <button class="configuracao_button_verde">Aberto</button>
//                             </div>
//                             <div class="configuracao_capacidade_box">
//                                 <img src="/src/assets/svg/capacidade_icon.svg" alt="">
//                                 <p>Capacidade: 0</p>
//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div>
//                                 <a href="#">Editar</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="configuracao_line_box">
//                     <div class="configuracao_box_info">
//                         <div>
//                             <p class="paragrafo-1 calendario_config_semana semibold">Quarta-feira</p>
//                         </div>

//                         <div class="configuracao_ajuste_gap_box">


//                             <div>
//                                 <button class="configuracao_button_verde">Aberto</button>
//                             </div>
//                             <div class="configuracao_capacidade_box">
//                                 <img src="/src/assets/svg/capacidade_icon.svg" alt="">
//                                 <p>Capacidade: 0</p>
//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div>
//                                 <a href="#">Editar</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="configuracao_line_box">
//                     <div class="configuracao_box_info">
//                         <div>
//                             <p class="paragrafo-1 calendario_config_semana semibold">Quinta-feira</p>
//                         </div>

//                         <div class="configuracao_ajuste_gap_box">


//                             <div>
//                                 <button class="configuracao_button_verde">Aberto</button>
//                             </div>
//                             <div class="configuracao_capacidade_box">
//                                 <img src="/src/assets/svg/capacidade_icon.svg" alt="">
//                                 <p>Capacidade: 0</p>
//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div>
//                                 <a href="#">Editar</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="configuracao_line_box">
//                     <div class="configuracao_box_info">
//                         <div>
//                             <p class="paragrafo-1 calendario_config_semana semibold">Sexta-feira</p>
//                         </div>

//                         <div class="configuracao_ajuste_gap_box">


//                             <div>
//                                 <button class="configuracao_button_verde">Aberto</button>
//                             </div>
//                             <div class="configuracao_capacidade_box">
//                                 <img src="/src/assets/svg/capacidade_icon.svg" alt="">
//                                 <p>Capacidade: 0</p>
//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div>
//                                 <a href="#">Editar</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="configuracao_line_box">
//                     <div class="configuracao_box_info">
//                         <div>
//                             <p class="paragrafo-1 calendario_config_semana semibold">Sábado</p>
//                         </div>

//                         <div class="configuracao_ajuste_gap_box">


//                             <div>
//                                 <button class="configuracao_button_verde">Aberto</button>
//                             </div>
//                             <div class="configuracao_capacidade_box">
//                                 <img src="/src/assets/svg/capacidade_icon.svg" alt="">
//                                 <p>Capacidade: 0</p>
//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div>
//                                 <a href="#">Editar</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="configuracao_line_box">
//                     <div class="configuracao_box_info">
//                         <div>
//                             <p class="paragrafo-1 calendario_config_semana semibold">Domingo</p>
//                         </div>

//                         <div class="configuracao_ajuste_gap_box">


//                             <div>
//                                 <button class="configuracao_button_verde">Aberto</button>
//                             </div>
//                             <div class="configuracao_capacidade_box">
//                                 <img src="/src/assets/svg/capacidade_icon.svg" alt="">
//                                 <p>Capacidade: 0</p>
//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div>
//                                 <a href="#">Editar</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>



//             </div>


//             <div class="dash_section_container horario_excecao_titulo_box">
//                 <h1>Horários de Exceção:</h1>
//                 <button class="btn-rosa"><img src="/src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg"
//                         alt="">Criar Exceção</button>
//             </div>


//             <div class="dash_section_container">
//                 <div class="configuracao_line_execao_box">
//                     <div class="configuracao_box_info">

//                         <div class="configuracao_ajuste_gap_box">
//                             <div>
//                                 <button class="configuracao_button_vermelho">Fechado</button>
//                             </div>
//                             <div class="configuracao_capacidade_box">
//                                 <img src="/src/assets/svg/capacidade_icon.svg" alt="">
//                                 <p>Capacidade: 0</p>
//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>dd/mm/yy</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>dd/mm/yy</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div class="configuracao_horarios_box">

//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_seta_cinza_box">
//                                     <img src="/src/assets/svg/seta_para_direita_icon.svg" alt="">
//                                 </div>
//                                 <div class="configuracao_horario_mini_box">

//                                     <p>00:00</p>
//                                     <img src="/src/assets/svg/log-in.svg" alt="">
//                                 </div>

//                             </div>
//                             <div>
//                                 <a href="#">Editar</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>


//         </div>