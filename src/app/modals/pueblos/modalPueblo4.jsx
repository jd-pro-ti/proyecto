'use client';
import { useState } from 'react';

export default function ModalPuebloMa4({ show, onClose, onNext, onBack }) {
  const [respuesta, setRespuesta] = useState(null);

  const handleSiguiente = () => {
    if (respuesta === true) {
      onNext(); // Siguiente normal
    } else if (respuesta === false) {
      onNext(8); // Saltar a modal 7
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all duration-300 ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">¿Te quieres hospedar?</h2>
          <p className="text-gray-500 mt-2 text-sm">Recibe recomendaciones personalizadas</p>
        </div>

        {/* Botones Sí/No */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setRespuesta(true)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              respuesta === true
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sí
          </button>
          <button
            onClick={() => setRespuesta(false)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              respuesta === false
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cerrar
          </button>
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Volver
          </button>
          <button
            onClick={handleSiguiente}
            disabled={respuesta === null}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              respuesta === null
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
