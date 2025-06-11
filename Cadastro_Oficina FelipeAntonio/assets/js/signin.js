// === MOSTRAR/OCULTAR SENHA ===
// Seleciona o ícone de olho (mostrar senha)
const eyeIcon = document.querySelector('#verSenha');

eyeIcon?.addEventListener('click', () => {
  const senhaInput = document.querySelector('#senha');
  const tipoAtual = senhaInput.getAttribute('type');

  senhaInput.setAttribute('type', tipoAtual === 'password' ? 'text' : 'password');
  eyeIcon.classList.toggle('fa-eye-slash'); // Troca ícone se desejar
});

// === FUNÇÃO DE LOGIN ===
function entrar() {
  // Elementos do formulário
  const usuarioInput = document.querySelector('#usuario');
  const senhaInput   = document.querySelector('#senha');

  // Labels dos campos
  const userLabel    = document.querySelector('#userLabel');
  const senhaLabel   = document.querySelector('#senhaLabel');

  // Mensagem de erro
  const msgError     = document.querySelector('#msgError');

  // Busca a lista de usuários armazenada
  const listaUsuarios = JSON.parse(localStorage.getItem('listaUser')) || [];

  // Inicializa o objeto do usuário autenticado
  let usuarioValido = {
    nome: '',
    user: '',
    senha: ''
  };

  // Valida credenciais comparando com a lista
  listaUsuarios.forEach(user => {
    if (usuarioInput.value === user.userCad && senhaInput.value === user.senhaCad) {
      usuarioValido = {
        nome: user.nomeCad,
        user: user.userCad,
        senha: user.senhaCad
      };
    }
  });

  // Se credenciais forem válidas
  if (
    usuarioInput.value === usuarioValido.user &&
    senhaInput.value === usuarioValido.senha
  ) {
    // Gera um token de sessão e salva usuário logado
    const token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);

    localStorage.setItem('token', token);
    localStorage.setItem('userLogado', JSON.stringify(usuarioValido));

    // Redireciona para a página de destino após login
    window.location.href = 'CRUD/index2.html';
  } else {
    // Exibe mensagem de erro e destaca os campos
    userLabel.style.color = 'red';
    senhaLabel.style.color = 'red';
    usuarioInput.style.borderColor = 'red';
    senhaInput.style.borderColor = 'red';

    msgError.style.display = 'block';
    msgError.textContent = 'Usuário ou senha incorretos';

    usuarioInput.focus();
  }
}
