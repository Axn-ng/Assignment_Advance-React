export default function CountryCard({ country, isFavorite, toggleFavorite, onClick }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // ไม่ให้ทำงานซ้อนกับการกดเปิด Modal
    toggleFavorite(country.cca3);
  };

  return (
    <div className="country-card" onClick={() => onClick(country)}>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} loading="lazy" />
      <div className="card-content">
        <div className="card-header">
          <h3>{country.name.common}</h3>
          <button className="fav-btn" onClick={handleFavoriteClick}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      </div>
    </div>
  );
}