'use client';

import React, { useState } from 'react';
import WizarSteps from '../WizardExperincia/WizarSteps';

export default function Modal() {
  const [showWizar, setShowWizar] = useState(false);


  return (
    <>
      <button
        onClick={() => {
          console.log("Mostrando wizard...");
          setShowWizar(true); 
        }}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer text-sm"
      >
        Comienza tu aventura
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