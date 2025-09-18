function listar() {

  let mensagem = "";


  fetch('http://localhost:3000/servicos')
    .then(function (resposta) {
      return resposta.json()
    })
    .then(function (dados) {

      const html = dados.map(dado => {


        let estrela = "";
        let estrelaQtd = Math.round(dado.mediaAvaliacao)

        // estrelas cheias
        for (let i = 1; i <= estrelaQtd; i++) {


          estrela += `<img src="/src/assets/svg/icon_star_outline.svg" alt="star">`;

          if (estrelaQtd < 5 && i == estrelaQtd) {
            for (let ix = i; ix < 5; ix++) {
              estrela += `<img src="/src/assets/svg/icon_star_filled.svg" alt="star">`;
            }
          }
        }

        return `
        <div className="catalogo_section_card shadow">
          <div className="catalogo_section_title">
            <p className="paragrafo-1 bold" style="color: var(--rosa-4);">${dado.nome}</p>
          </div>
          <div className="catalogo_section_conteudo">
            <p className="paragrafo-2">${dado.descricao}</p>
            <div className="catalogo_section_infos">
              
              <!-- COMPONENTE - ESTRELAS -->
              <div className="estrelas">
                ${estrela}
              </div>

              <div className="info">
                <img src="/src/assets/vector/icon_horariio/ionicons/sharp/time-sharp.svg" alt="icon-horario">
                <p className="paragrafo-2">${dado.tempo}</p>
              </div>
              <div className="info">
                <img src="/src/assets/vector/icon_dinheiro/ionicons/sharp/cash-sharp.svg" alt="icon-dinheiro">
                <p className="paragrafo-2">A partir de R$${dado.preco}</p>
              </div>
              <button className="btn-rosa" value="${dado.id}">
                <img src="/src/assets/vector/icon_sum/jam-icons/outline & logos/Vector.svg" alt=" icon-sum">Agendar
              </button>
            </div>
          </div>
        </div>
        `
      }).forEach(dado => mensagem += dado);

      catalogo_section_lista.innerHTML = mensagem
    })
    .catch()


}