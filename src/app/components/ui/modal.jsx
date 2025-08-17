'use client';

import React, { useState } from 'react';
import WizarSteps from '../WizardExperincia/WizarSteps';

export default function Modal() {
  const [showWizar, setShowWizar] = useState(false);


  return (
    <>
      <button
        onClick={() => setShowWizar(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 cursor-pointer"
      >
        Personaliza tu experiencia
      </button>

      {showWizar && (
        <WizarSteps
          show={showWizar}
          onClose={() => setShowWizar(false)}
        />
      )}
    </>
  );
}
