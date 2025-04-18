import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "@/services/task.service";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { TaskPriority, TaskStatus, ITask } from "@/interfaces/task.interface";
import toast from "react-hot-toast";

export default function useTaskDetailVM() {
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const initialValues = {
    title: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
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

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.success("Tarea eliminada con éxito");
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    }
  };

  const handleUpdate = async (values: any) => {
    const { title, description, priority, status, dueDate } = values;
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    if (!title || !description || !priority || !status || !dueDate) return;

    if (userId) {
      try {
        const newTask = await updateTask({
          taskId: userId,
          data: { title, description, priority, status, dueDate },
        });
        setTasks((prev) => [...prev, newTask]);
        setTitle("");
        setDescription("");
        toast.success("Tarea creada con éxito");
      } catch (error) {
        toast.error("Error al crear la tarea");
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return {
    tasks,
    handleDelete,
    title,
    setTitle,
    description,
    setDescription,
    userId,
    setUserId,
    setTasks,
    router,
    initialValues,
    validationSchema,
    handleUpdate,
    getPriorityColor,
  };
}
