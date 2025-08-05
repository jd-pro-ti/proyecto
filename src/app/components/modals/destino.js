'use client';

import { useState } from 'react';
import { pueblosMagicos } from '../../data/pueblosMagicos';
import pueblos from '../../data/pueblos';
import playas from '../../data/playas';
import { 
  BotonCerrar, 
  BotonVolver, 
  BotonSiguiente, 
  ContenedorBotones, 
  Espaciador 
} from './botones';

export default function RenderDestino({ datos, onSiguiente, onVolver, onClose }) {
  const [seleccion, setSeleccion] = useState(datos.destino);
  
  const dataMap = {
    pueblosMagicos,
    pueblos,
    playa: playas,
  };

  const tituloMap = {
    pueblosMagicos: 'Pueblos Mágicos',
    pueblos: 'Pueblos',
    playa: 'Playas',
  };

  const datosLista = Object.entries(dataMap[datos.categoria] || {});

  const toggleSeleccion = (id) => {
    setSeleccion(prev => prev === id ? null : id);
  };

  const handleSiguiente = () => {
    if (!seleccion) return;
    
    const destinoSeleccionado = dataMap[datos.categoria][seleccion];
    const nombreDestino = destinoSeleccionado ? destinoSeleccionado.nombre : '';
    
    onSiguiente({ 
      destino: nombreDestino
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-5 mx-auto">
        {/* Encabezado CENTRADO */}
        <div className="flex flex-col items-center mb-4 relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#364153]">¿A dónde desea ir?</h2>
            <p className="text-[#6A7282] mt-1 text-sm">
              Selecciona un destino de {tituloMap[datos.categoria] || 'opciones'}
            </p>
          </div>
          <div className="absolute right-0 top-0">
            <BotonCerrar onClick={onClose} />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-3 gap-2 max-h-[65vh] overflow-y-auto mb-4">
          {datosLista.map(([id, data]) => (
            <button
              key={id}
              onClick={() => toggleSeleccion(id)}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg border-2 transition-all cursor-pointer mx-auto w-[90%] ${
                seleccion === id
                  ? 'border-[#7CB936] bg-[#7CB936]/10 shadow-inner'
                  : 'border-gray-200 hover:border-[#7CB936]/50 bg-white'
              }`}
            >
              <img 
                src={data.icono} 
                alt={data.nombre} 
                className="w-14 h-14 object-contain" 
              />
              <span className="text-xs font-medium text-[#364153] text-center">
                {data.nombre}
              </span>
            </button>
          ))}
        </div>
        
        {/* Botones de navegación */}
        <ContenedorBotones>
          <BotonVolver onClick={onVolver} />
          <Espaciador />
          <BotonSiguiente 
            onClick={handleSiguiente} 
            disabled={!seleccion} 
          />
        </ContenedorBotones>
      </div>
    </div>
  );
}