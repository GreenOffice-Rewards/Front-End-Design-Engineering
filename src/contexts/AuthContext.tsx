import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
  type: 'company' | 'employee'
  companyId?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  registerCompany: (companyData: CompanyRegisterData) => Promise<boolean>
  registerEmployee: (employeeData: EmployeeRegisterData) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

interface CompanyRegisterData {
  companyName: string
  cnpj: string
  email: string
  password: string
  plan: 'basic' | 'premium' | 'enterprise'
}

interface EmployeeRegisterData {
  name: string
  email: string
  password: string
  inviteCode: string
  transportation: string
  distance: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar se usuário está logado ao carregar
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('ecowork_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // SIMULAÇÃO - Substituir por API real
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock de dados - na prática viria da API
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
      return true
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const registerCompany = async (companyData: CompanyRegisterData): Promise<boolean> => {
    setIsLoading(true)
    
    try {
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
      return true
    } catch (error) {
      console.error('Company registration error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const registerEmployee = async (employeeData: EmployeeRegisterData): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Verificar código de convite (simulação)
      if (employeeData.inviteCode !== 'ECOWORK2025') {
        throw new Error('Código de convite inválido')
      }
      
      const newUser: User = {
        id: `emp-${Date.now()}`,
        email: employeeData.email,
        name: employeeData.name,
        type: 'employee',
        companyId: 'comp-1' // ID da empresa do código
      }
      
      setUser(newUser)
      localStorage.setItem('ecowork_user', JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error('Employee registration error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ecowork_user')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      registerCompany,
      registerEmployee,
      logout,
      isLoading
    }}>
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