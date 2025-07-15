'use client';
import { useState } from 'react';

export default function Modalplaya7({ show, onClose, onNext, onBack }) {
const fiestas = [
    { 
    id: 'restaurante-maruata',
    nombre: 'El Paraíso de Maruata',
    fecha: '$150 - $250',
    descripcion: 'Restaurante rústico frente al mar, especializado en mariscos frescos como ceviches y pescados zarandeados.',
    imagen: '/imagenes/playa/restaurant.webp',
    destacado: 'Ideal para disfrutar atardeceres y platillos típicos costeros',
    },
    {
    id: 'restaurante-la-ticla',
    nombre: 'Palapa La Ticla',
    fecha: '$120 - $220',
    descripcion: 'Comida tradicional michoacana con énfasis en mariscos, ambiente relajado con vista a la playa.',
    imagen: '/imagenes/playa/Restaurante2.jpeg',
    destacado: 'Especialidad en camarones al coco y pescado a la talla',
    },
    {
    id: 'restaurante-caleta-campos',
    nombre: 'Mariscos Caleta',
    fecha: '$100 - $200',
    descripcion: 'Pequeño restaurante familiar con platillos frescos y precios accesibles, justo frente a la playa.',
    imagen: '/imagenes/playa/Restaurante3.webp',
    destacado: 'Famoso por sus cocteles de camarón y pescado frito',
    }
];

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Según tus preferencias estos son los lugares que te podrían interesar</h2>
        <p className="text-gray-500 mt-2 text-sm">Conoce las fiestas disponibles</p>
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
            Salir
        </button>
        </div>
    </div>
    </div>
);
}