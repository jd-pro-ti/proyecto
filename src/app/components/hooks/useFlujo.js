import { useState, useRef, useEffect, useCallback } from "react";

export function useFlujo({ show, categoria, subCategoria, destino, onBack }) {
  const [paso, setPaso] = useState(1);
  const [saltadoHospedaje, setSaltadoHospedaje] = useState(false);
  const [saltadoHoteles, setSaltadoHoteles] = useState(false);
  const yaSaltado = useRef(false);

  const [datosCompartidos, setDatosCompartidos] = useState({
    categoria: categoria?.tipo || categoria || null,
    destino: categoria?.destino || null,
    tipoViaje: null,
    detallesPersonas: categoria?.detallesPersonas || null,
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
    if (show) {
      setPaso(1);
      setSaltadoHospedaje(false);
      setSaltadoHoteles(false);
      yaSaltado.current = false;
    }
  }, [show]);

  useEffect(() => {
    const destinoVieneDeFuera =
      categoria?.destino ||
      (destino && typeof destino === "object") ||
      (destino && typeof destino === "string");

    if (!yaSaltado.current && datosCompartidos.destinoInput && destinoVieneDeFuera) {
      yaSaltado.current = true;
      setDatosCompartidos(prev => ({
        ...prev,
        destino: prev.destinoInput.nombre || prev.destinoInput,
        categoria: prev.destinoInput.categoria || prev.categoria,
      }));
      setPaso(2);
    }
  }, [datosCompartidos.destinoInput, categoria?.destino, destino]);

  const handleSiguiente = useCallback((nuevosDatos = {}) => {
    setDatosCompartidos(prev => {
      const nuevos = { ...prev, ...nuevosDatos };

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
  }, [paso]);

  const handleVolver = useCallback(() => {
    if (paso === 2) {
      if (yaSaltado.current) {
        onBack();
        yaSaltado.current = false;
      } else {
        setPaso(1);
      }
      return;
    }
    if (paso === 5) {
      if (saltadoHoteles) return setPaso(3);
      if (saltadoHospedaje) return setPaso(2);
    }
    if (paso === 4 && saltadoHospedaje) return setPaso(2);
    if (paso > 1) return setPaso(prev => prev - 1);
    onBack();
  }, [paso, onBack, saltadoHospedaje, saltadoHoteles]);

  return {
    paso,
    datosCompartidos,
    handleSiguiente,
    handleVolver
  };
}
