import { useEffect, useState } from "react";
import MenuDash from "../../components/MenuDash";
import NavServicos from "../../components/NavServicos";
import { buscarCupom, atualizarCupom, desativarCupom, criarCupom } from "../../js/api/anna";
import Popup, { PopupAlerta } from "../../components/Popup";

function CriarCupom({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    codigo: "",
    ativo: true,
    inicio: "",
    fim: "",
    tipoDestinatario: "TODOS",
    desconto: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novoCupom = await criarCupom(formData);
      onSave(novoCupom);
      onClose();
    } catch (error) {
      console.error("Erro ao criar cupom:", error);
      alert("Erro ao criar cupom. Por favor, tente novamente.");
    }
  };

  return (
    <Popup style="width: auto;" onClose={onClose}>
      <div className="servico-form">
        <h2 style={{ fontSize: '22px' }}>Criar Novo Cupom</h2>
        <form onSubmit={handleSubmit}>
          <div className="input_pai">
            <label htmlFor="nome">Titulo do CUPOM</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="input"
              style={{ width: '416px' }}
            />
          </div>

          <div className="input_pai">
            <label htmlFor="descricao">Descrição do CUPOM</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              className="input"
              style={{ width: '416px' }}
            />
          </div>

          <div className="btn-juntos">
            <div className="input_pai" style={{ width: '200px' }}>
              <label htmlFor="codigo">Código do CUPOM</label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="input_pai" style={{ width: '200px' }}>
              <label htmlFor="tipoDestinatario">Destinatário</label>
              <select
                id="tipoDestinatario"
                name="tipoDestinatario"
                value={formData.tipoDestinatario}
                onChange={handleChange}
                className="input"
              >
                <option value="TODOS">TODOS</option>
                <option value="EXCLUSIVO">EXCLUSIVO</option>
              </select>
            </div>
          </div>

          <div className="btn-juntos">
            <div className="input_pai" style={{ width: '200px' }}>
              <label htmlFor="inicio">Data Início</label>
              <input
                type="date"
                id="inicio"
                name="inicio"
                value={formData.inicio}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <div className="input_pai" style={{ width: '200px' }}>
              <label htmlFor="fim">Data Fim</label>
              <input
                type="date"
                id="fim"
                name="fim"
                value={formData.fim}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          </div>

          <div className="input_pai" style={{ width: '416px', paddingBottom: '16px' }}>
            <label htmlFor="desconto">% de Desconto</label>
            <input
              type="number"
              id="desconto"
              name="desconto"
              value={formData.desconto}
              onChange={handleChange}
              required
              className="input"
              min="0"
              max="100"
            />
          </div>

          <div className="btn-juntos" style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn-rosa" style={{ flex: 1 }}>Criar</button>
            <button type="button" className="btn-branco" onClick={onClose} style={{ flex: 1 }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
}

function EditarCupom({ cupom, onClose, onSave }) {
  const [showAlertaRemover, setShowAlertaRemover] = useState(false);
  const [formData, setFormData] = useState({
    nome: cupom?.nome || "",
    descricao: cupom?.descricao || "",
    codigo: cupom?.codigo || "",
    ativo: cupom?.ativo || true,
    inicio: cupom?.inicio || "",
    fim: cupom?.fim || "",
    tipoDestinatario: cupom?.tipoDestinatario || "TODOS",
    desconto: cupom?.desconto || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cupomAtualizado = await atualizarCupom(cupom.id, formData);
      onSave(cupomAtualizado);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar cupom:", error);
      alert("Erro ao atualizar cupom. Por favor, tente novamente.");
    }
  };

  const handleRemoverClick = () => {
    setShowAlertaRemover(true);
  };

  const handleConfirmarRemocao = async () => {
    try {
      await desativarCupom(cupom.id);
      onSave({ ...cupom, ativo: false });
      onClose();
    } catch (error) {
      console.error("Erro ao desativar cupom:", error);
      alert("Erro ao desativar cupom. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <Popup style="width: auto;" onClose={onClose}>
        <div className="servico-form">
          <h2 style={{ fontSize: '22px' }}>Altere os campos que deseja atualizar:</h2>
          <form onSubmit={handleSubmit}>
            <div className="input_pai">
              <label htmlFor="nome">Nome do Cupom</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="input"
                style={{ width: '416px' }}
              />
            </div>

            <div className="input_pai">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                className="input"
                style={{ width: '416px' }}
              />
            </div>

            <div className="btn-juntos">
              <div className="input_pai" style={{ width: '200px' }}>
                <label htmlFor="codigo">Código</label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>

              <div className="input_pai" style={{ width: '200px' }}>
                <label htmlFor="tipoDestinatario">Destinatário</label>
                <select
                  id="tipoDestinatario"
                  name="tipoDestinatario"
                  value={formData.tipoDestinatario}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="TODOS">TODOS</option>
                  <option value="EXCLUSIVO">EXCLUSIVO</option>
                </select>
              </div>
            </div>

            <div className="btn-juntos">
              <div className="input_pai" style={{ width: '200px' }}>
                <label htmlFor="inicio">Data Início</label>
                <input
                  type="date"
                  id="inicio"
                  name="inicio"
                  value={formData.inicio}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>

              <div className="input_pai" style={{ width: '200px' }}>
                <label htmlFor="fim">Data Fim</label>
                <input
                  type="date"
                  id="fim"
                  name="fim"
                  value={formData.fim}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
            </div>

            <div className="input_pai" style={{ width: '416px', paddingBottom: '16px' }}>
              <label htmlFor="desconto">% de Desconto</label>
              <input
                type="number"
                id="desconto"
                name="desconto"
                value={formData.desconto}
                onChange={handleChange}
                required
                className="input"
                min="0"
                max="100"
              />
            </div>

            <div className="btn-juntos">
              <button type="submit" className="btn-verde">Atualizar</button>
              <button 
                type="button" 
                className="btn-vermelho"
                onClick={handleRemoverClick}
              >
                Remover
              </button>
              <button type="button" className="btn-branco" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Popup>

      {showAlertaRemover && (
        <PopupAlerta
          mensagem="Tem certeza que deseja desativar este cupom?"
          funcao={handleConfirmarRemocao}
          onClose={() => setShowAlertaRemover(false)}
        />
      )}
    </>
  );
}

function CupomCard({ cupom, onEdit }) {
  return (
    <div className="dash_servico_servico">
      <div className="dash_servico_servico_nome">
        <h1 className="paragrafo-1 branco semibold">{cupom.nome}</h1>
      </div>
      <div className="dash_servico_servico_util">
        <div className="dash_servico_servico_descricao">
          <p>{cupom.descricao}</p>
        </div>
        <div className="dash_servico_cupom">
          <div className="dash_servico_input_pai">
            <p>Data de Início</p>
            <input
              type="date"
              className="dash_servico_input_cupom"
              value={cupom.inicio}
              readOnly
            />
          </div>
          <div className="dash_servico_input_pai">
            <p>Data de Fim</p>
            <input
              type="date"
              className="dash_servico_input_cupom"
              value={cupom.fim}
              readOnly
            />
          </div>
        </div>
        <div className="dash_servico_servico_info_filho">
          <img src="/src/assets/svg/key.svg" alt="" />
          <p>Código: {cupom.codigo}</p>
        </div>
        <div className="dash_servico_servico_info_filho">
          <img src="/src/assets/svg/cash-sharp.svg" alt="" />
          <p>Destinado para: {cupom.tipoDestinatario}</p>
        </div>
        <div className="dash_servico_servico_button btn-juntos">
          <button
            className="btn-rosa"
            style={{ width: "120px" }}
            onClick={() => onEdit(cupom)}
          >
            Editar
          </button>
          <button 
            className={cupom.ativo ? "btn-branco" : "btn-cinza"}
            style={{ width: "120px" }}
            disabled={!cupom.ativo}
          >
            {cupom.ativo ? 'Ativo' : 'Desativado'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Servicos_cupons() {
  const [cupons, setCupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cupomSelecionado, setCupomSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [showCriarCupom, setShowCriarCupom] = useState(false);

  useEffect(() => {
    const carregarCupons = async () => {
      try {
        const data = await buscarCupom();
        setCupons(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar cupons:", error);
        setError("Erro ao carregar cupons. Tente novamente mais tarde.");
        setLoading(false);
      }
    };

    carregarCupons();
  }, []);

  const handleEditCupom = (cupom) => {
    setCupomSelecionado(cupom);
    setModalAberto(true);
  };

  const handleCloseModal = () => {
    setModalAberto(false);
    setCupomSelecionado(null);
  };

  const handleCupomAtualizado = (cupomAtualizado) => {
    setCupons(cupons.map(c =>
      c.id === cupomAtualizado.id ? cupomAtualizado : c
    ));
    handleCloseModal();
  };

  const handleCriarCupom = (novoCupom) => {
    setCupons([...cupons, novoCupom]);
  };

  if (loading) return <div>Carregando cupons...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <MenuDash>
        <NavServicos />
        <div className="dash_section_container">
          <div className="dash_servico_section_2">
            <h1 className="titulo-1">Gerenciar CUPONS</h1>
            <button className="btn-rosa" onClick={() => setShowCriarCupom(true)}>
              <img
                src="/src/assets/vector/icon_sum/jam-icons/Vector.svg"
                alt=""
              />
              Criar CUPOM
            </button>
          </div>
          <div className="dash_servico_servico_pai">
            {cupons && cupons.length > 0 ? (
              cupons.map((cupom) => (
                <CupomCard
                  key={cupom.id}
                  cupom={cupom}
                  onEdit={handleEditCupom}
                />
              ))
            ) : (
              <div className="dash_servico_empty">
                <p className="paragrafo-1">Nenhum cupom foi encontrado</p>
              </div>
            )}
          </div>
        </div>
      </MenuDash>

      {modalAberto && cupomSelecionado && (
        <EditarCupom
          cupom={cupomSelecionado}
          onClose={handleCloseModal}
          onSave={handleCupomAtualizado}
        />
      )}

      {showCriarCupom && (
        <CriarCupom
          onClose={() => setShowCriarCupom(false)}
          onSave={handleCriarCupom}
        />
      )}
    </>
  );
}