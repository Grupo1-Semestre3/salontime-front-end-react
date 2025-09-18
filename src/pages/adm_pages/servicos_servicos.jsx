import { useNavigate } from "react-router-dom";
import MenuDash from "../../components/MenuDash";
import NavServicos from "../../components/NavServicos";

export default function Servicos_servicos() {
    const navigate = useNavigate();
    return (
        <>
            <MenuDash />
            <div className="dash_section_filho">
                {/* COMPONENTE - MINI */}
                <NavServicos />
                <div className="dash_section_container">
                    <div className="dash_servico_section_2">
                        <h1>Gerenciar Serviços</h1>
                        <button className="btn-rosa">
                            <img
                                src = "src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg"
                                alt=""
                            />
                            Criar Serviço
                        </button>
                    </div>
                    <div className="dash_servico_servico_pai">
                        <div className="dash_servico_servico">
                            <div className="dash_servico_servico_nome">
                                <h1 className="paragrafo-1 branco">Nome do Serviço</h1>
                            </div>
                            <div className="dash_servico_servico_util">
                                <div className="dash_servico_servico_descricao">
                                    <p>Breve descrição do serviço</p>
                                    <p>Breve descrição do serviço</p>
                                    <p>Breve descrição do serviço</p>
                                </div>
                                <div className="dash_servico_servico_info_filho">
                                    <img src="src/assets/svg/time-sharp.svg" alt="" />
                                    <p>Tempo médio: </p>
                                    <p>10min</p>
                                </div>
                                <div className="dash_servico_servico_info_filho">
                                    <img src="src/assets/svg/cash-sharp.svg" alt="" />
                                    <p>A partir de: R$</p>
                                    <p>000,00</p>
                                </div>
                                <div className="dash_servico_servico_info_filho">
                                    <img src="src/assets/svg/flag-sharp.svg" alt="" />
                                    <p>Status: </p>
                                    <p>Simultâneo</p>
                                </div>
                                <div className="dash_servico_servico_button btn-juntos">
                                    <button className="btn-rosa">Editar</button>
                                    <button className="btn-branco">Desativar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


        