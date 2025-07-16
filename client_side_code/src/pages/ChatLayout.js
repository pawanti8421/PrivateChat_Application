import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ChatArea from "../components/chatarea/ChatArea";
import WelcomeMessage from "../components/WelcomeMessage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChatLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 845);
  const [activeChat, setActiveChat] = useState(null);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 845);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://privatechat-server.onrender.com/api/v1/users/current-user",
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        setUserData(data.data.data);
      })
      .catch((err) => {
        navigate("/");
      });
  }, [navigate]);

  return (
    <>
      <div className="app">
        {isMobile ? (
          activeChat === null ? (
            <Sidebar setActiveChat={setActiveChat} />
          ) : (
            <ChatArea activeChat={activeChat} setActiveChat={setActiveChat} />
          )
        ) : (
          <>
            <Sidebar setActiveChat={setActiveChat} />

            {activeChat ? (
              <ChatArea activeChat={activeChat} />
            ) : (
              <WelcomeMessage />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default ChatLayout;
