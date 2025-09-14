import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function listar() {

  let mensagem = "";


  fetch('http://localhost:3000/servicos')
    .then(function (resposta) {
      return resposta.json()
    })
    .then(function (dados) {

      const html = dados.map(dado => {


        let estrela = "";
        let estrelaQtd = Math.round(dado.mediaAvaliacao)

        // estrelas cheias
        for (let i = 1; i <= estrelaQtd; i++) {


          estrela += `<img src="/src/assets/svg/icon_star_outline.svg" alt="star">`;

          if (estrelaQtd < 5 && i == estrelaQtd) {
            for (let ix = i; ix < 5; ix++) {
              estrela += `<img src="/src/assets/svg/icon_star_filled.svg" alt="star">`;
            }
          }
        }

        return `
        <div className="catalogo_section_card shadow">
          <div className="catalogo_section_title">
            <p className="paragrafo-1 bold" style="color: var(--rosa-4);">${dado.nome}</p>
          </div>
          <div className="catalogo_section_conteudo">
            <p className="paragrafo-2">${dado.descricao}</p>
            <div className="catalogo_section_infos">
              
              <!-- COMPONENTE - ESTRELAS -->
              <div className="estrelas">
                ${estrela}
              </div>

              <div className="info">
                <img src="/src/assets/vector/icon_horariio/ionicons/sharp/time-sharp.svg" alt="icon-horario">
                <p className="paragrafo-2">${dado.tempo}</p>
              </div>
              <div className="info">
                <img src="/src/assets/vector/icon_dinheiro/ionicons/sharp/cash-sharp.svg" alt="icon-dinheiro">
                <p className="paragrafo-2">A partir de R$${dado.preco}</p>
              </div>
              <button className="btn-rosa" value="${dado.id}">
                <img src="/src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg" alt=" icon-sum">Agendar
              </button>
            </div>
          </div>
        </div>
        `
      }).forEach(dado => mensagem += dado);

      catalogo_section_lista.innerHTML = mensagem
    })
    .catch()


}

function cadastrarCliente() {

  const nome = document.getElementById("cadastro_form_nome").value;
  const email = document.getElementById("cadastro_form_email").value;
  const telefone = document.getElementById("cadastro_form_telefone").value;
  const senha = document.getElementById("cadastro_form_senha").value;
  const senhaConfirmar = document.getElementById("cadastro_form_confirmar").value;

  const validar = validarCamposCadastro(nome, telefone, email, senha, senhaConfirmar);

  if (validar != true) {
    mensagemErro(validar)
    console.log(validar)
  } else {
    //nome = formatarNomeInput(nome)

    fetch("http://localhost:8080/usuarios/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha, telefone })
    })
      .then(resposta => resposta.json())
      .then(dados => {
        mensagemSucesso("Cadastro realizado com sucesso!");
        loginComParametroPosCad(email, senha);
      })
      .catch(erro => {
        console.error("Erro no cadastro:", erro);
        mensagemErro("Erro ao cadastrar. Tente novamente.");
      });

  }

}

function loginComParametroPosCad(email, senha) {

  fetch("http://localhost:8080/usuarios/login", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  })
    .then(resposta => resposta.json())
    .then(dados => {
      if (dados) {

        localStorage.setItem("usuario", JSON.stringify(dados));
        localStorage.setItem('isLoggedIn', '1')

        if (dados.tipoUsuario.descricao == "CLIENTE") {

          console.log("Cliente logado:", dados.nome);
          mensagemSucesso("Login realizado com sucesso!")

          setTimeout(function () {
            window.location.href = "/html/client_pages/servicos.html";
          }, 1500);

        } else if (dados.tipoUsuario.descricao == "FUNCIONARIO" || dados.tipoUsuario.descricao == "ADMINISTRADOR") {
          console.log("Fun ou administrador logado:", dados.nome);
          mensagemSucesso("Login realizado com sucesso!")
          window.location.href = "/html/adm_pages/calendario_visao_geral.html";
        }


        console.log("Usuário logado:", dados.nome);

      } else {
        mensagemErro("E-mail ou senha inválidos.");

      }
    })
    .catch(erro => {
      mensagemErro("E-mail ou senha inválidos.");
      console.error("Erro no login:", erro);
    });
}


// cliente.js
export function login(email, senha, navigate) {


  return fetch("http://localhost:8080/usuarios/login", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
  })
    .then(resposta => resposta.json())
    .then(dados => {
      if (dados) {
        localStorage.setItem("usuario", JSON.stringify(dados));
        localStorage.setItem("usuarioLogado", "1");
        // if (dados.tipoUsuario.descricao === "CLIENTE") {
        //   console.log("Cliente logado:", dados.nome);
        //   mensagemSucesso("Login realizado com sucesso!");

        //   setTimeout(() => {
        //     window.location.href = "/html/client_pages/servicos.html";
        //   }, 1500);
        // } else if (
        //   dados.tipoUsuario.descricao === "FUNCIONARIO" ||
        //   dados.tipoUsuario.descricao === "ADMINISTRADOR"
        // ) {
        //   console.log("Fun ou administrador logado:", dados.nome);
        //   mensagemSucesso("Login realizado com sucesso!");
        //   window.location.href = "/html/adm_pages/calendario_visao_geral.html";
        // }

        if (dados.tipoUsuario.descricao === "CLIENTE") {
          // Espera um tempo se quiser mostrar mensagem
          // mensagemSucesso("Login realizado com sucesso!");
          setTimeout(() => {
            navigate("/servicos"); // <- navega para a rota do cliente
          }, 1000);
        } else if (
          dados.tipoUsuario.descricao === "FUNCIONARIO" ||
          dados.tipoUsuario.descricao === "ADMINISTRADOR"
        ) {
          // mensagemSucesso("Login realizado com sucesso!");
          setTimeout(() => {
            navigate("/adm/calendario-atendimentos"); // <- navega para a rota do admin
          }, 1000);
        }


      } else {
        mensagemErro("E-mail ou senha inválidos.");
      }
    })
    .catch((erro) => {
      mensagemErro("E-mail ou senha inválidos.");
      console.error("Erro no login:", erro);
    });
}



export function logout(navigate) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  console.log(usuario.id)


  fetch(`http://localhost:8080/usuarios/logoff/${usuario.id}`, {
    method: "PATCH"
  })
    .then(resposta => resposta.json())
    .then(dados => {
      console.log("Limpando console")
      localStorage.clear();
      navigate("/")
    })
    .catch(erro => {
      console.error("Erro no login:", erro);
    });


}