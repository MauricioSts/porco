import { useState } from "react";
import api from "../api";

function SaldoAtual({
  saldo,
  setSaldo,
  setSaldoAnterior,
  setHistorico,
  data,
  setData,
  setDataAnterior,
}) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoSaldo, setNovoSaldo] = useState("");

  const handleAtualizar = async () => {
    if (!novoSaldo) return alert("Digite um valor válido!");
    const valorNumerico = parseFloat(novoSaldo);
    if (isNaN(valorNumerico)) return alert("Valor inválido!");

    const novaData = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    try {
      const res = await api.post("/financas", {
        valor: valorNumerico,
        data: novaData,
      });

      setSaldoAnterior(saldo);
      setDataAnterior(data);
      setSaldo(valorNumerico);
      setData(new Date(res.data.data).toLocaleDateString("pt-BR"));
      setHistorico((prev) => [
        { id: res.data.id, valor: valorNumerico, data: novaData },
        ...prev,
      ]);
      setNovoSaldo("");
      setMostrarModal(false);
    } catch (err) {
      console.error("Erro ao salvar saldo:", err);
      alert("Erro ao salvar saldo");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6 my-4">
      <h2 className="text-gray-700 text-xl font-bold mb-2">Saldo atual</h2>
      <h3 className="text-green-600 text-lg font-semibold mb-1">
        R$ {saldo.toFixed(2)}
      </h3>
      <h4 className="text-gray-500 text-sm">Última atualização: {data}</h4>

      <button
        onClick={() => setMostrarModal(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Atualizar Saldo
      </button>

      {mostrarModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Atualizar Saldo
            </h2>
            <input
              type="number"
              placeholder="Novo valor"
              value={novoSaldo}
              onChange={(e) => setNovoSaldo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleAtualizar}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SaldoAtual;
