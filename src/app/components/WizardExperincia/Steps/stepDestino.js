'use client';

import { useState, useMemo } from 'react';
import { pueblosMagicos } from '../../../data/pueblosMagicos';
import pueblos from '../../../data/pueblos';
import playas from '../../../data/playas';
import { 
  BotonCerrar, 
  BotonVolver, 
  BotonSiguiente, 
  ContenedorBotones, 
  Espaciador 
} from './botones';

function useDestino({ categoria, subCategoria, destinoInicial }) {
  const [seleccion, setSeleccion] = useState(destinoInicial || null);

  const dataMap = {
    pueblosMagicos,
    pueblos,
    playas
  };

  // Lista filtrada según categoría y subcategoría
  const datosLista = useMemo(() => {
    if (categoria === 'pueblos' && subCategoria) {
      return Object.entries(dataMap.pueblos).filter(
        ([_, data]) => data.categoria === subCategoria
      );
    } else {
      return Object.entries(dataMap[categoria] || {});
    }
  }, [categoria, subCategoria]);

  // Función para seleccionar/deseleccionar un destino
  const toggleSeleccion = (id) => {
    setSeleccion(id);
  };

  // Función para obtener el nombre del destino seleccionado
  const obtenerNombreSeleccion = () => {
    const destinoSeleccionado = dataMap[categoria]?.[seleccion];
    return destinoSeleccionado ? destinoSeleccionado.nombre : '';
  };

  return {
    seleccion,
    datosLista,
    toggleSeleccion,
    obtenerNombreSeleccion
  };
}

// Componente StepDestino
export default function StepDestino({ datos, onSiguiente, onVolver, onClose }) {
  const tituloMap = {
    pueblos: 'los pueblos',
    playas: 'playa',
    pueblosMagicos: 'los pueblos mágicos'
  };

  const categoriaActual = datos.categoria;
  const subcategoriaActual = datos.subCategoria;

  const { seleccion, datosLista, toggleSeleccion, obtenerNombreSeleccion } = useDestino({
    categoria: categoriaActual,
    subCategoria: subcategoriaActual,
    destinoInicial: datos.destino
  });

  const handleSiguiente = () => {
    const nombreDestino = obtenerNombreSeleccion();
    onSiguiente({ destino: nombreDestino });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0)] backdrop-blur-sm transition-opacity duration-500">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-5 mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col items-center mb-4 relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#364153]">¿A dónde desea ir?</h2>
            <p className="text-[#6A7282] mt-1 text-sm">
              Selecciona un destino de {tituloMap[categoriaActual] || 'opciones'}
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
