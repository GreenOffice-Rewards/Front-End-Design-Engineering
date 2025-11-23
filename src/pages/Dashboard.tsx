import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CarbonCredit } from '../types'

const Dashboard: React.FC = () => {
  const [homeOfficeDays, setHomeOfficeDays] = useState<number>(12)
  const [totalCO2, setTotalCO2] = useState<number>(45.6)
  const [totalCredits, setTotalCredits] = useState<number>(150)
  const [history, setHistory] = useState<CarbonData[]>([])
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  interface CarbonData {
    date: string
    co2Saved: number
    creditsEarned: number
    transportation: string
  }

  interface WeeklyStat {
    week: string
    days: number
    co2: number
    credits: number
  }

  // Simulação de dados da API
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockHistory: CarbonData[] = [
        { date: '2025-01-20', co2Saved: 3.8, creditsEarned: 10, transportation: 'Carro' },
        { date: '2025-01-19', co2Saved: 2.1, creditsEarned: 8, transportation: 'Metrô' },
        { date: '2025-01-18', co2Saved: 3.8, creditsEarned: 10, transportation: 'Carro' },
        { date: '2025-01-15', co2Saved: 1.5, creditsEarned: 6, transportation: 'Ônibus' },
        { date: '2025-01-14', co2Saved: 3.8, creditsEarned: 10, transportation: 'Carro' },
        { date: '2025-01-11', co2Saved: 2.1, creditsEarned: 8, transportation: 'Metrô' },
        { date: '2025-01-10', co2Saved: 3.8, creditsEarned: 10, transportation: 'Carro' },
      ]

      const mockWeeklyStats: WeeklyStat[] = [
        { week: '16-22 Jan', days: 4, co2: 13.4, credits: 34 },
        { week: '9-15 Jan', days: 3, co2: 9.2, credits: 24 },
        { week: '2-8 Jan', days: 5, co2: 16.8, credits: 42 },
      ]

      setHistory(mockHistory)
      setWeeklyStats(mockWeeklyStats)
      setIsLoading(false)
    }

    loadDashboardData()
  }, [])

  const registerHomeOffice = async () => {
    // Simular chamada API
    const newDay: CarbonData = {
      date: new Date().toISOString().split('T')[0],
      co2Saved: 3.8,
      creditsEarned: 10,
      transportation: 'Carro'
    }

    setHomeOfficeDays(prev => prev + 1)
    setTotalCO2(prev => prev + newDay.co2Saved)
    setTotalCredits(prev => prev + newDay.creditsEarned)
    setHistory(prev => [newDay, ...prev])

    alert('✅ Dia de home office registrado com sucesso! +10 créditos verdes 🎉')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando seu dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard EcoWork
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Acompanhe seu impacto ambiental e gerencie seus créditos verdes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl">🏠</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Dias Home Office</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{homeOfficeDays}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">CO₂ Evitado (kg)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCO2.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl">⭐</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Créditos Verdes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCredits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl">📈</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Ranking Empresa</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">#3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Registrar Home Office
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Registre seu dia de trabalho remoto e contribua para um planeta mais verde.
            </p>
            <button
              onClick={registerHomeOffice}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              ✅ Registrar Hoje +10 Créditos
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Resgatar Benefícios
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Use seus créditos verdes para resgatar benefícios sustentáveis.
            </p>
            <Link 
              to="/benefits"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 hover:scale-105 transition-all duration-300 shadow-lg text-center block"
            >
              🎁 Ver Catálogo de Benefícios
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Histórico Recente */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Histórico Recente
            </h2>
            <div className="space-y-4">
              {history.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400">🌿</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{formatDate(item.date)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.transportation}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">+{item.creditsEarned}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.co2Saved} kg CO₂</p>
                  </div>
                </div>
              ))}
            </div>
            {history.length > 5 && (
              <button className="w-full mt-4 text-green-600 dark:text-green-400 font-semibold py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                Ver histórico completo
              </button>
            )}
          </div>

          {/* Estatísticas Semanais */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Desempenho Semanal
            </h2>
            <div className="space-y-4">
              {weeklyStats.map((stat, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{stat.week}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{stat.days} dias</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">{stat.co2} kg CO₂ evitado</span>
                    <span className="text-yellow-600 dark:text-yellow-400">+{stat.credits} créditos</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                      style={{ width: `${(stat.days / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metas e Conquistas */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🏆 Suas Conquistas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-2xl mb-2">🌱</div>
              <p className="font-semibold text-green-700 dark:text-green-300">Iniciante Verde</p>
              <p className="text-sm text-green-600 dark:text-green-400">10+ dias</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl mb-2">💼</div>
              <p className="font-semibold text-blue-700 dark:text-blue-300">Home Office Pro</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">25+ dias</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl opacity-50">
              <div className="text-2xl mb-2">🌍</div>
              <p className="font-semibold text-purple-700 dark:text-purple-300">Herói Climático</p>
              <p className="text-sm text-purple-600 dark:text-purple-400">50+ dias</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl opacity-50">
              <div className="text-2xl mb-2">⭐</div>
              <p className="font-semibold text-yellow-700 dark:text-yellow-300">Lenda Sustentável</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">100+ dias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard