import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import toast from "react-hot-toast";
import { validateError } from "@/utils/firebase/auth-codes";
import { useUserStore } from "@/store/user.store";

export default function useLoginVM() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = { email: "", password: "" };
  const setUser = useUserStore((state) => state.setUser);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido")
      .required("Este es un campo requerido"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Este es un campo requerido"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const token = await userCredential.user.getIdToken();

      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      setUser(userCredential.user);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      const errorMessage = validateError(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    isLoading,
  };
}
