import React from "react";
import { useFormContext, useFormState } from "react-hook-form";

interface FormPasswordInputProps {
  name: string;
  label: string;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = ({
  name,
  label,
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
        type="password"
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

export default FormPasswordInput;
