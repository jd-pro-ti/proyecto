'use client';

export default function ModalInicio({ show, onClose, onSelect }) {
  const handleSelect = (opcion) => {
    onSelect(opcion);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            ¿Qué te gustaría explorar en Michoacán?
          </h2>
          <p className="text-gray-500 mt-1 text-sm">Recibe recomendaciones personalizadas</p>
        </div>

        <div className="flex justify-between gap-2">
          {/* Botón Gastronomía */}
          <button
            onClick={() => handleSelect('gastronomia')}
            className="flex-1 flex flex-col items-center gap-1 bg-white hover:bg-amber-50 border cursor-pointer  border-amber-100 rounded-xl p-3 transition-all hover:shadow-md"
          >
            <img src="/imagenes/gatro.svg" alt="Gastronomía" className="w-20 h-20" />
            <span className="text-sm font-medium text-gray-700">Gastronomía</span>
          </button>

          {/* Botón Playas */}
          <button
            onClick={() => handleSelect('playa')}
            className="flex-1 flex flex-col items-center gap-1 cursor-pointer bg-white hover:bg-blue-50 border border-blue-100 rounded-xl p-1 transition-all hover:shadow-md"
          >
            <img src="/imagenes/playas.svg" alt="Playas" className="w-20 h-20" />
            <span className="text-sm font-medium text-gray-700">Playas</span>
          </button>

          {/* Botón Pueblos Mágicos */}
          <button
            onClick={() => handleSelect('pueblos')}
            className="flex-1 flex flex-col items-center gap-1 bg-white hover:bg-purple-50 border cursor-pointer border-purple-100 rounded-xl p-3 transition-all hover:shadow-md"
          >
            <img src="/imagenes/pueblo.svg" alt="Pueblos" className="w-20 h-20" />
            <span className="text-sm font-medium text-gray-700">Pueblos</span>
          </button>
        </div>

        {/* Botón Cerrar (sin cambios) */}
        <button
          onClick={onClose}
          className="mt-6 mx-auto px-4 py-2 text-gray-500 hover:text-gray-700 cursor-pointer transition font-medium text-sm"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}