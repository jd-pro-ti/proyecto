'use client';

import  {useFlujo}  from './flujo';

export default function ModalFlujo({ show, onClose, categoria, onBack }) {
  const {
    // Estados
    paso,
    seleccion,
    destinoSeleccionado,
    tipoViaje,
    detallesPersonas,
    necesitaHospedaje,
    fechasViaje,
    hotelSeleccionado,
    habitacionSeleccionada,
    eventoSeleccionado,
    showDetalles,
    respuesta,
    fechasVisita,
    mesActualInicio,
    mesActualFin,
    hotelesFiltrados,
    eventosFiltrados,
    
    // Datos
    tituloMap,
    opcionesCompania,
    habitaciones,
    datos,
    datosLista,
    
    // Funciones
    toggleOpcion,
    toggleSeleccion,
    actualizarDetalles,
    handleSiguiente,
    handleVolver,
    cambiarMes,
    generarDiasMes,
    seleccionarFecha,
    setShowDetalles,
    setRespuesta,
    setHotelSeleccionado,
    setHabitacionSeleccionada,
    setEventoSeleccionado
  } = useFlujo({ show, categoria, onClose, onBack });

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
          (paso === 4 && (!fechasVisita.fechaInicio || !fechasVisita.fechaFin)) ||
          (paso === 5 && hotelesFiltrados.length > 0 && !hotelSeleccionado) ||
          (paso === 6 && !habitacionSeleccionada) ||
          (paso === 7 && eventosFiltrados.length > 0 && !eventoSeleccionado)
        }
        className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
          (paso === 1 && !seleccion.destino) || 
          (paso === 2 && !seleccion.compania) ||
          (paso === 3 && respuesta === null) ||
          (paso === 4 && (!fechasVisita.fechaInicio || !fechasVisita.fechaFin)) ||
          (paso === 5 && hotelesFiltrados.length > 0 && !hotelSeleccionado) ||
          (paso === 6 && !habitacionSeleccionada) ||
          (paso === 7 && eventosFiltrados.length > 0 && !eventoSeleccionado)
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
        }`}
      >
        {paso === 6 ? 'Seleccionar habitación' : 
         paso === 7 ? 'Finalizar reserva' : 
         'Siguiente'}
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
            {detallesPersonas.adultos} adulto{detallesPersonas.adultos !== 1 ? 's' : ''}, 
            {detallesPersonas.ninos > 0 && ` ${detallesPersonas.ninos} niño${detallesPersonas.ninos !== 1 ? 's' : ''}`}
            {detallesPersonas.bebes > 0 && `, ${detallesPersonas.bebes} bebé${detallesPersonas.bebes !== 1 ? 's' : ''}`}
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
                  {new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(mesActualInicio)}
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
                  {new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(mesActualFin)}
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
              {fechasVisita.fechaInicio && `Inicio: ${new Intl.DateTimeFormat('es-ES').format(fechasVisita.fechaInicio)}`}
              {fechasVisita.fechaFin && ` - Fin: ${new Intl.DateTimeFormat('es-ES').format(fechasVisita.fechaFin)}`}
            </p>
          </div>
        )}

        {renderBotones()}
      </>
    );
  };

  const renderPaso5 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Hoteles en {destinoSeleccionado}</h2>
      <p className="text-gray-500 mt-2 text-sm">Elige tu alojamiento ideal</p>
      
      {hotelesFiltrados.length > 0 ? (
        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 p-2">
          {hotelesFiltrados.map((hotel) => (
            <button
              key={hotel.name}
              onClick={() => setHotelSeleccionado(hotel.name)}
              className={`w-full flex items-start gap-4 p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                hotelSeleccionado === hotel.name
                  ? 'border-green-500 bg-green-50 shadow-inner'
                  : 'border-gray-200 hover:border-green-300 bg-white'
              }`}
            >
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{hotel.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{hotel.categoria}</p>
                <p className="text-sm text-gray-500 mt-1">{hotel.descripcion}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-gray-700 ml-1">{hotel.rating}</span>
                  {hotel.internet && <span className="ml-2 text-sm text-gray-500">WiFi</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="my-8 text-center">
          <p className="text-gray-500">No hay hoteles disponibles para este destino.</p>
        </div>
      )}
      {renderBotones()}
    </>
  );

  const renderPaso6 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Selecciona tu habitación</h2>
      <p className="text-gray-500 mt-2 text-sm">Elige el tipo de alojamiento para tu estancia</p>
      
      <div className="grid grid-cols-2 gap-4 max-h-[350px] overflow-y-auto mb-6 p-2">
        {habitaciones.map((habitacion) => (
          <button
            key={habitacion.id}
            onClick={() => setHabitacionSeleccionada(habitacion.id)}
            className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all cursor-pointer text-left ${
              habitacionSeleccionada === habitacion.id
                ? 'border-green-500 bg-green-50 shadow-inner'
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={habitacion.icono} 
                alt={habitacion.nombre} 
                className="w-10 h-10 object-contain"
              />
              <h3 className="font-bold text-gray-800">{habitacion.nombre}</h3>
            </div>
            <p className="text-green-600 font-bold text-sm mb-1">{habitacion.precio}</p>
            <p className="text-xs text-gray-600 mb-1">{habitacion.descripcion}</p>
            <p className="text-xs text-blue-600">
              {habitacion.disponibles > 0 
                ? `${habitacion.disponibles} disponibles` 
                : 'Agotado'}
            </p>
          </button>
        ))}
      </div>

      {renderBotones()}
    </>
  );

  const renderPaso7 = () => (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Eventos en {destinoSeleccionado}</h2>
      <p className="text-gray-500 mt-2 text-sm">
        {eventosFiltrados.length > 0 
          ? "Selecciona un evento para agregarlo a tu itinerario" 
          : "No hay eventos registrados para este destino"}
      </p>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 p-2">
        {eventosFiltrados.map((evento) => (
          <div
            key={evento.slug}
            onClick={() => setEventoSeleccionado(evento.slug)}
            className={`w-full flex items-start gap-4 p-3 rounded-xl border-2 transition-all cursor-pointer ${
              eventoSeleccionado === evento.slug
                ? 'border-green-500 bg-green-50 shadow-inner'
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
          >
            <img 
              src={evento.src} 
              alt={evento.titulo} 
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{evento.titulo}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {evento.fecha} {evento.mes}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{evento.horario}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{evento.descripcion}</p>
              <p className="text-purple-600 text-sm mt-2">{evento.precio}</p>
            </div>
          </div>
        ))}
      </div>

      {renderBotones()}
    </>
  );

  const renderPaso8 = () => (
    <div className="text-center">
      <div className="relative text-center mb-8">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 w-24 h-1 rounded-full"></div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 mb-4">
          ¡Gracias por tu visita!
        </h2>
      </div>

      <div className="text-center space-y-4 mb-8">
        <p className="text-gray-700 text-lg leading-relaxed">
          Ha sido un placer mostrarte la magia y tradición de nuestros pueblos.
        </p>
        
        <div className="inline-flex items-center bg-green-50/80 border border-green-100 rounded-full px-4 py-2">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-green-800">
            Tu aventura por Michoacán apenas comienza
          </span>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <img
            src="/imagenes/puebloMagico/fin.svg"
            alt="Gracias"
            className="w-full h-full object-contain animate-float"
          />
          <div className="absolute inset-0 bg-green-400/10 rounded-full -z-10 animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="relative overflow-hidden px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-green-500 cursor-pointer to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <span className="relative z-10">Salir</span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  );

  const renderDetallesGrupo = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-bold text-black mb-4">Detalles del grupo</h3>
        
        <div className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Adultos</label>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => actualizarDetalles('adultos', detallesPersonas.adultos - 1)}
                disabled={detallesPersonas.adultos <= 1}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black disabled:opacity-50"
              >
                -
              </button>
              <span className="w-8 text-center">{detallesPersonas.adultos}</span>
              <button 
                onClick={() => actualizarDetalles('adultos', detallesPersonas.adultos + 1)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Niños (2-11 años)</label>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => actualizarDetalles('ninos', detallesPersonas.ninos - 1)}
                disabled={detallesPersonas.ninos <= 0}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black disabled:opacity-50"
              >
                -
              </button>
              <span className="w-8 text-center">{detallesPersonas.ninos}</span>
              <button 
                onClick={() => actualizarDetalles('ninos', detallesPersonas.ninos + 1)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Bebés (0-23 meses)</label>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => actualizarDetalles('bebes', detallesPersonas.bebes - 1)}
                disabled={detallesPersonas.bebes <= 0}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black disabled:opacity-50"
              >
                -
              </button>
              <span className="w-8 text-center">{detallesPersonas.bebes}</span>
              <button 
                onClick={() => actualizarDetalles('bebes', detallesPersonas.bebes + 1)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black"
              >
                +
              </button>
            </div>
          </div>
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
             paso === 4 ? renderPaso4() :
             paso === 5 ? renderPaso5() :
             paso === 6 ? renderPaso6() :
             paso === 7 ? renderPaso7() :
             renderPaso8()}
          </div>
        </div>
      </div>
      {showDetalles && renderDetallesGrupo()}
    </>
  );
}