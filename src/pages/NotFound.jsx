import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  
  return (
    <div className="container">
      <h1>Página não encontrada</h1>
      <button className="btn-primario" onClick={() => navigate('/')}>
        Voltar para a página inicial
      </button>
    </div>
  )
}

export default NotFound