
import { useState } from "react";
import MenuConfig from "/src/components/MenuConfig.jsx";


export default function Config_perfil({ onUpdateDados, onUpdateSenha }) {
  const [dados, setDados] = useState({ nome: "", email: "", telefone: "", cpf: "", nascimento: "" });
  const [senha, setSenha] = useState({ atual: "", nova: "", confirmar: "" });

  const handleChangeDados = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };
  const handleChangeSenha = (e) => {
    setSenha({ ...senha, [e.target.name]: e.target.value });
  };

  const handleSubmitDados = (e) => {
    e.preventDefault();
    if (onUpdateDados) onUpdateDados(dados);
  };

  const handleSubmitSenha = (e) => {
    e.preventDefault();
    if (onUpdateSenha) onUpdateSenha(senha);
  };

  return (
    <MenuConfig>
      <form className="config_section_container" onSubmit={handleSubmitDados} autoComplete="off">
        <p className="titulo-1">Dados pessoais:</p>
        <div className="input_pai">
          <p className="paragrafo-2">Nome Completo</p>
          <input type="text" className="input" name="nome" placeholder="Digite seu nome" value={dados.nome} onChange={handleChangeDados} />
        </div>
        <div className="input_pai">
          <p className="paragrafo-2">Endereço de e-mail</p>
          <input type="email" className="input" name="email" placeholder="Digite seu e-mail" value={dados.email} onChange={handleChangeDados} />
        </div>
        <div className="input_pai">
          <p className="paragrafo-2">Número de telefone</p>
          <input type="text" className="input" name="telefone" placeholder="Digite seu número de telefone" value={dados.telefone} onChange={handleChangeDados} />
        </div>
        <div className="input_pai">
          <p className="paragrafo-2">CPF</p>
          <input type="text" className="input" name="cpf" placeholder="Digite seu CPF" value={dados.cpf} onChange={handleChangeDados} />
        </div>
        <div className="input_pai">
          <p className="paragrafo-2">Data de nascimento</p>
          <input type="text" className="input" name="nascimento" placeholder="Digite sua data de nascimento" value={dados.nascimento} onChange={handleChangeDados} />
        </div>
        <button className="btn-rosa" style={{ width: "100%" }} type="submit">
          Atualizar
        </button>
      </form>
      <div className="config_section_divisor"></div>
      <form className="config_section_container" onSubmit={handleSubmitSenha} autoComplete="off">
        <p className="titulo-1">Alterar senha:</p>
        <div className="input_pai">
          <p className="paragrafo-2">Senha atual</p>
          <input type="password" className="input" name="atual" placeholder="Digite aqui" value={senha.atual} onChange={handleChangeSenha} />
        </div>
        <div className="input_pai">
          <p className="paragrafo-2">Nova senha</p>
          <input type="password" className="input" name="nova" placeholder="Digite aqui" value={senha.nova} onChange={handleChangeSenha} />
        </div>
        <div className="input_pai">
          <p className="paragrafo-2">Confirmar nova senha</p>
          <input type="password" className="input" name="confirmar" placeholder="Digite aqui" value={senha.confirmar} onChange={handleChangeSenha} />
        </div>
        <button className="btn-rosa" style={{ width: "100%" }} type="submit">
          Atualizar
        </button>
      </form>
    </MenuConfig>
  );
}
