'use client';

import { useState } from 'react';
import ModalSelector from './modals/modalSelector';

export default function Home() {
  const [start, setStart] = useState(false);

  const handleFinish = () => {
    setStart(false); // vuelve a mostrar el botón
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white-100 p-6">
      {!start && (
        <button
          onClick={() => setStart(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer shadow-md"
        >
          Iniciar experiencia
        </button>
      )}

      {start && <ModalSelector onFinish={handleFinish} />}
    </main>
  );
}
