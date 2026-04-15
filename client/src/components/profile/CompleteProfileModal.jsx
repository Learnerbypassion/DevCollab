import { useState } from "react";
import { completeProfile } from "../../api/user.api";
import { motion } from "framer-motion";

export default function CompleteProfileModal({ user, onClose, refresh }) {
  const [form, setForm] = useState({
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "",
    github: user?.github || "",
    portfolio: user?.portfolio || "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file)); // 🔥 preview
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("bio", form.bio);
      formData.append("github", form.github);
      formData.append("portfolio", form.portfolio);

      // ✅ safer skills parsing
      const skillsArray = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      formData.append("skills", JSON.stringify(skillsArray));

      if (image) {
        formData.append("profileImage", image);
      }

      await completeProfile(formData);

      await refresh(); // 🔥 important
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-105 p-px rounded-2xl bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500"
      >
        <div className="bg-[#0b0b1f] p-6 rounded-2xl border border-white/10">
          
          <h2 className="text-xl font-bold text-cyan-400 mb-4">
            Complete Profile
          </h2>

          {/* Error */}
          {error && (
            <div className="text-red-400 text-sm mb-3">
              {error}
            </div>
          )}

          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <label className="cursor-pointer">
              <img
                src={preview || "https://i.pravatar.cc/100"}
                className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400"
              />
              <input
                type="file"
                hidden
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            <input
              name="bio"
              placeholder="Bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white"
            />

            <input
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white"
            />

            <input
              name="github"
              placeholder="GitHub link"
              value={form.github}
              onChange={handleChange}
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white"
            />

            <input
              name="portfolio"
              placeholder="Portfolio link"
              value={form.portfolio}
              onChange={handleChange}
              className="w-full p-2 bg-white/5 border border-white/10 rounded text-white"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 rounded-lg font-semibold text-black
              bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500
              shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}