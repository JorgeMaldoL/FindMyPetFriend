import '../styles/StatsSummary.css';

const StatsSummary = ({ pets }) => {
  const totalPets = pets.length;
  
  const speciesCount = pets.reduce((acc, pet) => {
    acc[pet.species] = (acc[pet.species] || 0) + 1;
    return acc;
  }, {});

  const genderCount = pets.reduce((acc, pet) => {
    acc[pet.gender] = (acc[pet.gender] || 0) + 1;
    return acc;
  }, {});

  const maleCount = genderCount['Male'] || 0;
  const femaleCount = genderCount['Female'] || 0;
  const unknownCount = genderCount['Unknown'] || 0;

  return (
    <div className="stats-container">
      <h2 className="stats-title">Pet Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalPets}</div>
          <div className="stat-label">Total Pets</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{Object.keys(speciesCount).length}</div>
          <div className="stat-label">Species Types</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{maleCount}</div>
          <div className="stat-label">Male Pets</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{femaleCount}</div>
          <div className="stat-label">Female Pets</div>
        </div>

        {unknownCount > 0 && (
          <div className="stat-card">
            <div className="stat-number">{unknownCount}</div>
            <div className="stat-label">Unknown Gender</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsSummary;
