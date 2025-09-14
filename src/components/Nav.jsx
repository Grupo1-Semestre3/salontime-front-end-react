import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Simulação: troque isso pela lógica real de login
  const isLoggedIn = Boolean(localStorage.getItem("usuarioLogado"));

  return (
    <nav className="nav_institucional_pai">
      <div className="nav_institucional_coluna">
        <p
          className={`paragrafo-2 underline-hover ${location.pathname === "/" ? "underline" : ""}`}
          onClick={() => navigate("/")}
        >
          Página Inicial
        </p>
        <p
          className={`paragrafo-2 underline-hover ${location.pathname === "/servicos" ? "underline" : ""}`}
          onClick={() => navigate("/servicos")}
        >
          Serviços
        </p>
      </div>

      <div className="nav_institucional_coluna">
        <img src="src/assets/svg/logo_black.svg" alt="logo" style={{ height: "50px" }} />
      </div>

      <div className="nav_institucional_coluna">
        {isLoggedIn ? (
          <>
            <button
              id="btn_perfil"
              className="btn-rosa"
              onClick={() => navigate("/config-perfil")}
            >
              Configurações
            </button>
          </>
        ) : (
          <>
            <button id="btn_entrar" className="btn-branco" onClick={() => navigate("/login")}>
              Entrar
            </button>
            <button id="btn_cadastrar" className="btn-rosa" onClick={() => navigate("/cadastro")}>
              Cadastre-se
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
