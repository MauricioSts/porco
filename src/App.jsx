// src/App.jsx
import { useState, useEffect } from "react";
import api from "./api";
import SaldoAtual from "./components/SaldoAtual";
import SaldoAnterior from "./components/SaldoAnterior";
import HistoricoDeValores from "./components/HistoricoDeValores";

function App() {
  const [saldo, setSaldo] = useState(0);
  const [saldoAnterior, setSaldoAnterior] = useState(0);
  const [data, setData] = useState("-");
  const [dataAnterior, setDataAnterior] = useState("-");
  const [historico, setHistorico] = useState([]);

  // 🔹 Busca dados do backend quando o app inicia
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resFinancas = await api.get("/financas");
        const resSaldo = await api.get("/saldo");

        setHistorico(resFinancas.data);
        setSaldo(parseFloat(resSaldo.data.saldo) || 0);

        if (resFinancas.data.length > 0) {
          setData(
            new Date(resFinancas.data[0].data).toLocaleDateString("pt-BR")
          );
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    carregarDados();
  }, []); // ✅ fecha o useEffect corretamente

  // 🔹 retorno do componente
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Olá, Yasmin 👋
      </h1>

      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6">
        <div className="flex-1">
          <SaldoAtual
            saldo={saldo}
            setSaldo={setSaldo}
            setSaldoAnterior={setSaldoAnterior}
            data={data}
            setData={setData}
            setDataAnterior={setDataAnterior}
            setHistorico={setHistorico}
          />
        </div>

        <div className="flex-1">
          <SaldoAnterior
            saldoAnterior={saldoAnterior}
            dataAnterior={dataAnterior}
          />
        </div>
      </div>

      <div className="w-full max-w-4xl mt-8">
        <HistoricoDeValores historico={historico} />
      </div>
    </div>
  );
}

export default App;
