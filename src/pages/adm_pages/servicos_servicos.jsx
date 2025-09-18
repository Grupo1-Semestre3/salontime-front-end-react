import { useNavigate } from "react-router-dom";
import MenuDash from "../../components/MenuDash";
import NavServicos from "../../components/NavServicos";

function ServicoCard({ servico }) {
  return (
    <>
      <div className="dash_servico_servico">
        <div className="dash_servico_servico_nome">
          <h1 className="paragrafo-1 branco semibold ">Nome do Serviço</h1>
        </div>
        <div className="dash_servico_servico_util">
          <div className="dash_servico_servico_descricao">
            <p>Breve descrição do serviço</p>
            <p>Breve descrição do serviço</p>
            <p>Breve descrição do serviço</p>
          </div>
          <div className="dash_servico_servico_info_filho">
            <img src="/src/assets/svg/time-sharp.svg" alt="" />
            <p>Tempo médio: </p>
            <p>10min</p>
          </div>
          <div className="dash_servico_servico_info_filho">
            <img src="/src/assets/svg/cash-sharp.svg" alt="" />
            <p>A partir de: R$</p>
            <p>000,00</p>
          </div>
          <div className="dash_servico_servico_info_filho">
            <img src="/src/assets/svg/flag-sharp.svg" alt="" />
            <p>Status: </p>
            <p>Simultâneo</p>
          </div>
          <div className="dash_servico_servico_button btn-juntos">
            <button className="btn-rosa" style={{ width: "120px"}}>Editar</button>
            <button className="btn-branco" style={{ width: "120px"}}>Desativar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Servicos_servicos() {
  return (
    <>
      <MenuDash>
        {/* COMPONENTE - MINI */}
        <NavServicos />
        <div className="dash_section_container">
          <div className="dash_servico_section_2">
            <h1>Gerenciar Serviços</h1>
            <button className="btn-rosa">
              <img
                src="/src/assets/vector/icon_sum/jam-icons/Vector.svg"
                alt=""
              />
              Criar Serviço
            </button>
          </div>
          <div className="dash_servico_servico_pai">
            <ServicoCard />
          </div>
        </div>

      </MenuDash>
    </>
  );
}


