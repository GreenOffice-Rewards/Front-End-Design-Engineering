import React from 'react'

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre o <span className="text-green-600">EcoWork</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Conectando sustentabilidade, tecnologia e engajamento
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-4">
              Nossa Missão
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Transformar o trabalho remoto em uma ferramenta mensurável de sustentabilidade corporativa, 
              criando valor tanto para o meio ambiente quanto para as empresas e seus colaboradores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                O Problema
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Empresas não medem o impacto positivo do trabalho remoto</li>
                <li>• Falta de métricas tangíveis para programas de ESG</li>
                <li>• Dificuldade em engajar colaboradores em sustentabilidade</li>
                <li>• Benefícios corporativos não alinhados com valores ambientais</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Nossa Solução
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Calculadora inteligente de emissões evitadas</li>
                <li>• Sistema de créditos verdes gamificado</li>
                <li>• Plataforma de recompensas sustentáveis</li>
                <li>• Relatórios automáticos de impacto ambiental</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About