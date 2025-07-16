import { Link } from "react-router-dom";

//import { Link } from "react-router-dom"
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h3>What we do</h3>
          <ul>
            <li>
              <Link to="/features">Features</Link>
            </li>
            <li>Security</li>
          </ul>
        </div>
        <div>
          <h3>Who we are</h3>
          <ul>
            <li>About us</li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Need help?</h3>
          <ul>
            <li>Contact Us</li>
            <li>
              <Link to="help-center">Help Center</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>2025 © PersonalChat LLC</span>
      </div>
    </footer>
  );
}
export default Footer;
