import React from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import logo from "../../assets/images/logo.png";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__top">
          <Link to="/" className="header__logo logo">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      </Container>
    </header>
  );
};
// header__top ->    logo         s--e--a--r--c--h        account     cart
// header__bottom -> category_name  category_name  category_name  category_name
export default Header;
