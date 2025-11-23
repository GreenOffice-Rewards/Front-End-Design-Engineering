import React, { useState } from 'react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulação de envio para API - substituir pela integração real
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Dados do formulário:', formData)
      
      // Reset do formulário após envio
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      })
      
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve. 🌱')
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      alert('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pronto para transformar sustentabilidade em vantagem competitiva?
            Entre em contato conosco e descubra como o EcoWork pode ajudar sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informações de Contato */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      contato@ecowork.com
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Respondemos em até 24h
                    </p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Telefone
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +55 (11) 99999-9999
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Segunda a Sexta, 9h-18h
                    </p>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Escritório
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Av. Paulista, 1106 - São Paulo, SP
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Agende uma visita
                    </p>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      LinkedIn
                    </h3>
                    <a 
                      href="https://linkedin.com/company/ecowork"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      @ecowork
                    </a>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Siga-nos para novidades
                    </p>
                  </div>
                </div>
              </div>

              {/* Horário de Atendimento */}
              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  ⏰ Horário de Atendimento
                </h3>
                <div className="text-green-700 dark:text-green-400 text-sm">
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p className="mt-1">Sábado: 9h às 12h (apenas online)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Envie sua Mensagem
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Empresa */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Nome da sua empresa"
                    />
                  </div>

                  {/* Assunto */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="demo">Agendar Demonstração</option>
                      <option value="comercial">Informações Comerciais</option>
                      <option value="suporte">Suporte Técnico</option>
                      <option value="parceria">Proposta de Parceria</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Mensagem */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                    placeholder="Conte-nos como podemos ajudar sua empresa a ser mais sustentável..."
                  />
                </div>

                {/* Botão de Envio */}
                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    * Campos obrigatórios
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>📨</span>
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Informações Adicionais */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                  Resposta Rápida
                </h3>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  Respondemos em até 24h durante dias úteis
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                  Atendimento Personalizado
                </h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Soluções customizadas para sua empresa
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">🆓</div>
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                  Demonstração Grátis
                </h3>
                <p className="text-purple-700 dark:text-purple-400 text-sm">
                  Teste nossa plataforma sem compromisso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact