import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error";
  inputSize?: "sm" | "md" | "lg";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", variant = "default", inputSize = "md", ...props },
    ref
  ) => {
    const baseStyles =
      "w-full rounded-lg border bg-white dark:bg-gray-800 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
      default:
        "border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 dark:text-gray-50 dark:placeholder-gray-400",
      error:
        "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:text-gray-50",
    };

    const sizes = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    };

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[inputSize]} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
