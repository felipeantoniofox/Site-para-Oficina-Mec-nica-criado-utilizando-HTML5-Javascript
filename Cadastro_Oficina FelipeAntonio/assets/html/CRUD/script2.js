// === Seletores principais do DOM ===
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const inputNome = document.querySelector('#m-nome');
const inputFuncao = document.querySelector('#m-funcao');
const inputSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');

// === Variáveis globais ===
let funcionarios = [];
let idEdicao; // ID do funcionário sendo editado (undefined para novo)

// === Função para abrir o modal ===
function openModal(isEdit = false, index = 0) {
  modal.classList.add('active');

  // Fecha o modal ao clicar fora dele
  modal.onclick = event => {
    if (event.target.classList.contains('modal-container')) {
      modal.classList.remove('active');
    }
  };

  // Se for edição, carrega os dados no formulário
  if (isEdit) {
    inputNome.value = funcionarios[index].nome;
    inputFuncao.value = funcionarios[index].funcao;
    inputSalario.value = funcionarios[index].salario;
    idEdicao = index;
  } else {
    // Limpa os campos para novo cadastro
    inputNome.value = '';
    inputFuncao.value = '';
    inputSalario.value = '';
    idEdicao = undefined;
  }
}

// === Edita funcionário existente ===
function editItem(index) {
  openModal(true, index);
}

// === Exclui funcionário da lista e atualiza o armazenamento ===
function deleteItem(index) {
  funcionarios.splice(index, 1);
  salvarDados();
  carregarFuncionarios();
}

// === Insere uma linha na tabela com os dados de um funcionário ===
function insertItem(funcionario, index) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${funcionario.nome}</td>
    <td>${funcionario.funcao}</td>
    <td>R$ ${parseFloat(funcionario.salario).toFixed(2)}</td>
    <td class="acao">
      <button onclick="editItem(${index})" title="Editar"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})" title="Excluir"><i class='bx bx-trash'></i></button>
    </td>
  `;

  tbody.appendChild(tr);
}

// === Evento ao clicar no botão Salvar ===
btnSalvar.onclick = event => {
  event.preventDefault();

  // Validação básica
  if (inputNome.value.trim() === '' || inputFuncao.value.trim() === '' || inputSalario.value.trim() === '') {
    alert('Preencha todos os campos!');
    return;
  }

  const funcionario = {
    nome: inputNome.value.trim(),
    funcao: inputFuncao.value.trim(),
    salario: parseFloat(inputSalario.value).toFixed(2)
  };

  if (idEdicao !== undefined) {
    // Atualiza funcionário existente
    funcionarios[idEdicao] = funcionario;
  } else {
    // Adiciona novo funcionário
    funcionarios.push(funcionario);
  }

  salvarDados();
  carregarFuncionarios();
  modal.classList.remove('active');
  idEdicao = undefined;
};

// === Carrega os funcionários do localStorage ===
function carregarFuncionarios() {
  funcionarios = obterDados();
  tbody.innerHTML = ''; // Limpa tabela antes de renderizar
  funcionarios.forEach((funcionario, index) => insertItem(funcionario, index));
}

// === Funções de armazenamento ===
const obterDados = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const salvarDados = () => localStorage.setItem('dbfunc', JSON.stringify(funcionarios));

// === Inicializa a tabela ao carregar a página ===
carregarFuncionarios();