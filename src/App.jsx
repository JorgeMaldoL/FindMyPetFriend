
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import usePetfinderAPI from './hooks/usePetfinderAPI';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import StatsSummary from './components/StatsSummary';
import PetList from './components/PetList';
import DashboardCharts from './components/DashboardCharts.jsx';
import PetDetail from './components/PetDetail';
import './App.css';

const Dashboard = ({ petData, searchTerm, setSearchTerm, filters, setFilters, handleFilterChange, handleLocationSearch, handleRefresh, handleLoadMore, filteredPets }) => (
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
    <DashboardCharts pets={filteredPets} />
    <PetList pets={filteredPets} loading={petData.loading} />
    <div className="pagination-info">
      <p>Page {petData.currentPage} of {petData.totalPages}</p>
      {petData.currentPage < petData.totalPages && (
        <button onClick={handleLoadMore} className="load-more-main">
          Load More Pets ({petData.totalPages - petData.currentPage} pages left)
        </button>
      )}
    </div>
  </main>
);

function App() {
  const petData = usePetfinderAPI();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState({ species: '', gender: '', age: '' });
  const { pets, searchByLocation, refreshPets, loadMorePets } = petData;

  const filteredPets = React.useMemo(() => {
    let result = pets;
    if (searchTerm) {
      result = result.filter(pet => {
        const nameMatch = pet.name.toLowerCase().includes(searchTerm.toLowerCase());
        const breedMatch = pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
        const breedMatch2 = pet.breeds && pet.breeds.primary && pet.breeds.primary.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || breedMatch || breedMatch2;
      });
    }
    if (filters.species) result = result.filter(pet => pet.species === filters.species);
    if (filters.gender) result = result.filter(pet => pet.gender === filters.gender);
    if (filters.age) result = result.filter(pet => pet.age === filters.age);
    return result;
  }, [pets, searchTerm, filters]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({ species: '', gender: '', age: '' });
      setSearchTerm('');
    } else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };
  const handleLocationSearch = (zipCode, address) => searchByLocation(zipCode, address);
  const handleRefresh = () => refreshPets();
  const handleLoadMore = () => loadMorePets();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <Dashboard 
            petData={petData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            handleFilterChange={handleFilterChange}
            handleLocationSearch={handleLocationSearch}
            handleRefresh={handleRefresh}
            handleLoadMore={handleLoadMore}
            filteredPets={filteredPets}
          />
        } />
        <Route path="/pet/:id" element={<PetDetail pets={pets} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
