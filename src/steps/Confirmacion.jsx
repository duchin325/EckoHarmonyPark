import React from 'react'

const Confirmacion = ({
  reiniciarFormulario,
  actividadSeleccionada,
  cantidadPersonas,
  horarioSeleccionado }) => {
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
  )
}

export default Confirmacion