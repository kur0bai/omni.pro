import { projectCollection, taskCollection } from "@/constants/collections";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export const getProjects = async (uid: string) => {
  const projectsRef = collection(db, projectCollection);
  const q = query(projectsRef, where("uid", "==", uid));
  const snapshot = await getDocs(q);

  const projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];
  return projects;
};

export const createProject = async (name: string, uid: string) => {
  const projectsRef = collection(db, projectCollection);
  const newProject = {
    name,
    createdAt: Date.now(),
    uid,
  };
  const docRef = await addDoc(projectsRef, newProject);
  return { id: docRef.id, ...newProject };
};

export const updateProject = async (id: string, name: string) => {
  const projectRef = doc(db, projectCollection, id);

  const updatedProject = {
    name,
    updatedAt: Date.now(),
  };

  try {
    await updateDoc(projectRef, updatedProject);
    return { id, ...updatedProject };
  } catch (error) {
    throw new Error(`Error al actualizar el proyecto: ${error}`);
  }
};

export const deleteProject = async (id: string) => {
  const projectRef = doc(db, projectCollection, id);
  const tasksRef = collection(db, taskCollection);

  try {
    //Delete project with all its tasks jeje
    const q = query(tasksRef, where("projectId", "==", id));
    const snapshot = await getDocs(q);
    const deleteTasksPromises = snapshot.docs.map((taskDoc) =>
      deleteDoc(doc(db, taskCollection, taskDoc.id))
    );
    await Promise.all(deleteTasksPromises);
    await deleteDoc(projectRef);

    return id;
  } catch (error) {
    throw new Error(`Error al eliminar el proyecto y sus tareas: ${error}`);
  }
};
