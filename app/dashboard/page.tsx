"use client";
import { auth } from "@/lib/firebase";
import { TaskFilters } from "@/components/tasks/TaskFilter";
import useTasksVM from "@/view-models/tasks/useTasksVM";
import { CreateTaskForm } from "@/components/tasks/TaskCreateForm";
import { TaskCard } from "@/components/tasks/TaskCard";
import { useTaskStore } from "@/store/tasks.store";
import { ProjectsPanel } from "@/components/projects/ProjectsPanel";
import { ThemePicker } from "@/components/core/ThemePicker";

const Dashboard = () => {
  const {
    router,
    filteredTasks,
    setPriorityFilter,
    setStatusFilter,
    statusFilter,
    priorityFilter,
  } = useTasksVM();

  const { showModal } = useTaskStore();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* side */}
      <div className="w-full lg:w-[20%] min-w-[220px] h-[300px] lg:h-screen bg-white border-r border-gray-100 shadow-sm block lg:fixed flex flex-col items-center justify-center px-4 lg:py-auto py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700">
        <img src={"/logo.png"} alt="Logo" className="w-24 mb-4" />

        <ThemePicker />
        <h1 className="text-lg font-bold">Bienvenido</h1>
        <p className="text-gray-500 text-center dark:text-gray-500">
          Administra tus tareas aquí
        </p>

        <button
          onClick={() => {
            auth.signOut();
            router.push("/auth/login");
          }}
          className="mt-6 text-red-500 hover:underline"
        >
          Cerrar sesión
        </button>
      </div>

      {/* main content */}
      <div className="w-full flex-1 lg:ml-[20%] min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 dark:text-white">
            Tus Tareas
          </h1>

          {/* projects */}
          <ProjectsPanel />

          {/* task filters */}
          <TaskFilters
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* tasks */}
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* from */}
            {showModal && (
              <div className="w-full lg:w-[400px]">
                <CreateTaskForm />
              </div>
            )}
            {/* task list */}
            <div className="flex-1 grid gap-4 max-h-[70vh] overflow-y-auto">
              {filteredTasks.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
              {filteredTasks.length === 0 && (
                <p className="text-gray-500">No hay tareas que coincidan.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
