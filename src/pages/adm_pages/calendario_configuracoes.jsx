import MenuDash from "../../components/MenuDash"
import NavCalendario from "../../components/NavCalendario"
import Popup from "../../components/Popup";
import { useState, useEffect } from "react";
import { buscarFuncionamento, buscarHorarioExcecao, cadastrarExcecao, editarExcecao, deletarExcecao, editarFuncionamento } from "../../js/api/caio";
import { mensagemErro, mensagemSucesso } from "../../js/utils";

export default function Calendario_configuracoes() {

  const [funcionamento, setFuncionamento] = useState([]);
  const [funcionamentoExcecao, setFuncionamentoExcecao] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const [popupEditarPadrao, setPopupEditarPadrao] = useState(false);
  const [popupCadastroExcecao, setPopupCadastroExcecao] = useState(false);
  const [popupEditarExcecao, setPopupEditarExcecao] = useState(false);

  const [excecaoEditando, setExcecaoEditando] = useState(null);
  const [novoHorarioExcecao, setNovoHorarioExcecao] = useState({});
  const [funcionamentoEditando, setFuncionamentoEditando] = useState(null);
  const [novoHorarioPadrao, setNovoHorarioPadrao] = useState({});

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      const usuarioObj = JSON.parse(usuarioStr);
      setUsuario(usuarioObj);
    }
  }, []);

  useEffect(() => {
    if (usuario && usuario.id) {
      buscarFuncionamento()
        .then(data => {
          if (Array.isArray(data)) {
            // Mantém campo aberto como 0/1
            const adaptado = data.map(item => ({
              ...item,
              aberto: item.aberto === true ? 1 : item.aberto === false ? 0 : item.aberto
            }));
            setFuncionamento(adaptado.filter(item => item.funcionario?.id === usuario.id));
            console.log(adaptado.filter(item => item.funcionario?.id === usuario.id));
          } else {
            setFuncionamento([]);
          }
        })
        .catch(error => {
          console.error("Erro ao carregar horarios de funcionamento:", error);
          setFuncionamento([]);
        });
    }
  }, [usuario]);

  useEffect(() => {
    if (usuario && usuario.id) {
      buscarHorarioExcecao()
        .then(data => {
          if (Array.isArray(data)) {
            // Mantém campo aberto como 0/1
            const adaptado = data.map(item => ({
              ...item,
              aberto: item.aberto === true ? 1 : item.aberto === false ? 0 : item.aberto
            }));
            setFuncionamentoExcecao(adaptado.filter(item => item.funcionario?.id === usuario.id));
            console.log(adaptado.filter(item => item.funcionario?.id === usuario.id));
          } else {
            setFuncionamentoExcecao([]);
          }
        })
        .catch(error => {
          console.error("Erro ao carregar horarios de exceção:", error);
          setFuncionamentoExcecao([]);
        });
    }
  }, [usuario]);


  const handleOpenPopupEditarPadrao = (func) => {
    setFuncionamentoEditando(func);
    setNovoHorarioPadrao({ ...func });
    setPopupEditarPadrao(true);
  };
  const handleOpenPopupCadastroExcecao = () => {
    setNovoHorarioExcecao({});
    setPopupCadastroExcecao(true);
  };
  const handleOpenPopupEditarExcecao = (excecao) => {
    setExcecaoEditando(excecao);
    setNovoHorarioExcecao({ ...excecao });
    setPopupEditarExcecao(true);
  };


  const confirmarEdicaoExcecao = async () => {
    const { id, aberto, capacidade, dataInicio, dataFim, inicio, fim } = novoHorarioExcecao;
    const valid = validateHorario(novoHorarioExcecao, "excecao");
    if (!valid.ok) {
      setPopupEditarExcecao(false);
      mensagemErro(valid.mensagem);
      return;
    }
    const dados = {
      ...novoHorarioExcecao,
      aberto: aberto === true ? 1 : 0,
      capacidade: aberto === true ? Number(capacidade) : 0,
      funcionario: { id: usuario.id }
    };
    try {
      await editarExcecao(id, dados);
      setPopupEditarExcecao(false);
      mensagemSucesso("Exceção editada com sucesso!");
      setNovoHorarioExcecao({});
      setExcecaoEditando(null);
      // Atualiza lista após edição
      buscarHorarioExcecao().then(data => {
        if (Array.isArray(data)) {
          setFuncionamentoExcecao(data.filter(item => item.funcionario?.id === usuario.id));
        }
      });
    } catch (error) {
      setPopupEditarExcecao(false);
      mensagemErro("Erro ao editar exceção. Tente novamente mais tarde.");
    }
  };

  const confirmarCadastroExcecao = async () => {
    const valid = validateHorario(novoHorarioExcecao, "excecao");
    if (!valid.ok) {
      setPopupCadastroExcecao(false);
      mensagemErro(valid.mensagem);
      return;
    }
    const { aberto, capacidade } = novoHorarioExcecao;
    const dados = {
      ...novoHorarioExcecao,
      aberto: aberto === true ? 1 : 0,
      capacidade: aberto === true ? Number(capacidade) : 0,
      funcionario: { id: usuario.id }
    };
    try {
      await cadastrarExcecao(dados);
      setPopupCadastroExcecao(false);
      mensagemSucesso(`Exceção cadastrada com sucesso!`);
      setNovoHorarioExcecao({});
    } catch (error) {
      setPopupCadastroExcecao(false);
      mensagemErro("Erro ao cadastrar exceção. Tente novamente mais tarde.");
    }
  };

  const confirmarEdicaoPadrao = async () => {
    const valid = validateHorario(novoHorarioPadrao, "padrao");
    if (!valid.ok) {
      setPopupEditarPadrao(false);
      mensagemErro(valid.mensagem);
      return;
    }
    const { id, aberto, capacidade } = novoHorarioPadrao;
    const dados = {
      ...novoHorarioPadrao,
      aberto: aberto === true ? 1 : 0,
      capacidade: aberto === true ? Number(capacidade) : 0,
    };
    try {
      await editarFuncionamento(id, dados);
      setPopupEditarPadrao(false);
      mensagemSucesso("Horário padrão editado com sucesso!");
      setNovoHorarioExcecao({});
      setFuncionamentoEditando(null);
      // Atualiza lista após edição
      buscarFuncionamento().then(data => {
        if (Array.isArray(data)) {
          setFuncionamento(data.filter(item => item.funcionario?.id === usuario.id));
        }
      });
    } catch (error) {
      setPopupEditarPadrao(false);
      mensagemErro("Erro ao editar horário padrão. Tente novamente mais tarde.");
    }
  };


  return (
    <>

      {/* NAVBAR LATERAL */}
      <MenuDash>
        <NavCalendario />

        {/* HORÁRIOS PADRÃO */}
        <div className="dash_section_container">
          <h1 className="supertitulo-1">Horários Padrão:</h1>
        </div>

        {/* Exemplo de dia da semana (pode repetir para os outros dias) */}
        <div className="dash_section_container">
          {funcionamento.map((func, index) => (
            <HorarioPadrao key={index} {...func} onEditar={() => handleOpenPopupEditarPadrao(func)} />
          ))}
        </div>
        {popupEditarPadrao && funcionamentoEditando && (
          <PopupEditarPadrao
            setPopupEditarPadrao={setPopupEditarPadrao}
            setFuncionamentoEditando={setFuncionamentoEditando}
            setNovoHorarioPadrao={setNovoHorarioPadrao}
            novoHorarioPadrao={funcionamentoEditando}
            onConfirm={confirmarEdicaoPadrao}
          />
        )}
        {/* HORÁRIOS DE EXCEÇÃO */}
        <div className="dash_section_container horario_excecao_titulo_box">
          <h1>Horários de Exceção:</h1>
          <button className="btn-rosa" onClick={handleOpenPopupCadastroExcecao}>
            <img
              src="/src/assets/vector/icon_sum/jam-icons/Vector.svg"
              alt=""
            />
            Criar Exceção
          </button>
          {popupCadastroExcecao == true ? (
            <PopupCadastrarExcecao
              novoHorarioExcecao={novoHorarioExcecao}
              setPopupCadastroExcecao={setPopupCadastroExcecao}
              onConfirm={confirmarCadastroExcecao}
              setNovoHorarioExcecao={setNovoHorarioExcecao}
            />
          ) : null}
        </div>

        {/* <p>O post de horario excecao precisa esperar o id como parametro para carregar o funcionario</p> */}

        <div className="dash_section_container">
          {funcionamentoExcecao.length > 0 ? funcionamentoExcecao.map((funcExcecao, index) => (
            <HorarioExcecao key={index} {...funcExcecao} onEditar={() => handleOpenPopupEditarExcecao(funcExcecao)} />
          )) : <p className="paragrafo-2">Nenhum horário de exceção cadastrado.</p>}
        </div>
        {popupEditarExcecao && excecaoEditando && (
          <PopupEditarExcecao
            setPopupEditarExcecao={setPopupEditarExcecao}
            setExcecaoEditando={setExcecaoEditando}
            setNovoHorarioExcecao={setNovoHorarioExcecao}
            novoHorarioExcecao={excecaoEditando}
            onConfirm={confirmarEdicaoExcecao}
          />
        )}

      </MenuDash >
    </>
  );
}

