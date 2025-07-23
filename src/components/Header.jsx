import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerData = {
    title: "Pet Finder",
    subtitle: "Find your perfect companion"
  };

  const handleLogoClick = () => {
    console.log("Logo clicked");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick}>
          <span className="logo-icon">🐾</span>
          <div className="logo-text">
            <h1>{headerData.title}</h1>
            <p className="subtitle">{headerData.subtitle}</p>
          </div>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Search</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
