"use client";

import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  showErrors?: boolean;
}

const PasswordInput = ({
  name,
  placeholder,
  showErrors = true,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <Field
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="px-4 p-2 w-full bg-gray-50 focus:bg-white hover:bg-white rounded-lg border border-gray-200 focus:outline-none hover:outline-none duration-200 text-gray-600"
      />

      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-3 text-gray-600"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>

      {showErrors && (
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      )}
    </div>
  );
};

export default PasswordInput;
