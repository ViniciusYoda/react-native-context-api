import { TemaProvider } from "./src/contexts/TemaContext";
import { AutenticacaoProvider } from "./src/contexts/AutenticacaoContext";
import { ProdutosProvider } from "./src/contexts/ProdutosContext";
import Rotas from "./src/rotas";

export default function App() {
  return (
    <TemaProvider>
      <AutenticacaoProvider>
        <ProdutosProvider>
          <Rotas />
        </ProdutosProvider>
      </AutenticacaoProvider>
    </TemaProvider>
  );
}