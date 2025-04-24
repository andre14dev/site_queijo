import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const ProductsPage = ({ order, setOrder }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 9; // 3x3 grid
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/produtos.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = order.categories.includes('todos')
    ? [...products]
    : products.filter(p => order.categories.includes(p.categoria));

  filteredProducts.sort((a, b) => a.categoria.localeCompare(b.categoria));

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  // Corrige página atual se ultrapassar o limite
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedItems = [...order.items];
    const existingIndex = updatedItems.findIndex(item => item.id === productId);

    if (existingIndex >= 0) {
      if (newQuantity > 0) {
        updatedItems[existingIndex].quantidade = newQuantity;
      } else {
        updatedItems.splice(existingIndex, 1);
      }
    } else if (newQuantity > 0) {
      const product = products.find(p => p.id === productId);
      updatedItems.push({
        id: productId,
        nome: product.nome,
        quantidade: newQuantity,
        preco: product.preco
      });
    }

    setOrder({...order, items: updatedItems});
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalize = () => {
    if (order.items.length === 0) {
      alert('Selecione pelo menos um produto');
      return;
    }
    navigate('/pedido');
  };

  if (isLoading) {
    return <div className="container">Carregando produtos...</div>;
  }

  return (
    <div className="container">
      <header>
        <button className="btn-seta" onClick={() => navigate('/')}>← Voltar</button>
        <h1>
          {order.categories.includes('todos') 
            ? 'Todos os Produtos' 
            : order.categories.join(' + ')}
        </h1>
      </header>

      <div className="produtos-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => {
            const item = order.items.find(i => i.id === product.id);
            const quantity = item ? item.quantidade : 0;
            
            return (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantity}
                onQuantityChange={(newQty) => handleQuantityChange(product.id, newQty)}
              />
            );
          })
        ) : (
          <p className="sem-produtos">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>

      {filteredProducts.length > productsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <div className="acoes">
        <button className="btn-primario" onClick={handleFinalize}>
          Finalizar Pedido →
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;