import React, { useState, useEffect } from "react";
import { $api } from "../../api/api";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Autopart.scss";
import Container from "../../components/Container/Container";
import { IAutopart } from "../../interfaces/autopartInterface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/typedHooks";
import { selectUserSlice } from "../../redux/slices/userSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { BsArrowLeft } from "react-icons/bs";
import Footer from "../../components/Footer/Footer";

const Autopart: React.FC = () => {
  const [autopart, setAutopart] = useState<IAutopart>();
  const { id } = useParams();
  const { user } = useAppSelector(selectUserSlice);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    if (autopart) {
      dispatch(addToCart(autopart));
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $api.get(`/autopart/${id}`);
        setAutopart(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [id]);

  return (
    <>
      <Header />
      <main className="main">
        <section className="autopart">
          <Container>
            <div className="autopart__inner">
              <div className="autopart__left">
                <img src={autopart?.image_path} alt="" />
              </div>
              <div className="autopart__right">
                <p className="autopart__name">{autopart?.name}</p>

                <p className="autopart__price">
                  <span>Цена:</span> {autopart?.price} <span>грн</span>
                </p>
                <p className="autopart__descr">
                  Описание:
                  <br />
                  <span className="">{autopart?.description}</span>
                </p>
                <p className="autopart__amount">
                  В наличии: {autopart?.amount} шт
                </p>
                {user && (
                  <button onClick={handleAddToCart} className="card__add-cart">
                    В корзину
                  </button>
                )}
                <Link className="cart-empty__link" to="/">
                  <BsArrowLeft />
                  Продолжить покупки
                </Link>
              </div>
            </div>
            <div className="manufacturer">
              <h3 className="manufacturer__title">О производителе</h3>
              <p className="manufacturer__name">
                {autopart?.manufacturer.name}
              </p>
              <p className="manufacturer__address">
                Главный офис: {autopart?.manufacturer.adress}
              </p>
              <p className="manufacturer__email">
                Електронная почта:{" "}
                <a href="/#">{autopart?.manufacturer.email}</a>
              </p>
              <p className="manufacturer__phone">
                Номер телефона: {autopart?.manufacturer.phone}
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Autopart;
