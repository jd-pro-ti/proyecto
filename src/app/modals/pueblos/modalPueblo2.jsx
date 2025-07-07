'use client';

import { useState } from 'react';

export default function ModalPlaya({ show, onClose, onNext }) {
  const opciones = [
    { id: 'talleres', label: 'Talleres', icon: '/imagenes/pueblo/pueblo6.svg' },
    { id: 'mercados', label: 'Mercados', icon: '/imagenes/pueblo/pueblo7.svg' },
    { id: 'comida tipica', label: 'Comida tipica', icon: '/imagenes/pueblo/pueblo8.svg' },
    { id: 'recorridos turisticos', label: 'Recorridos turisticos', icon: '/imagenes/pueblo/pueblo9.svg' },
    { id: 'paisajes', label: 'Paisajes', icon: '/imagenes/pueblo/pueblo10.svg' },
  ];

  const [seleccionadas, setSeleccionadas] = useState([]);

  const toggleOpcion = (opcion) => {
    setSeleccionadas((prev) =>
      prev.includes(opcion)
        ? prev.filter((o) => o !== opcion)
        : [...prev, opcion]
    );
  };

  const handleSiguiente = () => {
    if (seleccionadas.length > 0) {
      onNext(seleccionadas);
    }
  };

  
  const fila1 = opciones.slice(0, 3); 
  const fila2 = opciones.slice(3);    

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">¿Qué experiencia te gustaria vivir?</h2>
          <p className="text-gray-500 mt-2 text-sm">Elige una o más opciones</p>
        </div>

        {/* Primera fila horizontal */}
        <div className="flex justify-center gap-3 mb-3">
          {fila1.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => toggleOpcion(opcion.id)}
              className={`flex flex-col items-center justify-center cursor-pointer gap-1 p-3 rounded-xl border-2 min-w-[100px] transition-all ${
                seleccionadas.includes(opcion.id)
                   ? 'border-green-500 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <img 
                src={opcion.icon} 
                alt={opcion.label} 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xs font-medium text-gray-700 text-center">
                {opcion.label}
              </span>
            </button>
          ))}
        </div>

        {/* Segunda fila horizontal */}
        <div className="flex justify-center gap-3 mb-6">
          {fila2.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => toggleOpcion(opcion.id)}
              className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 min-w-[100px] transition-all cursor-pointer ${
                seleccionadas.includes(opcion.id)
                  ? 'border-green-500 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <img 
                src={opcion.icon} 
                alt={opcion.label} 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xs font-medium text-gray-700 text-center">
                {opcion.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border cursor-pointer border-gray-300 hover:bg-gray-100 transition"
          >
            Cerrar
          </button>
          <button
            onClick={handleSiguiente}
            disabled={seleccionadas.length === 0}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              seleccionadas.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white-600 hover:bg-green-700 text-black shadow-md hover:shadow-lg'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}