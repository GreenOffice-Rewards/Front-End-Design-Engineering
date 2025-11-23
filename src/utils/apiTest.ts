export const testAPI = async () => {
  const API_BASE_URL = 'https://worktech-apirestful-1.onrender.com/api/ecowork';
  
  console.log('🔍 Testando conexão com a API...');
  
  try {
    // Testar endpoint de health/status
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API está online:', data);
      return true;
    } else {
      console.log('❌ API retornou erro:', response.status);
      
      // Tentar listar usuários como teste alternativo
      const usersResponse = await fetch(`${API_BASE_URL}/usuarios`);
      if (usersResponse.ok) {
        const users = await usersResponse.json();
        console.log('✅ Conseguiu acessar usuários:', users.length, 'usuários encontrados');
        return true;
      }
      
      return false;
    }
  } catch (error) {
    console.log('❌ Erro ao conectar com API:', error);
    return false;
  }
};

// Executar teste quando o arquivo for carregado
testAPI().then(online => {
  if (online) {
    console.log('🎉 API está funcionando!');
  } else {
    console.log('⚠️ API offline, usando modo demonstração');
  }
});