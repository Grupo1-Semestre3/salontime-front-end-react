import React, { useState, useEffect } from "react";
import "../css/pages/adm_pages/usuarios/clientes.css";

export default function FormularioCliente({
  mode = "create", // "create" ou "edit"
  initialData = null, // dados do cliente quando for editar
  onCancel,
  onSubmit,
  onDelete, // função opcional para deletar
}) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    senha: "",
  });

  // Preenche os dados quando initialData muda
  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || "",
        email: initialData.email || "",
        telefone: initialData.telefone || "",
        cpf: initialData.cpf || "",
        dataNascimento: initialData.dataNascimento || "",
        senha: "", // não preenche a senha por segurança
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-cliente-container">
      <h3 className="bold">
        {mode === "create" ? "Cadastrar Cliente" : "Editar Cliente"}
      </h3>

      <form className="form-cliente" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Cliente</label>
          <input
            type="text"
            placeholder="Digite o nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite o e-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <input
            type="tel"
            placeholder="Digite o telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite o CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder={mode === "edit" ? "Deixe em branco para não alterar" : "Digite a senha"}
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required={mode === "create"} // senha obrigatória só ao criar
          />
        </div>

        <div className="botoes-form">
          {mode === "create" ? (
            <>
              <button type="submit" className="btn-rosa">
                Criar
              </button>
              <button type="button" className="btn-branco" onClick={onCancel}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="btn-verde">
                Atualizar
              </button>
              <button
                type="button"
                className="btn-vermelho"
                onClick={() => onDelete(initialData.id)}
              >
                Excluir
              </button>
              <button type="button" className="btn-branco" onClick={onCancel}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}