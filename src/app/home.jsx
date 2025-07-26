'use client';

import { useState } from 'react';
import ModalInicio from './components/modalInicio';
import ModalFlujo from './components/modalFlujo';
import ModalPueblo from './components/modalPueblo'; // Asegúrate de importar ModalPueblo

export default function Home() {
  const [showInicio, setShowInicio] = useState(false);
  const [showFlujo, setShowFlujo] = useState(false);
  const [showPueblo, setShowPueblo] = useState(false); // Nuevo estado para ModalPueblo
  const [categoria, setCategoria] = useState(null);
  const [seleccionFinal, setSeleccionFinal] = useState(null);

  const handleSelect = (categoriaSeleccionada) => {
    setCategoria(categoriaSeleccionada);
    setShowInicio(false);
    
    // Mostrar ModalFlujo o ModalPueblo según la categoría seleccionada
    if (categoriaSeleccionada === 'pueblos') {
      setShowPueblo(true); // Mostrar ModalPueblo para "Pueblos"
    } else {
      setShowFlujo(true); // Mostrar ModalFlujo para otras categorías
    }
  };

  const handleCerrarFlujo = () => {
    setShowFlujo(false);
    setShowPueblo(false); // También cerrar ModalPueblo si está abierto
    setCategoria(null);
    setSeleccionFinal(null);
  };

  const handleVolver = () => {
    setShowFlujo(false);
    setShowPueblo(false);
    setShowInicio(true);
  };

  const handleNext = (seleccionadoId) => {
    setSeleccionFinal(seleccionadoId);
    console.log("Usuario seleccionó:", seleccionadoId);
    setShowFlujo(false);
    setShowPueblo(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <button
        onClick={() => setShowInicio(true)}
        className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg transition cursor-pointer"
      >
        Comenzar
      </button>

      {showInicio && (
        <ModalInicio
          show={showInicio}
          onClose={() => setShowInicio(false)}
          onSelect={handleSelect}
        />
      )}

      {showFlujo && (
        <ModalFlujo
          show={showFlujo}
          categoria={categoria}
          onClose={handleCerrarFlujo}
          onBack={handleVolver}
          onNext={handleNext}
        />
      )}

      {showPueblo && (
        <ModalPueblo
          show={showPueblo}
          onClose={handleCerrarFlujo}
          onBack={handleVolver}
          onNext={handleNext}
        />
      )}
    </main>
  );
}