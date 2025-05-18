const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="paginacao">
      <button 
        className="btn-seta" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Pagina Anterior
      </button>
      <span className="pagina-info">
        Página {currentPage} de {totalPages}
      </span>
      <button 
        className="btn-seta" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima Pagina
      </button>
    </div>
  );
};

export default Pagination;
