'use client';

import { useState } from 'react';
import { eventos } from '../../data/eventos';
import { 
  BotonCerrar,
  BotonVolver, 
  BotonSiguiente, 
  ContenedorBotones, 
  Espaciador 
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
    <div className="relative p-6 w-full max-w-2xl">
      {/* Encabezado con título y botón cerrar alineados */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Eventos en {datos.destino}</h2>
          <p className="text-gray-500 mt-1 text-sm">
            {eventosFiltrados.length > 0 
              ? "Selecciona un evento para agregarlo a tu itinerario (opcional)" 
              : "No hay eventos registrados para este destino"}
          </p>
        </div>
        <BotonCerrar onClick={onClose} />
      </div>

      {/* Lista de eventos */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 p-2">
        {eventosFiltrados.map((evento) => (
          <div
            key={evento.slug}
            onClick={() => setEventoSeleccionado(evento.slug)}
            className={`w-full flex items-start gap-4 p-3 rounded-xl border-2 transition-all cursor-pointer ${
              eventoSeleccionado === evento.slug
                ? 'border-green-500 bg-green-50 shadow-inner'
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
          >
            <img 
              src={evento.src} 
              alt={evento.titulo} 
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{evento.titulo}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {evento.fecha} {evento.mes}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{evento.horario}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{evento.descripcion}</p>
              <p className="text-purple-600 text-sm mt-2">{evento.precio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación con componentes personalizados */}
      <ContenedorBotones>
        <BotonVolver onClick={onVolver} />
        <Espaciador />
        <BotonSiguiente 
          onClick={handleSiguiente} 
          disabled={false} // Siempre habilitado según tu requerimiento
        />
      </ContenedorBotones>
    </div>
  );
}