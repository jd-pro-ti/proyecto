'use client';

import React, { useState } from 'react';
import WizarSteps from '../WizardExperincia/WizarSteps';

export default function Modal() {
  const [showWizar, setShowWizar] = useState(false);


  return (
    <>
      <Button
        text="Comienza tu aventura"
        variant="secondary"
        size="sm"
        className="cursor-pointer"
        onClick={() => {
          console.log("Mostrar modal");
          setShowInicio(true);
        }}>
            
        </Button>

      {showWizar && (
        <WizarSteps
          show={showWizar}
          onClose={() => setShowWizar(false)}
        />
      )}
    </>
  );
}
