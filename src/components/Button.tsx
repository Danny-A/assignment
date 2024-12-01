import { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="bg-white text-afternoon-blue text-sm px-4 py-3 rounded-full hover:bg-lightmorning-blue hover:text-white hover:underline"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
