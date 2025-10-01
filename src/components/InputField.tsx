"use client";

import { forwardRef } from "react";

type InputFieldProps = {
  label: string;
  id: string;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, type = "text", error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-100" htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          className={`rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/60 ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";

