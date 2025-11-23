import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Benefits from './pages/Benefits'
import Login from './pages/auth/Login'
import RegisterCompany from './pages/auth/RegisterCompany'
import RegisterEmployee from './pages/auth/RegisterEmployee'
import CompanyDashboard from './pages/company/CompanyDashboard'

// Componente para proteger rotas
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredType?: 'company' | 'employee' }> = ({ 
  children, 
  requiredType 
}) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requiredType && user.type !== requiredType) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

function AppContent() {
  const { user } = useAuth()

  return (
    <Router>
      {/* Mostrar navbar apenas se não estiver na página de login */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register/company" element={<RegisterCompany />} />
        <Route path="/register/employee" element={<RegisterEmployee />} />
        <Route path="*" element={
          <>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Rotas protegidas */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/benefits" element={
                  <ProtectedRoute>
                    <Benefits />
                  </ProtectedRoute>
                } />
                
                <Route path="/company/dashboard" element={
                  <ProtectedRoute requiredType="company">
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />

                {/* Redirecionamentos */}
                <Route path="/register" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4">Escolha o tipo de cadastro</h2>
                      <div className="space-x-4">
                        <a href="/register/company" className="btn-primary">Sou Empresa</a>
                        <a href="/register/employee" className="btn-secondary">Sou Colaborador</a>
                      </div>
                    </div>
                  </div>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App