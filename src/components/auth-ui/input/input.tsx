"use client";
import { ClosingEye, Eye } from "@/svg-assets/eye";
import { useState } from "react";

interface authInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  min: number;
  max: number;
}

const AuthInputUI = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  min,
  max,
}: authInputProps) => {
  const [isPasswordOpen, setPasswordOpen] = useState("password");

  const passwordSettings = () => {
    if (isPasswordOpen === "password") {
      setPasswordOpen("text");
    } else if (isPasswordOpen === "text") {
      setPasswordOpen("password");
    }
  };

  const isType = type !== "password" ? type : isPasswordOpen;

  return (
    <div className="w-full flex gap-[1%] ml-[30%]">
      <input
        type={isType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={min}
        maxLength={max}
        pattern={
          name === "password" ? "(?=.*[A-Z])(?=.*[\\W_]).{6,}" : undefined
        }
        className="w-[70%] h-[10vh] pl-[3%] gray-background-color text-black nunito-font focus:outline-none focus:text-white"
      />
      {placeholder === "Password" ? (
        <button
          type="button"
          className="text-black hover:text-blue-600"
          onClick={passwordSettings}
        >
          {isPasswordOpen === "password" ? <Eye /> : <ClosingEye />}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default AuthInputUI;
