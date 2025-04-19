import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useRegisterVM() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = { email: "", password: "", confirmPassword: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido")
      .required("Este campo es requerido"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Este campo es requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Las contraseñas no coinciden")
      .required("Este campo es requerido"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Ha ocurrido un error en el registro");
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
