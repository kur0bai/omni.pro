import { Dispatch, SetStateAction } from "react";
import { PRIORITY_LIST, STATUS_LIST } from "@/constants/lists";
import { ListFilter, PlusCircle } from "lucide-react";
import { useTaskStore } from "@/store/tasks.store";
import { TaskModalMode } from "@/interfaces/task.interface";

interface TaskFiltersProps {
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
  statusFilter: string;
  setStatusFilter: (statys: string) => void;
  showAddButton?: boolean;
}

export function TaskFilters({
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  showAddButton = true,
}: TaskFiltersProps) {
  const { setShowModal, setMode, clearSelectedTask } = useTaskStore();

  return (
    <div className="flex gap-5 mb-6 items-center bg-white p-4 rounded-lg  border border-gray-300">
      <div>
        <ListFilter size={20} className="text-gray-500" />
      </div>

      <div>
        <label>Prioridad: </label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border py-1 px-4 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option
            value="all"
            className="bg-gray-100 duration-300 hover:bg-gray-200"
          >
            Todas
          </option>
          {PRIORITY_LIST.map((priority) => (
            <option
              key={priority.value}
              value={priority.value}
              className="bg-gray-100 duration-300 hover:bg-gray-200"
            >
              {priority.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Estado: </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border py-1 px-4 rounded bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option
            value="all"
            className="bg-gray-100 duration-300 hover:bg-gray-200"
          >
            Todas
          </option>
          {STATUS_LIST.map((priority) => (
            <option
              key={priority.value}
              value={priority.value}
              className="bg-gray-100 duration-300 hover:bg-gray-200"
            >
              {priority.label}
            </option>
          ))}
        </select>
      </div>

      {showAddButton && (
        <div>
          <button
            className="px-4 py-4 lg:py-2 lg:px-4 rounded-lg text-white flex items-center gap-2 bg-cyan-600 hover:bg-blue-500 duration-300 hover:shadow-sm shadow-md"
            aria-label="Agregar tarea"
            onClick={() => {
              setShowModal(true);
              setMode(TaskModalMode.CREATE);
              clearSelectedTask();
            }}
          >
            <PlusCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
