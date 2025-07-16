import { useNavigate } from "react-router-dom";

function HeroSection({ setShowLogin, setShowRegister }) {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Messaging made personal. Talk freely, talk securely.</h1>
        <p>
          Your private space to connect — secure, personal, instant and
          distraction-free. Chat seamlessly and securely with your friends,
          colleagues, or anyone across the globe.
        </p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/login")}>Log in</button>
          <button onClick={() => navigate("/registration")}>Register</button>
        </div>
      </div>
      <div className="hero-right">
        <img src="/images/herossectionimage.webp" alt="HeroImage" />
      </div>
    </section>
  );
}
export default HeroSection;
