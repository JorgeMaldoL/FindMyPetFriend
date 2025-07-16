import '../styles/PetCard.css';

const PetCard = ({ pet }) => {
  const photoUrl = pet.photos && pet.photos.length > 0 
    ? pet.photos[0].large || pet.photos[0].medium || pet.photos[0].small
    : 'https://via.placeholder.com/300x300?text=No+Photo';

  const location = pet.contact && pet.contact.address 
    ? `${pet.contact.address.city || ''}, ${pet.contact.address.state || ''}`.replace(', ,', ',').replace(/^,|,$/, '')
    : 'Location not available';

  const breed = pet.breed || pet.breeds?.primary || 'Mixed Breed';

  const handleAdoptClick = () => {
    console.log('Adopt clicked for:', pet.name);
    alert('This would open the adoption process!');
  };

  return (
    <div className="pet-card">
      <div className="pet-image-container">
        <img 
          src={photoUrl} 
          alt={`${pet.name}`}
          className="pet-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Photo';
          }}
        />
      </div>
      
      <div className="pet-content">
        <h3 className="pet-name">{pet.name}</h3>
        <p className="pet-breed">{breed}</p>
        
        <div className="pet-info">
          <span className="info-item">{pet.gender}</span>
          <span className="info-separator">•</span>
          <span className="info-item">{pet.age}</span>
          {pet.size && (
            <>
              <span className="info-separator">•</span>
              <span className="info-item">{pet.size}</span>
            </>
          )}
        </div>
        
        <div className="pet-location">
          <span>📍 {location}</span>
        </div>
        
        <button 
          className="adopt-button"
          onClick={handleAdoptClick}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default PetCard;
