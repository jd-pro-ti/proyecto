// src/app/page.js
import React from 'react';
import Experiencia from './experincia';


function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-blue-600 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Descubre el Mundo</h1>
          <p className="text-xl mb-8">Explora destinos increíbles y vive experiencias únicas</p>
<Experiencia />
        </div>
      </div>

      {/* Sección 1: Destinos Populares */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Destinos Populares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="h-48 relative">
              <img 
  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29" 
  alt="Playa tropical"
  className="w-full h-full object-cover"
/>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Playas Paradisíacas</h3>
              <p className="text-gray-600 mb-4">Relájate en las mejores playas del mundo con aguas cristalinas y arenas blancas.</p>
              <button className="text-blue-600 font-medium">Explorar →</button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="h-48 relative">
             <img 
  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29" 
  alt="Playa tropical"
  className="w-full h-full object-cover"
/>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Ciudades Históricas</h3>
              <p className="text-gray-600 mb-4">Descubre la cultura y arquitectura de las ciudades más emblemáticas.</p>
              <button className="text-blue-600 font-medium">Explorar →</button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="h-48 relative">
              <img 
  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29" 
  alt="Playa tropical"
  className="w-full h-full object-cover"
/>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Aventuras en la Naturaleza</h3>
              <p className="text-gray-600 mb-4">Vive experiencias emocionantes en los paisajes naturales más impresionantes.</p>
              <button className="text-blue-600 font-medium">Explorar →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Experiencias Únicas */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Experiencias Únicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Viajes Personalizados</h3>
              <p className="text-gray-700 mb-6">
                Ofrecemos itinerarios hechos a medida según tus intereses, presupuesto y estilo de viaje. 
                Desde lujosos resorts hasta mochileros aventureros, tenemos la experiencia perfecta para ti.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Asesoramiento de expertos locales</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Actividades exclusivas</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  <span>Alojamientos seleccionados</span>
                </li>
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                Más información
              </button>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
              <img 
  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29" 
  alt="Playa tropical"
  className="w-full h-full object-cover"
/>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Testimonios */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Lo que dicen nuestros viajeros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                <img 
  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29" 
  alt="Playa tropical"
  className="w-full h-full object-cover"
/>
              </div>
              <div>
                <h4 className="font-semibold">María González</h4>
                <p className="text-gray-500 text-sm">Viajó a Bali</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "La mejor experiencia de viaje que he tenido. Todo estaba perfectamente organizado y descubrimos lugares que nunca hubiéramos encontrado por nuestra cuenta."
            </p>
            <div className="flex mt-4 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
               <img 
  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29" 
  alt="Playa tropical"
  className="w-full h-full object-cover"
/>
              </div>
              <div>
                <h4 className="font-semibold">Carlos Martínez</h4>
                <p className="text-gray-500 text-sm">Viajó a Japón</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Increíble organización y atención al detalle. Nos ayudaron a crear un itinerario que combinaba cultura, gastronomía y aventura perfectamente."
            </p>
            <div className="flex mt-4 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
               <img 
  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29" 
  alt="Playa tropical"
  className="w-full h-full object-cover"
/>
              </div>
              <div>
                <h4 className="font-semibold">Ana López</h4>
                <p className="text-gray-500 text-sm">Viajó a Italia</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "Gracias a su asesoramiento, evitamos las multitudes y descubrimos la auténtica Italia. Los restaurantes que nos recomendaron fueron espectaculares."
            </p>
            <div className="flex mt-4 text-yellow-400">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-blue-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para tu próxima aventura?</h2>
          <p className="text-xl mb-8">Déjanos ayudarte a planificar el viaje de tus sueños</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Personaliza tu experiencia
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;