function HorarioPadrao(funcionamento) {
  return (
    <div className="configuracao_line_box">
      <div className="configuracao_box_info">
        <div>
          <p className="paragrafo-1 calendario_config_semana semibold">
            {funcionamento.diaSemana}
          </p>
        </div>

        <div className="configuracao_ajuste_gap_box">
          <div>
            <button className={funcionamento.aberto === 1 ? "configuracao_button_verde" : "configuracao_button_vermelho"}>
              {funcionamento.aberto === 1 ? "Aberto" : "Fechado"}
            </button>
          </div>

          <div className="configuracao_capacidade_box">
            <img src="/src/assets/svg/capacidade_icon.svg" alt="" />
            <p>Capacidade: {funcionamento.capacidade ? funcionamento.capacidade : "0"}</p>
          </div>

          <div className="configuracao_horarios_box">
            <div className="configuracao_horario_mini_box">
              <p>{funcionamento.inicio ? funcionamento.inicio : "00:00"}</p>
              <img src="/src/assets/svg/log-in.svg" alt="" />
            </div>
            <div className="configuracao_seta_cinza_box">
              <img
                src="/src/assets/svg/seta_para_direita_icon.svg"
                alt=""
              />
            </div>
            <div className="configuracao_horario_mini_box">
              <p>{funcionamento.fim ? funcionamento.fim : "00:00"}</p>
              <img src="/src/assets/svg/log-in.svg" alt="" />
            </div>
          </div>

          <div>
            <a onClick={funcionamento.onEditar}>Editar</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PopupEditarPadrao({ novoHorarioPadrao, setPopupEditarPadrao, onConfirm, setNovoHorarioPadrao, setFuncionamentoEditando }) {
  return (
    <Popup>
      <p className="paragrafo-1 semibold">Editar Horário Padrão:</p>
      <div className="line">
        <div className="input_pai">
          <p className="paragrafo-2">Status:</p>
          <select name="status" className="select" style={{ width: '100%' }} value={novoHorarioPadrao.aberto === 1 ? "aberto" : "fechado"} onChange={(e) => setNovoHorarioPadrao({ ...novoHorarioPadrao, aberto: e.target.value === "aberto" ? 1 : 0 })}>
            <option value="aberto">Aberto</option>
            <option value="fechado">Fechado</option>
          </select>
        </div>
        <div className="input_pai">
          <p>Capacidade:</p>
          <input type="number" name="capacidade" className="input" placeholder="Digite o número" min="0" value={novoHorarioPadrao.capacidade === undefined ? '' : novoHorarioPadrao.capacidade} onChange={(e) => setNovoHorarioPadrao({ ...novoHorarioPadrao, capacidade: Number(e.target.value) })} />
        </div>
      </div>

      <div className="line">
        <div className="input_pai">
          <p>Hora Início:</p>
          <input type="time" name="horaInicio" className="input" value={novoHorarioPadrao.inicio || ''} onChange={(e) => setNovoHorarioPadrao({ ...novoHorarioPadrao, inicio: e.target.value })} />
        </div>
        <div className="input_pai">
          <p>Hora Fim:</p>
          <input type="time" name="horaFim" className="input" value={novoHorarioPadrao.fim || ''} onChange={(e) => setNovoHorarioPadrao({ ...novoHorarioPadrao, fim: e.target.value })} />
        </div>
      </div>

      <div className="btn-juntos">
        <button className="btn-rosa" onClick={onConfirm}>Salvar</button>
        <button className="btn-branco" onClick={() => { setPopupEditarPadrao(false); setFuncionamentoEditando(null); }}>Cancelar</button>
      </div>
    </Popup>
  );
}

function HorarioExcecao(funcionamento) {
  return (
    <div className="configuracao_line_execao_box">
      <div className="configuracao_box_info">
        <div className="configuracao_ajuste_gap_box">
          <div>
            <button className={funcionamento.aberto === 1 ? "configuracao_button_verde" : "configuracao_button_vermelho"}>
              {funcionamento.aberto === 1 ? "Aberto" : "Fechado"}
            </button>
          </div>
          <div className="configuracao_capacidade_box">
            <img src="/src/assets/svg/capacidade_icon.svg" alt="" />
            <p>Capacidade: {funcionamento.capacidade ? funcionamento.capacidade : "0"}</p>
          </div>

          <div className="configuracao_horarios_box">
            <div className="configuracao_horario_mini_box">
              <p>{funcionamento.dataInicio ? funcionamento.dataInicio : "dd/mm/yy"}</p>
              <img src="/src/assets/svg/log-in.svg" alt="" />
            </div>
            <div className="configuracao_seta_cinza_box">
              <img
                src="/src/assets/svg/seta_para_direita_icon.svg"
                alt=""
              />
            </div>
            <div className="configuracao_horario_mini_box">
              <p>{funcionamento.dataFim ? funcionamento.dataFim : "dd/mm/yy"}</p>
              <img src="/src/assets/svg/log-in.svg" alt="" />
            </div>
          </div>

          <div className="configuracao_horarios_box">
            <div className="configuracao_horario_mini_box">
              <p>{funcionamento.inicio ? funcionamento.inicio : "00:00"}</p>
              <img src="/src/assets/svg/log-in.svg" alt="" />
            </div>
            <div className="configuracao_seta_cinza_box">
              <img
                src="/src/assets/svg/seta_para_direita_icon.svg"
                alt=""
              />
            </div>
            <div className="configuracao_horario_mini_box">
              <p>{funcionamento.fim ? funcionamento.fim : "00:00"}</p>
              <img src="/src/assets/svg/log-in.svg" alt="" />
            </div>
          </div>

          <div>
            <a onClick={funcionamento.onEditar}>Editar</a>
          </div>
        </div>
      </div>
    </div >
  );
}

function PopupCadastrarExcecao({ novoHorarioExcecao, setPopupCadastroExcecao, onConfirm, setNovoHorarioExcecao }) {
  return (
    <Popup>
      <p className="paragrafo-1 semibold">Preencha os campos abaixo:</p>
      <div className="line">
        <div className="input_pai">
          <p className="paragrafo-2">Status:</p>
          <select name="status" id="" className="select" style={{ width: '100%' }} value={novoHorarioExcecao.aberto === 1 ? "aberto" : "fechado"} onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, aberto: e.target.value === "aberto" ? 1 : 0 })}>
            <option value="aberto">Aberto</option>
            <option value="fechado">Fechado</option>
          </select>
        </div>
        <div className="input_pai">
          <p>Capacidade:</p>
          <input type="number" name="capacidade" className="input" placeholder="Digite o número" min="0" onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, capacidade: Number(e.target.value) })} />
        </div>
      </div>

      <div className="line">
        <div className="input_pai">
          <p>Data Início:</p>
          <input type="date" name="dataInicio" className="input" onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, dataInicio: e.target.value })} />
        </div>
        <div className="input_pai">
          <p>Data Fim:</p>
          <input type="date" name="dataFim" className="input" onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, dataFim: e.target.value })} />
        </div>
      </div>

      <div className="line">
        <div className="input_pai">
          <p>Hora Início:</p>
          <input type="time" name="horaInicio" className="input" onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, inicio: e.target.value })} />
        </div>
        <div className="input_pai">
          <p>Hora Fim:</p>
          <input type="time" name="horaFim" className="input" onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, fim: e.target.value })} />
        </div>
      </div>

      <div className="btn-juntos">
        <button className="btn-rosa" onClick={onConfirm}>Concluir</button>
        <button className="btn-branco" onClick={() => setPopupCadastroExcecao(false)}>Cancelar</button>
      </div>
    </Popup>
  );
}

