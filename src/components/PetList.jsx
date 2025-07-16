import PetCard from './PetCard';
import '../styles/PetList.css';

const PetList = ({ pets, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Finding pets...</p>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="no-pets">
        <p>No pets found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="pet-list">
      <div className="results-count">
        <span>{pets.length} pets found</span>
      </div>
      
      <div className="pet-grid">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetList;
