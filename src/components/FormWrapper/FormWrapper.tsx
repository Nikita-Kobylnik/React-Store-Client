import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import "./FormWrapper.scss";

interface FormWrapperProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
  title: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
  title,
}) => {
  const methods = useForm<any>(); // Указываем тип данных для useForm

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
        {children}
        <button className="form__btn" type="submit">
          {title}
        </button>
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
