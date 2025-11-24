import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

interface Employee {
  id: string
  name: string
  email: string
  homeOfficeDays: number
  totalCredits: number
  co2Saved: number
  status: 'active' | 'inactive'
}

interface CompanyStats {
  totalEmployees: number
  activeEmployees: number
  totalCO2Saved: number
  totalCredits: number
  companyRank: number
}

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [stats, setStats] = useState<CompanyStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    totalCO2Saved: 0,
    totalCredits: 0,
    companyRank: 1
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCompanyData = async () => {
      setIsLoading(true)
      
      // Simular carregamento de dados
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockEmployees: Employee[] = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao@empresa.com',
          homeOfficeDays: 15,
          totalCredits: 150,
          co2Saved: 57.0,
          status: 'active'
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria@empresa.com',
          homeOfficeDays: 12,
          totalCredits: 120,
          co2Saved: 45.6,
          status: 'active'
        },
        {
          id: '3',
          name: 'Pedro Costa',
          email: 'pedro@empresa.com',
          homeOfficeDays: 8,
          totalCredits: 80,
          co2Saved: 30.4,
          status: 'active'
        },
        {
          id: '4',
          name: 'Ana Oliveira',
          email: 'ana@empresa.com',
          homeOfficeDays: 5,
          totalCredits: 50,
          co2Saved: 19.0,
          status: 'active'
        }
      ]

      const mockStats: CompanyStats = {
        totalEmployees: mockEmployees.length,
        activeEmployees: mockEmployees.filter(e => e.status === 'active').length,
        totalCO2Saved: mockEmployees.reduce((sum, emp) => sum + emp.co2Saved, 0),
        totalCredits: mockEmployees.reduce((sum, emp) => sum + emp.totalCredits, 0),
        companyRank: 3
      }

      setEmployees(mockEmployees)
      setStats(mockStats)
      setIsLoading(false)
    }

    loadCompanyData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Dashboard Empresarial
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Bem-vindo(a), {user?.name} • Gerencie sua equipe e impacto ambiental
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                disabled
                title="Função em breve disponível"
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors opacity-50 cursor-not-allowed"
              >
                📧 Convidar Colaboradores
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Colaboradores</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalEmployees}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">CO₂ Evitado (kg)</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCO2Saved.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl">⭐</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Créditos Gerados</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCredits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Ranking Empresas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">#{stats.companyRank}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Colaboradores */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Colaboradores
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stats.activeEmployees} ativos
                </span>
              </div>

              <div className="space-y-4">
                {employees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">👤</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{employee.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">{employee.homeOfficeDays} dias</p>
                      <p className="text-sm text-green-600 dark:text-green-400">{employee.co2Saved} kg CO₂</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-green-600 dark:text-green-400 font-semibold py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
                Ver todos os colaboradores
              </button>
            </div>
          </div>

          {/* Ações Rápidas e Relatórios */}
          <div className="space-y-6">
            {/* Ações Rápidas */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Ações Rápidas
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">📊 Gerar Relatório</span>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Relatório mensal de sustentabilidade</p>
                </button>
                
                <button 
                  disabled
                  title="Função em breve disponível"
                  className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 rounded-xl transition-colors opacity-50 cursor-not-allowed"
                >
                  <span className="font-semibold text-green-700 dark:text-green-300">👥 Convidar Time</span>
                  <p className="text-sm text-green-600 dark:text-green-400">Adicionar novos colaboradores</p>
                </button>
                
                <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  <span className="font-semibold text-purple-700 dark:text-purple-300">⚙️ Configurações</span>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Personalizar benefícios</p>
                </button>
              </div>
            </div>

            {/* Próximas Metas */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Próximas Metas
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">100kg CO₂ evitados</span>
                    <span className="text-green-600 dark:text-green-400">{(stats.totalCO2Saved/100*100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min((stats.totalCO2Saved/100*100), 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-300">10 colaboradores ativos</span>
                    <span className="text-blue-600 dark:text-blue-400">{(stats.activeEmployees/10*100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${Math.min((stats.activeEmployees/10*100), 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard