'use client';
import { useRef, useState } from 'react';
import { eventos } from '../../../data/eventos';
import { BotonVolver, BotonSiguiente, ContenedorBotones, Espaciador, BotonCerrar } from './botones';

// Hook que maneja todo
const useEventos = (destino) => {
  const eventosFiltrados = destino 
    ? eventos.filter(e => e.lugar.split(',')[0].trim().toLowerCase() === destino.split(',')[0].trim().toLowerCase())
    : [];

  const carruselRef = useRef(null);
  const [index, setIndex] = useState(0);

  const moverCarrusel = (nuevoIndex) => {
    if (!carruselRef.current) return;
    carruselRef.current.scrollTo({ left: nuevoIndex * 380, behavior: 'smooth' });
    setIndex(nuevoIndex);
  };

  return { eventosFiltrados, carruselRef, index, moverCarrusel };
};

export default function RenderEventos({ datos, onSiguiente, onVolver, onClose }) {
  const { eventosFiltrados, carruselRef, index, moverCarrusel } = useEventos(datos.destino);

  return (
    <div className="relative p-4 md:p-6 w-full max-w-6xl mx-auto">
      {/* Encabezado compacto */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#364153]">Eventos en {datos.destino}</h2>
          <p className="text-[#6A7282] text-sm md:text-base">
            {eventosFiltrados.length ? 'Eventos disponibles' : 'No hay eventos registrados'}
          </p>
        </div>
        <BotonCerrar onClick={onClose} />
      </div>

      {/* Carrusel optimizado */}
      <div className="relative">
        {index > 0 && (
          <BotonCarrusel 
            onClick={() => moverCarrusel(index - 1)} 
            direccion="izquierda" 
            posicion="left-0"
          />
        )}

        <div ref={carruselRef} className="overflow-hidden">
          <div className="flex space-x-6">
            {eventosFiltrados.map(evento => (
              <div key={evento.slug} className="flex-shrink-0 w-[380px] rounded-xl border-2 border-gray-200 bg-white">
                <div className="relative h-56">
                  <img src={evento.src} alt={evento.titulo} className="w-full h-full object-cover"/>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {evento.fecha} {evento.mes}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg text-[#364153] line-clamp-1">{evento.titulo}</h3>
                    <span className="text-purple-600 font-medium">{evento.precio}</span>
                  </div>
                  <p className="text-sm text-[#6A7282] mt-2 line-clamp-2">{evento.descripcion}</p>
                  <p className="text-xs text-[#6A7282] mt-1">{evento.horario}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {index < eventosFiltrados.length - 1 && (
          <BotonCarrusel 
            onClick={() => moverCarrusel(index + 1)} 
            direccion="derecha" 
            posicion="right-0"
          />
        )}

        <div className="flex justify-center mt-4 space-x-2">
          {eventosFiltrados.map((_, i) => (
            <button
              key={i}
              onClick={() => moverCarrusel(i)}
              className={`w-3 h-3 rounded-full ${index === i ? 'bg-[#7CB936]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <ContenedorBotones className="mt-6">
        <BotonVolver onClick={onVolver} />
        <Espaciador />
        <BotonSiguiente onClick={() => onSiguiente({ evento: null })} />
      </ContenedorBotones>
    </div>
  );
}

// Componente praa botones del carrusel
const BotonCarrusel = ({ onClick, direccion, posicion }) => (
  <button
    onClick={onClick}
    className={`absolute ${posicion} top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg border border-gray-200`}
  >
    <svg className="w-6 h-6 text-[#364153]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direccion === 'izquierda' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);