import { PRIORITY_LIST, STATUS_LIST } from "@/constants/lists";
import { ITask, TaskModalMode } from "@/interfaces/task.interface";
import React from "react";
import { Pencil, Trash } from "lucide-react";
import useTaskDetailVM from "@/view-models/tasks/useTaskDetailVM";
import { useTaskStore } from "@/store/tasks.store";
import useTasksVM from "@/view-models/tasks/useTasksVM";

interface TaskCardProps {
  task: ITask;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { getPriorityColor, getStatusIcon } = useTaskDetailVM();
  const { handleDelete } = useTasksVM();
  const { setSelectedTask, clearSelectedTask, setMode, setShowModal } =
    useTaskStore();
  return (
    <div
      key={task.id}
      className="border border-gray-300 bg-white px-4 py-4 rounded-lg shadow-sm lg:max-w-[500px] flex flex-col"
    >
      {/* actions buttons */}
      <div className="">
        <div className="flex flex-row justify-end gap-2">
          <button
            onClick={() => {
              clearSelectedTask();
              setSelectedTask(task);
              setMode(TaskModalMode.EDIT);
              setShowModal(true);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => handleDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-row w-full items-center gap-5 mb-2">
        <img src={"/logo.png"} alt="Logo" className="w-12" />{" "}
        <h2 className="font-semibold">{task.title}</h2>
      </div>

      <hr className="text-gray-100" />

      <div className="my-2">
        <p className="text-gray-600">{task.description}</p>
      </div>

      <div className="text-sm text-gray-600 flex flex-col gap-1 border-t border-gray-100 pt-4">
        <p>
          Creada en:{" "}
          <strong className="capitalize">
            {new Date(task.createdAt).toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </p>
        <p>
          Expira en:{" "}
          <strong className="capitalize">
            {new Date(task.dueDate).toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </p>
        <p>
          Prioridad:{" "}
          <strong className={getPriorityColor(task.priority)}>
            {PRIORITY_LIST.find((priority) => priority.value == task.priority)
              ?.label ?? task.priority}
          </strong>
        </p>
        <p className="flex flex-row items-center gap-1">
          Estado: {getStatusIcon(task.status)}
          <strong>
            {STATUS_LIST.find((status) => status.value == task.status)?.label ??
              task.status}
          </strong>
        </p>
      </div>
    </div>
  );
};
