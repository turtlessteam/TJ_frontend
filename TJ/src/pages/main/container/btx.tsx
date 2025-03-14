import React from "react";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary"; // Use a custom variant for styling
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Btn = ({ text, variant = "primary", ...rest }: BtnProps) => {
  return (
    <button
      className={
        variant === "secondary" ? "btn_containter_2" : "btn_containter"
      }
      {...rest} // onClick과 다른 button 속성을 전달
    >
      {text}
    </button>
  );
};

export default Btn;
