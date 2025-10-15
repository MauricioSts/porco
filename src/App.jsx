// src/App.jsx
import SaldoAtual from './components/SaldoAtual';
import SaldoAnterior from './components/SaldoAnterior';
import HistoricoDeValores from './components/HistoricoDeValores';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Cabeçalho */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Olá, Yasmin 👋</h1>

      {/* Cards de saldo */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6">
        <div className="flex-1">
          <SaldoAtual />
        </div>
        <div className="flex-1">
          <SaldoAnterior />
        </div>
      </div>

      {/* Histórico de valores */}
      <div className="w-full max-w-4xl mt-8">
        <HistoricoDeValores />
      </div>
    </div>
  );
}

export default App;
