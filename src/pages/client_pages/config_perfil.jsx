import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarCliente, login } from "../../js/api/usuario";
import { phoneMask, onlyDigits } from "../../js/utils"; // máscaras e utilitário de dígitos

// Funções auxiliares locais para caret (mantive aqui, as máscaras ficam em utils)
function caretPosFromDigits(newStr, digitsBeforeCursor) {
  if (digitsBeforeCursor <= 0) return 0;
  let digitsSeen = 0;
  for (let i = 0; i < newStr.length; i++) {
    if (/\d/.test(newStr[i])) digitsSeen++;
    if (digitsSeen === digitsBeforeCursor) return i + 1;
  }
  return newStr.length;
}

function setCaretPosition(el, pos) {
  try {
    el.setSelectionRange(pos, pos);
  } catch (e) {
    // ignora se não suportado
  }
}

export default function Cadastro() {
  const navigate = useNavigate();
  const telefoneRef = useRef(null);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmar: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const isValidPhone = (phone) => {
    const d = onlyDigits(phone);
    return d.length === 10 || d.length === 11;
  };

  const isValidPassword = (pwd) => String(pwd).length >= 6;

  const handleChange = (e) => {
    const { name, value, selectionStart } = e.target;

    if (name === "telefone") {
      // Quantos dígitos estavam antes do cursor no novo valor
      const digitsBeforeCursor = onlyDigits(value.slice(0, selectionStart)).length;

      const masked = phoneMask(value);
      setForm((prev) => ({ ...prev, telefone: masked }));

      // Ajusta caret após render
      setTimeout(() => {
        const newPos = caretPosFromDigits(masked, digitsBeforeCursor);
        if (telefoneRef.current) {
          setCaretPosition(telefoneRef.current, newPos);
        }
      }, 0);

      setErrors((prev) => ({ ...prev, telefone: undefined }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateAll = () => {
    const newErrors = {};
    if (!form.nome || form.nome.trim().length < 2) newErrors.nome = "Informe seu nome completo.";
    if (!form.email || !isValidEmail(form.email)) newErrors.email = "Email inválido.";
    if (!form.telefone || !isValidPhone(form.telefone)) newErrors.telefone = "Telefone inválido. Use DDD + número (10 ou 11 dígitos).";
    if (!form.senha || !isValidPassword(form.senha)) newErrors.senha = "A senha precisa ter ao menos 6 caracteres.";
    if (form.senha !== form.confirmar) newErrors.confirmar = "As senhas não coincidem.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    setLoading(true);

    try {
      const payload = {
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        telefone: onlyDigits(form.telefone), // envia apenas dígitos
        senha: form.senha,
      };

      await cadastrarCliente(payload, navigate);

      // Se quiser logar automaticamente:
      // await login(payload.email, payload.senha, navigate);

      navigate("/welcome"); // ajuste conforme sua rota
    } catch (err) {
      console.error(err);
      const message = (err && err.message) || "Ocorreu um erro ao cadastrar.";
      setErrors({ api: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro">
      <div className="cadastro__imagem">
        <img src="/src/assets/img/logincadastro.png" className="login__img" alt="" />
      </div>

      <div className="cadastro__form">
        <button className="cadastro__voltar" onClick={() => navigate("/")}>
          ← Voltar
        </button>

        <div className="cadastro__title">
          <h1 className="titulo-1">Bem vinda(o)!</h1>
          <p className="paragrafo-1 semibold">Preencha os campos para se cadastrar.</p>
        </div>

        <form className="cadastro__formulario" onSubmit={handleSubmit}>
          <div className="input_pai">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              name="nome"
              className="input"
              placeholder="Digite seu nome"
              value={form.nome}
              onChange={handleChange}
            />
            {errors.nome && <small className="error">{errors.nome}</small>}
          </div>

          <div className="input_pai">
            <label htmlFor="email">Endereço de e-mail</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="input_pai">
            <label htmlFor="telefone">Número de telefone</label>
            <input
              ref={telefoneRef}
              type="tel"
              name="telefone"
              className="input"
              placeholder="(XX) XXXXX-XXXX"
              value={form.telefone}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="tel"
            />
            {errors.telefone && <small className="error">{errors.telefone}</small>}
          </div>

          <div className="input_pai">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              className="input"
              placeholder="Digite sua senha"
              value={form.senha}
              onChange={handleChange}
            />
            {errors.senha && <small className="error">{errors.senha}</small>}
          </div>

          <div className="input_pai">
            <label htmlFor="confirmar">Confirmar senha</label>
            <input
              type="password"
              name="confirmar"
              className="input"
              placeholder="Digite sua senha novamente"
              value={form.confirmar}
              onChange={handleChange}
            />
            {errors.confirmar && <small className="error">{errors.confirmar}</small>}
          </div>

          {errors.api && <div className="error api-error">{errors.api}</div>}

          <button type="submit" className="btn-rosa cadastro__btn" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          <div className="linha-horizontal"></div>
        </form>

        <div className="cadastro__login">
          <p className="paragrafo-2">
            Já possui uma conta?
            <button className="cadastro__entrar" onClick={() => navigate("/login")}>
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}