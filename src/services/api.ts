// Configuração base da API - USANDO SUA URL REAL
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
        const errorText = await response.text();
        console.error('❌ Erro da API:', errorText);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // Tentar parsear JSON, mas se falhar retornar texto
      try {
        const data = await response.json();
        console.log('✅ Resposta da API (sucesso):', data);
        return data;
      } catch {
        console.log('✅ Resposta da API (sucesso - não JSON)');
        return {} as T;
      }
    } catch (error) {
      console.error('❌ Falha na requisição:', error);
      throw error;
    }
  }

  async login(credentials: LoginRequest): Promise<{ usuario: User; token: string }> {
    // Primeiro, vamos tentar encontrar o usuário na lista
    const usuarios = await this.request<User[]>('/usuarios');
    const usuario = usuarios.find(u => u.email === credentials.email);
    
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Simular autenticação (já que não temos endpoint de login)
    return {
      usuario,
      token: `token-${usuario.id}`
    };
  }

  async registerCompany(data: CompanyRegisterRequest): Promise<{ usuario: User; empresa: Company; token: string }> {
    // Primeiro criar a empresa
    const empresaData = {
      nome: data.nome,
      cnpj: data.cnpj,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco,
      plano: data.plano,
      codigoConvite: `ECO-${Date.now()}`
    };

    const empresaResponse = await this.request<Company>('/empresas', {
      method: 'POST',
      body: JSON.stringify(empresaData),
    });

    // Depois criar o usuário empresa
    const usuarioData = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      tipo: 'EMPRESA' as const,
      empresaId: empresaResponse.id,
      cnpj: data.cnpj,
      telefone: data.telefone,
      endereco: data.endereco
    };

    const usuarioResponse = await this.request<User>('/usuarios', {
      method: 'POST',
      body: JSON.stringify(usuarioData),
    });

    return {
      usuario: usuarioResponse,
      empresa: empresaResponse,
      token: `token-${usuarioResponse.id}`
    };
  }

  async registerEmployee(data: EmployeeRegisterRequest): Promise<{ usuario: User; token: string }> {
    // Primeiro buscar empresa pelo código de convite
    const empresas = await this.request<Company[]>('/empresas');
    const empresa = empresas.find(e => e.codigoConvite === data.codigoConvite);
    
    if (!empresa) {
      throw new Error('Código de convite inválido');
    }

    // Criar usuário colaborador
    const usuarioData = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      tipo: 'COLABORADOR' as const,
      empresaId: empresa.id,
      telefone: data.telefone,
      perfilDeslocamento: {
        transporte: data.transporte,
        distancia: data.distancia
      }
    };

    const usuarioResponse = await this.request<User>('/usuarios', {
      method: 'POST',
      body: JSON.stringify(usuarioData),
    });

    return {
      usuario: usuarioResponse,
      token: `token-${usuarioResponse.id}`
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
      console.error('❌ Falha na requisição:', error);
      throw error;
    }
  }

  async registerHomeOffice(data: HomeOfficeRegisterRequest): Promise<HomeOfficeRecord> {
    const recordData = {
      usuarioId: data.usuarioId,
      empresaId: 'empresa-id', // Isso viria do usuário logado
      transporte: data.transporte,
      distancia: data.distancia,
      dataRegistro: new Date().toISOString().split('T')[0],
      co2Economizado: data.distancia * 0.21, // Cálculo simplificado
      creditosGanhos: Math.floor(data.distancia * 2.5)
    };

    return this.request<HomeOfficeRecord>('/home-office', {
      method: 'POST',
      body: JSON.stringify(recordData),
    });
  }

  async getEmployeeStats(usuarioId: string): Promise<EmployeeStats> {
    // Simular estatísticas baseadas no histórico
    const historico = await this.getHomeOfficeHistory(usuarioId);
    
    const totalDiasHomeOffice = historico.length;
    const totalCO2Economizado = historico.reduce((sum, record) => sum + record.co2Economizado, 0);
    const totalCreditos = historico.reduce((sum, record) => sum + record.creditosGanhos, 0);
    
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
      // Se o endpoint não existir, retornar array vazio
      return [];
    }
  }

  async getBenefits(): Promise<any[]> {
    try {
      const beneficios = await this.request<any[]>('/beneficios');
      return beneficios || [];
    } catch {
      // Benefícios mock se o endpoint não existir
      return [
        {
          id: '1',
          nome: 'Vale Presente Sustentável',
          descricao: 'R$ 50 em vale-presente para lojas ecológicas',
          custo: 100,
          categoria: 'vouchers'
        }
      ];
    }
  }

  async redeemBenefit(beneficioId: string, usuarioId: string): Promise<any> {
    return this.request('/beneficios/resgatar', {
      method: 'POST',
      body: JSON.stringify({ beneficioId, usuarioId }),
    });
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
      console.error('❌ Falha na requisição:', error);
      throw error;
    }
  }

  async getCompanyDashboard(empresaId: string): Promise<any> {
    try {
      return await this.request(`/empresas/${empresaId}/dashboard`);
    } catch {
      // Dashboard mock se o endpoint não existir
      return {
        totalColaboradores: 4,
        colaboradoresAtivos: 4,
        totalCO2Economizado: 152.0,
        totalCreditos: 380,
        ranking: 3
      };
    }
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
    return this.request(`/empresas/${empresaId}/relatorios`, {
      method: 'POST',
      body: JSON.stringify({ tipoRelatorio }),
    });
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

// Utilitário para verificar se a API está online
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    console.log('🔍 Verificando saúde da API...');
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const isHealthy = response.ok;
    console.log(isHealthy ? '✅ API está online' : '❌ API está offline');
    return isHealthy;
  } catch (error) {
    console.log('❌ Não foi possível conectar com a API:', error);
    return false;
  }
};

// Testar endpoints específicos - FUNÇÃO ATUALIZADA
export const testEndpoints = async () => {
  console.log('🧪 Testando endpoints da API...');
  
  const results = {
    usuarios: false,
    empresas: false
  };

  try {
    // Testar endpoint de usuários com timeout
    const usersResponse = await Promise.race([
      fetch(`${API_BASE_URL}/usuarios`),
      new Promise<Response>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
    ]);
    
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
    // Testar endpoint de empresas com timeout
    const companiesResponse = await Promise.race([
      fetch(`${API_BASE_URL}/empresas`),
      new Promise<Response>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
    ]);
    
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