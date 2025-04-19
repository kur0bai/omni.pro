"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import useTasksVM from "@/view-models/tasks/useTasksVM";
import { PRIORITY_LIST, STATUS_LIST } from "@/constants/lists";
import Spinner from "../core/Spinner";
import { useTaskStore } from "@/store/tasks.store";
import { TaskModalMode } from "@/interfaces/task.interface";
import { X } from "lucide-react";
export function CreateTaskForm() {
  const {
    initialValues,
    validationSchema,
    handleSubmit,
    selectedTask,
    isLoading,
    formikRef,
  } = useTasksVM();

  const { mode, setShowModal } = useTaskStore();

  return (
    <div className="bg-white shadow-md rounded-lg px-8 py-8 border border-gray-300">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {() => (
          <Form className="grid gap-4 relative">
            {/* header */}
            <h3 className="font-bold text-2xl">
              {mode == TaskModalMode.EDIT ? "Actualizar" : "Crear"} tarea
            </h3>
            <button
              className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 duration-300"
              type="button"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            {/* content */}
            <div className="flex flex-col">
              <label htmlFor="title">Título</label>
              <Field
                id="title"
                name="title"
                type="text"
                placeholder="Título de la tarea"
                className="px-4 p-2 w-full bg-gray-50 focus:bg-white hover:bg-white rounded-lg border border-gray-200 focus:outline-none hover:outline-none duration-200 text-gray-600"
              />
              <ErrorMessage
                name="title"
                component="span"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Descripción</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                type="text"
                className="px-4 p-2 w-full bg-gray-50 focus:bg-white hover:bg-white rounded-lg border border-gray-200 focus:outline-none hover:outline-none duration-200 text-gray-600"
                placeholder="Descripción de la tarea"
              />
              <ErrorMessage
                name="description"
                component="span"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="priority">Prioridad</label>
              <Field
                as="select"
                id="priority"
                name="priority"
                placeholder="Prioridad"
                className="px-4 p-2 w-full bg-gray-50 focus:bg-white hover:bg-white rounded-lg border border-gray-200 focus:outline-none hover:outline-none duration-200 text-gray-600"
              >
                {PRIORITY_LIST.map((priority) => (
                  <option
                    key={priority.value}
                    value={priority.value}
                    className="bg-gray-100 duration-300 hover:bg-gray-200"
                  >
                    {priority.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="priority"
                component="span"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="status">Estado</label>
              <Field
                as="select"
                id="status"
                name="status"
                placeholder="Estado"
                className="px-4 p-2 w-full bg-gray-50 focus:bg-white hover:bg-white rounded-lg border border-gray-200 focus:outline-none hover:outline-none duration-200 text-gray-600"
              >
                {STATUS_LIST.map((priority) => (
                  <option
                    key={priority.value}
                    value={priority.value}
                    className="bg-gray-100 duration-300 hover:bg-gray-200"
                  >
                    {priority.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="status"
                component="span"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="dueDate">Fecha de Expiración</label>
              <Field
                id="dueDate"
                name="dueDate"
                type="date"
                className="px-4 p-2 w-full bg-gray-50 focus:bg-white hover:bg-white rounded-lg border border-gray-200 focus:outline-none hover:outline-none duration-200 text-gray-600"
              />
              <ErrorMessage
                name="dueDate"
                component="span"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="text-white rounded-lg duration-300 transition-colors bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-400 py-3 hover:shadow-sm shadow-sm font-bold text-center flex items-center justify-center text-gray-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner />
              ) : mode == "edit" ? (
                "Actualizar tarea"
              ) : (
                "Crear tarea"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
