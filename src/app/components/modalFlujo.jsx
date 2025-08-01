'use client';

import { useState } from 'react';
import RenderDestino from './modals/destino';
import RenderHospedaje from './modals/hopedajeCalendario';
import RenderHoteles from './modals/hoteles';
import RenderHabitaciones from './modals/habitaciones';
import RenderEventos from './modals/eventos';
import RenderFinal from './modals/despedida';

export default function ModalFlujo({ show, onClose, categoria, onBack }) {
  const [paso, setPaso] = useState(1);
  const [saltadoHospedaje, setSaltadoHospedaje] = useState(false);
  const [saltadoHoteles, setSaltadoHoteles] = useState(false);
  const [datosCompartidos, setDatosCompartidos] = useState({
    categoria,
    destino: null,
    tipoViaje: null,
    detallesPersonas: { adultos: 0, ninos: 0, bebes: 0 },
    necesitaHospedaje: null,
    fechas: { inicio: null, fin: null },
    hotel: null,
    habitacion: null,
    evento: null
  });

  if (!show) return null;

 const handleSiguiente = (nuevosDatos = {}) => {
  setDatosCompartidos(prev => {
    const nuevos = { ...prev, ...nuevosDatos };

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
};




  const handleVolver = () => {
  if (paso === 5) {
    if (saltadoHoteles) {
      setPaso(3); // volver a hoteles si los saltaste
    } else if (saltadoHospedaje) {
      setPaso(2); // volver a hospedaje si lo saltaste
    } else {
      setPaso(4); // volver normalmente a habitaciones
    }
  } else if (paso === 4 && saltadoHospedaje) {
    setPaso(2); // si se saltó hospedaje, vuelve a él desde habitaciones
  } else if (paso > 1) {
    setPaso(p => p - 1); // comportamiento normal
  } else {
    onBack(); // si es paso 1, salir
  }
};

  const renderPaso = () => {
    switch(paso) {
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
          onClose={onClose}
        />;
      case 5:
        return <RenderEventos 
          datos={datosCompartidos} 
          onSiguiente={handleSiguiente} 
          onVolver={handleVolver}
          onClose={onClose}
        />;
      case 6:
        return <RenderFinal 
          onClose={onClose} 
          datos={datosCompartidos}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"> 
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300">
        {renderPaso()}
      </div>
    </div>
  );
}