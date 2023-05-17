import React, { useEffect, useState } from "react";
import { $api } from "../../api/api";
import "./AutopartList.scss";
import { IAutopart } from "../../interfaces/autopartInterface";
import AutopartItem from "../AutopartItem/AutopartItem";

const AutopartList: React.FC = () => {
  const [autoparts, setAutoparts] = useState<IAutopart[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAutoparts = async () => {
      try {
        setLoading(true);
        const response = await $api.get("/autopart");
        setAutoparts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch autoparts:", error);
      }
    };
    fetchAutoparts();
  }, []);
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
    </>
  );
};

export default AutopartList;
