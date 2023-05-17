import React from "react";
import { useFormContext, useFormState } from "react-hook-form";
import "./FormInput.scss";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = "text",
}) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  return (
    <div className="form__input-wrapper">
      <label className="form__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form__input"
        type={type}
        id={name}
        {...register(name, { required: "Это поле обязательно для заполнения" })}
      />
      {errors[name] && (
        <p style={{ color: "red", fontSize: "13px" }}>
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInput;
