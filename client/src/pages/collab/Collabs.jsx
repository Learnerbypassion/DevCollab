import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BellRing, FolderGit2, Sparkles } from "lucide-react";
import {
  getJoinedProjects,
  getReceivedRequests,
  sendCollabRequest,
} from "../../api/collab.api";

export default function Collabs() {
  const location = useLocation();
  const [form, setForm] = useState({
    projectId: location.state?.projectId || "",
    message: "",
  });
  const [summary, setSummary] = useState({ requests: 0, joined: 0 });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const [requestsRes, joinedRes] = await Promise.all([
          getReceivedRequests(),
          getJoinedProjects(),
        ]);

        setSummary({
          requests: requestsRes?.data?.data?.length || 0,
          joined: joinedRes?.data?.projects?.length || 0,
        });
      } catch (error) {
        console.error("Failed to load collaboration summary", error);
      }
    };

    loadSummary();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      if (!form.projectId.trim()) {
        throw new Error("Please enter a project ID.");
      }

      const res = await sendCollabRequest(form.projectId, form.message);
      setFeedback({
        type: "success",
        message: res?.data?.message || "Collaboration request sent successfully.",
      });
      setForm((prev) => ({ ...prev, message: "" }));
    } catch (error) {
      setFeedback({
        type: "error",
        message: error?.response?.data?.message || error.message || "Unable to send request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300">
            <Sparkles size={16} />
            Collaboration hub
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-white">
            Manage your collaboration requests
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">
            Send a request, review incoming invites, and stay connected with the projects you joined.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/collabs/requests"
            className="rounded-xl border border-white/10 bg-[#0c0c1a] px-4 py-2 text-sm text-gray-200 transition hover:border-cyan-400/40 hover:text-white"
          >
            View requests
          </Link>
          <Link
            to="/collabs/joined"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Joined projects
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-4">
          <div className="flex items-center gap-2 text-cyan-300">
            <BellRing size={18} />
            <p className="text-sm">Pending requests</p>
          </div>
          <p className="mt-3 text-2xl font-semibold text-white">{summary.requests}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-4">
          <div className="flex items-center gap-2 text-purple-300">
            <FolderGit2 size={18} />
            <p className="text-sm">Joined projects</p>
          </div>
          <p className="mt-3 text-2xl font-semibold text-white">{summary.joined}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-4">
          <p className="text-sm text-gray-400">Quick tip</p>
          <p className="mt-2 text-sm text-gray-300">
            Use the project ID from any project card to start a fresh collaboration request.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-6"
        >
          <h2 className="text-xl font-semibold text-white">Send a collaboration request</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter the project ID and a short note for the project owner.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-gray-300">Project ID</label>
              <input
                type="text"
                value={form.projectId}
                onChange={(e) => setForm((prev) => ({ ...prev, projectId: e.target.value }))}
                placeholder="Enter project ID"
                className="w-full rounded-xl border border-white/10 bg-[#050510] px-3 py-2 text-sm text-white outline-none ring-0"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Message</label>
              <textarea
                rows="4"
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Tell the owner what you can contribute..."
                className="w-full rounded-xl border border-white/10 bg-[#050510] px-3 py-2 text-sm text-white outline-none ring-0"
              />
            </div>
          </div>

          {feedback.message ? (
            <div
              className={`mt-4 rounded-xl px-3 py-2 text-sm ${
                feedback.type === "success"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-rose-500/15 text-rose-300"
              }`}
            >
              {feedback.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send request"}
            <ArrowRight size={16} />
          </button>
        </motion.form>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-6">
          <h3 className="text-lg font-semibold text-white">How this section works</h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>• Review incoming requests from project owners.</li>
            <li>• Accept or reject requests without leaving the dashboard.</li>
            <li>• Track the projects you have already joined.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
