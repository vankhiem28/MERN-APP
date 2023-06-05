import React from "react";
import { useController } from "react-hook-form";

const Input = ({ control, name, className, type, placeholder, ...props }) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    type,
    control,
    className,
    placeholder,
    rules: { required: true },
    defaultValue: "",
  });
  return (
    <>
      <input
        className={`w-[280px] outline-none py-2 px-2 rounded-md text-base block ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {invalid && <span className="text-yellow-400 mt-1 block">{error?.message}</span>}
    </>
  );
};

export default Input;
