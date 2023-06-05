import React, { useEffect } from "react";
import { $api } from "../../api/api";
import { useAppDispatch } from "../../redux/hooks/typedHooks";
import { setUser } from "../../redux/slices/userSlice";
import { getTotals, setCart } from "../../redux/slices/cartSlice";

const AuthProvider: React.FC = () => {
  const dispatch = useAppDispatch();

  const getUser = async () => {
    try {
      const resp = await $api.get("/auth/user");
      dispatch(setUser(resp.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      const jsonCartItems = JSON.parse(cartItems);
      dispatch(setCart(jsonCartItems));
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, []);

  // dispatch(getTotals());

  return null;
};

export default AuthProvider;
