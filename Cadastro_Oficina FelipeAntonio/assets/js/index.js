// Verifica se o usuário está autenticado por meio do token armazenado no localStorage
if (!localStorage.getItem("token")) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "./assets/html/signin.html"; // Redireciona para login
}

// Recupera os dados do usuário logado do localStorage
const userLogado = JSON.parse(localStorage.getItem("userLogado"));

// Exibe o nome do usuário logado na tela
const logado = document.querySelector("#logado");

if (userLogado && userLogado.nome && logado) {
  logado.innerHTML = `Olá, <strong>${userLogado.nome}</strong>`;
} else {
  // Caso o objeto não esteja bem formatado ou ausente, força logout
  sair();
}

/**
 * Função para logout do usuário
 * Remove o token e os dados do usuário do localStorage
 * Redireciona para a página de login
 */
function sair() {
  localStorage.removeItem("token");
  localStorage.removeItem("userLogado");
  window.location.href = "./assets/html/signin.html";
}