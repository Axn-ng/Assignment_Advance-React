export default function DetailsModal({ country, onClose }) {
  if (!country) return null;

  const currencies = country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A';
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>✖</button>
        <img src={country.flags.svg} alt="Flag" className="modal-img" />
        
        <h2>{country.name.common}</h2>
        <p style={{ color: '#64748b', marginTop: 0 }}>{country.name.official}</p>
        
        <div className="modal-info-grid">
          <p><strong>สกุลเงิน</strong> <span>{currencies}</span></p>
          <p><strong>ภาษา</strong> <span>{languages}</span></p>
          <p><strong>เขตเวลา</strong> <span>{country.timezones[0]}</span></p>
          <p><strong>ภูมิภาค</strong> <span>{country.region}</span></p>
        </div>

        <a 
          href={country.maps.googleMaps} 
          target="_blank" 
          rel="noreferrer"
          className="map-link"
        >
          📍 ดูตำแหน่งบน Google Maps
        </a>
      </div>
    </div>
  );
}