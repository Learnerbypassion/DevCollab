import { useEffect, useState } from "react";
import { getProfile } from "../../api/user.api";
import CompleteProfileModal from "../../components/profile/CompleteProfileModal";
import { motion } from "framer-motion";
import { FaGithub, FaGlobe } from "react-icons/fa";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await getProfile();
    setUser(res.data.user);
  };

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
  <div className="min-h-screen bg-[#050510] text-white flex justify-center px-3 sm:px-6 py-4 sm:py-6">
    
    <div className="w-full max-w-4xl space-y-4 sm:space-y-6">

      {/* 🔥 Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
      >
        <div className="bg-[#0b0b1f]/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/10 
        flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">

          {/* Avatar */}
          <img
            src={user.profileImage || "https://i.pravatar.cc/100"}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
          />

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {user.name}
            </h2>

            <p className="text-gray-400 text-xs sm:text-sm md:text-base">
              {user.email}
            </p>

            <button
              onClick={() => setOpen(true)}
              className="mt-3 sm:mt-4 w-full sm:w-auto px-4 py-2 text-sm sm:text-base rounded-lg text-black font-semibold
              bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 cursor-pointer
              hover:brightness-110 transition shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* 🧠 Bio */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400/30 to-purple-500/30">
        <div className="bg-[#0b0b1f]/80 p-4 sm:p-6 rounded-2xl border border-white/10">
          <h3 className="text-cyan-400 font-semibold mb-2 text-sm sm:text-base">
            Bio
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {user.bio || "No bio added yet"}
          </p>
        </div>
      </div>

      {/* 🏷 Skills */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-400/30 to-purple-500/30">
        <div className="bg-[#0b0b1f]/80 p-4 sm:p-6 rounded-2xl border border-white/10">
          <h3 className="text-blue-400 font-semibold mb-3 text-sm sm:text-base">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {user.skills?.length > 0 ? (
              user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs sm:text-sm rounded-full
                  bg-white/5 border border-white/10
                  hover:border-cyan-400 hover:text-cyan-400
                  transition whitespace-nowrap"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills added</p>
            )}
          </div>
        </div>
      </div>

      {/* 🔗 Links */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-r from-purple-400/30 to-cyan-400/30">
        <div className="bg-[#0b0b1f]/80 p-4 sm:p-6 rounded-2xl border border-white/10">
          <h3 className="text-purple-400 font-semibold mb-3 text-sm sm:text-base">
            Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            
            {user.github && (
              <a
                href={user.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base rounded-lg
                bg-white/5 border border-white/10
                hover:border-white hover:bg-white/10 transition"
              >
                <FaGithub />
                GitHub
              </a>
            )}

            {user.portfolio && (
              <a
                href={user.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base rounded-lg
                bg-white/5 border border-white/10
                hover:border-white hover:bg-white/10 transition"
              >
                <FaGlobe />
                Portfolio
              </a>
            )}

            {!user.github && !user.portfolio && (
              <p className="text-gray-500 text-sm">No links added</p>
            )}
          </div>
        </div>
      </div>

    </div>

    {/* Modal */}
    {open && (
      <CompleteProfileModal
        user={user}
        onClose={() => setOpen(false)}
        refresh={fetchUser}
      />
    )}
  </div>
);
}