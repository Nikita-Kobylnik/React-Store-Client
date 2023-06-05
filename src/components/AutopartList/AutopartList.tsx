import React, { useEffect, useState } from "react";
import { $api } from "../../api/api";
import "./AutopartList.scss";
import { IAutopart } from "../../interfaces/autopartInterface";
import AutopartItem from "../AutopartItem/AutopartItem";
// import { useDispatch } from "react-redux";
// import { useAppDispatch } from "../../redux/hooks/typedHooks";
// import { setCart } from "../../redux/slices/cartSlice";
// import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

const AutopartList: React.FC = () => {
  const [autoparts, setAutoparts] = useState<IAutopart[]>([]);
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [lastPage, setlastPage] = useState(0);

  useEffect(() => {
    const fetchAutoparts = async () => {
      try {
        setLoading(true);
        const { data: autopartsResp } = await $api.get(
          `/autopart/paginate?page=${curPage}`
        );
        setAutoparts(autopartsResp.data);
        setlastPage(autopartsResp.meta.lastPage);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch autoparts:", error);
      }
    };
    fetchAutoparts();
  }, [curPage]);

  // const { pathname } = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const queryParams = new URLSearchParams();
  //   queryParams.append("page", curPage.toString());

  //   const searchString = queryParams.toString();
  //   const newPath = `${pathname}${searchString}`;

  //   navigate(newPath);
  // }, [curPage]);

  if (loading) {
    return <h2>Подождите...</h2>;
  }

  return (
    <>
      <ul className="autopart-list">
        {autoparts.map((item) => (
          <AutopartItem key={item.id} item={item} />
        ))}
      </ul>

      <Pagination
        count={lastPage}
        page={curPage}
        onChange={(_, num) => setCurPage(num)}
        style={{ marginTop: "20px" }}
      />
    </>
  );
};

export default AutopartList;
