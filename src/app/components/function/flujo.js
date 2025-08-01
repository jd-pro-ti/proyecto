import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { dataMap, tituloMap, datosExternos } from './consultas';

export const useFlujo = ({ show, categoria, subcategoria, onClose, onBack }) => {
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
  const [tipoViaje, setTipoViaje] = useState(null);
  const [detallesPersonas, setDetallesPersonas] = useState({ adultos: 1, ninos: 0, bebes: 0 });
  const [necesitaHospedaje, setNecesitaHospedaje] = useState(null);
  const [fechasViaje, setFechasViaje] = useState({ inicio: null, fin: null });
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [paso, setPaso] = useState(1);
  const [seleccion, setSeleccion] = useState({ destino: null, compania: null });
  const [showDetalles, setShowDetalles] = useState(false);
  const [respuesta, setRespuesta] = useState(null);
  const [fechasVisita, setFechasVisita] = useState({ fechaInicio: null, fechaFin: null });
  const [mesActualInicio, setMesActualInicio] = useState(new Date());
  const [mesActualFin, setMesActualFin] = useState(new Date());

  const { alojamientos, eventos } = datosExternos;

  const opcionesCompania = [
    { id: 'solo', label: 'Solo', icon: '/imagenes/playa/playa16.svg' },
    { id: 'pareja', label: 'Pareja', icon: '/imagenes/playa/playa17.svg' },
    { id: 'familia', label: 'Familia', icon: '/imagenes/playa/playa18.svg' },
    { id: 'amigos', label: 'Amigos', icon: '/imagenes/playa/playa19.svg' },
  ];

  const habitaciones = [
    { id: 'sencilla', nombre: 'Habitación Sencilla', icono: '/imagenes/puebloMagico/puebloM11.svg', precio: '$800/noche', disponibles: 5, descripcion: '1 cama individual, baño privado' },
    { id: 'doble', nombre: 'Habitación Doble', icono: '/imagenes/puebloMagico/puebloM12.svg', precio: '$1,200/noche', disponibles: 3, descripcion: '2 camas individuales o 1 cama matrimonial' },
    { id: 'suite', nombre: 'Suite', icono: '/imagenes/puebloMagico/puebloM13.svg', precio: '$2,000/noche', disponibles: 2, descripcion: 'Amplio espacio con sala de estar' },
    { id: 'familiar', nombre: 'Familiar', icono: '/imagenes/puebloMagico/puebloM14.svg', precio: '$1,500/noche', disponibles: 4, descripcion: '2 habitaciones conectadas, hasta 4 personas' },
    { id: 'ejecutiva', nombre: 'Ejecutiva', icono: '/imagenes/puebloMagico/puebloM15.svg', precio: '$1,800/noche', disponibles: 3, descripcion: 'Escritorio amplio y amenities de trabajo' },
    { id: 'presidencial', nombre: 'Presidencial', icono: '/imagenes/puebloMagico/puebloM16.svg', precio: '$3,500/noche', disponibles: 1, descripcion: 'Lujo máximo con terraza privada' },
  ];

  const hotelesFiltrados = destinoSeleccionado
    ? (alojamientos || []).filter(hotel =>
        hotel?.municipio?.toLowerCase() === destinoSeleccionado.toLowerCase())
    : [];

  const eventosFiltrados = destinoSeleccionado
    ? (eventos || []).filter(evento =>
        evento?.lugar?.toLowerCase().includes(destinoSeleccionado.toLowerCase()))
    : [];

  useEffect(() => {
    if (!show) resetearEstados();
  }, [show]);

  const resetearEstados = () => {
    setDestinoSeleccionado(null);
    setTipoViaje(null);
    setDetallesPersonas({ adultos: 1, ninos: 0, bebes: 0 });
    setNecesitaHospedaje(null);
    setFechasViaje({ inicio: null, fin: null });
    setHotelSeleccionado(null);
    setHabitacionSeleccionada(null);
    setEventoSeleccionado(null);
    setPaso(1);
    setSeleccion({ destino: null, compania: null });
    setRespuesta(null);
    setFechasVisita({ fechaInicio: null, fechaFin: null });
  };

  useEffect(() => {
    if (seleccion.destino) {
      const data = dataMap[categoria] || {};
      setDestinoSeleccionado(data[seleccion.destino]?.nombre || null);
    }
  }, [seleccion.destino, categoria]);

  useEffect(() => {
    if (seleccion.compania) {
      setTipoViaje(seleccion.compania);
    }
  }, [seleccion.compania]);

  useEffect(() => {
    setNecesitaHospedaje(respuesta);
  }, [respuesta]);

  useEffect(() => {
    setFechasViaje({
      inicio: fechasVisita.fechaInicio,
      fin: fechasVisita.fechaFin,
    });
  }, [fechasVisita]);

  const toggleOpcion = (opcion) => {
    setSeleccion(prev => ({ ...prev, compania: opcion }));
    if (opcion === 'familia' || opcion === 'amigos') {
      setShowDetalles(true);
    } else {
      setShowDetalles(false);
      setDetallesPersonas({ adultos: 1, ninos: 0, bebes: 0 });
    }
  };

  const toggleSeleccion = (tipo, id) => {
    setSeleccion(prev => ({
      ...prev,
      [tipo]: prev[tipo] === id ? null : id,
    }));
  };

  const actualizarDetalles = (campo, valor) => {
    setDetallesPersonas(prev => ({
      ...prev,
      [campo]: Math.max(0, valor)
    }));
  };

  const handleSiguiente = () => {
    if (paso === 3 && respuesta === false) {
      setPaso(7);
    } else if (paso === 5 && hotelesFiltrados.length === 0) {
      setPaso(7);
    } else if (paso === 7 && !necesitaHospedaje) {
      mostrarResumenFinal();
      onClose();
    } else if (paso < (necesitaHospedaje ? 8 : 4)) {
      setPaso(p => p + 1);
    } else {
      mostrarResumenFinal();
      onClose();
    }
  };

  const handleVolver = () => {
    if (paso > 1) {
      if (paso === 7 && respuesta === false) {
        setPaso(3);
      } else if (paso === 7 && hotelesFiltrados.length === 0) {
        setPaso(5);
      } else if (paso === 5 && hotelesFiltrados.length === 0) {
        setPaso(4);
      } else {
        setPaso(p => p - 1);
      }
    } else {
      onBack();
    }
  };

  const mostrarResumenFinal = () => {
    const resumen = {
      Destino: destinoSeleccionado || 'No seleccionado',
      TipoViaje: tipoViaje || 'No seleccionado',
      DetallesPersonas: detallesPersonas,
      Hospedaje: necesitaHospedaje ? 'Sí' : 'No',
      HotelSeleccionado: hotelSeleccionado || 'No seleccionado',
      Habitacion: habitacionSeleccionada || 'No seleccionada',
      Evento: eventoSeleccionado || 'No seleccionado',
      Fechas: {
        Inicio: fechasViaje.inicio ? format(fechasViaje.inicio, 'dd/MM/yyyy', { locale: es }) : 'No seleccionada',
        Fin: fechasViaje.fin ? format(fechasViaje.fin, 'dd/MM/yyyy', { locale: es }) : 'No seleccionada'
      }
    };
    console.log('Resumen completo del viaje:', resumen);
  };

  const cambiarMes = (tipo, direccion) => {
    const setter = tipo === 'inicio' ? setMesActualInicio : setMesActualFin;
    setter(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(direccion === 'next' ? newDate.getMonth() + 1 : newDate.getMonth() - 1);
      return newDate;
    });
  };

  const generarDiasMes = (fecha) => {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    const dias = [];

    const diaSemanaInicio = primerDia.getDay();
    for (let i = 0; i < diaSemanaInicio; i++) dias.push(null);

    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(new Date(year, month, i));
    }

    return dias;
  };

  const seleccionarFecha = (fecha, tipo) => {
    if (!fecha) return;
    if (tipo === 'inicio') {
      setFechasVisita(prev => ({ ...prev, fechaInicio: fecha }));
      if (fechasVisita.fechaFin && fecha > fechasVisita.fechaFin) {
        setFechasVisita(prev => ({ ...prev, fechaFin: null }));
      }
    } else {
      if (fechasVisita.fechaInicio && fecha >= fechasVisita.fechaInicio) {
        setFechasVisita(prev => ({ ...prev, fechaFin: fecha }));
      }
    }
  };

  const datosOriginales = dataMap[categoria] || {};
  const datosFiltrados =
    categoria === 'pueblos' && subcategoria
      ? Object.fromEntries(
          Object.entries(datosOriginales).filter(
            ([_, item]) => item?.categoria?.toLowerCase() === subcategoria?.toLowerCase()
          )
        )
      : datosOriginales;

  return {
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

    dataMap,
    tituloMap,
    opcionesCompania,
    habitaciones,
    datos: datosFiltrados,
    datosLista: Object.entries(datosFiltrados),

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
  };
};
