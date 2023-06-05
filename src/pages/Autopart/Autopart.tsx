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
      <section className="autopart">
        <Container>
          <div className="autopart__inner">
            <div className="autopart__left">
              <img src={autopart?.image_path} alt="" />
            </div>
            <div className="autopart__right">
              <p className="autopart__name">{autopart?.name}</p>
              <p className="autopart__manufacturer">
                {autopart?.manufacturer.name}
              </p>
              <p className="autopart__descr">
                Описание:
                {autopart?.description}
              </p>
              <p className="autopart__price">{autopart?.price} грн</p>
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
        </Container>
      </section>
    </>
  );
};

export default Autopart;
