"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import useTasksVM from "@/view-models/tasks/useTasksVM";
import { PRIORITY_LIST, STATUS_LIST } from "@/constants/lists";
import Spinner from "../core/Spinner";

export function CreateTaskForm() {
  const { initialValues, validationSchema, handleCreate } = useTasksVM();

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreate}
      >
        {({ isSubmitting }) => (
          <Form className="grid gap-4">
            <div className="flex flex-col">
              <label htmlFor="title">Título</label>
              <Field
                id="title"
                name="title"
                type="text"
                className="border p-2 rounded"
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
                className="border p-2 rounded"
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
                className="border p-2 rounded"
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
                className="border p-2 rounded"
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
                className="border p-2 rounded"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Crear Tarea"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
