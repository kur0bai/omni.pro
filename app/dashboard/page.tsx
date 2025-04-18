"use client";

import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "@/services/task.service";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { TaskFilters } from "@/components/tasks/TaskFilter";
import useTasksVM from "@/view-models/tasks/useTasksVM";
import { CreateTaskForm } from "@/components/tasks/TaskCreateForm";
import { TaskCard } from "@/components/tasks/TaskCard";

const Dashboard = () => {
  const {
    router,
    filteredTasks,
    setPriorityFilter,
    setStatusFilter,
    statusFilter,
    priorityFilter,
    showCreateForm,
    setShowCreateForm,
  } = useTasksVM();

  return (
    <div className="min-h-screen flex">
      {/* side */}
      <div className="w-[20%] min-w-[220px] h-screen bg-white border-r border-gray-100 shadow-sm fixed flex flex-col items-center justify-center px-4">
        <img src={"/logo.png"} alt="Logo" className="w-24 mb-4" />
        <h1 className="text-lg font-bold">Bienvenido</h1>
        <p className="text-gray-500 text-center">Administra tus tareas aquí</p>

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
      <div className="flex-1 ml-[20%] min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Tus Tareas</h1>

          {/* filters */}
          <TaskFilters
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onShowAddButtonClick={() => setShowCreateForm(true)}
          />

          {/* tasks */}
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* task list */}
            <div className="flex-1 grid gap-4 max-h-[80vh] overflow-y-auto">
              {filteredTasks.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
              {filteredTasks.length === 0 && (
                <p className="text-gray-500">No hay tareas que coincidan.</p>
              )}
            </div>

            {/* dorm */}
            {showCreateForm && (
              <div className="w-full lg:w-[400px]">
                <CreateTaskForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
