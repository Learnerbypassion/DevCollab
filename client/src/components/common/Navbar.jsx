import { motion } from "framer-motion";
import { Menu } from "lucide-react";

export default function Navbar({ onProfileClick, user, onMenuClick }) {
  return (
    <div className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-6 
    border-b border-white/10 bg-[#0b0b1f]/70 backdrop-blur-xl">

      {/* Left */}
      <div className="flex items-center gap-3">

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 
          hover:bg-white/10 transition"
        >
          <Menu size={18} />
        </button>

        {/* Title */}
        <h2 className="text-sm sm:text-lg font-semibold text-gray-300 tracking-wide">
          Dashboard
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* 🟢 Status Dot */}
        <div className="w-2 h-2 bg-green-400 rounded-full 
        shadow-[0_0_10px_rgba(0,255,0,0.8)]"></div>

        {/* 👤 Profile */}
        <motion.div
          onClick={onProfileClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1 rounded-xl 
          bg-white/5 border border-white/10 cursor-pointer
          hover:bg-white/10 transition"
        >
          <img
            src={user?.profileImage || "https://i.pravatar.cc/40"}
            alt="profile"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/40";
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-white/20"
          />

          {/* Hide name on very small screens */}
          <span className="hidden xs:block text-xs sm:text-sm text-gray-200">
            {user?.name || "Loading..."}
          </span>
        </motion.div>
      </div>
    </div>
  );
}