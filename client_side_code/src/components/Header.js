import { Link, useNavigate } from "react-router-dom";

function Header({ setShowLogin, setShowRegister }) {
  const navigate = useNavigate();
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">PersonalChat</Link>
      </div>
      <nav className="nav-links">
        <Link to="/features">Features</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="help-center">Help Center</Link>
      </nav>
      <div className="nav-actions">
        <button onClick={() => navigate("/login")}>Log in</button>
        <button onClick={() => navigate("/registration")}>Register</button>
      </div>
    </header>
  );
}

export default Header;
