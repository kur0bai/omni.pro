"use client";
import { TaskFilters } from "@/components/tasks/TaskFilter";
import { auth } from "@/lib/firebase";
import { getTasks, createTask, deleteTask } from "@/services/task.service";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const fetchedTasks = await getTasks(user.uid);
        setTasks(fetchedTasks);
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCreate = async () => {
    if (!title || !description) return;

    if (userId) {
      const newTask = await createTask(title, description, userId);
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setDescription("");
    }
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(initialTasks);

  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  return (
    <div className="min-h-screen bg-gray-50 w-full lg:flex lg:flex-row gap-10">
      {/* side */}
      <div className="lg:w-[20%] h-62 lg:h-screen bg-white border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center justify-center h-full">
          <img src={"/logo.png"} alt="Logo" className="w-23 mb-4" />
          <h1 className="text-lg font-bold">Bienvenido</h1>
          <p className="text-gray-500">Administra tus tareas aquí</p>

          <button
            onClick={() => {
              auth.signOut();
              router.push("/auth/login");
            }}
            className="mt-4 text-red-500 hover:underline"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* content container */}
      <div>
        <div className="max-w-2xl mx-auto py-8 lg:px-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Tus Tareas</h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Título"
              className="border p-2 w-full mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Descripción"
              className="border p-2 w-full mb-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Agregar tarea
            </button>
          </div>

          {/* filter */}
          <div>
            <TaskFilters
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>

          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border p-4 mb-2 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <p>{task.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
