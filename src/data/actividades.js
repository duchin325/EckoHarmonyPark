
export const actividadesIniciales = [
  {
    id: 1,
    nombre: 'Tirolesa',
    horarios: [
      { id: 1, hora: '09:00', cupos: 2 },
      { id: 2, hora: '10:00', cupos: 2 },
      { id: 3, hora: '11:00', cupos: 2 },
      { id: 4, hora: '12:00', cupos: 2 },
      { id: 5, hora: '13:00', cupos: 2 },
      { id: 6, hora: '14:00', cupos: 1 },
      { id: 7, hora: '15:00', cupos: 1 },
      { id: 8, hora: '16:00', cupos: 1 },
      { id: 9, hora: '17:00', cupos: 2 },
    ],
    requiereTalla: true,
    terminos: 'Acepto los términos y condiciones para la actividad Tirolesa, reconociendo los riesgos inherentes y siguiendo todas las instrucciones del personal.'
  },
  {
    id: 2,
    nombre: 'Safari',
    horarios: [
      { id: 1, hora: '09:00', cupos: 3 },
      { id: 2, hora: '10:00', cupos: 5 },
      { id: 3, hora: '11:00', cupos: 2 },
      { id: 4, hora: '12:00', cupos: 4 },
      { id: 5, hora: '13:00', cupos: 2 },
      { id: 6, hora: '14:00', cupos: 3 },
      { id: 7, hora: '15:00', cupos: 1 },
      { id: 8, hora: '16:00', cupos: 5 },
      { id: 9, hora: '17:00', cupos: 5 },
    ],
    requiereTalla: false,
    terminos: 'Acepto los términos y condiciones para la actividad Safari, comprometiéndome a respetar la vida silvestre y seguir las instrucciones del guía.'
  },
  {
    id: 3,
    nombre: 'Palestra',
    horarios: [
      { id: 1, hora: '09:00', cupos: 0 },
      { id: 2, hora: '10:00', cupos: 1 },
      { id: 3, hora: '11:00', cupos: 2 },
      { id: 4, hora: '12:00', cupos: 0 },
      { id: 5, hora: '13:00', cupos: 1 },
      { id: 6, hora: '14:00', cupos: 0 },
      { id: 7, hora: '15:00', cupos: 0 },
      { id: 8, hora: '16:00', cupos: 4 },
      { id: 9, hora: '17:00', cupos: 2 },
    ],
    requiereTalla: true,
    terminos: 'Acepto los términos y condiciones para la actividad Palestra reconociendo los riesgos de escalada y siguiendo todos los protocolos de seguridad.'
  },
  {
    id: 4,
    nombre: 'Jardinería',
    horarios: [
      { id: 1, hora: '09:00', cupos: 2 },
      { id: 2, hora: '10:00', cupos: 4 },
      { id: 3, hora: '11:00', cupos: 3 },
      { id: 4, hora: '12:00', cupos: 1 },
      { id: 5, hora: '13:00', cupos: 0 },
      { id: 6, hora: '14:00', cupos: 3 },
      { id: 7, hora: '15:00', cupos: 5 },
      { id: 8, hora: '16:00', cupos: 2 },
      { id: 9, hora: '17:00', cupos: 0 },
    ],
    requiereTalla: false,
    terminos: 'Acepto los términos y condiciones para la actividad Jardinería, comprometiéndome a seguir las instrucciones para el cuidado adecuado de las plantas.'
  },
];

export const opcionesTallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];