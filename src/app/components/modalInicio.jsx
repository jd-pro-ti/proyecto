'use client';

import React, { useState, useMemo } from 'react';
import { BotonCerrar } from './modals/botones';
import { pueblosMagicos } from '../data/pueblosMagicos';
import pueblos from '../data/pueblos';
import playas from '../data/playas';

const ModalInicio= React.memo(function ModalInicio ({ onClose, onSelect, show }) {
  if (!show) return null;
  const [inputValue, setInputValue] = useState('');

  const allDestinos = useMemo(() => {
    const playasArray = Object.entries(playas).map(([slug, data]) => ({
      ...data,
      slug,
      categoria: 'playas'
    }));

    const pueblosMagicosArray = pueblosMagicos.map((p) => ({
      ...p,
      categoria: 'pueblosMagicos'
    }));

    const pueblosArray = pueblos.map((p) => ({
      ...p,
      categoria: 'pueblos'
    }));

    return [...playasArray, ...pueblosMagicosArray, ...pueblosArray];
  }, []);


  const filtered = useMemo(() => {
    if (!inputValue) return [];
    return allDestinos.filter((l) =>
      l.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, allDestinos]);

  const handleInput = (e) => {
    const valor = e.target.value;
    setInputValue(valor);
  };

  const handleAutoSelect = (lugar) => {
    onSelect(lugar.categoria, { nombre: lugar.nombre });
  };

  const handleSelect = (categoria) => {
    onSelect(categoria, null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.42)] backdrop-blur-sm transition-opacity duration-500">
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-2xl shadow-xl transform transition-all duration-300 mx-4">
        {/* Botón de cerrar */}
        <div className="absolute top-4 right-4">
          <BotonCerrar onClick={onClose} />
        </div>

        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C3458]">
            ¿Cuál es tu próximo destino?
          </h2>
        </div>

        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Busca tu destino..."
          value={inputValue}
          onChange={handleInput}
          className="w-full border-2 text-base md:text-lg text-black border-[#6A7282] rounded-xl px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#6A7282]"
        />

        {/* Resultados */}
        {filtered.length > 0 && (
          <div className="bg-[#6A7282]/10 rounded-md p-2 mb-4 max-h-48 overflow-y-auto text-black">
            {filtered.map((lugar, idx) => (
              <div
                key={idx}
                className="p-2 cursor-pointer hover:bg-[#6A7282]/20 rounded flex gap-2 items-center"
                onClick={() => handleAutoSelect(lugar)}
              >
                <div>
                  <div className="font-medium">{lugar.nombre}</div>
                  <div className="text-sm text-gray-500 capitalize">{lugar.categoria}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-lg md:text-xl text-[#6A7282] mb-4 md:mb-6">
          O descubre una experiencia personalizada para ti
        </p>

        {/* Botones de categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 px-4">
          <button
            onClick={() => handleSelect('pueblosMagicos')}
            className="flex flex-col items-center gap-2 bg-white hover:bg-amber-50 border-2 border-amber-100 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/puebloMa.svg" alt="Pueblos mágicos" className="w-16 h-16" />
            <span className="text-base font-medium text-[#6A7282]">Pueblos Mágicos</span>
          </button>

          <button
            onClick={() => handleSelect('playas')}
            className="flex flex-col items-center gap-2 bg-white hover:bg-blue-50 border-2 border-blue-100 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/playas.svg" alt="Playas" className="w-16 h-16" />
            <span className="text-base font-medium text-[#6A7282]">Playas</span>
          </button>

          <button
            onClick={() => handleSelect('pueblos')}
            className="flex flex-col items-center gap-2 bg-white hover:bg-purple-50 border-2 border-purple-100 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/pueblo.svg" alt="Pueblos" className="w-16 h-16" />
            <span className="text-base font-medium text-[#6A7282]">Pueblos</span>
          </button>
        </div>
      </div>
    </div>
  );
})

export default ModalInicio;
