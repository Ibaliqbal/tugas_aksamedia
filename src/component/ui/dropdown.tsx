import React, { useState, useRef, useEffect } from "react";

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
};

export const Dropdown = ({
  trigger,
  children,
  align = "right",
  className = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 ${alignmentClasses[align]} ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

type DropdownItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

export const DropdownItem = ({
  children,
  onClick,
  className = "",
  icon,
}: DropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
};
