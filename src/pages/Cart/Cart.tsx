import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/typedHooks";
import {
  addToCart,
  clearCart,
  decreaseCartItem,
  getTotals,
  removeFromCart,
  selectCartSlice,
} from "../../redux/slices/cartSlice";
import { IAutopart } from "../../interfaces/autopartInterface";
import Container from "../../components/Container/Container";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

import "./Cart.scss";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(selectCartSlice);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const deleteItem = (item: IAutopart) => {
    dispatch(removeFromCart(item));
  };

  const decreaseCart = (item: IAutopart) => {
    dispatch(decreaseCartItem(item));
  };

  const addCart = (item: IAutopart) => {
    dispatch(addToCart(item));
  };

  const clearAllCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Header />
      <section className="cart-page">
        <Container>
          {cart.cartItems.length <= 0 ? (
            <div className="cart-empty">
              <p>Корзина пуста</p>
              <Link className="cart-empty__link" to="/">
                <BsArrowLeft />
                Продолжить покупки
              </Link>
            </div>
          ) : (
            <>
              <h1 className="cart-page__title">
                Корзина
                {/* <span> {cart.totalQuantity} товар (-ов) </span> */}
              </h1>
              <div className="cart-page__info">
                <AiFillInfoCircle className="cart-page__info-icon" />
                <p className="cart-page__info-text">
                  Не откладывайте покупки. Добавление товара в корзину не
                  бронирует его
                </p>
              </div>

              <div className="cart-page__titles">
                <h3 className="cart-page__grid-title">Название</h3>
                <h3 className="cart-page__grid-title">Цена</h3>
                <h3 className="cart-page__grid-title">Количество</h3>
                <h3 className="cart-page__grid-title">Всего</h3>
              </div>

              <div className="cart-page__inner">
                {cart.cartItems.map((item, index) => (
                  <div className="cart-page__item cart-item" key={index}>
                    <div className="cart-item__wrapper">
                      <div className="cart-item__info">
                        <img
                          src={item.image_path}
                          alt={item.name}
                          style={{
                            maxWidth: "100%",
                            width: "140px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="cart-item__info-bottom">
                          <p className="cart-item__name">{item.name}</p>
                          <button
                            className="cart-item__remove"
                            onClick={() => deleteItem(item)}
                          >
                            <AiOutlineDelete />
                            Удалить
                          </button>
                        </div>
                      </div>
                      <p>{item.price} грн</p>
                      <div className="cart-item__quantity">
                        <button
                          onClick={() => decreaseCart(item)}
                          className="cart-item__btn-min"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addCart(item)}
                          className="cart-item__btn-pls"
                        >
                          +
                        </button>
                      </div>
                      <p>{item.price * item.quantity} грн</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-bottom">
                <button onClick={() => clearAllCart()} className="cart-clear">
                  Очистить корзину
                </button>
                <div className="total_price">
                  <div className="total_price__wrapper">
                    <p>Общая стоимость:</p>
                    <p>{cart.totalPrice} грн</p>
                  </div>
                  <button className="checkout">Оформить заказ</button>
                  <Link className="cart-empty__link" to="/">
                    <BsArrowLeft />
                    Продолжить покупки
                  </Link>
                </div>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default Cart;
