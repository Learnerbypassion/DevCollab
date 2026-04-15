import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../../components/project/ProjectForm";
import { getProjectById, updateProject } from "../../api/project.api";

export default function EditProject() {
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

  const handleUpdate = async (data) => {
    try {
      await updateProject(projectId, data);
      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit Project</h1>
      <ProjectForm
        initialData={project}
        onSubmit={handleUpdate}
      />
    </div>
  );
}