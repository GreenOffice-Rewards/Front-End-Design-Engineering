export interface User {
  id: string
  name: string
  email: string
  company: string
}

export interface CarbonCredit {
  date: string
  co2Saved: number
  creditsEarned: number
  transportationType: string
  distance: number
}

export interface Benefit {
  id: string
  name: string
  description: string
  cost: number
  category: string
  image: string
  featured?: boolean
  tags: string[]
}