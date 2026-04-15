import { useState } from "react";
import API from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/reset-password", { email, password });
      alert("Password updated");
      navigate("/login");
    } catch {
      alert("Error resetting password");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="card">
        <h1>New Password</h1>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Update Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;