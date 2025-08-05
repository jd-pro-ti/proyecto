'use client';

import { useState } from 'react';
import { eventos } from '../../data/eventos';
import { 
  BotonVolver, 
  BotonSiguiente, 
  ContenedorBotones, 
  Espaciador,
  BotonCerrar
} from './botones';

export default function RenderEventos({ datos, onSiguiente, onVolver, onClose }) {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(datos.evento);
  
  const eventosFiltrados = datos.destino 
    ? eventos.filter(evento => {
        const lugarEvento = evento.lugar.split(',')[0].trim().toLowerCase();
        const destinoBuscado = datos.destino.split(',')[0].trim().toLowerCase();
        return lugarEvento === destinoBuscado;
      }) 
    : [];

  const handleSiguiente = () => {
    onSiguiente({ evento: eventoSeleccionado });
  };

  return (
    <div className="relative p-4 md:p-6 w-full max-w-full md:max-w-4xl mx-auto">
      {/* Encabezado responsivo */}
      <div className="relative mb-4 md:mb-6 text-center">
        <div className="px-10 sm:px-0">
          <h2 className="text-xl sm:text-2xl font-bold text-[#364153]">Eventos en {datos.destino}</h2>
          <p className="text-gray-500 mt-1 text-xs sm:text-sm">
            {eventosFiltrados.length > 0 
              ? "Selecciona un evento para agregarlo a tu itinerario" 
              : "No hay eventos registrados para este destino"}
          </p>
        </div>
        <div className="absolute top-0 right-0">
          <BotonCerrar onClick={onClose} />
        </div>
      </div>

      {/* Lista de eventos con scroll horizontal */}
      {eventosFiltrados.length > 0 ? (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-3 md:space-x-4 py-2 md:py-4 w-max">
            {eventosFiltrados.map((evento) => (
              <div
                key={evento.slug}
                onClick={() => setEventoSeleccionado(evento.slug)}
                className={`flex-shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${
                  eventoSeleccionado === evento.slug
                    ? 'border-[#7CB936] bg-green-50 shadow-inner'
                    : 'border-gray-200 hover:border-[#059669] bg-white'
                }`}
              >
                <div className="relative">
                  <img 
                    src={evento.src} 
                    alt={evento.titulo} 
                    className="w-full h-40 sm:h-44 md:h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {evento.fecha} {evento.mes}
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="font-bold text-base sm:text-lg text-[#364153] line-clamp-1">{evento.titulo}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{evento.horario}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{evento.descripcion}</p>
                  <p className="text-purple-600 text-sm sm:text-base mt-2 font-medium">{evento.precio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-6 md:my-8 text-center">
          <p className="text-[#6A7282] text-sm sm:text-base">No hay eventos disponibles para este destino.</p>
        </div>
      )}

      {/* Botones de navegación responsivos */}
      <ContenedorBotones className="mt-4 md:mt-6">
        <BotonVolver onClick={onVolver} />
        <Espaciador />
        <BotonSiguiente 
          onClick={handleSiguiente} 
          disabled={false}
        />
      </ContenedorBotones>
    </div>
  );
}