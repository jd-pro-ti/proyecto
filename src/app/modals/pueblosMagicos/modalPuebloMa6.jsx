'use client';
import { useState } from 'react';

export default function ModalHotelHabitaciones({ show, onClose, onNext, onBack }) {
  const habitaciones = [
    { 
      id: 'sencilla', 
      nombre: 'Habitación Sencilla', 
      icono: '/imagenes/puebloMagico/puebloM11.svg',
      precio: '$800/noche',
      disponibles: 5,
      descripcion: '1 cama individual, baño privado'
    },
    { 
      id: 'doble', 
      nombre: 'Habitación Doble', 
      icono: '/imagenes/puebloMagico/puebloM12.svg',
      precio: '$1,200/noche',
      disponibles: 3,
      descripcion: '2 camas individuales o 1 cama matrimonial'
    },
    { 
      id: 'suite', 
      nombre: 'Suite', 
      icono: '/imagenes/puebloMagico/puebloM13.svg',
      precio: '$2,000/noche',
      disponibles: 2,
      descripcion: 'Amplio espacio con sala de estar'
    },
    { 
      id: 'familiar', 
      nombre: 'Familiar', 
      icono: '/imagenes/puebloMagico/puebloM14.svg',
      precio: '$1,500/noche',
      disponibles: 4,
      descripcion: '2 habitaciones conectadas, hasta 4 personas'
    },
    { 
      id: 'ejecutiva', 
      nombre: 'Ejecutiva', 
      icono: '/imagenes/puebloMagico/puebloM15.svg',
      precio: '$1,800/noche',
      disponibles: 3,
      descripcion: 'Escritorio amplio y amenities de trabajo'
    },
    { 
      id: 'presidencial', 
      nombre: 'Presidencial', 
      icono: '/imagenes/puebloMagico/puebloM16.svg',
      precio: '$3,500/noche',
      disponibles: 1,
      descripcion: 'Lujo máximo con terraza privada'
    },
  ];

  const [seleccionado, setSeleccionado] = useState(null);

  const toggleHabitacion = (habitacionId) => {
    setSeleccionado(prev => prev === habitacionId ? null : habitacionId);
  };

  const handleSiguiente = () => {
    if (seleccionado) {
      const habitacion = habitaciones.find(h => h.id === seleccionado);
      onNext(habitacion);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tipos de habitación disponibles</h2>
          <p className="text-gray-500 mt-2 text-sm">Seleccione la opción que prefiera</p> 
        </div>

        {/* Contenedor con scroll vertical */}
        <div className="grid grid-cols-2 gap-4 max-h-[350px] overflow-y-auto mb-6 p-2">
          {habitaciones.map((habitacion) => (
            <button
              key={habitacion.id}
              onClick={() => toggleHabitacion(habitacion.id)}
              className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
                seleccionado === habitacion.id
                  ? 'border-green-500 bg-green-50 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={habitacion.icono} 
                  alt={habitacion.nombre} 
                  className="w-10 h-10 object-contain"
                />
                <h3 className="font-bold text-gray-800">{habitacion.nombre}</h3>
              </div>
              <p className="text-green-600 font-bold text-sm mb-1">{habitacion.precio}</p>
              <p className="text-xs text-gray-600 mb-1">{habitacion.descripcion}</p>
              <p className="text-xs text-blue-600">
                {habitacion.disponibles > 0 
                  ? `${habitacion.disponibles} disponibles` 
                  : 'Agotado'}
              </p>
            </button>
          ))}
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border cursor-pointer border-gray-300 hover:bg-gray-100 transition"
          >
            Cerrar
          </button>
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border cursor-pointer border-gray-300 hover:bg-gray-100 transition"
          >
            Volver
          </button>
          <button
            onClick={handleSiguiente}
            disabled={!seleccionado} 
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              !seleccionado
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
}