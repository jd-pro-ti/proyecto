'use client';

import { useState } from 'react';
import { BotonCerrar } from './modals/botones';

export default function ModalInicio({ onClose, onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [filtered, setFiltered] = useState([]);

  const destinos = {
    playa: ['Lazaro Cardenas', 'Caleta de Campos', 'Maruata'],
    pueblos_magicos: ['Patzcuaro', 'Tlalpujahua', 'Cuitzeo'],
    pueblos: ['Charo', 'Tacambaro', 'Turicato', 'Zinapecuaro'],
  };

  const allLugares = Object.entries(destinos).flatMap(([tipo, lugares]) =>
    lugares.map((lugar) => ({ nombre: lugar, tipo }))
  );

  const handleInput = (e) => {
    const valor = e.target.value;
    setInputValue(valor);
    setFiltered(
      allLugares.filter((l) =>
        l.nombre.toLowerCase().includes(valor.toLowerCase())
      )
    );
  };

  const handleAutoSelect = (lugar) => {
    const tipoMap = {
      playa: 'playa',
      pueblos: 'pueblos',
      pueblos_magicos: 'pueblosMagicos',
    };
    const tipo = tipoMap[lugar.tipo] || 'inicio';
    onSelect(tipo, 2);
  };

  const handleSelect = (opcion) => {
    onSelect(opcion, 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 md:p-8 w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-4 shadow-xl transform transition-all duration-300">
        {/* Botón de cerrar */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6">
          <BotonCerrar onClick={onClose} />
        </div>

        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C3458]">
            ¿Cuál es tu próximo destino?
          </h2>
        </div>

        {/* Sección de búsqueda con margen inferior aumentado */}
        <div className="px-4 md:px-8 lg:px-12 mb-6 md:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar municipio..."
              value={inputValue}
              onChange={handleInput}
              className="w-full border-2 text-base md:text-lg text-black border-[#6A7282] rounded-xl px-4 md:px-6 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-[#6A7282]"
            />
            
            {/* Área de resultados con posición relativa y margen */}
            {inputValue && (
              <div className="relative mt-1 bg-[#6A7282]/10 rounded-xl border-2 border-[#6A7282]/30 max-h-[6rem] overflow-hidden">
                {filtered.slice(0, 2).map((lugar, idx) => (
                  <div
                    key={idx}
                    className="p-3 text-base md:text-lg text-gray-600 cursor-pointer hover:bg-[#6A7282]/20"
                    onClick={() => handleAutoSelect(lugar)}
                  >
                    {lugar.nombre}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-lg md:text-xl text-[#6A7282] mb-4 md:mb-6">
          O descubre una experiencia personalizada para ti
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 px-4 md:px-8 lg:px-12">
          <button
            onClick={() => handleSelect('pueblosMagicos')}
            className="flex flex-col items-center gap-2 md:gap-3 lg:gap-4 bg-white hover:bg-amber-50 border-2 border-amber-100 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 transition-all hover:shadow-md lg:hover:shadow-lg cursor-pointer"
          >
            <img 
              src="/imagenes/puebloMa.svg" 
              alt="Pueblos mágicos" 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" 
            />
            <span className="text-sm md:text-base lg:text-lg font-medium text-[#6A7282]">Pueblos Mágicos</span>
          </button>

          <button
            onClick={() => handleSelect('playas')}
            className="flex flex-col items-center gap-2 bg-white hover:text-[#7CB936] border border-blue-100 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer"
          >
            <img 
              src="/imagenes/playas.svg" 
              alt="Playas" 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" 
            />
            <span className="text-sm md:text-base lg:text-lg font-medium text-[#6A7282]">Playas</span>
          </button>

          <button
            onClick={() => handleSelect('pueblos')}
            className="flex flex-col items-center gap-2 md:gap-3 lg:gap-4 bg-white hover:bg-purple-50 border-2 border-purple-100 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 transition-all hover:shadow-md lg:hover:shadow-lg cursor-pointer"
          >
            <img 
              src="/imagenes/pueblo.svg" 
              alt="Pueblos" 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" 
            />
            <span className="text-sm md:text-base lg:text-lg font-medium text-[#6A7282]">Pueblos</span>
          </button>
        </div>
      </div>
    </div>
  );
}