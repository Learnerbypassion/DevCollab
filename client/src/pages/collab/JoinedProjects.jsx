import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJoinedProjects } from "../../api/collab.api";

export default function JoinedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedProjects = async () => {
      try {
        const res = await getJoinedProjects();
        setProjects(res?.data?.projects || []);
      } catch (error) {
        console.error("Failed to fetch joined projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Joined projects</h1>
          <p className="mt-1 text-sm text-gray-400">
            Keep track of the projects where you are currently collaborating.
          </p>
        </div>

        <Link
          to="/collabs"
          className="rounded-xl border border-white/10 bg-[#0c0c1a] px-4 py-2 text-sm text-gray-200 transition hover:border-cyan-400/40 hover:text-white"
        >
          Back to hub
        </Link>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-6 text-sm text-gray-400">
          Loading joined projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0c0c1a] p-8 text-center text-sm text-gray-400">
          You have not joined any projects yet.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="rounded-2xl border border-white/10 bg-[#0c0c1a] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {project.description || "No description provided."}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">
                  {project.status || "Active"}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Recently added"}
                </span>
                <Link
                  to={`/projects/${project._id}`}
                  className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  Open project
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
