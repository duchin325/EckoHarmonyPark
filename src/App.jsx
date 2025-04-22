import { useEffect, useState } from 'react';
import './App.css';
import { actividadesIniciales, opcionesTallas } from './data/actividades';
import Confirmacion from './steps/Confirmacion';
import Paso1SeleccionActividad from './steps/Paso1SeleccionActividad';
import Paso2SeleccionHorario from './steps/Paso2SeleccionHorario';
import Paso3CantidadPersonas from './steps/Paso3CantidadPersonas';
import Paso4FormularioParticipantes from './steps/Paso4FormularioParticipantes';
import Paso5Terminos from './steps/Paso5Terminos';

export default function App() {
  const [paso, setPaso] = useState(1);
  const [actividades, setActividades] = useState(actividadesIniciales);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [participantes, setParticipantes] = useState([{ nombre: '', dni: '', edad: '', talla: 'M' }]);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [inscripcionCompletada, setInscripcionCompletada] = useState(false);

  const actividadesDisponibles = actividades.filter(actividad =>
    actividad.horarios.some(horario => horario.cupos > 0)
  );

  useEffect(() => {
    setHorarioSeleccionado(null);
  }, [actividadSeleccionada]);

  useEffect(() => {
    if (cantidadPersonas > participantes.length) {
      const nuevosParticipantes = [...participantes];
      for (let i = participantes.length; i < cantidadPersonas; i++) {
        nuevosParticipantes.push({ nombre: '', dni: '', edad: '', talla: 'M' });
      }
      setParticipantes(nuevosParticipantes);
    } else if (cantidadPersonas < participantes.length) {
      setParticipantes(participantes.slice(0, cantidadPersonas));
    }
  }, [cantidadPersonas]);

  const actualizarParticipante = (index, campo, valor) => {
    if (campo === 'dni' && !/^\d{0,8}$/.test(valor)) return;
    if ((campo === 'edad' && !/^\d{0,2}$/.test(valor))) return;
    const nuevos = [...participantes];
    nuevos[index] = { ...nuevos[index], [campo]: valor };
    setParticipantes(nuevos);
  };

  const puedeAvanzar = () => {
    switch (paso) {
      case 1: return actividadSeleccionada !== null;
      case 2: return horarioSeleccionado !== null;
      case 3: return cantidadPersonas > 0;
      case 4:
        return participantes.every(p =>
          p.nombre.trim() !== '' &&
          p.dni.trim().length >= 7 && p.dni.trim().length <= 8 &&
          p.edad.trim() !== '' && p.edad.trim().length > 0 && p.edad.trim().length <= 2 &&
          (!actividadSeleccionada?.requiereTalla || p.talla)
        );
      case 5: return aceptaTerminos;
      default: return false;
    }
  };

  const siguientePaso = () => {
    if (paso < 5) setPaso(paso + 1);
    else if (paso === 5) {
      reducirCupos(horarioSeleccionado, cantidadPersonas);
      setInscripcionCompletada(true);
    }
  };

  const pasoAnterior = () => {
    if (paso > 1) {
      setPaso(paso - 1);
      if (paso === 3) setCantidadPersonas(1);
    }
  };

  const reiniciarFormulario = () => {
    setActividadSeleccionada(null);
    setHorarioSeleccionado(null);
    setCantidadPersonas(1);
    setParticipantes([{ nombre: '', dni: '', edad: '', talla: 'M' }]);
    setAceptaTerminos(false);
    setInscripcionCompletada(false);
    setPaso(1);
  };

  const reducirCupos = (horario, cantidad) => {
    const copia = actividades.map(act => {
      if (act.id !== actividadSeleccionada.id) return act;
      return {
        ...act,
        horarios: act.horarios.map(h =>
          h.id === horario.id ? { ...h, cupos: h.cupos - cantidad } : h
        )
      };
    });
    setActividades(copia);
  };

  return (
    <>
      {inscripcionCompletada ? (
        <Confirmacion reiniciarFormulario={reiniciarFormulario}
          actividadSeleccionada={actividadSeleccionada}
          cantidadPersonas={cantidadPersonas}
          horarioSeleccionado={horarioSeleccionado} />
      ) : (
        <div className="min-h-screen bg-mossgreen flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold text-huntergreen">Inscripción a Actividades</h1>
            </div>
          </header>
          <main className="flex-grow">
            <div className="max-w-4xl mx-auto px-4 py-8">
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

                {paso === 1 && (
                  <Paso1SeleccionActividad
                    actividadesDisponibles={actividadesDisponibles}
                    actividadSeleccionada={actividadSeleccionada}
                    setActividadSeleccionada={setActividadSeleccionada}
                  />
                )}
                {paso === 2 && actividadSeleccionada && (
                  <Paso2SeleccionHorario
                    actividadSeleccionada={actividadSeleccionada}
                    horarioSeleccionado={horarioSeleccionado}
                    setHorarioSeleccionado={setHorarioSeleccionado}
                  />
                )}
                {paso === 3 && horarioSeleccionado && (
                  <Paso3CantidadPersonas
                    cantidadPersonas={cantidadPersonas}
                    setCantidadPersonas={setCantidadPersonas}
                    cuposDisponibles={horarioSeleccionado.cupos}
                  />
                )}
                {paso === 4 && (
                  <Paso4FormularioParticipantes
                    participantes={participantes}
                    actualizarParticipante={actualizarParticipante}
                    requiereTalla={actividadSeleccionada?.requiereTalla}
                    opcionesTallas={opcionesTallas}
                  />
                )}
                {paso === 5 && (
                  <Paso5Terminos
                    actividadSeleccionada={actividadSeleccionada}
                    aceptaTerminos={aceptaTerminos}
                    setAceptaTerminos={setAceptaTerminos}
                  />
                )}
                {/* Botones de navegación */}
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={pasoAnterior}
                    disabled={paso === 1}
                    className={`px-4 py-2 rounded-md ${paso === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer'
                      }`}
                  >
                    Atrás
                  </button>

                  <button
                    onClick={siguientePaso}
                    disabled={!puedeAvanzar()}
                    className={`px-4 py-2 rounded-md ${puedeAvanzar()
                      ? 'bg-ferngreen hover:bg-green-700 text-white cursor-pointer'
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
      )}
    </>
  );
}
