import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function useLoginVM() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = { email: "", password: "" };

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
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      alert("Error en el login");
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
