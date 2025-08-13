'use client';

import React from 'react';

export function BotonVolver({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 p-2 text-[#059669] rounded-full hover:bg-gray-100 transition-all 
                duration-300 ease-in-out transform hover:-translate-x-1 active:scale-95 cursor-pointer"
      aria-label="Volver"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="font-medium">Volver</span>
    </button>
  );
}

export function BotonSiguiente({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ease-in-out 
                ${disabled ? 'text-gray-400 cursor-not-allowed' : 
                  'text-[#059669] hover:bg-green-50 hover:shadow-md transform hover:translate-x-1 cursor-pointer active:scale-95'}
                relative overflow-hidden group`}
      aria-label="Siguiente"
    >
      <span className="font-medium">Siguiente</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      {!disabled && (
        <span className="absolute inset-0 bg-green-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
      )}
    </button>
  );
}

export function BotonCerrar({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 text-[#364153]  hover:text-[#EA5261] rounded-full hover:bg-red-50 transition-all 
                 duration-300 ease-in-out transform hover:scale-110 active:scale-95 cursor-pointer"
      aria-label="Cerrar"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );
}

export function ContenedorBotones({ children }) {
  return (
    <div className="flex justify-between items-center mt-6 p-2 bg-gray-50 rounded-lg">
      {children}
    </div>
  );
}

export function Espaciador() {
  return <div className="flex-1"></div>;
}