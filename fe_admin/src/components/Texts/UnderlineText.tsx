import { ReactNode } from "react";

const UnderlineText: React.FC<{
  children: ReactNode;
  color?: string;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <span
      onClick={onClick}
      className={
        `relative inline-block hover:before:scale-x-0 before:absolute before:h-[2px] before:bg-primary before:bottom-0 before:left-0 before:right-0 before:origin-bottom-right before:transition-transform before:duration-300 before:ease-in-out ` +
        className
      }
    >
      {children}
    </span>
  );
};

export default UnderlineText;
