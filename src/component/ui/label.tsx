import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    { className = "", required = false, size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "block font-medium text-gray-700 dark:text-gray-300 mb-1";

    const sizes = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <label
        ref={ref}
        className={`${baseStyles} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = "Label";
