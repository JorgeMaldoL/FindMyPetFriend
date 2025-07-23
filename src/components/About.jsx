import React from 'react';

const About = () => (
  <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #0001', padding: 32 }}>
    <h2>About FindMyPetFriend</h2>
    <p>
      <strong>FindMyPetFriend</strong> helps you discover adoptable pets from the Petfinder API. Use the dashboard to search, filter, and view pets by species, gender, and age group. The charts provide insights into the current pet population, and you can click any pet card for more details.
    </p>
    <ul>
      <li>Search and filter by name, breed, species, gender, and age.</li>
      <li>View summary statistics and interactive charts.</li>
      <li>See detailed info and photo galleries for each pet.</li>
    </ul>
    <p>
      Data is sourced live from <a href="https://www.petfinder.com/developers/" target="_blank" rel="noopener noreferrer">Petfinder API</a>.
    </p>
  </div>
);

export default About;
