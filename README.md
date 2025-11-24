# 🌱 GreenOffice Rewards

## Global Solution 2025-2 - FIAP
### Front-End Design Engineering

---

## 📋 Sobre o Projeto

**GreenOffice Rewards** é uma plataforma corporativa inovadora que calcula e recompensa a redução de emissões de carbono através do trabalho remoto. A aplicação permite que empresas mensurem o impacto ambiental positivo do home office e convertam essa economia em créditos verdes que colaboradores podem trocar por benefícios sustentáveis.

### 🎯 Objetivos

- Quantificar a redução de emissões de CO₂ através do trabalho remoto
- Gamificar a sustentabilidade corporativa
- Engajar colaboradores em práticas ESG (Environmental, Social, and Governance)
- Demonstrar ROI ambiental do trabalho híbrido/remoto

---

## 👥 Integrantes do Grupo

| Nome | RM | Turma | GitHub | LinkedIn |
|------|-----|-------|--------|----------|
| **Guilherme Lisboa Silva** | 565187 | 1TDSPW | [@guilisbooa](https://github.com/guilisbooa) | [Guilherme Lisboa](https://linkedin.com/in/guilhermelisboa) |
| **Icaro José dos Santos** | 562403 | 1TDSPW | [@Icaro-Jose09](https://github.com/Icaro-Jose09) | [Icaro Santos](https://linkedin.com/in/icarojoao) |
| **Richard Freitas de Sousa** | 566127 | 1TDSPW | [@vlonerickk](https://github.com/vlonerickk) | [Richard Freitas](https://linkedin.com/in/richardfreitas) |

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool ultrarrápida
- **React Router DOM** - Roteamento dinâmico e estático
- **Tailwind CSS** - Framework CSS utility-first (ÚNICO permitido)

### TypeScript Avançado
- ✅ **Union Types**: `UserType`, `TransportationType`, `PlanType`, `BenefitCategory`
- ✅ **Intersection Types**: `CompanyUser = UserBase & {...}`, `EmployeeUser = UserBase & {...}`
- ✅ **Type Guards**: Verificações de tipo em runtime
- ✅ **Interfaces**: Contratos de dados estruturados

### Backend
- **Java API REST** - Hospedada em Render
- **Endpoints**: `/usuarios`, `/registros`

---

## 📦 Pré-requisitos

- **Node.js** v18+ (ou compatível)
- **npm** ou **yarn**
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexão com internet (para API externa)

---

## ⚙️ Instalação e Configuração

### 1. Clone o Repositório

\`\`\`bash
git clone https://github.com/SEU-USUARIO/greenoffice-rewards.git
cd greenoffice-rewards
\`\`\`

### 2. Instale as Dependências

\`\`\`bash
npm install
\`\`\`

### 3. Configure as Variáveis de Ambiente (opcional)

Crie um arquivo \`.env.local\` na raiz do projeto:

\`\`\`env
VITE_API_URL=https://worktech-apirestful-1.onrender.com/api/ecowork
\`\`\`

### 4. Execute o Projeto

\`\`\`bash
npm run dev
\`\`\`

O aplicativo estará disponível em: **http://localhost:5000**

---

## 🌐 Deploy na Vercel

### Acesse o Deploy:
🔗 **[https://greenoffice-rewards.vercel.app](https://greenoffice-rewards.vercel.app)**

### Como Fazer Deploy:

1. Faça login na [Vercel](https://vercel.com)
2. Importe o repositório do GitHub
3. Configure as variáveis de ambiente:
   - \`VITE_API_URL=https://worktech-apirestful-1.onrender.com/api/ecowork\`
4. Deploy automático

---

## 📡 Integração com API Java

### Base URL
\`\`\`
https://worktech-apirestful-1.onrender.com/api/ecowork
\`\`\`

### Endpoints Disponíveis

#### **GET** - Listar Usuários
\`\`\`bash
curl -X GET "https://worktech-apirestful-1.onrender.com/api/ecowork/usuarios"
\`\`\`

**Resposta:**
\`\`\`json
[
  {
    "id": "1",
    "nome": "Tech Solutions Ltda",
    "email": "empresa@teste.com",
    "tipo": "EMPRESA",
    "cnpj": "12.345.678/0001-90"
  }
]
\`\`\`

#### **POST** - Registrar Usuário
\`\`\`bash
curl -X POST "https://worktech-apirestful-1.onrender.com/api/ecowork/usuarios" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "tipo": "COLABORADOR"
  }'
\`\`\`

#### **GET** - Listar Registros de Home Office
\`\`\`bash
curl -X GET "https://worktech-apirestful-1.onrender.com/api/ecowork/registros"
\`\`\`

#### **PUT** - Atualizar Usuário
\`\`\`bash
curl -X PUT "https://worktech-apirestful-1.onrender.com/api/ecowork/usuarios/1" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nome": "Tech Solutions ATUALIZADA"
  }'
\`\`\`

#### **DELETE** - Remover Usuário
\`\`\`bash
curl -X DELETE "https://worktech-apirestful-1.onrender.com/api/ecowork/usuarios/1"
\`\`\`

---

## 🗂️ Estrutura do Projeto

\`\`\`
greenoffice-rewards/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/          # Imagens e recursos
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── APIDebug.tsx
│   ├── contexts/        # Contextos React (useContext)
│   │   ├── ThemeContext.tsx     # Tema Escuro/Claro
│   │   └── AuthContext.tsx      # Autenticação
│   ├── pages/           # Páginas da aplicação
│   │   ├── Home.tsx              # Página inicial ✅
│   │   ├── About.tsx             # Sobre ✅
│   │   ├── Team.tsx              # Integrantes ✅
│   │   ├── FAQ.tsx               # Perguntas Frequentes ✅
│   │   ├── Contact.tsx           # Contato ✅
│   │   ├── Dashboard.tsx         # Dashboard colaborador
│   │   ├── Benefits.tsx          # Benefícios
│   │   ├── UsuarioDetalhes.tsx   # Rota dinâmica /usuarios/:id ✅
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── RegisterCompany.tsx
│   │   │   └── RegisterEmployee.tsx
│   │   └── company/
│   │       └── CompanyDashboard.tsx
│   ├── services/        # Serviços e APIs
│   │   └── api.ts       # Integração com Java API
│   ├── types/           # Definições TypeScript
│   │   └── index.ts     # Union & Intersection Types ✅
│   ├── App.tsx          # Componente raiz
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos Tailwind
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
\`\`\`

---

## 🎨 Funcionalidades Implementadas

### ✅ Páginas Obrigatórias
- [x] **Home/Index** - Página inicial com apresentação
- [x] **Sobre/About** - Informações sobre o projeto
- [x] **FAQ** - Perguntas frequentes
- [x] **Contato** - Formulário de contato
- [x] **Integrantes/Team** - Nome, RM, Turma, GitHub, LinkedIn

### ✅ Requisitos Técnicos
- [x] **React + Vite + TypeScript**
- [x] **Tailwind CSS** (sem CSS puro)
- [x] **Rotas Estáticas**: `/`, `/about`, `/faq`, `/contact`, `/team`
- [x] **Rotas Dinâmicas**: `/usuarios/:id` (com parâmetros)
- [x] **Tema Escuro/Claro** usando \`useContext\`
- [x] **Responsividade** (xs, sm, md, lg, xl)
- [x] **TypeScript Avançado**: Union Types, Intersection Types, Interfaces
- [x] **Integração com API Java** (GET, POST, PUT, DELETE)

### 🔐 Autenticação
- Login de empresa e colaborador
- Registro com código de convite
- Proteção de rotas sensíveis

### 📊 Dashboard
- Visualização de créditos de carbono
- Histórico de home office
- Troca de benefícios sustentáveis

---

## 🧪 Como Testar

### 1. Teste de Navegação
- Acesse todas as páginas pelo menu de navegação
- Verifique responsividade em diferentes tamanhos de tela
- Teste o tema escuro/claro

### 2. Teste de Autenticação

**Empresa:**
- Email: `empresa@teste.com`
- Senha: `123456`

**Colaborador:**
- Email: `colaborador@teste.com`
- Senha: `123456`

### 3. Teste de Registro

**Registrar Colaborador:**
- Código de convite: `ECOWORK2025`

### 4. Teste de Rotas Dinâmicas
- Acesse: `/usuarios/1` (após fazer login)
- Verifique os detalhes do usuário

---

## 🎥 Vídeo de Demonstração

📹 **Assista ao vídeo completo (3 minutos):**
🔗 [https://youtu.be/SEU_VIDEO_ID](https://youtu.be/SEU_VIDEO_ID)

### O que é demonstrado:
1. Navegação pelas páginas obrigatórias
2. Tema escuro/claro em ação
3. Cadastro de empresa e colaborador
4. Dashboard e funcionalidades principais
5. Rotas dinâmicas funcionando
6. Integração com API Java

---

## 🔧 Scripts Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview

# Lint (verificação de código)
npm run lint
\`\`\`

---

## 📝 Versionamento Git

### Requisitos Atendidos:
- ✅ Mínimo **15 commits totais**
- ✅ Mínimo **5 commits por integrante**
- ✅ Uso do **GitFlow** (main, develop, feature/*, bugfix/*)
- ✅ Pelo menos **2 tags** criadas

### Exemplo de Tags:
\`\`\`bash
git tag v1.0.0 -m "Release inicial - Global Solution 2025-2"
git tag v1.1.0 -m "Implementação rotas dinâmicas e TypeScript avançado"
git push origin --tags
\`\`\`

---

## 🚨 Troubleshooting

### Problema: API não responde
**Solução:** A API está hospedada no Render (cold start). Aguarde 30-60 segundos na primeira requisição.

### Problema: Tema não muda
**Solução:** Verifique se o ThemeContext está envolvendo toda a aplicação.

### Problema: Rotas dinâmicas retornam 404
**Solução:** Verifique se o React Router está configurado corretamente no Vite (verificar \`vite.config.ts\`).

### Problema: Código de convite inválido
**Solução:** Use o código correto: \`ECOWORK2025\`

---

## 📚 Documentação Adicional

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)

---

## 📄 Licença

Este projeto foi desenvolvido como parte da **Global Solution 2025-2** da **FIAP** para fins acadêmicos.

---

## 🔗 Links Importantes

- **GitHub:** [https://github.com/SEU-USUARIO/greenoffice-rewards](https://github.com/SEU-USUARIO/greenoffice-rewards)
- **Deploy Vercel:** [https://greenoffice-rewards.vercel.app](https://greenoffice-rewards.vercel.app)
- **Vídeo YouTube:** [https://youtu.be/SEU_VIDEO_ID](https://youtu.be/SEU_VIDEO_ID)
- **API Java:** [https://worktech-apirestful-1.onrender.com/api/ecowork](https://worktech-apirestful-1.onrender.com/api/ecowork)

---

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através da página de **[Contato](/contact)** da aplicação.

---

<div align="center">
  <strong>🌱 GreenOffice Rewards - Transformando trabalho remoto em impacto sustentável</strong>
  <br>
  <sub>FIAP - Global Solution 2025-2 - Front-End Design Engineering</sub>
</div>
