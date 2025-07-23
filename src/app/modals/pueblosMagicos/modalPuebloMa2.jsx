'use client';
import { useState } from 'react';

export default function ModalPueblosMagicos({ show, onClose, onNext, onBack }) {
  const [seleccionado, setSeleccionado] = useState(null);

  const fiestas = [
    { 
      id: 'fiesta-1', 
      nombre: 'Feria Internacional de la Guitarra en Paracho', 
      fecha: 'del 6 al 14 de julio', 
      descripcion: 'Festival cultural donde artesanos, músicos y visitantes celebran la tradición guitarrera de Paracho.',
      imagen: '/imagenes/puebloMagico/Fiesta1.jpg',
      destacado: 'Evento principal: Concurso de Guitarra'
    },
    { 
      id: 'fiesta-2', 
      nombre: 'Fiesta Patronal de Santiago Apóstol', 
      fecha: '25 de Julio', 
      descripcion: 'Celebración religiosa en honor a Santiago Apóstol.',
      imagen: '/imagenes/puebloMagico/Fiesta2.jpeg',
      destacado: 'Ambiente 100% familiar y festivo'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Eventos disponibles el mes de julio en Paracho</h2>
          <p className="text-gray-500 mt-2 text-sm">Conoce las fiestas disponibles</p>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 p-2">
          {fiestas.map((fiesta) => (
            <div
              key={fiesta.id}
              onClick={() => setSeleccionado(fiesta)}
              className={`w-full flex items-start gap-4 p-3 rounded-xl border-2 cursor-pointer transition ${
                seleccionado?.id === fiesta.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white'
              }`}
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
            onClick={() => onNext(4)}
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
