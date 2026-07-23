document.addEventListener("DOMContentLoaded", () => {
    fetch("/codelab-project/data/atividades.json")
        .then(response => response.json())
        .then(dados => {
            renderizarAtuais(dados.atuais);
            renderizarProximas(dados.proximas);
            configurarCarrossel(dados.proximas.length);
        })
        .catch(erro => console.error("Erro ao carregar atividades:", erro));
});

function renderizarAtuais(atuais) {
    const container = document.getElementById("atuais-lista");

    atuais.forEach(atividade => {
        const item = document.createElement("div");
        item.className = "atividade-atual";

        item.innerHTML = `
            <div class="icone-atual"></div>
            <div class="atividade-atual-info">
                <h3>${atividade.nome}</h3>
                <p>${atividade.descricao}</p>
            </div>
        `;

        container.appendChild(item);
    });
}

function renderizarProximas(proximas) {
    const container = document.getElementById("proximas-lista");
    const baseurl = "/codelab-project";

    proximas.forEach(atividade => {
        const item = document.createElement("div");
        item.className = "atividade-proxima";

        item.innerHTML = `
            <img src="${baseurl}${atividade.imagem}" alt="${atividade.nome}">
            <h3>${atividade.nome}</h3>
            <span>${atividade.inicio} - ${atividade.fim}</span>
        `;

        container.appendChild(item);
    });
}

function configurarCarrossel(totalItens) {
    const lista = document.getElementById("proximas-lista");
    const btnAnterior = document.getElementById("btn-anterior");
    const btnProximo = document.getElementById("btn-proximo");

    const itensPorPagina = 3;
    let paginaAtual = 0;
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    function atualizarCarrossel() {
        const deslocamento = paginaAtual * 100;
        lista.style.transform = `translateX(-${deslocamento}%)`;

        btnAnterior.disabled = paginaAtual === 0;
        btnProximo.disabled = paginaAtual === totalPaginas - 1;
    }

    btnAnterior.addEventListener("click", () => {
        if (paginaAtual > 0) {
            paginaAtual--;
            atualizarCarrossel();
        }
    });

    btnProximo.addEventListener("click", () => {
        if (paginaAtual < totalPaginas - 1) {
            paginaAtual++;
            atualizarCarrossel();
        }
    });

    atualizarCarrossel();
}