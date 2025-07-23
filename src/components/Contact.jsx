import React from 'react';

const Contact = () => (
  <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #0001', padding: 32 }}>
    <h2>Contact Us</h2>
    <p>
      Have questions, feedback, or want to get in touch?
    </p>
    <ul>
      <li>Email: <a href="mailto:info@findmypetfriend.com">info@findmypetfriend.com</a></li>
      <li>GitHub: <a href="https://github.com/JorgeMaldoL/FindMyPetFriend" target="_blank" rel="noopener noreferrer">FindMyPetFriend Repo</a></li>
    </ul>
    <p>
      This project is for educational/demo purposes. For real pet adoption, visit <a href="https://www.petfinder.com/" target="_blank" rel="noopener noreferrer">Petfinder.com</a>.
    </p>
  </div>
);

export default Contact;
