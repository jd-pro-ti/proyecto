'use client';

import { useState, useEffect } from 'react';
import ModalInicio from '../components/modalInicio';

// Playa
import ModalPlaya1 from './playas/modalPlaya1';
import ModalPlaya2 from './playas/modalPlaya2';
import ModalPlaya3 from './playas/modalPlaya3';
import ModalPlaya4 from './playas/modalPlaya4';
import ModalPlaya5 from './playas/modalPlaya5';
import ModalPlaya6 from './playas/modalPlaya6';
import ModalPlaya7 from './playas/modalplaya7';
import ModalPlaya8 from './playas/modalPlaya8';

// Pueblos Mágicos
import ModalPuebloMa1 from './pueblosMagicos/modalPuebloMa1';
import ModalPuebloMa2 from './pueblosMagicos/modalPuebloMa2';
import ModalPuebloMa3 from './pueblosMagicos/modalPuebloMa3';
import ModalPuebloMa4 from './pueblosMagicos/modalPuebloMa4';
import ModalPuebloMa5 from './pueblosMagicos/modalPuebloMa5';
import ModalPuebloMa6 from './pueblosMagicos/modalPuebloMa6';
import ModalPuebloMa7 from './pueblosMagicos/modalPuebloMa7';
import ModalPuebloMa8 from './pueblosMagicos/modalPuebloMa8';

// Pueblos
import ModalPueblo1 from './pueblos/modalPueblo1';
import ModalPueblo2 from './pueblos/modalPueblo2';
import ModalPueblo3 from './pueblos/modalPueblo3';
import ModalPueblo4 from './pueblos/modalPueblo4';
import ModalPueblo5 from './pueblos/modalPueblo5';
import ModalPueblo6 from './pueblos/modalPueblo6';
import ModalPueblo7 from './pueblos/modalPueblo7';
import ModalPueblo8 from './pueblos/modalPueblo8';
import ModalPueblo9 from './pueblos/modalPueblo9';

