import { TemaProvider } from "./src/contexts/TemaContext";
import Rotas from "./src/rotas";

export default function App() {
  return (
    <TemaProvider>
      <Rotas />
    </TemaProvider>
  );
}