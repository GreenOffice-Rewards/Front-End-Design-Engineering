import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const RegisterCompany: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    email: '',
    password: '',
    confirmPassword: '',
    plan: 'basic' as 'basic' | 'premium' | 'enterprise'
  })
  const [error, setError] = useState('')
  const { registerCompany, isLoading } = useAuth()
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

    const success = await registerCompany(formData)
    if (success) {
      navigate('/company/dashboard')
    } else {
      setError('Erro ao criar conta. Tente novamente.')
    }
  }

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 'R$ 299/mês',
      description: 'Para pequenas empresas',
      features: ['Até 50 colaboradores', 'Dashboard básico', 'Relatórios mensais']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 599/mês',
      description: 'Para empresas em crescimento',
      features: ['Até 200 colaboradores', 'Dashboard avançado', 'Relatórios semanais', 'Suporte prioritário']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Sob consulta',
      description: 'Para grandes corporações',
      features: ['Colaboradores ilimitados', 'Dashboard customizado', 'Relatórios em tempo real', 'Suporte dedicado', 'API personalizada']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
            Cadastro de Empresa
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Crie sua conta e comece a transformar o trabalho remoto da sua empresa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                  <p className="text-red-800 dark:text-red-200 text-sm text-center">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="Sua empresa Ltda"
                />
              </div>

              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CNPJ *
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  required
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="00.000.000/0000-00"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email corporativo *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="contato@empresa.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label htmlFor="plan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plano Escolhido *
                </label>
                <select
                  id="plan"
                  name="plan"
                  required
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                >
                  {plans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - {plan.price}
                    </option>
                  ))}
                </select>
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
                  'Criar Conta Empresarial'
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

          {/* Planos */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Escolha o plano ideal
              </h3>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      formData.plan === plan.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, plan: plan.id as any }))}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{plan.name}</h4>
                      <span className="text-green-600 dark:text-green-400 font-bold">{plan.price}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{plan.description}</p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefícios */}
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">
                🎯 O que sua empresa ganha:
              </h4>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                <li>• Relatórios de sustentabilidade mensuráveis</li>
                <li>• Engajamento de colaboradores</li>
                <li>• Redução real de emissões de carbono</li>
                <li>• Selo de empresa sustentável</li>
                <li>• Atração e retenção de talentos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterCompany