# GreenOffice Rewards - Frontend

## Overview
GreenOffice Rewards is a corporate platform for calculating and rewarding carbon emission reductions through remote work. It allows companies to measure the positive impact of remote work on carbon emissions and convert these into "green credits" that employees can exchange for sustainable benefits.

**Status**: Fully configured for Replit environment  
**Type**: Frontend-only React application  
**Last Updated**: November 23, 2025

## Purpose
- **Problem Solved**: Companies don't measure the positive impact of remote work on carbon emission reduction
- **Solution**: Platform that calculates avoided emissions and converts them into credits redeemable for sustainable benefits

## Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 4
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Language**: TypeScript
- **Package Manager**: npm

## Project Structure
```
src/
├── components/      # Reusable UI components (Navbar, Footer, etc.)
├── contexts/        # React contexts (Auth, Theme)
├── pages/          # Page components (Home, Dashboard, Login, etc.)
│   ├── auth/       # Authentication pages
│   └── company/    # Company-specific pages
├── services/       # API service layer
├── styles/         # CSS and Tailwind configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Backend API
This frontend connects to an external REST API hosted at:
- **Base URL**: https://worktech-apirestful-1.onrender.com/api/ecowork

### Active Endpoints:
- **GET /usuarios** - Retorna todos os usuários (empresas e colaboradores)
  - Estrutura: `{ id, nome, email, distanciaTrabalhoKm }`
  - Empresas são identificadas pelo campo `tipo: 'EMPRESA'`
  
- **GET /registros** - Retorna todos os registros de home office
  - Estrutura: `{ id, dataTrabalho, horasTrabalhadas, co2Economizado, usuario: {...} }`

### Important Notes:
- Empresas são buscadas do endpoint `/usuarios` filtrando por `tipo: 'EMPRESA'`
- O endpoint `/empresas` não existe separadamente
- The app includes fallback data for endpoints not available in the API
- Authentication uses local storage for token management

## Replit Configuration

### Workflow
- **Name**: Frontend Development Server
- **Command**: `npm run dev`
- **Port**: 5000 (required for Replit webview)
- **Output Type**: webview

### Vite Configuration
The Vite config has been customized for Replit:
- Port: 5000
- Host: 0.0.0.0 (required for Replit)
- HMR configured for WSS protocol on port 443
- Strict port enabled

## Development

### Available Commands
- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Test Credentials (Fallback Mode)
- **Company**: empresa@teste.com (any password with 6+ chars)
- **Employee**: colaborador@teste.com (any password with 6+ chars)
- **Invite Code**: ECOWORK2025

## Recent Changes

### **Nov 24, 2025**: Global Solution 2025-2 Requirements Implementation
- ✅ **TypeScript Avançado implementado**:
  - Union Types: `UserType`, `TransportationType`, `PlanType`, `BenefitCategory`
  - Intersection Types: `CompanyUser = UserBase & {...}`, `EmployeeUser = UserBase & {...}`
  - Type Guards e validações de tipo em runtime
  
- ✅ **Rotas Dinâmicas implementadas**:
  - `/usuarios/:id` - Página de detalhes do usuário
  - `/empresas/:id` - Página de detalhes da empresa
  - Ambas com loading states, error handling e integração com API
  
- ✅ **Correção do código de convite**:
  - Corrigida validação do código "ECOWORK2025"
  - Busca agora em `fallbackData.empresas` pelo campo correto
  
- ✅ **README.md completo criado**:
  - Todas as seções obrigatórias incluídas
  - Documentação de API com exemplos curl (GET/POST/PUT/DELETE)
  - Tabela de integrantes com links GitHub/LinkedIn
  - Links para deploy Vercel e vídeo YouTube
  - Instruções completas de instalação e uso
  
- ✅ **Melhorias na integração com API Java**:
  - Métodos `getUsuarioById()` e `getEmpresaById()` adicionados ao authService
  - Fallback robusto: busca API → filtra localmente → fallback local
  - Logs detalhados para debugging

### **Nov 23, 2025**: Initial Replit setup
  - Configured Vite for port 5000 and Replit proxy compatibility
  - Fixed HMR WebSocket connection for Replit environment
  - Fixed TypeScript type errors in api.ts
  - Fixed CSS import order in index.css
  - Set up workflow for automatic dev server restart
  - Added .gitignore for Node.js projects
  - **API Integration**: Connected to real API endpoints
    - Configured `/usuarios` endpoint (✅ working - 3 users found)
    - Configured `/registros` endpoint (✅ working - 1 record found)
    - Updated company lookups to use `/usuarios` filtered by type
    - Updated home office records to use `/registros`
    - Removed references to non-existent `/empresas` endpoint

## Key Features
- User authentication (Company and Employee roles)
- Dashboard for tracking carbon savings
- Credit system based on remote work days
- Benefits marketplace for redeeming credits
- Company analytics and reporting
- Dark mode support
- **Dynamic routing with user and company detail pages**
- **Advanced TypeScript with Union and Intersection types**
