'use client';

import { useState, useEffect } from 'react';
import ModalInicio from './modalInicio';

// Playa
import ModalPlaya1 from './playas/modalPlaya1';
import ModalPlaya2 from './playas/modalPlaya2';
import ModalPlaya3 from './playas/modalPlaya3';
import ModalPlaya4 from './playas/modalPlaya4';
import ModalPlaya5 from './playas/modalPlaya5';


// Gastronomía
import ModalGastro1 from './gastronomia/modalGastro1';
import ModalGastro2 from './gastronomia/modalGastro2';
import ModalGastro3 from './gastronomia/modalGastro3';
import ModalGastro4 from './gastronomia/modalGastro4';
import ModalGastro5 from './gastronomia/modalGastro5';


// Pueblos Mágicos
import ModalPueblo1 from './pueblos/modalPueblo1';
import ModalPueblo2 from './pueblos/modalPueblo2';
import ModalPueblo3 from './pueblos/modalPueblo3';
import ModalPueblo4 from './pueblos/modalPueblo4';
import ModalPueblo5 from './pueblos/modalPueblo5';


export default function ModalSelector() {
  const [step, setStep] = useState('inicio'); 
  const [modalIndex, setModalIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    openModal();
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setShow(true), 30);
  };

  const closeModal = () => {
    setShow(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const goToCategory = (category) => {
    closeModal();
    setTimeout(() => {
      setStep(category);     
      setModalIndex(1);      // reinicia el índice
      openModal();
    }, 350);
  };

  const nextModal = () => {
    closeModal();
    setTimeout(() => {
      if (modalIndex < 5) {
        setModalIndex((prev) => prev + 1);
        openModal();
      } else {
        setStep('inicio'); // volver a inicio al terminar
        setModalIndex(1);
        openModal();
      }
    }, 350);
  };

  return (
    <>
      {/* Modal de inicio */}
      {isOpen && step === 'inicio' && (
        <ModalInicio
          show={show}
          onClose={closeModal}
          onSelect={goToCategory}
        />
      )}

      {/* Playa */}
      {isOpen && step === 'playa' && modalIndex === 1 && <ModalPlaya1 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'playa' && modalIndex === 2 && <ModalPlaya2 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'playa' && modalIndex === 3 && <ModalPlaya3 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'playa' && modalIndex === 4 && <ModalPlaya4 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'playa' && modalIndex === 5 && <ModalPlaya5 show={show} onClose={closeModal} onNext={nextModal} />}

      {/* Gastronomía */}
      {isOpen && step === 'gastronomia' && modalIndex === 1 && <ModalGastro1 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'gastronomia' && modalIndex === 2 && <ModalGastro2 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'gastronomia' && modalIndex === 3 && <ModalGastro3 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'gastronomia' && modalIndex === 4 && <ModalGastro4 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'gastronomia' && modalIndex === 5 && <ModalGastro5 show={show} onClose={closeModal} onNext={nextModal} />}

      {/* Pueblos mágicos */}
      {isOpen && step === 'pueblos' && modalIndex === 1 && <ModalPueblo1 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'pueblos' && modalIndex === 2 && <ModalPueblo2 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'pueblos' && modalIndex === 3 && <ModalPueblo3 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'pueblos' && modalIndex === 4 && <ModalPueblo4 show={show} onClose={closeModal} onNext={nextModal} />}
      {isOpen && step === 'pueblos' && modalIndex === 5 && <ModalPueblo5 show={show} onClose={closeModal} onNext={nextModal} />}
    </>
  );
}
