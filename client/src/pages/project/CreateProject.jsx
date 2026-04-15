import { useNavigate } from "react-router-dom";
import ProjectForm from "../../components/project/ProjectForm";
import { createProject } from "../../api/project.api";

export default function CreateProject() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      const res = await createProject(data);
      navigate(`/projects/${res.data.project._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Create Project</h1>
      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
}