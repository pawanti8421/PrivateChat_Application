import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";

function Registration({ setShowRegister, showRegister }) {
  const navigate = useNavigate();
  const name = useRef("");
  const phone = useRef("");
  const email = useRef("");
  const password = useRef("");

  const [enteredOtp, setEnteredOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [result, setResult] = useState("");
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);

  const verifyOtp = (e) => {
    const currentValue = e.target.value;
    setEnteredOtp(currentValue);

    if (currentValue === serverOtp) {
      setResult("correct");
      setServerOtp("");
      setIsEmailDisabled(true);
    } else {
      setResult("incorrect");
    }
  };

  const handleOtp = () => {
    const formData = {
      name: name.current.value,
      email: email.current.value,
    };

    axios
      .post("http://localhost:8000/api/v1/users/send-otp", formData)
      .then((data) => {
        setServerOtp(data.data.data);
        alert(data.data.message);
      })
      .catch((err) => {
        alert(err.response?.data.message);
      });
  };

  const handleRegister = () => {
    if (result !== "correct") {
      alert("Please verify OTP first.");
      return;
    }
    setResult(false);

    const formData = {
      name: name.current.value,
      phone: phone.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    axios
      .post("http://localhost:8000/api/v1/users/register", formData)
      .then((data) => {
        alert(data.data.message);
        navigate(`/`);
      })
      .catch((err) => {
        alert(err.response?.data.message);
      });
  };

  return (
    <>
      <div className="modal">
        <div className="modal-box">
          <h2>Register</h2>
          <input type="text" placeholder="Full Name" ref={name} />
          <input type="text" placeholder="Mobile Number" ref={phone} />
          <input
            type="email"
            placeholder="Email"
            ref={email}
            disabled={isEmailDisabled}
          />
          <button className="btn-primary" onClick={handleOtp}>
            Send OTP
          </button>
          <input
            type="text"
            placeholder="Enter OTP"
            value={enteredOtp}
            onChange={verifyOtp}
          />
          {result === "correct" && (
            <p style={{ color: "green" }}>Otp is Correct</p>
          )}
          {result === "incorrect" && (
            <p style={{ color: "red" }}>Otp is Incorrect</p>
          )}
          <input type="password" placeholder="Password" ref={password} />
          <button className="btn-primary" onClick={handleRegister}>
            Sign Up
          </button>
          <button onClick={() => navigate("/")} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
export default Registration;
