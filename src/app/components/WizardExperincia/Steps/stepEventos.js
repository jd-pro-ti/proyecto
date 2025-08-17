'use client';

import { useRef, useState } from 'react';
import { eventos } from '../../../data/eventos';
import {
  BotonVolver,
  BotonSiguiente,
  ContenedorBotones,
  Espaciador,
  BotonCerrar
} from './botones';

export default function RenderEventos({ datos, onSiguiente, onVolver, onClose }) {
  const eventosFiltrados = datos.destino
    ? eventos.filter(evento => {
        const lugarEvento = evento.lugar.split(',')[0].trim().toLowerCase();
        const destinoBuscado = datos.destino.split(',')[0].trim().toLowerCase();
        return lugarEvento === destinoBuscado;
      })
    : [];

  const carruselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToCard = (index) => {
    if (carruselRef.current) {
      const cardWidth = 380;
      carruselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };
  const nextCards = () => {
    if (currentIndex < eventosFiltrados.length - 1) {
      scrollToCard(currentIndex + 1);
    }
  };
  const prevCards = () => {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  };
  const handleSiguiente = () => {
    onSiguiente({ evento: null });
  };

  return (
    <div className="relative p-4 md:p-6 w-full max-w-6xl mx-auto">
      {/* Encabezado */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#364153]">Eventos en {datos.destino}</h2>
          <p className="text-[#6A7282] text-sm md:text-base">
            {eventosFiltrados.length > 0
              ? 'Eventos disponibles en este destino'
              : 'No hay eventos registrados para este destino'}
          </p>
        </div>
        <BotonCerrar onClick={onClose} />
      </div>

      {/* Carrusel */}
      <div className="relative">
        {/* Botón anterior */}
        {currentIndex > 0 && (
          <button
            onClick={prevCards}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg border border-gray-200"
          >
            <svg className="w-6 h-6 text-[#364153]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Carrusel horizontal */}
        <div ref={carruselRef} className="overflow-hidden">
          <div className="flex space-x-6 transition-transform duration-300">
            {eventosFiltrados.map((evento, index) => (
              <div
                key={evento.slug}
                className="flex-shrink-0 w-[380px] rounded-xl border-2 border-gray-200 overflow-hidden bg-white"
              >
                {/* Imagen del evento */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={evento.src}
                    alt={evento.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {evento.fecha} {evento.mes}
                  </div>
                </div>

                {/* Contenido del evento */}
                <div className="p-5">
                  <div className="flex justify-between items-start">
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

        {/* Botón siguiente */}
        {currentIndex < eventosFiltrados.length - 1 && (
          <button
            onClick={nextCards}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg border border-gray-200"
          >
            <svg className="w-6 h-6 text-[#364153]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Indicadores de posición */}
      <div className="flex justify-center mt-4 space-x-2">
        {eventosFiltrados.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#7CB936]' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      {/* Botones navegación */}
      <ContenedorBotones className="mt-6">
        <BotonVolver onClick={onVolver} />
        <Espaciador />
        <BotonSiguiente onClick={handleSiguiente} disabled={false} />
      </ContenedorBotones>
    </div>
  );
}


