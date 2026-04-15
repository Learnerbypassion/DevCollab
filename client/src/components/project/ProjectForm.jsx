import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectForm({ onSubmit, initialData = {}, loading }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubRepo: "",
    liveLink: "",
  });

  useEffect(() => {
    if (!initialData || !initialData._id) return;

    setForm({
      title: initialData.title || "",
      description: initialData.description || "",
      techStack: initialData.techStack?.join(", ") || "",
      githubRepo: initialData.githubRepo || "",
      liveLink: initialData.liveLink || "",
    });
  }, [initialData?._id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((t) => t.trim()),
    };

    onSubmit(payload);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 rounded-3xl 
                 bg-white/5 backdrop-blur-xl 
                 border border-white/10 
                 shadow-[0_0_40px_rgba(0,0,0,0.5)] 
                 space-y-6"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          🚀 Create Your Project
        </h1>
        <p className="text-gray-400 text-sm">
          Showcase your work and collaborate with others
        </p>
      </div>

      {/* TITLE */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">Project Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Awesome AI SaaS..."
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 
                     focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 
                     outline-none transition"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">Description</label>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Explain what your project does..."
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 
                     focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 
                     outline-none transition"
        />
      </div>

      {/* TECH STACK */}
      <div className="space-y-1">
        <label className="text-sm text-gray-400">Tech Stack</label>
        <input
          type="text"
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 
                     focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 
                     outline-none transition"
        />

        {/* Preview Chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          {form.techStack
            .split(",")
            .map((tech, i) =>
              tech.trim() ? (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full 
                             bg-linear-to-r from-cyan-500/20 to-purple-500/20 
                             border border-white/10 text-gray-300"
                >
                  {tech.trim()}
                </span>
              ) : null
            )}
        </div>
      </div>

      {/* LINKS */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* GITHUB */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <FaGithub /> GitHub Repo *
          </label>
          <input
            type="text"
            name="githubRepo"
            value={form.githubRepo}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 
                       focus:border-gray-400 outline-none"
          />
        </div>

        {/* LIVE */}
        <div className="space-y-1">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <FaExternalLinkAlt /> Live Link
          </label>
          <input
            type="text"
            name="liveLink"
            value={form.liveLink}
            onChange={handleChange}
            placeholder="https://yourapp.com"
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 
                       focus:border-green-400 outline-none"
          />
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        disabled={loading}
        className="w-full py-3 rounded-xl font-semibold text-black
                   bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500
                   shadow-lg hover:shadow-cyan-500/30 transition"
      >
        {loading ? "Processing..." : "🚀 Submit Project"}
      </motion.button>
    </motion.form>
  );
}