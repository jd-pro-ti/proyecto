'use client';

import React, { useState, useCallback } from 'react';
// ⬇️ Ajusta la ruta según tu carpeta:
// si tu carpeta se llama "WizardExperincia" (con i), usa esa;
// si la corriges a "WizardExperiencia", cambia la import.
import {WizardProvider}  from '../WizardExperincia/WizarProvider';
import Wizard from '../WizardExperincia/Wizard';

export default function Modal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer text-sm"
      >
        Comienza tu aventura
      </button>

      {open && (
        <WizardProvider>
          <Wizard show={open} onClose={handleClose} />
        </WizardProvider>
      )}
    </>
  );
}
