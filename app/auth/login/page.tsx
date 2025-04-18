"use client";

import PasswordInput from "@/components/core/PasswordInput";
import Spinner from "@/components/core/Spinner";
import useLoginVM from "@/view-models/login/useLoginVM";
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginPage = () => {
  const { initialValues, validationSchema, handleSubmit, isLoading } =
    useLoginVM();

  return (
    <div className="lg:flex items-center justify-center min-h-screen bg-gray-50">
      {/* Container */}
      <div className="max-w-sm mx-auto p-8 bg-white rounded-lg shadow-sm lg:w-[500px]">
        <img src={"/logo.png"} alt="Logo" className="w-23 mx-auto mb-4" />

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
                className="px-4 p-2 w-full bg-gray-50 focus:bg-white hover:bg-white rounded-lg border border-gray-200 focus:outline-none hover:outline-none duration-200 text-gray-600"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <PasswordInput name="password" placeholder="Contraseña" />
            </div>

            <button
              type="submit"
              className="text-white rounded-lg duration-300 transition-colors bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-400 py-3 hover:shadow-sm shadow-sm font-bold text-center flex items-center justify-center text-gray-600"
            >
              {isLoading ? <Spinner /> : "Entrar"}
            </button>
            {/* create acc */}
            <p className="text-sm text-gray-500 text-center">
              ¿No tienes cuenta aún?{" "}
            </p>
            <a
              href="/auth/register"
              className="text-gray-500 rounded-lg duration-200 transition-colors hover:bg-gray-100 py-3 hover:shadow-sm text-center bg-white shadow-sm"
            >
              Regístrate
            </a>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
