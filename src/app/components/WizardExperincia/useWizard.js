// hooks/useWizard.js
import { useWizard } from './WizarProvider';

export const useWizardFlow = () => {
  const {
    paso, setPaso,
    datos, setDatos,
    pasoAnterior, setPasoAnterior,
    saltadoHospedaje, setSaltadoHospedaje,
    saltadoHoteles, setSaltadoHoteles
  } = useWizard();

  const handleSiguiente = (nuevosDatos = {}) => {
    setDatos(prev => {
      const nuevos = { ...prev, ...nuevosDatos };
      let siguientePaso = paso + 1;
      if (paso === 1 && nuevos.subpueblos === true) {
        siguientePaso = 0;
      }
      if(datos.yaSaltado===true){
        siguientePaso = 3;
      }
      if (paso === 0) siguientePaso = 2;
      if (paso === 3 && nuevos.necesitaHospedaje === false) {
        siguientePaso = 6;
        setSaltadoHospedaje(true);
      }
      if (paso === 4 && nuevos.sinHoteles) {
        siguientePaso = 6;
        setSaltadoHoteles(true);
      }

      setPasoAnterior(paso);
      setPaso(siguientePaso);
      return nuevos;
    });
  };

  const handleVolver = () => {
    if (paso === 1) return null;
    if (3 && paso === 3) return setPaso(1);
    if (paso === 0) return setPaso(1);
    if (paso === 2 && pasoAnterior === 0) return setPaso(0);
    if (paso === 6) {
      if (saltadoHoteles) return setPaso(4);
      if (saltadoHospedaje) return setPaso(3);
      return setPaso(5);
    }
    setPaso(p => p - 1);
  };

  return { handleSiguiente, handleVolver };
};
