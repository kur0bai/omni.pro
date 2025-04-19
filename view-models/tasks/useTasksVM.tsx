import { useEffect, useRef, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "@/services/task.service";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { TaskPriority, TaskStatus } from "@/interfaces/task.interface";
import toast from "react-hot-toast";
import { useTaskStore } from "@/store/tasks.store";
import { FormikProps } from "formik";
import { useProjectsStore } from "@/store/projects.store";

export default function useTasksVM() {
  const {
    tasks,
    filteredTasks,
    selectedTask,
    isLoading,
    priorityFilter,
    statusFilter,
    setTasks,
    setFilteredTasks,
    setIsLoading,
    setPriorityFilter,
    setStatusFilter,
    setShowModal,
    mode,
  } = useTaskStore();

  const { selectedProject } = useProjectsStore();

  const [userId, setUserId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const initialValues = {
    title: selectedTask?.title || "",
    description: selectedTask?.description || "",
    priority: selectedTask?.priority || "medium",
    status: selectedTask?.status || "pending",
    dueDate: selectedTask?.dueDate
      ? new Date(selectedTask.dueDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es requerido"),
    priority: Yup.string()
      .oneOf(Object.values(TaskPriority), "Prioridad inválida")
      .required(),
    status: Yup.string()
      .oneOf(Object.values(TaskStatus), "Estado inválido")
      .required(),
    dueDate: Yup.date()
      .required("Fecha de expiración requerida")
      .min(new Date(), "La fecha debe ser en el futuro"),
  });

  const handleCreate = async (values: any) => {
    const { title, description, priority, status, dueDate } = values;
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    if (!title || !description || !priority || !status || !dueDate) return;
    if (!selectedProject) {
      toast.error("Selecciona un proyecto");
      return;
    }

    if (userId) {
      try {
        setIsLoading(true);
        await createTask(
          title,
          description,
          dueDate,
          priority,
          status,
          userId,
          selectedProject?.id || ""
        );
        fetchTasks(userId);
        toast.success("Tarea creada con éxito");
        setShowModal(false);
      } catch (error) {
        toast.error("Error al crear la tarea");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = async (values: any) => {
    const { title, description, priority, status, dueDate } = values;
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    if (!title || !description || !priority || !status || !dueDate) return;
    if (userId) {
      try {
        setIsLoading(true);
        await updateTask({
          taskId: selectedTask?.id ?? "",
          title,
          description,
          priority,
          status,
          dueDate,
        });
        fetchTasks(userId);
        toast.success("Tarea actualizada con éxito");
        setShowModal(false);
      } catch (error) {
        toast.error("Error al actualizar la tarea");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = (values: any) => {
    if (selectedTask) {
      handleUpdate(values);
    } else {
      handleCreate(values);
    }
  };

  const handleDelete = async (taskId: string) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    try {
      await deleteTask(taskId);
      await fetchTasks(userId);
      toast.success("Tarea eliminada con éxito");
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    }
  };

  const formikRef = useRef<FormikProps<any>>(null);
  const resetForm = () => {
    formikRef.current?.resetForm();
  };

  //apply some filters
  const applyFilters = (tasksToFilter: any[]) => {
    let tempTasks = [...tasksToFilter];
    if (priorityFilter !== "all") {
      tempTasks = tempTasks.filter((task) => task.priority === priorityFilter);
    }
    if (statusFilter !== "all") {
      tempTasks = tempTasks.filter((task) => task.status === statusFilter);
    }
    setFilteredTasks(tempTasks);
  };

  const fetchTasks = async (uid: string) => {
    setIsLoading(true);
    try {
      const fetchedTasks = await getTasks(uid, selectedProject?.id ?? "");
      setTasks(fetchedTasks);
      applyFilters(fetchedTasks);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchTasks(user.uid);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    applyFilters(tasks);
  }, [priorityFilter, statusFilter, tasks]);

  // clear and set selected task depending on the mode :D
  const syncFormWithSelectedTask = () => {
    if (!formikRef.current) return;

    if (mode === "edit" && selectedTask) {
      formikRef.current.resetForm({
        values: {
          title: selectedTask.title || "",
          description: selectedTask.description || "",
          priority: selectedTask.priority || "medium",
          status: selectedTask.status || "pending",
          dueDate: selectedTask.dueDate
            ? new Date(selectedTask.dueDate).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10),
        },
      });
    } else if (mode === "create") {
      formikRef.current.resetForm({
        values: {
          title: "",
          description: "",
          priority: "medium",
          status: "pending",
          dueDate: new Date().toISOString().slice(0, 10),
        },
      });
    }
  };

  useEffect(() => {
    syncFormWithSelectedTask();
  }, [selectedTask, mode]);

  useEffect(() => {
    if (selectedProject) {
      const userId = auth.currentUser?.uid;
      if (userId) {
        fetchTasks(userId);
      }
    }
  }, [selectedProject]);

  return {
    tasks,
    filteredTasks,
    handleCreate,
    title,
    setTitle,
    description,
    setDescription,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    userId,
    setUserId,
    setTasks,
    router,
    initialValues,
    validationSchema,
    handleSubmit,
    selectedTask,
    handleDelete,
    isLoading,
    resetForm,
    formikRef,
  };
}
