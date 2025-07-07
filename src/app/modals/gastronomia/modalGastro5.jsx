'use client';

export default function ModalResultados({ show, onClose, onSearch }) {
  const resultados = [
    {
      nombre: "Uruapan",
      descripcion: "Capital del aguacate y tierra del delicioso chongos zamoranos. Prueba sus tamales de zarzamora.",
    },
    {
       nombre: "Pátzcuaro",
      descripcion: "Famoso por sus carnitas, charales y el tradicional pescado blanco. No te pierdas su plaza llena de puestos gastronómicos.",
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 w-full max-w-4xl shadow-xl transform transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-8">
          <h2  className="text-2xl font-bold text-gray-800">Según tus respuestas creemos que estos podrían ser tus destinos</h2>
        </div>

        {/* Destinos en horizontal */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {resultados.map((resultado, index) => (
            <div key={index} className="flex-1 min-w-[300px] max-w-md bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-green-600 mb-2">{resultado.nombre}</h3>
              <p className="text-gray-600">{resultado.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Botones alineados */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium cursor-pointer rounded-lg transition-all"
          >
            Cerrar
          </button>
          <button
            onClick={onSearch}
            className="px-6 py-3 bg-white-600 hover:bg-green-700 text-black font-medium rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
          >
            Buscar estos destinos
          </button>
        </div>
      </div>
    </div>
  );
}