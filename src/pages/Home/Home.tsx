import React from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";
import AutopartList from "../../components/AutopartList/AutopartList";
import CarSelect from "../../components/CarSelect/CarSelect";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <section className="home">
        <Container>
          <div className="home__inner">
            {/* <CarSelect /> */}
            <AutopartList />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
