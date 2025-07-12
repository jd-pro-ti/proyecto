'use client';

import { useState } from 'react';

export default function ModalInicio({ show, onClose, onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [filtered, setFiltered] = useState([]);

  const destinos = {
    playa: ['Lazaro Cardenas', 'Caleta de Campos', 'Maruata'],
    pueblos_magicos: ['Patzcuaro', 'Tlalpujahua', 'Cuitzeo'],
    pueblos: ['Zamora', 'La Piedad', 'Los Reyes'],
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
  onSelect(tipo, 2); // ← saltamos al segundo modal si viene de búsqueda
};


  const handleSelect = (opcion) => {
  onSelect(opcion, 1); // ← selección normal desde los botones, empieza en el primero
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
            ¿Cuál es tu próximo destino?
          </h2>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Busca tu destino..."
          value={inputValue}
          onChange={handleInput}
          className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Resultados */}
        {filtered.length > 0 && (
          <div className="bg-gray-100 rounded-md p-2 mb-4 max-h-32 overflow-y-auto text-black">
            {filtered.map((lugar, idx) => (
              <div
                key={idx}
                className="p-2 cursor-pointer hover:bg-gray-200 rounded"
                onClick={() => handleAutoSelect(lugar)}
              >
                {lugar.nombre}
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-gray-600 mb-4">
          O descubre una experiencia personalizada para ti
        </p>

        <div className="flex justify-between gap-2">
          <button
            onClick={() => handleSelect('pueblosMagicos')}
            className="flex-1 flex flex-col items-center gap-1 bg-white hover:bg-amber-50 border border-amber-100 rounded-xl p-3 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/pueblo.svg" alt="Pueblos magicos" className="w-20 h-20" />
            <span className="text-sm font-medium text-gray-700">Pueblos Magicos</span>
          </button>

          <button
            onClick={() => handleSelect('playa')}
            className="flex-1 flex flex-col items-center gap-1 bg-white hover:bg-blue-50 border border-blue-100 rounded-xl p-3 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/playas.svg" alt="Playas" className="w-20 h-20" />
            <span className="text-sm font-medium text-gray-700">Playas</span>
          </button>

          <button
            onClick={() => handleSelect('pueblos')}
            className="flex-1 flex flex-col items-center gap-1 bg-white hover:bg-purple-50 border border-purple-100 rounded-xl p-3 transition-all hover:shadow-md cursor-pointer"
          >
            <img src="/imagenes/pueblo.svg" alt="Pueblos" className="w-20 h-20" />
            <span className="text-sm font-medium text-gray-700">Pueblos</span>
          </button>
        </div>

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
