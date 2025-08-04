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

const tituloMap = {
  pueblos: 'los pueblos',
  playas: 'playa',
  pueblosMagicos: 'los pueblos mágicos'
};

export default function RenderDestino({ datos, onSiguiente, onVolver, onClose }) {
  const [seleccion, setSeleccion] = useState(null);

  const categoriaActual = datos.categoria;
  const subcategoriaActual = datos.subCategoria;

  const dataMap = {
    pueblosMagicos,
    pueblos,
    playas
  };

  // Obtener datos según la categoría
  let datosLista = [];

  if (categoriaActual === 'pueblos' && subcategoriaActual) {
    datosLista = Object.entries(dataMap.pueblos).filter(
      ([_, data]) => data.categoria === subcategoriaActual
    );
  } else {
    datosLista = Object.entries(dataMap[categoriaActual] || {});
  }

  const toggleSeleccion = (id) => {
    setSeleccion(id);
  };
   const handleSiguiente = () => {
    
    const destinoSeleccionado = dataMap[datos.categoria][seleccion];
    const nombreDestino = destinoSeleccionado ? destinoSeleccionado.nombre : '';
    
    onSiguiente({ 
      destino: nombreDestino
  
    });
  };
  console.log("categoriaActual: ", categoriaActual);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {/* Encabezado */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#364153]">¿A dónde desea ir?</h2>
            <p className="text-[#6A7282] mt-1 text-sm">
              Selecciona un destino de {tituloMap[categoriaActual] || 'opciones'}
            </p>
          </div>
          <BotonCerrar onClick={onClose} />
        </div>

        {/* Contenido principal: lista de destinos */}
        <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto mb-6">
          {datosLista.map(([id, data]) => (
            <button
              key={id}
              onClick={() => toggleSeleccion(id)}
              className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 min-w-[100px] transition-all cursor-pointer ${
                seleccion === id
                  ? 'border-[#7CB936] bg-[#7CB936]/10 shadow-inner'
                  : 'border-gray-200 hover:border-[#7CB936]/50 bg-white'
              }`}
            >
              <img
                src={data.icono}
                alt={data.nombre}
                className="w-12 h-12 object-contain"
              />
              <span className="text-xs font-medium text-[#364153] text-center">
                {data.nombre}
              </span>
            </button>
          ))}
        </div>

        <Espaciador />

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
