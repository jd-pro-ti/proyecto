// src/utils/consultas.js (o donde guardes tus utilidades)

import { pueblosMagicos } from '../../data/pueblosMagicos';
import pueblos from '../../data/pueblos';
import playas from '../../data/playas';
import { alojamientos } from '../../data/alojamientos';
import { eventos } from '../../data/eventos';

// Función para normalizar un array en un objeto por slug
export const normalizarArray = (input) => {
  const arr = Array.isArray(input) ? input : [];
  return arr.reduce((acc, item) => {
    if (item && item.slug) {
      acc[item.slug] = item;
    }
    return acc;
  }, {});
};

// Diccionarios de datos normalizados o seguros
export const dataMap = {
  pueblosMagicos: pueblosMagicos || [],
  pueblos: normalizarArray(pueblos || []),
  playa: playas || [],
};

// Títulos por categoría
export const tituloMap = {
  pueblosMagicos: 'Pueblos Mágicos',
  pueblos: 'Pueblos',
  playa: 'Playas',
};

// Datos externos (para filtros u otros usos)
export const datosExternos = {
  alojamientos,
  eventos
};
