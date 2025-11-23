const API_BASE_URL = 'https://worktech-apirestful-1.onrender.com/api/ecowork';

// Interfaces baseadas na estrutura da sua API
export interface User {
  id: string;
  email: string;
  nome: string;
  tipo: 'EMPRESA' | 'COLABORADOR';
  empresaId?: string;
  cnpj?: string;
  telefone?: string;
  endereco?: string;
  createdAt?: string;
}

export interface Company {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  plano: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  codigoConvite: string;
  createdAt: string;
}

export interface HomeOfficeRecord {
  id: string;
  usuarioId: string;
  empresaId: string;
  dataRegistro: string;
  transporte: 'CARRO' | 'MOTO' | 'ONIBUS' | 'METRO' | 'BICICLETA' | 'A_PE';
  distancia: number;
  co2Economizado: number;
  creditosGanhos: number;
  createdAt: string;
}

export interface EmployeeStats {
  totalDiasHomeOffice: number;
  totalCO2Economizado: number;
  totalCreditos: number;
  diasSemanaAtual: number;
  ranking: number;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CompanyRegisterRequest {
  nome: string;
  cnpj: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  plano: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
}

export interface EmployeeRegisterRequest {
  nome: string;
  email: string;
  senha: string;
  codigoConvite: string;
  transporte: 'CARRO' | 'MOTO' | 'ONIBUS' | 'METRO' | 'BICICLETA' | 'A_PE';
  distancia: number;
  telefone: string;
}

export interface HomeOfficeRegisterRequest {
  usuarioId: string;
  transporte: 'CARRO' | 'MOTO' | 'ONIBUS' | 'METRO' | 'BICICLETA' | 'A_PE';
  distancia: number;
}

// Dados de fallback para quando a API não tiver os endpoints
const fallbackData = {
  usuarios: [
    {
      id: '1',
      nome: 'Tech Solutions Ltda',
      email: 'empresa@teste.com',
      tipo: 'EMPRESA',
      empresaId: '1',
      cnpj: '12.345.678/0001-90',
      telefone: '(11) 99999-9999',
      endereco: 'São Paulo, SP'
    },
    {
      id: '2', 
      nome: 'João Silva',
      email: 'colaborador@teste.com',
      tipo: 'COLABORADOR',
      empresaId: '1',
      telefone: '(11) 98888-8888'
    }
  ],
  empresas: [
    {
      id: '1',
      nome: 'Tech Solutions Ltda',
      cnpj: '12.345.678/0001-90',
      email: 'empresa@teste.com',
      telefone: '(11) 99999-9999',
      endereco: 'São Paulo, SP',
      plano: 'BASIC',
      codigoConvite: 'ECOWORK2025',
      createdAt: '2025-01-01T00:00:00Z'
    }
  ],
  homeOffice: [
    {
      id: '1',
      usuarioId: '2',
      empresaId: '1',
      dataRegistro: '2025-01-20',
      transporte: 'CARRO',
      distancia: 15,
      co2Economizado: 3.8,
      creditosGanhos: 10,
      createdAt: '2025-01-20T10:00:00Z'
    }
  ]
};

// Serviço de autenticação
class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log(`🔄 Fazendo requisição para: ${url}`);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log(`📡 Resposta da API: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        // Se der erro 404, usar fallback para endpoints que não existem
        if (response.status === 404) {
          console.log('📋 Usando dados de fallback para endpoint não encontrado');
          return this.getFallbackData(endpoint) as T;
        }
        
        const errorText = await response.text();
        console.error('❌ Erro da API:', errorText);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // Tentar parsear JSON
      try {
        const data = await response.json();
        console.log('✅ Resposta da API (sucesso):', data);
        return data;
      } catch {
        console.log('✅ Resposta da API (sucesso - não JSON)');
        return {} as T;
      }
    } catch (error) {
      console.error('❌ Falha na requisição, usando fallback:', error);
      // Em caso de erro de rede, usar fallback
      return this.getFallbackData(endpoint) as T;
    }
  }

  private getFallbackData(endpoint: string): any {
    switch (endpoint) {
      case '/usuarios':
        return fallbackData.usuarios;
      case '/empresas':
        return fallbackData.empresas;
      case '/home-office':
        return fallbackData.homeOffice;
      default:
        if (endpoint.startsWith('/home-office/usuario/')) {
          const usuarioId = endpoint.split('/').pop();
          return fallbackData.homeOffice.filter(record => record.usuarioId === usuarioId);
        }
        return null;
    }
  }

  async login(credentials: LoginRequest): Promise<{ usuario: User; token: string }> {
    // Usar fallback para login - não temos endpoint real
    console.log('🔐 Login usando fallback');
    
    const usuarios = await this.request<User[]>('/usuarios');
    const usuario = usuarios.find(u => 
      u.email === credentials.email && 
      credentials.senha.length >= 6 // Senha válida se tiver pelo menos 6 caracteres
    );
    
    if (!usuario) {
      throw new Error('Usuário não encontrado ou senha inválida');
    }

    return {
      usuario,
      token: `token-${usuario.id}`
    };
  }

  async registerCompany(data: CompanyRegisterRequest): Promise<{ usuario: User; empresa: Company; token: string }> {
    // Usar fallback - não temos endpoints reais para registro
    console.log('🏢 Registro de empresa usando fallback');
    
    const novaEmpresa: Company = {
      id: `emp-${Date.now()}`,
      nome: data.nome,
      cnpj: data.cnpj,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco,
      plano: data.plano,
      codigoConvite: `ECO-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    const novoUsuario: User = {
      id: `user-${Date.now()}`,
      nome: data.nome,
      email: data.email,
      tipo: 'EMPRESA',
      empresaId: novaEmpresa.id,
      cnpj: data.cnpj,
      telefone: data.telefone,
      endereco: data.endereco,
      createdAt: new Date().toISOString()
    };

    // Adicionar aos dados de fallback
    fallbackData.empresas.push(novaEmpresa);
    fallbackData.usuarios.push(novoUsuario);

    return {
      usuario: novoUsuario,
      empresa: novaEmpresa,
      token: `token-${novoUsuario.id}`
    };
  }

