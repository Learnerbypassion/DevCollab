import { useState } from "react";
import { motion } from "framer-motion";
import { verifyEmailOtp, resendForgotOtp } from "../../api/auth.api";
import { useLocation, useNavigate } from "react-router-dom";

/* 🔹 Animations */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  /* 🔹 Handle OTP Input */
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  /* 🔹 Submit OTP */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const finalOtp = otp.join("");

    try {
      await verifyEmailOtp({ email, otp: finalOtp });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Resend OTP */
  const handleResend = async () => {
    setResendLoading(true);
    try {
      await resendForgotOtp({ email });
    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden"
    >
      {/* 🌌 Glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />

      {/* 💎 Card */}
      <motion.div className="w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
        <div className="bg-[#0b0b1f]/80 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl">

          <motion.h1
            variants={item}
            className="text-center text-3xl font-bold text-cyan-400 mb-2"
          >
            VERIFY EMAIL
          </motion.h1>

          <motion.p
            variants={item}
            className="text-center text-gray-400 text-sm mb-6"
          >
            Enter the 4-digit OTP sent to your email
          </motion.p>

          {/* ❌ Error */}
          {error && (
            <div className="mb-4 text-red-400 text-sm bg-red-500/10 p-2 rounded">
              {error}
            </div>
          )}

          {/* 🔢 OTP Inputs */}
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-14 h-14 text-center text-xl font-bold rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                />
              ))}
            </div>

            {/* 🔥 Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-black 
              bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            >
              {loading ? "Verifying..." : "VERIFY"}
            </button>
          </form>

          {/* 🔄 Resend */}
          <p className="text-center text-gray-400 text-sm mt-5">
            Didn’t receive code?{" "}
            <span
              onClick={handleResend}
              className="text-cyan-400 cursor-pointer"
            >
              {resendLoading ? "Sending..." : "Resend"}
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VerifyEmail;