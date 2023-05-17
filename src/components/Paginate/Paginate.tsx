import React from "react";
import { Link } from "react-router-dom";
import "./Paginate.scss";

type TypePagination = {
  autopartsPerPage: number;
  totalAutoparts: number;
  paginate: (pageNumber: number) => void;
};

const Paginate: React.FC<TypePagination> = ({
  autopartsPerPage,
  totalAutoparts,
  paginate,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalAutoparts / autopartsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="paginate">
      Страницы:
      <ul className="paginate__list">
        {pageNumber.map((number) => (
          <li className="paginate__item" key={number}>
            <Link
              to={`/${number === 1 ? "" : number}`}
              className="paginate__link"
              onClick={() => paginate(number)}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginate;
