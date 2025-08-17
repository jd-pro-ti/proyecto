'use client';

import React, { useState, useEffect, useRef } from 'react';
import StepInicio from './Steps/stepInicio';
import StepPueblos from './Steps/stepPueblos';
import StepDestino from './Steps/stepDestino';
import StepHospedaje from './Steps/stepHospedaje';
import StepHoteles from './Steps/stepHoteles';
import StepHabitaciones from './Steps/stepHabitaciones'; // 👈 ojo al nombre
import StepEventos from './Steps/stepEventos';
import StepDespedida from './Steps/stepDespedida';

const WizarSteps = React.memo(function ModalFlujo({ show, onClose }) {
  if (!show) return null;

  const [paso, setPaso] = useState(1); // 0 = StepInicio
  const [saltadoHospedaje, setSaltadoHospedaje] = useState(false);
  const [saltadoHoteles, setSaltadoHoteles] = useState(false);
  const yaSaltado = useRef(false);

  const [datosCompartidos, setDatosCompartidos] = useState({
    categoria: null,
    destino: null,
    tipoViaje: null,
    detallesPersonas: { adultos: 1, ninos: 0, bebes: 0 },
    necesitaHospedaje: null,
    fechas: { inicio: null, fin: null },
    hotel: null,
    habitacion: null,
    evento: null,
    seleccion: null,
    subCategoria: null,
    destinoInput: null,
  });

  // Orden de pasos por arreglo
  const pasos = [
    StepPueblos, 
    StepInicio,         // 1
    StepDestino,        // 2
    StepHospedaje,      // 3
    StepHoteles,        // 4
    StepHabitaciones,   // 5
    StepEventos,        // 6
    StepDespedida,      // 7
  ];

  // Si ya viene un destino/categoría precargado, saltar directo a Hospedaje
  useEffect(() => {
    if (!yaSaltado.current && datosCompartidos.destinoInput) {
      yaSaltado.current = true;
      setDatosCompartidos(prev => ({
        ...prev,
        destino: prev.destinoInput.nombre || prev.destinoInput,
        categoria: prev.destinoInput.categoria || prev.categoria,
      }));
      setPaso(3); // StepHospedaje
    }
  }, [datosCompartidos.destinoInput]);

  const handleSiguiente = (nuevosDatos = {}) => {
    setDatosCompartidos(prev => {
      const nuevos = { ...prev, ...nuevosDatos };

      if (nuevos.destino && nuevos.categoria) {
        nuevos.destinoInput = {
          nombre: nuevos.destino?.nombre || nuevos.destino,
          categoria: nuevos.categoria,
        };
      }

      let siguientePaso = paso + 1;

      // Desde StepHospedaje (3): si no necesita hospedaje, saltar a Eventos (6)
      if (paso === 3 && nuevos.necesitaHospedaje === false) {
        siguientePaso = 6;
        setSaltadoHospedaje(true);
      } else {
        setSaltadoHospedaje(false);
      }

      // Desde StepHoteles (4): si no hay hoteles, saltar a Eventos (6)
      if (paso === 4 && nuevos.sinHoteles) {
        siguientePaso = 6;
        setSaltadoHoteles(true);
      } else {
        setSaltadoHoteles(false);
      }

      setPaso(siguientePaso);
      return nuevos;
    });
  };

  const handleVolver = () => {
    if (paso === 1) return onClose();

    // Si estamos en Eventos (6), regresar al paso correcto según los saltos
    if (paso === 6) {
      if (saltadoHoteles) return setPaso(4);   // volver a Hoteles
      if (saltadoHospedaje) return setPaso(3); // volver a Hospedaje
      return setPaso(5);                       // si no hubo saltos, a Habitaciones
    }

    setPaso(p => p - 1);
  };

  const PasoActual = pasos[paso];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl">
        {PasoActual && (
          <PasoActual
            datos={datosCompartidos}
            onSiguiente={handleSiguiente}
            onVolver={handleVolver}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
});

export default WizarSteps;