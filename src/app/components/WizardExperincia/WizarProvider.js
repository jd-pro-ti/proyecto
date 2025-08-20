// WizardProvider.jsx
'use client';
import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const WizardContext = createContext();

export const WizardProvider = ({ children }) => {
  const estadoInicial = {
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
    subpueblos:null,
    yaSaltado:false

  };

  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState(estadoInicial);
  const [saltadoHospedaje, setSaltadoHospedaje] = useState(false);
  const [saltadoHoteles, setSaltadoHoteles] = useState(false);
  const [pasoAnterior, setPasoAnterior] = useState(null);


  const value = {
    paso, setPaso,
    datos, setDatos,
    saltadoHospedaje, setSaltadoHospedaje,
    saltadoHoteles, setSaltadoHoteles,
    pasoAnterior, setPasoAnterior,
    estadoInicial
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => useContext(WizardContext);
