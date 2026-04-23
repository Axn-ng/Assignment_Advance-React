import './App.css'
import products from './data/products'
import ProductCard from './components/ProductCard'

function App() {
  const availableCount = products.filter(p => p.inStock).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>GymGear Shop</h1>
        <p>{products.length} products · {availableCount} in stock</p>
      </header>
      <div className="gallery-grid">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default App