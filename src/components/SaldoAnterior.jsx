// src/components/SaldoAnterior.jsx
import React from "react";

function SaldoAnterior() {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 my-4">
      <h2 className="text-gray-700 text-xl font-bold mb-2">Saldo anterior</h2>
      <h3 className="text-blue-600 text-lg font-semibold mb-1">R$ 100,00</h3>
      <h4 className="text-gray-500 text-sm">Última atualização: 01/01/2023</h4>
    </div>
  );
}

export default SaldoAnterior;
