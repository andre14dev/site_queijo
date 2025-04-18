// Carrega os produtos do arquivo JSON
let produtos = [];
let pedido = {
  itens: [],
  nome: ''
};



// Função para carregar os produtos
async function carregarProdutos() {
  try {
    const response = await fetch('produtos.json');
    produtos = await response.json();
    exibirProdutos();
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
}

// Função para exibir os produtos
function exibirProdutos() {
  const produtosDiv = document.getElementById('produtos');
  
  if (produtosDiv) {
    produtosDiv.innerHTML = '';
    
    produtos.forEach((produto, index) => {
      const div = document.createElement('div');
      div.className = 'produto';
      
      // Verifica se a imagem existe, caso contrário, usa um placeholder
      const imagemUrl = `imagem/${produto.id}.jpg`;
      const imagem = new Image();
      imagem.src = imagemUrl;
      
      // Aguardar a imagem ser carregada corretamente antes de exibi-la
      imagem.onload = function() {
        div.innerHTML = `
          <img src="${imagemUrl}" alt="${produto.nome}">
          <div class="produto-content">
            <h3>${produto.nome}</h3>
            <p class="descricao">${produto.descricao}</p>
            <p class="preco">${produto.preco}</p>
            <label for="quantidade-${index}">Quantidade:</label>
            <select id="quantidade-${index}">
              ${Array.from({length: 11}, (_, i) => `<option value="${i}">${i}</option>`).join('')}
            </select>
          </div>
        `;
        produtosDiv.appendChild(div);
      };

      // Caso a imagem não carregue, usar o placeholder
      imagem.onerror = function() {
        div.innerHTML = `
          <img src="https://via.placeholder.com/200x150?text=${encodeURIComponent(produto.nome)}" alt="${produto.nome}">
          <div class="produto-content">
            <h3>${produto.nome}</h3>
            <p class="descricao">${produto.descricao}</p>
            <p class="preco">${produto.preco}</p>
            <label for="quantidade-${index}">Quantidade:</label>
            <select id="quantidade-${index}">
              ${Array.from({length: 11}, (_, i) => `<option value="${i}">${i}</option>`).join('')}
            </select>
          </div>
        `;
        produtosDiv.appendChild(div);
      };
    });
  }
}


// Finaliza o pedido na página inicial
function finalizarPedido() {
  const nome = document.getElementById('nome').value.trim();
  if (!nome) {
    alert('Por favor, digite seu nome.');
    return;
  }

  pedido.nome = nome;
  pedido.itens = [];
  
  produtos.forEach((produto, index) => {
    const quantidade = parseInt(document.getElementById(`quantidade-${index}`).value);
    if (quantidade > 0) {
      // Extrai o valor numérico do preço (remove "R$ " e substitui vírgula por ponto)
      const precoNumerico = parseFloat(produto.preco.replace('R$ ', '').replace(',', '.'));
      const subtotal = precoNumerico * quantidade;
      
      pedido.itens.push({
        id: produto.id,
        nome: produto.nome,
        quantidade: quantidade,
        preco: produto.preco,
        precoNumerico: precoNumerico,
        subtotal: subtotal
      });
    }
  });

  if (pedido.itens.length === 0) {
    alert('Nenhum produto selecionado.');
    return;
  }

  // Salva o pedido no localStorage e redireciona
  localStorage.setItem('pedido', JSON.stringify(pedido));
  window.location.href = 'finalizar.html';
}

// Exibe o resumo do pedido na página de finalização
function exibirResumoPedido() {
  const pedidoSalvo = localStorage.getItem('pedido');
  if (pedidoSalvo) {
    pedido = JSON.parse(pedidoSalvo);
    
    const itensPedido = document.getElementById('itens-pedido');
    const totalPedido = document.getElementById('total-pedido');
    const nomeFinalizar = document.getElementById('nome-finalizar');
    
    if (itensPedido && totalPedido && nomeFinalizar) {
      // Preenche o nome
      nomeFinalizar.value = pedido.nome;
      
      // Limpa a tabela
      itensPedido.innerHTML = '';
      
      // Calcula o total
      let total = 0;
      
      // Adiciona cada item à tabela
      pedido.itens.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.quantidade}</td>
          <td>${item.preco}</td>
          <td>R$ ${item.subtotal.toFixed(2).replace('.', ',')}</td>
        `;
        itensPedido.appendChild(tr);
        total += item.subtotal;
      });
      
      // Exibe o total
      totalPedido.innerHTML = `<strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>`;
    }
  } else {
    // Se não houver pedido, volta para a página inicial
    window.location.href = 'index.html';
  }
}

// Envia o pedido pelo WhatsApp
function enviarWhatsApp() {
  const nome = document.getElementById('nome-finalizar').value.trim();
  if (!nome) {
    alert('Por favor, confirme seu nome.');
    return;
  }

  if (!pedido.itens || pedido.itens.length === 0) {
    alert('Nenhum produto selecionado.');
    return;
  }

  // Atualiza o nome no pedido
  pedido.nome = nome;
  
  // Formata a mensagem
  let mensagem = `Olá, meu nome é ${pedido.nome}.\nGostaria de comprar:\n`;
  
  // Adiciona cada item à mensagem
  pedido.itens.forEach(item => {
    mensagem += `* ${item.nome} (Qtd: ${item.quantidade}) - ${item.preco}\n`;
  });
  
  // Calcula o total
  const total = pedido.itens.reduce((sum, item) => sum + item.subtotal, 0);
  mensagem += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
  
  // Número de WhatsApp (substitua pelo seu número)
  const numero = '5537999913425';
  
  // Codifica a mensagem para URL
  const mensagemCodificada = encodeURIComponent(mensagem);
  
  // Cria o link do WhatsApp
  const url = `https://wa.me/${numero}?text=${mensagemCodificada}`;
  
  // Abre em uma nova aba
  window.open(url, '_blank');
}

// Inicializa a página apropriada
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('finalizar.html')) {
    exibirResumoPedido();
  } else {
    carregarProdutos();
  }
});

// Teste de caminho das imagens (pode remover depois)
console.log("Verificando caminho das imagens:");
produtos.forEach(produto => {
  console.log(`Produto ${produto.id} - caminho: imagens/${produto.id}.jpg`);
});