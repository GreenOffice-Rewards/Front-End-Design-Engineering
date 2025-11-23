import React, { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqItems: FAQItem[] = [
    {
      question: "Como é calculada a redução de emissões?",
      answer: "Utilizamos algoritmos baseados em dados da EPA e IPCC, considerando distância de deslocamento, tipo de transporte, e fatores regionais para calcular as emissões de CO₂ evitadas."
    },
    {
      question: "Quais tipos de benefícios podem ser resgatados?",
      answer: "Oferecemos diversos benefícios como vale-presente sustentáveis, doações para ONGs ambientais, produtos ecológicos, cursos de sustentabilidade, e experiências verdes."
    },
    {
      question: "Como faço para implementar na minha empresa?",
      answer: "O processo é simples: cadastro da empresa, configuração do programa, integração com sistemas existentes (opcional), e treinamento da equipe. Oferecemos suporte completo durante a implementação."
    },
    {
      question: "Os dados dos colaboradores são seguros?",
      answer: "Sim, seguimos as melhores práticas de segurança e conformidade com LGPD. Todos os dados são criptografados e armazenados com protocolos de segurança enterprise."
    },
    {
      question: "Qual o custo para implementar?",
      answer: "Oferecemos planos flexíveis baseados no número de colaboradores. Temos opções desde startups até grandes corporações, com período de teste gratuito."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tire suas dúvidas sobre o EcoWork
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.question}
                </span>
                <span className={`transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Não encontrou o que procurava?
          </p>
          <a 
            href="/contact"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
          >
            Entre em Contato
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