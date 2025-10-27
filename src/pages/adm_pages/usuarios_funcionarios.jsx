import { useEffect, useState } from "react";
import MenuDash from "../../components/MenuDash";
import UsuariosHeader from "../../components/UsuariosHeader";
import CardCliente from "../../components/CardCliente";
import FormularioCriarFuncionario from "../../components/FormularioCriarFuncionario";
import FuncionarioDetalhes from "../../components/FuncionarioDetalhes";
import { listarFuncionarios } from "../../js/api/kaua";
import { mensagemErro } from "../../js/utils";
import "../../css/pages/adm_pages/usuarios/clientes.css";

export default function Usuarios_funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [idFuncionarioSelecionado, setIdFuncionarioSelecionado] = useState(null);

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const buscarFuncionarios = async () => {
    try {
      const data = await listarFuncionarios();
      setFuncionarios(data);
    } catch (error) {
      mensagemErro("Erro ao carregar funcionários.");
    }
  };

  return (
    <MenuDash>
      <UsuariosHeader
        tipo="funcionarios"
        onButtonClick={() => setMostrarForm(true)}
        iconSrc="/src/assets/icons/plus-icon.svg"
      />

      <div className="dash_section_container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {funcionarios.map((f) => (
          <CardCliente
            key={f.id}
            nome={f.nome}
            email={f.email}
            telefone={f.telefone}
            foto={f.foto || "/src/assets/img/foto_perfil.png"}
            exibirPendencias={false}
            onEditar={() => setMostrarForm(true)}
            onDetalhes={() => setIdFuncionarioSelecionado(f.id)}
          />
        ))}
      </div>

      {mostrarForm && (
        <FormularioCriarFuncionario
          onClose={() => setMostrarForm(false)}
          atualizarFuncionarios={buscarFuncionarios}
        />
      )}

      {idFuncionarioSelecionado && (
        <FuncionarioDetalhes
          idFuncionario={idFuncionarioSelecionado}
          onClose={() => setIdFuncionarioSelecionado(null)}
        />
      )}
    </MenuDash>
  );
}
