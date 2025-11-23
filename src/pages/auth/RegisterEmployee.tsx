import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const RegisterEmployee: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
    transportation: 'carro',
    distance: 10
  })
  const [error, setError] = useState('')
  const { registerEmployee, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    const success = await registerEmployee(formData)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Código de convite inválido ou erro ao criar conta.')
    }
  }

  const transportationOptions = [
    { value: 'carro', label: 'Carro', emoji: '🚗', co2PerKm: 0.21 },
    { value: 'moto', label: 'Moto', emoji: '🏍️', co2PerKm: 0.11 },
    { value: 'onibus', label: 'Ônibus', emoji: '🚌', co2PerKm: 0.08 },
    { value: 'metro', label: 'Metrô', emoji: '🚇', co2PerKm: 0.05 },
    { value: 'bicicleta', label: 'Bicicleta', emoji: '🚲', co2PerKm: 0 },
    { value: 'pe', label: 'A pé', emoji: '🚶', co2PerKm: 0 }
  ]

  const selectedTransport = transportationOptions.find(t => t.value === formData.transportation)
  const dailyCO2 = (selectedTransport?.co2PerKm || 0) * formData.distance * 2 // Ida e volta

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌿</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">EcoWork</h2>
              <p className="text-green-600 dark:text-green-400 text-sm -mt-1">Rewards</p>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Cadastro de Colaborador
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Junte-se à sua empresa e comece a ganhar créditos verdes
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-red-800 dark:text-red-200 text-sm text-center">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Senha *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Digite novamente"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Código de Convite da Empresa *
              </label>
              <input
                type="text"
                id="inviteCode"
                name="inviteCode"
                required
                value={formData.inviteCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Digite o código fornecido pela empresa"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                💡 Dica de teste: Use <strong>ECOWORK2025</strong>
              </p>
            </div>

            {/* Perfil de Deslocamento */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🚗 Seu Perfil de Deslocamento
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Estas informações ajudam a calcular seu impacto ambiental
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="transportation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meio de Transporte
                  </label>
                  <select
                    id="transportation"
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  >
                    {transportationOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.emoji} {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="distance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Distância (km) - Ida
                  </label>
                  <input
                    type="number"
                    id="distance"
                    name="distance"
                    min="1"
                    max="100"
                    value={formData.distance}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Calculadora */}
              {selectedTransport && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl mt-4">
                  <p className="text-green-800 dark:text-green-300 text-sm">
                    💡 Cada dia de home office você evita aproximadamente{' '}
                    <strong>{dailyCO2.toFixed(2)} kg de CO₂</strong> e ganha{' '}
                    <strong>{(dailyCO2 * 2.5).toFixed(0)} créditos</strong>
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Criando conta...
                </>
              ) : (
                'Criar Minha Conta'
              )}
            </button>

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-green-600 dark:text-green-400 hover:text-green-500 font-semibold">
                Fazer login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterEmployee