'use client';
import { useState } from 'react';

export default function ModalPueblosMagicos({ show, onClose, onNext, onBack }) {
  const hoteles = [
    { 
      id: 'hotel-1', 
      nombre: 'Hotel Misión Grand', 
      ubicacion: 'Centro de Tlalpujahua', 
      precio: '$1,200/noche',
      imagen: '/imagenes/puebloMagico/hotel1.jpeg',
      descripcion: 'Hotel con encanto colonial y vistas panorámicas'
    },
    { 
      id: 'hotel-2', 
      nombre: 'Casa de las Brujas', 
      ubicacion: 'Zona centro', 
      precio: '$1,800/noche',
      imagen: '/imagenes/puebloMagico/hotel2.jpeg',
      descripcion: 'Casona histórica convertida en boutique hotel'
    },
    { 
      id: 'hotel-3', 
      nombre: 'Posada Don Vasco', 
      ubicacion: 'Cerca de la Mina', 
      precio: '$950/noche',
      imagen: '/imagenes/puebloMagico/hotel3.jpeg',
      descripcion: 'Ambiente rústico y familiar con desayuno incluido'
    }
  ];

  const [seleccionado, setSeleccionado] = useState(null);

  const toggleHotel = (hotelId) => {
    setSeleccionado(prev => prev === hotelId ? null : hotelId);
  };

  const handleSiguiente = () => {
    if (seleccionado) {
      onNext(seleccionado);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Los hoteles disponibles son: </h2>
          <p className="text-gray-500 mt-2 text-sm">Selecciona tu hotel preferido</p>
        </div>

        {/* Contenedor de hoteles */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 p-2">
          {hoteles.map((hotel) => (
            <button
              key={hotel.id}
              onClick={() => toggleHotel(hotel.id)}
              className={`w-full flex items-start gap-4 p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                seleccionado === hotel.id
                  ? 'border-green-500 bg-green-50 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <img 
                src={hotel.imagen} 
                alt={hotel.nombre} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{hotel.nombre}</h3>
                <p className="text-sm text-gray-600 mt-1">{hotel.ubicacion}</p>
                <p className="text-sm text-gray-500 mt-1">{hotel.descripcion}</p>
                <p className="text-green-600 font-bold mt-2">{hotel.precio}</p>
              </div>
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
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}