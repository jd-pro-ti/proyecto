'use client';

import { useState } from 'react';
import { BotonCerrar } from './modals/botones';

export default function ModalInicio({ onClose, onSelect}) {
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
      <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300">
        {/* Botón de cerrar en esquina superior derecha */}
        <div className="absolute top-4 right-4">
          <BotonCerrar onClick={onClose} />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#1C3458]">
            ¿Cuál es tu próximo destino?
          </h2>
        </div>

        <input
          type="text"
          placeholder="Busca tu destino..."
          value={inputValue}
          onChange={handleInput}
          className="w-full border text-black border-[#6A7282] rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#6A7282]"
        />

        {filtered.length > 0 && (
          <div className="bg-[#6A7282]/10 rounded-md p-2 mb-4 max-h-32 overflow-y-auto text-black">
            {filtered.map((lugar, idx) => (
              <div
                key={idx}
                className="p-2 cursor-pointer hover:bg-[#6A7282]/20 rounded"
                onClick={() => handleAutoSelect(lugar)}
              >
                {lugar.nombre}
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-[#6A7282] mb-4">
          O descubre una experiencia personalizada para ti
        </p>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleSelect('pueblosMagicos')}
            className="flex flex-col items-center gap-2 bg-white hover:bg-amber-50 border border-amber-100 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/puebloMa.svg" alt="Pueblos mágicos" className="w-16 h-16" />
            <span className="text-sm font-medium text-[#6A7282]">Pueblos Mágicos</span>
          </button>

          <button
            onClick={() => handleSelect('playas')}
            className="flex flex-col items-center gap-2 bg-white hover:text-[#7CB936] border border-blue-100 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/playas.svg" alt="Playas" className="w-16 h-16" />
            <span className="text-sm font-medium text-[#6A7282]">Playas</span>
          </button>

          <button
            onClick={() => handleSelect('pueblos')}
            className="flex flex-col items-center gap-2 bg-white hover:bg-purple-50 border border-purple-100 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/pueblo.svg" alt="Pueblos" className="w-16 h-16" />
            <span className="text-sm font-medium text-[#6A7282]">Pueblos</span>
          </button>
        </div>
      </div>
    </div>
  );
}