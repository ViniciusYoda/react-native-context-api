import { createContext, useEffect, useState } from 'react'
import { pegarProdutos, salvarProduto, removerProduto } from '../servicos/requisicoes/produtos'

export const ProdutosContext = createContext({})

export function ProdutosProvider({children}) {
   const [quantidade, setQuantidade] = useState(0)
   const [carrinho,setCarrinho] = useState([])
   const [ultimosVistos, setUltimosVistos] = useState(0)
   const [precoTotal, setPrecoTotal] = useState(0);

   useEffect(async () => {
      const resultado = await pegarProdutos();
      if(resultado.length > 0){
         setCarrinho(resultado)
         setQuantidade(resultado.length)
      }

   }, [])

   async function viuProduto(produto){
      const resultado = await salvarProduto(produto)
      const novoItemCarrinho = [...carrinho, resultado]
      setCarrinho(novoItemCarrinho);

      let novoUltimosVistos = new Set(ultimosVistos)
      novoUltimosVistos.add(produto)
      setUltimosVistos([...novoUltimosVistos]);

      setQuantidade(quantidade + 1);
      let novoPrecoTotal = precoTotal + produto.preco;
      setPrecoTotal(novoPrecoTotal);
   }

   async function finalizarCompra() {
      try {
         carrinho.forEach(async produto => {
            await removerProduto(produto);
         })
         setQuantidade(0)
         setPrecoTotal(0)
         setCarrinho([]);
         return 'Compra finalizada com sucesso!';
      }
      catch(erro){
         return 'Erro ao finalizar a compra, tente novamente';
      }
   }

   return(
      <ProdutosContext.Provider
         value={{
            quantidade,
            carrinho,
            ultimosVistos,
            viuProduto,
            precoTotal,
            finalizarCompra,
         }}
      >
         {children}
      </ProdutosContext.Provider>
   )
}