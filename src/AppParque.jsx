import './App.css';

import { useEffect, useState } from 'react';

// Datos de ejemplo para las actividades
const actividadesIniciales = [
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

// Opciones de talles
const opcionesTallas = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function AppParque() {
  const [paso, setPaso] = useState(1);
  const [actividades, setActividades] = useState(actividadesIniciales);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [participantes, setParticipantes] = useState([{ nombre: '', dni: '', edad: '', talla: 'M' }]);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [inscripcionCompletada, setInscripcionCompletada] = useState(false);

  // Filtrar actividades con cupos disponibles
  const actividadesDisponibles = actividades.filter(actividad =>
    actividad.horarios.some(horario => horario.cupos > 0)
  );

  // Reset horario cuando cambia la actividad
  useEffect(() => {
    setHorarioSeleccionado(null);
  }, [actividadSeleccionada]);

  // Actualizar participantes cuando cambia la cantidad
  useEffect(() => {
    if (cantidadPersonas > participantes.length) {
      // Añadir más participantes
      const nuevosParticipantes = [...participantes];
      for (let i = participantes.length; i < cantidadPersonas; i++) {
        nuevosParticipantes.push({ nombre: '', dni: '', edad: '', talla: 'M' });
      }
      setParticipantes(nuevosParticipantes);
    } else if (cantidadPersonas < participantes.length) {
      // Reducir participantes
      setParticipantes(participantes.slice(0, cantidadPersonas));
    }
  }, [cantidadPersonas]);

  // Actualizar un participante específico
  const actualizarParticipante = (index, campo, valor) => {
    // Validar solo si el campo es DNI
    if (campo === 'dni') {
      if (!/^\d{0,8}$/.test(valor)) {
        return; // No actualiza si no pasa la validación
      }
    }
    const nuevosParticipantes = [...participantes];
    nuevosParticipantes[index] = {
      ...nuevosParticipantes[index],
      [campo]: valor
    };
    setParticipantes(nuevosParticipantes);
  };

  // Verificar si todos los campos requeridos están completos para avanzar
  const puedeAvanzar = () => {
    switch (paso) {
      case 1:
        return actividadSeleccionada !== null;
      case 2:
        return horarioSeleccionado !== null;
      case 3:
        return cantidadPersonas > 0;
      case 4:
        return participantes.every(p =>
          p.nombre.trim() !== '' &&
          p.dni.trim() !== '' && p.dni.trim().length <= 8 && p.dni.trim().length >= 7 &&
          p.edad.trim() !== '' &&
          (!actividadSeleccionada?.requiereTalla || p.talla)
        );
      case 5:
        return aceptaTerminos;
      default:
        return false;
    }
  };

  // Avanzar al siguiente paso
  const siguientePaso = () => {
    if (paso < 5) {
      setPaso(paso + 1);
    } else if (paso === 5) {
      // Completar inscripción
      reducirCupos(horarioSeleccionado, cantidadPersonas);
      setInscripcionCompletada(true);
    }
  };

  // Volver al paso anterior
  const pasoAnterior = () => {
    if (paso > 1) {
      setPaso(paso - 1);
      if (paso === 3) {
        setCantidadPersonas(1);
      }
    }
  };

  // Reiniciar formulario
  const reiniciarFormulario = () => {
    setActividadSeleccionada(null);
    setHorarioSeleccionado(null);
    setCantidadPersonas(1);
    setParticipantes([{ nombre: '', dni: '', edad: '', talla: 'M' }]);
    setAceptaTerminos(false);
    setInscripcionCompletada(false);
    setPaso(1);
  };

  // Renderizar paso actual
  const renderizarPaso = () => {
    switch (paso) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800">Selecciona una actividad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actividadesDisponibles.map(actividad => (
                <div
                  key={actividad.id}
                  onClick={() => setActividadSeleccionada(actividad)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${actividadSeleccionada?.id === actividad.id
                    ? 'bg-mindaro border-2 border-mossgreen'
                    : 'bg-white border border-gray-200 hover:border-mossgreen'
                    }`}
                >
                  <h3 className="font-medium">{actividad.nombre}</h3>
                  <p className="text-sm text-gray-600">
                    {actividad.horarios.filter(h => h.cupos > 0).length} horarios disponibles
                  </p>
                  <p className="text-sm text-gray-600">
                    {actividad.horarios.reduce((acum, horario) => acum + horario.cupos, 0)} cupos disponibles
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800">Selecciona un horario</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actividadSeleccionada?.horarios
                .filter(horario => horario.cupos > 0)
                .map(horario => (
                  <div
                    key={horario.id}
                    onClick={() => setHorarioSeleccionado(horario)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${horarioSeleccionado?.id === horario.id
                      ? 'bg-mindaro border-2 border-mossgreen'
                      : 'bg-white border border-gray-200 hover:border-mossgreen'
                      }`}
                  >
                    <h3 className="font-medium">{horario.hora}</h3>
                    <p className="text-sm text-gray-600">
                      {horario.cupos} cupos disponibles
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-800">¿Cuántas personas participarán?</h2>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => cantidadPersonas > 1 && setCantidadPersonas(cantidadPersonas - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-bold text-xl"
                disabled={cantidadPersonas <= 1}
              >
                -
              </button>
              <span className="text-2xl font-semibold">{cantidadPersonas}</span>
              <button
                onClick={() => cantidadPersonas < horarioSeleccionado?.cupos && setCantidadPersonas(cantidadPersonas + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-bold text-xl"
                disabled={cantidadPersonas >= horarioSeleccionado?.cupos}
              >
                +
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              Máximo {horarioSeleccionado?.cupos} personas
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-green-800">Información de los participantes</h2>

            {participantes.map((participante, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
                <h3 className="font-medium border-b pb-2">Participante {index + 1}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                    <input
                      type="text"
                      value={participante.nombre}
                      onChange={(e) => actualizarParticipante(index, 'nombre', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Nombre y apellido"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                    <input
                      type="text"
                      value={participante.dni}
                      onChange={(e) => actualizarParticipante(index, 'dni', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="12345678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                    <input
                      type="number"
                      value={participante.edad}
                      onChange={(e) => actualizarParticipante(index, 'edad', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="25"
                      min="0"
                    />
                  </div>

                  {actividadSeleccionada?.requiereTalla && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Talla de vestimenta</label>
                      <select
                        value={participante.talla}
                        onChange={(e) => actualizarParticipante(index, 'talla', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        {opcionesTallas.map(talla => (
                          <option key={talla} value={talla}>
                            {talla}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-green-800">Términos y condiciones</h2>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm">{actividadSeleccionada?.terminos}</p>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terminos"
                checked={aceptaTerminos}
                onChange={(e) => setAceptaTerminos(e.target.checked)}
                className="mt-1 mr-2"
              />
              <label htmlFor="terminos" className="text-sm">
                Acepto los términos y condiciones para la actividad {actividadSeleccionada?.nombre}
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const reducirCupos = (horarioSeleccionado, cantidadPersonas) => {
    const nuevaActividad = {
      ...actividadSeleccionada,
      horarios: actividadSeleccionada.horarios.map(horario =>
        horario.hora === horarioSeleccionado.hora
          ? { ...horario, cupos: horario.cupos - cantidadPersonas }
          : horario
      ),
    };

    setActividades(prevActividades =>
      prevActividades.map(actividad =>
        actividad.id === nuevaActividad.id ? nuevaActividad : actividad
      )
    );
  };

  // Vista de inscripción exitosa
  if (inscripcionCompletada) {
    return (
      <div className="min-h-screen bg-mindaro flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">¡Inscripción exitosa!</h2>
          <p className="text-gray-600 mb-6">
            Te has inscrito correctamente a la actividad {actividadSeleccionada?.nombre} para {cantidadPersonas} {cantidadPersonas === 1 ? 'persona' : 'personas'} a las {horarioSeleccionado?.hora}.
          </p>
          <button
            onClick={reiniciarFormulario}
            className="w-full bg-ferngreen hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Realizar otra inscripción
          </button>
        </div>
      </div>
    );
  }

  // Formulario principal
  return (
    <div className="min-h-screen bg-mossgreen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-huntergreen">Inscripción a Actividades</h1>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Progreso */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`flex flex-col items-center ${stepNum < paso ? 'text-huntergreen' : stepNum === paso ? 'text-white' : 'text-gray-800'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stepNum < paso
                    ? 'bg-darkgreen text-white'
                    : stepNum === paso
                      ? 'bg-ferngreen text-gray-800 border-2 border-huntergreen'
                      : 'bg-gray-100 text-gray-500'
                    }`}>
                    {stepNum < paso ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span className="text-xs mt-1">
                    {stepNum === 1 && 'Actividad'}
                    {stepNum === 2 && 'Horario'}
                    {stepNum === 3 && 'Cantidad'}
                    {stepNum === 4 && 'Datos'}
                    {stepNum === 5 && 'Términos'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 w-full bg-gray-200 rounded-full">
              <div
                className="h-1 bg-green-600 rounded-full transition-all"
                style={{ width: `${(paso - 1) * 25}%` }}
              ></div>
            </div>
          </div>

          {/* Contenido del paso actual */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderizarPaso()}

            {/* Botones de navegación */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={pasoAnterior}
                disabled={paso === 1}
                className={`px-4 py-2 rounded-md ${paso === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                Atrás
              </button>

              <button
                onClick={siguientePaso}
                disabled={!puedeAvanzar()}
                className={`px-4 py-2 rounded-md ${puedeAvanzar()
                  ? 'bg-ferngreen hover:bg-green-700 text-white'
                  : 'bg-ferngreen text-gray-400 cursor-not-allowed'
                  }`}
              >
                {paso === 5 ? 'Confirmar inscripción' : 'Siguiente'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
