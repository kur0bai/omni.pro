import useProjectsCreateVM from "@/view-models/projects/useProjectsVM";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import Spinner from "../core/Spinner";
import { Save, Trash } from "lucide-react";
import { useProjectsStore } from "@/store/projects.store";

export const ProjectsCreate = () => {
  const {
    initialValues,
    validationSchema,
    handleSubmit,
    isLoading,
    handleDelete,
  } = useProjectsCreateVM();
  const selectedProject = useProjectsStore((state) => state.selectedProject);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="grid gap-4 relative">
            {/* content */}

            <div className="flex flex-col">
              <label htmlFor="name">Nombre</label>
              <div className="flex flex-col items-center">
                <div className="flex flex-row gap-4">
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre del proyecto"
                    className="px-4 p-2 w-full bg-gray-50 focus:bg-white hover:bg-white rounded-lg border border-gray-200 focus:outline-none hover:outline-none duration-200 text-gray-600"
                  />
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Spinner className="self-center fill-cyan-500" />
                    ) : (
                      <Save
                        size={20}
                        className="text-cyan-600 hover:text-blue-400"
                      />
                    )}
                  </button>
                  {selectedProject && (
                    <button
                      type="button"
                      onClick={() => handleDelete()}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={20} />
                    </button>
                  )}
                </div>
                <div className="w-full">
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
