import { useState, useContext } from "react";
import { login } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* 🔹 Animations */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const cardAnim = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* 🔹 Floating Input */
const InputField = ({ label, type, name, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div variants={item} className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value !== "")}
        className="peer w-full px-4 pt-5 pb-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
        placeholder={label}
      />

      <label
        className={`absolute left-4 transition-all text-sm pointer-events-none
        ${focused ? "top-1 text-xs text-cyan-400" : "top-3 text-gray-500"}`}
      >
        {label}
      </label>
    </motion.div>
  );
};

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form);
      await fetchUser();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden"
    >
      {/* 🌌 Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] rounded-full top-[-200px] left-[-200px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-[-150px] right-[-150px]"
      />

      {/* 💎 Card */}
      <motion.div
        variants={cardAnim}
        className="relative w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
      >
        <div className="bg-[#0b0b1f]/80 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl">
          {/* Logo */}
          <motion.h1
            variants={item}
            className="text-center text-3xl font-extrabold tracking-widest text-cyan-400 mb-2"
          >
            DEV-COLLAB
          </motion.h1>

          <motion.p
            variants={item}
            className="text-center text-gray-400 text-sm mb-8"
          >
            Secure Access Portal
          </motion.p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: [0, -10, 10, -6, 6, 0] }}
              className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={container}
            className="space-y-5"
          >
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <div className="relative">
              <div className="relative">
                <InputField
                  label="Password"
                  type={showPw ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />

                {/* Show Password */}
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-4 text-gray-400 hover:text-cyan-400 text-xs tracking-wider"
                >
                  {showPw ? "HIDE" : "SHOW"}
                </button>
              </div>

              {/* 🔑 Forgot Password */}
              <motion.div variants={item} className="flex justify-end">
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs mt-2 text-gray-400 hover:text-cyan-400 cursor-pointer transition"
                >
                  Forgot Password?
                </span>
              </motion.div>
            </div>

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold tracking-wider text-black 
              bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500
              shadow-[0_0_30px_rgba(0,255,255,0.3)] transition"
            >
              {loading ? "Authenticating..." : "SIGN IN"}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.p
            variants={item}
            className="text-center text-gray-500 text-sm mt-6"
          >
            No account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-400 cursor-pointer hover:underline"
            >
              Create one →
            </span>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
