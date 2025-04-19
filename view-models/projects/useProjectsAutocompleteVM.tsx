import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  where,
  getDocs,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { projectCollection } from "@/constants/collections";

export function useProjectsAutocomplete(uid: string, searchText: string) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid) return;
    const fetchProjects = async () => {
      setLoading(true);
      const projectsRef = collection(db, projectCollection);

      let q;

      if (!searchText) {
        q = query(
          projectsRef,
          where("uid", "==", uid),
          orderBy("name"),
          limit(5)
        );
      } else {
        const text = searchText.toLowerCase();
        q = query(
          projectsRef,
          where("uid", "==", uid),
          orderBy("name"),
          startAt(text),
          endAt(text + "\uf8ff"),
          limit(5)
        );
      }

      const snapshot = await getDocs(q);

      const newProjects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Proyectos obtenidos: ", newProjects);
      setProjects(newProjects);
      setLoading(false);
    };

    const debounceFetch = setTimeout(fetchProjects, 300);

    return () => clearTimeout(debounceFetch);
  }, [uid, searchText]);

  return { projects, loading };
}
