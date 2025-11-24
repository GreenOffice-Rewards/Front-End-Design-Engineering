import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { authService, type Company } from '../services/api'

const EmpresaDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [empresa, setEmpresa] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmpresa = async () => {
      if (!id) {
        setError('ID da empresa não fornecido')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const empresaEncontrada = await authService.getEmpresaById(id)
        
        if (!empresaEncontrada) {
          setError('Empresa não encontrada')
        } else {
          setEmpresa(empresaEncontrada)
        }
      } catch (err) {
        setError('Erro ao carregar dados da empresa')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEmpresa()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando dados da empresa...</p>
        </div>
      </div>
    )
  }

  if (error || !empresa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {error || 'Empresa não encontrada'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            A empresa que você está procurando não existe ou foi removida.
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
            Detalhes da Empresa
          </h1>
        </div>

        {/* Card da Empresa */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-4xl">🏢</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {empresa.nome}
              </h2>
              <span className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                EMPRESA
              </span>
            </div>
          </div>

          {/* Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">ID</label>
              <p className="text-lg text-gray-900 dark:text-white font-mono">{empresa.id}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">CNPJ</label>
              <p className="text-lg text-gray-900 dark:text-white">{empresa.cnpj}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Email</label>
              <p className="text-lg text-gray-900 dark:text-white">{empresa.email}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Telefone</label>
              <p className="text-lg text-gray-900 dark:text-white">{empresa.telefone}</p>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Endereço</label>
              <p className="text-lg text-gray-900 dark:text-white">{empresa.endereco}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Plano</label>
              <p className="text-lg text-gray-900 dark:text-white">
                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-semibold">
                  {empresa.plano}
                </span>
              </p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Código de Convite</label>
              <p className="text-lg text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
                {empresa.codigoConvite}
              </p>
            </div>
          </div>

          {/* Estatísticas (mock data para demonstração) */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Estatísticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Colaboradores</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">25</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">CO₂ Economizado</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">450 kg</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Créditos Verdes</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,250</p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex space-x-4">
            <Link
              to="/company/dashboard"
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

export default EmpresaDetalhes
