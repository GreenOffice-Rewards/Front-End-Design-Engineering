// ============ UNION TYPES (TypeScript Avançado) ============
export type UserType = 'EMPRESA' | 'COLABORADOR'
export type TransportationType = 'CARRO' | 'MOTO' | 'ONIBUS' | 'METRO' | 'BICICLETA' | 'A_PE'
export type PlanType = 'BASIC' | 'PREMIUM' | 'ENTERPRISE'
export type BenefitCategory = 'vouchers' | 'doacoes' | 'produtos' | 'educacao' | 'experiencias' | 'assinaturas'

// ============ BASE TYPES ============
export interface UserBase {
  id: string
  name: string
  email: string
  company: string
}

// ============ INTERSECTION TYPES (TypeScript Avançado) ============
export type CompanyUser = UserBase & {
  tipo: 'EMPRESA'
  cnpj: string
  telefone: string
  endereco: string
  plano: PlanType
  codigoConvite: string
}

export type EmployeeUser = UserBase & {
  tipo: 'COLABORADOR'
  empresaId: string
  transporte: TransportationType
  distancia: number
}

// Union Type combinando os dois tipos de usuários
export type User = CompanyUser | EmployeeUser

export interface CarbonCredit {
  date: string
  co2Saved: number
  creditsEarned: number
  transportationType: TransportationType
  distance: number
}

export interface Benefit {
  id: string
  name: string
  description: string
  cost: number
  category: BenefitCategory
  image: string
  featured?: boolean
  tags: string[]
}