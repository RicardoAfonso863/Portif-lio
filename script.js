const botaoMenu = document.querySelector("#botaoMenu");
const menu = document.querySelector("#menu");
const botoesFiltro = document.querySelectorAll("[data-filtro]");
const projetos = document.querySelectorAll("[data-categoria]");
const modal = document.querySelector("#modalProjeto");
const modalTitulo = document.querySelector("#modalTitulo");
const modalTexto = document.querySelector("#modalTexto");
const botaoFechar = document.querySelector(".modal-fechar");

const detalhes = {
  amigos: {
    titulo: "Meus amigos",
    texto: "Aqui você pode colocar fotos, nomes e uma pequena descrição de cada amigo. Este botão já abre um espaço interativo para apresentar essas informações."
  },
  rotina: {
    titulo: "Minha rotina",
    texto: "Use este espaço para contar como é o seu dia: estudos, atividades, lazer e os momentos que são importantes para você."
  },
  lugares: {
    titulo: "Lugares que já fui",
    texto: "Aqui você pode adicionar fotos e histórias dos lugares que visitou com amigos e familiares."
  }
};

function fecharMenu() {
  if (!botaoMenu || !menu) return;
  menu.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
}

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", () => {
    const estaAberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", String(estaAberto));
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));
}

botoesFiltro.forEach((botao) => {
  botao.addEventListener("click", () => {
    const filtro = botao.dataset.filtro;
    botoesFiltro.forEach((item) => item.classList.remove("ativo"));
    botao.classList.add("ativo");

    projetos.forEach((projeto) => {
      const deveAparecer = filtro === "todos" || projeto.dataset.categoria === filtro;
      projeto.hidden = !deveAparecer;
    });
  });
});

function abrirModal(chave) {
  const detalhe = detalhes[chave];
  if (!detalhe || !modal || !modalTitulo || !modalTexto) return;
  modalTitulo.textContent = detalhe.titulo;
  modalTexto.textContent = detalhe.texto;
  modal.classList.add("visivel");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("sem-rolagem");
  botaoFechar?.focus();
}

function fecharModal() {
  if (!modal) return;
  modal.classList.remove("visivel");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("sem-rolagem");
}

document.querySelectorAll("[data-projeto]").forEach((botao) => {
  botao.addEventListener("click", () => abrirModal(botao.dataset.projeto));
});

botaoFechar?.addEventListener("click", fecharModal);
modal?.addEventListener("click", (evento) => {
  if (evento.target === modal) fecharModal();
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") fecharModal();
});
