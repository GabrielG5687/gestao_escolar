export default function ObservacoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Observações</h1>
        <button className="btn btn-primary">Nova Observação</button>
      </div>

      <div className="card">
        <p className="text-gray-500">Nenhuma observação registrada ainda.</p>
      </div>
    </div>
  );
}
