import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout({ logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post(
        "https://privatechat-server.onrender.com/api/v1/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((data) => {
        alert(data.data.message);
        navigate("/");
      })
      .catch((error) => {
        alert(error.response?.data.message);
      });
  };
  return (
    <>
      {logout && (
        <div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Logout;
