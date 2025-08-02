'use client';

import { useState } from 'react';
import { alojamientos } from '../../data/alojamientos';
import { 
  BotonCerrar, 
  BotonVolver, 
  BotonSiguiente, 
  ContenedorBotones, 
  Espaciador 
} from './botones';

export default function RenderHoteles({ datos, onSiguiente, onVolver, onClose }) {
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
    <div className="relative p-6 w-full max-w-2xl">
      {/* Encabezado con título y botón cerrar alineados */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#364153]">Hoteles en {datos.destino}</h2>
          <p className="text-gray-500 mt-1 text-sm">Elige tu alojamiento ideal</p>
        </div>
        <BotonCerrar onClick={onClose} />
      </div>

      {hotelesFiltrados.length > 0 ? (
        <div className={`overflow-x-auto scrollbar-hide ${hotelesFiltrados.length === 1 ? 'flex justify-center' : ''}`}>
          <div className={`flex ${hotelesFiltrados.length === 1 ? '' : 'space-x-4'} py-4`} style={{ scrollSnapType: 'x mandatory' }}>
            {hotelesFiltrados.map((hotel) => (
              <div
                key={hotel.name}
                onClick={() => toggleHotel(hotel.name)}
                className={`flex-shrink-0 w-80 cursor-pointer rounded-xl border-2 overflow-hidden transition-all ${
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
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {hotel.categoria}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#364153]">{hotel.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{hotel.descripcion}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-[#364153] ml-1">{hotel.rating}</span>
                      {hotel.internet && (
                        <span className="ml-3 text-xs text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="my-8 text-center">
          <p className="text-[#6A7282]">No hay hoteles disponibles para este destino.</p>
        </div>
      )}

      {/* Botones de navegación */}
      <ContenedorBotones>
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