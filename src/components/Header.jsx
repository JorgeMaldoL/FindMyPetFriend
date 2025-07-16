import '../styles/Header.css';

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
          <a href="#" className="nav-link">Search</a>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
