import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Container/Container";
import logo from "../../assets/images/logo-2.png";
import "./Header.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/typedHooks";
import { selectUserSlice, setUser } from "../../redux/slices/userSlice";
import { TfiSearch } from "react-icons/tfi";
import { BsCart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { GiCarWheel } from "react-icons/gi";
import { TfiPackage } from "react-icons/tfi";
import { IoExitOutline } from "react-icons/io5";
import { BsGrid } from "react-icons/bs";
import { $api } from "../../api/api";
import { IMainCategory } from "../../interfaces/mainCategoryInterface";
import { ISubcategory } from "../../interfaces/subcategoryInterface";
import { getTotals, selectCartSlice } from "../../redux/slices/cartSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userLogout = async () => {
    $api.post("/auth/logout");
    dispatch(setUser(null));
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const { user } = useAppSelector(selectUserSlice);
  const cart = useAppSelector(selectCartSlice);
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const [categories, setCategories] = useState<IMainCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $api.get("/mainCategory/subcategoreis");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const cartItems = useAppSelector(selectCartSlice);

  return (
    <>
      <header className="header">
        <p className="header__up">
          Теперь в AutopartStore есть шины!{" "}
          <a className="link" href="/#">
            ЗАХОДИ И СМОТРИ
            <GiCarWheel className="icon" />
          </a>
        </p>
        <Container>
          <div className="header__inner">
            <Link
              to="/"
              className="header__logo logo"
              onClick={handleLogoClick}
            >
              <img src={logo} alt="Logo" />
            </Link>

            <form className="header__search">
              <input
                className="header__search-input"
                type="text"
                placeholder="Какую автозапчасть ищете?"
              />
              <button className="header__search-btn">
                <TfiSearch />
              </button>
            </form>

            <div className="header__catalog catalog">
              <button className="catalog__btn">
                <BsGrid className="catalog__icon" />
                <p className="catalog__text">Каталог</p>
              </button>
              <nav className="menu">
                <ul className="menu__list">
                  {categories &&
                    categories.map((category) => (
                      <li key={category.id} className="menu__list-item">
                        <Link to={"/"} className="menu__list-link">
                          {category.name}
                        </Link>
                        {category.subcategoreis && (
                          <ul className="menu__sublist">
                            {category.subcategoreis.map(
                              (subcategory: ISubcategory) => (
                                <li
                                  key={subcategory.name}
                                  className="menu__sublist-item"
                                >
                                  <Link
                                    className="menu__sublist-link"
                                    to={`/subcategory/${subcategory.id}`}
                                  >
                                    {subcategory.name}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              </nav>
            </div>

            <div className="header__nav">
              <Link to={user ? "/cart" : "/login"} className="cart">
                <BsCart className="cart__icon" />
                <p className="cart-text">Корзина</p>
                {user && <span className="cart-count">{totalQuantity}</span>}
              </Link>

              {user ? (
                <div className="login-wrapper">
                  <Link to="/" className="login">
                    <VscAccount className="login__icon" />
                    <p>{user.name}</p>
                  </Link>
                  <div className="login__hover">
                    <div className="login__hover-wrapper">
                      <p className="user-name">{user.name}</p>
                      {/* <p className="user-email">{user.email}</p> */}
                      <ul className="login__hover-list">
                        <li className="login__hover-item">
                          <TfiPackage />
                          <Link
                            className="login__hover-link"
                            to={`/order/${user.id}`}
                          >
                            Мои заказы
                          </Link>
                        </li>
                        <li className="login__hover-item">
                          <VscAccount className="" />
                          <Link
                            className="login__hover-link"
                            to={`/account/edit`}
                          >
                            Мои данные
                          </Link>
                        </li>
                      </ul>
                      <div className="logout-wrapper">
                        <IoExitOutline />
                        <button
                          onClick={() => {
                            userLogout();
                          }}
                          className="logout"
                        >
                          Выйти
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="login">
                  <VscAccount className="login__icon" />
                  <p>Аккаунт</p>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
export default Header;
