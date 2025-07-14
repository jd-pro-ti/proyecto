'use client';
import { useEffect, useState } from 'react';

export default function ModalPueblo2({ show, onClose, onNext, onBack, categoriaSeleccionada }) {
  
  const todosLosPueblos = {
    naturaleza: [
      { id: 'cheran', label: 'Cherán', icon: '/imagenes/pueblo/pueblo6.svg' },
      { id: 'tacambaro', label: 'Tacámbaro', icon: '/imagenes/pueblo/pueblo7.svg' },
      { id: 'tzitzio', label: 'Tzitzio', icon: '/imagenes/pueblo/pueblo8.svg' },
      { id: 'tzucuaran', label: 'Tzucuarán', icon: '/imagenes/pueblo/pueblo9.svg' },
    ],
    Coloniales: [
      { id: 'charo', label: 'Charo', icon: '/imagenes/pueblo/pueblo10.svg' },
      { id: 'tingambato', label: 'Tingambato', icon: '/imagenes/pueblo/pueblo11.svg' },
      { id: 'indaparapeo', label: 'Indaparapeo', icon: '/imagenes/pueblo/pueblo12.svg' },
    ],
    artesanias: [
      { id: 'nahuatzen', label: 'Nahuatzen', icon: '/imagenes/pueblo/pueblo13.svg' },
      { id: 'turicato', label: 'Turicato', icon: '/imagenes/pueblo/pueblo14.svg' },
      { id: 'coeneo', label: 'Coeneo', icon: '/imagenes/pueblo/pueblo15.svg' },
    ],
    gastronomia: [
      { id: 'zinapecuaro', label: 'Zinapécuaro', icon: '/imagenes/pueblo/pueblo16.svg' },
      { id: 'tinguindin', label: 'Tingüindín', icon: '/imagenes/pueblo/pueblo17.svg' },
      { id: 'zinaparo', label: 'Zináparo', icon: '/imagenes/pueblo/pueblo18.svg' },
    ],
  };

  const [pueblos, setPueblos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    if (categoriaSeleccionada && todosLosPueblos[categoriaSeleccionada]) {
      setPueblos(todosLosPueblos[categoriaSeleccionada]);
      setSeleccionado(null); // Resetear selección al cambiar categoría
    } else {
      setPueblos([]);
    }
  }, [categoriaSeleccionada]);

  const toggleSeleccion = (puebloId) => {
    setSeleccionado(prev => prev === puebloId ? null : puebloId);
  };

  const handleSiguiente = () => {
    if (seleccionado) {
      onNext(seleccionado);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300 ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Pueblos {categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Selecciona alguno para continuar</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {pueblos.map((pueblo) => (
            <button
              key={pueblo.id}
              onClick={() => toggleSeleccion(pueblo.id)}
              className={`flex flex-col items-center justify-center cursor-pointer gap-1 p-3 rounded-xl border-2 min-w-[100px] transition-all ${
                seleccionado === pueblo.id
                  ? 'border-green-500 bg-green-50 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-md'
              }`}
            >
              <img src={pueblo.icon} alt={pueblo.label} className="w-12 h-12 object-contain" />
              <span className="text-xs font-medium text-gray-700 text-center">{pueblo.label}</span>
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