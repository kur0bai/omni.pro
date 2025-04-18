import { Dispatch, SetStateAction } from "react";
import { PRIORITY_LIST, STATUS_LIST } from "@/constants/lists";

interface TaskFiltersProps {
  priorityFilter: string;
  setPriorityFilter: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
}

export function TaskFilters({
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}: TaskFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
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
    </div>
  );
}
