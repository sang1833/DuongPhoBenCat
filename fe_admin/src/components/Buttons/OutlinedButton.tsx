import React, { ReactNode } from "react";

export const OutlinedNormalButton: React.FC<{
  children: ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
}> = ({ children, color, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={
        `inline-flex items-center justify-center rounded-md border border-${color} py-2 px-4 text-center font-medium text-${color} hover:bg-opacity-90 lg:px-4 xl:px-6 ` +
        className
      }
    >
      {children}
    </button>
  );
};
