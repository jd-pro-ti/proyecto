'use client';
import React, { useState } from 'react';
import { 
  BotonCerrar, 
  BotonVolver, 
  BotonSiguiente, 
  ContenedorBotones, 
  Espaciador 
} from './modals/botones';

const ModalPueblo = React.memo(function ModalPueblo({ show, onClose, onBack, onNext }) {
  if (!show) return null;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-5 mx-auto">
        {/* Encabezado CENTRADO */}
        <div className="flex flex-col items-center mb-4 relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#364153]">¿Qué tipo de pueblo buscas?</h2>
            <p className="text-[#6A7282] mt-1 text-sm">Elige una opción</p>
          </div>
          <div className="absolute right-0 top-0">
            <BotonCerrar onClick={onClose} />
          </div>
        </div>

        {/* Primera fila */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {fila1.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => toggleSeleccion(opcion.id)}
              className={`flex flex-col items-center justify-center cursor-pointer gap-2 p-4 rounded-xl border-2 w-28 h-32 md:w-36 md:h-40 transition-all ${
                seleccionado === opcion.id
                  ? 'border-[#7CB936] bg-[#7CB936]/10 shadow-inner'
                  : 'border-gray-200 hover:border-[#7CB936]/50 bg-white hover:shadow-md'
              }`}
            >
              <img src={opcion.icon} alt={opcion.label} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              <span className="text-sm md:text-base font-medium text-[#364153] text-center">{opcion.label}</span>
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
                  ? 'border-[#7CB936] bg-[#7CB936]/10 shadow-inner'
                  : 'border-gray-200 hover:border-[#7CB936]/50 bg-white hover:shadow-md'
              }`}
            >
              <img src={opcion.icon} alt={opcion.label} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              <span className="text-sm md:text-base font-medium text-[#364153] text-center">{opcion.label}</span>
            </button>
          ))}
        </div>

        {/* Botones de navegación */}
        <ContenedorBotones>
          <BotonVolver onClick={onBack} />
          <Espaciador />
          <BotonSiguiente 
            onClick={handleSiguiente} 
            disabled={!seleccionado} 
          />
        </ContenedorBotones>
      </div>
    </div>
  );
});

export default ModalPueblo;