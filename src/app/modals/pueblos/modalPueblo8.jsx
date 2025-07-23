'use client';
import { useState } from 'react';

export default function ModalPueblosMagicos({ show, onClose, onNext, onBack }) {
   const fiestas = [
    { 
      id: 'fest-1', 
      nombre: 'Fiesta de la Preciosa Sangre de Cristo', 
      fecha: '1 al 9 de Julio', 
      descripcion: 'Celebración religiosa en honor al Santo Patrono de Charo',
      imagen: '/imagenes/pueblo/fiesta1.jpeg',
      destacado: 'Evento principal: Procesión del 1 de julio con danzas tradicionales'
    },
    { 
      id: 'fest-2', 
      nombre: 'Festival Cultural Charoense', 
      fecha: '15 al 20 de Julio', 
      descripcion: 'Evento artístico con música, danza y teatro regional',
      imagen: '/imagenes/pueblo/fiesta2.jpeg',
      destacado: 'Presentación de grupos folklóricos en el atrio parroquial'
    },
    { 
      id: 'fest-3', 
      nombre: 'Feria del Elote y la Tortilla', 
      fecha: '25 al 30 de Julio', 
      descripcion: 'Celebración gastronómica de productos locales',
      imagen: '/imagenes/pueblo/fiesta3.jpeg',
      destacado: 'Concurso de mejores platillos a base de maíz'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Conoce las fiestas disponibles en julio </h2>
        </div>

        {/* Contenedor de fiestas (ahora divs en lugar de botones) */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 p-2">
          {fiestas.map((fiesta) => (
            <div
              key={fiesta.id}
              className="w-full flex items-start gap-4 p-3 rounded-xl border-2 border-gray-200 bg-white"
            >
              <img 
                src={fiesta.imagen} 
                alt={fiesta.nombre} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">{fiesta.nombre}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {fiesta.fecha}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{fiesta.descripcion}</p>
                <p className="text-sm text-green-700 mt-2 font-medium">
                  {fiesta.destacado}
                </p>
              </div>
            </div>
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
            onClick={() => onNext()}
            className="flex-1 px-4 py-2 rounded-lg font-medium transition bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}