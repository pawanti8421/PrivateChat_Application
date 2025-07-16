import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login({ showLogin, setShowLogin }) {
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");

  const handleLogin = () => {
    const formData = {
      email: email.current.value,
      password: password.current.value,
    };

    axios
      .post("http://localhost:8000/api/v1/users/login", formData, {
        withCredentials: true,
      })
      .then((data) => {
        alert(data.data.message);

        const userId = data.data.data.user._id;
        navigate(`/chatpage/${userId}`);
      })
      .catch((error) => {
        alert(error.response?.data.message);
      });
  };

  return (
    <>
      <div className="modal">
        <div className="modal-box">
          <h2>Login</h2>
          <input type="email" placeholder="Email" ref={email} />
          <input type="password" placeholder="Password" ref={password} />
          <button className="btn-primary" onClick={handleLogin}>
            Log In
          </button>
          <button onClick={() => navigate("/")} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
export default Login;
