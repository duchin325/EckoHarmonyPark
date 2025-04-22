import React from 'react'

const Paso3CantidadPersonas = ({
  cantidadPersonas,
  setCantidadPersonas,
  cuposDisponibles,
}) => {
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
          onClick={() => cantidadPersonas < cuposDisponibles && setCantidadPersonas(cantidadPersonas + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-800 font-bold text-xl"
          disabled={cantidadPersonas >= cuposDisponibles}
        >
          +
        </button>
      </div>
      <p className="text-center text-sm text-gray-500">
        Máximo {cuposDisponibles} personas
      </p>
    </div>
  )
}

export default Paso3CantidadPersonas