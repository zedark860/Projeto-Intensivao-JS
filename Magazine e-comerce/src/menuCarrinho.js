import { catalogo } from "./utilidades";
import { renderizarCatalogo } from "./cartaoProduto";

const idsProdutoCarrinhoComQuantidade = {

}

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

function removerDoCarrinho(idProduto){
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto){
  if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
    removerDoCarrinho(idProduto);
    return;
  }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto){
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById('produtos-carrinho');

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    'flex', 
    'bg-white', 
    'rounded-md', 
    'p-1', 
    'relative'
  ];

  for(const articleClass of articleClasses){
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-1"><i class="fa-regular fa-circle-xmark text-red-600 hover:bg-red-400 rounded-full duration-500"></i></button>
  <img src="assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-md">
  <div class="p-2 flex flex-col justify-between">
    <p class="text-black text-sm">${produto.nome}</p>
    <p class="text-slate-400 text-xs">Tamanho: M</p>
    <p class="text-green-700 text-lg">$${produto.preco}</p>
  </div>
  <div class="flex text-black items-end absolute bottom-0 right-2 text-lg">
    <button id="incrementar-produto-${produto.id}" class="mr-2 text-lime-500 hover:scale-[1.7] duration-500">+</button>
    <p id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
    <button id="decrementar-produto-${produto.id}" class="ml-2 text-red-600 hover:scale-[1.7] duration-500">-</button>
  </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));
  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

  document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}

function renderizarProdutosCarrinho(){
  const containerProdutosCarrinho = document.getElementById('produtos-carrinho');
  containerProdutosCarrinho.innerHTML = "";

  for(const idProduto in idsProdutoCarrinhoComQuantidade){
    desenharProdutoNoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
  if(idProduto in idsProdutoCarrinhoComQuantidade){
    incrementarQuantidadeProduto(idProduto);
    return;
  }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    desenharProdutoNoCarrinho(idProduto);
}