import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import StatsSummary from './components/StatsSummary';
import PetList from './components/PetList';
import usePetfinderAPI from './hooks/usePetfinderAPI';
import './App.css';

function App() {
  console.log('App component is rendering!');
  
  const petData = usePetfinderAPI();
  console.log('Hook data:', petData);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    species: '',
    gender: '',
    age: ''
  });

  const { pets, loading, searchByLocation, refreshPets, loadMorePets, currentPage, totalPages } = petData;

  const filteredPets = useMemo(() => {
    let result = pets;
    
    if (searchTerm) {
      result = result.filter(pet => {
        const nameMatch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
        const breedMatch = pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
        const breedMatch2 = pet.breeds && pet.breeds.primary && pet.breeds.primary.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || breedMatch || breedMatch2;
      });
    }

    if (filters.species) {
      result = result.filter(pet => pet.species === filters.species);
    }
    if (filters.gender) {
      result = result.filter(pet => pet.gender === filters.gender);
    }
    if (filters.age) {
      result = result.filter(pet => pet.age === filters.age);
    }

    return result;
  }, [pets, searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({
        species: '',
        gender: '',
        age: ''
      });
      setSearchTerm('');
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const handleLocationSearch = (zipCode, address) => {
    searchByLocation(zipCode, address);
  };

  const handleRefresh = () => {
    refreshPets();
  };

  const handleLoadMore = () => {
    loadMorePets();
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="search-section">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <FilterBar 
            filters={filters}
            onFilterChange={handleFilterChange}
            onLocationSearch={handleLocationSearch}
            onRefresh={handleRefresh}
            onLoadMore={handleLoadMore}
          />
        </div>

        <StatsSummary pets={filteredPets} />
        
        <PetList pets={filteredPets} loading={loading} />
        
        <div className="pagination-info">
          <p>Page {currentPage} of {totalPages}</p>
          {currentPage < totalPages && (
            <button onClick={handleLoadMore} className="load-more-main">
              Load More Pets ({totalPages - currentPage} pages left)
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
