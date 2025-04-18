import { PRIORITY_LIST, STATUS_LIST } from "@/constants/lists";
import { ITask } from "@/interfaces/task.interface";
import React from "react";
import { Pencil, Trash } from "lucide-react";
import useTaskDetailVM from "@/view-models/tasks/useTaskDetailVM";

interface TaskCardProps {
  task: ITask;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { getPriorityColor, handleDelete } = useTaskDetailVM();

  return (
    <div
      key={task.id}
      className="border border-gray-300 bg-white px-4 py-4 rounded-lg shadow-sm lg:max-w-[500px] flex flex-col"
    >
      {/* actions buttons */}
      <div className="">
        <div className="flex flex-row justify-end gap-2">
          <button
            onClick={() => {}}
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
        <h2 className="font-semibold capitalize">{task.title}</h2>
      </div>

      <hr className="text-gray-100" />

      <div className="my-4">
        <p className="text-gray-600">{task.description}</p>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          Fecha de expiración:{" "}
          <strong>{new Date(task.dueDate).toLocaleDateString()}</strong>
        </p>
        <p>
          Prioridad:{" "}
          <strong className={getPriorityColor(task.priority)}>
            {PRIORITY_LIST.find((priority) => priority.value == task.priority)
              ?.label ?? task.priority}
          </strong>
        </p>
        <p>
          Estado:{" "}
          <strong>
            {STATUS_LIST.find((status) => status.value == task.status)?.label ??
              task.status}
          </strong>
        </p>
      </div>
    </div>
  );
};
