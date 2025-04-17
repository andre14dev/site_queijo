let produtos = [];

fetch('produtos.json')
  .then(response => response.json())
  .then(data => {
    produtos = data;
    carregarProdutos('todos');
  });

function carregarProdutos(categoria) {
  const container = document.getElementById('produtos');
  container.innerHTML = '';

  const filtrados = categoria === 'todos' ? produtos : produtos.filter(p => p.categoria === categoria);

  filtrados.forEach(produto => {
    const div = document.createElement('div');
    div.classList.add('produto');

    div.innerHTML = `
      <img src="imagem/${produto.id}.jpg" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <p><strong>${produto.preco}</strong></p>
      <label><input type="checkbox" value="${produto.nome}" /> Selecionar</label>
    `;

    container.appendChild(div);
  });
}

function irParaFinalizacao() {
    const selecionados = document.querySelectorAll('input[type="checkbox"]:checked');
  
    if (selecionados.length === 0) {
      alert('Selecione pelo menos um produto');
      return;
    }
  
    const itens = Array.from(selecionados).map(cb => {
      const produto = produtos.find(p => p.nome === cb.value);
      return {
        nome: produto.nome,
        preco: produto.preco.replace('R$', '').replace(',', '.'),
      };
    });
  
    localStorage.setItem('itensSelecionados', JSON.stringify(itens));
    window.location.href = 'finalizar.html';
  }
  

document.getElementById('categoria').addEventListener('change', e => {
  carregarProdutos(e.target.value);
});

function enviarWhatsApp() {
  const nome = document.getElementById('nome').value;
  if (!nome) {
    alert('Digite seu nome');
    return;
  }

  const selecionados = document.querySelectorAll('input[type="checkbox"]:checked');
  if (selecionados.length === 0) {
    alert('Selecione pelo menos um produto');
    return;
  }

  const lista = Array.from(selecionados).map(cb => `- ${cb.value}`).join('\n');
  const mensagem = encodeURIComponent(`Olá, meu nome é ${nome}. Gostaria dos seguintes produtos:\n${lista}`);
  const numero = '5537999913425'; // você pode trocar por uma variável se quiser importar do .env em backend
  const url = `https://wa.me/${numero}?text=${mensagem}`;

  window.open(url, '_blank');
}
