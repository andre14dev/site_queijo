import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FilterButton from '../components/FilterButton'

const HomePage = ({ order, setOrder }) => {
  const [categories] = useState(['todos', 'Queijo Fresco', 'Queijo Curado', 'Doce', 'Geleia', 'Outros'])
  const [selectedCategories, setSelectedCategories] = useState([])
  const navigate = useNavigate()

  const handleFilterClick = (category) => {
    if (category === 'todos') {
      setSelectedCategories(['todos']);
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories.filter(c => c !== 'todos'), category];
      
      setSelectedCategories(newCategories.slice(0, 2)); // Limita a 2 categorias
    }
  }
  

  const handleContinue = () => {
    if (!order.name.trim()) {
      alert('Por favor, digite seu nome')
      return
    }

    if (selectedCategories.length === 0) {
      alert('Selecione pelo menos uma categoria')
      return
    }

    setOrder({
      ...order,
      categories: selectedCategories.includes('todos') 
        ? ['todos'] 
        : selectedCategories,
      items: []
    })
    navigate('/produtos')
  }

  return (
    <div className="container">
      <h1>Catálogo de Queijos</h1>
      
      
      <div className="card">
        <div className="input-group">
          <label htmlFor="nome">Seu Nome:</label>
          <input
          type="text"
          id="nome"
          value={order.name}
          onChange={(e) => setOrder({...order, name: e.target.value})}
          placeholder="Digite seu nome completo"
          required
        />
        </div>

        <h2>Selecione até 2 categorias:</h2>
        <div className="filtros">
          {categories.map(category => (
          <FilterButton
            key={category}
            category={category}
            active={selectedCategories.includes(category)}
            onClick={handleFilterClick}
          />
        ))}
        </div>

        <button className="btn-primario" onClick={handleContinue}>
          Ver Produtos →
        </button>
      </div>
    </div>
  )


}

export default HomePage