import "./Features.css";
import {
  FaLock,
  FaGlobe,
  FaUsers,
  FaSmile,
  FaShieldAlt,
  FaCamera,
  FaBullhorn,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaLock />,
      title: "Message privately",
      desc: "End-to-end encryption and privacy controls.",
    },
    {
      icon: <FaGlobe />,
      title: "Stay connected",
      desc: "Message and call for free* around the world.",
    },
    {
      icon: <FaUsers />,
      title: "Connect in groups",
      desc: "Group messaging made easy.",
    },
    {
      icon: <FaSmile />,
      title: "Express yourself",
      desc: "Say it with stickers, voice, GIFs and more.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure by design",
      desc: "Layers of protection to help you stay safe.",
    },
    {
      icon: <FaCamera />,
      title: "Share your everyday",
      desc: "Share photos, videos, voice notes on Status.",
    },
    {
      icon: <FaBullhorn />,
      title: "Follow channels",
      desc: "Stay updated on topics you care about.",
    },
  ];

  return (
    <div className="features-grid">
      {features.map((f, i) => (
        <div className="feature-card" key={i}>
          <div className="feature-icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Features;
