const ProductCard = ({ product, quantity, onQuantityChange }) => {
  return (
    <div className="produto-card">
      <div className="produto-imagem-container">
        <img
          src={`/queijo/imagem/${product.id}.jpg`}
          alt={product.nome}
          className="produto-imagem"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.style.backgroundColor = 'var(--accent)';
          }}
        />
      </div>
      <div className="produto-info">
        <h3 className="produto-nome">{product.nome}</h3>
        <p className="produto-descricao">{product.descricao}</p>
        <p className="produto-preco">
          {product.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </p>
        <div className="quantidade-controle">
              <button 
                className="quantidade-btn diminuir"
                onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
              >
                -
              </button>
              <input
                type="text"
                className="quantidade-input"
                value={quantity}
                readOnly
              />
              <button
                className="quantidade-btn aumentar"
                onClick={() => onQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
      </div>
    </div>
  );
};

export default ProductCard;
