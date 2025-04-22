import React from 'react'

const Paso5Terminos = ({
  actividadSeleccionada,
  aceptaTerminos,
  setAceptaTerminos }
) => {
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
  )
}

export default Paso5Terminos