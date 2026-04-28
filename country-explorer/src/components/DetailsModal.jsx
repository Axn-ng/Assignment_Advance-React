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
        <p><strong>ชื่ออย่างเป็นทางการ:</strong> {country.name.official}</p>
        <p><strong>สกุลเงิน:</strong> {currencies}</p>
        <p><strong>ภาษา:</strong> {languages}</p>
        <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
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