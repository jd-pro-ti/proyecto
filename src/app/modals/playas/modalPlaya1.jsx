'use client';
import { useState } from 'react';

export default function ModalPlaya1({ show, onClose, onNext, onBack }) {
  const opciones = [
    { id: 'playa_azul', label: 'Playa azul', icon: '/imagenes/playa/playa3.svg' },
    { id: 'maruata', label: 'Maruata', icon: '/imagenes/playa/playa2.svg' },
    { id: 'Caleta de Campos', label: 'Caleta de Campos', icon: '/imagenes/playa/playa1.svg' },
    { id: 'nexpa', label: 'Nexpa', icon: '/imagenes/playa/playa4.svg' },
    { id: 'faro_bucerias', label: 'Faro de Bucerías', icon: '/imagenes/playa/playa5.svg' },
    { id: 'la_ticla', label: 'La Ticla', icon: '/imagenes/playa/playa6.svg' },  
    { id: 'gixtapilla', label: 'GIxtapilla', icon: '/imagenes/playa/playa7.svg' },        
    { id: 'colola', label: 'Colola', icon: '/imagenes/playa/playa8.svg' },    
    { id: 'san_juan_alima', label: 'San Juan de Alima', icon: '/imagenes/playa/playa9.svg' },
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Selecciona una playa de Michoacán</h2>
          <p className="text-gray-500 mt-2 text-sm">Elige una o más opciones</p>
        </div>

        {/* Contenedor con grid 3 columnas, scroll vertical y máximo alto */}
        <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto mb-6 p-2">
          {opciones.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => toggleOpcion(opcion.id)}
              className={`flex flex-col items-center justify-center cursor-pointer gap-1 p-3 rounded-xl border-2 min-w-[100px] transition-all ${
                seleccionadas.includes(opcion.id)
                  ? 'border-green-500 bg-green-50 shadow-inner'
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
            onClick={onBack}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border cursor-pointer border-gray-300 hover:bg-gray-100 transition"
          >
            Volver
          </button>
          <button
            onClick={handleSiguiente}
            disabled={seleccionadas.length === 0}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              seleccionadas.length === 0
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
