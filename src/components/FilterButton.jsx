const FilterButton = ({ category, active, onClick }) => {
  return (
    <button 
      className={`filtro-btn ${active ? 'ativo' : ''}`}
      onClick={() => onClick(category)}
      aria-pressed={active}
    >
      {category}
    </button>
  );
};

export default FilterButton;