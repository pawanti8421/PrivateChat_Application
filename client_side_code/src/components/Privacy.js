import "./Features.css";
import { FaShieldAlt, FaLock, FaEyeSlash, FaUserSecret, FaBan } from "react-icons/fa";

const privacyItems = [
  { icon: <FaLock />, title: "End-to-End Encryption", desc: "Only you and the person you’re talking to can read what is sent." },
  { icon: <FaShieldAlt />, title: "Two-step Verification", desc: "Add extra security with a second layer of protection." },
  { icon: <FaEyeSlash />, title: "Control Who Sees You", desc: "Decide who can see your last seen, status, and profile photo." },
  { icon: <FaUserSecret />, title: "Disappearing Messages", desc: "Set messages to disappear after a chosen duration." },
  { icon: <FaBan />, title: "Block & Report", desc: "Easily block or report unwanted contacts to protect yourself." },
];


function Privacy({ showPrivacy }) {
  return (
    <div className="features-grid">
      {privacyItems.map((item, i) => (
        <div className="feature-card" key={i}>
          <div className="feature-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Privacy;
