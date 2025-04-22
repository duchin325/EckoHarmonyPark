import React from 'react'

const Paso4FormularioParticipantes = ({
  participantes,
  actualizarParticipante,
  requiereTalla,
  opcionesTallas }) => {
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
                type="text"
                value={participante.edad}
                onChange={(e) => actualizarParticipante(index, 'edad', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="25"
              />
            </div>

            {requiereTalla && (
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
  )
}

export default Paso4FormularioParticipantes