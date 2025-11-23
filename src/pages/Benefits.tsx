import React, { useState, useEffect } from 'react'
import { Benefit } from '../types'

const Benefits: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [filteredBenefits, setFilteredBenefits] = useState<Benefit[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [userCredits, setUserCredits] = useState<number>(150) // Créditos do usuário
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null)

  // Mock data - substituir por API real
  useEffect(() => {
    const mockBenefits: Benefit[] = [
      {
        id: '1',
        name: 'Vale Presente Sustentável',
        description: 'R$ 50 em vale-presente para lojas ecológicas e sustentáveis',
        cost: 100,
        category: 'vouchers',
        image: '🎁',
        featured: true,
        tags: ['popular', 'sustentável']
      },
      {
        id: '2',
        name: 'Doação para ONG Ambiental',
        description: 'Faça uma doação em seu nome para uma organização de proteção ambiental',
        cost: 50,
        category: 'doacoes',
        image: '🌳',
        tags: ['impacto', 'social']
      },
      {
        id: '3',
        name: 'Kit Produtos Ecológicos',
        description: 'Kit com produtos sustentáveis para o dia a dia',
        cost: 120,
        category: 'produtos',
        image: '🛍️',
        tags: ['produto', 'ecológico']
      },
      {
        id: '4',
        name: 'Curso de Sustentabilidade',
        description: 'Acesso a curso online sobre práticas sustentáveis',
        cost: 80,
        category: 'educacao',
        image: '📚',
        tags: ['aprendizado', 'digital']
      },
      {
        id: '5',
        name: 'Experiência na Natureza',
        description: 'Passeio em parque nacional ou reserva ambiental',
        cost: 200,
        category: 'experiencias',
        image: '🏞️',
        featured: true,
        tags: ['experiência', 'natureza']
      },
      {
        id: '6',
        name: 'Assinatura Revista Verde',
        description: 'Assinatura digital de revista sobre sustentabilidade',
        cost: 60,
        category: 'assinaturas',
        image: '📰',
        tags: ['conhecimento', 'digital']
      },
      {
        id: '7',
        name: 'Plantio de Árvores',
        description: 'Plantio de 5 árvores em seu nome em área de reflorestamento',
        cost: 75,
        category: 'doacoes',
        image: '🌱',
        tags: ['reflorestamento', 'impacto']
      },
      {
        id: '8',
        name: 'Eco Kit Office',
        description: 'Kit com itens sustentáveis para home office',
        cost: 150,
        category: 'produtos',
        image: '💻',
        tags: ['home office', 'produto']
      }
    ]

    setBenefits(mockBenefits)
    setFilteredBenefits(mockBenefits)
  }, [])

  const categories = [
    { id: 'all', name: 'Todos', emoji: '🌟' },
    { id: 'vouchers', name: 'Vales', emoji: '🎫' },
    { id: 'doacoes', name: 'Doações', emoji: '❤️' },
    { id: 'produtos', name: 'Produtos', emoji: '🛍️' },
    { id: 'educacao', name: 'Educação', emoji: '📚' },
    { id: 'experiencias', name: 'Experiências', emoji: '🎯' },
    { id: 'assinaturas', name: 'Assinaturas', emoji: '📱' }
  ]

  const filterBenefits = (category: string) => {
    setSelectedCategory(category)
    if (category === 'all') {
      setFilteredBenefits(benefits)
    } else {
      setFilteredBenefits(benefits.filter(benefit => benefit.category === category))
    }
  }

  const handleRedeem = (benefit: Benefit) => {
    if (userCredits >= benefit.cost) {
      setSelectedBenefit(benefit)
    } else {
      alert('Créditos insuficientes! Continue acumulando créditos com dias de home office.')
    }
  }

  const confirmRedeem = () => {
    if (selectedBenefit) {
      setUserCredits(prev => prev - selectedBenefit.cost)
      alert(`🎉 Parabéns! Você resgatou: ${selectedBenefit.name}\n\nSeu benefício será processado em até 48h.`)
      setSelectedBenefit(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">🎁</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resgate de Benefícios
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Troque seus créditos verdes por recompensas sustentáveis e faça ainda mais diferença
          </p>
        </div>

        {/* Saldo de Créditos */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-green-200 dark:border-green-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Seus Créditos Verdes
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Acumule mais créditos registrando dias de home office
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-center">
              <div className="text-3xl md:text-4xl font-bold">{userCredits}</div>
              <div className="text-green-100 text-sm">créditos disponíveis</div>
            </div>
          </div>
        </div>

        {/* Filtros de Categoria */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Categorias
          </h3>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => filterBenefits(category.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <span>{category.emoji}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredBenefits.map(benefit => (
            <div
              key={benefit.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                benefit.featured 
                  ? 'border-yellow-400 dark:border-yellow-500 ring-2 ring-yellow-400/20' 
                  : 'border-gray-200 dark:border-gray-700'
              } ${userCredits >= benefit.cost ? 'hover:scale-105' : 'opacity-75'}`}
            >
              {/* Badge Destaque */}
              {benefit.featured && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}

              <div className="p-6">
                {/* Ícone/Imagem */}
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-800 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">{benefit.image}</span>
                </div>

                {/* Nome e Descrição */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                  {benefit.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-4 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {benefit.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Preço e Botão */}
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {benefit.cost}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      créditos
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRedeem(benefit)}
                    disabled={userCredits < benefit.cost}
                    className={`flex-1 ml-4 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      userCredits >= benefit.cost
                        ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {userCredits >= benefit.cost ? 'Resgatar' : 'Créditos Insuficientes'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Como Funciona */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Como Funciona o Resgate?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🏠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                1. Trabalhe de Casa
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Registre seus dias de home office e acumule créditos verdes
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                2. Acumule Créditos
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cada dia de home office gera créditos baseados na distância evitada
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🎁</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                3. Resgate Prêmios
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Troque seus créditos por benefícios sustentáveis incríveis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{selectedBenefit.image}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Confirmar Resgate
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Você está prestes a resgatar:
              </p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400 my-2">
                {selectedBenefit.name}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                por <span className="font-bold">{selectedBenefit.cost} créditos</span>
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm text-center">
                ⚠️ Após a confirmação, os créditos serão debitados e não poderão ser devolvidos.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedBenefit(null)}
                className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRedeem}
                className="flex-1 py-3 px-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                Confirmar Resgate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Benefits