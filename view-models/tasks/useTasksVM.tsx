import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "@/services/task.service";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { TaskPriority, TaskStatus, ITask } from "@/interfaces/task.interface";
import toast from "react-hot-toast";

export default function useTasksVM() {
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  //filters functions
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  const handleCreate = async (values: any) => {
    const { title, description, priority, status, dueDate } = values;
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    if (!title || !description || !priority || !status || !dueDate) return;

    if (userId) {
      try {
        const newTask = await createTask(
          title,
          description,
          dueDate,
          priority,
          status,
          userId
        );
        setTasks((prev) => [...prev, newTask]);
        setTitle("");
        setDescription("");
        toast.success("Tarea creada con éxito");
      } catch (error) {
        toast.error("Error al crear la tarea");
      }
    }
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const fetchedTasks = await getTasks(user.uid);
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, []);

  //When filter changes
  useEffect(() => {
    let tempTasks = [...tasks];
    if (priorityFilter !== "all") {
      tempTasks = tempTasks.filter((task) => task.priority === priorityFilter);
    }
    if (statusFilter !== "all") {
      tempTasks = tempTasks.filter((task) => task.status === statusFilter);
    }
    setFilteredTasks(tempTasks);
  }, [priorityFilter, statusFilter, tasks]);

  return {
    tasks,
    filteredTasks,
    handleCreate,
    handleDelete,
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
  };
}
