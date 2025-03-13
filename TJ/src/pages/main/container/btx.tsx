import React from "react";

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: number;
}

const Btn = ({ text, type, ...rest }: BtnProps) => {
  return (
    <button
      className={type === 2 ? "btn_containter_2" : "btn_containter"}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Btn;
