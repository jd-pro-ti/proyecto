'use client';

import { useState, useCallback } from 'react';
import ModalInicio from './components/modalInicio';
import ModalFlujo from './components/modalFlujo';
import ModalPueblo from './components/modalPueblo';

export default function Home() {
  const [showInicio, setShowInicio] = useState(false);
  const [showFlujo, setShowFlujo] = useState(false);
  const [showPueblo, setShowPueblo] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [subcategoria, setSubcategoria] = useState(null);
  const [destino, setdestino] = useState(null);
  const [seleccionFinal, setSeleccionFinal] = useState(null);

const handleSelect = useCallback((categoriaSeleccionada, lugar) => {
  setCategoria(categoriaSeleccionada);
  setdestino(lugar);
  setShowInicio(false);

  if (categoriaSeleccionada === 'pueblos' && !lugar) {
    setShowPueblo(true);
  } else {
    setShowFlujo(true);
  }
}, []);

const handleCerrarFlujo = useCallback(() => {
  setShowFlujo(false);
  setShowPueblo(false);
  setCategoria(null);
  setSeleccionFinal(null);
  setSubcategoria(null);
  setdestino(null);
}, []);

const handleVolver = useCallback(() => {
 setShowFlujo(false);
    setShowPueblo(false);
    setShowInicio(true);
}, []);

const handleNext = useCallback(({ subcategoria }) => {
  setSubcategoria(subcategoria);

  if (subcategoria === 'pueblos magicos') {
    setCategoria('pueblosMagicos');
  } else if (categoria === 'playas') {
    setCategoria('playas');
  } else {
    setCategoria('pueblos');
  }

  setSeleccionFinal(subcategoria);
  setShowPueblo(false);
  setShowFlujo(true);
}, [categoria]);
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
          subCategoria={subcategoria}
          destino={destino} 
        />
      )}

      {showPueblo && (
        <ModalPueblo
          show={showPueblo}
          onClose={handleCerrarFlujo}
          onBack={handleVolver}
          subCategoria={subcategoria}
          onNext={handleNext}
          destino={destino} 
        />
      )}
    </main>
  );
}
