"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Requerido"),
    password: Yup.string().min(6, "Mínimo 6 caracteres").required("Requerido"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      alert("Error en el registro");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Cuenta</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="border p-2 w-full"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <Field
              name="password"
              type="password"
              placeholder="Contraseña"
              className="border p-2 w-full"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded"
          >
            Registrarme
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
