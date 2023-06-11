import React from "react";
import "./Checkout.scss";
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";

type Props = {};

const Checkout = (props: Props) => {
  return (
    <>
      <Header />
      <section className="checkout-page">
        <Container>
          <div className="checkout-page__inner">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, quas
            doloribus? Non nihil quis suscipit facilis porro tenetur corrupti
            ratione ducimus, sed nobis! Non molestiae inventore unde, fugit
            recusandae culpa?
          </div>
        </Container>
      </section>
    </>
  );
};

export default Checkout;
