// ===================
// Elementos DOM
// ===================

// Botões para visualizar senhas
const btnVerSenha = document.querySelector('#verSenha');
const btnVerConfirmSenha = document.querySelector('#verConfirmSenha');

// Campos de formulário
const nome = document.querySelector('#nome');
const usuario = document.querySelector('#usuario');
const senha = document.querySelector('#senha');
const confirmSenha = document.querySelector('#confirmSenha');

// Labels dos campos
const labelNome = document.querySelector('#labelNome');
const labelUsuario = document.querySelector('#labelUsuario');
const labelSenha = document.querySelector('#labelSenha');
const labelConfirmSenha = document.querySelector('#labelConfirmSenha');

// Mensagens de sucesso e erro
const msgError = document.querySelector('#msgError');
const msgSuccess = document.querySelector('#msgSuccess');

// ===================
// Variáveis de Validação
// ===================
let validNome = false;
let validUsuario = false;
let validSenha = false;
let validConfirmSenha = false;

// ===================
// Validações em tempo real
// ===================

nome.addEventListener('keyup', () => {
  if (nome.value.length < 3) {
    atualizarEstadoCampo(labelNome, nome, 'red', 'Nome *Insira no mínimo 3 caracteres');
    validNome = false;
  } else {
    atualizarEstadoCampo(labelNome, nome, 'green', 'Nome');
    validNome = true;
  }
});

usuario.addEventListener('keyup', () => {
  if (usuario.value.length < 5) {
    atualizarEstadoCampo(labelUsuario, usuario, 'red', 'Usuário *Insira no mínimo 5 caracteres');
    validUsuario = false;
  } else {
    atualizarEstadoCampo(labelUsuario, usuario, 'green', 'Usuário');
    validUsuario = true;
  }
});

senha.addEventListener('keyup', () => {
  if (senha.value.length < 6) {
    atualizarEstadoCampo(labelSenha, senha, 'red', 'Senha *Insira no mínimo 6 caracteres');
    validSenha = false;
  } else {
    atualizarEstadoCampo(labelSenha, senha, 'green', 'Senha');
    validSenha = true;
  }
});

confirmSenha.addEventListener('keyup', () => {
  if (confirmSenha.value !== senha.value || confirmSenha.value === '') {
    atualizarEstadoCampo(labelConfirmSenha, confirmSenha, 'red', 'Confirmar Senha *As senhas não conferem');
    validConfirmSenha = false;
  } else {
    atualizarEstadoCampo(labelConfirmSenha, confirmSenha, 'green', 'Confirmar Senha');
    validConfirmSenha = true;
  }
});

// ===================
// Função para atualizar o estado visual dos campos
// ===================
function atualizarEstadoCampo(label, input, cor, mensagem) {
  label.style.color = cor;
  label.innerHTML = mensagem;
  input.style.borderColor = cor;
}

// ===================
// Função de Cadastro
// ===================
function cadastrar() {
  if (validNome && validUsuario && validSenha && validConfirmSenha) {
    // Obtém lista de usuários existentes ou inicia um novo array
    const listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

    // Adiciona novo usuário
    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value
    });

    // Salva no localStorage
    localStorage.setItem('listaUser', JSON.stringify(listaUser));

    // Exibe mensagem de sucesso e redireciona
    msgSuccess.style.display = 'block';
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
    msgError.style.display = 'none';

    setTimeout(() => {
      window.location.href = '../html/signin.html';
    }, 3000);
  } else {
    // Exibe erro se os campos não forem válidos
    msgError.style.display = 'block';
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.style.display = 'none';
  }
}

// ===================
// Alternar visibilidade das senhas
// ===================

btnVerSenha.addEventListener('click', () => {
  alternarVisibilidadeSenha(senha, btnVerSenha);
});

btnVerConfirmSenha.addEventListener('click', () => {
  alternarVisibilidadeSenha(confirmSenha, btnVerConfirmSenha);
});

/**
 * Alterna o tipo do campo de senha entre 'password' e 'text'
 * e troca o ícone do olho
 */
function alternarVisibilidadeSenha(input, btn) {
  const visivel = input.getAttribute('type') === 'text';
  input.setAttribute('type', visivel ? 'password' : 'text');
  btn.classList.toggle('fa-eye');
  btn.classList.toggle('fa-eye-slash');
}