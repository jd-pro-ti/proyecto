'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ModalFechasVisita({ show, onClose, onNext, onBack }) {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [mesActualInicio, setMesActualInicio] = useState(new Date());
  const [mesActualFin, setMesActualFin] = useState(new Date());

  const handleSiguiente = () => {
    if (fechaInicio && fechaFin) {
      onNext({
        fechaInicio,
        fechaFin
      });
    }
  };

  const cambiarMes = (calendario, direccion) => {
    const setter = calendario === 'inicio' ? setMesActualInicio : setMesActualFin;
    setter(prev => {
      const nuevoMes = new Date(prev);
      nuevoMes.setMonth(direccion === 'prev' ? nuevoMes.getMonth() - 1 : nuevoMes.getMonth() + 1);
      return nuevoMes;
    });
  };

  const generarDiasMes = (fecha) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const dias = [];

    // Días del mes anterior
    const diaSemanaInicio = primerDia.getDay();
    for (let i = 0; i < diaSemanaInicio; i++) {
      dias.push(null);
    }

    // Días del mes actual
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(new Date(year, month, i));
    }

    return dias;
  };

  const seleccionarFecha = (fecha, tipo) => {
    if (tipo === 'inicio') {
      setFechaInicio(fecha);
      if (fechaFin && fechaFin < fecha) {
        setFechaFin(null);
      }
    } else {
      if (fechaInicio && fecha >= fechaInicio) {
        setFechaFin(fecha);
      }
    }
  };

  const diasInicio = generarDiasMes(mesActualInicio);
  const diasFin = generarDiasMes(mesActualFin);

  // Días de la semana con keys únicas
  const diasSemana = [
    { id: 'L', nombre: 'L' },
    { id: 'Ma', nombre: 'M' },
    { id: 'Mi', nombre: 'M' },
    { id: 'J', nombre: 'J' },
    { id: 'V', nombre: 'V' },
    { id: 'S', nombre: 'S' },
    { id: 'D', nombre: 'D' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-2xl shadow-xl transform transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Selecciona tu tiempo de visita</h2>
        </div>

        {/* Contenedor horizontal para los calendarios */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Calendario de fecha de inicio */}
          <div className="flex-1">
            <h3 className="text-md font-semibold text-gray-800 mb-2 text-center">Fecha de inicio</h3>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <button 
                  onClick={() => cambiarMes('inicio', 'prev')}
                  className="p-1 text-sm rounded-full hover:bg-gray-100 text-black"
                >
                  &lt;
                </button>
                <span className="text-sm font-medium text-black">
                  {format(mesActualInicio, 'MMM yyyy', { locale: es })}
                </span>
                <button 
                  onClick={() => cambiarMes('inicio', 'next')}
                  className="p-1 text-sm rounded-full hover:bg-gray-100 text-black"
                >
                  &gt;
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {diasSemana.map((dia) => (
                  <div key={`inicio-${dia.id}`} className="font-medium text-gray-500 py-1">
                    {dia.nombre}
                  </div>
                ))}

                {diasInicio.map((dia, index) => (
                  <button
                    key={`inicio-dia-${index}`}
                    onClick={() => dia && seleccionarFecha(dia, 'inicio')}
                    disabled={!dia}
                    className={`p-1 rounded-full text-xs ${
                      !dia ? 'opacity-0' : 
                      fechaInicio && dia.toDateString() === fechaInicio.toDateString() ?
                      'bg-green-600 text-white' :
                      'hover:bg-gray-100 text-black'
                    }`}
                  >
                    {dia && dia.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calendario de fecha de fin */}
          <div className="flex-1">
            <h3 className="text-md font-semibold text-gray-800 mb-2 text-center">Fecha de fin</h3>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <button 
                  onClick={() => cambiarMes('fin', 'prev')}
                  className="p-1 text-sm rounded-full hover:bg-gray-100 text-black"
                >
                  &lt;
                </button>
                <span className="text-sm font-medium text-black">
                  {format(mesActualFin, 'MMM yyyy', { locale: es })}
                </span>
                <button 
                  onClick={() => cambiarMes('fin', 'next')}
                  className="p-1 text-sm rounded-full hover:bg-gray-100 text-black"
                >
                  &gt;
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {diasSemana.map((dia) => (
                  <div key={`fin-${dia.id}`} className="font-medium text-gray-500 py-1">
                    {dia.nombre}
                  </div>
                ))}

                {diasFin.map((dia, index) => (
                  <button
                    key={`fin-dia-${index}`}
                    onClick={() => dia && seleccionarFecha(dia, 'fin')}
                    disabled={!dia || (fechaInicio && dia < fechaInicio)}
                    className={`p-1 rounded-full text-xs ${
                      !dia ? 'opacity-0' : 
                      fechaFin && dia.toDateString() === fechaFin.toDateString() ?
                      'bg-green-600 text-white' :
                      fechaInicio && dia < fechaInicio ?
                      'text-gray-300' :
                      'hover:bg-gray-100 text-black'
                    }`}
                  >
                    {dia && dia.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resumen de fechas seleccionadas */}
        {(fechaInicio || fechaFin) && (
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600">
              {fechaInicio && `Inicio: ${format(fechaInicio, 'dd/MM/yyyy')}`}
              {fechaFin && ` - Fin: ${format(fechaFin, 'dd/MM/yyyy')}`}
            </p>
          </div>
        )}

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cerrar
          </button>
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Volver
          </button>
          <button
            onClick={handleSiguiente}
            disabled={!fechaInicio || !fechaFin}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              !fechaInicio || !fechaFin
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}