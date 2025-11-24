import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/api'
import type { User } from '../services/api'

const UsuarioDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!id) {
        setError('ID do usuário não fornecido')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const usuarioEncontrado = await authService.getUsuarioById(id)
        
        if (!usuarioEncontrado) {
          setError('Usuário não encontrado')
        } else {
          setUsuario(usuarioEncontrado)
        }
      } catch (err) {
        setError('Erro ao carregar dados do usuário')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsuario()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando dados do usuário...</p>
        </div>
      </div>
    )
  }

  if (error || !usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {error || 'Usuário não encontrado'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            O usuário que você está procurando não existe ou foi removido.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center space-x-2 mb-4"
          >
            <span>←</span>
            <span>Voltar</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Detalhes do Usuário
          </h1>
        </div>

        {/* Card do Usuário */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <span className="text-4xl">
                {usuario.tipo === 'EMPRESA' ? '🏢' : '👤'}
              </span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {usuario.nome}
              </h2>
              <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                usuario.tipo === 'EMPRESA' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {usuario.tipo}
              </span>
            </div>
          </div>

          {/* Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">ID</label>
              <p className="text-lg text-gray-900 dark:text-white font-mono">{usuario.id}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Email</label>
              <p className="text-lg text-gray-900 dark:text-white">{usuario.email}</p>
            </div>

            {usuario.tipo === 'EMPRESA' && usuario.cnpj && (
              <div>
                <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">CNPJ</label>
                <p className="text-lg text-gray-900 dark:text-white">{usuario.cnpj}</p>
              </div>
            )}

            {usuario.telefone && (
              <div>
                <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Telefone</label>
                <p className="text-lg text-gray-900 dark:text-white">{usuario.telefone}</p>
              </div>
            )}

            {usuario.endereco && (
              <div>
                <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Endereço</label>
                <p className="text-lg text-gray-900 dark:text-white">{usuario.endereco}</p>
              </div>
            )}

            {usuario.empresaId && (
              <div>
                <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Empresa ID</label>
                <p className="text-lg text-gray-900 dark:text-white">{usuario.empresaId}</p>
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex space-x-4">
            <Link
              to="/dashboard"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Ir para Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsuarioDetalhes
