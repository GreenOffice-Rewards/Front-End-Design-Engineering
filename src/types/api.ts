// Serviço para integração com a API Java
const API_BASE_URL = 'https://sua-api-java.aplicacao.com'

export const api = {
  async registerHomeOffice(userId: string, data: any) {
    // Implementação da chamada POST para a API
    const response = await fetch(`${API_BASE_URL}/home-office`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...data })
    })
    return response.json()
  },

  async getUserStats(userId: string) {
    // Implementação da chamada GET para a API
    const response = await fetch(`${API_BASE_URL}/users/${userId}/stats`)
    return response.json()
  },

  async getBenefits() {
    const response = await fetch(`${API_BASE_URL}/benefits`)
    return response.json()
  }
}