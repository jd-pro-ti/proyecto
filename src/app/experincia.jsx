'use client';

import ModalInicio from './components/modalInicio';
import ModalFlujo from './components/modalFlujo';
import ModalPueblo from './components/modalPueblo';
import { useExperiencia } from './components/hooks/useExperiencia';

export default function Experiencia() {
  const {
    showInicio,
    showFlujo,
    showPueblo,
    categoria,
    subcategoria,
    destino,
    setShowInicio,
    handleSelect,
    handleCerrarFlujo,
    handleVolver,
    handleNext
  } = useExperiencia();

  return (
    <>
      <button
        onClick={() => setShowInicio(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 cursor-pointer "
      >
        Personaliza tu experiencia
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
    </>
  );
}
