import { desenharProdutoCarrinhoSimples, lerLocalStorage, apagarDoLocalStorage, salvarLocalStorage } from "./src/utilidades";
import { atualizarPrecoCarrinho } from "./src/menuCarrinho";

function desenharProdutoCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    for(const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoCarrinhoSimples(idProduto, 'container-produtos-checkout', idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

function finalizarCompra(evt) {
    evt.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }

    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizados = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage('historico', historicoDePedidosAtualizados);
    apagarDoLocalStorage('carrinho');

    window.location.href = window.location.origin + '/pedidos.html';
}

desenharProdutoCheckout();
atualizarPrecoCarrinho();

document.addEventListener('submit', (evt) => finalizarCompra(evt));


