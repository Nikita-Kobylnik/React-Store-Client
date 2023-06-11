import React from "react";
import "./Register.scss";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import FormInput from "../../components/FormInput/FormInput";
import FormPasswordInput from "../../components/FormPasswordInput/FormPasswordInput";
import { SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { $api } from "../../api/api";
import { useAppDispatch } from "../../redux/hooks/typedHooks";
import { setUser } from "../../redux/slices/userSlice";
import Header from "../../components/Header/Header";

interface IFormRegisterSubmit {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormRegisterSubmit> = async (data) => {
    const resp = await $api.post("/auth/register", data);
    dispatch(setUser(resp.data));
    navigate("/");
  };

  return (
    <>
      <Header />
      <section className="register__wrapper wrapper">
        <div className="form__wrapper">
          <div className="logo-wrapper">
            <Link to="/" className="logo">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="titles">
            <h1 className="title__item title">вход</h1>
            <h1 className="title__item title title_active">регистрация</h1>
          </div>
          <FormWrapper onSubmit={onSubmit} title="регистрация">
            <FormInput type="text" name="name" label="Имя" />
            <FormInput type="text" name="lastname" label="Фамилия" />
            <FormInput type="email" name="email" label="Почта" />
            <FormInput type="tel" name="phone" label="Номер телефона" />
            <FormPasswordInput name="password" label="Пароль" />
          </FormWrapper>
          <p className="form__wrapper-text">
            Уже зарегистрированы?
            <Link className="form__wrapper-link" to="/login">
              Войти
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
