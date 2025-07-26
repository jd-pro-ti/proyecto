'use client';
import { useState } from 'react';
import ModalInicio from './components/modalInicio';
import ModalFlujo from './components/modalFlujo';
import ModalPueblo from './components/modalPueblo';

export default function Home() {
  const [showInicio, setShowInicio] = useState(false);
  const [showFlujo, setShowFlujo] = useState(false);
  const [showPueblo, setShowPueblo] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [categoriaPuebloSeleccionada, setCategoriaPuebloSeleccionada] = useState(null); // Nuevo estado
  const [seleccionFinal, setSeleccionFinal] = useState(null);

  const handleSelect = (categoriaSeleccionada, subcategoria = null) => {
    setCategoria(categoriaSeleccionada);
    setCategoriaPuebloSeleccionada(subcategoria); // Guardar la subcategoría
    
    if (categoriaSeleccionada === 'pueblos') {
      setShowPueblo(true);
    } else {
      setShowFlujo(true);
    }
    setShowInicio(false);
  };

  // Resto de tus funciones...

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
          categoriaSeleccionada={categoriaPuebloSeleccionada} // Pasar la prop
          onClose={handleCerrarFlujo}
          onBack={() => {
            setShowFlujo(false);
            setShowInicio(true);
          }}
          onNext={handleNext}
        />
      )}

      {showPueblo && (
        <ModalPueblo
          show={showPueblo}
          onClose={() => setShowPueblo(false)}
          onSelect={handleSelect}
          onBack={() => {
            setShowPueblo(false);
            setShowInicio(true);
          }}
        />
      )}
    </main>
  );
}