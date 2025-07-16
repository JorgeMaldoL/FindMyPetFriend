import React, { useState } from 'react';
import '../styles/FilterBar.css';

const FilterBar = ({ filters, onFilterChange, onLocationSearch, onRefresh, onLoadMore }) => {
  const { species, gender, age } = filters;

  const speciesOptions = [
    { value: "", label: "All Species" },
    { value: "Dog", label: "Dogs" },
    { value: "Cat", label: "Cats" },
    { value: "Rabbit", label: "Rabbits" },
    { value: "Bird", label: "Birds" }
  ];

  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');

  const handleSpeciesChange = (e) => {
    onFilterChange('species', e.target.value);
  };

  const handleGenderChange = (e) => {
    onFilterChange('gender', e.target.value);
  };

  const handleAgeChange = (e) => {
    onFilterChange('age', e.target.value);
  };

  const resetFilters = () => {
    onFilterChange('reset');
  };

  const handleLocationSearch = () => {
    if (zipCode || address) {
      onLocationSearch(zipCode, address);
    }
  };

  return (
    <div className="filter-container">
      <div className="location-search-section">
        <h3>Search by Location</h3>
        <div className="location-inputs">
          <input
            type="text"
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="location-input"
          />
          <input
            type="text"
            placeholder="Enter address or city"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="location-input"
          />
          <button onClick={handleLocationSearch} className="location-search-btn">
            Search Location
          </button>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">Species</label>
          <select
            value={species}
            onChange={handleSpeciesChange}
            className="filter-select"
          >
            {speciesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Gender</label>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="filter-select"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Age</label>
          <select
            value={age}
            onChange={handleAgeChange}
            className="filter-select"
          >
            <option value="">All Ages</option>
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="reset-button"
        >
          Clear filters
        </button>

        <button
          onClick={onRefresh}
          className="refresh-button"
        >
          Refresh List
        </button>

        <button
          onClick={onLoadMore}
          className="load-more-button"
        >
          Load More Pets
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
