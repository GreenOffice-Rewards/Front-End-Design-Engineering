// Configuração base da API
const API_BASE_URL = 'https://seu-deploy-java.onrender.com'; // Substitua pela URL real

// Interfaces baseadas na API existente
export interface User {
  id: string;
  email: string;
  name: string;
  type: 'company' | 'employee';
  companyId?: string;
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  plan: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  inviteCode: string;
}

export interface HomeOfficeRecord {
  id: string;
  userId: string;
  companyId: string;
  recordDate: string;
  transportation: 'CAR' | 'MOTORCYCLE' | 'BUS' | 'SUBWAY' | 'BICYCLE' | 'WALKING';
  distance: number;
  co2Saved: number;
  creditsEarned: number;
  createdAt: string;
}

export interface EmployeeStats {
  totalHomeOfficeDays: number;
  totalCO2Saved: number;
  totalCredits: number;
  currentWeekDays: number;
  ranking: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CompanyRegisterRequest {
  companyName: string;
  cnpj: string;
  email: string;
  password: string;
  plan: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
}

export interface EmployeeRegisterRequest {
  name: string;
  email: string;
  password: string;
  inviteCode: string;
  transportation: 'CAR' | 'MOTORCYCLE' | 'BUS' | 'SUBWAY' | 'BICYCLE' | 'WALKING';
  distance: number;
}

export interface HomeOfficeRegisterRequest {
  userId: string;
  transportation: 'CAR' | 'MOTORCYCLE' | 'BUS' | 'SUBWAY' | 'BICYCLE' | 'WALKING';
  distance: number;
}

// Serviço de autenticação
class AuthService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginRequest): Promise<{ user: User; token: string }> {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async registerCompany(data: CompanyRegisterRequest): Promise<{ user: User; company: Company; token: string }> {
    return this.request('/api/auth/register/company', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async registerEmployee(data: EmployeeRegisterRequest): Promise<{ user: User; token: string }> {
    return this.request('/api/auth/register/employee', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Serviço do colaborador
class EmployeeService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const url = `${API_BASE_URL}${endpoint}`;
    
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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async registerHomeOffice(data: HomeOfficeRegisterRequest): Promise<HomeOfficeRecord> {
    return this.request('/api/employee/home-office', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getEmployeeStats(userId: string): Promise<EmployeeStats> {
    return this.request(`/api/employee/${userId}/stats`);
  }

  async getHomeOfficeHistory(userId: string): Promise<HomeOfficeRecord[]> {
    return this.request(`/api/employee/${userId}/history`);
  }

  async getBenefits(): Promise<any[]> {
    return this.request('/api/benefits');
  }

  async redeemBenefit(benefitId: string, userId: string): Promise<any> {
    return this.request('/api/benefits/redeem', {
      method: 'POST',
      body: JSON.stringify({ benefitId, userId }),
    });
  }
}

// Serviço da empresa
class CompanyService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const url = `${API_BASE_URL}${endpoint}`;
    
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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getCompanyDashboard(companyId: string): Promise<any> {
    return this.request(`/api/company/${companyId}/dashboard`);
  }

  async getCompanyEmployees(companyId: string): Promise<any[]> {
    return this.request(`/api/company/${companyId}/employees`);
  }

  async generateReport(companyId: string, reportType: string): Promise<any> {
    return this.request(`/api/company/${companyId}/reports`, {
      method: 'POST',
      body: JSON.stringify({ reportType }),
    });
  }
}

// Serviço de IA (se existir na API)
class AIService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token');
    const url = `${API_BASE_URL}${endpoint}`;
    
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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getBenefitRecommendations(userId: string): Promise<any[]> {
    return this.request(`/api/ai/recommendations/${userId}`);
  }

  async predictCO2Savings(userId: string): Promise<any> {
    return this.request(`/api/ai/predict-co2/${userId}`);
  }

  async chatWithBot(message: string, userId: string): Promise<any> {
    return this.request('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, userId }),
    });
  }
}

// Export das instâncias
export const authService = new AuthService();
export const employeeService = new EmployeeService();
export const companyService = new CompanyService();
export const aiService = new AIService();

// Utilitário para verificar se a API está online
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};