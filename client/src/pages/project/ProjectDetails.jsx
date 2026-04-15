import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getProjectById,
  deleteProject,
} from "../../api/project.api";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      const res = await getProjectById(projectId);
      setProject(res.data.project);
    }
    fetchProject();
  }, [projectId]);

  const handleDelete = async () => {
    await deleteProject(projectId);
    navigate("/projects");
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl">{project.title}</h1>

      <p className="text-gray-400 mt-2">
        {project.description}
      </p>

      <div className="mt-4 flex gap-2">
        {project.techStack?.map((tech, i) => (
          <span key={i} className="bg-white/10 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 space-x-4">
        <a href={project.githubRepo} target="_blank">
          GitHub
        </a>

        {project.liveLink && (
          <a href={project.liveLink} target="_blank">
            Live
          </a>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          to={`/projects/edit/${project._id}`}
          className="bg-yellow-500 px-4 py-2 rounded"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}