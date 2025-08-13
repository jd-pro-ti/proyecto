import { useFlujo } from "./hooks/useFlujo";
import RenderDestino from "./modals/destino";
import RenderHospedaje from "./modals/hopedajeCalendario";
import RenderHoteles from "./modals/hoteles";
import RenderHabitaciones from "./modals/habitaciones";
import RenderEventos from "./modals/eventos";
import RenderFinal from "./modals/despedida";

export default function ModalFlujo({ show, onClose, categoria, onBack, subCategoria, destino }) {
  if (!show) return null;

  const { paso, datosCompartidos, handleSiguiente, handleVolver } = useFlujo({
    show,
    categoria,
    subCategoria,
    destino,
    onBack
  });

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
}
