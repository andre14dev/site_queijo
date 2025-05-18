import { useNavigate } from 'react-router-dom';

const OrderPage = ({ order }) => {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return order.items.reduce((total, item) => {
      return total + (item.quantidade * item.preco);
    }, 0);
  };

  const sendWhatsApp = () => {
    let message = `*Pedido de ${order.name}*\n\n`; // Aqui está o nome
    message += `*Itens:*\n\n`;
    
    order.items.forEach(item => {
      message += `${item.quantidade}x ${item.nome} - ${(item.quantidade * item.preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })}\n`;
    });
    
    message += `\n*Total: ${calculateTotal().toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })}*`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/37999913425?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="container">
      <header>
        <button className="btn-seta" onClick={() => navigate('/produtos')}>Voltar</button>
        <h1>Resumo do Pedido</h1>
        <div className="cliente-info">
          <p><strong>Cliente:</strong> {order.name || 'Não informado'}</p> {/* Exibição do nome aqui */}
        </div>
      </header>

      <div className="tabela-pedido">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={`${item.id}-${item.quantidade}`}>
                <td>{item.nome}</td>
                <td>{item.quantidade}x</td>
                <td>
                  {(item.quantidade * item.preco).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <strong>Total:</strong>
          <span>
            {calculateTotal().toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </span>
        </div>
      </div>

      <button className="btn-whatsapp" onClick={sendWhatsApp}>
        Enviar Pedido
      </button>
    </div>
  );
};

export default OrderPage;