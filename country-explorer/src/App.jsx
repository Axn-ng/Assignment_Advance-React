import { useState, useMemo } from 'react';
import { useFetch } from './hooks/useFetch';
import SearchBar from './components/SearchBar';
import CountryCard from './components/CountryCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import DetailsModal from './components/DetailsModal';

function App() {
  const { data: countries, loading, error } = useFetch('https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages,cca3,currencies,timezones,maps');

  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [favorites, setFavorites] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // คำนวณข้อมูลที่จะแสดงผล
  const displayedCountries = useMemo(() => {
    if (!countries) return [];
    
    let result = [...countries];

    // ค้นหา
    if (searchTerm) {
      result = result.filter(c => 
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // กรองภูมิภาค
    if (region !== 'All') {
      result = result.filter(c => c.region === region);
    }

    // จัดเรียง
    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.common.localeCompare(b.name.common);
      if (sortBy === 'name-desc') return b.name.common.localeCompare(a.name.common);
      if (sortBy === 'pop-desc') return b.population - a.population;
      if (sortBy === 'pop-asc') return a.population - b.population;
      return 0;
    });

    return result;
  }, [countries, searchTerm, region, sortBy]);

  const toggleFavorite = (countryCode) => {
    setFavorites(prev => 
      prev.includes(countryCode) 
        ? prev.filter(code => code !== countryCode) 
        : [...prev, countryCode]
    );
  };

  return (
    <div className="app-container">
      <header>
        <h1>🌍 Country Explorer</h1>
      </header>

      <div className="controls">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="All">ทุกภูมิภาค</option>
          <option value="Asia">เอเชีย (Asia)</option>
          <option value="Europe">ยุโรป (Europe)</option>
          <option value="Africa">แอฟริกา (Africa)</option>
          <option value="Americas">อเมริกา (Americas)</option>
          <option value="Oceania">โอเชียเนีย (Oceania)</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name-asc">ชื่อ (A - Z)</option>
          <option value="name-desc">ชื่อ (Z - A)</option>
          <option value="pop-desc">ประชากร (มากไปน้อย)</option>
          <option value="pop-asc">ประชากร (น้อยไปมาก)</option>
        </select>
      </div>

      <div className="stats">
        แสดง {displayedCountries.length} ประเทศ | ❤️ ชื่นชอบ: {favorites.length} แห่ง
      </div>

      {error && <p className="error-msg">❌ {error}</p>}
      
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="countries-grid">
          {displayedCountries.map(country => (
            <CountryCard 
              key={country.cca3} 
              country={country} 
              isFavorite={favorites.includes(country.cca3)}
              toggleFavorite={toggleFavorite}
              onClick={setSelectedCountry}
            />
          ))}
        </div>
      )}

      <DetailsModal 
        country={selectedCountry} 
        onClose={() => setSelectedCountry(null)} 
      />
    </div>
  );
}

export default App;