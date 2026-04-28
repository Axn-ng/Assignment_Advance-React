import { useRef } from 'react';

export default function SearchBar({ searchTerm, onSearch }) {
  const inputRef = useRef(null);

  const handleClear = () => {
    onSearch('');
    inputRef.current.focus(); 
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="ค้นหาประเทศ..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      {searchTerm && (
        <button onClick={handleClear} className="clear-btn" title="ล้างการค้นหา">
          ❌
        </button>
      )}
    </div>
  );
}