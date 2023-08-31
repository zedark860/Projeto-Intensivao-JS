import { catalogo } from "./utilidades";
import { renderizarCatalogo } from "./cartaoProduto";

function abrirCarrinho() {
    document.getElementById('carrinho').classList.add('right-[0px]');
    document.getElementById('carrinho').classList.remove('right-[-360]px');
}

function fecharCarrinho() {
    document.getElementById('carrinho').classList.remove('right-[0px]');
    document.getElementById('carrinho').classList.add('right-[-360]px');
}

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
}

export function adicionarAoCarrinho(idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById('produtos-carrinho');
    const cartaoProdutoCarrinho = `<article class="flex bg-white rounded-md p-1 relative">
    <button class="absolute top-0 right-1"><i class="fa-regular fa-circle-xmark text-red-600 hover:bg-red-400 rounded-full duration-500"></i></button>
    <img src="assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-md">
    <div class="p-1">
      <p class="text-black text-sm">${produto.nome}</p>
      <p class="text-slate-400 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
  </article>`;
  containerProdutosCarrinho.innerHTML += cartaoProdutoCarrinho;
}