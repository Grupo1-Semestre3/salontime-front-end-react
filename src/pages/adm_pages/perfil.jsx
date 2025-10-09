import React, { useEffect, useState } from "react";
import MenuDash from "../../components/MenuDash";
import {
  listarInfoSalao,
  mudarSenha,
  editarInfoSalaoCompleto,
  listarUsuarioPorId,
  atualizarUsuario,
} from "../../js/api/kaua";
import { mensagemSucesso, mensagemErro } from "../../js/utils";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [usuarioEdicao, setUsuarioEdicao] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [infoSalao, setInfoSalao] = useState({
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    cidade: "",
    estado: "",
    complemento: "",
  });

  // Busca dados do usuário logado
  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    if (usuarioStorage) {
      const user = JSON.parse(usuarioStorage);
      setUsuario(user);
      carregarUsuario(user.id);
    }
  }, []);

  const carregarUsuario = async (id) => {
    try {
      const dados = await listarUsuarioPorId(id);
      setUsuarioEdicao(dados);
    } catch {
      mensagemErro("Erro ao carregar dados do usuário.");
    }
  };

  const handleChangeUsuario = (e) => {
    const { id, value } = e.target;
    setUsuarioEdicao((prev) => ({ ...prev, [id]: value }));
  };

  const handleAtualizarUsuario = async () => {
    if (!usuarioEdicao.nome || !usuarioEdicao.email || !usuarioEdicao.telefone || !usuarioEdicao.cpf) {
      mensagemErro("Preencha todos os campos antes de atualizar.");
      return;
    }
    try {
      await atualizarUsuario(usuario.id, usuarioEdicao);
      mensagemSucesso("Dados pessoais atualizados com sucesso!");
    } catch {
      mensagemErro("Erro ao atualizar os dados pessoais.");
    }
  };

  const handleMudarSenha = async () => {
    if (!usuario || !senhaAtual || !novaSenha || !confirmarSenha) {
      mensagemErro("Preencha todos os campos.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      mensagemErro("As senhas não coincidem.");
      return;
    }
    try {
      await mudarSenha(usuario.id, novaSenha, senhaAtual);
      mensagemSucesso("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch {
      mensagemErro("Erro ao alterar a senha. Verifique a senha atual.");
    }
  };

  // Busca informações do salão
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await listarInfoSalao();
        if (response && response.length > 0) setInfoSalao(response[0]);
      } catch {
        mensagemErro("Erro ao buscar informações do salão.");
      }
    };
    fetchInfo();
  }, []);

  const handleChangeSalao = (e) => {
    const { id, value } = e.target;
    setInfoSalao((prev) => ({ ...prev, [id]: value }));
  };

  const handleAtualizarSalao = async () => {
    const camposObrigatorios = ["email", "telefone", "logradouro", "numero", "cidade", "estado"];
    const camposVazios = camposObrigatorios.filter(
      (campo) => !infoSalao[campo] || infoSalao[campo].trim() === ""
    );

    if (camposVazios.length > 0) {
      mensagemErro("Preencha todos os campos obrigatórios antes de atualizar.");
      return;
    }

    try {
      await editarInfoSalaoCompleto(infoSalao);
      mensagemSucesso("Informações do salão atualizadas com sucesso!");
    } catch {
      mensagemErro("Erro ao atualizar informações do salão.");
    }
  };

  return (
    <MenuDash>
      {/* DADOS PESSOAIS */}
      <div className="dash_section_container">
        <div className="perfil_pai_box">
          <h1 className="supertitulo-1">Dados pessoais:</h1>

          <div className="perfil_label_inp_box">
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              value={usuarioEdicao.nome}
              onChange={handleChangeUsuario}
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="perfil_label_inp_box">
            <label htmlFor="email">Endereço de e-mail</label>
            <input
              id="email"
              type="text"
              value={usuarioEdicao.email}
              onChange={handleChangeUsuario}
              placeholder="Digite seu endereço de e-mail"
            />
          </div>

          <div className="perfil_label_inp_box">
            <label htmlFor="telefone">Número de telefone</label>
            <input
              id="telefone"
              type="text"
              value={usuarioEdicao.telefone}
              onChange={handleChangeUsuario}
              placeholder="Digite seu número de telefone"
            />
          </div>

          <div className="perfil_label_inp_box">
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              value={usuarioEdicao.cpf}
              onChange={handleChangeUsuario}
              placeholder="Digite seu CPF"
            />
          </div>

          <div className="perfil_label_inp_box">
            <input
              className="btn-rosa"
              type="button"
              value="Atualizar"
              onClick={handleAtualizarUsuario}
            />
          </div>
        </div>
      </div>

      {/* ALTERAR SENHA */}
      <div className="dash_section_container">
        <div className="perfil_pai_box">
          <h1 className="supertitulo-1">Alterar senha:</h1>

          <div className="perfil_label_inp_box">
            <label htmlFor="inp_senha_inp">Senha atual</label>
            <input
              id="inp_senha_inp"
              type="password"
              placeholder="Digite sua senha atual"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
          </div>

          <div className="perfil_label_inp_box">
            <label htmlFor="inp_nova_senha_inp">Nova senha</label>
            <input
              id="inp_nova_senha_inp"
              type="password"
              placeholder="Digite sua nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
          </div>

          <div className="perfil_label_inp_box">
            <label htmlFor="inp_nova_senha_confirmacao_inp">Confirmar nova senha</label>
            <input
              id="inp_nova_senha_confirmacao_inp"
              type="password"
              placeholder="Digite sua nova senha novamente"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          <div className="perfil_label_inp_box">
            <input
              className="btn-rosa"
              type="button"
              value="Atualizar"
              onClick={handleMudarSenha}
            />
          </div>
        </div>
      </div>

      {/* INFORMAÇÕES DO SALÃO */}
      <div className="dash_section_container">
        <div className="perfil_pai_box">
          <h1 className="supertitulo-1">Informações do Salão</h1>

          <div className="perfil_label_inp_box">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              value={infoSalao.email}
              onChange={handleChangeSalao}
              placeholder="Digite email do salão"
              type="text"
            />
          </div>

          <div className="perfil_label_inp_box">
            <label htmlFor="telefone">Número de telefone</label>
            <input
              id="telefone"
              value={infoSalao.telefone}
              onChange={handleChangeSalao}
              placeholder="Digite o número de telefone do salão"
              type="text"
            />
          </div>

          <div className="perfil_label_inp_duplo_box perfil_log_box">
            <div className="perfil_label_inp_duplo perfil_log">
              <label htmlFor="logradouro">Logradouro</label>
              <input
                id="logradouro"
                value={infoSalao.logradouro}
                onChange={handleChangeSalao}
                placeholder="Digite o logradouro do salão"
                type="text"
              />
            </div>

            <div className="perfil_label_inp_duplo perfil_num">
              <label htmlFor="numero">Número</label>
              <input
                id="numero"
                value={infoSalao.numero}
                onChange={handleChangeSalao}
                placeholder="Digite o número do salão"
                type="text"
              />
            </div>
          </div>

          <div className="perfil_label_inp_duplo_box perfil_meio_meio_box">
            <div className="perfil_label_inp_duplo">
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                value={infoSalao.cidade}
                onChange={handleChangeSalao}
                placeholder="Digite a cidade"
                type="text"
              />
            </div>

            <div className="perfil_label_inp_duplo">
              <label htmlFor="estado">Estado</label>
              <input
                id="estado"
                value={infoSalao.estado}
                onChange={handleChangeSalao}
                placeholder="Digite o estado"
                type="text"
              />
            </div>
          </div>

          <div className="perfil_label_inp_box">
            <label htmlFor="complemento">Complemento</label>
            <input
              id="complemento"
              value={infoSalao.complemento}
              onChange={handleChangeSalao}
              placeholder="Digite o complemento"
              type="text"
            />
          </div>

          <div className="perfil_label_inp_box">
            <input
              className="btn-rosa"
              type="button"
              value="Atualizar"
              onClick={handleAtualizarSalao}
            />
          </div>
        </div>
      </div>
    </MenuDash>
  );
}