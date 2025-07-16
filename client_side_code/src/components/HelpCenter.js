import {
  FaQuestionCircle,
  FaRegFileAlt,
  FaCogs,
  FaEnvelopeOpenText,
  FaBug,
  FaPhoneAlt,
} from "react-icons/fa";

const helpItems = [
  {
    icon: <FaQuestionCircle />,
    title: "Getting Started",
    desc: "Learn how to install and start using PersonalChat on your device.",
  },
  {
    icon: <FaRegFileAlt />,
    title: "Account Management",
    desc: "Manage your profile, number, privacy settings, and more.",
  },
  {
    icon: <FaCogs />,
    title: "Settings & Preferences",
    desc: "Customize notifications, themes, chat settings and accessibility.",
  },
  {
    icon: <FaEnvelopeOpenText />,
    title: "Message Issues",
    desc: "Troubleshoot problems with sending, receiving or syncing messages.",
  },
  {
    icon: <FaBug />,
    title: "Report a Problem",
    desc: "Found a bug? Let us know and help us improve your experience.",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Contact Support",
    desc: "Still need help? Reach out to our support team directly.",
  },
];

function HelpCenter() {
  return (
    <div className="features-grid">
      {helpItems.map((item, i) => (
        <div className="feature-card" key={i}>
          <div className="feature-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default HelpCenter;
