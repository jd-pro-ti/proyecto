'use client';

import { useState } from 'react';
import {
  BotonCerrar,
  BotonVolver,
  BotonSiguiente,
  ContenedorBotones,
  Espaciador
} from './botones';

export default function RenderHabitaciones({ datos, onSiguiente, onVolver, onClose }) {
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(datos.habitacion);

  const habitaciones = [
    {
      id: 'sencilla',
      nombre: 'Habitación Sencilla',
      imagen: '/imagenes/habitaciones/sencilla.webp',
      precio: '$800/noche',
      disponibles: 5,
      descripcion: '1 cama individual, baño privado',
      categoria: 'Económica',
      rating: 4.2,
      internet: true,
      tamaño: '20 m²',
      capacidad: '1 persona'
    },
    {
      id: 'doble',
      nombre: 'Habitación Doble',
      imagen: '/imagenes/habitaciones/doble.jpeg',
      precio: '$1,200/noche',
      disponibles: 3,
      descripcion: '2 camas individuales o 1 cama matrimonial',
      categoria: 'Estándar',
      rating: 4.5,
      internet: true,
      tamaño: '28 m²',
      capacidad: '2 personas'
    },
    {
      id: 'suite',
      nombre: 'Suite',
      imagen: '/imagenes/habitaciones/suite.webp',
      precio: '$2,000/noche',
      disponibles: 2,
      descripcion: 'Amplio espacio con sala de estar',
      categoria: 'Lujo',
      rating: 4.8,
      internet: true,
      tamaño: '45 m²',
      capacidad: '2 personas'
    },
    {
      id: 'familiar',
      nombre: 'Familiar',
      imagen: '/imagenes/habitaciones/familiar.webp',
      precio: '$1,500/noche',
      disponibles: 4,
      descripcion: '2 habitaciones conectadas, hasta 4 personas',
      categoria: 'Familiar',
      rating: 4.6,
      internet: true,
      tamaño: '38 m²',
      capacidad: '4 personas'
    }
  ];

  const handleSiguiente = () => {
    if (!habitacionSeleccionada) return;
    onSiguiente({ habitacion: habitacionSeleccionada });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0)] backdrop-blur-sm transition-opacity duration-500">
      {/* Contenedor principal responsivo */}
      <div className="bg-white w-full h-full sm:w-[90vw] sm:h-[90vh] md:w-[78vw] md:h-[85vh] flex flex-col rounded-lg overflow-hidden">
        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4">
          {/* Encabezado responsivo */}
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="ml-0 sm:ml-[4.5%]">
              <h2 className="text-2xl font-bold text-[#364153]">Selecciona tu habitación</h2>
              <p className="text-[#6A7282] mt-1 text-sm">Elige el tipo de alojamiento para tu estancia</p>
            </div>
            <BotonCerrar onClick={onClose} className="text-sm sm:text-base" />
          </div>

          {/* Contenedor de habitaciones responsivo */}
          <div className="max-w-5xl mx-auto">
            {/* Grid de habitaciones responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {habitaciones.slice(0, 3).map((habitacion) => (
                <div
                  key={habitacion.id}
                  onClick={() => setHabitacionSeleccionada(habitacion.id)}
                  className={`cursor-pointer rounded-lg sm:rounded-xl border-2 overflow-hidden transition-all ${
                    habitacionSeleccionada === habitacion.id
                      ? 'border-[#7CB936] bg-[#7CB936]/10 shadow-inner'
                      : 'border-[#6A7282]/30 hover:border-[#7CB936]/50 bg-white'
                  }`}
                >
                  {/* Imagen responsiva */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={habitacion.imagen}
                      alt={habitacion.nombre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#364153] text-white text-xs px-2 py-1 rounded">
                      {habitacion.categoria}
                    </div>
                  </div>

                  {/* Contenido responsivo */}
                  <div className="p-2 sm:p-3 md:p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base sm:text-lg text-[#364153]">{habitacion.nombre}</h3>
                      <span className="text-[#7CB936] font-medium text-sm sm:text-base">{habitacion.precio}</span>
                    </div>

                    <div className="flex items-center mt-1 sm:mt-2">
                      <span className="text-yellow-500 text-sm sm:text-base">★</span>
                      <span className="text-[#364153] ml-1 text-sm sm:text-base">{habitacion.rating}</span>
                      {habitacion.internet && (
                        <span className="ml-2 sm:ml-3 text-xs text-[#6A7282] flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                            />
                          </svg>
                          WiFi
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#6A7282] mt-1 sm:mt-2">{habitacion.descripcion}</p>

                    <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2 sm:mt-3 text-xs">
                      <div className="flex items-center text-[#6A7282]">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                        {habitacion.tamaño}
                      </div>
                      <div className="flex items-center text-[#6A7282]">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {habitacion.capacidad}
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-3">
                      <span className={`text-xs sm:text-sm ${
                        habitacion.disponibles > 0 ? 'text-[#1C3458]' : 'text-red-600'
                      }`}>
                        {habitacion.disponibles > 0
                          ? `${habitacion.disponibles} disponibles`
                          : 'Agotado'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cuarta habitación centrada */}
            <div className="mt-3 sm:mt-4">
              <div className="max-w-md mx-auto sm:max-w-none sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                <div className="sm:col-start-1 lg:col-start-2">
                  {habitaciones.slice(3, 4).map((habitacion) => (
                    <div
                      key={habitacion.id}
                      onClick={() => setHabitacionSeleccionada(habitacion.id)}
                      className={`cursor-pointer rounded-lg sm:rounded-xl border-2 overflow-hidden transition-all ${
                        habitacionSeleccionada === habitacion.id
                          ? 'border-[#7CB936] bg-[#7CB936]/10 shadow-inner'
                          : 'border-[#6A7282]/30 hover:border-[#7CB936]/50 bg-white'
                      }`}
                    >
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <img
                          src={habitacion.imagen}
                          alt={habitacion.nombre}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-[#364153] text-white text-xs px-2 py-1 rounded">
                          {habitacion.categoria}
                        </div>
                      </div>

                      <div className="p-2 sm:p-3 md:p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-base sm:text-lg text-[#364153]">{habitacion.nombre}</h3>
                          <span className="text-[#7CB936] font-medium text-sm sm:text-base">{habitacion.precio}</span>
                        </div>

                        <div className="flex items-center mt-1 sm:mt-2">
                          <span className="text-yellow-500 text-sm sm:text-base">★</span>
                          <span className="text-[#364153] ml-1 text-sm sm:text-base">{habitacion.rating}</span>
                          {habitacion.internet && (
                            <span className="ml-2 sm:ml-3 text-xs text-[#6A7282] flex items-center">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                                />
                              </svg>
                              WiFi
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-[#6A7282] mt-1 sm:mt-2">{habitacion.descripcion}</p>

                        <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-2 sm:mt-3 text-xs">
                          <div className="flex items-center text-[#6A7282]">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                              />
                            </svg>
                            {habitacion.tamaño}
                          </div>
                          <div className="flex items-center text-[#6A7282]">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            {habitacion.capacidad}
                          </div>
                        </div>

                        <div className="mt-2 sm:mt-3">
                          <span className={`text-xs sm:text-sm ${
                            habitacion.disponibles > 0 ? 'text-[#1C3458]' : 'text-red-600'
                          }`}>
                            {habitacion.disponibles > 0
                              ? `${habitacion.disponibles} disponibles`
                              : 'Agotado'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo con los botones*/}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-2 sm:p-3 md:p-4 shadow-sm">
          <ContenedorBotones>
            <BotonVolver onClick={onVolver} className="text-sm sm:text-base" />
            <Espaciador />
            <BotonSiguiente 
              onClick={handleSiguiente} 
              disabled={!habitacionSeleccionada} 
              className="text-sm sm:text-base"
            />
          </ContenedorBotones>
        </div>
      </div>
    </div>
  );
}