import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function renderizarCatalogo(){
    for(const produtoCatalogo of catalogo) {
        const cartaoProduto = `<div class='border-solid shadow-xl shadow-slate-400 rounded-lg w-48 m-2 flex flex-col p-2 justify-between group' id="card-produto-${produtoCatalogo.id}">
        <img src="./assets/img/${produtoCatalogo.imagem}" alt="Produto-1" class="rounded-lg group-hover:scale-105 duration-500 my-3">
        <p class="text-sm">${produtoCatalogo.marca}</p>
        <p class="text-sm">${produtoCatalogo.nome}</p>
        <p>$${produtoCatalogo.preco}</p>
        <button id="adicionar-${produtoCatalogo.id}" class="bg-black text-white hover:bg-slate-600 duration-500"><i class="fa-solid fa-cart-plus group-hover:scale-110 duration-500"></i></button>
        </div>`;

        document.getElementById('container-produto').innerHTML += cartaoProduto;
    }

    for(const produtoCatalogo of catalogo) {
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    }
}
