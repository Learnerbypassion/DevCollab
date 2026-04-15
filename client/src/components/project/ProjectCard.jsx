import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleCollabClick = () => {
    navigate("/collabs", {
      state: {
        projectId: project._id,
        receiverId: project.owner?._id,
      },
    });
  };

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 
                    hover:border-gray-500 hover:shadow-lg transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-start">
        <Link
          to={`/projects/${project._id}`}
          className="text-lg font-semibold text-blue-400 hover:underline"
        >
          {project.title}
        </Link>

        <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded">
          Active
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mt-2 line-clamp-3">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-3">
        {project.techStack?.map((tech, index) => (
          <span
            key={index}
            className="text-xs bg-[#161b22] border border-[#30363d] 
                       px-2 py-1 rounded-md text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-4 text-sm">
        <a
          href={project.githubRepo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-gray-300 hover:text-white"
        >
          <FaGithub /> Code
        </a>

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-gray-300 hover:text-white"
          >
            <FaExternalLinkAlt /> Live
          </a>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">

        {/* Owner */}
        <div className="flex items-center gap-2">
          <img
            src={
              project.owner?.profileImage ||
              `https://ui-avatars.com/api/?name=${project.owner?.name}`
            }
            alt="avatar"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-xs text-gray-400">
            {project.owner?.name}
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          <span className="text-xs text-gray-500">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>

          <button
            onClick={handleCollabClick}
            className="text-xs px-3 py-1 cursor-pointer bg-cyan-500/20 text-cyan-400 
                       rounded-md hover:bg-cyan-500/30 transition"
          >
            Collab
          </button>

        </div>
      </div>
    </div>
  );
}