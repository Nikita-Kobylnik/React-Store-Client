import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import FormInput from "../../components/FormInput/FormInput";
import FormPasswordInput from "../../components/FormPasswordInput/FormPasswordInput";
import { $api } from "../../api/api";
import { setUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks/typedHooks";
import { IBackendError } from "../../interfaces/backendErrorLoginInterface";
import Header from "../../components/Header/Header";

interface IFormLoginSubmit {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    setError,
    formState: { errors },
  } = useForm<IFormLoginSubmit>();

  const onSubmit: SubmitHandler<IFormLoginSubmit> = async (data) => {
    try {
      const resp = await $api.post("/auth/login", data);
      dispatch(setUser(resp.data));
      navigate("/");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const backendError = error.response.data as IBackendError;
        setError("password", { type: "manual", message: backendError.message });
      }
    }
  };

  return (
    <>
      <Header />
      <section className="login__wrapper wrapper">
        <div className="form__wrapper">
          <div className="logo-wrapper">
            <Link to="/" className="logo">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="titles">
            <h1 className="title__item title title_active">вход</h1>
            <h1 className="title__item title">регистрация</h1>
          </div>
          <FormWrapper onSubmit={onSubmit} title="войти">
            <FormInput type="email" name="email" label="Почта" />
            <FormPasswordInput name="password" label="Пароль" />
          </FormWrapper>
          <p className="form__wrapper-text">
            Нет аккаунта?
            <Link className="form__wrapper-link" to="/register">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
