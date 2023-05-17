import React, { useEffect, useState } from "react";
import { $api } from "../../api/api";

type Props = {};

const CarSelect = (props: Props) => {
  const [carBrand, setCarBrand] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $api.get("/car-brand");
        setCarBrand(response.data);
      } catch (error) {
        console.error("Failed to fetch autoparts:", error);
      }
    };
    fetchCategories();
  }, []);

  return <div>CarSelect</div>;
};

export default CarSelect;
