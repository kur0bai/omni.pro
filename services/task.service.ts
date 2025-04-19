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
  orderBy,
} from "firebase/firestore";

interface UpdateTaskParams {
  taskId: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: number;
}

export const createTask = async (
  title: string,
  description: string,
  dueDate: number,
  priority: string,
  status: string,
  uid: string,
  projectId: string
) => {
  const tasksRef = collection(db, "tasks");
  const newTask = {
    title,
    description,
    createdAt: Date.now(),
    dueDate,
    priority,
    status,
    uid,
    projectId,
  };
  const docRef = await addDoc(tasksRef, newTask);
  return { id: docRef.id, ...newTask };
};

export const getTasks = async (uid: string, projectId: string) => {
  const tasksRef = collection(db, "tasks");
  const q = query(
    tasksRef,
    where("uid", "==", uid),
    where("projectId", "==", projectId),
    orderBy("dueDate", "desc")
  );
  const snapshot = await getDocs(q);

  const tasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];
  return tasks;
};

export const updateTask = async ({
  taskId,
  title,
  description,
  status,
  priority,
  dueDate,
}: UpdateTaskParams) => {
  const taskDoc = doc(db, "tasks", taskId);

  const updateData: Partial<Omit<UpdateTaskParams, "taskId">> = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;
  if (priority !== undefined) updateData.priority = priority;
  if (dueDate !== undefined) updateData.dueDate = dueDate;

  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields provided for update.");
  }

  await updateDoc(taskDoc, updateData);

  const updatedTask = {
    id: taskId,
    ...updateData,
  };

  return updatedTask;
};

export const deleteTask = async (taskId: string) => {
  const taskDoc = doc(db, "tasks", taskId);
  await deleteDoc(taskDoc);
};
