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
  const [detallesPersonas, setDetallesPersonas] = useState({
    adultos: 0,
    ninos: 0,
    bebes: 0
  });
  
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

  const actualizarDetalles = (campo, valor) => {
    setDetallesPersonas(prev => ({
      ...prev,
      [campo]: Math.max(0, valor)
    }));
  };

 const handleSiguiente = () => {
    if (!seleccion || detallesPersonas.adultos < 1) return;
    
    const destinoSeleccionado = dataMap[datos.categoria][seleccion];
    const nombreDestino = destinoSeleccionado ? destinoSeleccionado.nombre : '';
    
    onSiguiente({ 
      destino: nombreDestino,
      detallesPersonas 
    });
  };


  return (
    <div className="relative p-6 w-full max-w-2xl">
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#364153]">¿A dónde desea ir?</h2>
          <p className="text-[#6A7282] mt-1 text-sm">
            Selecciona un destino de {tituloMap[datos.categoria] || 'opciones'}
          </p>
        </div>
        <BotonCerrar onClick={onClose} />
      </div>

      {/* Contenido principal */}
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
            <img src={data.icono} alt={data.nombre} className="w-12 h-12 object-contain" />
            <span className="text-xs font-medium text-[#364153] text-center">{data.nombre}</span>
          </button>
        ))}
      </div>

      {/* Sección de detalles del grupo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#364153] mb-3">
          Seleccione con cuantas personas viaja
        </h3>
        
        {/* Controles */}
        <div className="flex justify-between items-center mb-4">
          {/* Adultos */}
          <div className="flex items-center gap-2">
            <span className="text-[#6A7282] whitespace-nowrap">Adultos</span>
            <div className="flex gap-1">
              <button 
                onClick={() => actualizarDetalles('adultos', detallesPersonas.adultos + 1)}
                className="p-1 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#6A7282] hover:bg-[#6A7282]/10 text-black"
              >
                +
              </button>
              <button 
                onClick={() => actualizarDetalles('adultos', detallesPersonas.adultos - 1)}
                disabled={detallesPersonas.adultos <= 1}
                className="p-1 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#6A7282] hover:bg-[#6A7282]/10 text-black disabled:opacity-50"
              >
                -
              </button>
            </div>
          </div>
          
          {/* Niños */}
          <div className="flex items-center gap-2">
            <span className="text-[#6A7282] whitespace-nowrap">Niños</span>
            <div className="flex gap-1">
              <button 
                onClick={() => actualizarDetalles('ninos', detallesPersonas.ninos + 1)}
                className="p-1 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#6A7282] hover:bg-[#6A7282]/10 text-black"
              >
                +
              </button>
              <button 
                onClick={() => actualizarDetalles('ninos', detallesPersonas.ninos - 1)}
                disabled={detallesPersonas.ninos <= 0}
                className="p-1 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#6A7282] hover:bg-[#6A7282]/10 text-black disabled:opacity-50"
              >
                -
              </button>
            </div>
          </div>
          
          {/* Bebés */}
          <div className="flex items-center gap-2">
            <span className="text-[#6A7282] whitespace-nowrap">Bebes</span>
            <div className="flex gap-1">
              <button 
                onClick={() => actualizarDetalles('bebes', detallesPersonas.bebes + 1)}
                className="p-1 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#6A7282] hover:bg-[#6A7282]/10 text-black"
              >
                +
              </button>
              <button 
                onClick={() => actualizarDetalles('bebes', detallesPersonas.bebes - 1)}
                disabled={detallesPersonas.bebes <= 0}
                className="p-1 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#6A7282] hover:bg-[#6A7282]/10 text-black disabled:opacity-50"
              >
                -
              </button>
            </div>
          </div>
        </div>

        {/* Resumen del grupo */}
        <div className="p-3 bg-[#6A7282]/5 rounded-lg">
          <p className="text-sm text-[#6A7282]">
            <span className="font-medium">Resumen:</span> {detallesPersonas.adultos} adulto{detallesPersonas.adultos !== 1 ? 's' : ''}
            {detallesPersonas.ninos > 0 && `, ${detallesPersonas.ninos} niño${detallesPersonas.ninos !== 1 ? 's' : ''}`}
            {detallesPersonas.bebes > 0 ? `, ${detallesPersonas.bebes} bebé${detallesPersonas.bebes !== 1 ? 's' : ''}` : ', sin bebés'}
          </p>
        </div>
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
  );
}