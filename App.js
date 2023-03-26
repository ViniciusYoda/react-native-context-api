import { TemaProvider } from "./src/contexts/TemaContext";
import { AutenticacaoProvider } from "./src/contexts/AutenticacaoContext";
import Rotas from "./src/rotas";

export default function App() {
  return (
    <TemaProvider>
      <AutenticacaoProvider>
        <Rotas />
      </AutenticacaoProvider>
    </TemaProvider>
  );
}