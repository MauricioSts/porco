// src/components/HistoricoDeValores.jsx
import React from "react";

function HistoricoDeValores() {
  // Exemplo de dados
  const registros = [
    { id: 1, valor: 100, data: "01/01/2023" },
    { id: 2, valor: -50, data: "05/01/2023" },
    { id: 3, valor: -20, data: "10/01/2023" },
    { id: 4, valor: 200, data: "15/01/2023" },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 my-4">
      <h2 className="text-gray-700 text-xl font-bold mb-4">Histórico de Valores</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-right px-4 py-2 border-b">Valor (R$)</th>
              <th className="text-center px-4 py-2 border-b">Data</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id} className="hover:bg-gray-50">
                <td className={`px-4 py-2 border-b text-right ${registro.valor >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {registro.valor.toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b text-center">{registro.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoricoDeValores;