export default function ModalSelector({ onFinish }) {
  const [step, setStep] = useState('inicio');
  const [modalIndex, setModalIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [startedFromSearch, setStartedFromSearch] = useState(false);
  const [searchStartIndex, setSearchStartIndex] = useState(null);
  const [categoriaPueblo, setCategoriaPueblo] = useState(null);
  const [fromHospedajeSalto, setFromHospedajeSalto] = useState(false);
  const [previousModalBeforeSalto, setPreviousModalBeforeSalto] = useState(null);

  useEffect(() => {
    openModal();
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setShow(true), 30);
  };

  const closeModal = (finalizar = false) => {
  setShow(false);
  setTimeout(() => {
    setIsOpen(false);
    if (finalizar && onFinish) onFinish(); // Solo si se indica que es cierre final
  }, 300);
};



const goToCategory = (category, index = 1) => {
  closeModal();

  setTimeout(() => {
    // Si el índice de inicio es > 1, activamos el flag para que trasModal sepa que viene de una búsqueda
    if (index > 1) {
        setStartedFromSearch(true);
        setSearchStartIndex(index);
      } else {
        setStartedFromSearch(false);
        setSearchStartIndex(null);
      }

    // Configuramos la categoría y el índice según la búsqueda
    if (category === 'pueblos') {
      setCategoriaPueblo(null);
      setStep('pueblos');
      setModalIndex(index); // index podría ser 3 si se elige desde búsqueda
    } else if (
      ['Coloniales', 'naturaleza', 'artesanias', 'gastronomia', 'pueblos magicos'].includes(category)
    ) {
      setCategoriaPueblo(category);
      setStep('pueblos');
      setModalIndex(index); // igual para subcategorías
    } else if (category === 'playa') {
      setStep('playa');
      setModalIndex(index); // <<--- aquí se permite que vaya directamente al modal 2
    } else if (category === 'pueblosMagicos') {
      setStep('pueblosMagicos');
      setModalIndex(index);
    } else {
      setStep('inicio');
      setModalIndex(1);
    }

    openModal();
  }, 350);
};


  const nextModal = (forceIndex = null) => {
    closeModal();
    setTimeout(() => {
      const maxIndexByStep = {
        playa: 8,
        pueblosMagicos: 8,
        pueblos: 9,
      };

      const maxIndex = maxIndexByStep[step] || 5;

      if (typeof forceIndex === 'number') {
        // Guardar modal anterior SOLO si es salto especial
        if (
          (step === 'pueblos' && modalIndex === 4 && forceIndex === 8) ||
          (step === 'pueblosMagicos' && modalIndex === 3 && forceIndex === 7) ||
          (step === 'playa' && modalIndex === 3 && forceIndex === 7)
        ) {
          setFromHospedajeSalto(true);
          setPreviousModalBeforeSalto(modalIndex);
        } else {
          setFromHospedajeSalto(false);
          setPreviousModalBeforeSalto(null);
        }

        setModalIndex(forceIndex);
        openModal();
      } else if (modalIndex < maxIndex) {
        setModalIndex((prev) => prev + 1);
        setFromHospedajeSalto(false);
        setPreviousModalBeforeSalto(null);
        openModal();
      } else {
        setStep('inicio');
        setModalIndex(1);
        setFromHospedajeSalto(false);
        setPreviousModalBeforeSalto(null);
        setStartedFromSearch(false);
        setSearchStartIndex(null);
        closeModal(true);
      }
    }, 350);
  };

  const trasModal = () => {
  closeModal();
  setTimeout(() => {
    // Si venimos de un salto especial (hospedaje), volvemos al modal de origen
    if (fromHospedajeSalto && previousModalBeforeSalto !== null) {
      setModalIndex(previousModalBeforeSalto);
      setFromHospedajeSalto(false);
      setPreviousModalBeforeSalto(null);
      openModal();
      return;
    }

    // Si venimos de una búsqueda (iniciado en un modal > 1)
    if (startedFromSearch && searchStartIndex !== null) {
      if (modalIndex > searchStartIndex) {
        setModalIndex((prev) => prev - 1);
        openModal();
        return;
      } else {
        setStep('inicio');
        setModalIndex(1);
        setStartedFromSearch(false);
        setSearchStartIndex(null);
        openModal();
        return;
      }
    }

    // Si estamos en el primer modal del flujo, volvemos al inicio
    const isFirstModal = 
      (step === 'playa' && modalIndex === 1) ||
      (step === 'pueblosMagicos' && modalIndex === 1) ||
      (step === 'pueblos' && modalIndex === 1);

    if (isFirstModal) {
      setStep('inicio');
      setModalIndex(1);
      setFromHospedajeSalto(false);
      setPreviousModalBeforeSalto(null);
      setStartedFromSearch(false);
      setSearchStartIndex(null);
      openModal();
      return;
    }

    // Retroceso normal
    setModalIndex((prev) => prev - 1);
    openModal();
  }, 350);
};

  return (
    <>
      {/* Modal de inicio */}
      {isOpen && step === 'inicio' && (
        <ModalInicio show={show} onClose={closeModal} onSelect={goToCategory} />
      )}

      {/* Playa */}
      {isOpen && step === 'playa' && modalIndex === 1 && (
        <ModalPlaya1 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'playa' && modalIndex === 2 && (
        <ModalPlaya2 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'playa' && modalIndex === 3 && (
        <ModalPlaya3 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'playa' && modalIndex === 4 && (
        <ModalPlaya4 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'playa' && modalIndex === 5 && (
        <ModalPlaya5 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'playa' && modalIndex === 6 && (
        <ModalPlaya6 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'playa' && modalIndex === 7 && (
      <ModalPlaya7 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'playa' && modalIndex === 8 && (
      <ModalPlaya8 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}

      {/* Pueblos Magicos */}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 1 && (
        <ModalPuebloMa1 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 2 && (
        <ModalPuebloMa2 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 3 && (
        <ModalPuebloMa3 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 4 && (
        <ModalPuebloMa4 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 5 && (
        <ModalPuebloMa5 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 6 && (
        <ModalPuebloMa6 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 7 && (
        <ModalPuebloMa7 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 8 && (
        <ModalPuebloMa8 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}

      {/* Pueblos*/}
      {isOpen && step === 'pueblos' && modalIndex === 1 && (
        <ModalPueblo1 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblos' && modalIndex === 2 && (
        <ModalPueblo2
          show={show}
          onClose={closeModal}
          onNext={nextModal}
          onBack={trasModal}
          onSelect={goToCategory}
          categoriaSeleccionada={categoriaPueblo}
        />
      )}
      {isOpen && step === 'pueblos' && modalIndex === 3 && (
        <ModalPueblo3 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblos' && modalIndex === 4 && (
        <ModalPueblo4 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblos' && modalIndex === 5 && (
        <ModalPueblo5 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblos' && modalIndex === 6 && (
        <ModalPueblo6 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblos' && modalIndex === 7 && (
        <ModalPueblo7 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblos' && modalIndex === 8 && (
        <ModalPueblo8 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
      {isOpen && step === 'pueblos' && modalIndex === 9 && (
        <ModalPueblo9 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory} />
      )}
    </>
  );
}
