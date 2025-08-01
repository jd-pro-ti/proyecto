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

export default function RenderHospedaje({ datos, onSiguiente, onVolver, onClose }) {
  const [respuesta, setRespuesta] = useState(datos.necesitaHospedaje);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [fechas, setFechas] = useState(datos.fechas || { inicio: null, fin: null });
  const [mesActual, setMesActual] = useState(new Date());

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
      setFechas({ inicio: null, fin: null });
    }
  };

  const handleSiguiente = () => {
    if (respuesta === null) return;
    if (respuesta && (!fechas.inicio || !fechas.fin)) return;
    
    onSiguiente({ 
      necesitaHospedaje: respuesta,
      fechas: respuesta ? fechas : null
    });
  };

  const dias = generarDiasMes(mesActual);
  const diasSemana = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <div className="relative p-6 w-full max-w-md mx-auto">
      {/* Encabezado con título y botón cerrar */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Te quieres hospedar?</h2>
          <p className="text-gray-500 text-sm">Recibe recomendaciones personalizadas</p>
        </div>
        <BotonCerrar onClick={onClose} />
      </div>
      
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => handleRespuesta(true)}
          className={`px-8 py-4 rounded-lg font-medium text-lg transition ${
            respuesta === true
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sí
        </button>
        <button
          onClick={() => handleRespuesta(false)}
          className={`px-8 py-4 rounded-lg font-medium text-lg transition ${
            respuesta === false
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          No
        </button>
      </div>

      {mostrarCalendario && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Selecciona tus fechas</h3>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => cambiarMes('prev')}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="font-medium">
                {format(mesActual, 'MMMM yyyy', { locale: es })}
              </span>
              <button 
                onClick={() => cambiarMes('next')}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {diasSemana.map((dia, i) => (
                <div key={`dia-${i}`} className="text-xs font-medium text-gray-500 py-1">
                  {dia}
                </div>
              ))}

              {dias.map((dia, i) => (
                <button
                  key={`fecha-${i}`}
                  onClick={() => dia && seleccionarFecha(dia)}
                  disabled={!dia}
                  className={`p-2 rounded-full text-sm font-medium text-black ${
                    !dia ? 'opacity-0 cursor-default' : 
                    fechas.inicio && dia.toDateString() === fechas.inicio.toDateString() ?
                    'bg-green-100 border-2 border-green-600' :
                    fechas.fin && dia.toDateString() === fechas.fin.toDateString() ?
                    'bg-red-100 border-2 border-red-600' :
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
            <div className="mt-3 text-center text-sm">
              <p className="font-medium">
                {fechas.inicio && (
                  <span className="text-green-600">
                    Llegada: {format(fechas.inicio, 'dd/MM/yyyy')}
                  </span>
                )}
                {fechas.fin && (
                  <span className="text-red-600">
                    {fechas.inicio ? ' - ' : ''}Salida: {format(fechas.fin, 'dd/MM/yyyy')}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Botones de navegación */}
      <ContenedorBotones>
        <BotonVolver onClick={onVolver} />
        <Espaciador />
        <BotonSiguiente 
          onClick={handleSiguiente} 
          disabled={respuesta === null || (respuesta && (!fechas.inicio || !fechas.fin))} 
        />
      </ContenedorBotones>
    </div>
  );
}