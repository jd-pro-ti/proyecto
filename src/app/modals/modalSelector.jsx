'use client';

import { useState, useEffect } from 'react';
import ModalInicio from './modalInicio';

// Playa
import ModalPlaya1 from './playas/modalPlaya1';
import ModalPlaya2 from './playas/modalPlaya2';
import ModalPlaya3 from './playas/modalPlaya3';
import ModalPlaya4 from './playas/modalPlaya4';
import ModalPlaya5 from './playas/modalPlaya5';
import ModalPlaya6 from './playas/modalPlaya6';


// Pueblos Mágicos
import ModalPuebloMa1 from './pueblosMagicos/modalPuebloMa1';
import ModalPuebloMa2 from './pueblosMagicos/modalPuebloMa2';
import ModalPuebloMa3 from './pueblosMagicos/modalPuebloMa3';
import ModalPuebloMa4 from './pueblosMagicos/modalPuebloMa4';
import ModalPuebloMa5 from './pueblosMagicos/modalPuebloMa5';
import ModalPuebloMa6 from './pueblosMagicos/modalPuebloMa6';
import ModalPuebloMa7 from './pueblosMagicos/modalPuebloMa7';


// Pueblos
import ModalPueblo1 from './pueblos/modalPueblo1';
import ModalPueblo2 from './pueblos/modalPueblo2';
import ModalPueblo3 from './pueblos/modalPueblo3';
import ModalPueblo4 from './pueblos/modalPueblo4';
import ModalPueblo5 from './pueblos/modalPueblo5';


export default function ModalSelector({ onFinish }) {
  const [step, setStep] = useState('inicio'); 
  const [modalIndex, setModalIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [startedFromSearch, setStartedFromSearch] = useState(false);
  const [fromHospedajeSalto, setFromHospedajeSalto] = useState(false);



  useEffect(() => {
    openModal();
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setShow(true), 30);
  };


 const goToCategory = (category, index = 1) => {
  closeModal();
  setTimeout(() => {
    setStartedFromSearch(index > 1); 
    setStep(category);
    setModalIndex(index);
    openModal();
  }, 350);
};



  const closeModal = () => {
    setShow(false);
    setTimeout(() => {
      setIsOpen(false);
      if (onFinish) onFinish(); 
    }, 300);
  };

  const nextModal = (forceIndex = null) => {
  closeModal();
  setTimeout(() => {
    const maxIndexByStep = {
      playa: 6,
      pueblosMagicos: 7,
      pueblos: 5,
    };

    const maxIndex = maxIndexByStep[step] || 5;

    const validForceIndex = typeof forceIndex === 'number' ? forceIndex : null;

    if (validForceIndex !== null) {
      if (step === 'pueblosMagicos' && modalIndex === 4 && validForceIndex === 7) {
        setFromHospedajeSalto(true);
      } else {
        setFromHospedajeSalto(false);
      }
      setModalIndex(validForceIndex);
      openModal();
    } else if (modalIndex < maxIndex) {
      setModalIndex((prev) => prev + 1);
      setFromHospedajeSalto(false); 
      openModal();
    } else {
      setStep('inicio');
      setModalIndex(1);
      setFromHospedajeSalto(false);
      setStartedFromSearch(false);
      openModal();
    }
  }, 350);
};



const trasModal = () => {
  closeModal();
  setTimeout(() => {
    if (modalIndex === 7 && fromHospedajeSalto) {
      setModalIndex(4);
      setFromHospedajeSalto(false); 
      openModal();
      return;
    }

    if (modalIndex > 1) {
      setModalIndex((prev) => prev - 1);
      openModal();
    } else {
      setStep('inicio');
      setModalIndex(1);
      setStartedFromSearch(false);
      setFromHospedajeSalto(false);
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
      {isOpen && step === 'playa' && modalIndex === 1 && <ModalPlaya1 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory}/>}
      {isOpen && step === 'playa' && modalIndex === 2 && <ModalPlaya2 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}onSelect={goToCategory}/>}
      {isOpen && step === 'playa' && modalIndex === 3 && <ModalPlaya3 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}onSelect={goToCategory}/>}
      {isOpen && step === 'playa' && modalIndex === 4 && <ModalPlaya4 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}onSelect={goToCategory}/>}
      {isOpen && step === 'playa' && modalIndex === 5 && <ModalPlaya5 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}onSelect={goToCategory}/>}
      {isOpen && step === 'playa' && modalIndex === 6 && <ModalPlaya6 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}onSelect={goToCategory}/>}

      {/* Pueblos Magicos */}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 1 && <ModalPuebloMa1 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory}/>}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 2 && <ModalPuebloMa2 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory}/>}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 3 && <ModalPuebloMa3 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory}/>}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 4 && <ModalPuebloMa4 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory}/>}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 5 && <ModalPuebloMa5 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory}/>}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 6 && <ModalPuebloMa6 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory}/>}
      {isOpen && step === 'pueblosMagicos' && modalIndex === 7 && <ModalPuebloMa7 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal} onSelect={goToCategory}/>}

      {/* Pueblos*/}
      {isOpen && step === 'pueblos' && modalIndex === 1 && <ModalPueblo1 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}/>}
      {isOpen && step === 'pueblos' && modalIndex === 2 && <ModalPueblo2 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}/>}
      {isOpen && step === 'pueblos' && modalIndex === 3 && <ModalPueblo3 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}/>}
      {isOpen && step === 'pueblos' && modalIndex === 4 && <ModalPueblo4 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}/>}
      {isOpen && step === 'pueblos' && modalIndex === 5 && <ModalPueblo5 show={show} onClose={closeModal} onNext={nextModal} onBack={trasModal}/>}
    </>
  );
}
