import RatingStars from "./RatingStars"

function ProductCard({ name, description, price, originalPrice,
  rating, reviews, inStock, category, image }) {

  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : null

  function handleAddToCart() {
    if (inStock) {
      alert(`Added "${name}" to cart! Price: $${price.toFixed(2)}`)
    }
  }

  return (
    <div className={`product-card${!inStock ? " unavailable" : ""}`}>

      <div className="img-wrapper">
        <img src={image} alt={name} className="product-img" />
        <span className={`badge ${inStock ? "badge-green" : "badge-red"}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
        {discount && (
          <span className="discount-badge">-{discount}%</span>
        )}
      </div>

      <div className="card-body">
        <span className="category">{category}</span>
        <h3>{name}</h3>
        <p className="description">{description}</p>
        <RatingStars rating={rating} reviews={reviews} />
      </div>

      <div className="card-footer">
        <div className="price-block">
          <strong className="price">${price.toFixed(2)}</strong>
          {originalPrice && (
            <span className="original-price">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button onClick={handleAddToCart}
          disabled={!inStock} className="add-btn">
          {inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>

    </div>
  )
}

export default ProductCard