'use client';

import React, { useState, useEffect, useRef } from 'react';
import StepInicio from './Steps/stepInicio';
import StepPueblos from './Steps/stepPueblos';
import StepDestino from './Steps/stepDestino';
import StepHospedaje from './Steps/stepHospedaje';
import StepHoteles from './Steps/stepHoteles';
import StepHabitaciones from './Steps/stepHabitaciones'; 
import StepEventos from './Steps/stepEventos';
import StepDespedida from './Steps/stepDespedida';

const WizarSteps = React.memo(function ModalFlujo({ show, onClose }) {
  if (!show) return null;

  // Estado inicial de datosCompartidos
  const estadoInicialDatos = {
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
  };

  // Estado principal
  const [paso, setPaso] = useState(1); // default = StepInicio
  const [saltadoHospedaje, setSaltadoHospedaje] = useState(false);
  const [saltadoHoteles, setSaltadoHoteles] = useState(false);
  const yaSaltado = useRef(false);

  const [datosCompartidos, setDatosCompartidos] = useState(estadoInicialDatos);

  // 🔹 Reiniciar estados cuando se llegue a StepInicio
  useEffect(() => {
    if (paso === 1) {
      setDatosCompartidos(estadoInicialDatos);
      setSaltadoHospedaje(false);
      setSaltadoHoteles(false);
      yaSaltado.current = false;
      console.log(yaSaltado)
    }
  }, [paso]);

  // Definición de pasos
  const pasos = [
    StepPueblos,        // 0
    StepInicio,         // 1
    StepDestino,        // 2
    StepHospedaje,      // 3
    StepHoteles,        // 4
    StepHabitaciones,   // 5
    StepEventos,        // 6
    StepDespedida,      // 7
  ];

  // 🔹 Si la categoría es "pueblos", arrancar en paso 0
  useEffect(() => {
    if (datosCompartidos.categoria?.toLowerCase() === "pueblos" && paso !== 0) {
      setPaso(0);
    }
  }, [datosCompartidos.categoria]);

  // Si ya viene un destino/categoría precargado, saltar directo a Hospedaje
  useEffect(() => {
    if (!yaSaltado.current && datosCompartidos.destinoInput) {
      yaSaltado.current = true;
    console.log(yaSaltado)
      setDatosCompartidos(prev => {
        const nuevos = {
          ...prev,
          destino: prev.destinoInput.nombre || prev.destinoInput,
          categoria: prev.destinoInput.categoria || prev.categoria,
        };
          setPaso(3);
        

        return nuevos;
      });
    }
  }, [datosCompartidos.destinoInput]);

 const [pasoAnterior, setPasoAnterior] = useState(null);

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

    if (paso === 0) {
      siguientePaso = 2;
    }

    if (paso === 3 && nuevos.necesitaHospedaje === false) {
      siguientePaso = 6;
      setSaltadoHospedaje(true);
    } else {
      setSaltadoHospedaje(false);
    }

    if (paso === 4 && nuevos.sinHoteles) {
      siguientePaso = 6;
      setSaltadoHoteles(true);
    } else {
      setSaltadoHoteles(false);
    }

    // 🔹 Guardar de dónde viene
    setPasoAnterior(paso);
    setPaso(siguientePaso);
    return nuevos;
  });
};

const handleVolver = () => {
  if (paso === 1) return onClose();
  if (yaSaltado.current && paso === 3) return setPaso(1);
  if (paso === 0) return setPaso(1);

  // 🔹 Solo regresar a 0 si efectivamente vienes de 0
  if (paso === 2 && pasoAnterior === 0) return setPaso(0);

  if (paso === 6) {
    if (saltadoHoteles) return setPaso(4);
    if (saltadoHospedaje) return setPaso(3);
    return setPaso(5);
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