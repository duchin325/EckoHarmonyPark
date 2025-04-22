
export const actividadesIniciales = [
  {
    id: 1,
    nombre: 'Tirolesa',
    horarios: [
      { id: 1, hora: '09:00', cupos: 5 },
      { id: 2, hora: '11:00', cupos: 3 },
      { id: 3, hora: '15:00', cupos: 7 },
    ],
    requiereTalla: true,
    terminos: 'Acepto los términos y condiciones para la actividad Tirolesa, reconociendo los riesgos inherentes y siguiendo todas las instrucciones del personal.'
  },
  {
    id: 2,
    nombre: 'Safari',
    horarios: [
      { id: 1, hora: '08:00', cupos: 10 },
      { id: 2, hora: '09:00', cupos: 8 },
      { id: 3, hora: '10:00', cupos: 7 },
      { id: 4, hora: '14:00', cupos: 5 },
    ],
    requiereTalla: false,
    terminos: 'Acepto los términos y condiciones para la actividad Safari, comprometiéndome a respetar la vida silvestre y seguir las instrucciones del guía.'
  },
  {
    id: 3,
    nombre: 'Palestra',
    horarios: [
      { id: 1, hora: '12:00', cupos: 6 },
      { id: 2, hora: '16:00', cupos: 4 },
    ],
    requiereTalla: true,
    terminos: 'Acepto los términos y condiciones para la actividad Palestra reconociendo los riesgos de escalada y siguiendo todos los protocolos de seguridad.'
  },
  {
    id: 4,
    nombre: 'Jardinería',
    horarios: [
      { id: 1, hora: '09:00', cupos: 8 },
      { id: 2, hora: '13:00', cupos: 4 },
      { id: 3, hora: '17:00', cupos: 8 },
    ],
    requiereTalla: false,
    terminos: 'Acepto los términos y condiciones para la actividad Jardinería, comprometiéndome a seguir las instrucciones para el cuidado adecuado de las plantas.'
  },
];

export const opcionesTallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];