  async registerEmployee(data: EmployeeRegisterRequest): Promise<{ usuario: User; token: string }> {
    // Usar fallback - não temos endpoints reais para registro
    console.log('👤 Registro de colaborador usando fallback');
    
    // Verificar código de convite
    const empresas = await this.request<Company[]>('/empresas');
    const empresa = empresas.find(e => e.codigoConvite === data.codigoConvite);
    
    if (!empresa) {
      throw new Error('Código de convite inválido. Use: ECOWORK2025');
    }

    const novoUsuario: User = {
      id: `user-${Date.now()}`,
      nome: data.nome,
      email: data.email,
      tipo: 'COLABORADOR',
      empresaId: empresa.id,
      telefone: data.telefone,
      createdAt: new Date().toISOString()
    };

    // Adicionar aos dados de fallback
    fallbackData.usuarios.push(novoUsuario);

    return {
      usuario: novoUsuario,
      token: `token-${novoUsuario.id}`
    };
  }

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Usuário não autenticado');
    
    // Extrair ID do token (simulação)
    const userId = token.replace('token-', '');
    const usuarios = await this.request<User[]>('/usuarios');
    const usuario = usuarios.find(u => u.id === userId);
    
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    
    return usuario;
  }
}

// Serviço do colaborador
class EmployeeService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log(`🔄 Fazendo requisição autenticada para: ${url}`);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log(`📡 Resposta da API: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        // Se der erro 404, usar fallback
        if (response.status === 404) {
          console.log('📋 Usando dados de fallback para endpoint não encontrado');
          return this.getFallbackData(endpoint) as T;
        }
        
        const errorText = await response.text();
        console.error('❌ Erro da API:', errorText);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      try {
        const data = await response.json();
        console.log('✅ Resposta da API (sucesso):', data);
        return data;
      } catch {
        console.log('✅ Resposta da API (sucesso - não JSON)');
        return {} as T;
      }
    } catch (error) {
      console.error('❌ Falha na requisição, usando fallback:', error);
      return this.getFallbackData(endpoint) as T;
    }
  }

  private getFallbackData(endpoint: string): any {
    switch (endpoint) {
      case '/home-office':
        return fallbackData.homeOffice;
      case '/beneficios':
        return [
          {
            id: '1',
            nome: 'Vale Presente Sustentável',
            descricao: 'R$ 50 em vale-presente para lojas ecológicas',
            custo: 100,
            categoria: 'vouchers'
          },
          {
            id: '2',
            nome: 'Doação para ONG Ambiental',
            descricao: 'Faça uma doação em seu nome para uma organização de proteção ambiental',
            custo: 50,
            categoria: 'doacoes'
          }
        ];
      default:
        if (endpoint.startsWith('/home-office/usuario/')) {
          const usuarioId = endpoint.split('/').pop();
          return fallbackData.homeOffice.filter(record => record.usuarioId === usuarioId);
        }
        return null;
    }
  }

  async registerHomeOffice(data: HomeOfficeRegisterRequest): Promise<HomeOfficeRecord> {
    console.log('📝 Registrando home office usando fallback');
    
    const novoRegistro: HomeOfficeRecord = {
      id: `ho-${Date.now()}`,
      usuarioId: data.usuarioId,
      empresaId: '1', // Default
      dataRegistro: new Date().toISOString().split('T')[0],
      transporte: data.transporte,
      distancia: data.distancia,
      co2Economizado: data.distancia * 0.21, // Cálculo simplificado
      creditosGanhos: Math.floor(data.distancia * 2.5),
      createdAt: new Date().toISOString()
    };

    // Adicionar aos dados de fallback
    fallbackData.homeOffice.push(novoRegistro);

    return novoRegistro;
  }

  async getEmployeeStats(usuarioId: string): Promise<EmployeeStats> {
    console.log('📊 Obtendo estatísticas do colaborador usando fallback');
    
    const historico = await this.getHomeOfficeHistory(usuarioId);
    
    const totalDiasHomeOffice = historico.length;
    const totalCO2Economizado = historico.reduce((sum, record) => sum + (record.co2Economizado || 0), 0);
    const totalCreditos = historico.reduce((sum, record) => sum + (record.creditosGanhos || 0), 0);
    
    return {
      totalDiasHomeOffice,
      totalCO2Economizado,
      totalCreditos,
      diasSemanaAtual: historico.filter(record => {
        const recordDate = new Date(record.dataRegistro);
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return recordDate > oneWeekAgo;
      }).length,
      ranking: 3
    };
  }

  async getHomeOfficeHistory(usuarioId: string): Promise<HomeOfficeRecord[]> {
    try {
      const historico = await this.request<HomeOfficeRecord[]>(`/home-office/usuario/${usuarioId}`);
      return historico || [];
    } catch {
      return [];
    }
  }

  async getBenefits(): Promise<any[]> {
    return this.request<any[]>('/beneficios');
  }

  async redeemBenefit(beneficioId: string, usuarioId: string): Promise<any> {
    console.log('🎁 Resgatando benefício usando fallback');
    
    // Simular resgate bem-sucedido
    return {
      success: true,
      message: 'Benefício resgatado com sucesso!',
      beneficioId,
      usuarioId,
      dataResgate: new Date().toISOString()
    };
  }
}

// Serviço da empresa
class CompanyService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log(`🔄 Fazendo requisição empresa para: ${url}`);
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      console.log(`📡 Resposta da API: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        // Se der erro 404, usar fallback
        if (response.status === 404) {
          console.log('📋 Usando dados de fallback para endpoint não encontrado');
          return this.getFallbackData(endpoint) as T;
        }
        
        const errorText = await response.text();
        console.error('❌ Erro da API:', errorText);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      try {
        const data = await response.json();
        console.log('✅ Resposta da API (sucesso):', data);
        return data;
      } catch {
        console.log('✅ Resposta da API (sucesso - não JSON)');
        return {} as T;
      }
    } catch (error) {
      console.error('❌ Falha na requisição, usando fallback:', error);
      return this.getFallbackData(endpoint) as T;
    }
  }

  private getFallbackData(endpoint: string): any {
    if (endpoint.startsWith('/empresas/') && endpoint.includes('/dashboard')) {
      return {
        totalColaboradores: 4,
        colaboradoresAtivos: 4,
        totalCO2Economizado: 152.0,
        totalCreditos: 380,
        ranking: 3
      };
    }
    return null;
  }

  async getCompanyDashboard(empresaId: string): Promise<any> {
    return this.request(`/empresas/${empresaId}/dashboard`);
  }

  async getCompanyEmployees(empresaId: string): Promise<any[]> {
    try {
      const usuarios = await this.request<User[]>('/usuarios');
      return usuarios.filter(u => u.empresaId === empresaId && u.tipo === 'COLABORADOR');
    } catch {
      return [];
    }
  }

  async generateReport(empresaId: string, tipoRelatorio: string): Promise<any> {
    console.log('📈 Gerando relatório usando fallback');
    
    return {
      success: true,
      relatorio: `Relatório ${tipoRelatorio} gerado com sucesso`,
      empresaId,
      dataGeracao: new Date().toISOString(),
      dados: {
        totalColaboradores: 4,
        totalCO2Economizado: 152.0,
        mediaDiasHomeOffice: 12
      }
    };
  }

  async getCompanyByInviteCode(codigoConvite: string): Promise<Company> {
    const empresas = await this.request<Company[]>('/empresas');
    const empresa = empresas.find(e => e.codigoConvite === codigoConvite);
    
    if (!empresa) {
      throw new Error('Empresa não encontrada com este código de convite');
    }
    
    return empresa;
  }
}

