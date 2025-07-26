'use client';

import { useState } from 'react';
import { pueblosMagicos } from '../data/pueblosMagicos';
import pueblos from '../data/pueblos';
import playas from '../data/playas';

export default function ModalFlujo({ show, onClose, categoria }) {
  const [paso, setPaso] = useState(1);
  const [seleccion, setSeleccion] = useState({ destino: null, compania: null });
  const [showDetalles, setShowDetalles] = useState(false);
  const [detalles, setDetalles] = useState({
    adultos: 1,
    ninos: 0,
    bebes: 0
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
    { id: 'pareja', label: 'Pareja', icon: '../imagenes/companias/pareja.svg' },
    { id: 'familia', label: 'Familia', icon: '../imagenes/companias/familia.svg' },
    { id: 'amigos', label: 'Amigos', icon: '../imagenes/companias/amigos.svg' },
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
    if (paso < 2) setPaso((p) => p + 1);
    else {
      console.log('Resultado final:', { ...seleccion, detalles });
      onClose();
    }
  };

  const handleVolver = () => {
    if (paso > 1) setPaso((p) => p - 1);
    else onClose();
  };

  const renderBotones = () => (
    <div className="flex justify-between gap-4 mt-4">
      <button
        onClick={onClose}
        className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Cerrar
      </button>
      {paso === 2 && (
        <button
          onClick={handleVolver}
          className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Volver
        </button>
      )}
      <button
        onClick={handleSiguiente}
        disabled={(paso === 1 && !seleccion.destino) || (paso === 2 && !seleccion.compania)}
        className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
          (paso === 1 && !seleccion.destino) || (paso === 2 && !seleccion.compania)
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
        }`}
      >
        {paso === 2 ? 'Finalizar' : 'Siguiente'}
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

  const renderDetallesGrupo = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-xl font-bold text-black mb-4">Detalles del grupo</h3>
        
        <div className="space-y-4 text-black">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Adultos</label>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => actualizarDetalles('adultos', Math.max(1, detalles.adultos - 1))}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black"
              >
                -
              </button>
              <span className="w-8 text-center">{detalles.adultos}</span>
              <button 
                onClick={() => actualizarDetalles('adultos', detalles.adultos + 1)}
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
                onClick={() => actualizarDetalles('ninos', Math.max(0, detalles.ninos - 1))}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black"
              >
                -
              </button>
              <span className="w-8 text-center">{detalles.ninos}</span>
              <button 
                onClick={() => actualizarDetalles('ninos', detalles.ninos + 1)}
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
                onClick={() => actualizarDetalles('bebes', Math.max(0, detalles.bebes - 1))}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-black"
              >
                -
              </button>
              <span className="w-8 text-center">{detalles.bebes}</span>
              <button 
                onClick={() => actualizarDetalles('bebes', detalles.bebes + 1)}
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
            {paso === 1 ? renderPaso1() : renderPaso2()}
          </div>
        </div>
      </div>

      {showDetalles && renderDetallesGrupo()}
    </>
  );
}