import React from "react";
import Container from "../Container/Container";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-2.png";
import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <footer className="footer">
      <Container>
        <div className="footer__inner">
          <Link to="/" className="header__logo logo" onClick={handleLogoClick}>
            <img src={logo} alt="Logo" />
          </Link>
          <ul className="footer__internet internet-list list">
            <h3 className="internet-list__title title">Интернет магазин</h3>
            <li className="internet-list__item">
              <Link to={"/"} className="internet-list__link link">
                Каталог
              </Link>
            </li>
            <li className="internet-list__item">
              <Link to={"/"} className="internet-list__link link">
                Все категории
              </Link>
            </li>
            <li className="internet-list__item">
              <Link to={"/"} className="internet-list__link link">
                Оригинальные каталоги
              </Link>
            </li>
            <li className="internet-list__item">
              <Link to={"/"} className="internet-list__link link">
                Оплата
              </Link>
            </li>
            <li className="internet-list__item">
              <Link to={"/"} className="internet-list__link link">
                Доставка
              </Link>
            </li>
            <li className="internet-list__item">
              <Link to={"/cart"} className="internet-list__link link">
                Корзина
              </Link>
            </li>
          </ul>
          <ul className="footer__user user-list list">
            <h3 className="user-list__title title">Личный кабинет</h3>
            <li className="user-list__item">
              <Link className="user-list__link link" to={"/auth"}>
                Регистрация / Логин
              </Link>
            </li>
          </ul>
          <ul className="footer__information information-list list">
            <h3 className="information-list__title title">
              Полезная информация
            </h3>
            <li className="information-list__item">
              <Link className="information-list__link link" to={"/"}>
                Про компанию
              </Link>
            </li>
            <li className="information-list__item">
              <Link className="information-list__link link" to={"/"}>
                Контакты
              </Link>
            </li>
            <li className="information-list__item">
              <Link className="information-list__link link" to={"/"}>
                Регионам
              </Link>
            </li>
            <li className="information-list__item">
              <Link className="information-list__link link" to={"/"}>
                Правовые документы
              </Link>
            </li>
            <li className="information-list__item">
              <Link className="information-list__link link" to={"/"}>
                Публичный договор
              </Link>
            </li>
            <li className="information-list__item">
              <Link className="information-list__link link" to={"/"}>
                Поставщикам
              </Link>
            </li>
            <li className="information-list__item">
              <Link className="information-list__link link" to={"/"}>
                Форум
              </Link>
            </li>
          </ul>
          <ul className="footer__contacts contacts-list list">
            <h3 className="contacts-list__title title">Наши контакты</h3>
            <li className="contacts-list__item">
              <a href="/#" className="contacts-list__link link">
                +38 (066) 00 00 000
              </a>
            </li>
            <li className="contacts-list__item">
              <a href="/#" className="contacts-list__link link">
                +38 (095) 00 00 000
              </a>
            </li>
            <li className="contacts-list__item">
              <a href="/#" className="contacts-list__link link">
                +38 (099) 00 00 000
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