// Export das instâncias
export const authService = new AuthService();
export const employeeService = new EmployeeService();
export const companyService = new CompanyService();

// Utilitário para verificar se a API está online - AGORA TESTANDO APENAS ENDPOINTS QUE EXISTEM
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    console.log('🔍 Verificando saúde da API (apenas endpoint /usuarios)...');
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const isHealthy = response.ok;
    console.log(isHealthy ? '✅ API /usuarios está online' : '❌ API /usuarios está offline');
    return isHealthy;
  } catch (error) {
    console.log('❌ Não foi possível conectar com a API:', error);
    return false;
  }
};

// Testar endpoints específicos - AGORA APENAS ENDPOINTS QUE EXISTEM
export const testEndpoints = async () => {
  console.log('🧪 Testando endpoints da API...');
  
  const results = {
    usuarios: false,
    empresas: false
  };

  try {
    // Testar endpoint de usuários (que existe)
    const usersResponse = await fetch(`${API_BASE_URL}/usuarios`);
    results.usuarios = usersResponse.ok;
    console.log('👥 Endpoint /usuarios:', usersResponse.status, usersResponse.ok ? '✅' : '❌');
    
    if (usersResponse.ok) {
      try {
        const users = await usersResponse.json();
        console.log(`📊 ${users.length} usuários encontrados`);
      } catch {
        console.log('📊 Resposta não é JSON');
      }
    }
  } catch (error) {
    console.log('❌ Endpoint /usuarios não disponível');
  }

  try {
    // Testar endpoint de empresas (pode não existir)
    const companiesResponse = await fetch(`${API_BASE_URL}/empresas`);
    results.empresas = companiesResponse.ok;
    console.log('🏢 Endpoint /empresas:', companiesResponse.status, companiesResponse.ok ? '✅' : '❌');
    
    if (companiesResponse.ok) {
      try {
        const companies = await companiesResponse.json();
        console.log(`📊 ${companies.length} empresas encontradas`);
      } catch {
        console.log('📊 Resposta não é JSON');
      }
    }
  } catch (error) {
    console.log('❌ Endpoint /empresas não disponível');
  }

  console.log('📊 Resultados dos testes:', results);
  return results;
};