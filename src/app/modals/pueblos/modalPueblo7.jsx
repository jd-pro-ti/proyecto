'use client';
import { useState } from 'react';

export default function ModalPuebloMa4({ show, onClose, onNext, onBack }) {
  const [respuesta, setRespuesta] = useState(null);
  const [nombre, setNombre] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false);

  const handleRespuesta = (resp) => {
    setRespuesta(resp);
    setMostrarInput(resp === true);
    if (resp === false) {
      setNombre(''); // Limpiar nombre si selecciona No
    }
  };

  const handleSiguiente = () => {
    if (respuesta === true && nombre.trim() === '') {
      alert('Por favor ingresa tu nombre para continuar con la reservación');
      return;
    }

    if (respuesta === true) {
      onNext({ nombre }); // Enviamos el nombre junto con la acción
    } else if (respuesta === false) {
      onNext(8); // Saltar a modal 8
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
          <h2 className="text-2xl font-bold text-gray-800">¿Te gustaría seguir con la reservación?</h2>
          <p className="text-gray-500 mt-2 text-sm">Selecciona una opción para continuar</p>
        </div>

        {/* Botones Sí/No */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleRespuesta(true)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              respuesta === true
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sí
          </button>
          <button
            onClick={() => handleRespuesta(false)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              respuesta === false
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>

        {/* Input para nombre (solo visible si selecciona Sí) */}
        {mostrarInput && (
          <div className="mb-6 animate-fadeIn">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Ingresa tu nombre para la reservación
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black transition"
              placeholder="Nombre"
            />
          </div>
        )}

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
            disabled={respuesta === null || (respuesta === true && nombre.trim() === '')}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              respuesta === null || (respuesta === true && nombre.trim() === '')
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