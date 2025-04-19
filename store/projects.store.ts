import { create } from "zustand";
import { IProject } from "@/interfaces/project.interface";

interface ProjectState {
  selectedProject: IProject | null;
  projects: IProject[];
  setSelectedProject: (project: IProject | null) => void;
  clearSelectedProject: () => void;
  setProjects: (projects: IProject[]) => void;
  clearProjects: () => void;
}

export const useProjectsStore = create<ProjectState>((set) => ({
  selectedProject: null,
  projects: [],
  setProjects: (projects) => set({ projects }),
  clearProjects: () => set({ projects: [] }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  clearSelectedProject: () => set({ selectedProject: null }),
}));
