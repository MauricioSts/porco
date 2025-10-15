function SaldoAnterior({ saldoAnterior, dataAnterior }) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 my-4">
      <h2 className="text-gray-700 text-xl font-bold mb-2">Saldo anterior</h2>
      <h3 className="text-blue-600 text-lg font-semibold mb-1">
        R$ {saldoAnterior.toFixed(2)}
      </h3>
      <h4 className="text-gray-500 text-sm">
        Última atualização: {dataAnterior}
      </h4>
    </div>
  );
}

export default SaldoAnterior;
