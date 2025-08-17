'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  BotonCerrar, 
  BotonVolver, 
  BotonSiguiente, 
  ContenedorBotones, 
  Espaciador 
} from './botones';

export default function StepHospedaje({ datos, onSiguiente, onVolver, onClose }) {
  const [respuesta, setRespuesta] = useState(datos.necesitaHospedaje);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechas, setFechas] = useState(datos.fechas || { inicio: null, fin: null });
  const [mesActual, setMesActual] = useState(new Date());
  const [detallesPersonas, setDetallesPersonas] = useState({
    adultos: datos.detallesPersonas?.adultos || 1,
    ninos: datos.detallesPersonas?.ninos || 0,
    bebes: datos.detallesPersonas?.bebes || 0
  });

  const generarDiasMes = (fecha) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const dias = [];

    const diaSemanaInicio = primerDia.getDay();
    for (let i = 0; i < diaSemanaInicio; i++) {
      dias.push(null);
    }

    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(new Date(year, month, i));
    }

    return dias;
  };

  const cambiarMes = (direccion) => {
    setMesActual(prev => {
      const nuevoMes = new Date(prev);
      nuevoMes.setMonth(direccion === 'prev' ? prev.getMonth() - 1 : prev.getMonth() + 1);
      return nuevoMes;
    });
  };

  const seleccionarFecha = (fecha) => {
    if (!fechas.inicio || (fechas.inicio && fechas.fin)) {
      setFechas({ inicio: fecha, fin: null });
    } 
    else if (fechas.inicio && fecha.toDateString() === fechas.inicio.toDateString()) {
      setFechas({ inicio: null, fin: null });
    }
    else if (fecha < fechas.inicio) {
      setFechas({ inicio: fecha, fin: null });
    }
    else {
      setFechas(prev => ({ ...prev, fin: fecha }));
    }
  };

  const handleRespuesta = (resp) => {
    setRespuesta(resp);
    setMostrarCalendario(resp);
    if (!resp) {
      setFechas({ inicio: null, fin: null});
      setDetallesPersonas(null)
    }
  };

  const actualizarDetalles = (campo, valor) => {
    setDetallesPersonas(prev => ({
      ...prev,
      [campo]: Math.max(0, valor)
    }));
  };

  const handleSiguiente = () => {
    if (respuesta === null) return;
    if (respuesta && (!fechas.inicio || !fechas.fin)) return;
    
    onSiguiente({ 
      necesitaHospedaje: respuesta,
      fechas: respuesta ? fechas : null,
      detallesPersonas
    });
  };

  const dias = generarDiasMes(mesActual);
  const diasSemana = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="relative p-4 w-full max-w-md mx-auto bg-white rounded-lg" style={{ maxHeight: '90vh', overflow: 'hidden' }}>
      {/* Área con scroll */}
      <div className="overflow-y-auto pr-1" style={{ maxHeight: 'calc(90vh - 80px)' }}>
        {/* Encabezado centrado */}
        <div className="flex flex-col items-center mb-3">  {/* Centrado con flex-col y items-center */}
          <div className="text-center">  {/* Texto centrado */}
            <h2 className="text-xl font-bold text-[#364153] mb-1">¿Te quieres hospedar?</h2>
            <p className="text-[#6A7282] mt-1 text-sm">Recibe recomendaciones personalizadas</p>
          </div>
          <div className="absolute top-4 right-4">  {/* Botón de cerrar en esquina */}
            <BotonCerrar onClick={onClose} />
          </div>
        </div>
        
        {/* Botones Sí/No */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => handleRespuesta(true)}
            className={`px-6 py-3 rounded-lg font-medium text-base transition ${
              respuesta === true
                ? 'bg-[#7CB936] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sí
          </button>
          <button
            onClick={() => handleRespuesta(false)}
            className={`px-6 py-3 rounded-lg font-medium text-base transition ${
              respuesta === false
                ? 'bg-[#EA5261] text-white'
                : 'bg-gray-200 text-[#364153] hover:bg-gray-300'
            }`}
          >
            No
          </button>
        </div>

        {/* Calendario */}
        {mostrarCalendario && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Selecciona tus fechas</h3>
            <div className="bg-white p-2 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <button 
                  onClick={() => cambiarMes('prev')}
                  className="p-1 rounded-full hover:bg-gray-100 text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="font-medium text-sm text-gray-800">
                  {format(mesActual, 'MMMM yyyy', { locale: es })}
                </span>
                <button 
                  onClick={() => cambiarMes('next')}
                  className="p-1 rounded-full hover:bg-gray-100 text-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {diasSemana.map((dia, i) => (
                  <div key={`dia-${i}`} className="text-xs font-medium text-gray-500 py-0.5">
                    {dia}
                  </div>
                ))}

                {dias.map((dia, i) => (
                  <button
                    key={`fecha-${i}`}
                    onClick={() => dia && seleccionarFecha(dia)}
                    disabled={!dia}
                    className={`p-1 rounded-full text-xs font-medium text-gray-800 ${
                      !dia ? 'opacity-0 cursor-default' : 
                      fechas.inicio && dia.toDateString() === fechas.inicio.toDateString() ?
                      'bg-green-100 border border-green-600' :
                      fechas.fin && dia.toDateString() === fechas.fin.toDateString() ?
                      'bg-red-100 border border-[#EA5261]' :
                      fechas.inicio && fechas.fin && dia > fechas.inicio && dia < fechas.fin ?
                      'bg-blue-50 border border-blue-200' :
                      'hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    {dia && dia.getDate()}
                  </button>
                ))}
              </div>
            </div>

            {(fechas.inicio || fechas.fin) && (
              <div className="mt-2 text-center text-xs">
                <p className="font-medium">
                  {fechas.inicio && (
                    <span className="text-[#059669]">
                      Llegada: {format(fechas.inicio, 'dd/MM/yyyy')}
                    </span>
                  )}
                  {fechas.fin && (
                    <span className="text-[#EA5261]">
                      {fechas.inicio ? ' - ' : ''}Salida: {format(fechas.fin, 'dd/MM/yyyy')}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sección de personas (SOLO SE MUESTRA SI respuesta === true) */}
        {respuesta === true && (
          <div className="border-t pt-3">
            <h3 className="text-base font-semibold text-[#364153] mb-2">¿Con cuántas personas viajas?</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col">
                <label className="text-xs text-[#24375e] mb-1">Adultos</label>
                <div className="flex items-center border-1 border-green-600 rounded-lg overflow-hidden ">
                  <button 
                    onClick={() => actualizarDetalles('adultos', detallesPersonas.adultos - 1)}
                    className="px-2 py-1 text-[#24375e] text-base font-bold"
                    disabled={detallesPersonas.adultos <= 1}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-[#24375e] text-sm">{detallesPersonas.adultos}</span>
                  <button 
                    onClick={() => actualizarDetalles('adultos', detallesPersonas.adultos + 1)}
                    className="px-2 py-1 text-[#24375e] text-base font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-[#24375e] mb-1">Niños (2-12)</label>
                <div className="flex items-center border-1 border-green-600 rounded-lg overflow-hidden ">
                  <button 
                    onClick={() => actualizarDetalles('ninos', detallesPersonas.ninos - 1)}
                    className="px-2 py-1 text-[#24375e] text-base font-bold"
                    disabled={detallesPersonas.ninos <= 0}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-[#24375e] text-sm">{detallesPersonas.ninos}</span>
                  <button 
                    onClick={() => actualizarDetalles('ninos', detallesPersonas.ninos + 1)}
                    className="px-2 py-1 text-[#24375e] text-base font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-[#24375e] mb-1">Bebés (0-2)</label>
                <div className="flex items-center border-1 border-green-600 rounded-lg overflow-hidden ">
                  <button 
                    onClick={() => actualizarDetalles('bebes', detallesPersonas.bebes - 1)}
                    className="px-2 py-1 text-[#24375e] text-base font-bold"
                    disabled={detallesPersonas.bebes <= 0}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-[#24375e] text-sm">{detallesPersonas.bebes}</span>
                  <button 
                    onClick={() => actualizarDetalles('bebes', detallesPersonas.bebes + 1)}
                    className="px-2 py-1 text-[#24375e] text-base font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2 p-2 bg-[#6A7282]/5 rounded-lg">
              <p className="text-xs text-[#6A7282]">
                <span className="font-medium">Resumen:</span> <span className="text-[#24375e]">{detallesPersonas.adultos}</span> adulto{detallesPersonas.adultos !== 1 ? 's' : ''}
                {detallesPersonas.ninos > 0 && <>, <span className="text-[#24375e]">{detallesPersonas.ninos}</span> niño{detallesPersonas.ninos !== 1 ? 's' : ''}</>}
                {detallesPersonas.bebes > 0 ? <>, <span className="text-[#24375e]">{detallesPersonas.bebes}</span> bebé{detallesPersonas.bebes !== 1 ? 's' : ''}</> : ', sin bebés'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      <div className="pt-2">
        <ContenedorBotones>
          <BotonVolver onClick={onVolver} />
          <Espaciador />
          <BotonSiguiente 
            onClick={handleSiguiente} 
            disabled={respuesta === null || (respuesta && (!fechas.inicio || !fechas.fin))} 
          />
        </ContenedorBotones>
      </div>
    </div>
  );
}