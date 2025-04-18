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

interface UpdateTaskParams {
  taskId: string;
  data: Partial<{
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: number;
  }>;
}

export const createTask = async (
  title: string,
  description: string,
  dueDate: number,
  priority: string,
  status: string,
  uid: string
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
  };
  const docRef = await addDoc(tasksRef, newTask);
  return { id: docRef.id, ...newTask };
};

export const getTasks = async (uid: string) => {
  const tasksRef = collection(db, "tasks");
  const q = query(tasksRef, where("uid", "==", uid));
  const snapshot = await getDocs(q);

  const tasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];
  return tasks;
};

export const updateTask = async ({ taskId, data }: UpdateTaskParams) => {
  const taskDoc = doc(db, "tasks", taskId);
  await updateDoc(taskDoc, data);
  return {
    id: taskId,
    ...data,
  };
};

export const deleteTask = async (taskId: string) => {
  const taskDoc = doc(db, "tasks", taskId);
  await deleteDoc(taskDoc);
};
