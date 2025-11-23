import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 shadow-2xl">
                <span className="text-4xl">🌿</span>
              </div>
              <div className="mt-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  EcoWork
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto rounded-full"></div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Trabalho Remoto
              </span>
              <br />
              <span className="text-3xl md:text-5xl font-light">
                que transforma o
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Planeta
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Transforme dias de home office em créditos de carbono e benefícios sustentáveis. 
              Engaje sua equipe enquanto constrói um futuro mais verde.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl inline-flex items-center space-x-3"
              >
                <span>🚀</span>
                <span>Começar Agora</span>
              </Link>
              <Link
                to="/about"
                className="border-2 border-green-600 text-green-600 dark:text-green-400 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-600 hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
              >
                <span>📖</span>
                <span>Como Funciona</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Como o <span className="text-green-600">EcoWork</span> Funciona
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Três passos simples para transformar trabalho remoto em impacto ambiental positivo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl text-white">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Registro Fácil
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Colaboradores registram dias de home office em segundos através do app ou web
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl text-white">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Cálculo Automático
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Calculamos automaticamente o CO₂ evitado baseado no perfil de deslocamento
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl text-white">🎁</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Recompensas Verdes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Créditos são trocados por benefícios sustentáveis e recompensas exclusivas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Impacto <span className="text-green-600">EcoWork</span> em Números
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Juntos estamos fazendo a diferença
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {/* Stat 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">2.5k+</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">kg de CO₂ Evitados</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Equivale a 100+ árvores</div>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">850+</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dias de Home Office</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Registrados na plataforma</div>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300">42+</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Empresas Parceiras</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Transformando operações</div>
            </div>
            
            {/* Stat 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-3 group-hover:scale-110 transition-transform duration-300">1.2k+</div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Benefícios Entregues</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Recompensas sustentáveis</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Junte-se às dezenas de empresas que já estão transformando trabalho remoto em impacto ambiental positivo com o EcoWork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-600 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl inline-flex items-center space-x-3"
            >
              <span>💼</span>
              <span>Para Empresas</span>
            </Link>
            <Link
              to="/dashboard"
              className="border-2 border-white text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-green-600 hover:scale-105 transition-all duration-300 inline-flex items-center space-x-3"
            >
              <span>👤</span>
              <span>Para Colaboradores</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home