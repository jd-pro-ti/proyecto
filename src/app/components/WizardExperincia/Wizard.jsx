// Wizard.jsx
'use client';
import React from "react";
import { useWizard } from './WizarProvider';
import { useWizardFlow } from './useWizard';

import StepInicio from './Steps/stepInicio'
import StepPueblos from './Steps/stepPueblos'
import StepDestino from './Steps/stepDestino'
import StepHospedaje from './Steps/stepHospedaje'
import StepHoteles from './Steps/stepHoteles'
import StepHabitaciones from './Steps/stepHabitaciones'
import StepEventos from './Steps/stepEventos'
import StepDespedida from './Steps/stepDespedida'

const pasos = [
  StepPueblos,
  StepInicio,
  StepDestino,
  StepHospedaje,
  StepHoteles,
  StepHabitaciones,
  StepEventos,
  StepDespedida,
];

export default function Wizard({ show, onClose }) {
  const { paso, datos } = useWizard();
  const { handleSiguiente, handleVolver } = useWizardFlow();

  const PasoActual = pasos[paso];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl">
        {PasoActual && (
          <PasoActual
            datos={datos}
            onSiguiente={handleSiguiente}
            onVolver={handleVolver}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
