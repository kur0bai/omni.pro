"use client";

import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "@/services/task.service";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
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

  return (
    <div className="max-w-2xl mx-auto py-8">
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
  );
};

export default Dashboard;
