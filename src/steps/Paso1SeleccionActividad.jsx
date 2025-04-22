import React from 'react'

const Paso1SeleccionActividad = ({
  actividadesDisponibles,
  actividadSeleccionada,
  setActividadSeleccionada }) => {
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
  )
}

export default Paso1SeleccionActividad