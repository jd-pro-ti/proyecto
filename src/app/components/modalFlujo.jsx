'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import RenderDestino from './modals/destino';
import RenderHospedaje from './modals/hopedajeCalendario';
import RenderHoteles from './modals/hoteles';
import RenderHabitaciones from './modals/habitaciones';
import RenderEventos from './modals/eventos';
import RenderFinal from './modals/despedida';



const ModalFlujo = React.memo(function ModalFlujo({ show, onClose, categoria, onBack, subCategoria, destino }) {
  if (!show) return null;
  const [paso, setPaso] = useState(1);
  const [saltadoHospedaje, setSaltadoHospedaje] = useState(false);
  const [saltadoHoteles, setSaltadoHoteles] = useState(false);
  const yaSaltado = useRef(false);

  const [datosCompartidos, setDatosCompartidos] = useState({
    categoria: categoria?.tipo || categoria || null,
    destino: categoria?.destino || null,
    tipoViaje: null,
    detallesPersonas: categoria?.detallesPersonas || { adultos: 1, ninos: 0, bebes: 0 },
    necesitaHospedaje: null,
    fechas: { inicio: null, fin: null },
    hotel: null,
    habitacion: null,
    evento: null,
    seleccion: null,
    subCategoria: subCategoria || null,
    destinoInput: destino || null,
  });

  useEffect(() => {
    if (!yaSaltado.current && datosCompartidos.destinoInput) {
      yaSaltado.current = true; 

      setDatosCompartidos(prev => ({
        ...prev,
        destino: prev.destinoInput.nombre || prev.destinoInput,
        categoria: prev.destinoInput.categoria || prev.categoria,
      }));

      setPaso(2);
    }
  }, [datosCompartidos.destinoInput]);
  

  const handleSiguiente = useCallback((nuevosDatos = {}) => {
    setDatosCompartidos(prev => {
      const nuevos = {
        ...prev,
        ...nuevosDatos,
      };

      if (nuevos.destino && nuevos.categoria) {
        nuevos.destinoInput = {
          nombre: nuevos.destino?.nombre || nuevos.destino,
          categoria: nuevos.categoria,
        };
      }

      let siguientePaso = paso + 1;

      if (paso === 2 && nuevos.necesitaHospedaje === false) {
        siguientePaso = 5;
        setSaltadoHospedaje(true);
      } else {
        setSaltadoHospedaje(false);
      }

      if (paso === 3 && nuevos.sinHoteles) {
        siguientePaso = 5;
        setSaltadoHoteles(true);
      } else {
        setSaltadoHoteles(false);
      }

      setPaso(siguientePaso);
      return nuevos;
    });
  } ,[paso]);

  const handleVolver = useCallback(() => {
  if (paso === 2 && yaSaltado.current) {
    onBack();
    yaSaltado.current = false; 
  } else if (paso === 5) {
    if (saltadoHoteles) {
      setPaso(3);
    } else if (saltadoHospedaje) {
      setPaso(2);
    } else {
      setPaso(4);
    }
  } else if (paso === 4 && saltadoHospedaje) {
    setPaso(2);
  } else if (paso > 1) {
    setPaso(p => p - 1);
  } 
  else {
    onBack();
  }
},[paso, onBack, saltadoHospedaje, saltadoHoteles]);

  const renderPaso = () => {
    switch (paso) {
      case 1:
        return <RenderDestino 
        datos={datosCompartidos} 
        onSiguiente={handleSiguiente} 
        onVolver={handleVolver} 
        onClose={onClose} 
        />;
      case 2:
        return <RenderHospedaje 
        datos={datosCompartidos} 
        onSiguiente={handleSiguiente} 
        onVolver={handleVolver} 
        onClose={onClose} 
        />;
      case 3:
        return <RenderHoteles 
        datos={datosCompartidos} 
        onSiguiente={handleSiguiente} 
        onVolver={handleVolver} 
        onClose={onClose} 
        />;
      case 4:
        return <RenderHabitaciones 
        datos={datosCompartidos} 
        onSiguiente={handleSiguiente} 
        onVolver={handleVolver} 
        onClose={onClose} />;
      case 5:
        return <RenderEventos 
        datos={datosCompartidos} 
        onSiguiente={handleSiguiente} 
        onVolver={handleVolver} 
        onClose={onClose} />;
      case 6:
        return <RenderFinal 
        onClose={onClose} 
        datos={datosCompartidos} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.42)] backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300">
        {renderPaso()}
      </div>
    </div>
  );
})

export default ModalFlujo;