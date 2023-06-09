import React from "react";
import { IAutopart } from "../../interfaces/autopartInterface";
import "./AutopartItem.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/typedHooks";
import { selectUserSlice } from "../../redux/slices/userSlice";
import { addToCart } from "../../redux/slices/cartSlice";

type TypeAutopartItem = {
  item: IAutopart;
};

const AutopartItem: React.FC<TypeAutopartItem> = ({ item }) => {
  const { user } = useAppSelector(selectUserSlice);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <li className="autopart-list__item card-item">
      <article className="card">
        <div className="card__img">
          <img src={item.image_path} alt="" />
        </div>
        <div className="card__info">
          <p className="card__manufacturer">{item.manufacturer.name}</p>
          <Link to={`/autopart/${item.id}`} className="card__name">
            {item.name}
          </Link>
          <p className="card__amount">В наличии: {item.amount} шт</p>
          <div className="card__bottom">
            <p className="card__price">
              {item.price} <span>грн</span>
            </p>
            {user && (
              <button onClick={handleAddToCart} className="card__add-cart">
                В корзину
              </button>
            )}
          </div>
        </div>
      </article>
    </li>
  );
};

export default AutopartItem;
