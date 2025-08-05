'use client';
import { useState } from 'react';

export default function ModalPueblo({ show, onClose, subCategoria, onBack, onNext }) {
  const opciones = [
    { id: 'coloniales', label: 'Coloniales', icon: '/imagenes/pueblo/pueblo1.svg' },
    { id: 'naturaleza', label: 'Naturaleza', icon: '/imagenes/pueblo/pueblo2.svg' },
    { id: 'artesanias', label: 'Artesanias', icon: '/imagenes/pueblo/pueblo3.svg' },
    { id: 'gastronomia', label: 'Gastronomía', icon: '/imagenes/pueblo/pueblo4.svg' },
    { id: 'pueblos magicos', label: 'Pueblos mágicos', icon: '/imagenes/pueblo/pueblo5.svg' },
  ];

  const [seleccionado, setSeleccionado] = useState(null);
  const fila1 = opciones.slice(0, 3);
  const fila2 = opciones.slice(3);

  const toggleSeleccion = (opcionId) => {
    setSeleccionado(prev => (prev === opcionId ? null : opcionId));
  };

  const handleSiguiente = () => {
    if (seleccionado) {
      onNext({ subcategoria: seleccionado });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-3xl shadow-xl transform transition-all duration-300 ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">¿Qué tipo de pueblo buscas?</h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Elige una opción</p>
        </div>

        {/* Primera fila */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {fila1.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => toggleSeleccion(opcion.id)}
              className={`flex flex-col items-center justify-center cursor-pointer gap-2 p-4 rounded-xl border-2 w-28 h-32 md:w-36 md:h-40 transition-all ${
                seleccionado === opcion.id
                  ? 'border-green-500 bg-green-50 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-md'
              }`}
            >
              <img src={opcion.icon} alt={opcion.label} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              <span className="text-sm md:text-base font-medium text-gray-700 text-center">{opcion.label}</span>
            </button>
          ))}
        </div>

        {/* Segunda fila */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {fila2.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => toggleSeleccion(opcion.id)}
              className={`flex flex-col items-center justify-center cursor-pointer gap-2 p-4 rounded-xl border-2 w-28 h-32 md:w-36 md:h-40 transition-all ${
                seleccionado === opcion.id
                  ? 'border-green-500 bg-green-50 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-md'
              }`}
            >
              <img src={opcion.icon} alt={opcion.label} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              <span className="text-sm md:text-base font-medium text-gray-700 text-center">{opcion.label}</span>
            </button>
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border cursor-pointer border-gray-300 hover:bg-gray-100 transition"
          >
            Cerrar
          </button>
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border cursor-pointer border-gray-300 hover:bg-gray-100 transition"
          >
            Volver
          </button>
          <button
            onClick={handleSiguiente}
            disabled={!seleccionado}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              !seleccionado
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
