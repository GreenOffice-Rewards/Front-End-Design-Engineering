import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService, User, checkAPIHealth, testEndpoints } from '../services/api'

export interface CompanyRegisterData {
  companyName: string
  cnpj: string
  email: string
  password: string
  plan: 'BASIC' | 'PREMIUM' | 'ENTERPRISE'
}

export interface EmployeeRegisterData {
  name: string
  email: string
  password: string
  inviteCode: string
  transportation: string
  distance: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  registerCompany: (companyData: CompanyRegisterData) => Promise<boolean>
  registerEmployee: (employeeData: EmployeeRegisterData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  apiHealth: boolean
  apiEndpoints: { usuarios: boolean; registros: boolean }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [apiHealth, setApiHealth] = useState(false)
  const [apiEndpoints, setApiEndpoints] = useState({ usuarios: false, registros: false })

  // Verificar saúde da API e autenticação
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🚀 Inicializando autenticação...')
        
        // Verificar se API está online
        const isHealthy = await checkAPIHealth()
        setApiHealth(isHealthy)
        
        // Testar endpoints específicos
        const endpoints = await testEndpoints()
        setApiEndpoints(endpoints)
        
        // Carregar usuário salvo
        const savedUser = localStorage.getItem('ecowork_user')
        const savedToken = localStorage.getItem('auth_token')
        
        if (savedUser && savedToken) {
          console.log('📁 Usuário encontrado no localStorage')
          setUser(JSON.parse(savedUser))
          
          // Verificar se token ainda é válido
          if (apiHealth) {
            try {
              await authService.getCurrentUser()
            } catch (error) {
              console.log('❌ Token inválido, fazendo logout')
              logout()
            }
          }
        } else {
          console.log('🔐 Nenhum usuário logado encontrado')
        }
      } catch (error) {
        console.error('Erro na inicialização:', error)
        setApiHealth(false)
        setApiEndpoints({ usuarios: false, registros: false })
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      console.log(`🔐 Tentando login para: ${email}`)
      
      if (apiHealth) {
        // Usar API real - ATUALIZADO para nova estrutura
        const response = await authService.login({ 
          email, 
          senha: password 
        })
        
        console.log('✅ Login bem-sucedido via API:', response)
        
        // Converter para estrutura do frontend
        const frontendUser: User = {
          id: response.usuario.id,
          email: response.usuario.email,
          name: response.usuario.nome,
          type: response.usuario.tipo === 'EMPRESA' ? 'company' : 'employee',
          companyId: response.usuario.empresaId
        }
        
        setUser(frontendUser)
        localStorage.setItem('ecowork_user', JSON.stringify(frontendUser))
        localStorage.setItem('auth_token', response.token)
        
        console.log('👤 Usuário convertido:', frontendUser)
      } else {
        // Fallback para demonstração
        console.log('🔄 Usando fallback de demonstração')
        await loginFallback(email, password)
      }
      return true
    } catch (error: any) {
      console.error('❌ Erro no login:', error)
      alert(error.message || 'Erro ao fazer login. Verifique suas credenciais.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginFallback = async (email: string, password: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    let mockUser: User
    
    if (email.includes('empresa')) {
      mockUser = {
        id: 'comp-1',
        email: email,
        name: 'Tech Solutions Ltda',
        type: 'company',
        companyId: 'comp-1'
      }
    } else {
      mockUser = {
        id: 'emp-1',
        email: email,
        name: 'João Silva',
        type: 'employee',
        companyId: 'comp-1'
      }
    }
    
    setUser(mockUser)
    localStorage.setItem('ecowork_user', JSON.stringify(mockUser))
    localStorage.setItem('auth_token', 'demo-token')
    
    console.log('🎭 Login de demonstração:', mockUser)
  }

  const registerCompany = async (companyData: CompanyRegisterData): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      console.log('🏢 Registrando nova empresa:', companyData.companyName)
      
      if (apiHealth) {
        // Usar API real - ATUALIZADO para nova estrutura
        const response = await authService.registerCompany({
          nome: companyData.companyName,
          cnpj: companyData.cnpj,
          email: companyData.email,
          senha: companyData.password,
          telefone: '(11) 99999-9999', // Default
          endereco: 'São Paulo, SP', // Default
          plano: companyData.plan
        })
        
        console.log('✅ Empresa registrada via API:', response)
        
        // Converter para estrutura do frontend
        const frontendUser: User = {
          id: response.usuario.id,
          email: response.usuario.email,
          name: response.usuario.nome,
          type: 'company',
          companyId: response.empresa.id
        }
        
        setUser(frontendUser)
        localStorage.setItem('ecowork_user', JSON.stringify(frontendUser))
        localStorage.setItem('auth_token', response.token)
        
        console.log('👤 Usuário empresa criado:', frontendUser)
      } else {
        // Fallback para demonstração
        console.log('🔄 Usando fallback de demonstração para empresa')
        await registerCompanyFallback(companyData)
      }
      return true
    } catch (error: any) {
      console.error('❌ Erro no registro da empresa:', error)
      alert(error.message || 'Erro ao criar conta da empresa. Tente novamente.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const registerCompanyFallback = async (companyData: CompanyRegisterData): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newUser: User = {
      id: `comp-${Date.now()}`,
      email: companyData.email,
      name: companyData.companyName,
      type: 'company',
      companyId: `comp-${Date.now()}`
    }
    
    setUser(newUser)
    localStorage.setItem('ecowork_user', JSON.stringify(newUser))
    localStorage.setItem('auth_token', 'demo-token')
    
    console.log('🎭 Empresa de demonstração criada:', newUser)
  }

