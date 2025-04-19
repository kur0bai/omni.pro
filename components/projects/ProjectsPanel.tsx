import { Filter, ListFilter } from "lucide-react";
import { ProjectAutoComplete } from "./ProjectAutoComplete";
import { ProjectsCreate } from "./ProjectsForm";

export function ProjectsPanel({}) {
  return (
    <div className="flex flex-col lg:flex-row gap-5 mb-6 lg:items-center bg-white p-4 rounded-lg  border border-gray-300">
      <div className="flex items-center gap-2 lg:mb-0">
        <Filter size={20} className="text-gray-500" />
        <h3 className="font-semibold lg:hidden">Proyectos</h3>
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
