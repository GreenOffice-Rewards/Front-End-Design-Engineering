import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const APIDebug: React.FC = () => {
  const { apiHealth, apiEndpoints, user } = useAuth()

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg text-xs max-w-xs">
      <div className="font-bold mb-2">🔧 Debug API</div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span>Status API:</span>
          <span className={apiHealth ? 'text-green-400' : 'text-red-400'}>
            {apiHealth ? '✅ Online' : '❌ Offline'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Endpoint /usuarios:</span>
          <span className={apiEndpoints.usuarios ? 'text-green-400' : 'text-red-400'}>
            {apiEndpoints.usuarios ? '✅' : '❌'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Endpoint /empresas:</span>
          <span className={apiEndpoints.empresas ? 'text-green-400' : 'text-red-400'}>
            {apiEndpoints.empresas ? '✅' : '❌'}
          </span>
        </div>
        
        {user && (
          <div className="pt-2 border-t border-gray-600">
            <div className="truncate">Usuário: {user.name}</div>
            <div className="text-gray-400">Tipo: {user.type}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default APIDebug