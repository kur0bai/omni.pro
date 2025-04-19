import { Filter, ListFilter } from "lucide-react";
import { ProjectAutoComplete } from "./ProjectAutoComplete";
import { ProjectsCreate } from "./ProjectsForm";

export function ProjectsPanel({}) {
  return (
    <div className="flex gap-5 mb-6 items-center bg-white p-4 rounded-lg  border border-gray-300">
      <div>
        <Filter size={20} className="text-gray-500" />
      </div>

      <div>
        <ProjectAutoComplete />
      </div>

      <div>
        <ProjectsCreate />
      </div>
    </div>
  );
}
