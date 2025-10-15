// src/components/SaldoAtual.jsx
import React from "react";

function SaldoAtual() {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 my-4">
      <h2 className="text-gray-700 text-xl font-bold mb-2">Saldo atual</h2>
      <h3 className="text-green-600 text-lg font-semibold mb-1">R$ 100,00</h3>
      <h4 className="text-gray-500 text-sm">Última atualização: 01/01/2023</h4>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Atualizar Saldo
      </button>
    </div>
  );
}

export default SaldoAtual;
