import React, { useEffect, useState } from "react";
import { ISubcategory } from "../../interfaces/subcategoryInterface";
import { $api } from "../../api/api";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import AutopartItem from "../../components/AutopartItem/AutopartItem";
import { IAutopart } from "../../interfaces/autopartInterface";
import Container from "../../components/Container/Container";
import "./Subcategory.scss";

const Subcategory: React.FC = () => {
  const [autoparts, setAutoparts] = useState<IAutopart[]>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchAutopartsBySubcategory = async () => {
      try {
        setLoading(true);
        const response = await $api.get(`/autopart/subcategory/${id}`);
        setAutoparts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch autoparts by subcategory:", error);
      }
    };
    fetchAutopartsBySubcategory();
  }, [id]);

  console.log(autoparts.length);

  if (loading) {
    return <h2>Подождите...</h2>;
  }
  return (
    <>
      <Header />
      <section className="subcategory">
        <Container>
          <div className="subcategory__inner">
            <div className="autopart-list">
              {autoparts.map((autopart) => (
                <AutopartItem item={autopart} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Subcategory;
