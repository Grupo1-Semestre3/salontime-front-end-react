import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuDash from "../../components/MenuDash";
import CardCliente from "../../components/CardCliente";
import UsuariosHeader from "../../components/UsuariosHeader";
import { listarClientes } from "../../js/api/kaua";
import { mensagemErro } from "../../js/utils";

export default function Usuarios_clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await listarClientes();
        setClientes(data);
      } catch (error) {
        mensagemErro("Erro ao buscar a lista de clientes.");
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleEditar = (id) => {
    navigate(`/editar-cliente/${id}`);
  };

  const handleDetalhes = (id) => {
    navigate(`/detalhes-cliente/${id}`);
  };

  return (
    <MenuDash>
      <UsuariosHeader
        tipo="clientes"
        onButtonClick={() => navigate("/cadastrar-cliente")}
        iconSrc="src/assets/svg/plus.svg"
      />

      <div
        className="dash_section_container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          flexDirection: "row",
        }}
      >
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <CardCliente
              key={cliente.id}
              nome={cliente.nome}
              email={cliente.email}
              telefone={cliente.telefone}
              foto={cliente.foto}
              pendencias={cliente.pendencias}
              onEditar={() => handleEditar(cliente.id)}
              onDetalhes={() => handleDetalhes(cliente.id)}
            />
          ))
        ) : (
          <p style={{ marginTop: "20px", fontSize: "1.2rem" }}>
            Nenhum cliente encontrado.
          </p>
        )}
      </div>
    </MenuDash>
  );
}