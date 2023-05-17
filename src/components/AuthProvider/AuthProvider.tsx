import React, { useEffect } from "react";
import { $api } from "../../api/api";
import { useAppDispatch } from "../../redux/hooks/typedHooks";
import { setUser } from "../../redux/slices/userSlice";

type Props = {};

const AuthProvider = (props: Props) => {
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
    getUser();
  }, []);

  return null;
};

export default AuthProvider;
