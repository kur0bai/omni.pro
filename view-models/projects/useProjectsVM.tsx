import { auth } from "@/lib/firebase";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/services/projects.service";
import { useProjectsStore } from "@/store/projects.store";
import { useTaskStore } from "@/store/tasks.store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function useProjectsCreateVM() {
  const { selectedProject, setProjects, clearSelectedProject } =
    useProjectsStore();

  const setTasks = useTaskStore((state) => state.setTasks);

  const initialValues = {
    name: selectedProject?.name || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
  });

  const fetchProjects = async (uid?: string) => {
    const userId = uid ?? auth.currentUser?.uid;
    if (!userId) return;
    const projects = await getProjects(userId);
    setProjects(projects);
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    const { name } = values;
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    if (!name) return;
    if (userId) {
      try {
        setIsLoading(true);
        if (selectedProject) {
          await updateProject(selectedProject.id, name);
          toast.success("Proyecto actualizado");
        } else {
          await createProject(name, userId);
          toast.success("Proyecto creado");
        }
        fetchProjects();
        clearSelectedProject();
      } catch (error) {
        toast.error(
          `Error al crear el proyecto: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    if (selectedProject) {
      try {
        setIsLoading(true);
        await deleteProject(selectedProject.id);
        toast.success("Proyecto eliminado");
        setTasks([]);
        fetchProjects();
        clearSelectedProject();
      } catch (error) {
        toast.error(
          `Error al eliminar el proyecto: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchProjects(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);
  return {
    initialValues,
    validationSchema,
    handleSubmit,
    handleDelete,
    isLoading,
    fetchProjects,
  };
}
