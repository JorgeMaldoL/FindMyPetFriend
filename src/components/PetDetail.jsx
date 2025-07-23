import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import '../styles/PetCard.css';

const PetDetail = ({ pets }) => {
  const { id } = useParams();
  const pet = pets.find((p) => String(p.id) === String(id));

  if (!pet) {
    return (
      <div className="pet-detail-container">
        <Header />
        <div className="pet-detail-content">
          <h2>Pet not found</h2>
          <Link to="/">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const photos = pet.photos && pet.photos.length > 0 ? pet.photos : [];
  const breed = pet.breed || pet.breeds?.primary || 'Mixed Breed';
  const location = pet.contact && pet.contact.address 
    ? `${pet.contact.address.city || ''}, ${pet.contact.address.state || ''}`.replace(', ,', ',').replace(/^,|,$/, '')
    : 'Location not available';

  return (
    <div className="pet-detail-container">
      <Header />
      <div className="pet-detail-content">
        <h2>{pet.name}</h2>
        <div className="pet-detail-gallery">
          {photos.length > 0 ? (
            photos.map((photo, idx) => (
              <img key={idx} src={photo.large || photo.medium || photo.small} alt={pet.name} className="pet-detail-photo" />
            ))
          ) : (
            <img src="https://via.placeholder.com/300x300?text=No+Photo" alt="No Photo" className="pet-detail-photo" />
          )}
        </div>
        <div className="pet-detail-info">
          <p><strong>Breed:</strong> {breed}</p>
          <p><strong>Gender:</strong> {pet.gender}</p>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Size:</strong> {pet.size}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Description:</strong> {pet.description || 'No description available.'}</p>
          <p><strong>Contact:</strong> {pet.contact?.email || 'N/A'} {pet.contact?.phone ? `| ${pet.contact.phone}` : ''}</p>
        </div>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default PetDetail;
