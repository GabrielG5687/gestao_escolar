export default function ProjetosPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
        <button className="btn btn-primary">Novo Projeto</button>
      </div>

      <div className="card">
        <p className="text-gray-500">Nenhum projeto criado ainda.</p>
      </div>
    </div>
  );
}
