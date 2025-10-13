import { mensagemErro, mensagemSucesso, validarCamposCadastro } from '../utils';

export function cadastrarCliente(form, navigate) {

  const nome = form.nome;
  const email = form.email;
  const telefone = form.telefone;
  const senha = form.senha;
  const senhaConfirmar = form.confirmar;

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
        loginComParametroPosCad(email, senha, navigate);
      })
      .catch(erro => {
        console.error("Erro no cadastro:", erro);
        mensagemErro("Erro ao cadastrar. Tente novamente.");
      });

  }

}

function loginComParametroPosCad(email, senha, navigate) {

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

          setTimeout(() => {
            navigate("/servicos"); // <- navega para a rota do admin
          }, 1500);

        } else if (dados.tipoUsuario.descricao == "FUNCIONARIO" || dados.tipoUsuario.descricao == "ADMINISTRADOR") {
          console.log("Fun ou administrador logado:", dados.nome);
          mensagemSucesso("Login realizado com sucesso!")
          setTimeout(() => {
            navigate("/adm/calendario-visao-geral");
          }, 1500);
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
          mensagemSucesso("Login realizado com sucesso!");
          setTimeout(() => {
            navigate("/servicos"); // <- navega para a rota do cliente
          }, 1500);
        } else if (
          dados.tipoUsuario.descricao === "FUNCIONARIO" ||
          dados.tipoUsuario.descricao === "ADMINISTRADOR"
        ) {
          mensagemSucesso("Login realizado com sucesso!");
          setTimeout(() => {
            navigate("/adm/calendario-visao-geral"); // <- navega para a rota do admin
          }, 1500);
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