  const registerEmployee = async (employeeData: EmployeeRegisterData): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      console.log('👤 Registrando novo colaborador:', employeeData.name)
      
      if (apiHealth) {
        // Usar API real - ATUALIZADO para nova estrutura
        const response = await authService.registerEmployee({
          nome: employeeData.name,
          email: employeeData.email,
          senha: employeeData.password,
          codigoConvite: employeeData.inviteCode,
          transporte: mapTransportation(employeeData.transportation),
          distancia: employeeData.distance,
          telefone: '(11) 99999-9999' // Default
        })
        
        console.log('✅ Colaborador registrado via API:', response)
        
        // Converter para estrutura do frontend
        const frontendUser: User = {
          id: response.usuario.id,
          email: response.usuario.email,
          name: response.usuario.nome,
          type: 'employee',
          companyId: response.usuario.empresaId
        }
        
        setUser(frontendUser)
        localStorage.setItem('ecowork_user', JSON.stringify(frontendUser))
        localStorage.setItem('auth_token', response.token)
        
        console.log('👤 Colaborador criado:', frontendUser)
      } else {
        // Fallback para demonstração
        console.log('🔄 Usando fallback de demonstração para colaborador')
        await registerEmployeeFallback(employeeData)
      }
      return true
    } catch (error: any) {
      console.error('❌ Erro no registro do colaborador:', error)
      alert(error.message || 'Erro ao criar conta de colaborador. Verifique o código de convite.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const registerEmployeeFallback = async (employeeData: EmployeeRegisterData): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Verificar código de convite (simulação)
    if (employeeData.inviteCode !== 'ECOWORK2025') {
      throw new Error('Código de convite inválido. Use: ECOWORK2025')
    }
    
    const newUser: User = {
      id: `emp-${Date.now()}`,
      email: employeeData.email,
      name: employeeData.name,
      type: 'employee',
      companyId: 'comp-1'
    }
    
    setUser(newUser)
    localStorage.setItem('ecowork_user', JSON.stringify(newUser))
    localStorage.setItem('auth_token', 'demo-token')
    
    console.log('🎭 Colaborador de demonstração criado:', newUser)
  }

  const logout = () => {
    console.log('🚪 Fazendo logout...')
    setUser(null)
    localStorage.removeItem('ecowork_user')
    localStorage.removeItem('auth_token')
    console.log('✅ Logout concluído')
  }

  // Helper para mapear transporte
  const mapTransportation = (transport: string): string => {
    const mapping: { [key: string]: string } = {
      'carro': 'CARRO',
      'moto': 'MOTO', 
      'onibus': 'ONIBUS',
      'metro': 'METRO',
      'bicicleta': 'BICICLETA',
      'pe': 'A_PE'
    }
    return mapping[transport] || 'CARRO'
  }

  const value: AuthContextType = {
    user,
    login,
    registerCompany,
    registerEmployee,
    logout,
    isLoading,
    apiHealth,
    apiEndpoints
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}