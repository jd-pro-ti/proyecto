'use client';

import React, { useState, useMemo } from 'react';
import { BotonCerrar } from './botones';
import { pueblosMagicos } from '../../../data/pueblosMagicos';
import pueblos from '../../../data/pueblos';
import playas from '../../../data/playas';

const StepInicio = React.memo(function StepInicio({ datos, onSiguiente, onVolver, onClose }) {
  const [inputValue, setInputValue] = useState('');

  // Combinar destinos
  const allDestinos = useMemo(() => {
    const playasArray = Object.entries(playas).map(([slug, data]) => ({
      ...data,
      slug,
      categoria: 'playas',
    }));

    const pueblosMagicosArray = pueblosMagicos.map((p) => ({
      ...p,
      categoria: 'pueblosMagicos',
    }));

    const pueblosArray = pueblos.map((p) => ({
      ...p,
      categoria: 'pueblos',
    }));

    return [...playasArray, ...pueblosMagicosArray, ...pueblosArray];
  }, []);

  // Filtrado de búsqueda
  const filtered = useMemo(() => {
    if (!inputValue) return [];
    return allDestinos.filter((l) =>
      l.nombre.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, allDestinos]);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  // Selección automática (desde búsqueda)
  const handleAutoSelect = (lugar) => {
    onSiguiente({
      categoria: lugar.categoria,
      destino: lugar.nombre,
      seleccion: lugar.categoria,
    });
  };

  // Selección manual (categoría)
  const handleSelect = (categoria) => {
    onSiguiente({
      categoria,
      seleccion: categoria,
    });
  };

  return (
    <div className="relative">
      {/* Botón de cerrar */}
      <div className="absolute top-0 right-0">
        <BotonCerrar onClick={onClose} />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          ¿Cuál es tu próximo destino?
        </h2>
      </div>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Busca tu destino..."
        value={inputValue}
        onChange={handleInput}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />

      {/* Resultados */}
      {filtered.length > 0 && (
        <div className="bg-gray-100 rounded-lg p-2 mb-4 max-h-48 overflow-y-auto">
          {filtered.map((lugar, idx) => (
            <div
              key={idx}
              className="p-2 cursor-pointer hover:bg-gray-200 rounded flex gap-2 items-center"
              onClick={() => handleAutoSelect(lugar)}
            >
              <div>
                <div className="font-medium">{lugar.nombre}</div>
                <div className="text-sm text-gray-500 capitalize">
                  {lugar.categoria}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-gray-600 mb-6">
        O descubre una experiencia personalizada para ti
      </p>

      {/* Botones de categorías */}
      <div className="grid grid-cols-3 gap-4 px-4">
        <button
          onClick={() => handleSelect('pueblosMagicos')}
          className="flex flex-col items-center gap-2 bg-white hover:bg-amber-50 border border-amber-200 rounded-lg p-4 transition-all hover:shadow cursor-pointer"
        >
          <img src="/imagenes/puebloMa.svg" alt="Pueblos mágicos" className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-700">
            Pueblos Mágicos
          </span>
        </button>

        <button
          onClick={() => handleSelect('playas')}
          className="flex flex-col items-center gap-2 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg p-4 transition-all hover:shadow cursor-pointer"
        >
          <img src="/imagenes/playas.svg" alt="Playas" className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-700">Playas</span>
        </button>

        <button
          onClick={() => handleSelect('pueblos')}
          className="flex flex-col items-center gap-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg p-4 transition-all hover:shadow cursor-pointer"
        >
          <img src="/imagenes/pueblo.svg" alt="Pueblos" className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-700">Pueblos</span>
        </button>
      </div>

      
    </div>
  );
});

export default StepInicio;