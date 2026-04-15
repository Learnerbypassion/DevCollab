import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

/* 🔹 Animations */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const slide = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

/* 🔢 OTP Input */
const OTPInput = ({ otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (value, i) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);

    if (value && i < 3) inputs.current[i + 1].focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1].focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          maxLength={1}
          className="w-12 h-14 text-center text-xl rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none transition"
        />
      ))}
    </div>
  );
};

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");

  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ⏱️ Timer */
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer, step]);

  /* 🔹 Handlers */
  const sendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/forgot-password", { email });
      setStep(2);
      setTimer(30);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/validate-forgot-password-otp", {
        email,
        otp: otp.join(""),
      });
      setStep(3);
    } catch {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetNewPassword = async () => {
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/create-new-password", {
        email,
        newPassword,
      });
      alert("Password Changed Successfully")
      navigate("/login");
    } catch {
      setError("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    console.log("Clicked");
    
    await API.post("/auth/resend-otp", { email });
    setTimer(30);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen flex items-center justify-center bg-[#050510] relative overflow-hidden"
    >
      {/* 🌌 Background */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />

      {/* 💎 Card */}
      <div className="relative w-full max-w-md p-[1px] rounded-2xl bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500">
        <div className="bg-[#0b0b1f]/80 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl">

          <h1 className="text-center text-2xl font-bold text-cyan-400 mb-6">
            Password Recovery
          </h1>

          {/* ❌ Error */}
          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <AnimatePresence mode="wait">

            {/* 📧 STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slide}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                />

                <button
                  onClick={sendOtp}
                  className="w-full py-3 rounded-xl bg-linear-to-r from-cyan-400 to-blue-500 text-black font-bold"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </motion.div>
            )}

            {/* 🔢 STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={slide}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                <OTPInput otp={otp} setOtp={setOtp} />

                <button
                  onClick={verifyOtp}
                  className="w-full py-3 rounded-xl bg-linear-to-r from-cyan-400 to-blue-500 text-black font-bold"
                >
                  Verify OTP
                </button>

                <p className="text-center text-sm text-gray-400">
                  {timer > 0 ? (
                    `Resend in ${timer}s`
                  ) : (
                    <span
                      onClick={resendOtp}
                      className="text-cyan-400 cursor-pointer"
                    >
                      Resend OTP
                    </span>
                  )}
                </p>
              </motion.div>
            )}

            {/* 🔑 STEP 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={slide}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-4"
              >
                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                />

                <button
                  onClick={resetNewPassword}
                  className="w-full py-3 rounded-xl bg-linear-to-r from-cyan-400 to-blue-500 text-black font-bold"
                >
                  Update Password
                </button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* 🔙 Back */}
          <p
            onClick={() => navigate("/login")}
            className="text-center text-sm text-gray-500 mt-6 cursor-pointer hover:text-cyan-400"
          >
            ← Back to Login
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;