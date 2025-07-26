'use client';

import { useState } from 'react';
import { pueblosMagicos } from '../data/pueblosMagicos';
import pueblos from '../data/pueblos';
import playas from '../data/playas';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ModalFlujo({ show, onClose, categoria, onBack }) {
  const [paso, setPaso] = useState(1);
  const [seleccion, setSeleccion] = useState({ destino: null, compania: null });
  const [showDetalles, setShowDetalles] = useState(false);
  const [detalles, setDetalles] = useState({
    adultos: 1,
    ninos: 0,
    bebes: 0
  });
  const [respuesta, setRespuesta] = useState(null);
  const [fechasVisita, setFechasVisita] = useState({
    fechaInicio: null,
    fechaFin: null
  });

  const dataMap = {
    pueblosMagicos,
    pueblos,
    playa: playas,
  };

  const tituloMap = {
    pueblosMagicos: 'Pueblos Mágicos',
    pueblos: 'Pueblos',
    playa: 'Playas',
  };

  const opcionesCompania = [
    { id: 'solo', label: 'Solo', icon: '/imagenes/playa/playa16.svg' },
    { id: 'pareja', label: 'Pareja', icon: '/imagenes/playa/playa17.svg' },
    { id: 'familia', label: 'Familia', icon: '/imagenes/playa/playa18.svg' },
    { id: 'amigos', label: 'Amigos', icon: '/imagenes/playa/playa19.svg' },
  ];

  const datos = dataMap[categoria] || {};
  const datosLista = Object.entries(datos);

  const toggleOpcion = (opcion) => {
    setSeleccion(prev => ({ ...prev, compania: opcion }));
    if (opcion === 'familia' || opcion === 'amigos') {
      setShowDetalles(true);
    } else {
      setShowDetalles(false);
    }
  };

  const actualizarDetalles = (campo, valor) => {
    setDetalles(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const toggleSeleccion = (tipo, id) => {
    setSeleccion((prev) => ({
      ...prev,
      [tipo]: prev[tipo] === id ? null : id,
    }));
  };

  const handleSiguiente = () => {
    if (paso < 4) setPaso((p) => p + 1);
    else {
      console.log('Resultado final:', { ...seleccion, detalles, respuesta, fechasVisita });
      onClose();
    }
  };

  const handleVolver = () => {
    if (paso > 1) setPaso((p) => p - 1);
    else onBack();
  };

  const renderBotones = () => (
    <div className="flex justify-between gap-4 mt-4">
      <button
        onClick={onClose}
        className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Cerrar
      </button>
      <button
        onClick={handleVolver}
        className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Volver
      </button>
      <button
        onClick={handleSiguiente}
        disabled={
          (paso === 1 && !seleccion.destino) || 
          (paso === 2 && !seleccion.compania) ||
          (paso === 3 && respuesta === null) ||
          (paso === 4 && (!fechasVisita.fechaInicio || !fechasVisita.fechaFin))
        }
        className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
          (paso === 1 && !seleccion.destino) || 
          (paso === 2 && !seleccion.compania) ||
          (paso === 3 && respuesta === null) ||
          (paso === 4 && (!fechasVisita.fechaInicio || !fechasVisita.fechaFin))
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
        }`}
      >
        {paso === 4 ? 'Finalizar' : 'Siguiente'}
      </button>
    </div>
  );

  const renderPaso1 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800">¿A dónde desea ir?</h2>
      <p className="text-gray-500 mt-2 text-sm">Selecciona un destino de {tituloMap[categoria] || 'opciones'}</p>
      <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto mb-6 p-2">
        {datosLista.map(([id, data]) => (
          <button
            key={id}
            onClick={() => toggleSeleccion('destino', id)}
            className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 min-w-[100px] transition-all cursor-pointer ${
              seleccion.destino === id
                ? 'border-green-500 bg-green-50 shadow-inner'
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
          >
            <img src={data.icono} alt={data.nombre} className="w-12 h-12 object-contain" />
            <span className="text-xs font-medium text-gray-700 text-center">{data.nombre}</span>
          </button>
        ))}
      </div>
      {renderBotones()}
    </>
  );

  const renderPaso2 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800">¿Con quién viajas?</h2>
      <p className="text-gray-500 mt-2 text-sm">Selecciona una opción</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {opcionesCompania.map((opcion) => (
          <button
            key={opcion.id}
            onClick={() => toggleOpcion(opcion.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
              seleccion.compania === opcion.id
                ? 'border-green-500 bg-green-50 shadow-inner'
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
          >
            <img 
              src={opcion.icon} 
              alt={opcion.label} 
              className="w-10 h-10 object-contain mb-2"
            />
            <span className="text-sm font-medium text-gray-700">
              {opcion.label}
            </span>
          </button>
        ))}
      </div>

      {(seleccion.compania === 'familia' || seleccion.compania === 'amigos') && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">
            {detalles.adultos} adulto{detalles.adultos !== 1 ? 's' : ''}, 
            {detalles.ninos > 0 && ` ${detalles.ninos} niño${detalles.ninos !== 1 ? 's' : ''}`}
            {detalles.bebes > 0 && `, ${detalles.bebes} bebé${detalles.bebes !== 1 ? 's' : ''}`}
          </p>
        </div>
      )}
      {renderBotones()}
    </>
  );

  const renderPaso3 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800">¿Te quieres hospedar?</h2>
      <p className="text-gray-500 mt-2 text-sm">Recibe recomendaciones personalizadas</p>
      
      <div className="flex justify-center gap-4 my-8">
        <button
          onClick={() => setRespuesta(true)}
          className={`px-8 py-4 rounded-lg font-medium text-lg transition ${
            respuesta === true
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sí
        </button>
        <button
          onClick={() => setRespuesta(false)}
          className={`px-8 py-4 rounded-lg font-medium text-lg transition ${
            respuesta === false
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          No
        </button>
      </div>
      {renderBotones()}
    </>
  );

  const renderPaso4 = () => {
    const [mesActualInicio, setMesActualInicio] = useState(new Date());
    const [mesActualFin, setMesActualFin] = useState(new Date());

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
        setFechasVisita(prev => ({ ...prev, fechaInicio: fecha }));
        if (fechasVisita.fechaFin && fechaFin < fecha) {
          setFechasVisita(prev => ({ ...prev, fechaFin: null }));
        }
      } else {
        if (fechasVisita.fechaInicio && fecha >= fechasVisita.fechaInicio) {
          setFechasVisita(prev => ({ ...prev, fechaFin: fecha }));
        }
      }
    };

    const diasInicio = generarDiasMes(mesActualInicio);
    const diasFin = generarDiasMes(mesActualFin);

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
      <>
        <h2 className="text-2xl font-bold text-gray-800">Selecciona tu tiempo de visita</h2>
        
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
                      fechasVisita.fechaInicio && dia.toDateString() === fechasVisita.fechaInicio.toDateString() ?
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
                    disabled={!dia || (fechasVisita.fechaInicio && dia < fechasVisita.fechaInicio)}
                    className={`p-1 rounded-full text-xs ${
                      !dia ? 'opacity-0' : 
                      fechasVisita.fechaFin && dia.toDateString() === fechasVisita.fechaFin.toDateString() ?
                      'bg-green-600 text-white' :
                      fechasVisita.fechaInicio && dia < fechasVisita.fechaInicio ?
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
        {(fechasVisita.fechaInicio || fechasVisita.fechaFin) && (
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600">
              {fechasVisita.fechaInicio && `Inicio: ${format(fechasVisita.fechaInicio, 'dd/MM/yyyy')}`}
              {fechasVisita.fechaFin && ` - Fin: ${format(fechasVisita.fechaFin, 'dd/MM/yyyy')}`}
            </p>
          </div>
        )}

        {renderBotones()}
      </>
    );
  };

  const renderDetallesGrupo = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-bold text-black mb-4">Detalles del grupo</h3>
        
        <div className="space-y-4 text-black">
          {/* ... (código existente para detalles del grupo) ... */}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowDetalles(false)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-lg shadow-xl transform transition-all duration-300">
          <div className="text-center mb-4">
            {paso === 1 ? renderPaso1() : 
             paso === 2 ? renderPaso2() : 
             paso === 3 ? renderPaso3() : 
             renderPaso4()}
          </div>
        </div>
      </div>

      {showDetalles && renderDetallesGrupo()}
    </>
  );
}