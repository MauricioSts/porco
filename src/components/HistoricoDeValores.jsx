import React from "react";

function HistoricoDeValores({ historico }) {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 my-4">
      <h2 className="text-gray-700 text-xl font-bold mb-4">
        Histórico de Valores
      </h2>

      {historico.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum registro ainda.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-right px-4 py-2 border-b">Valor (R$)</th>
                <th className="text-center px-4 py-2 border-b">Data</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td
                    className={`px-4 py-2 border-b text-right ${
                      item.valor >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.valor.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b text-center">{item.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoricoDeValores;
