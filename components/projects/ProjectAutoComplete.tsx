import { useProjectsStore } from "@/store/projects.store";
import React from "react";

export const ProjectAutoComplete = () => {
  const { selectedProject, setSelectedProject, projects } = useProjectsStore();
  return (
    <div className="flex flex-col">
      <label htmlFor="project">Selecciona un proyecto</label>
      <select
        value={selectedProject ? selectedProject.id : ""}
        onChange={(e) => {
          const selected = projects.find(
            (project) => project.id === e.target.value
          );
          setSelectedProject(selected || null);
        }}
        className="border py-2.5 px-4 rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Crear un proyecto</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};
