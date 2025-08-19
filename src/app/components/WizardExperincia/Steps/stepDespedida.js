import { supabase } from '../../../../../config';
import React from 'react';

const useExperience = (onClose) => {
  const formatearFecha = (fecha) => 
    fecha ? new Date(fecha).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" }) : "";

  const guardarExperiencia = async (datos) => {
    if (!datos?.hotel) return onClose();
    
    const { error } = await supabase.from('experiencia').insert([{
      ...datos,
      adultos: datos.detallesPersonas?.adultos || 0,
      ninos: datos.detallesPersonas?.ninos || 0,
      bebes: datos.detallesPersonas?.bebes || 0,
      fecha_inicio: datos.fechas?.inicio || null,
      fecha_fin: datos.fechas?.fin || null
    }]);

    error ? console.error("Error:", error) : onClose();
  };

  const formatoFechas = (fechas) => 
    fechas?.inicio && fechas?.fin 
      ? `${formatearFecha(fechas.inicio)} al ${formatearFecha(fechas.fin)}` 
      : fechas;

  return { guardarExperiencia, formatoFechas };
};

export default function RenderFinal({ onClose, datos }) {
  const { guardarExperiencia, formatoFechas } = useExperience(onClose);
  const textoFechas = formatoFechas(datos?.fechas);

  return (
    <div className="text-center">
      {/* Encabezado */}
      <div className="relative mb-8">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 text-[#059669] w-24 h-1 rounded-full"/>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800 mb-4">
          ¡Gracias por tu visita!
        </h2>
      </div>

      <div className="text-center space-y-4 mb-8">
        <p className="text-gray-700 text-lg leading-relaxed">
          Ha sido un placer mostrarte la magia y tradición de nuestros pueblos.
        </p>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-left space-y-2">
          {[
            ['Destino', datos?.destino],
            ['Categoría', datos?.categoria],
            ['Fechas', textoFechas],
            ['Hotel', datos?.hotel],
            ['Habitación', datos?.habitacion],
            ['Personas', datos?.detallesPersonas && 
              `${datos.detallesPersonas.adultos} adultos, 
               ${datos.detallesPersonas.ninos} niños, 
               ${datos.detallesPersonas.bebes} bebés`]
          ].map(([label, value]) => value && (
            <p key={label} className="text-gray-800"><strong>{label}:</strong> {value}</p>
          ))}
        </div>

        <div className="inline-flex items-center bg-green-50/80 border border-green-100 rounded-full px-4 py-2">
          <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm font-medium text-green-800">
            Tu aventura por Michoacán apenas comienza
          </span>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          <img src="/imagenes/puebloMagico/fin.svg" alt="Gracias" className="w-full h-full object-contain animate-float"/>
          <div className="absolute inset-0 bg-green-400/10 rounded-full -z-10 animate-pulse"/>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={() => guardarExperiencia(datos)} className="relative overflow-hidden px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <span className="relative z-10">Salir</span>
          <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
        </button>
      </div>
    </div>
  );
}