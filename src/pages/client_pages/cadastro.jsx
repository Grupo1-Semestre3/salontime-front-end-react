import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  return <div>Cadastro</div>;
}


// <!DOCTYPE html>
// <html lang="pt-br">

// <head> 
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <link rel="stylesheet" href="../../css/main.css" />
//     <script src="../../js/utils/utils_cliente_pages.js"></script>
//     <script src="../../js/api/cliente/cliente.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
//     <link rel="shortcut icon" href="../../assets/svg/logo_rosa.svg" type="image/x-icon" />
//     <title>Salon Time | Cadastro</title>
// </head>


// <body>
//   <div class="cadastro">
//     <!-- Coluna esquerda -->
//     <div class="cadastro__imagem">
//       <img src="../../assets/img/logincadastro.png" class="cadastro__img" alt="">
//     </div>

//     <!-- Coluna direita (formulário) -->  
//     <div class="cadastro__form">
//       <button href="index.html" class="cadastro__voltar" onclick="navegar('./index.html')">← Voltar</button>

//       <div class="cadastro__title">
//         <h1 class="titulo-1">Bem vinda(o)!</h1>
//         <p class="paragrafo-1 semibold">Preencha os campos para se cadastrar.</p>
//       </div>


//       <div class="cadastro__formulario">
//         <div class="input_pai">
//           <label for="nome">Nome completo</label>
//           <input type="text" id="cadastro_form_nome" class="input" placeholder="Digite seu nome">
//         </div>

//         <div class="input_pai">
//           <label for="email">Endereço de e-mail</label>
//           <input type="email" id="cadastro_form_email" class="input" placeholder="Digite seu e-mail">
//         </div>

//         <div class="input_pai">
//           <label for="telefone">Número de telefone</label>
//           <input type="tel" id="cadastro_form_telefone" class="input" placeholder="Diigte seu número de telefone">
//         </div>

//         <div class="input_pai">
//           <label for="senha">Senha</label>
//           <input type="password" id="cadastro_form_senha" class="input" placeholder="Digite sua senha">
//         </div>

//         <div class="input_pai">
//           <label for="confirmar">Confirmar senha</label>
//           <input type="password" id="cadastro_form_confirmar" class="input" placeholder="Digite sua senha novamente">
//         </div>

//         <button type="submit" onclick="cadastrarCliente()" class="btn-rosa cadastro__btn">Cadastrar</button>

//         <div class="linha-horizontal"></div>
        
//       </div class="cadastro__formulario">

//       <div class="cadastro__login">
//         <p class="paragrafo-2">Já possui uma conta?
//           <button href="login.html" class="cadastro__entrar" onclick="navegar('./login.html')">Entrar</button>
//         </p>
//       </div>
      
//     </div>
//   </div>
//   </div>
// </body>

// </html>


// <script>
//   function cadastraEmpresa() {
//     event.preventDefault();

//     let nomeUsuario = document.getElementById("nome_usuario").value;
//     let emailUsuario = document.getElementById("email_usuario").value;
//     let senhaUsuario = document.getElementById("senha_usuario").value;
//     let senhaConfirmar = document.getElementById("confirmar_senha").value;
//     let nomeEmpresa = document.getElementById("nome_empresa").value;
//     let cnpj = document.getElementById("cnpj").value;

//     if (nomeUsuario == "" || emailUsuario == "" || senhaUsuario == "" || nomeEmpresa == "" || cnpj == "") {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         color: '#fff',
//         text: "Preencha todos os campos!",
//         background: '#1d1d1d',
//         confirmButtonColor: '#4E2E9E',
//       });
//       return;
//     }

//     if (senhaUsuario != senhaConfirmar) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         color: '#fff',
//         text: "As senhas não coincidem!",
//         background: '#1d1d1d',
//         confirmButtonColor: '#4E2E9E',
//       });
//       return;
//     }

//     if (cnpj.length != 14) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         color: '#fff',
//         text: "CNPJ inválido!",
//         background: '#1d1d1d',
//         confirmButtonColor: '#4E2E9E',
//       });
//       return;
//     }

//     fetch("/empresas/cadastrar", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         nomeEmpresaServer: nomeEmpresa,
//         nomeResponsavelServer: nomeUsuario,
//         emailResponsavelServer: emailUsuario,
//         cnpjServer: cnpj,
//       }),
//     })
//       .then(function (resposta) {
//         console.log("resposta: ", resposta);

//         if (resposta.ok) {
//           console.log(`Empresa cadastrada com sucesso! ${resposta}`);

//           Swal.fire({
//             icon: "success",
//             title: "Cadastro realizado com Sucesso!",
//             color: '#fff',
//             showConfirmButton: false,
//             timer: 1500,
//             background: '#1d1d1d',
//           }).then(() => {
//             cadastraUsuario(nomeUsuario, emailUsuario, senhaUsuario, cnpj);

//             window.location.href = "./login.html";
//           });
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             color: '#fff',
//             text: "Houve um erro ao tentar realizar o cadastro, verifique o CNPJ!",
//             background: '#1d1d1d',
//             confirmButtonColor: '#4E2E9E',
//           });
//         }
//       })
//       .catch(function (resposta) {
//         console.log(`#ERRO: ${resposta}`);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           color: '#fff',
//           text: "Houve um erro ao tentar realizar o cadastro!",
//           background: '#1d1d1d',
//           confirmButtonColor: '#4E2E9E',
//         });
//       });
//   }

//   function cadastraUsuario(nomeUsuario, emailUsuario, senhaUsuario, cnpj) {
//     // Primeiro usuário cadastrado da empresa sempre é ADM, por isso, é 1.
//     let tipoUsuario = 1;

//     fetch("/usuarios/cadastrar", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         tipoUsuarioServer: tipoUsuario,
//         nomeServer: nomeUsuario,
//         emailServer: emailUsuario,
//         senhaServer: senhaUsuario,
//         cnpjServer: cnpj,
//       }),
//     })
//       .then(function (resposta) {
//         console.log("Resposta: ", resposta);

//         if (resposta.ok) {
//           console.log("Usuário cadastrado com sucesso: ", resposta);
//         } else {
//           throw "Houve um erro ao tentar realizar o cadastro!";
//         }
//       })
//       .catch(function (erro) {
//         console.log(`#ERRO: ${erro}`);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Houve um erro ao tentar realizar o cadastro!",
//         });
//       });
//   }
// </script>