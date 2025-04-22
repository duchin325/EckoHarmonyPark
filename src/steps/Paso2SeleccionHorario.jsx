import React from 'react'

const Paso2SeleccionHorario = ({
  actividadSeleccionada,
  horarioSeleccionado,
  setHorarioSeleccionado }) => {
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
  )
}

export default Paso2SeleccionHorario