'use client';

import { useState } from 'react';
import { alojamientos } from '../../../data/alojamientos';
import { 
  BotonCerrar, 
  BotonVolver, 
  BotonSiguiente, 
  ContenedorBotones, 
  Espaciador 
} from './botones';

export default function StepHoteles({ datos, onSiguiente, onVolver, onClose }) {
  const [hotelSeleccionado, setHotelSeleccionado] = useState(datos.hotel);
  
  const hotelesFiltrados = datos.destino 
    ? alojamientos.filter(hotel => 
        hotel.municipio.toLowerCase() === datos.destino.toLowerCase())
    : [];

  const toggleHotel = (hotelNombre) => {
    setHotelSeleccionado(prev => prev === hotelNombre ? null : hotelNombre);
  };

  const handleSiguiente = () => {
    if (hotelesFiltrados.length === 0) {
      onSiguiente({ hotel: null, sinHoteles: true });
      return;
    }

    if (!hotelSeleccionado) return;
    onSiguiente({ hotel: hotelSeleccionado, sinHoteles: false });
  };

  return (
    <div className="relative p-4 md:p-6 w-full max-w-full md:max-w-4xl mx-auto">
      {/* Encabezado responsivo */}
      <div className="relative mb-4 md:mb-6 text-center">
        <div className="px-10 sm:px-0"> {/* Padding para evitar superposición con botón */}
          <h2 className="text-xl sm:text-2xl font-bold text-[#364153]">Hoteles en {datos.destino}</h2>
          <p className="text-[#6A7282] mt-1 text-sm">Elige tu alojamiento ideal</p>
        </div>
        <div className="absolute top-0 right-0">
          <BotonCerrar onClick={onClose} />
        </div>
      </div>

      {hotelesFiltrados.length > 0 ? (
        <div className={`overflow-x-auto scrollbar-hide ${hotelesFiltrados.length === 1 ? 'flex justify-center' : ''}`}>
          <div className={`flex ${hotelesFiltrados.length === 1 ? '' : 'space-x-3 md:space-x-4'} py-2 md:py-4`} style={{ scrollSnapType: 'x mandatory' }}>
            {hotelesFiltrados.map((hotel) => (
              <div
                key={hotel.name}
                onClick={() => toggleHotel(hotel.name)}
                className={`flex-shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${
                  hotelSeleccionado === hotel.name
                    ? 'border-[#7CB936] bg-green-50 shadow-inner'
                    : 'border-gray-200 hover:border-[#059669] bg-white'
                }`}
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-40 sm:h-44 md:h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {hotel.categoria}
                  </div>
                </div>
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="font-bold text-base sm:text-lg text-[#364153]">{hotel.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{hotel.descripcion}</p>
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-[#364153] ml-1 text-xs sm:text-sm">{hotel.rating}</span>
                      {hotel.internet && (
                        <span className="ml-2 sm:ml-3 text-xs text-gray-500 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                          </svg>
                          WiFi
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-6 md:my-8 text-center">
          <p className="text-[#6A7282] text-sm sm:text-base">No hay hoteles disponibles para este destino.</p>
        </div>
      )}

      {/* Botones de navegación responsivos */}
      <ContenedorBotones className="mt-4 md:mt-6">
        <BotonVolver onClick={onVolver} />
        <Espaciador />
        <BotonSiguiente 
          onClick={handleSiguiente} 
          disabled={hotelesFiltrados.length > 0 && !hotelSeleccionado} 
        />
      </ContenedorBotones>
    </div>
  );
}