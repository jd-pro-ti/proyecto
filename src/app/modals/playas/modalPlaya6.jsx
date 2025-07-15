'use client';
import { useState } from 'react';

export default function ModalPlaya6({ show, onClose, onNext, onBack }) {
  const pueblos = [
    { id: 'mariscos', nombre: 'mariscos', icono: '/imagenes/playa/playa20.svg' },
    { id: 'tradicional', nombre: 'bebidas', icono: '/imagenes/playa/playa21.svg' },
    { id: 'pescado frito', nombre: 'pescado frito', icono: '/imagenes/playa/playa22.svg' },
    { id: 'vegetariana', nombre: 'vegetariana', icono: '/imagenes/playa/playa23.svg' },
    { id: 'calamar', nombre: 'calamar', icono: '/imagenes/playa/playa24.svg' },
    { id: 'cualquiera', nombre: 'Coctel', icono: '/imagenes/playa/playa25.svg' },
  ];

  const [seleccionado, setSeleccionado] = useState(null); // Cambiado a un solo valor

  const togglePueblo = (pueblo) => {
    setSeleccionado(prev => prev === pueblo ? null : pueblo); // Selección única
  };

  const handleSiguiente = () => {
    if (seleccionado) {
      onNext(seleccionado); // Envía solo el ID seleccionado
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">¿Qué le interesa comer?</h2>
          <p className="text-gray-500 mt-2 text-sm">Seleccione una o más opciones</p> {/* Texto actualizado */}
        </div>

        {/* Contenedor con scroll vertical */}
        <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto mb-6 p-2">
          {pueblos.map((pueblo) => (
            <button
              key={pueblo.id}
              onClick={() => togglePueblo(pueblo.id)}
              className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 min-w-[100px] transition-all cursor-pointer ${
                seleccionado === pueblo.id
                  ? 'border-green-500 bg-green-50 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <img 
                src={pueblo.icono} 
                alt={pueblo.nombre} 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xs font-medium text-gray-700 text-center">
                {pueblo.nombre}
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