function PopupEditarExcecao({ novoHorarioExcecao, setPopupEditarExcecao, onConfirm, setNovoHorarioExcecao, setExcecaoEditando }) {
  // Função para deletar exceção
  const handleDelete = async () => {
    if (!novoHorarioExcecao.id) return;
    if (window.confirm("Tem certeza que deseja excluir esta exceção?")) {
      try {
        await deletarExcecao(novoHorarioExcecao.id);
        setPopupEditarExcecao(false);
        mensagemSucesso("Exceção excluída com sucesso!");
        setNovoHorarioExcecao({});
        setExcecaoEditando(null);
        // Atualiza lista após exclusão
        buscarHorarioExcecao().then(data => {
          if (Array.isArray(data)) {
            setFuncionamentoExcecao(data.filter(item => item.funcionario?.id === usuario.id));
          }
        });
      } catch (error) {
        console.error("Erro ao excluir exceção:", error);
        mensagemErro("Erro ao excluir exceção. Tente novamente mais tarde.");
      }
    }
  };
  return (
    <Popup>
      <p className="paragrafo-1 semibold">Editar Horário de Exceção:</p>
      <div className="line">
        <div className="input_pai">
          <p className="paragrafo-2">Status:</p>
          <select name="status" id="" className="select" style={{ width: '100%' }} value={novoHorarioExcecao.aberto === 1 ? "aberto" : "fechado"} onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, aberto: e.target.value === "aberto" ? 1 : 0 })}>
            <option value="aberto">Aberto</option>
            <option value="fechado">Fechado</option>
          </select>
        </div>
        <div className="input_pai">
          <p>Capacidade:</p>
          <input type="number" name="capacidade" className="input" placeholder="Digite o número" min="0" value={novoHorarioExcecao.capacidade === undefined ? '' : novoHorarioExcecao.capacidade} onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, capacidade: Number(e.target.value) })} />
        </div>
      </div>

      <div className="line">
        <div className="input_pai">
          <p>Data Início:</p>
          <input type="date" name="dataInicio" className="input" value={novoHorarioExcecao.dataInicio || ''} onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, dataInicio: e.target.value })} />
        </div>
        <div className="input_pai">
          <p>Data Fim:</p>
          <input type="date" name="dataFim" className="input" value={novoHorarioExcecao.dataFim || ''} onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, dataFim: e.target.value })} />
        </div>
      </div>

      <div className="line">
        <div className="input_pai">
          <p>Hora Início:</p>
          <input type="time" name="horaInicio" className="input" value={novoHorarioExcecao.inicio || ''} onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, inicio: e.target.value })} />
        </div>
        <div className="input_pai">
          <p>Hora Fim:</p>
          <input type="time" name="horaFim" className="input" value={novoHorarioExcecao.fim || ''} onChange={(e) => setNovoHorarioExcecao({ ...novoHorarioExcecao, fim: e.target.value })} />
        </div>
      </div>

      <div className="btn-juntos">
        <button className="btn-rosa" onClick={onConfirm}>Salvar</button>
        <button className="btn-branco" onClick={() => setPopupEditarExcecao(false)}>Cancelar</button>
        <button className="btn-vermelho" onClick={handleDelete}>Excluir</button>
      </div>
    </Popup>
  );
}

// Validação centralizada para horários padrão e exceção
function validateHorario(obj, tipo = "excecao") {
  // tipo: "excecao" ou "padrao"
  const { aberto, capacidade, dataInicio, dataFim, inicio, fim } = obj;
  // Aceita aberto como 0 ou 1
  if ((aberto !== 0 && aberto !== 1) || capacidade === undefined || capacidade === "" || !inicio || !fim) {
    return { ok: false, mensagem: "Preencha todos os campos obrigatórios e use valores válidos." };
  }
  if (tipo === "excecao") {
    if (!dataInicio || !dataFim) {
      return { ok: false, mensagem: "Preencha todos os campos de data." };
    }
    if (new Date(dataFim) < new Date(dataInicio)) {
      return { ok: false, mensagem: "A data final deve ser igual ou posterior à data inicial." };
    }
    if (dataInicio === dataFim && fim <= inicio) {
      return { ok: false, mensagem: "O horário final deve ser maior que o horário inicial." };
    }
  } else {
    if (fim <= inicio) {
      return { ok: false, mensagem: "O horário final deve ser maior que o horário inicial." };
    }
  }
  return { ok: true };
}
