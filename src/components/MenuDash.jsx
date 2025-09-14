import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../js/api/cliente/cliente";

export default function MenuDash() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // lógica de logout aqui
    console.log("Logout");
  };

  return (
    <div className="dash_navbar_pai">
      <div className="dash_navbar_filho">
        <img
          src="/src/assets/svg/logo_black.svg"
          alt="icone"
          style={{ maxWidth: "169px" }}
        />
        <p className="paragrafo-e bold">Bem vinda Marina!</p>
        <div className="dash_navbar_column">
          <button
            className="btn-navbar-ativo"
            onClick={() => navigate("/calendario_visao_geral")}
          >
            <img
              style={{ maxWidth: "24px" }}
              src="/src/assets/svg/nav_dash/icon_house_filled.svg"
              alt=""
            />
            Calendário
          </button>
          <button
            className="btn-navbar"
            onClick={() => navigate("/servicos_servicos")}
          >
            <img
              style={{ maxWidth: "24px" }}
              src="/src/assets/svg/nav_dash/icon_tesoura_outline.svg"
              alt=""
            />
            Serviços
          </button>
          <button
            className="btn-navbar"
            onClick={() => navigate("/usuarios_clientes")}
          >
            <img
              style={{ maxWidth: "24px" }}
              src="/src/assets/svg/nav_dash/icon_user_outline.svg"
              alt=""
            />
            Usuários
          </button>
          <button
            className="btn-navbar"
            onClick={() => navigate("/controlem_servicos")}
          >
            <img
              style={{ maxWidth: "24px" }}
              src="/src/assets/svg/nav_dash/icon_doc_outline.svg"
              alt=""
            />
            Controle Mensal
          </button>
          <button
            className="btn-navbar"
            onClick={() => navigate("/perfil")}
          >
            <img
              style={{ maxWidth: "24px" }}
              src="/src/assets/svg/nav_dash/icon_smile_outline.svg"
              alt=""
            />
            Perfil
          </button>
        </div>
        <button onClick={() => logout(navigate)} className="btn-sair">
          <img
            style={{ maxWidth: "24px" }}
            src="/src/assets/svg/nav_config/icon_exit.svg"
            alt=""
          />
          Sair
        </button>
      </div>
    </div>
  );
}
