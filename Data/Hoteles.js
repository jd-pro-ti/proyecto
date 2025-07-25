export const Hoteles = [
    {
    nombre: 'Hotel Santa Fe',
    direccion: 'Calle Principal #123, Paracho',
    descripcion: 'Hotel céntrico con desayuno incluido y Wi‑Fi.',
    imagen: '/imagenes/hoteles/paracho1.jpg',
    precioDesde: 800,
    puebloMagico: 'paracho',
    habitaciones: [
        { tipo: 'Estándar', precio: 800, detalles: '1 cama matrimonial, baño privado' },
        { tipo: 'Suite', precio: 1200, detalles: '1 cama king, desayuno incluido' }
    ]
    },
    {
    nombre: 'Hotel Colonial Cuitzeo',
    direccion: 'Av. Morelos #45, Centro, Cuitzeo',
    descripcion: 'Arquitectura colonial y excelente ubicación frente al lago.',
    imagen: '/imagenes/hoteles/cuitzeo1.jpg',
    precioDesde: 700,
    puebloMagico: 'cuitzeo',
    habitaciones: [
        { tipo: 'Estándar', precio: 700, detalles: '1 cama matrimonial, baño privado' }
        ]
    },
    {
    nombre: 'Hotel La Casona',
    direccion: 'Calle Hidalgo #67, Pátzcuaro',
    descripcion: 'Estancia tradicional con patio interior y desayuno típico.',
    imagen: '/imagenes/hoteles/patzcuaro1.jpg',
    precioDesde: 900,
    puebloMagico: 'patzcuaro',
    habitaciones: [
        { tipo: 'Estándar', precio: 900, detalles: 'Cama doble, Wi‑Fi gratuito' }
    ]
    },
    {
    nombre: 'Hotel Pueblo Dorado',
    direccion: 'Centro histórico, Tlalpujahua',
    descripcion: 'Vistas increíbles a las montañas y decoración rústica.',
    imagen: '/imagenes/hoteles/tlalpujahua1.jpg',
    precioDesde: 850,
    puebloMagico: 'tlalpujahua',
    habitaciones: [
        { tipo: 'Estándar', precio: 850, detalles: '1 cama queen, calefacción' }
    ]
    },
    {
    nombre: 'Hotel Santa Clara Colonial',
    direccion: 'Plaza Principal #22, Santa Clara del Cobre',
    descripcion: 'Ambiente tradicional, cerca de talleres de cobre.',
    imagen: '/imagenes/hoteles/santa-clara1.jpg',
    precioDesde: 750,
    puebloMagico: 'santa‑clara‑del‑cobre',
    habitaciones: [
        { tipo: 'Estándar', precio: 750, detalles: 'Cama doble, baño privado' }
    ]
    },
    {
    nombre: 'Hotel El Oasis',
    direccion: 'Avenida Reforma #10, Tacámbaro',
    descripcion: 'Con alberca, jardines y desayuno incluido.',
    imagen: '/imagenes/hoteles/tacambaro1.jpg',
    precioDesde: 880,
    puebloMagico: 'tacambaro',
    habitaciones: [
        { tipo: 'Estándar', precio: 880, detalles: '1 cama matrimonial, Wi‑Fi, aire acondicionado' }
    ]
    },
    {
    nombre: 'Hotel Los Azufres Inn',
    direccion: 'Zona de los Azufres, Jungapeo',
    descripcion: 'Cabañas junto a aguas termales, ideal para relajarse.',
    imagen: '/imagenes/hoteles/jungapeo1.jpg',
    precioDesde: 1100,
    puebloMagico: 'jungapeo',
    habitaciones: [
        { tipo: 'Cabaña', precio: 1100, detalles: 'Cama matrimonial, chimenea' }
    ]
    },
    {
    nombre: 'Hotel Vista Lago',
    direccion: 'Orilla del lago, Jiquilpan',
    descripcion: 'Vistas espectaculares al lago y entorno tranquilo.',
    imagen: '/imagenes/hoteles/jiquilpan1.jpg',
    precioDesde: 780,
    puebloMagico: 'jiquilpan',
    habitaciones: [
        { tipo: 'Estándar', precio: 780, detalles: 'Cama doble, balcón con vista al lago' }
    ]
    },
    {
    nombre: 'Hotel Mineral',
    direccion: 'Centro, Angangueo',
    descripcion: 'Hotel con historia minera, cerca del santuario de mariposas.',
    imagen: '/imagenes/hoteles/angangueo1.jpg',
    precioDesde: 820,
    puebloMagico: 'angangueo',
    habitaciones: [
        { tipo: 'Estándar', precio: 820, detalles: 'Cama matrimonial, desayuno incluido' }
    ]
    },

    // --- PLAYAS
    {
    nombre: 'Hotel Playa Azul',
    direccion: 'Av. Venustiano Carranza S/N, Playa Azul, Michoacán',
    descripcion: 'Hotel frente a la playa con restaurante, alberca y Wi‑Fi gratis',
    imagen: '/imagenes/hoteles/playa-azul.jpg',
    precioDesde: 950,
    playa: 'playa‑azul',
    habitaciones: [
        { tipo: 'Estándar', precio: 950, detalles: '1 cama queen, aire acondicionado' }
    ]
    },
    {
    nombre: 'Parador Turístico Ayult',
    direccion: 'Tepalcatepec s/n, Maruata, Aquila, Michoacán',
    descripcion: 'Cabañas ecológicas frente a la playa con restaurante local ($400 MXN)',
    imagen: '/imagenes/hoteles/maruata.jpg',
    precioDesde: 400,
    playa: 'maruata',
    habitaciones: [
        { tipo: 'Cabaña King', precio: 400, detalles: 'Servicio de restaurante incluido' }
    ]
    },
    {
    nombre: 'Hotel y Villas Partour Caleta',
    direccion: 'Carretera #200 Km 51, Caleta de Campos, Mich.',
    descripcion: 'Hotel 4 estrellas con alberca, restaurante y tours a Maruata',
    imagen: '/imagenes/hoteles/caleta.jpg',
    precioDesde: 800,
    playa: 'caleta‑de‑campos',
    habitaciones: [
        { tipo: 'Estándar', precio: 800, detalles: 'TV, restaurante, piscina' }
      ]
    },
    {
    nombre: 'Casa Baomal Nexpa',
    direccion: 'Playa Nexpa, Michoacán',
    descripcion: 'Cabañas y hospedaje rústico ideal para surfistas y ecoturismo',
    imagen: '/imagenes/hoteles/nexpa.jpg',
    precioDesde: 850,
    playa: 'nexpa',
    habitaciones: [
        { tipo: 'Surf bungalow', precio: 850, detalles: 'Hamaca, balcón, cocina básica' }
      ]
    },
    {
    nombre: 'Cabañas Faro del Mar',
    direccion: 'Faro de Bucerías, Lázaro Cárdenas, Michoacán',
    descripcion: 'Cabañas ecológicas frente al mar en zona tranquila',
    imagen: '/imagenes/hoteles/faro-de-bucerias.jpg',
    precioDesde: 750,
    playa: 'faro‑de‑bucerias',
    habitaciones: [
        { tipo: 'Cabaña individual', precio: 750, detalles: 'Naturaleza, acceso directo a playa' }
    ]
    },
    {
    nombre: 'La Ticla Surf Hostel',
    direccion: 'La Ticla, Aquila, Michoacán',
    descripcion: 'Hostal básico para surfistas y mochileros junto a la playa',
    imagen: '/imagenes/hoteles/la-ticla.jpg',
    precioDesde: 500,
    playa: 'la‑ticla',
    habitaciones: [
        { tipo: 'Dormitorio compartido', precio: 500, detalles: 'Ideal para surfistas y grupos' }
    ]
    },
    {
    nombre: 'Cabañas Punta Guitapilla',
    direccion: 'Punta Guitapilla, Aquila, Michoacán',
    descripcion: 'Cabañas artesanales frente al mar en zona silvestre',
    imagen: '/imagenes/hoteles/guitapilla.jpg',
    precioDesde: 800,
    playa: 'guitapilla',
    habitaciones: [
        { tipo: 'Cabaña básica', precio: 800, detalles: '1 cama matrimonial, terraza y cocina' }
    ]
    },
    {
    nombre: 'Hotel Tortugas Colola',
    direccion: 'Reserva de la Tortuga, Colola, Aquila, Mich.',
    descripcion: 'Alojamiento básico cerca del campamento tortuguero',
    imagen: '/imagenes/hoteles/colola.jpg',
    precioDesde: 650,
    playa: 'colola',
    habitaciones: [
        { tipo: 'Rústica', precio: 650, detalles: 'Ambiente natural, camas dobles' }
    ]
    },
    {
    nombre: 'Hotel San Juan de Alima',
    direccion: 'San Juan de Alima, Aquila, Michoacán',
    descripcion: 'Pequeño hotel local con instalaciones sencillas y vistas costeras',
    imagen: '/imagenes/hoteles/san-juan-alima.jpg',
    precioDesde: 900,
    playa: 'san‑juan‑de‑alima',
    habitaciones: [
        { tipo: 'Estándar', precio: 900, detalles: 'Baño privado, ventilador, lugar tranquilo' }
    ]
    }
];
