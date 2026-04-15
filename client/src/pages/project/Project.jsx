import { useEffect, useState } from "react";
import { getAllProjects } from "../../api/project.api";
import ProjectCard from "../../components/project/ProjectCard";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      const res = await getAllProjects();
      setProjects(res.data.projects);
    }
    fetchProjects();
  }, []);

  return (
   <div className="p-6">
  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-semibold text-white">
      Explore Projects
    </h1>

    <Link
      to="/projects/create"
      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white text-sm"
    >
      + Create Project
    </Link>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects.map((project) => (
      <ProjectCard key={project._id} project={project} />
    ))}
  </div>
</div>
  );
}