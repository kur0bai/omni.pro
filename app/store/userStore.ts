import { create } from "zustand";
import { User } from "firebase/auth";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}
//I'll use a basic user config
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
